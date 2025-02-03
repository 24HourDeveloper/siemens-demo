import { useState } from "react"
import { View, Modal, TextInput, StyleSheet } from "react-native"
import useWifi from "@/hooks/useWifi"
import { ThemedText } from "@/components/ThemedText"
import HardwareHeader from "@/components/HardwareHeader"
import ScannedList from "@/components/ScannedList"
import Button from "@/components/Button"

export default function WifiScanner() {
  const [modalVisible, setModalVisible] = useState(false)
  const [input, setInput] = useState('')
  const [item, setItem] = useState(null)
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
        onPress={(item: any) => {
          setItem(item)
          setModalVisible(true)
        }}
      >
        {(item) => (
          <>
            <ThemedText>SSID: {item.SSID}</ThemedText>
            <ThemedText>BSSID: {item.BSSID}</ThemedText>
          </>
        )}
      </ScannedList>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{display: 'flex', gap: 10, backgroundColor: 'white', width: '90%', padding: 5, borderRadius: 10}}>
            <TextInput
              value={input}
              placeholder="Enter Password"
              style={styles.searchInput}
              secureTextEntry
              onChangeText={(text) => setInput(text)}
            />
            <Button text="Submit" onPress={() => {
                connectToWifi(item?.SSID, input)
                setInput('')
              }}
            />
            <Button text="Close" onPress={() => {
                setInput('')
                setModalVisible(false)
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    fontSize: 22,
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.0,
    elevation: 2,
    backgroundColor: 'white',
  },
})
