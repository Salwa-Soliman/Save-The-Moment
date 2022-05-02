import React, { useState } from "react";
import { Modal, Button, Box, TextArea, Center } from "native-base";
import { COLORS } from "../constants/Colors";
import { Alert } from "react-native";
import { useToast } from "native-base";
import CustomButton from "./UI/CustomButton";

export default function EditTextModal({
  showModal,
  setShowModal,
  onSave,
  currentTitle,
}) {
  const [updatedTitle, setUpdatedTitle] = useState(currentTitle);
  const toast = useToast();

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      bg={COLORS.primary700 + "a0"}
    >
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header fontFamily={"second"} fontWeight="400">
          Update Text
        </Modal.Header>
        <Modal.Body>
          <Box alignItems="center" w="100%" mt={5}>
            <TextArea
              h={20}
              placeholder="Edit and save changes"
              fontSize={16}
              bg={COLORS.primary100 + "a0"}
              borderWidth={2}
              borderColor={COLORS.primary100}
              color={COLORS.primary600}
              fontFamily={"second"}
              onChangeText={(val) => {
                setUpdatedTitle(val);
              }}
              value={updatedTitle}
              borderRadius={"md"}
            />
          </Box>
        </Modal.Body>
        <Modal.Footer justifyContent={"center"} alignItems={"center"}>
          <Button
            onPress={saveUpdatedTitle}
            bg={COLORS.primary600}
            px={4}
            rounded={"xl"}
            _text={{
              fontFamily: "second",
              color: COLORS.primary100,
            }}
            colorScheme={"danger"}
          >
            Save Changes
          </Button>{" "}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  function saveUpdatedTitle() {
    updatedTitle !== currentTitle ? onSave(updatedTitle) : null;

    setShowModal(false);
  }
}
