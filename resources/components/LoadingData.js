import React from "react";
import { HStack, Spinner, Heading, Center } from "native-base";
import { COLORS } from "../constants/Colors";

export default function LoadingData() {
  return (
    <Center flex={1}>
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </Center>
  );
}
