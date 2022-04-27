import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, Box } from "native-base";
import AllPlaces from "./resources/screens/AllPlaces";
import AddPlace from "./resources/screens/AddPlace";
import IconButton from "./resources/components/UI/IconButton";
import { COLORS } from "./resources/constants/Colors";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style={"light"} />
      <Box flex="1">
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: COLORS.primary700 },
              headerTintColor: COLORS.primary50,
              contentStyle: { backgroundColor: COLORS.primary50 },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                title: "Your Saved Places",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    color={tintColor}
                    size={24}
                    name="add"
                    onPress={() => navigation.navigate("AddPlace")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{
                title: "Add a New Place",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}
