import { StackScreenProps } from "@react-navigation/stack"
import AnimatedLottieView from "lottie-react-native"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View as ViewBase } from "native-base"
import {
  Animated,
  Dimensions,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg"
import { SceneMap, TabView } from "react-native-tab-view"
import { Screen, Text } from "../../components"
import { AppNavigatorParamList } from "../../navigators"
import { fonts } from "../../theme/fonts"
import lotties from "../../theme/lotties"
import { palette } from "../../theme/palette"
import Login from "./components/Login"
import Register from "./components/Register"
const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width

const FULL: ViewStyle = { maxHeight: windowHeight, backgroundColor: palette.white }

const TOP: ViewStyle = {
  minHeight: windowHeight - 24,
  paddingTop: 40,
  paddingHorizontal: 40,
  zIndex: 1,
}

const WRAPPERBOTTOM: ViewStyle = {
  position: "absolute",
  bottom: 0,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}
const IMGTEAM: ViewStyle = {
  width: 200,
  height: 200,
  position: "absolute",
  bottom: 30,
}

const TEXTLOGIN: TextStyle = {
  fontSize: fonts.regular22,
  textAlign: "center",
}

const TEXTPOLICE: TextStyle = {
  textAlign: "center",
  paddingHorizontal: 14,
  fontSize: fonts.regular11,
  color: palette.lightGrey,
  paddingTop: 10,
}

const TABAR: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
}

const TABARITEM: ViewStyle = {
  padding: 6,
  marginHorizontal: 6,
  marginTop: 20,
  marginBottom: 30,
}

const TABARITEMFOCUS: ViewStyle = {
  borderBottomWidth: 2,
  borderBottomColor: "#036BB9",
}

const colorActive = "#036BB9"

const renderScene = SceneMap({
  dn: Login,
  dk: Register,
})

const _renderTabBar = (props: any) => {
  const inputRange = props.navigationState.routes.map((x: any, i: number) => i)
  const active = props.navigationState.index

  return (
    <View style={TABAR}>
      {props.navigationState.routes.map((route: any, i: number) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex: number) => (inputIndex === i ? 1 : 0.5)),
        })

        return (
          <View style={active === i ? [TABARITEM, TABARITEMFOCUS] : TABARITEM} key={i}>
            <Animated.Text style={{ opacity, color: active === i ? colorActive : palette.black }}>
              {route.title}
            </Animated.Text>
          </View>
        )
      })}
    </View>
  )
}

