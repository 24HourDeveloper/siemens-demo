import React, { useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Camera } from 'react-native-camera-kit'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function BarcodeScanner() {
  const [scannedCodes, setScannedCodes] = useState<string[]>([])
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')
  const theme = useColorScheme() ?? 'light'

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
        <View style={{ marginTop: 20}}>
          <FlatList
            data={scannedCodes}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => {
              return <View style={[styles.scannedItem, { backgroundColor: theme === 'light' ? 'white' : '#121211' }]}>
                <ThemedText>{item}</ThemedText>
              </View>
            }}
          />
        </View>
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
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.0,
    elevation: 2,
  }
})
