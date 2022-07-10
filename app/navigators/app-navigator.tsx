import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import React from "react"
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native"
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
    activeIcon: "grid",
    inActiveIcon: "grid-outline",
    component: HomeScreen,
  },
  {
    route: "setting",
    label: "Like",
    type: IconsLibraries.Ionicons,
    activeIcon: "settings",
    inActiveIcon: "settings-outline",
    component: SettingsScreen,
  },
]

// bottom tab

const Tab = createBottomTabNavigator<NavigatorBottomParamList>()

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const viewRef = React.useRef(null)

  React.useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: "0deg" },
        1: { scale: 1.5, rotate: "360deg" },
      })
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      })
    }
  }, [focused])

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <IconSvg
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.primary : Colors.primaryLite}
        />
      </Animatable.View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
