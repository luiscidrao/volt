import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Please provide a setting key'],
    unique: true,
    trim: true
  },
  value: {
    type: String,
    required: [true, 'Please provide a setting value']
  },
  description: {
    type: String,
    default: ''
  },
  isProtected: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Static method to get a setting by key
SettingSchema.statics.getByKey = async function(key, defaultValue = null) {
  const setting = await this.findOne({ key });
  return setting ? setting.value : defaultValue;
};

// Static method to set a setting value
SettingSchema.statics.setByKey = async function(key, value, description = '', isProtected = false) {
  const setting = await this.findOne({ key });
  
  if (setting) {
    setting.value = value;
    setting.lastUpdated = Date.now();
    if (description) setting.description = description;
    if (isProtected !== undefined) setting.isProtected = isProtected;
    return await setting.save();
  } else {
    return await this.create({
      key,
      value,
      description,
      isProtected
    });
  }
};

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);