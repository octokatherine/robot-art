import { useState, useRef } from 'react'
import axios from 'axios'
import { Box, Card, Input, PrimaryButton, SecondaryButton } from '../components/base'
import styled from 'styled-components'
import withAuth from '../components/withAuth'
import RobotCard from '../components/RobotCard'

const Admin = ({ robots, setRobots }) => {
  const uploadInput = useRef(null)
  const [url, setUrl] = useState('')
  const [newRobotName, setNewRobotName] = useState('')

  const addRobot = (e) => {
    e.preventDefault()
    axios
      .post('/robots', {
        name: newRobotName,
        image: url,
      })
      .then((response) => {
        setUrl('')
        setNewRobotName('')
        setRobots((prev) => [...prev, response.data])
      })
  }

  const handleTextInputChange = (e) => {
    setNewRobotName(e.target.value)
  }

  const handleFileInputChange = () => {
    setUrl('')
    handleUpload()
  }

  const handleUpload = () => {
    let file = uploadInput.current.files[0]
    // Split the filename to get the name and type
    let fileParts = uploadInput.current.files[0].name.split('.')
    let fileName = fileParts[0]
    let fileType = fileParts[1]
    axios
      .post('/sign_s3', {
        fileName: fileName,
        fileType: fileType,
      })
      .then((response) => {
        var returnData = response.data.data.returnData
        var signedRequest = returnData.signedRequest
        var url = returnData.url
        setUrl(url)

        var options = {
          headers: {
            'Content-Type': fileType,
          },
        }
        axios.put(signedRequest, file, options).catch((error) => {
          console.log('ERROR ' + JSON.stringify(error))
        })
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      })
  }

  return (
    <Box px={[3, 4]}>
      <h1>Admin</h1>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(400px, max-content))"
        gridGap={3}
        maxWidth="1300px"
        mx="auto"
        justifyContent="center"
      >
        <Card p={3} display="flex" flexDirection="column" alignItems="center">
          <Form onSubmit={addRobot}>
            <H3>Add Robot</H3>
            <Box>
              <Input
                mb={4}
                label="Name"
                name="name"
                type="text"
                value={newRobotName}
                onChange={handleTextInputChange}
              />
              <input onChange={handleFileInputChange} ref={uploadInput} type="file" />
              <Box height="208px"></Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                <ClearButton>Clear</ClearButton>
                <PrimaryButton disabled={!(url && newRobotName)} type="submit">
                  Add Robot
                </PrimaryButton>
              </Box>
            </Box>
          </Form>
        </Card>
        {robots.map((robot) => (
          <RobotCard key={robot.id} name={robot.name} image={robot.image}>
            <Box display="flex" justifyContent="space-between">
              <PrimaryButton>Edit</PrimaryButton>
              <SecondaryButton>Delete</SecondaryButton>
            </Box>
          </RobotCard>
        ))}
      </Box>
    </Box>
  )
}

const H3 = styled.h3`
  text-align: center;
  margin-bottom: 48px;
`

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ClearButton = styled.a`
  margin-inline: 44px;
  text-decoration: underline;
`

export default withAuth(Admin)
