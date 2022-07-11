import React from "react"
import { Button, Checkbox, Icon, Input, Stack, Text as TextBase } from "native-base"
import { MaterialIcons } from "../../../theme/icons"
import { InputComponent, Text } from "../../../components"
const Login = () => {
  const [show, setShow] = React.useState(false)

  return (
    <Stack space={4}>
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
      <Checkbox mt="2" value="test" defaultIsChecked>
        <Text>Nhớ mật khẩu</Text>
      </Checkbox>
      <Button mt="4">Đăng nhập</Button>
      <TextBase textAlign="center">Hoặc đăng nhập bằng</TextBase>
    </Stack>
  )
}
export default React.memo(Login)
