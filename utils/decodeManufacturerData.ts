import { Buffer } from 'buffer'

export const decodeManufacturerData = (manufacturerData: string | null) => {
  if (!manufacturerData) {
    return null
  }
  const buffer = Buffer.from(manufacturerData, 'base64')
  const companyIdentifier = buffer.readUInt16LE(0)
  const data = buffer.slice(2).toString('hex')

  return { companyIdentifier, data }
}