import fs from 'fs';
import path from 'path';

// Path to our clients data file
const dataFilePath = path.join(process.cwd(), 'data', 'clients.json');

// Ensure the data directory exists
const ensureDirectories = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Get all clients
const getClients = () => {
  ensureDirectories();
  
  // If the file doesn't exist yet, return an empty array
  if (!fs.existsSync(dataFilePath)) {
    // Initialize with empty array - no sample clients
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
    return [];
  }
  
  // Read the file and parse the JSON
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
};

// Save clients to file
const saveClients = (clients) => {
  ensureDirectories();
  fs.writeFileSync(dataFilePath, JSON.stringify(clients, null, 2));
};

export default async function handler(req, res) {
  // Ensure directories exist
  ensureDirectories();
  
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      try {
        const clients = getClients();
        res.status(200).json({ success: true, clients });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        const clients = getClients();
        const clientData = req.body;
        
        // Generate a new ID (max ID + 1)
        const newId = clients.length > 0 
          ? Math.max(...clients.map(c => c.id)) + 1 
          : 1;
        
        // Create new client object
        const newClient = {
          id: newId,
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          address: clientData.address,
          city: clientData.city,
          state: clientData.state,
          postalCode: clientData.postalCode,
          consumptionType: clientData.consumptionType, // 'monthly' or 'yearly'
          consumption: parseFloat(clientData.consumption), // kWh
          roofArea: parseFloat(clientData.roofArea), // m²
          roofType: clientData.roofType,
          notes: clientData.notes,
          // System sizing recommendations (calculated)
          systemSize: parseFloat(clientData.systemSize || 0), // kWp
          panelsCount: parseInt(clientData.panelsCount || 0),
          estimatedProduction: parseFloat(clientData.estimatedProduction || 0), // kWh/month
          estimatedSavings: parseFloat(clientData.estimatedSavings || 0), // R$/month
          co2Reduction: parseFloat(clientData.co2Reduction || 0), // kg/year
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Add to clients array and save
        clients.push(newClient);
        saveClients(clients);
        
        res.status(201).json({ success: true, client: newClient });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}