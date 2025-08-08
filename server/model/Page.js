import mongoose from "mongoose";

// Define the schema for each task
const taskSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
},
    completed: { 
        type: Boolean, 
        default: false 
    },
}, 
{ 
    _id: true 
}); // Keep _id to help with ordering and updates

// Main Page schema
const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  content: {
    type: String,
    default: "", // notes textarea content
  },

  tasks: [taskSchema], // draggable task list

  parentPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
    default: null,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Page = mongoose.model("Page", pageSchema);
export default Page;
