import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'

type ListItemContainerTypes<T> = {
  item?: T
  touchable?: boolean
  children: React.ReactNode
  styles?: StyleProp<ViewStyle>
  onPress?: () => void
}

export default function ListItemContainer<T>({ children, styles, touchable = false, onPress }: ListItemContainerTypes<T>) {
  const { shadow } = Colors
  const theme = useColorScheme() ?? 'light'
  const color = theme === 'light' ? 'white' : '#121211'
  const containerStyles = [styleSheet.container, { backgroundColor: color }, styles]

  if (touchable) {
    return (
      <TouchableOpacity onPress={onPress} style={[containerStyles, shadow]}>
        {children}
      </TouchableOpacity>
    )
  }
  return <View style={[containerStyles, shadow]}>{children}</View>
}

const styleSheet = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  }
})