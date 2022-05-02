import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { ScrollView, Text } from "native-base";
import { COLORS } from "../constants/Colors";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }) {
  return (
    <ScrollView p="5">
      <Text
        textAlign={"center"}
        color={COLORS.basic400}
        fontSize="22"
        my="3"
        fontFamily={"second"}
      >
        Take an Image{" "}
        <Icon as={Ionicons} name="camera" size="26" color={COLORS.basic400} />,{" "}
        {"\n"}
        Save Your Moment{" "}
        <Icon as={Ionicons} name="heart" size="26" color={COLORS.basic400} />
      </Text>
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </ScrollView>
  );

  function createPlaceHandler(place) {
    insertPlace(place);
    navigation.navigate("AllPlaces");
  }
}
