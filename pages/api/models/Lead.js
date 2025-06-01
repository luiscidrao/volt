import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a lead name'],
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    match: [/^[0-9+\-\s()]*$/, 'Please provide a valid phone number']
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  postalCode: {
    type: String
  },
  // Lead specific information
  source: {
    type: String,
    enum: ['website', 'referral', 'advertisement', 'social_media', 'direct', 'other'],
    default: 'website',
    required: [true, 'Please provide a lead source']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost'],
    default: 'new',
    required: [true, 'Please provide a lead status']
  },
  // Interest information
  interestedIn: {
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'agricultural', 'other'],
    default: 'residential'
  },
  estimatedConsumption: {
    type: Number
  },
  budget: {
    type: Number
  },
  // Follow-up information
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastContactDate: {
    type: Date
  },
  nextContactDate: {
    type: Date
  },
  followUpPriority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  // Notes and additional information
  notes: {
    type: String
  },
  // Conversion tracking
  convertedToClient: {
    type: Boolean,
    default: false
  },
  convertedClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  conversionDate: {
    type: Date
  },
  // Reason for lost leads
  lostReason: {
    type: String,
    enum: ['price', 'competition', 'timing', 'no_response', 'not_qualified', 'other'],
  },
  // Marketing campaign tracking
  campaign: {
    type: String
  },
  // Referral information
  referredBy: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);