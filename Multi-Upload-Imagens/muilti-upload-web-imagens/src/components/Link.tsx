import { ReactNode } from 'react'
import { Link as RLink } from 'react-router-dom'
import { styled } from 'styled-components'

interface Props {
  to: string
  children: ReactNode
}

const StyledLink = styled(RLink)`
  color: #f2f2f2;
  padding: 0.5rem 1rem;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: lightcoral;
  }
`

export const Link = ({ to, children }: Props) => <StyledLink to={to}>{children}</StyledLink>
