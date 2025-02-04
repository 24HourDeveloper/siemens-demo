import { View, Modal, StyleSheet } from 'react-native'
import { ReactNode } from 'react'

type HardwareModalTypes = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  children: ReactNode
}

export default function HardwareModal({ children, isOpen, setIsOpen }: HardwareModalTypes) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={styles.outeModal}>
        <View style={styles.container}>
          { children }
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  outeModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  container: {
    display: 'flex',
    gap: 10,
    backgroundColor: 'white',
    width: '90%',
    padding: 5,
    borderRadius: 10
  }
})