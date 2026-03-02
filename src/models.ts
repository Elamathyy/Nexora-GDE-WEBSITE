import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  skills: [String],
  points: { type: Number, default: 0 },
  github: String,
  linkedin: String,
  eventsParticipated: { type: Number, default: 0 },
  rank: Number,
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  status: { type: String, enum: ['LIVE', 'UPCOMING', 'PAST'], default: 'UPCOMING' },
  description: String,
  image: String,
});

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
