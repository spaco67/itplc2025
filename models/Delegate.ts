import mongoose from 'mongoose';

const DelegateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  kingschatPhone: {
    type: String,
    required: true,
  },
  kingschatHandle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  age: {
    type: Number,
    required: true,
  },
  zoneMinistryCenter: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Delegate || mongoose.model('Delegate', DelegateSchema);