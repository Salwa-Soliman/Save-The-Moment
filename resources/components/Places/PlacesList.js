import { Heading, Center, FlatList } from "native-base";
import React from "react";
import PlaceItem from "./PlaceItem";

export default function PlacesList({ places }) {
  if (!places.length || !places) {
    return (
      <Center flex="1">
        <Heading textAlign={"center"}>
          No places added yet ...{"\n"}Start adding some!
        </Heading>
      </Center>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <PlaceItem />}
    />
  );
}
