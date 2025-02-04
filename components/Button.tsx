import React from 'react'
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { ThemedText } from './ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme'

type ButtonTypes = {
  text: string
  onPress: () => void
  styles?: StyleProp<ViewStyle>
}

export default function Button({ text, onPress, styles }: ButtonTypes) {
  const theme = useColorScheme() ?? 'light'
  const color = theme === 'light' ? 'black' : '#121211'
  return (
    <TouchableOpacity onPress={onPress}  style={[stylesSheet.button, {backgroundColor: color}, styles]}>
        <ThemedText style={stylesSheet.text}>{text}</ThemedText>
    </TouchableOpacity>
  )
}

const stylesSheet = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 8
  },
  text: {
    fontSize: 24,
    color: 'white'
  }
})