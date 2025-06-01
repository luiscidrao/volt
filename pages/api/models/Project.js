import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description']
  },
  // Client relationship
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Please provide a client for this project']
  },
  // Project details
  category: {
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'agricultural', 'other'],
    default: 'residential',
    required: [true, 'Please provide a project category']
  },
  location: {
    address: String,
    city: String,
    state: String,
    postalCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  // System specifications
  systemSize: {
    type: Number,
    required: [true, 'Please provide the system size in kWp']
  },
  panelsCount: {
    type: Number,
    required: [true, 'Please provide the number of panels']
  },
  panelType: {
    type: String
  },
  inverterType: {
    type: String
  },
  mountingSystem: {
    type: String
  },
  // Financial information
  totalCost: {
    type: Number,
    required: [true, 'Please provide the total project cost']
  },
  downPayment: {
    type: Number
  },
  financingDetails: {
    type: String
  },
  // Energy production
  estimatedProduction: {
    type: Number, // kWh per year
    required: [true, 'Please provide the estimated annual production']
  },
  estimatedSavings: {
    type: Number, // $ per year
    required: [true, 'Please provide the estimated annual savings']
  },
  co2Reduction: {
    type: Number // kg per year
  },
  // Project timeline
  proposalDate: {
    type: Date
  },
  contractSignedDate: {
    type: Date
  },
  permitSubmittedDate: {
    type: Date
  },
  permitApprovedDate: {
    type: Date
  },
  installationStartDate: {
    type: Date
  },
  installationEndDate: {
    type: Date
  },
  inspectionDate: {
    type: Date
  },
  gridConnectionDate: {
    type: Date
  },
  commissioningDate: {
    type: Date
  },
  // Project status
  status: {
    type: String,
    enum: [
      'proposal', 'contract_signed', 'permit_pending', 'permit_approved',
      'installation_scheduled', 'installation_in_progress', 'installation_completed',
      'inspection_pending', 'inspection_passed', 'grid_connection_pending',
      'commissioned', 'completed', 'cancelled'
    ],
    default: 'proposal',
    required: [true, 'Please provide a project status']
  },
  // Team assignments
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  salesRep: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  installationTeam: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // Documents
  documents: [{
    name: String,
    type: {
      type: String,
      enum: ['proposal', 'contract', 'permit', 'design', 'inspection', 'other']
    },
    url: String,
    uploadDate: Date
  }],
  // Notes and issues
  notes: [{
    text: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  issues: [{
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved'],
      default: 'open'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reportedAt: {
      type: Date,
      default: Date.now
    },
    resolvedAt: Date
  }],
  // Images
  images: [{
    url: String,
    caption: String,
    uploadDate: Date
  }]
}, {
  timestamps: true
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);