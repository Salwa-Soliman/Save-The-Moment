import React, { useState } from "react";
import { View, Button, Center, HStack, Text, Image } from "native-base";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Alert } from "react-native";
import { COLORS } from "./../../constants/Colors";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../UI/CustomButton";

export default function ImagePicker({ onTakeImage }) {
  const [CameraPermission, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState("");

  return (
    <Center>
      <Center
        w="100%"
        h="200"
        bg={pickedImage ? "transparent" : COLORS.primary100 + "60"}
        my="5"
        borderWidth={2}
        borderColor={pickedImage ? "transparent" : COLORS.primary100}
        // shadow={4}
        borderRadius={"md"}
      >
        {pickedImage ? (
          <Image
            source={{ uri: pickedImage }}
            resizeMode="cover"
            alt="picked-image"
            w={"100%"}
            h={"100%"}
          />
        ) : (
          <Text
            color={COLORS.primary700 + "80"}
            fontSize={18}
            fontFamily="second"
          >
            You haven't captured an image yet ...
          </Text>
        )}
      </Center>
      <CustomButton icon="camera" onPress={takeImageHandler}>
        Take an Image
      </CustomButton>
    </Center>
  );

  async function takeImageHandler() {
    // console.log(CameraPermission.status === PermissionStatus.UNDETERMINED);

    const hasPermission = await verifyPermission();

    // console.log("hasPermission", hasPermission);

    if (hasPermission) {
      const image = await launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
        aspect: [16, 9],
      });
      // console.log(image);
      setPickedImage(image.uri);
      onTakeImage(image.uri);
    }
  }

  async function verifyPermission() {
    // console.log(CameraPermission.status === PermissionStatus.UNDETERMINED);
    if (CameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (CameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuffecient Permission!",
        "You won't be able to take a picture unless you enable the camera permission",
        [
          {
            text: "Allow Access",
            onPress: () => {
              CameraPermission.status = PermissionStatus.UNDETERMINED;
              takeImageHandler();
            },
            style: "default",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
      return false;
    }

    return true;
  }
}
