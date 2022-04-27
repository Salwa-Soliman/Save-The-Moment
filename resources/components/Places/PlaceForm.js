import { Text, ScrollView, FormControl, Stack, Input } from "native-base";
import React, { useState } from "react";
import { COLORS } from "./../../constants/Colors";
import ImagePicker from "./ImagePicker";

export default function PlaceForm() {
  const [title, setTitle] = useState("");
  return (
    <ScrollView flex="1">
      <FormControl>
        <Stack>
          <FormControl.Label
            _text={{
              color: COLORS.primary600,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Title
          </FormControl.Label>
          <Input
            variant="underlined"
            py={2}
            px="5"
            placeholder="Title"
            placeholderTextColor={COLORS.primary700 + "50"}
            borderBottomColor={COLORS.primary700}
            bg={COLORS.primary300 + "A0"}
            borderRadius="md"
            fontSize={16}
            color={COLORS.primary500}
            fontWeight={"700"}
            onChangeText={(val) => setTitle(val)}
            value={title}
          />
        </Stack>
      </FormControl>
      <ImagePicker />
    </ScrollView>
  );
}
