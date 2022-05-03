import React, { useEffect, useState } from "react";
import {
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  Center,
} from "native-base";
import LoadingData from "../components/LoadingData";
import { COLORS } from "../constants/Colors";
import { deleteItemFromDb, fetchPlaceDetails } from "../util/database";
import { useToast } from "native-base";
import { Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomModal from "../components/CustomModal";
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

      //set screen options => delete
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            color={tintColor}
            size={30}
            name="trash"
            onPress={() => {
              deleteItemFromDb(place.id);
              navigation.navigate("AllPlaces");
            }}
          />
        ),
      });
      setFetchedPlace(place);
    }

    loadPlaceData();
  }, [placeId]);

  if (Object.keys(fetchedPlace).length === 0) {
    return <LoadingData />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        // alignItems: "center",
        flex: 1,
      }}
    >
      <Image
        source={{
          uri: fetchedPlace.imgUri,
        }}
        w="100%"
        h="300"
        alt={"place image"}
      />
      <View p="5">
        {/* Title with edit icon  */}
        <Center alignSelf="center" w="90%" mb="5" px="5">
          <Text
            textAlign={"center"}
            fontSize="22"
            color={COLORS.primary400}
            fontFamily="second"
          >
            {fetchedPlace.title}
          </Text>
          <Icon
            as={MaterialCommunityIcons}
            name="playlist-edit"
            size="3xl"
            mx="2"
            color={COLORS.primary600}
            onPress={() => setIsEditingText(true)}
          />
        </Center>
        <View>
          {/* Date */}
          <Text
            fontFamily="second"
            fontSize={20}
            my={3}
            color={COLORS.primary600}
          >
            Date: <Text fontSize={16}>{fetchedPlace.date}</Text>
          </Text>
          {/* Time  */}
          <Text fontFamily="second" fontSize={20} color={COLORS.primary600}>
            Time: <Text fontSize={16}>{fetchedPlace.time}</Text>
          </Text>
        </View>

        {/* Modal => Edit Title  */}
        <CustomModal
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
      setFetchedPlace({ ...fetchedPlace, title: updatedTitle.trim() });
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
