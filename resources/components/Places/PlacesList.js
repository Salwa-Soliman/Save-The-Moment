import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Center, FlatList, Text } from "native-base";

import { COLORS } from "../../constants/Colors";
import PlaceItem from "./PlaceItem";
import { fetchPlaceDetails } from "../../util/database";

export default function PlacesList({ places }) {
  const navigation = useNavigation();

  if (!places.length || !places) {
    return (
      <Center flex={"1"}>
        <Text
          fontSize={26}
          textAlign={"center"}
          color={COLORS.basic400}
          fontFamily="bad-script"
        >
          No places added yet ...{"\n"}Start adding some!
        </Text>
      </Center>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem place={itemData.item} onSelect={onSelectHandler} />
      )}
      contentContainerStyle={{
        padding: 20,
      }}
    />
  );

  function onSelectHandler(id) {
    navigation.navigate("PlaceDetails", { placeId: id });
  }
}
