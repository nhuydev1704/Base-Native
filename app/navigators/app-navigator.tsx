import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import React from "react"
import { StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native"
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
const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
}
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.3 },
  0.5: { scale: 0.5 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
}
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const viewRef = React.useRef(null)
  const circleRef = React.useRef(null)
  const textRef = React.useRef(null)

  React.useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1)
      circleRef.current.animate(circle1)
      textRef.current.transitionTo({ scale: 1 })
    } else {
      viewRef.current.animate(animate2)
      circleRef.current.animate(circle2)
      textRef.current.transitionTo({ scale: 0 })
    }
  }, [focused])

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={500} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <IconSvg
            type={item.type}
            name={item.inActiveIcon}
            color={focused ? Colors.white : Colors.primary}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

const BottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
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
  tabBar: {
    height: 70,
    position: "absolute",
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: Colors.primary,
  },
})
