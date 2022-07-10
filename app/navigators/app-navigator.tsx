import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen, SettingsScreen } from "../screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { IconsLibraries, IconSvg } from "../components/icon-svg/icon-svg"
import * as Animatable from "react-native-animatable"
import Colors from "../constants/Colors"
export type NavigatorParamList = {
  tab: undefined
  search: undefined
  detail: undefined
  noti: undefined
  setting: undefined
}

export type NavigatorBottomParamList = {
  home: undefined
  search: undefined
  detail: undefined
  noti: undefined
  setting: undefined
}

const BottomTabArr = [
  {
    route: "home",
    label: "Home",
    type: IconsLibraries.Ionicons,
    icon: "grid-outline",
    component: HomeScreen,
    color: Colors.primary,
    alphaClr: Colors.primaryAlpha,
  },
  {
    route: "setting",
    label: "Like",
    type: IconsLibraries.Ionicons,
    icon: "settings-outline",
    component: SettingsScreen,
    color: Colors.green,
    alphaClr: Colors.greenAlpha,
  },
]

// bottom tab

const Tab = createBottomTabNavigator<NavigatorBottomParamList>()

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const viewRef = React.useRef(null)
  const textViewRef = React.useRef(null)

  React.useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } })
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } })
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } })
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } })
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}
    >
      <View>
        <Animatable.View
          duration={400}
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]}
        />
        <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
          <IconSvg
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.primary}
          />
          <Animatable.View duration={300} ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: Colors.white,
                  paddingHorizontal: 8,
                }}
              >
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const BottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}
    >
      {BottomTabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

// stack
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="tab"
    >
      <Stack.Screen name="tab" component={BottomStack} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 16,
  },
})
