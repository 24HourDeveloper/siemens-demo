import { useState } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, Alert } from 'react-native'
import { Characteristic, Device } from 'react-native-ble-plx'
import { ThemedText } from '@/components/ThemedText'
import useBluetooth from '@/hooks/useBluetooth'
import { decodeManufacturerData } from '@/utils/decodeManufacturerData'
import HardwareHeader from '@/components/HardwareHeader'
import ScannedList from '@/components/ScannedList'
import HardwareModal from '@/components/HardwareModal'
import Button from '@/components/Button'


const CharacterList = ({ characterList }: { characterList: Characteristic[]}) => (
  <FlatList
    data={characterList}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.charItem}>
        <ThemedText style={styles.charText}>UUID: {item.uuid}</ThemedText>
      </View>
    )}
  />
)

export default function bluetooth() {
  const [modalVisible, setModalVisible] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const {
    loading,
    devices,
    scanDevices,
    connectionError,
    connectToDevice,
    connectedDevice,
    characteristics,
  } = useBluetooth()

  const loopThroughItems = async(devices: Device[]) => {
    for (const device of devices) {
      return await connectToDevice(device)
    }
  }

  return (
    <View style={{ padding: 10 }}>
      <HardwareHeader
        scanAction={scanDevices}
        scanBtnText="Scan Devices"
        title={`Devices: ${devices.length}`}
      />
      <ScannedList
        items={devices}
        onPress={async () => {
          setLoadingModal(true)
          const shouldOpenModal = await loopThroughItems(devices)

          if (shouldOpenModal && !loading) {
            setLoadingModal(false)
            setModalVisible(true)
          }

          if (!shouldOpenModal) setLoadingModal(false)

          if (connectionError !== null) {
            setLoadingModal(false)
            Alert.alert(connectionError)
          }
        }}
      >
        {(item) => (
          <>
            <ThemedText>id: {item.id}</ThemedText>
            <ThemedText>Manuf: {decodeManufacturerData(item.manufacturerData)?.companyIdentifier}</ThemedText>
            <ThemedText>Connectable: {item.isConnectable ? 'true' : 'false'}</ThemedText>
          </>
        )}
      </ScannedList>
      <HardwareModal
        isOpen={modalVisible}
        setIsOpen={setModalVisible}
      >
        <ThemedText type="subtitle" style={{ textAlign: 'center', color: 'black'}}>
          {connectedDevice?.id || 'Device'} Characteristic
        </ThemedText>
        <CharacterList characterList={characteristics} />
        <Button text="Close" onPress={() => {
            setModalVisible(false)
          }}
        />
      </HardwareModal>
      <HardwareModal
        isOpen={loadingModal}
        setIsOpen={setLoadingModal}
      >
        <ThemedText type="subtitle" style={{ textAlign: 'center', color: 'black'}}>Trying to connect...</ThemedText>
        <ActivityIndicator size="large" />
      </HardwareModal>
    </View>
  )
}

const styles = StyleSheet.create({
  charItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  charText: {
    fontSize: 14,
    color: 'black'
  },
})
