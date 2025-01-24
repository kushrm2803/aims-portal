import mongoose from "mongoose";

const ProfessorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String },
});

export const Professor = mongoose.models.Professor || mongoose.model("Professor", ProfessorSchema);
