import { useState } from 'react'
import { AdminScreen } from '../components/AdminScreen'
import { Input } from '../components/Input'
import ImageUploader from '../components/ImageUploader'

export const Product = () => {
  const [price, setPrice] = useState<string>('')

  return (
    <AdminScreen >
      Cadastrar novo produto
      <Input
        type="number"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço do produto"
      />
      Arraste e solte as imagens no campo abaixo
      <ImageUploader />
    </AdminScreen>
  )
}
