import React, { useState } from "react";
import { Alert } from "react-native";
import { Center, HStack, View } from "native-base";
import CustomButton from "../UI/CustomButton";
import { COLORS } from "./../../constants/Colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import MapView from "react-native-maps";

export default function LocationPicker() {
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState("");
  return (
    <Center>
      {/* Map Preview  */}
      <View
        w="100%"
        h="200"
        bg={pickedLocation ? "transparent" : COLORS.primary300}
        my="5"
      >
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      {/* Actions  */}
      <HStack>
        <CustomButton icon="location" onPress={getCurrentLocationHandler}>
          Current Location
        </CustomButton>
        <CustomButton icon="map" onPress={pickAnotherLocationHandler}>
          Pick on Map
        </CustomButton>
      </HStack>
    </Center>
  );

  async function getCurrentLocationHandler() {
    const hasPermission = await verifyPermission();
    if (hasPermission) {
      const location = await getCurrentPositionAsync();
      console.log(location);
    }
  }

  function pickAnotherLocationHandler() {}

  async function verifyPermission() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuffecient Permission!",
        "You won't be able to take a picture unless you enable the camera permission",
        [
          {
            text: "Allow Access",
            // onPress: () => {
            //   locationPermission.status = PermissionStatus.UNDETERMINED;
            // },
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
