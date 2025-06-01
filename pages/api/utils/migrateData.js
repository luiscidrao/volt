import fs from 'fs';
import path from 'path';
import dbConnect from '../database';
import Client from '../models/Client';
import Project from '../models/Project';
import User from '../models/User';

// Path to our data files
const clientsDataFilePath = path.join(process.cwd(), 'data', 'clients.json');
const projectsDataFilePath = path.join(process.cwd(), 'data', 'projects.json');

// Ensure the data directory exists
const ensureDirectories = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Get data from JSON files
const getClients = () => {
  ensureDirectories();

  if (!fs.existsSync(clientsDataFilePath)) {
    return [];
  }

  const fileContents = fs.readFileSync(clientsDataFilePath, 'utf8');
  return JSON.parse(fileContents);
};

const getProjects = () => {
  ensureDirectories();

  if (!fs.existsSync(projectsDataFilePath)) {
    return [];
  }

  const fileContents = fs.readFileSync(projectsDataFilePath, 'utf8');
  return JSON.parse(fileContents);
};


// Create a default admin user
const createDefaultUser = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@solartech.com' });

    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@solartech.com',
        password: 'solar123', // This will be hashed by the pre-save hook
        role: 'admin',
        phone: '(11) 99999-9999'
      });
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error creating default user:', error);
  }
};

// Migrate clients from JSON to MongoDB
const migrateClients = async () => {
  try {
    const clients = getClients();

    if (clients.length === 0) {
      console.log('No clients to migrate');
      return [];
    }

    const migratedClients = [];

    // Get default admin user
    const adminUser = await User.findOne({ email: 'admin@solartech.com' });

    for (const client of clients) {
      // Check if client already exists
      const existingClient = await Client.findOne({ email: client.email });

      if (!existingClient) {
        const newClient = await Client.create({
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          city: client.city,
          state: client.state,
          postalCode: client.postalCode,
          consumptionType: client.consumptionType,
          consumption: client.consumption,
          roofArea: client.roofArea,
          roofType: client.roofType,
          systemSize: client.systemSize,
          panelsCount: client.panelsCount,
          estimatedProduction: client.estimatedProduction,
          estimatedSavings: client.estimatedSavings,
          co2Reduction: client.co2Reduction,
          notes: client.notes,
          assignedTo: adminUser ? adminUser._id : null,
          status: 'customer',
          createdAt: client.createdAt ? new Date(client.createdAt) : new Date(),
          updatedAt: client.updatedAt ? new Date(client.updatedAt) : new Date()
        });

        migratedClients.push({
          oldId: client.id,
          newId: newClient._id,
          client: newClient
        });
      } else {
        migratedClients.push({
          oldId: client.id,
          newId: existingClient._id,
          client: existingClient
        });
      }
    }

    console.log(`Migrated ${migratedClients.length} clients`);
    return migratedClients;
  } catch (error) {
    console.error('Error migrating clients:', error);
    return [];
  }
};

// Migrate projects from JSON to MongoDB
const migrateProjects = async (migratedClients) => {
  try {
    const projects = getProjects();

    if (projects.length === 0) {
      console.log('No projects to migrate');
      return [];
    }

    const migratedProjects = [];

    // Get default admin user
    const adminUser = await User.findOne({ email: 'admin@solarcrm.com' });

    for (const project of projects) {
      // Create a new project for each client
      for (const clientMapping of migratedClients) {
        const newProject = await Project.create({
          title: project.title,
          description: project.description,
          client: clientMapping.newId,
          category: project.category === 'Residencial' ? 'residential' : 
                   project.category === 'Comercial' ? 'commercial' : 
                   project.category === 'Industrial' ? 'industrial' : 
                   project.category === 'Rural' ? 'agricultural' : 'other',
          location: {
            city: project.location.split(',')[0].trim(),
            state: project.location.split(',')[1].trim()
          },
          systemSize: parseFloat(project.power.replace(' kWp', '')),
          panelsCount: parseInt(project.panels.replace(' painéis', '')),
          totalCost: parseFloat(project.economy.replace('R$ ', '').replace('/mês', '')) * 60, // Estimate total cost as 5 years of savings
          estimatedProduction: parseFloat(project.power.replace(' kWp', '')) * 120, // Estimate monthly production
          estimatedSavings: parseFloat(project.economy.replace('R$ ', '').replace('/mês', '')),
          co2Reduction: parseFloat(project.co2Reduction.replace(' ton/ano', '')) * 1000, // Convert tons to kg
          status: 'completed',
          projectManager: adminUser ? adminUser._id : null,
          salesRep: adminUser ? adminUser._id : null,
          images: [{
            url: project.image,
            caption: project.title,
            uploadDate: new Date()
          }]
        });

        migratedProjects.push(newProject);

        // Only create one project per showcase project
        break;
      }
    }

    console.log(`Migrated ${migratedProjects.length} projects`);
    return migratedProjects;
  } catch (error) {
    console.error('Error migrating projects:', error);
    return [];
  }
};

