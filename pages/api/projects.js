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
    // Initialize with the example projects from the original projetos.js
    const initialProjects = [
      {
        id: 1,
        title: 'Residência Solar em São Paulo',
        description: 'Instalação de sistema fotovoltaico em residência de alto padrão, proporcionando economia de 95% na conta de energia.',
        image: '/images/project1.jpg',
        category: 'Residencial',
        location: 'São Paulo, SP',
        date: 'Janeiro 2023',
        power: '5.2 kWp',
        panels: '13 painéis',
        economy: 'R$ 850/mês',
        co2Reduction: '2.5 ton/ano'
      },
      {
        id: 2,
        title: 'Fazenda Solar em Minas Gerais',
        description: 'Sistema de grande porte para atender as necessidades energéticas de uma fazenda de café, incluindo irrigação e processamento.',
        image: '/images/project2.jpg',
        category: 'Rural',
        location: 'Patrocínio, MG',
        date: 'Março 2023',
        power: '75 kWp',
        panels: '187 painéis',
        economy: 'R$ 12.500/mês',
        co2Reduction: '36 ton/ano'
      },
      {
        id: 3,
        title: 'Indústria Têxtil Sustentável',
        description: 'Implementação de energia solar em indústria têxtil, reduzindo custos operacionais e melhorando a sustentabilidade da produção.',
        image: '/images/project3.jpg',
        category: 'Industrial',
        location: 'Blumenau, SC',
        date: 'Maio 2023',
        power: '120 kWp',
        panels: '300 painéis',
        economy: 'R$ 18.000/mês',
        co2Reduction: '52 ton/ano'
      },
      {
        id: 4,
        title: 'Condomínio Residencial Eco',
        description: 'Sistema compartilhado para condomínio com 24 unidades, distribuindo a energia gerada entre os moradores.',
        image: '/images/project4.jpg',
        category: 'Condomínio',
        location: 'Rio de Janeiro, RJ',
        date: 'Julho 2023',
        power: '48 kWp',
        panels: '120 painéis',
        economy: 'R$ 7.200/mês',
        co2Reduction: '21 ton/ano'
      },
      {
        id: 5,
        title: 'Supermercado Energia Limpa',
        description: 'Instalação de painéis solares em rede de supermercados, reduzindo custos com refrigeração e iluminação.',
        image: '/images/project5.jpg',
        category: 'Comercial',
        location: 'Fortaleza, CE',
        date: 'Agosto 2023',
        power: '95 kWp',
        panels: '237 painéis',
        economy: 'R$ 15.800/mês',
        co2Reduction: '45 ton/ano'
      },
      {
        id: 6,
        title: 'Escola Municipal Sustentável',
        description: 'Projeto social com instalação de energia solar em escola pública, gerando economia para o município e educação ambiental.',
        image: '/images/project6.jpg',
        category: 'Público',
        location: 'Salvador, BA',
        date: 'Outubro 2023',
        power: '32 kWp',
        panels: '80 painéis',
        economy: 'R$ 5.300/mês',
        co2Reduction: '15 ton/ano'
      }
    ];
    
    fs.writeFileSync(dataFilePath, JSON.stringify(initialProjects, null, 2));
    return initialProjects;
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
  // Ensure directories exist
  ensureDirectories();
  
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      try {
        const projects = getProjects();
        res.status(200).json({ success: true, projects });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        const { fields, files } = await parseForm(req);
        const projects = getProjects();
        
        // Generate a new ID (max ID + 1)
        const newId = projects.length > 0 
          ? Math.max(...projects.map(p => p.id)) + 1 
          : 1;
        
        // Handle image file
        let imagePath = '';
        if (files.image) {
          // Get the uploaded file
          const file = files.image;
          
          // Create a new filename based on project ID and original extension
          const fileExt = path.extname(file.originalFilename);
          const newFilename = `project${newId}${fileExt}`;
          
          // Move the file to its final location with the new name
          const finalPath = path.join(uploadsDir, newFilename);
          fs.renameSync(file.filepath, finalPath);
          
          // Set the image path for storing in the project data
          imagePath = `/images/${newFilename}`;
        }
        
        // Create new project object
        const newProject = {
          id: newId,
          title: fields.title,
          description: fields.description,
          image: imagePath,
          category: fields.category,
          location: fields.location,
          date: fields.date,
          power: fields.power,
          panels: fields.panels,
          economy: fields.economy,
          co2Reduction: fields.co2Reduction
        };
        
        // Add to projects array and save
        projects.push(newProject);
        saveProjects(projects);
        
        res.status(201).json({ success: true, project: newProject });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}