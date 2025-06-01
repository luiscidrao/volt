import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

// Disable the default body parser to handle form data with files
export const config = {
  api: {
    bodyParser: false,
  },
};

// Path to our testimonials data file
const dataFilePath = path.join(process.cwd(), 'data', 'testimonials.json');
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

// Get all testimonials
const getTestimonials = () => {
  ensureDirectories();
  
  // If the file doesn't exist yet, return an empty array
  if (!fs.existsSync(dataFilePath)) {
    // Initialize with sample testimonials
    const initialTestimonials = [
      {
        id: 1,
        text: "Instalamos painéis solares em nossa residência há 6 meses e já percebemos uma redução significativa na conta de luz. O atendimento da SolarTech foi excelente desde o primeiro contato até a instalação final.",
        name: "João Silva",
        location: "São Paulo, SP",
        avatar: "/images/avatar1.jpg"
      },
      {
        id: 2,
        text: "Como empresa, estávamos buscando reduzir nossos custos operacionais e a SolarTech nos apresentou uma solução perfeita. O retorno do investimento foi mais rápido do que esperávamos.",
        name: "Maria Oliveira",
        location: "Rio de Janeiro, RJ",
        avatar: "/images/avatar2.jpg"
      },
      {
        id: 3,
        text: "A equipe da SolarTech foi extremamente profissional e transparente durante todo o processo. Os painéis foram instalados no prazo prometido e a economia na conta de energia tem sido impressionante.",
        name: "Carlos Santos",
        location: "Belo Horizonte, MG",
        avatar: "/images/avatar3.jpg"
      }
    ];
    
    fs.writeFileSync(dataFilePath, JSON.stringify(initialTestimonials, null, 2));
    return initialTestimonials;
  }
  
  // Read the file and parse the JSON
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
};

// Save testimonials to file
const saveTestimonials = (testimonials) => {
  ensureDirectories();
  fs.writeFileSync(dataFilePath, JSON.stringify(testimonials, null, 2));
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
  // Ensure directories exist
  ensureDirectories();
  
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      try {
        const testimonials = getTestimonials();
        res.status(200).json({ success: true, testimonials });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        const { fields, files } = await parseForm(req);
        const testimonials = getTestimonials();
        
        // Generate a new ID (max ID + 1)
        const newId = testimonials.length > 0 
          ? Math.max(...testimonials.map(t => t.id)) + 1 
          : 1;
        
        // Handle avatar file
        let avatarPath = '';
        if (files.avatar) {
          // Get the uploaded file
          const file = files.avatar;
          
          // Create a new filename based on testimonial ID and original extension
          const fileExt = path.extname(file.originalFilename);
          const newFilename = `avatar${newId}${fileExt}`;
          
          // Move the file to its final location with the new name
          const finalPath = path.join(uploadsDir, newFilename);
          fs.renameSync(file.filepath, finalPath);
          
          // Set the avatar path for storing in the testimonial data
          avatarPath = `/images/${newFilename}`;
        }
        
        // Create new testimonial object
        const newTestimonial = {
          id: newId,
          text: fields.text,
          name: fields.name,
          location: fields.location,
          avatar: avatarPath || '/images/default-avatar.jpg'
        };
        
        // Add to testimonials array and save
        testimonials.push(newTestimonial);
        saveTestimonials(testimonials);
        
        res.status(201).json({ success: true, testimonial: newTestimonial });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'PUT':
      try {
        const { fields, files } = await parseForm(req);
        const testimonials = getTestimonials();
        
        // Find the testimonial to update
        const testimonialId = parseInt(fields.id);
        const testimonialIndex = testimonials.findIndex(t => t.id === testimonialId);
        
        if (testimonialIndex === -1) {
          return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        
        // Handle avatar file
        let avatarPath = testimonials[testimonialIndex].avatar; // Keep existing avatar by default
        if (files.avatar) {
          // Get the uploaded file
          const file = files.avatar;
          
          // Create a new filename based on testimonial ID and original extension
          const fileExt = path.extname(file.originalFilename);
          const newFilename = `avatar${testimonialId}${fileExt}`;
          
          // Move the file to its final location with the new name
          const finalPath = path.join(uploadsDir, newFilename);
          fs.renameSync(file.filepath, finalPath);
          
          // Set the avatar path for storing in the testimonial data
          avatarPath = `/images/${newFilename}`;
        }
        
        // Update testimonial object
        testimonials[testimonialIndex] = {
          ...testimonials[testimonialIndex],
          text: fields.text || testimonials[testimonialIndex].text,
          name: fields.name || testimonials[testimonialIndex].name,
          location: fields.location || testimonials[testimonialIndex].location,
          avatar: avatarPath
        };
        
        // Save updated testimonials
        saveTestimonials(testimonials);
        
        res.status(200).json({ success: true, testimonial: testimonials[testimonialIndex] });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        const { fields } = await parseForm(req);
        const testimonials = getTestimonials();
        
        // Find the testimonial to delete
        const testimonialId = parseInt(fields.id);
        const testimonialIndex = testimonials.findIndex(t => t.id === testimonialId);
        
        if (testimonialIndex === -1) {
          return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        
        // Remove the testimonial
        testimonials.splice(testimonialIndex, 1);
        
        // Save updated testimonials
        saveTestimonials(testimonials);
        
        res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}