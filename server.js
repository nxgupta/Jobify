import "express-async-errors"
import express from "express"
import morgan from "morgan"
import * as dotenv from "dotenv"
import jobRouter from "./routes/jobRouter.js"
import mongoose from "mongoose"

dotenv.config()
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
let PORT = process.env.PORT || 5100

app.use("/api/v1/", jobRouter)

app.use("*", (req, res) => {
  res.status(404).json({msg: "not found"})
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({msg: "something went wrong"})
})

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`)
  })
} catch (error) {
  console.log("error:", error)
  process.exit(1)
}
