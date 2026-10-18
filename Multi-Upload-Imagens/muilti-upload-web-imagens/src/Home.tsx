/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminScreen } from './components/AdminScreen'
import {api} from './api'
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


 const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  margin-top: 70px;

 `

export function Home(){
   const [prods, setProds] = useState<any>([])

   const navigate = useNavigate()


   async function getProdusts(){

 const data: any =   await api.get('/products')

 // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
 setProds(data.data.products)
 console.log(prods)
      
   }

   function getProfileProduct(id: any){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    sessionStorage.setItem('Product-Id', id)

    navigate('/images')
    // return alert("Sucesso!")
   }

   useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getProdusts()
   }, [])

   return(

  <AdminScreen title="Home">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum non sem id commodo. Donec
    dapibus efficitur leo lacinia ornare. Sed maximus ligula et elit luctus tempus. In blandit quis
    nibh nec elementum. Nunc vehicula vitae orci ac interdum. Curabitur non quam justo. Quisque sit
    amet enim porta, iaculis metus ut, facilisis diam. Quisque fermentum nisi ligula, ac pharetra
   
    <div>
      <ProductsContainer >
    {prods.map((item: { id: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; image: string | undefined }) => {
      return (
    <div style={{marginBottom: '50px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
     alignItems: 'center'}}
      onClick={() => getProfileProduct(item.id)}
     >

        <h2 style={{marginBottom: '10px'}}>
          
           {item.name}
        </ h2>
        <p  style={{marginBottom: '10px'}}>
          
          R$ {item.price}
        </ p>
        <img src={item.image} width='180' />
        </ div>

)
})}
</ProductsContainer>
        </ div>
  </AdminScreen>
)
}


