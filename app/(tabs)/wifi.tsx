import { useState } from "react"
import { View } from "react-native"
import useWifi from "@/hooks/useWifi"
import { ThemedText } from "@/components/ThemedText"
import HardwareHeader from "@/components/HardwareHeader"
import ScannedList from "@/components/ScannedList"
import Button from "@/components/Button"
import HardwareModal from "@/components/HardwareModal"
import Input from "@/components/Input"

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
      <HardwareModal
        isOpen={modalVisible}
        setIsOpen={setModalVisible}
      >
        <Input
          text={input}
          setText={setInput}
          placeholder="Enter Password"
          password={true}
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
      </HardwareModal>
    </View>
  )
}

