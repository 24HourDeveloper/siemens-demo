import { useState } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Modal } from 'react-native'
import { Characteristic } from 'react-native-ble-plx'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor';
import useBluetooth from '@/hooks/useBluetooth';
import { decodeManufacturerData } from '@/utils/decodeManufacturerData';

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
);

export default function bluetooth() {
  const [modalVisible, setModalVisible] = useState(false)
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')
  const { devices, scanAndConnect, connectToDevice, connectedDevice, characteristics } = useBluetooth()

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.container}>
        <ThemedText style={{ fontSize: 20 }}>Devices: {devices.length}</ThemedText>
        <TouchableOpacity onPress={scanAndConnect}  style={[styles.scannedItem, {borderColor: color}]}>
          <ThemedText style={{ fontSize: 20 }}>Scan devices</ThemedText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={devices}
        renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={async () => {
              const shouldOpenModal = await connectToDevice(item)
              if (shouldOpenModal) {
                setModalVisible(true)
              }
            }}
            style={[styles.scannedItem, {borderColor: color}]}
          >
            <ThemedText>id: {item.id}</ThemedText>
            <ThemedText>Manuf: {decodeManufacturerData(item.manufacturerData)?.companyIdentifier}</ThemedText>
            <ThemedText>Connectable: {item.isConnectable ? 'true' : 'false'}</ThemedText>
          </TouchableOpacity>
        )}}
        keyExtractor={item => item.id}
      />
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
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
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
  },
  scannedItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  }
});
