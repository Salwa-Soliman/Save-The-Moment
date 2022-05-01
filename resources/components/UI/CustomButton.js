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
      bg={hasBg ? COLORS.primary600 : "transparent"}
      borderColor={hasBg ? "transparent" : COLORS.primary600}
      borderWidth={2}
      borderRadius={"xl"}
      py="3"
      px={4}
      mt={margin ? 5 : 0}
      variant={"outline"}
      colorScheme="danger"
    >
      <HStack alignItems="center">
        {icon && (
          <Icon as={Ionicons} name={icon} size="26" color={COLORS.primary600} />
        )}
        <Text
          color={hasBg ? COLORS.secondary100 : COLORS.primary600}
          fontWeight="bold"
          fontSize={hasBg ? 18 : 15}
        >
          {" "}
          {children}
        </Text>
      </HStack>
    </Button>
  );
}
