import { TouchableOpacityProps, View, ViewStyle } from "react-native"

export const TouchStyled: TouchableOpacityProps | ViewStyle = {
  top: -30,
  justifyContent: "center",
  alignItems: "center",
}

export const TabarStyled: ViewStyle = {
  position: "absolute",
  bottom: 25,
  left: 20,
  right: 20,
  elevation: 0,
  backgroundColor: "white",
  borderRadius: 15,
  height: 70,
}

export const ViewButtonCenterStyled = {
  borderRadius: 50,
  height: 60,
  width: 60,
}

export const ViewButtonStyled: ViewStyle = { width: 35, height: 35 }

export const AvtiveButtonStyled: ViewStyle = {
  backgroundColor: "#E9E9EB",
  borderRadius: 50,
  padding: 6,
}

export const IconButtonCenter: ViewStyle = {
  padding: 40,
}

export const container: ViewStyle = { flex: 1, justifyContent: "center", alignItems: "center" }
