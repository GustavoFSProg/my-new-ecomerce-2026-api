import { ButtonHTMLAttributes } from 'react'
import { styled } from 'styled-components'

const StyledButton = styled.button<{ variant?: 'blue' | 'green' | 'red' | 'yellow' }>`
  padding: 1rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
  color: white;
  border: none;
  background: ${({ variant }) => {
    if (variant === 'blue') return '#0277bd'
    if (variant === 'green') return '#3faa83'
    if (variant === 'red') return '#b71c1c'
    if (variant === 'yellow') return '#ffeb3b'
    return 'gray'
  }};
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.4;
    cursor: auto;
  }
`

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'blue' | 'green' | 'red' | 'yellow'
}

export const Button = ({ variant, children, ...rest }: Props) => (
  <StyledButton variant={variant} {...rest}>
    {children}
  </StyledButton>
)
