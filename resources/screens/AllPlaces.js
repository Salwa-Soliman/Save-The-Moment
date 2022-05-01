import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import NewScreen from "./../components/NewScreen";
import { fetchPlaces } from "./../util/database";

export default function AllPlaces() {
  const isFocused = useIsFocused();
  const [addedPlaces, setAddedPlaces] = useState([]);

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setAddedPlaces(places);
      // console.log(addedPlaces);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={addedPlaces} />;
}
