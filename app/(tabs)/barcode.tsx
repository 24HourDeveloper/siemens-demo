import React, { useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Camera } from 'react-native-camera-kit'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

export default function BarcodeScanner() {
  const [scannedCodes, setScannedCodes] = useState<string[]>([])
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')

  const onBarcodeScan = (event: { nativeEvent: { codeStringValue: string } }) => {
    const scannedValue = event.nativeEvent.codeStringValue

    if (!scannedCodes.includes(scannedValue)) {
      setScannedCodes((prev) => {
        const newScans = [scannedValue, ...prev]
        return newScans.slice(0, 5) 
      })
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Camera
          scanBarcode={true}
          onReadCode={onBarcodeScan}
          showFrame={true}
          laserColor={'red'}
          frameColor={'blue'}
          style={{flex: 1}}
        />
      </View>
      <View style={styles.listContainer}>
        <ThemedText type="subtitle">Last 5 Scanned Barcodes</ThemedText>
        <FlatList
          data={scannedCodes}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => {
            return <View style={[styles.scannedItem, { borderColor: color }]}>
              <ThemedText>{item}</ThemedText>
            </View>
          }}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
    flex: 1
  },
  scannedItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  }
})
