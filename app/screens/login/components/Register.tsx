import React from "react"
import { Button, Checkbox, Icon, Input, Stack, View } from "native-base"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { InputComponent, Text } from "../../../components"

const Register = () => {
  const [show, setShow] = React.useState(false)
  const [showRePass, setShowRePass] = React.useState(false)

  return (
    <Stack space={4}>
      <InputComponent
        placeholder="Họ và tên"
        variant="underlined"
        InputRightElement={
          <Icon as={<MaterialIcons name="info" />} size={5} mr="3" color="muted.400" />
        }
      />
      <InputComponent
        placeholder="Địa chỉ email"
        variant="underlined"
        InputRightElement={
          <Icon as={<MaterialIcons name="email" />} size={5} mr="3" color="muted.400" />
        }
      />
      <InputComponent
        type={show ? "text" : "password"}
        placeholder="Nhập mật khẩu"
        variant="underlined"
        InputRightElement={
          <Icon
            as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
            size={5}
            mr="3"
            color="muted.400"
            onPress={() => setShow(!show)}
          />
        }
      />

      <InputComponent
        type={showRePass ? "text" : "password"}
        placeholder="Nhập lại mật khẩu"
        variant="underlined"
        InputRightElement={
          <Icon
            as={<MaterialIcons name={showRePass ? "visibility" : "visibility-off"} />}
            size={5}
            mr="3"
            color="muted.400"
            onPress={() => setShowRePass(!showRePass)}
          />
        }
      />

      <Button mt="4">Đăng ký</Button>
    </Stack>
  )
}
export default React.memo(Register)
