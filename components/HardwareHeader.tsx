import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import Button from './Button'

type HardwareHeaderTypes = {
  title: string
  scanBtnText: string
  scanAction: () => void
}

export default function HardwareHeader ({ title, scanBtnText, scanAction }: HardwareHeaderTypes) {
  return (
    <View style={styles.container}>
      <ThemedText style={{ fontSize: 24 }}>{title}</ThemedText>
      <Button text={scanBtnText} onPress={scanAction} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  }
})