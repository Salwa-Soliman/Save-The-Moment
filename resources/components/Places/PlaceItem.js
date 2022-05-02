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
          bg={COLORS.primary100 + "a0"}
          colorScheme="pink"
          onPress={() => onSelect(place.id)}
        >
          <Text
            color={COLORS.basic400}
            fontSize={25}
            textAlign="center"
            fontFamily="second"
          >
            {place.date}
          </Text>
          <Text
            color={COLORS.basic400}
            fontSize={18}
            textAlign="center"
            fontFamily="second"
          >
            {place.time}
          </Text>
        </Button>
      </ImageBackground>
    </View>
  );
}
