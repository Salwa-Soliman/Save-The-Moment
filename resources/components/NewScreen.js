import React from "react";
import { Center, ScrollView, VStack } from "native-base";

export default function NewScreen({ children }) {
  return (
    // <ScrollView
    //   flex="1"
    //   bg="blue.600"
    //   contentContainerStyle={{
    //     justifyContent: "center",
    //     alignContent: "center",
    //   }}
    // >
    // <Center bg="blue.600" flex="1">
    <VStack
      bg="amber.500"
      p="5"
      flex="1"
      justifyContent="space-between"
      // alignItems={"c"}
    >
      {children}
    </VStack>
    // </ScrollView>
  );
}
