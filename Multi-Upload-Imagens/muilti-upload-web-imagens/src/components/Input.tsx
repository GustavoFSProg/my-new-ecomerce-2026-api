import { InputHTMLAttributes } from 'react'
import { styled } from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin: 0.5rem 0;
  border-radius: 8px;
`

export const StyledInput = styled.input<{ invalid?: boolean }>`
  display: flex;
  height: 50px;
  width: 100%;
  background: #fefefe;
  border: none;
  box-shadow: ${({ invalid }) =>
    invalid ? '0px 0px 5px 1px #da001a' : '0px 0px 5px 1px rgba(37, 0, 50, 0.25)'};
  border-radius: 8px;
  padding: 0 1rem;
  border-radius: 8px;
  color: ${({ disabled }) => (disabled ? '#9a9a9a' : '#353535')};
  outline-color: transparent;
  :focus + label {
    font-size: 0.7rem;
    margin-top: -2rem;
  }
  :focus {
    box-shadow: ${({ invalid }) =>
      invalid ? '0px 0px 5px 1px #da001a' : '0px 0px 5px 1px rgba(37, 0, 50, 1)'};
  }
`
export const Label = styled.label<{ invalid?: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 1rem;
  font-size: 0.7rem;
  margin-top: -2rem;
  color: ${({ invalid }) => (invalid ? '#da001a' : '#9a9a9a')};
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
`

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <InputContainer>
      <Label>{props.value ? props.placeholder : null}</Label>
      <StyledInput {...props} />
    </InputContainer>
  )
}
