import { Box, Card } from './base'
import styled from 'styled-components'

const RobotCard = ({ name, image, children }) => {
  return (
    <Card
      p="24px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <H3>{name}</H3>
        <Image src={image} />
      </Box>
      {children}
    </Card>
  )
}

const H3 = styled.h3`
  text-align: center;
  margin-bottom: 28px;
`

const Image = styled.img`
  height: 310px;
`

export default RobotCard
