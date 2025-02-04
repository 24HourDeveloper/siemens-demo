import React from 'react'
import { TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { Colors } from '@/constants/Colors'

type InputTypes = {
  text: string
  setText: (text: string) => void
  placeholder: string
  password?: boolean
  styles?: StyleProp<TextStyle>
}

export default function Input({ text, setText, placeholder, password, styles }: InputTypes) {
  const { shadow } = Colors
  return (
    <TextInput
      value={text}
      placeholder={placeholder}
      secureTextEntry={password}
      onChangeText={(text) => setText(text)}
      style={[stylesSheet.searchInput, styles, shadow]}
    />
  )
}

const stylesSheet = StyleSheet.create({
  searchInput: {
    fontSize: 24,
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
    backgroundColor: 'white'
  },
})