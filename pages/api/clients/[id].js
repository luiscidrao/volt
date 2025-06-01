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
  // Get the client ID from the URL
  const { id } = req.query;
  const clientId = parseInt(id);
  
  // Ensure directories exist
  ensureDirectories();
  
  // Get all clients
  const clients = getClients();
  
  // Find the client with the given ID
  const clientIndex = clients.findIndex(c => c.id === clientId);
  
  // If the client doesn't exist, return 404
  if (clientIndex === -1) {
    return res.status(404).json({ success: false, message: 'Client not found' });
  }
  
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      // Return the client
      res.status(200).json({ success: true, client: clients[clientIndex] });
      break;
      
    case 'PUT':
      try {
        const clientData = req.body;
        
        // Update client data
        const updatedClient = {
          ...clients[clientIndex],
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          address: clientData.address,
          city: clientData.city,
          state: clientData.state,
          postalCode: clientData.postalCode,
          consumptionType: clientData.consumptionType,
          consumption: parseFloat(clientData.consumption),
          roofArea: parseFloat(clientData.roofArea),
          roofType: clientData.roofType,
          notes: clientData.notes,
          // System sizing recommendations (calculated)
          systemSize: parseFloat(clientData.systemSize || clients[clientIndex].systemSize || 0),
          panelsCount: parseInt(clientData.panelsCount || clients[clientIndex].panelsCount || 0),
          estimatedProduction: parseFloat(clientData.estimatedProduction || clients[clientIndex].estimatedProduction || 0),
          estimatedSavings: parseFloat(clientData.estimatedSavings || clients[clientIndex].estimatedSavings || 0),
          co2Reduction: parseFloat(clientData.co2Reduction || clients[clientIndex].co2Reduction || 0),
          // Keep original createdAt, update updatedAt
          createdAt: clients[clientIndex].createdAt,
          updatedAt: new Date().toISOString()
        };
        
        // Update the client in the array
        clients[clientIndex] = updatedClient;
        
        // Save the updated clients array
        saveClients(clients);
        
        res.status(200).json({ success: true, client: updatedClient });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        // Remove the client from the array
        clients.splice(clientIndex, 1);
        
        // Save the updated clients array
        saveClients(clients);
        
        res.status(200).json({ success: true, message: 'Client deleted successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}