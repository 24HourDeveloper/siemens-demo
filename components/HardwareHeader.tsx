import { TouchableOpacity, View, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme'

type HardwareHeaderTypes = {
  title: string
  scanBtnText: string
  scanAction: () => void
}

export default function HardwareHeader ({ title, scanBtnText, scanAction }: HardwareHeaderTypes) {
  const theme = useColorScheme() ?? 'light'
  const color = theme === 'light' ? 'black' : '#121211'
  return (
    <View style={styles.container}>
      <ThemedText style={{ fontSize: 20 }}>{title}</ThemedText>
      <TouchableOpacity onPress={scanAction}  style={[styles.scannedItem, {backgroundColor: color}]}>
        <ThemedText style={{ fontSize: 20,color: 'white' }}>{scanBtnText}</ThemedText>
      </TouchableOpacity>
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
    marginTop: 20
  },
  scannedItem: {
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  }
})