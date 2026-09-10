import mongoose from "mongoose";


const resumeSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    education: {
  type: [mongoose.Schema.Types.Mixed],   // 👈 String se Mixed kiya
  default: [],
},

skills: {
  type: [String],   // ye waise hi rehne do, isme sirf strings hi aa rahe hain
  default: [],
},

projects: {
  type: [mongoose.Schema.Types.Mixed],   // 👈 String se Mixed kiya
  default: [],
},

experience: {
  type: [mongoose.Schema.Types.Mixed],   // 👈 String se Mixed kiya
  default: [],
},

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    suggestedRole: {
      type: String,
      default: "",
    },

    recommendations: {
      type: [String],
      default: [],
    },
},{timestamps:true})


const Resume = mongoose.model("Resume" , resumeSchema)

export default Resume