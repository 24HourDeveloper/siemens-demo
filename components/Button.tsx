import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme'

type ButtonTypes = {
  text: string
  onPress: () => void
}

export default function Button({ text, onPress }: ButtonTypes) {
  const theme = useColorScheme() ?? 'light'
  const color = theme === 'light' ? 'black' : '#121211'
  return (
    <TouchableOpacity onPress={onPress}  style={[styles.button, {backgroundColor: color}]}>
        <ThemedText style={{ fontSize: 20,color: 'white', textAlign: 'center' }}>{text}</ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 8
  }
})