import { PermissionsAndroid, Platform, Alert } from 'react-native'
import { useMemo, useEffect, useState } from 'react'
import { BleManager, Device, Characteristic } from 'react-native-ble-plx'

export default function useBluetooth() {
  const bluetoothManager = useMemo(() => new BleManager(), [])
  const [devices, setDevices] = useState<Device[]>([])
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([])

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'ios') {
      return true
    }
    if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
      const apiLevel = parseInt(Platform.Version.toString(), 10)
  
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        return granted === PermissionsAndroid.RESULTS.GRANTED
      }
      if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ])
  
        return (
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        )
      }
    }
    return false
  }

  useEffect(() => {
    requestBluetoothPermission()
    return () => {
        bluetoothManager.destroy()
    }
  }, [])

  async function scanAndConnect() {
    setDevices([])

    bluetoothManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scanning error:', error)
        return
      }

      if (device && device.id) {
        setDevices(prevDevices => {
          const isDuplicate = prevDevices.some(d => d.id === device.id)
          return isDuplicate ? prevDevices : [...prevDevices, device]
        })
      }
    })

    setTimeout(() => {
        bluetoothManager.stopDeviceScan()
    }, 5000)
  }

  const connectToDevice = async (device: Device) => {
    let allCharacteristics = []
    try {
      const connectedDevice = await bluetoothManager.connectToDevice(device.id)
      await connectedDevice.discoverAllServicesAndCharacteristics()
      const services = await connectedDevice.services()
      console.log('SERVICES:', services)
      for (const service of services) {
        const chars = await service.characteristics()
        allCharacteristics.push(...chars)
      }
      console.log('characteristics:', allCharacteristics)
      setConnectedDevice(connectedDevice)
      setCharacteristics(allCharacteristics)
      return true
    } catch (error) {
      console.error('Connection error:', error)
      Alert.alert('Error', 'Failed to connect to device')
      return false
    }
  }

  return {
    devices,
    connectedDevice,
    characteristics,
    scanAndConnect,
    connectToDevice
  }
}