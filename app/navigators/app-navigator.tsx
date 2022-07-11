import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import AnimatedLottieView from "lottie-react-native"
import React from "react"
import { StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native"
import { HomeScreen } from "../screens"
import lotties from "../theme/lotties"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import {
  AvtiveButtonStyled,
  container,
  IconButtonCenter,
  TabarStyled,
  TouchStyled,
  ViewButtonCenterStyled,
  ViewButtonStyled,
} from "./style"

import * as Animatable from "react-native-animatable"
import SearchScreen from "../screens/search"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen } from "../screens/login/login-screen"
import AsyncStorage from "@react-native-async-storage/async-storage"

export type NavigatorParamList = {
  home: undefined
  search: undefined
  detail: undefined
  noti: undefined
  setting: undefined
}

interface IProps {
  children: React.ReactNode
  onPress?: any
  accessibilityState?: any
}

const CustomTabarButtonCenter: React.FC<IProps> = ({ children, onPress }) => (
  <TouchableOpacity style={{ ...TouchStyled, ...styles.shadow }} onPress={onPress}>
    <View style={ViewButtonCenterStyled}>{children}</View>
  </TouchableOpacity>
)

const CustomTabarButton: React.FC<IProps> = ({ children, onPress, accessibilityState }) => {
  const viewRef = React.useRef(null)
  const active = accessibilityState.selected

  React.useEffect(() => {
    if (active) {
      viewRef.current.animate({ 0: { scale: 1 }, 0.5: { scale: 1.15 }, 1: { scale: 1.25 } })
    }
  }, [active])

  return (
    <TouchableOpacity activeOpacity={1} style={container} onPress={onPress}>
      <Animatable.View duration={500} ref={viewRef} style={container}>
        {children}
      </Animatable.View>
    </TouchableOpacity>
  )
}

// bottom tab
const Tab = createBottomTabNavigator<NavigatorParamList>()

const RenderTabarButton = ({ active, src }) => {
  return (
    <View>
      <View style={active && AvtiveButtonStyled}>
        <View style={ViewButtonStyled}>
          <AnimatedLottieView source={src} autoPlay loop={false} />
        </View>
      </View>
    </View>
  )
}

const Tabtack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...TabarStyled,
          ...styles.shadow,
        },
      }}
      initialRouteName="home"
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <RenderTabarButton active={focused} src={lotties.home} />,
          tabBarButton: (props) => <CustomTabarButton {...props} />,
        }}
        name="home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <RenderTabarButton active={focused} src={lotties.search} />,
          tabBarButton: (props) => <CustomTabarButton {...props} />,
        }}
        name="search"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style={IconButtonCenter}>
              <AnimatedLottieView source={lotties.plus} autoPlay loop={true} />
            </View>
          ),
          tabBarButton: (props) => <CustomTabarButtonCenter {...props} />,
        }}
        name="detail"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <RenderTabarButton active={focused} src={lotties.todo} />,
          tabBarButton: (props) => <CustomTabarButton {...props} />,
        }}
        name="noti"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <RenderTabarButton active={focused} src={lotties.setting} />,
          tabBarButton: (props) => <CustomTabarButton {...props} />,
        }}
        name="setting"
        component={HomeScreen}
      />
    </Tab.Navigator>
  )
}

export type AppNavigatorParamList = {
  login: undefined
  tab: undefined
}

const Stack = createNativeStackNavigator<AppNavigatorParamList>()

// stack navigator
const AppStackNavigator = () => {
  const [initialRoute, setInitialRoute] = React.useState<keyof AppNavigatorParamList>("login")

  React.useEffect(() => {
    ;(async () => {
      const firstLogin = await AsyncStorage.getItem("firstLogin")
      if (firstLogin) {
        setInitialRoute("tab")
      }
    })()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="tab" component={Tabtack} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

// stack container
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
      <AppStackNavigator />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
const color = "#7F5DF0"
const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
})
