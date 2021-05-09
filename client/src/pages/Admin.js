import { useState, useRef } from 'react'
import axios from 'axios'

const Admin = () => {
  const uploadInput = useRef(null)
  const [url, setUrl] = useState('')

  const handleChange = (ev) => {
    setUrl('')
  }

  const handleUpload = (ev) => {
    let file = uploadInput.current.files[0]
    // Split the filename to get the name and type
    let fileParts = uploadInput.current.files[0].name.split('.')
    let fileName = fileParts[0]
    let fileType = fileParts[1]
    console.log('Preparing the upload')
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
        console.log('Recieved a signed request ' + signedRequest)

        var options = {
          headers: {
            'Content-Type': fileType,
          },
        }
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            console.log('Response from s3')
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
    <div>
      <center>
        <h1>UPLOAD A FILE</h1>
        <input onChange={handleChange} ref={uploadInput} type="file" />
        <br />
        <button onClick={handleUpload}>UPLOAD</button>
      </center>
    </div>
  )
}
export default Admin
