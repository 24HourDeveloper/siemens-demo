import { useState } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Modal } from 'react-native'
import { Characteristic } from 'react-native-ble-plx'
import { ThemedText } from '@/components/ThemedText'
import useBluetooth from '@/hooks/useBluetooth'
import { decodeManufacturerData } from '@/utils/decodeManufacturerData'
import HardwareHeader from '@/components/HardwareHeader'
import ScannedList from '@/components/ScannedList'

const CharacterList = ({ characterList }: { characterList: Characteristic[]}) => (
  <FlatList
    data={characterList}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.charItem}>
        <Text style={styles.charText}>UUID: {item.uuid}</Text>
      </View>
    )}
  />
)

export default function bluetooth() {
  const [modalVisible, setModalVisible] = useState(false)
  const { devices, scanAndConnect, connectToDevice, connectedDevice, characteristics } = useBluetooth()

  return (
    <View style={{ padding: 10 }}>
      <HardwareHeader
        scanAction={scanAndConnect}
        scanBtnText="Scan Devices"
        title={`Devices: ${devices.length}`}
      />
      <ScannedList
        items={devices}
        onPress={async () => {
          const shouldOpenModal = await connectToDevice(devices[0])
          if (shouldOpenModal) {
            setModalVisible(true)
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            {connectedDevice?.id || 'Device'} Characteristic
          </Text>
          <CharacterList characterList={characteristics} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  charItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  charText: {
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  }
})
