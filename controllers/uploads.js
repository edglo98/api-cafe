import { response } from 'express'
import { uploadFile } from '../helpers/uploadFile.js'

export const loadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ msg: 'No files were uploaded.' })
  }

  try {
    const nombre = await uploadFile(req.files, [
      'png',
      'jpg',
      'jpeg',
      'gif'
    ], '')
    res.json({ nombre })
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ error: err.message })
  }
}
