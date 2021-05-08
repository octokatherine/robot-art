import styled from 'styled-components'
import { space, layout, color, flexbox, position } from 'styled-system'

export const Box = styled.div`
  ${space}
  ${layout}
  ${color}
  ${flexbox}
  ${position}
`

const InputField = styled.input`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.palette.gray1};
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
  ${space}
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
`