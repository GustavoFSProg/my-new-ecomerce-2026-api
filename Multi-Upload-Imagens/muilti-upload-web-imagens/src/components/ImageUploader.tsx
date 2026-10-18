import React, { useCallback, useState } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'
import { AxiosResponse } from 'axios'
import { styled } from 'styled-components'
import { api } from '../api'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  padding: 3rem;
  margin: 2rem;
`
const Message = styled.div`
  padding: 3rem;
  border-radius: 0.5rem;
  border: 1px dashed darkgray;
`

interface Product {
  id: string
  name: string
  price: string
  image: string
  createdAt: string
  updatedAt: string
}
const initialState = [{ id: '', name: '', price: '0.0', image: '', createdAt: '', updatedAt: '' }]

let Name = ''
let Price = ''

const ImageUploader: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false)
  // const [progress, setProgress] = useState<number>(0)
  const [products, setProducts] = useState<Product[]>(initialState)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  
  const handleDropAsync = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        console.log('Rejected files:', fileRejections)
        return
      }

      setUploading(true)
      
      try {
      const formData = new FormData()
    console.log(`nOME: ${name}`),
        
        
        acceptedFiles.forEach((file) => formData.append('image', file))
        formData.append('name', Name)
        formData.append('price', Price)
        const response: AxiosResponse<[]> = await api.post('/products', formData, {
          onUploadProgress: (event) => {
            const progress: number = Math.round((event.loaded * 100) / (event.total || 1))
            console.log(`As imagens estão ${progress}% carregadas...`)
          },
        })

        setUploading(false)
        const newUploadedImages = response.data
        setProducts(newUploadedImages)
      } catch (error: unknown) {
        console.error('Error uploading images:', error)
        setUploading(false)
      }
    },
    []
  )

  const onDropCallback = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      handleDropAsync(acceptedFiles, fileRejections).catch((error) => {
        console.error('Error in handleDropAsync:', error)
      })
    },
    [handleDropAsync]
  )
  
  function handleInputs(event: { preventDefault: () => void })
  {
      event.preventDefault()

      Name = name
      Price = price


    return console.log(`MEU CU:${name}`)
  }

  return (
    <>
      <Dropzone onDrop={onDropCallback} multiple accept={{ 'image/*': [] }}>
        {({ getRootProps, getInputProps }) => (
          <Wrapper {...getRootProps()}>
            <input {...getInputProps()} />
            <Message>Arraste e solte as imagens aqui ou clique para selecionar.</Message>
            {uploading && <p>Carregando...</p>}
          </Wrapper>
        )}
      </Dropzone>

      <div style={{display: 'flex', width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginLeft: '80px'
    }}>

            <form onSubmit={handleInputs}>



      NOME:
      <input type="text"
      id="name"
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)} 
      style={{display: 'flex', width: '24rem',
      height: '2rem',
      fontSize: '15px',
      paddingTop: '16px',
      paddingBottom: '17px',
      // paddingRight: '12px',
      paddingLeft: '14px',
     borderRadius: '10px'
    }}
      />

      <br />

      Preço:
      <input type="text"
       style={{display: 'flex', width: '  14rem',
       height: '2rem',
       fontSize: '15px',
       paddingTop: '16px',
       paddingBottom: '17px',
       // paddingRight: '12px',
       paddingLeft: '14px',
      borderRadius: '10px'}}
      id="price"
      name="price"
      value={price}
      onChange={(e) => setPrice(e.target.value)} />
      <br />


      <button style={{
        marginLeft: "20px",
        width: '10rem', height: '30px', borderRadius: '10px'}} type="submit">
        CADASTRO
      </button>

      </form>
      </div>
      <br />
      <br />
      <br />

      

      {products !== initialState && (
        <div>
          <h3>Produtos carregados:</h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {products.map((product, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <img src={product.image} alt={String(index)} width="160" />
                <p> ID produto: {product.id}</p>
                <p>Nome do produto: {product.name}</p>
                <p>Preço: {product.price}</p>
                <p>Data de cadastro: {product.createdAt}</p>
                <p>Data de atualização: {product.updatedAt}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageUploader
