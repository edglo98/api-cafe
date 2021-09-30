import { response } from 'express'

export const loadFile = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' })
    return
  }

  const { file } = req.files

  const { pathname } = new URL(`../uploads/${file.name}`, import.meta.url)

  file.mv(pathname, (err) => {
    if (err) {
      return res.status(500).json({ err })
    }

    res.json({ msg: 'File uploaded to ' + pathname })
  })
}
