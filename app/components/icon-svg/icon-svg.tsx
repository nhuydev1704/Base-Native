import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Foundation from "react-native-vector-icons/Foundation"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Octicons from "react-native-vector-icons/Octicons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

export const IconsLibraries = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
}

export interface IconSvgProps {
  type?: any
  name?: string
  color?: string
  size?: number
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const IconSvg = observer(function IconSvg(props: IconSvgProps) {
  const { type, name, color, size = 24, style } = props
  const fontSize = 24
  const Tag: any = type
  return (
    <>{type && name && <Tag name={name} size={size || fontSize} color={color} style={style} />}</>
  )
})
