import React from "react";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
export default function IconButton({ name, color, size, onPress }) {
  return (
    <Button
      variant={"ghost"}
      colorScheme="gray"
      onPress={onPress}
      p="2"
      // m="2"
      pressRetentionOffset={"2"}
    >
      <Ionicons name={name} size={size} color={color} />
    </Button>
  );
}
