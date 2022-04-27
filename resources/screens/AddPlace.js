import React from "react";
import NewScreen from "../components/NewScreen";
import PlaceForm from "../components/Places/PlaceForm";
import { Text } from "native-base";
import { COLORS } from "../constants/Colors";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function AddPlace() {
  return (
    <NewScreen>
      <Text
        textAlign={"center"}
        color={COLORS.basic400}
        fontWeight="bold"
        fontSize="22"
      >
        Take an Image{" "}
        <Icon as={Ionicons} name="camera" size="26" color={COLORS.basic400} />,{" "}
        {"\n"}
        Save Your Moment{" "}
        <Icon as={Ionicons} name="heart" size="26" color={COLORS.basic400} />
      </Text>
      <PlaceForm />
    </NewScreen>
  );
}
