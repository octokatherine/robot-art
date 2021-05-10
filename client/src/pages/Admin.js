import { useState, useRef } from 'react'
import axios from 'axios'
import { Box, Card, Input, PrimaryButton, SecondaryButton } from '../components/base'
import styled from 'styled-components'
import withAuth from '../components/withAuth'
import withAdmin from '../components/withAdmin'
import RobotCard from '../components/RobotCard'
import { ReactComponent as UploadIcon } from '../images/upload-icon.svg'

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
        setRobots((prev) => [response.data, ...prev])
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

  const onDelete = (id) => {
    axios
      .delete(`/robots/${id}`)
      .then(() => {
        setRobots((prev) => prev.filter((robot) => robot.id !== id))
      })
      .catch((err) => console.log(err))
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
        my={5}
        justifyContent="center"
        justifyItems="center"
      >
        <Card p="24px" display="flex" flexDirection="column" alignItems="center">
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
              <Label htmlFor="image-upload">
                <Upload />
                Select Image to Upload
                <FileInput
                  id="image-upload"
                  onChange={handleFileInputChange}
                  ref={uploadInput}
                  type="file"
                />
              </Label>
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
            <Box width={1} display="flex" justifyContent="space-between">
              <PrimaryButton mr={2}>Edit</PrimaryButton>
              <SecondaryButton ml={2} onClick={() => onDelete(robot.id)}>
                Delete
              </SecondaryButton>
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

const FileInput = styled.input`
  display: none;
`

const Label = styled.label`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  height: 200px;
  cursor: pointer;
  background-color: #eceef0;
  border: 2px dashed #737475;
`

const Upload = styled(UploadIcon)`
  margin-bottom: 16px;
`

export default withAdmin(withAuth(Admin))
