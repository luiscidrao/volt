import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

// Disable the default body parser to handle form data with files
export const config = {
  api: {
    bodyParser: false,
  },
};

// Path to our projects data file
const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');
const uploadsDir = path.join(process.cwd(), 'public', 'images');

// Ensure the data directory exists
const ensureDirectories = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

// Get all projects
const getProjects = () => {
  ensureDirectories();
  
  // If the file doesn't exist yet, return an empty array
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  
  // Read the file and parse the JSON
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
};

// Save projects to file
const saveProjects = (projects) => {
  ensureDirectories();
  fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2));
};

// Parse form data including file uploads
const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: uploadsDir,
      keepExtensions: true,
      multiples: false,
    });
    
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  // Get the project ID from the URL
  const { id } = req.query;
  const projectId = parseInt(id);
  
  // Ensure directories exist
  ensureDirectories();
  
  // Get all projects
  const projects = getProjects();
  
  // Find the project with the given ID
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  // If the project doesn't exist, return 404
  if (projectIndex === -1) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      // Return the project
      res.status(200).json({ success: true, project: projects[projectIndex] });
      break;
      
    case 'PUT':
      try {
        const { fields, files } = await parseForm(req);
        
        // Update project data
        const updatedProject = {
          ...projects[projectIndex],
          title: fields.title,
          description: fields.description,
          category: fields.category,
          location: fields.location,
          date: fields.date,
          power: fields.power,
          panels: fields.panels,
          economy: fields.economy,
          co2Reduction: fields.co2Reduction
        };
        
        // Handle image file if a new one was uploaded
        if (files.image) {
          // Get the uploaded file
          const file = files.image;
          
          // Create a new filename based on project ID and original extension
          const fileExt = path.extname(file.originalFilename);
          const newFilename = `project${projectId}${fileExt}`;
          
          // Move the file to its final location with the new name
          const finalPath = path.join(uploadsDir, newFilename);
          fs.renameSync(file.filepath, finalPath);
          
          // Set the image path for storing in the project data
          updatedProject.image = `/images/${newFilename}`;
        }
        
        // Update the project in the array
        projects[projectIndex] = updatedProject;
        
        // Save the updated projects array
        saveProjects(projects);
        
        res.status(200).json({ success: true, project: updatedProject });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        // Get the project to delete
        const projectToDelete = projects[projectIndex];
        
        // Try to delete the project image if it exists and is not a default image
        if (projectToDelete.image && !projectToDelete.image.includes('project')) {
          const imagePath = path.join(process.cwd(), 'public', projectToDelete.image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
        
        // Remove the project from the array
        projects.splice(projectIndex, 1);
        
        // Save the updated projects array
        saveProjects(projects);
        
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}