import React, { useState } from "react";
import { View, Button, Image, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { uploadImage } from "./firebase/Storage";
import { savePhotoMetadata } from "./firebase/Firestore";

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const pickImage = async () => {
    console.log("pickImage function called");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("ImagePicker result:", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("Image URI set:", result.assets[0].uri);
    }
  };

  const captureLocation = async () => {
    console.log("captureLocation function called");
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Location permission status:", status);

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permissions are required.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
    console.log("Location captured:", loc);
  };

  const saveData = async () => {
    console.log("saveData function called");
    if (!image || !location) {
      Alert.alert("Error", "Image and location are required.");
      console.log("Error: Image and location are required.");
      return;
    }

    try {
      const fileName = `photo_${Date.now()}.jpg`;
      console.log("Generated file name:", fileName);
      const downloadURL = await uploadImage(image, fileName);
      console.log("Image uploaded, download URL:", downloadURL);

      await savePhotoMetadata({
        imageUrl: downloadURL,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date(location.timestamp).toISOString(),
      });

      Alert.alert("Success", "Photo and location saved.");
      console.log("Photo and location metadata saved.");
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Capture Location" onPress={captureLocation} />
      <Button title="Save to Firebase" onPress={saveData} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
