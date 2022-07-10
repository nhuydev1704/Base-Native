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
      viewRef.current.animate({ 0: { scale: 0.5 }, 1: { scale: 1 } })
    }
  }, [active])

  return (
    <TouchableOpacity activeOpacity={1} style={container} onPress={onPress}>
      <Animatable.View ref={viewRef} style={container}>
        {children}
      </Animatable.View>
    </TouchableOpacity>
  )
}

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

const AppStack = () => {
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
          tabBarIcon: ({ focused }) => (
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
