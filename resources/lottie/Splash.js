import { Center, Image, Text, View, Icon } from "native-base";
import React, { useState, useRef } from "react";
import { Animated } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";
import LottieView from "lottie-react-native";

export default function Splash({ navigation }) {
  const splashAnim = useRef(new Animated.Value(400)).current;

  const [showIcon, setShowIcon] = useState(false);
  const [splashText, setSplashText] = useState("");
  const text = "Save your moments";

  return (
    <View flex={1} alignItems="center" justifyContent={"center"}>
      <Image
        // source={require("../images/bg.jpg")}
        // source={{
        //   uri: "https://i.pinimg.com/564x/6f/5a/d4/6f5ad47f213ee0f9365a7f83d0ff9b15.jpg",
        // }}
        source={require("../images/bg1.jpg")}
        w="100%"
        h="100%"
        position="absolute"
        top={0}
        left={0}
        alt={"image"}
        resizeMode="cover"
      />
      {/* <Image
        source={require("../images/hearts.png")}
        w="100%"
        h="100%"
        position="absolute"
        top={0}
        left={0}
        alt={"image"}
        resizeMode="cover"
      /> */}
      <Text fontFamily={"second"} fontSize={24} color={COLORS.basic400}>
        Save your moments
        {/* {splashText} */}
      </Text>
      {showIcon && <Icon as={Ionicons} name="heart" size="20" color="red" />}
    </View>
  );

  function navigateFromSplash() {
    setTimeout(() => {
      navigation.navigate("AllPlaces");
    }, 2000);
  }

  function typingText() {
    console.log("typing");
    let index = 0;
    setShowIcon(true);
  }
}
