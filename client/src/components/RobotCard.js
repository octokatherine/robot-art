import { Card } from './base'
import styled from 'styled-components'

const RobotCard = ({ name, image, children }) => {
  return (
    <Card p={3} display="flex" flexDirection="column" alignItems="center">
      <H3>{name}</H3>
      <Image src={image} />
    </Card>
  )
}

const H3 = styled.h3`
  text-align: center;
  margin-bottom: 48px;
`

const Image = styled.img`
  height: 320px;
`

export default RobotCard
