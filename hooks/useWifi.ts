import { PermissionsAndroid, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import WifiManager, { WifiEntry } from "react-native-wifi-reborn"

export default function useWifi() {
  const [wifiList, setWifiList] = useState<WifiEntry[]>([])
  const [connectedSSID, setConnectedSSID] = useState<string | null>(null)
  
  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Permission Denied", "Location permission is required to scan Wi-Fi networks.")
    }
  }
  
  const scanWifi = async () => {
    try {
      const networks = await WifiManager.loadWifiList()

      setWifiList((prevNetworks) => {
        return networks.filter((network) => {
          const isDuplicate = prevNetworks.some(n => n.SSID === network.SSID)
          return isDuplicate ? prevNetworks : [...prevNetworks, network]
        })
      })
    } catch (error) {
      console.error("Error scanning Wi-Fi", error)
    }
  }

  const connectToWifi = async (ssid: string, password: string | null) => {
    try {
      await WifiManager.connectToProtectedSSID(ssid, password, false, false)
      Alert.alert("Connected", `Connected to ${ssid}`)
      getCurrentWifi()
    } catch (error: any) {
      Alert.alert("Connection Failed", error.message)
    }
  }

  const getCurrentWifi = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID()
      setConnectedSSID(ssid)
    } catch (error) {
      setConnectedSSID(null)
    }
  }

  useEffect(() => {
    requestPermissions()
    getCurrentWifi()
  }, [])

  return { wifiList, connectedSSID, scanWifi, connectToWifi }
}