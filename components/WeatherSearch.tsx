import { TextInput, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useColorScheme } from '@/hooks/useColorScheme'
import Button from './Button'

type WeatherSearchTypes = {
  setLastFive: (text: string) => void
}

export default function WeatherSearch({ setLastFive }: WeatherSearchTypes) {
  const theme = useColorScheme() ?? 'light'
  const [input, setInput] = useState('')
  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        placeholder="Search for a city"
        style={styles.searchInput}
        onChangeText={(text) => setInput(text)}
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
  searchInput: {
    fontSize: 24,
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
    flex: 3,
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