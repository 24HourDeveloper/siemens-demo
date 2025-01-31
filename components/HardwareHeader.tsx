import { TouchableOpacity, View, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

type HardwareHeaderTypes = {
  title: string
  scanBtnText: string
  scanAction: () => void
}

export default function HardwareHeader ({ title, scanBtnText, scanAction }: HardwareHeaderTypes) {
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')
  return (
    <View style={styles.container}>
      <ThemedText style={{ fontSize: 20 }}>{title}</ThemedText>
      <TouchableOpacity onPress={scanAction}  style={[styles.scannedItem, {borderColor: color}]}>
        <ThemedText style={{ fontSize: 20 }}>{scanBtnText}</ThemedText>
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
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  }
})