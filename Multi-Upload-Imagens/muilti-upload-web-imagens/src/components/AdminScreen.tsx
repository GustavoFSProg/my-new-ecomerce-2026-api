import { ReactNode } from 'react'
import { Container, Main } from './styled'
import { Menu } from './Menu'

interface Props {
  children: ReactNode
}

export const AdminScreen = ({ children }: Props) => {
  return (
    <Container>
      <Menu />
      <Main>
        {children}
      </Main>
    </Container>
  )
}
