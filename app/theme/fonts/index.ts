import * as Font from "expo-font"
import { moderateScale } from "../../utils/scale"

export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  await Font.loadAsync({
    SFProText: require("../../../assets/fonts/SFProText-Regular.ttf"),
    "SFProText-Regular": require("../../../assets/fonts/SFProText-Regular.ttf"),
  })
}

export const fontFamily = {
  san_black: "SourceSansPro-Black",
  san_black_italic: "SourceSansPro-BlackItalic",
  san_bold: "SFProText-Bold",
  san_bold_italic: "SFProText-BoldItalic",
  san_extra_light: "SourceSansPro-ExtraLight",
  san_extra_light_italic: "SourceSansPro-ExtraLightItalic",
  san_light: "SFProText-Light",
  san_light_italic: "SFProText-LightItalic",
  san_regular: "SFProText-Regular",
  san_semi_bold: "SFProText-Semibold",
  san_semi_bold_italic: "SFProText-SemiboldItalic",
}

export const fonts = {
  regular11: moderateScale(11),
  regular12: moderateScale(12),
  regular13: moderateScale(13),
  regular14: moderateScale(14),
  regular15: moderateScale(15),
  regular16: moderateScale(16),
  regular17: moderateScale(17),
  regular18: moderateScale(18),
  regular19: moderateScale(19),
  regular20: moderateScale(20),
  regular21: moderateScale(21),
  regular22: moderateScale(22),
  // regular20: {
  //   fontSize: moderateScale(20),
  //   fontFamily: fontFamily.san_regular
  // },
  regular24: moderateScale(24),
  // bold12: {
  //   fontSize: moderateScale(12),
  //   fontFamily: fontFamily.san_bold
  // },
  bold14: moderateScale(14),
  fontFamily: fontFamily.san_bold,
  // bold16: {
  //   fontSize: moderateScale(16),
  //   fontFamily: fontFamily.san_bold
  // },
  // bold18: {
  //   fontSize: moderateScale(18),
  //   fontFamily: fontFamily.san_bold
  // },
  // bold20: {
  //   fontSize: moderateScale(20),
  //   fontFamily: fontFamily.san_bold
  // },
  // bold24: {
  //   fontSize: moderateScale(24),
  //   fontFamily: fontFamily.san_bold
  // },
  // semi_bold12: {
  //   fontSize: moderateScale(12),
  //   fontFamily: fontFamily.san_semi_bold
  // },
  semi_bold12: moderateScale(12),
  semi_bold14: moderateScale(14),
  semi_bold15: moderateScale(15),
  semi_bold16: moderateScale(16),
  semi_bold18: moderateScale(18),
  semi_bold20: moderateScale(20),
  semi_bold24: moderateScale(24),
  italic12: moderateScale(12),
  // light12: {
  //   fontSize: moderateScale(12),
  //   fontFamily: fontFamily.san_light
  // },
  // light14: {
  //   fontSize: moderateScale(14),
  //   fontFamily: fontFamily.san_light
  // },
  // light16: {
  //   fontSize: moderateScale(16),
  //   fontFamily: fontFamily.san_light
  // },
  // light18: {
  //   fontSize: moderateScale(18),
  //   fontFamily: fontFamily.san_light
  // },
  // light20: {
  //   fontSize: moderateScale(20),
  //   fontFamily: fontFamily.san_light
  // },
  // light24: {
  //   fontSize: moderateScale(24),
  //   fontFamily: fontFamily.san_light
  // },
  // extra_light12: {
  //   fontSize: moderateScale(12),
  //   fontFamily: fontFamily.san_extra_light
  // },
  // extra_light14: {
  //   fontSize: moderateScale(14),
  //   fontFamily: fontFamily.san_extra_light
  // },
  // extra_light16: {
  //   fontSize: moderateScale(16),
  //   fontFamily: fontFamily.san_extra_light
  // },
  // extra_light18: {
  //   fontSize: moderateScale(18),
  //   fontFamily: fontFamily.san_extra_light
  // },
  // extra_light20: {
  //   fontSize: moderateScale(20),
  //   fontFamily: fontFamily.san_extra_light
  // },
  // extra_light24: {
  //   fontSize: moderateScale(24),
  //   fontFamily: fontFamily.san_extra_light
  // }
  SF_ProText13: moderateScale(13),
}
