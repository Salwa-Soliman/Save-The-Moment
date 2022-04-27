import { Button, HStack, Image, Text } from "native-base";
import React from "react";

export default function PlaceItem({ place }) {
  return (
    <Button variant={"outline"}>
      <HStack>
        <Image source={{ uri: place.imgUri }} alt={place.title} />
        <View>
          <Text>{place.title}</Text>
          <Text>{place.address}</Text>
        </View>
      </HStack>
    </Button>
  );
}
