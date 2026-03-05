import ImageKit from '@imagekit/nodejs';
import 'dotenv/config'

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

export async function uploadFile(file, fileName) {
  try {
    const response = await client.files.upload({
      file: file.toString("base64"),
      fileName: fileName
    })
  
    return response
  } catch (error) {
    console.error("File upload failed", error)
    throw error
  }
}