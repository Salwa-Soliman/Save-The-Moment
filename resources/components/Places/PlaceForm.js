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
import CustomAlert from "../CustomAlert";
import CustomButton from "../UI/CustomButton";
import { COLORS } from "./../../constants/Colors";
import ImagePicker from "./ImagePicker";

export default function PlaceForm({ onCreatePlace }) {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showAlert, setshowAlert] = useState(false);

  return (
    <View flex={1}>
      {/* textArea  */}
      <Box mt={5}>
        <TextArea
          h={20}
          placeholder="Describe your moment .. Make it a memory"
          w="100%"
          bg={COLORS.primary100 + "60"}
          // borderWidth={2}
          // borderColor={COLORS.primary100}
          placeholderTextColor={COLORS.primary700 + "80"}
          fontSize={16}
          color={COLORS.primary300}
          fontFamily="second"
          onChangeText={(val) => {
            setTitle(val);
          }}
          value={title}
          borderRadius={"md"}
        />
      </Box>
      <ImagePicker onTakeImage={takeImageHandler} />
      <CustomAlert isOpen={showAlert} setIsOpen={setshowAlert} />
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
      setshowAlert(true);
      // Alert.alert("Can't Add!", "Please fill the text and pick an image");
    } else {
      const date = new Date().toString();
      const [day, month, monthDay, year, time] = new Date()
        .toString()
        .split(" ");
      const currentDate = `${month}. ${monthDay} ${year}`;

      const placeData = new Place(
        title,
        selectedImage,
        currentDate,
        time.substring(0, 5)
      );
      // console.log('placeData',placeData);
      onCreatePlace(placeData);
    }
  }
}
