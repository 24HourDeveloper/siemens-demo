import React from "react"
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import useWifi from "@/hooks/useWifi"
import { ThemedText } from "@/components/ThemedText"
import { useThemeColor } from '@/hooks/useThemeColor'

const WifiScanner = () => {
  const { wifiList, connectedSSID, scanWifi, connectToWifi } = useWifi()
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.container}>
        {connectedSSID && <ThemedText style={{ fontSize: 20 }}>Connected to: {connectedSSID}</ThemedText>}
        <TouchableOpacity onPress={scanWifi}  style={[styles.scannedItem, {borderColor: color}]}>
          <ThemedText style={{ fontSize: 20 }}>Scan Wi-Fi Networks</ThemedText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={wifiList}
        keyExtractor={(item) => item.BSSID}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.scannedItem, {borderColor: color}]}
            onPress={() => connectToWifi(item.SSID, "your_password")}
          >
            <ThemedText>SSID: {item.SSID}</ThemedText>
            <ThemedText>BSSID: {item.BSSID}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default WifiScanner

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
