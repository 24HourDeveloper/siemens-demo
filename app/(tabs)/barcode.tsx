import React, { useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Camera } from 'react-native-camera-kit'
import { ThemedText } from '@/components/ThemedText'
import ListItemContainer from '@/components/ListItemContainer'

export default function BarcodeScanner() {
  const [scannedCodes, setScannedCodes] = useState<string[]>([])

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
              return (
                <ListItemContainer>
                  <ThemedText>{item}</ThemedText>
                </ListItemContainer>
              )
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
  }
})
