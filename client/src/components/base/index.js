import styled from 'styled-components'
import { space, layout, color, flexbox, grid, position } from 'styled-system'

export const Box = styled.div`
  ${space}
  ${layout}
  ${color}
  ${flexbox}
  ${position}
  ${grid}
`

export const Card = styled.div`
  background-color: white;
  box-shadow: 0px 9px 15px -9px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  width: 390px;
  height: 530px;
  overflow: hidden;
  ${space}
  ${layout}
  ${color}
  ${flexbox}
  ${position}
  @media (max-width: 422px) {
    width: calc(100vw - 32px);
  }
`

const InputField = styled.input`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.palette.gray1};
  font-size: 1.22em;
  padding-inline: 24px;
  ${space}
`

const InputLabel = styled.label`
  font-family: sans-serif;
  color: ${(props) => props.theme.palette.gray2};
  background-color: white;
  position: absolute;
  left: 25px;
  top: -13px;
  font-size: 18px;
  padding-inline: 5px;
`

export const Input = ({ label, name, ...props }) => (
  <Box width="100%" position="relative">
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <InputField name={name} {...props} />
  </Box>
)

export const PrimaryButton = styled.button`
  background: ${(props) => props.theme.palette.gray3};
  color: white;
  border-radius: 8px;
  font-size: 1.2rem;
  padding-block: 0.8em;
  width: 100%;
  border: 2px solid ${(props) => props.theme.palette.gray3};
  ${space}
  ${layout}

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.palette.gray2};
    border: 2px solid ${(props) => props.theme.palette.gray2};
  }

  &:disabled {
    background: ${(props) => props.theme.palette.gray1};
    border: 2px solid ${(props) => props.theme.palette.gray1};
    color: #41424266;
  }
`

export const SecondaryButton = styled.button`
  background: white;
  border-radius: 8px;
  color: ${(props) => props.theme.palette.gray3};
  border: 2px solid ${(props) => props.theme.palette.gray3};
  font-size: 1.2rem;
  padding-block: 0.8em;
  width: 100%;
  ${space}

  &:hover {
    cursor: pointer;
  }
`
