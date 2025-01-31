import React from "react"
import { View } from "react-native"
import useWifi from "@/hooks/useWifi"
import { ThemedText } from "@/components/ThemedText"
import HardwareHeader from "@/components/HardwareHeader"
import ScannedList from "@/components/ScannedList"

export default function WifiScanner() {
  const { wifiList, connectedSSID, scanWifi, connectToWifi } = useWifi()

  return (
    <View style={{ padding: 10 }}>
      <HardwareHeader
        scanAction={scanWifi}
        scanBtnText="Scan Wi-Fi"
        title={connectedSSID ? `Connected to: ${connectedSSID}` : ""}
      />
      <ScannedList
        items={wifiList}
        onPress={(item) => connectToWifi(item.SSID, "your_password")}
      >
        {(item) => (
          <>
            <ThemedText>SSID: {item.SSID}</ThemedText>
            <ThemedText>BSSID: {item.BSSID}</ThemedText>
          </>
        )}
      </ScannedList>
    </View>
  )
}
