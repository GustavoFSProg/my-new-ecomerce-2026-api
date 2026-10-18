import { styled } from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
  height: 100vh;
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 1rem;
  height: 100vh;
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0.5rem 0;
  max-width: 200px;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`
