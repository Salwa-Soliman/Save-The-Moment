import { Button, VStack, Image, Text, View } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../../constants/Colors";

export default function PlaceItem({ place, onSelect }) {
  return (
    <View
      h="200"
      mb="5"
      borderTopLeftRadius={70}
      borderBottomRightRadius={70}
      overflow="hidden"
      shadow={6}
    >
      <ImageBackground
        source={{ uri: place.imgUri }}
        style={{
          flex: 1,
        }}
        resizeMode="cover"
      >
        <Button
          variant={"outline"}
          flex="1"
          bg={COLORS.secondary200 + "a0"}
          colorScheme="info"
          onPress={() => onSelect(place.id)}
        >
          <Text
            fontWeight={"bold"}
            color={COLORS.basic400}
            fontSize={25}
            textAlign="center"
            italic
          >
            {place.date}
          </Text>
          <Text
            fontWeight={"bold"}
            color={COLORS.basic400}
            fontSize={16}
            textAlign="center"
          >
            {place.time} {place.time.split(":")[0] < 12 ? "AM" : "PM"}
          </Text>
        </Button>
      </ImageBackground>
    </View>
  );
}
