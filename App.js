import React, { useState } from "react";
import { TextInput, Button, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";

const API_KEY = "699314c58bdb4721176605svt7984b2";

export default function App() {
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [location, setLocation] = useState(null);

  const searchAddress = async () => {
    const url =
      "https://geocode.maps.co/search?q=" +
      encodeURIComponent(address) +
      "&api_key=" +
      API_KEY;

      console.log("DATA:", data);

    const response = await fetch(url);
    const data = await response.json();

    console.log("DATA:", data);

    if (Array.isArray(data) && data.length > 0) {
      const lat = Number(data[0].lat);
      const lon = Number(data[0].lon);

      setLocation({ latitude: lat, longitude: lon});

      setRegion({
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        placeholder="syötä osoite"
        placeholderTextColor="gray"
        style={{backgroundColor: "white", padding: 10}}
        value={address}
        onChangeText={setAddress}
      />
      <Button title="SHOW" onPress={searchAddress} />

      <MapView
        style={{ flex: 1 }} region={region}>
      {location && <Marker coordinate={location} />}
    </MapView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
