import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a client name'],
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    match: [/^[0-9+\-\s()]*$/, 'Please provide a valid phone number']
  },
  address: {
    type: String,
    required: [true, 'Please provide an address']
  },
  city: {
    type: String,
    required: [true, 'Please provide a city']
  },
  state: {
    type: String,
    required: [true, 'Please provide a state']
  },
  postalCode: {
    type: String,
    required: [true, 'Please provide a postal code']
  },
  // Energy consumption data
  consumptionType: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  consumption: {
    type: Number,
    required: [true, 'Please provide consumption in kWh']
  },
  // Property details
  roofArea: {
    type: Number
  },
  roofType: {
    type: String,
    enum: ['ceramic', 'concrete', 'metal', 'fiber'],
    default: 'ceramic'
  },
  // System specifications (calculated)
  systemSize: {
    type: Number,
    default: 0
  },
  panelsCount: {
    type: Number,
    default: 0
  },
  estimatedProduction: {
    type: Number,
    default: 0
  },
  estimatedSavings: {
    type: Number,
    default: 0
  },
  co2Reduction: {
    type: Number,
    default: 0
  },
  // Additional information
  notes: {
    type: String
  },
  // Relationships
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Status tracking
  status: {
    type: String,
    enum: ['lead', 'prospect', 'customer', 'inactive'],
    default: 'lead'
  },
  leadSource: {
    type: String,
    enum: ['website', 'referral', 'advertisement', 'social_media', 'direct', 'other'],
    default: 'website'
  },
  // Contact history
  lastContactDate: {
    type: Date
  },
  nextContactDate: {
    type: Date
  },
  // Financial information
  budget: {
    type: Number
  },
  preferredPaymentMethod: {
    type: String,
    enum: ['cash', 'credit_card', 'financing', 'leasing', 'other'],
    default: 'financing'
  }
}, {
  timestamps: true
});

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);