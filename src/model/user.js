import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
   
  },
  phone: {
    type: String,
    
  },
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model('User', UserModel);
