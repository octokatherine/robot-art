import { useState, useRef } from 'react'
import axios from 'axios'
import { Box, Card, Input } from '../components/base'

const Admin = () => {
  const uploadInput = useRef(null)
  const [url, setUrl] = useState('')
  const [newRobotName, setNewRobotName] = useState('')

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
            console.log('response :>> ', response)
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
        <h3>Add Robot</h3>
        <Input
          mb={4}
          label="Name"
          name="name"
          type="text"
          value={newRobotName}
          onChange={handleTextInputChange}
        />
        <input onChange={handleFileInputChange} ref={uploadInput} type="file" />
      </Card>
    </Box>
  )
}

export default Admin
