import cors from 'cors'
import express, { Router } from 'express'
import { ProductRoutes } from '../src/routes/ProductRoutes'
// import { uploaderConfig } from './uploader_old'
import dotenv from 'dotenv'
// import { uploaderConfig } from 'config/uploader_old'

dotenv.config()

const {PORT} = process.env


  const server = express()
//   server.use('*', uploaderConfig)
  server.use(express.json())
  server.use(cors({
    origin: ['http://localhost:5173', "https://my-upload.netlify.app"]
    
  }))
  server.use(ProductRoutes)
  // server.use('*', uploaderConfig)


  // eslint-disable-next-line no-console
  server.listen(PORT, () => console.log(`⚡ Server is running on port ${PORT} 🎉`))

