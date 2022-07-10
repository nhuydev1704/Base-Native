import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { GradientBackground, Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const HEADER: TextStyle = {
  paddingHorizontal: spacing[4],
  backgroundColor: "red",
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `settings: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="settings" component={SettingsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  function SettingsScreen({ navigation }) {
    const goBack = () => navigation.goBack()
    // Pull in one of our MST stores
    const { characterStore } = useStores()
    console.log(
      "🚀 ~ file: settings-screen.tsx ~ line 43 ~ SettingsScreen ~ characterStore",
      characterStore,
    )

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <View style={{ flex: 1 }}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={ROOT} preset="scroll">
          <Header
            headerTx="demoListScreen.title"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text preset="header" text="settings" />
        </Screen>
      </View>
    )
  },
)
