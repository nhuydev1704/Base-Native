import { observer } from "mobx-react-lite"
import { Input } from "native-base"
import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { fonts } from "../../theme/fonts"

const DEFAULT: TextStyle = {
  fontSize: fonts.regular14,
  paddingLeft: 10,
}

export interface InputProps {
  InputRightElement: JSX.Element | JSX.Element[]
  placeholder: string
  type?: "text" | "password"
  variant: "outlined" | "underlined" | "filled" | "round"
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const InputComponent = React.memo(
  observer(function InputComponent(props: InputProps) {
    const { style, type = "text", InputRightElement, variant, placeholder } = props
    const styles = Object.assign({}, DEFAULT, style)

    return (
      <Input
        type={type}
        style={styles}
        variant={variant}
        InputRightElement={InputRightElement && InputRightElement}
        placeholder={placeholder}
      />
    )
  }),
)
