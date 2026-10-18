import cors from 'cors'
import express, { Router } from 'express'
import { uploaderConfig } from './uploader_old'

export const startServer = (port: string, routes: Router[]) => {
  if (!port) throw Error(`Port is required to start server`)
  if (!routes) throw Error(`Routes are required to start server`)

  const server = express()
  server.use('*', uploaderConfig)
  server.use(express.json())
  server.use(cors({
    origin: '*'
  }))
  server.use(routes)

  // eslint-disable-next-line no-console
  server.listen(port, () => console.log(`⚡ Server is running on port ${port} 🎉`))
}
