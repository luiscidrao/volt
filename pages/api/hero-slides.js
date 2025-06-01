import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

// Disable the default body parser to handle form data with files
export const config = {
  api: {
    bodyParser: false,
  },
};

// Path to our hero slides data file
const dataFilePath = path.join(process.cwd(), 'data', 'hero-slides.json');
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

// Get all hero slides
const getHeroSlides = () => {
  ensureDirectories();
  
  // If the file doesn't exist yet, return an empty array
  if (!fs.existsSync(dataFilePath)) {
    // Initialize with sample hero slides
    const initialSlides = [
      {
        id: 1,
        title: "Residencial Solar",
        subtitle: "Soluções para sua casa",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        order: 1
      },
      {
        id: 2,
        title: "Comercial Solar",
        subtitle: "Reduza custos em seu negócio",
        image: "https://images.unsplash.com/photo-1559302995-f1d7e5c0ec51?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        order: 2
      },
      {
        id: 3,
        title: "Industrial Solar",
        subtitle: "Energia limpa para sua indústria",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        order: 3
      },
      {
        id: 4,
        title: "Rural Solar",
        subtitle: "Sustentabilidade no campo",
        image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        order: 4
      }
    ];
    
    fs.writeFileSync(dataFilePath, JSON.stringify(initialSlides, null, 2));
    return initialSlides;
  }
  
  // Read the file and parse the JSON
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
};

// Save hero slides to file
const saveHeroSlides = (slides) => {
  ensureDirectories();
  fs.writeFileSync(dataFilePath, JSON.stringify(slides, null, 2));
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
        const slides = getHeroSlides();
        // Sort slides by order
        slides.sort((a, b) => a.order - b.order);
        res.status(200).json({ success: true, slides });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        const { fields, files } = await parseForm(req);
        const slides = getHeroSlides();
        
        // Generate a new ID (max ID + 1)
        const newId = slides.length > 0 
          ? Math.max(...slides.map(s => s.id)) + 1 
          : 1;
        
        // Handle image file
        let imagePath = '';
        if (files.image) {
          // Get the uploaded file
          const file = files.image;
          
          // Create a new filename based on slide ID and original extension
          const fileExt = path.extname(file.originalFilename);
          const newFilename = `hero-slide-${newId}${fileExt}`;
          
          // Move the file to its final location with the new name
          const finalPath = path.join(uploadsDir, newFilename);
          fs.renameSync(file.filepath, finalPath);
          
          // Set the image path for storing in the slide data
          imagePath = `/images/${newFilename}`;
        } else if (fields.imageUrl) {
          // If no file was uploaded but an image URL was provided
          imagePath = fields.imageUrl;
        }
        
        // Create new slide object
        const newSlide = {
          id: newId,
          title: fields.title || '',
          subtitle: fields.subtitle || '',
          image: imagePath,
          order: parseInt(fields.order) || slides.length + 1
        };
        
        // Add to slides array and save
        slides.push(newSlide);
        saveHeroSlides(slides);
        
        res.status(201).json({ success: true, slide: newSlide });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'PUT':
      try {
        const { fields, files } = await parseForm(req);
        const slides = getHeroSlides();
        
        // Find the slide to update
        const slideId = parseInt(fields.id);
        const slideIndex = slides.findIndex(s => s.id === slideId);
        
        if (slideIndex === -1) {
          return res.status(404).json({ success: false, message: 'Slide not found' });
        }
        
        // Handle image file
        let imagePath = slides[slideIndex].image; // Keep existing image by default
        if (files.image) {
          // Get the uploaded file
          const file = files.image;
          
          // Create a new filename based on slide ID and original extension
          const fileExt = path.extname(file.originalFilename);
          const newFilename = `hero-slide-${slideId}${fileExt}`;
          
          // Move the file to its final location with the new name
          const finalPath = path.join(uploadsDir, newFilename);
          fs.renameSync(file.filepath, finalPath);
          
          // Set the image path for storing in the slide data
          imagePath = `/images/${newFilename}`;
        } else if (fields.imageUrl) {
          // If no file was uploaded but an image URL was provided
          imagePath = fields.imageUrl;
        }
        
        // Update slide object
        slides[slideIndex] = {
          ...slides[slideIndex],
          title: fields.title || slides[slideIndex].title,
          subtitle: fields.subtitle || slides[slideIndex].subtitle,
          image: imagePath,
          order: parseInt(fields.order) || slides[slideIndex].order
        };
        
        // Save updated slides
        saveHeroSlides(slides);
        
        res.status(200).json({ success: true, slide: slides[slideIndex] });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        const { fields } = await parseForm(req);
        const slides = getHeroSlides();
        
        // Find the slide to delete
        const slideId = parseInt(fields.id);
        const slideIndex = slides.findIndex(s => s.id === slideId);
        
        if (slideIndex === -1) {
          return res.status(404).json({ success: false, message: 'Slide not found' });
        }
        
        // Remove the slide
        slides.splice(slideIndex, 1);
        
        // Save updated slides
        saveHeroSlides(slides);
        
        res.status(200).json({ success: true, message: 'Slide deleted successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}