import React, { useState } from "react";
import { Modal, Button, Box, TextArea, Center } from "native-base";
import { COLORS } from "../constants/Colors";
import { Alert } from "react-native";
import { useToast } from "native-base";

export default function EditTextModal({
  showModal,
  setShowModal,
  onSave,
  currentTitle,
}) {
  const [updatedTitle, setUpdatedTitle] = useState(currentTitle);
  const toast = useToast();

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Update Text</Modal.Header>
        <Modal.Body>
          <Box alignItems="center" w="100%" mt={5}>
            <TextArea
              h={20}
              placeholder="Describe your moment .. Make it a memory"
              // w="100%"
              // bg={COLORS.primary300 + "A0"}
              // placeholderTextColor={COLORS.primary700 + "50"}
              fontSize={16}
              color={COLORS.primary500}
              fontWeight={"700"}
              onChangeText={(val) => {
                setUpdatedTitle(val);
              }}
              value={updatedTitle}
              borderRadius={"md"}
            />
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button onPress={saveUpdatedTitle}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  function saveUpdatedTitle() {
    updatedTitle !== currentTitle ? onSave(updatedTitle) : null;

    setShowModal(false);
  }
}