export const LoginScreen: FC<StackScreenProps<AppNavigatorParamList, "login">> = observer(
  function LoginScreen() {
    const layout = useWindowDimensions()
    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
      { key: "dn", title: "Đăng nhập" },
      { key: "dk", title: "Đăng ký" },
    ])

    return (
      <View style={FULL}>
        <View style={TOP}>
          <Text style={TEXTLOGIN}>Đăng nhập</Text>
          <Text style={TEXTPOLICE}>
            Bằng cách đăng nhập, bạn đồng ý với Điều khoản và chính sách bảo mật của chúng tôi
          </Text>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={_renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
        <View style={WRAPPERBOTTOM}>
          <ViewBase
            position="absolute"
            bottom="6"
            zIndex="3"
            flexDirection="row"
            justifyContent="center"
          >
            <TouchableOpacity>
              <Svg width={69} height={72} fill="none">
                <Rect x={0.5} y={0.5} width={68} height={71} rx={13.5} fill="#0386D0" />
                <G clipPath="url(#a)" fill="#fff">
                  <Path d="M53.933 19.438c-.414 0-.827-.152-1.157-.465-5.058-4.779-11.548-7.41-18.276-7.41s-13.218 2.631-18.276 7.412a1.68 1.68 0 0 1-2.43-.117 1.829 1.829 0 0 1 .113-2.517C19.602 10.961 26.915 8 34.5 8c7.585 0 14.898 2.962 20.593 8.341.701.663.751 1.788.112 2.517a1.69 1.69 0 0 1-1.272.58Z" />
                  <Path d="M56.844 31.078a1.697 1.697 0 0 1-1.428-.789c-4.771-7.362-12.59-11.758-20.916-11.758s-16.145 4.396-20.916 11.758c-.53.82-1.6 1.038-2.386.487-.788-.548-.999-1.655-.47-2.472C16.14 19.956 25.026 14.97 34.5 14.97c9.474 0 18.36 4.985 23.771 13.335.53.817.321 1.924-.47 2.473a1.68 1.68 0 0 1-.957.299Z" />
                  <Path d="M29.071 65c-.442 0-.885-.176-1.222-.527-.375-.392-9.182-9.71-9.182-18.68 0-9.31 7.102-16.883 15.833-16.883s15.833 7.573 15.833 16.883c0 .984-.77 1.782-1.719 1.782-.948 0-1.718-.798-1.718-1.782 0-7.346-5.56-13.321-12.396-13.321-6.836 0-12.396 5.975-12.396 13.321 0 7.522 8.106 16.086 8.188 16.172.67.698.665 1.826-.011 2.52a1.68 1.68 0 0 1-1.21.515Z" />
                  <Path d="M39.929 65c-4.134 0-13.718-8.151-14.646-17.228-.328-3.209.658-6.491 2.633-8.78 1.719-1.99 4.04-3.095 6.536-3.11h.048c2.434 0 4.735.99 6.486 2.794 1.828 1.883 2.834 4.412 2.834 7.12v1.161c0 2.862 2.15 5.19 4.794 5.19 2.645 0 4.797-2.328 4.797-5.19v-.406c0-11.091-7.753-20.318-17.65-21.002-5.161-.363-10.111 1.484-13.932 5.184-3.964 3.843-6.238 9.334-6.238 15.063 0 4.712 1.54 9.303 4.336 12.927.592.77.472 1.888-.27 2.503a1.68 1.68 0 0 1-2.418-.28c-3.28-4.254-5.087-9.636-5.087-15.153 0-6.711 2.672-13.15 7.326-17.662 4.522-4.385 10.384-6.565 16.507-6.14 11.697.81 20.861 11.597 20.861 24.558v.406c0 4.826-3.694 8.752-8.234 8.752s-8.232-3.926-8.232-8.752v-1.162c0-1.752-.646-3.382-1.82-4.593-1.1-1.135-2.54-1.757-4.06-1.757h-.032c-1.937.01-3.24 1.052-3.992 1.923-1.34 1.551-2.005 3.807-1.778 6.03.758 7.406 8.97 14.044 11.229 14.044.949 0 1.718.798 1.718 1.781 0 .983-.767 1.779-1.716 1.779Z" />
                  <Path d="M46.307 61.516c-6.151 0-13.661-7.79-13.661-16.884 0-.983.77-1.781 1.719-1.781.948 0 1.718.798 1.718 1.781 0 7.049 5.718 13.321 10.224 13.321.948 0 1.718.798 1.718 1.782 0 .983-.77 1.78-1.718 1.78Z" />
                </G>
                <Rect x={0.5} y={0.5} width={68} height={71} rx={13.5} stroke="#fff" />
                <Defs>
                  <ClipPath id="a">
                    <Path fill="#fff" transform="translate(7 8)" d="M0 0h55v57H0z" />
                  </ClipPath>
                </Defs>
              </Svg>
            </TouchableOpacity>
          </ViewBase>
          <View style={IMGTEAM}>
            <AnimatedLottieView source={lotties.team} />
          </View>
          <Svg width={windowWidth} height={239} fill="none">
            <G>
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M414 110.735C368.155 155.467 289.205 185 199.5 185 118.923 185 47.024 161.172 0 123.904V329h414V110.735Z"
                fill="#4ea8db"
              />
            </G>
            <Defs></Defs>
          </Svg>
        </View>
      </View>
    )
  },
)
