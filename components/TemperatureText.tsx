import React from 'react'
import { ThemedText } from './ThemedText'

type TemperatureTextTypes = {
  size: "lg" | "sm"
  temp: number
  extraText?: string
}

export default function TemperatureText({ size, temp, extraText }: TemperatureTextTypes) {
  const small = { fontSize: 24 }
  const large = { fontSize: 48, lineHeight: 48 }
  const fontSize = size === "lg" ? large : small
  return (
    <ThemedText style={fontSize}>
      {extraText? `${extraText} ${Math.round(temp)}` : Math.round(temp)}°
    </ThemedText>
  )
}