import React from "react";
import { Button, HStack, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./../../constants/Colors";

export default function CustomButton({
  icon,
  onPress,
  children,
  margin,
  hasBg,
}) {
  return (
    <Button
      onPress={onPress}
      bg={hasBg ? COLORS.primary700 : "transparent"}
      borderColor={hasBg ? "transparent" : COLORS.primary700}
      borderWidth={2}
      borderRadius={"xl"}
      py="3"
      px={4}
      mt={margin ? 5 : 0}
      variant={"outline"}
      colorScheme="purple"
    >
      <HStack alignItems="center">
        {icon && (
          <Icon as={Ionicons} name={icon} size="26" color={COLORS.primary700} />
        )}
        <Text
          color={hasBg ? COLORS.secondary100 : COLORS.primary700}
          fontSize={hasBg ? 18 : 16}
          fontFamily="second"
        >
          {" "}
          {children}
        </Text>
      </HStack>
    </Button>
  );
}
