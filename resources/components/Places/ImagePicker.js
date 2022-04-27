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

export default function ImagePicker() {
  const [CameraPermission, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState("");

  return (
    <Center>
      <Center
        w="100%"
        h="200"
        bg={pickedImage ? "transparent" : COLORS.primary300}
        my="5"
      >
        {pickedImage ? (
          <Image
            source={{ uri: pickedImage }}
            resizeMode="contain"
            alt="picked-image"
            w={"100%"}
            h={"100%"}
          />
        ) : (
          <Text color={COLORS.basic500} fontSize={16} italic>
            You haven't captured a picture yet ...{" "}
          </Text>
        )}
      </Center>
      <Button
        onPress={takeImageHandler}
        rounded="full"
        bg={COLORS.basic500}
        py="3"
        px="6"
        variant={"outline"}
      >
        <HStack alignItems="center">
          <Icon
            as={Ionicons}
            name="camera"
            size="26"
            color={COLORS.secondary100}
          />
          <Text color={COLORS.secondary100} fontWeight="bold" fontSize="16">
            {"  "}Take an Image
          </Text>
        </HStack>
      </Button>
    </Center>
  );

  async function takeImageHandler() {
    console.log(CameraPermission.status === PermissionStatus.UNDETERMINED);

    const hasPermission = await verifyPermission();

    console.log("hasPermission", hasPermission);

    if (hasPermission) {
      const image = await launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
        aspect: [16, 9],
      });
      // console.log(image);
      setPickedImage(image.uri);
    }
  }

  async function verifyPermission() {
    // console.log(CameraPermission.status === PermissionStatus.UNDETERMINED);
    if (CameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (CameraPermission.status === PermissionStatus.DENIED) {
      // Alert.alert(
      //   "Insuffecient Permission!",
      //   "You won't be able to take a picture unless you enable the camera permission",
      //   [
      //     {
      //       text: "Allow Access",
      //       onPress: () => {
      //         CameraPermission.status = PermissionStatus.UNDETERMINED;
      //         takeImageHandler();
      //       },
      //       style: "default",
      //     },
      //     {
      //       text: "Cancel",
      //       style: "cancel",
      //     },
      //   ],
      //   {
      //     cancelable: true,
      //   }
      // );
      // return false;
      Alert.alert("Permission Denied!", "You need to grant camera access");
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    return true;
  }
}
