import React, { useEffect, useState } from "react";
import { Heading, HStack, Image, ScrollView, Text, View } from "native-base";
import LoadingData from "../components/LoadingData";
import { COLORS } from "../constants/Colors";
import { deleteItemFromDb, fetchPlaceDetails } from "../util/database";
import { useToast } from "native-base";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import EditTextModal from "../components/EditTextModal";
import { updateTitle } from "./../util/database";
import CustomButton from "../components/UI/CustomButton";
import IconButton from "./../components/UI/IconButton";

export default function PlaceDetails({ route, navigation }) {
  const placeId = route.params.placeId;
  const [fetchedPlace, setFetchedPlace] = useState({});
  const [isEditingText, setIsEditingText] = useState(false);
  const toast = useToast();

  useEffect(() => {
    //get place using id
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(placeId);
      setFetchedPlace(place);

      //set screen options
      navigation.setOptions({
        title: fetchedPlace.title,
        headerRight: ({ tintColor }) => (
          <IconButton
            color={tintColor}
            size={30}
            name="trash"
            onPress={() => {
              // console.log("pressed");
              deleteItemFromDb(place.id);
              navigation.navigate("AllPlaces");
            }}
          />
        ),
      });
    }

    loadPlaceData();
  }, [placeId]);

  if (Object.keys(fetchedPlace).length === 0) {
    return <LoadingData />;
  }

  return (
    <ScrollView>
      <Image
        source={{ uri: fetchedPlace.imgUri }}
        w="100%"
        h="300"
        alt={"place image"}
      />
      <View p="5">
        {/* Title with edit icon  */}
        <HStack w="100%" alignItems={"center"} justifyContent="center" mb="5">
          <Heading
            // textAlign={"center"}
            fontSize="26"
            color={COLORS.basic400}
          >
            {fetchedPlace.title}
          </Heading>
          <Icon
            as={Ionicons}
            name="create-outline"
            size="xl"
            mx="2"
            color={COLORS.primary400}
            onPress={() => setIsEditingText(true)}
          />
        </HStack>
        {/* Date */}
        <Heading fontSize={16} my={3} color={COLORS.primary600}>
          Date:{" "}
          <Text fontWeight={"semibold"} fontSize={14}>
            {fetchedPlace.date}
          </Text>
        </Heading>
        {/* Time  */}
        <Heading fontSize={16} color={COLORS.basic600}>
          Time:{" "}
          <Text fontWeight={"semibold"} fontSize={14}>
            {fetchedPlace.time}
          </Text>
        </Heading>

        {/* Modal => Edit Title  */}
        <EditTextModal
          showModal={isEditingText}
          setShowModal={setIsEditingText}
          currentTitle={fetchedPlace.title}
          onSave={onSaveHandler}
        />
      </View>
    </ScrollView>
  );

  function onSaveHandler(updatedTitle) {
    console.log(updatedTitle);
    if (updatedTitle.trim()) {
      fetchedPlace.title = updatedTitle.trim();
      updateTitle(fetchedPlace.id, updatedTitle.trim());
      // success toast message
      toast.show({
        description: "Updated Successfully",
      });
    } else {
      // err toast message
      toast.show({
        description: "Can't Save Empty Text",
      });
    }
  }
}
