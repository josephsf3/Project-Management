import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({

  name: { 
    type: String, 
    required: true 
  },
  progress: { 
    type: Number, 
    min: 0, 
    max: 100, 
    default: 0 
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
  team: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  status: {
    type: String,
    enum: ['on-track', 'at-risk', 'completed', 'delayed'],
    default: 'on-track'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


export default mongoose.model('Project', projectSchema);
