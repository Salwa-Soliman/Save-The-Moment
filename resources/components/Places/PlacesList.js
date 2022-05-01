import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Heading, Center, FlatList } from "native-base";

import { COLORS } from "../../constants/Colors";
import PlaceItem from "./PlaceItem";
import { fetchPlaceDetails } from "../../util/database";

export default function PlacesList({ places }) {
  const navigation = useNavigation();

  if (!places.length || !places) {
    return (
      <Center flex={"1"}>
        <Heading textAlign={"center"} color={COLORS.basic400}>
          No places added yet ...{"\n"}Start adding some!
        </Heading>
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
