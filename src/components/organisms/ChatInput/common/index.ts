import popup from '../../../../store/popup'

import { convertByteToMByte } from '../../../../utils'
import { FILE_LIMITS } from '../../../../config'

export const isFileValid = (incomingFile: File): boolean => {
  const convertedSize: number = convertByteToMByte(incomingFile.size)

  if (convertedSize > FILE_LIMITS.size) {
    popup.setMessage({
      type: 'error',
      text: `File must be less than 2 MB \n Upload another file`
    })
    return false
  }

  if (Object.values(FILE_LIMITS.types).every((mimeTypes) => mimeTypes.every((item) => item !== incomingFile.type))) {
    popup.setMessage({
      type: 'error',
      text: `Wrong file format \n Upload another file`
    })
    return false
  }

  return true
}
