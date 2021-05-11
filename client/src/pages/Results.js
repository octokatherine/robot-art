import { Box } from '../components/base'
import RobotCard from '../components/RobotCard'
import styled from 'styled-components'
import withAuth from '../components/withAuth'

const Results = ({ robots }) => {
  const totalVotes = robots.reduce((acc, robot) => {
    return acc + robot.votes.length
  }, 0)

  return (
    <Box px={[3, 4]}>
      <h1>Results</h1>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(400px, max-content))"
        gridGap={3}
        maxWidth="1300px"
        mx="auto"
        my={5}
        justifyContent="center"
        justifyItems="center"
      >
        {robots.map((robot) => (
          <RobotCard key={robot.id} name={robot.name} image={robot.image}>
            {
              <Box width={1} display="flex" flexDirection="column" alignItems="center">
                <Box mb={3}>
                  <VotesText>{robot.votes.length}</VotesText>
                  <TotalVotesText>/{totalVotes}</TotalVotesText>
                </Box>
                <MeterOutline>
                  <MeterFill width={robot.votes.length / totalVotes} />
                </MeterOutline>
              </Box>
            }
          </RobotCard>
        ))}
      </Box>
    </Box>
  )
}

const VotesText = styled.span`
  font-size: 40px;
  color: ${(prop) => prop.theme.palette.gray3};
`

const TotalVotesText = styled.span`
  font-size: 22px;
  color: ${(prop) => prop.theme.palette.gray2};
`

const MeterOutline = styled.div`
  border: 2px solid #d8dadb;
  border-radius: 8px;
  width: 100%;
  height: 34px;
  padding: 2px;
`

const MeterFill = styled.div`
  width: ${(props) => props.width * 100}%;
  background-color: ${(props) => props.theme.palette.gray3};
  height: 100%;
  border-radius: 5px;
`

export default withAuth(Results)
