import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Product } from './pages/Product'
import { Images } from './pages/Images'

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/images" element={<Images />} />
    </Routes>
  </BrowserRouter>
)
