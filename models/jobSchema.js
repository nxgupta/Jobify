import mongoose from "mongoose"
import {JOB_STATUS, JOB_TYPE} from "../utils/contants.js"
let jobSchema = new mongoose.Schema(
  {
    company: {type: String},
    position: {type: String},
    jobStatus: {type: String, enum: Object.values(JOB_STATUS), default: JOB_STATUS.PENDING},
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
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
