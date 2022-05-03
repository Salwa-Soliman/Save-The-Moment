import React, { useState } from "react";
import { AlertDialog, Center, Button, Text } from "native-base";
import { COLORS } from "../constants/Colors";

export default function CustomAlert({ isOpen, setIsOpen }) {
  const onClose = () => setIsOpen(false);

  return (
    <Center>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            <Text fontFamily={"second"} fontSize={18} color={COLORS.primary600}>
              Can't Add!!
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text fontFamily={"second"} fontSize={16} color={COLORS.primary600}>
              Please fill the text field and take an image first
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer justifyContent="center">
            <Button
              variant={"outline"}
              borderWidth={2}
              borderColor={COLORS.secondary500}
              colorScheme="info"
              onPress={onClose}
              _text={{
                fontFamily: "second",
                color: COLORS.secondary500,
              }}
              px={5}
              borderRadius={"xl"}
            >
              Okay
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
