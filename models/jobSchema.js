import mongoose from "mongoose"
let jobSchema = new mongoose.Schema(
  {
    job: {type: String},
    position: {type: String},
    jobStatus: {type: String, enum: ["interview", "declined", "pending"], default: "pending"},
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("job", jobSchema)
