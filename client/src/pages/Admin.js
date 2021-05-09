import { useState, useRef } from 'react'
import axios from 'axios'
import { Box, Card, Input, PrimaryButton } from '../components/base'
import styled from 'styled-components'
import withAuth from '../components/withAuth'

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
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            console.log(response)
          })
          .catch((error) => {
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
      <Box display="flex" flexWrap="wrap" justifyContent="center" maxWidth="1300px" mx="auto">
        <Card p={3} mx={3} mb={3} display="flex" flexDirection="column" alignItems="center">
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
              <Box height="208px">
                <input onChange={handleFileInputChange} ref={uploadInput} type="file" />
              </Box>
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
          <Card
            key={robot.id}
            p={3}
            mx={3}
            mb={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <H3>{robot.name}</H3>
            <Image src={robot.image} />
          </Card>
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

const Image = styled.img`
  height: 320px;
`

const ClearButton = styled.a`
  margin-inline: 44px;
  text-decoration: underline;
`

export default withAuth(Admin)
