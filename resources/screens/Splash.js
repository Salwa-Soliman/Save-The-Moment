import { Center, Image, Text, View, Icon, HStack } from "native-base";
import React, { useState, useRef } from "react";
import { ImageBackground, Dimensions } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";
import LottieView from "lottie-react-native";

export default function Splash({ navigation }) {
  const screenHeight = Dimensions.get("screen").height;

  navigateFromSplash();

  return (
    <View flex={1} alignItems="center">
      {/* OverlayImage  */}
      <Image
        source={require("../images/h.png")}
        w="100%"
        h="100%"
        position="absolute"
        top={0}
        left={0}
        alt={"image"}
        resizeMode="cover"
      />
      {/* Text with heart  */}
      <HStack alignItems="center" mt={screenHeight * 0.2}>
        <Text fontFamily={"second"} fontSize={24} color={COLORS.primary400}>
          Save your moments{" "}
        </Text>
        <Icon as={Ionicons} name="heart" size="lg" color={COLORS.primary400} />
      </HStack>

      {/* Lottie animated view  */}
      <LottieView
        source={require("../lottie/splash-animation.json")}
        autoPlay
        loop
        // duration={3}
        speed={0.8}
        resizeMode={"contain"}
        style={{ marginTop: screenHeight * 0.15 }}
      />
    </View>
  );

  function navigateFromSplash() {
    setTimeout(() => {
      navigation.navigate("AllPlaces");
    }, 4000);
  }
}
