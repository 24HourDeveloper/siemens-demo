import React from 'react'
import { TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native'

type InputTypes = {
  text: string
  setText: (text: string) => void
  placeholder: string
  password?: boolean
  styles?: StyleProp<TextStyle>
}

export default function Input({ text, setText, placeholder, password, styles }: InputTypes) {
  return (
    <TextInput
      value={text}
      placeholder={placeholder}
      secureTextEntry={password}
      onChangeText={(text) => setText(text)}
      style={[stylesSheet.searchInput, styles]}
    />
  )
}

const stylesSheet = StyleSheet.create({
  searchInput: {
    fontSize: 24,
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.0,
    elevation: 2,
    backgroundColor: 'white',
  },
})