// Migrate proposals from clients to MongoDB
const migrateProposals = async (migratedClients, migratedProjects) => {
  try {
    const proposalConfig = getProposalConfig();

    if (!proposalConfig) {
      console.log('No proposal configuration found');
      return [];
    }

    const migratedProposals = [];

    // Get default admin user
    const adminUser = await User.findOne({ email: 'admin@solarcrm.com' });

    // Create a proposal for each client
    for (const clientMapping of migratedClients) {
      const client = clientMapping.client;

      // Calculate financial data
      const systemCostPerKWp = proposalConfig.financial.systemCostPerKWp;
      const totalSystemCost = client.systemSize * systemCostPerKWp;

      const electricityPrice = proposalConfig.financial.electricityPricePerKWh;
      const monthlyElectricityCost = client.consumption * electricityPrice;
      const yearlyElectricityCost = monthlyElectricityCost * 12;

      const monthlySavings = client.estimatedProduction * electricityPrice;
      const yearlySavings = monthlySavings * 12;

      const roi = totalSystemCost / yearlySavings;
      const lifetimeSavings = yearlySavings * 25;
      const lifetimeROI = lifetimeSavings / totalSystemCost;

      // Create proposal
      const newProposal = await Proposal.create({
        client: clientMapping.newId,
        title: `Proposta Solar para ${client.name}`,
        proposalNumber: `PROP-${Date.now().toString().slice(-6)}`,
        systemSize: client.systemSize,
        panelsCount: client.panelsCount,
        estimatedProduction: client.estimatedProduction,
        estimatedSavings: client.estimatedSavings,
        co2Reduction: client.co2Reduction,
        equipment: proposalConfig.equipment,
        financialData: {
          systemCost: {
            perKWp: systemCostPerKWp,
            total: totalSystemCost
          },
          electricityCost: {
            perKWh: electricityPrice,
            monthly: monthlyElectricityCost,
            yearly: yearlyElectricityCost
          },
          savings: {
            monthly: monthlySavings,
            yearly: yearlySavings,
            lifetime: lifetimeSavings
          },
          roi: {
            years: roi,
            lifetime: lifetimeROI
          },
          paymentScenarios: {
            cash: {
              name: proposalConfig.financial.paymentOptions.cash.name,
              discount: proposalConfig.financial.paymentOptions.cash.discount / 100,
              totalCost: totalSystemCost * (1 - proposalConfig.financial.paymentOptions.cash.discount / 100),
              installments: proposalConfig.financial.paymentOptions.cash.installments,
              installmentValue: totalSystemCost * (1 - proposalConfig.financial.paymentOptions.cash.discount / 100) / proposalConfig.financial.paymentOptions.cash.installments,
              interestRate: proposalConfig.financial.paymentOptions.cash.interestRate / 100
            },
            creditCard: {
              name: proposalConfig.financial.paymentOptions.creditCard.name,
              discount: proposalConfig.financial.paymentOptions.creditCard.discount / 100,
              totalCost: totalSystemCost * (1 - proposalConfig.financial.paymentOptions.creditCard.discount / 100),
              installments: proposalConfig.financial.paymentOptions.creditCard.installments,
              installmentValue: totalSystemCost * (1 - proposalConfig.financial.paymentOptions.creditCard.discount / 100) / proposalConfig.financial.paymentOptions.creditCard.installments,
              interestRate: proposalConfig.financial.paymentOptions.creditCard.interestRate / 100
            },
            financing: {
              name: proposalConfig.financial.paymentOptions.financing.name,
              discount: proposalConfig.financial.paymentOptions.financing.discount / 100,
              totalCost: totalSystemCost * (1 + proposalConfig.financial.paymentOptions.financing.interestRate / 100) ** (proposalConfig.financial.paymentOptions.financing.installments / 12),
              installments: proposalConfig.financial.paymentOptions.financing.installments,
              installmentValue: (totalSystemCost * (1 + proposalConfig.financial.paymentOptions.financing.interestRate / 100) ** (proposalConfig.financial.paymentOptions.financing.installments / 12)) / proposalConfig.financial.paymentOptions.financing.installments,
              interestRate: proposalConfig.financial.paymentOptions.financing.interestRate / 100
            }
          }
        },
        companyInfo: proposalConfig.company,
        status: 'sent',
        sentDate: new Date(),
        expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        createdBy: adminUser ? adminUser._id : null,
        showcaseProjects: migratedProjects.slice(0, 4).map(project => project._id)
      });

      migratedProposals.push(newProposal);
    }

    console.log(`Migrated ${migratedProposals.length} proposals`);
    return migratedProposals;
  } catch (error) {
    console.error('Error migrating proposals:', error);
    return [];
  }
};

// Main migration function
export const migrateData = async () => {
  try {
    // Connect to database
    await dbConnect();

    // Create default admin user
    await createDefaultUser();

    // Migrate clients
    const migratedClients = await migrateClients();

    // Migrate projects
    const migratedProjects = await migrateProjects(migratedClients);

    // Migrate proposals
    const migratedProposals = await migrateProposals(migratedClients, migratedProjects);

    return {
      success: true,
      clients: migratedClients.length,
      projects: migratedProjects.length,
      proposals: migratedProposals.length
    };
  } catch (error) {
    console.error('Error during migration:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default migrateData;
