/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { AdminScreen } from "../components/AdminScreen";
import { api } from "../api";
import styled from "styled-components";

const GridConteiner = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  width: 50vw;
  height: auto;
  justify-content: center;
  margin-left: 55px;
`;

export const Images = () => {
  const [products, setProducts] = useState<any>([]);
  const [one, setOne] = useState<any>({});

  async function GetProductImages() {
    const id = sessionStorage.getItem("Product-Id");

    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const { data } = await api.get(`/images/${id}`);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setProducts(data.data);

      console.log(products);
    } catch (error) {
      return error;
    }
  }

  async function getOne() {
    try {
      const id = sessionStorage.getItem("Product-Id");

      const { data } = await api.get(`/get-one-product/${id}`);

      setOne(data);

      console.log(` EE: ${data.name}`);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    void (void GetProductImages(), getOne());
  }, []);

  return (
    <AdminScreen>
      <h1>{one.name}</h1>
      <br />
      <br />
      <GridConteiner>
        {products.map(
          (item: {
            id:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            images: string | undefined;
          }) => {
            return (
              <div>
                <p>{item.id}</p>

                <img src={item.images} alt="images" width="200" />
                <br />
                <br />
              </div>
            );
          }
        )}
      </GridConteiner>
    </AdminScreen>
  );
};
