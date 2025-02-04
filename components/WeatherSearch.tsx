import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'

type WeatherSearchTypes = {
  setLastFive: (text: string) => void
}

export default function WeatherSearch({ setLastFive }: WeatherSearchTypes) {
  const [input, setInput] = useState('')
  return (
    <View style={styles.container}>
      <Input
        text={input}
        setText={setInput}
        placeholder="Search for a city"
        styles={{ flex: 3 }}
      />
      <Button
        text={'Search'}
        styles={styles.searchBtn}
        onPress={() => {
          setLastFive(input)
          setInput('')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBtn: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
})