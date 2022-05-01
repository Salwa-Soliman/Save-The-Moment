import {
  Text,
  View,
  FormControl,
  Stack,
  Input,
  Box,
  TextArea,
  Center,
} from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Place } from "../../models/place";
import CustomButton from "../UI/CustomButton";
import { COLORS } from "./../../constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm({ onCreatePlace }) {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  return (
    <View flex={1}>
      {/* textArea  */}
      <Box mt={5}>
        <TextArea
          h={20}
          placeholder="Describe your moment .. Make it a memory"
          w="100%"
          bg={COLORS.primary300 + "A0"}
          placeholderTextColor={COLORS.primary700 + "50"}
          fontSize={16}
          color={COLORS.primary500}
          fontWeight={"700"}
          onChangeText={(val) => {
            setTitle(val);
          }}
          value={title}
          borderRadius={"md"}
        />
      </Box>
      <ImagePicker onTakeImage={takeImageHandler} />
      <CustomButton onPress={addPlaceHandler} margin hasBg>
        Save Memory
      </CustomButton>
    </View>
  );

  function takeImageHandler(imgUri) {
    setSelectedImage(imgUri);
  }

  function addPlaceHandler() {
    if (!(title.trim() && selectedImage)) {
      Alert.alert("Can't Add!", "Please fill the text and pick an image");
    } else {
      const date = new Date().toString();
      const [day, month, monthDay, year, time] = new Date()
        .toString()
        .split(" ");
      const currentDate = `${month}. ${monthDay} ${year}`;

      const placeData = new Place(title, selectedImage, currentDate, time);
      // console.log('placeData',placeData);
      onCreatePlace(placeData);
    }
  }
}
