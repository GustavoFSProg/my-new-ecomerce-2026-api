

model Products {
  id        String   @id @default(uuid())
  name      String   @db.VarChar(50)
  price     Float
  image     String
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt
}