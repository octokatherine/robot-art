import { useState, useRef } from 'react'
import axios from 'axios'
import { Box, Card, Input, PrimaryButton } from '../components/base'
import styled from 'styled-components'
import withAuth from '../components/withAuth'

const Admin = () => {
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
      <Card p={3} display="flex" flexDirection="column" alignItems="center">
        <StyledForm onSubmit={addRobot}>
          <StyledH3>Add Robot</StyledH3>
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
        </StyledForm>
      </Card>
    </Box>
  )
}

const StyledH3 = styled.h3`
  text-align: center;
  margin-bottom: 48px;
`

const StyledForm = styled.form`
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
