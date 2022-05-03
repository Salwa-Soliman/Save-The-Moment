import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, Box, Text } from "native-base";
import AllPlaces from "./resources/screens/AllPlaces";
import AddPlace from "./resources/screens/AddPlace";
import IconButton from "./resources/components/UI/IconButton";
import { COLORS } from "./resources/constants/Colors";
import { init } from "./resources/util/database";
import AppLoading from "expo-app-loading";
import PlaceDetails from "./resources/screens/PlaceDetails";
import Splash from "./resources/screens/Splash";
import { ImageBackground } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "bad-script": require("./resources/fonts/Bad_Script/BadScript-Regular.ttf"),
    second: require("./resources/fonts/BerkshireSwash-Regular.ttf"),
  });

  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(setIsDbInitialized(true))
      .catch((err) => console.log(err));
  }, []);

  if (!isDbInitialized || !fontsLoaded) {
    // return <Text>app</Text>;
    return <AppLoading />;
    console.log("inside appjs");
  }
  return (
    <NativeBaseProvider>
      <StatusBar style={"light"} />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./resources/images/bg.jpg")}
        resizeMode="cover"
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: COLORS.primary700,
                fontFamily: "second",
                // paddingTop: 10,
                // paddingBottom: 10,
              },
              headerTitleStyle: { fontFamily: "second" },
              headerTintColor: COLORS.primary100,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                headerBackVisible: false,
                title: "Your Saved Memories",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    color={tintColor}
                    size={30}
                    name="add"
                    onPress={() => {
                      navigation.navigate("AddPlace");
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{
                title: "Add Memory",
              }}
            />
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetails}
              options={{
                title: "Details",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </NativeBaseProvider>
  );
}
