import React from "react";
import { HStack, Spinner, Heading, Center, Text } from "native-base";
import { COLORS } from "../constants/Colors";

export default function LoadingData() {
  return (
    <Center flex={1}>
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" color={COLORS.primary700} />
        <Text color={COLORS.primary700} fontSize="md" fontFamily={"second"}>
          Loading
        </Text>
      </HStack>
    </Center>
  );
}
