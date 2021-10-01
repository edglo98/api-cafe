import { response } from 'express'
import { v4 as uuidv4 } from 'uuid'

export const loadFile = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' })
    return
  }

  const validExtension = ['png', 'jpg', 'jpeg', 'gif']
  const { file } = req.files

  const nameWithDotsSplited = file.name.split('.')

  const [extension] = nameWithDotsSplited.splice(nameWithDotsSplited.length - 1, 1)

  const slugName = nameWithDotsSplited
    .map(element => element.replace(/ /g, '_'))
    .concat([uuidv4()])
    .join('_')

  if (!validExtension.includes(extension)) {
    return res.status(400).json({
      msg: `La extension ${extension} no es permitida. Extensiones permitidas son: ${validExtension}`
    })
  }

  const { pathname } = new URL(`../uploads/${slugName}.${extension}`, import.meta.url)

  file.mv(pathname, (err) => {
    if (err) {
      return res.status(500).json({ err })
    }

    res.json({ msg: 'File uploaded to ' + pathname })
  })
}
