import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [uri, setUri] = useState("");
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setUri(result.assets[0].uri);
      } else {
        console.log("Image picker cancelled or no URI provided.");
      }
    } catch (error) {
      console.error("Error opening image picker:", error);
    }
  };

  const handleCameraLaunch = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setUri(result.assets[0].uri);
      } else {
        console.log("Camera launch cancelled or no URI provided.");
      }
    } catch (error) {
      console.error("Error launching camera:", error);
    }
  };

  const checkPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  };

  const saveImage = async () => {
    try {
      const isPermitted = await checkPermissions();
      if (!isPermitted) {
        Alert.alert(
          "Permission Denied",
          "Media library access is required to save the photo."
        );
        return;
      }

      if (!uri || typeof uri !== "string") {
        Alert.alert("Error", "No valid image to save.");
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(uri);

      const album = await MediaLibrary.getAlbumAsync("Pictures");
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync("Pictures", asset, false);
      }

      Alert.alert("Success", "Image saved to Pictures folder!");
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Error", "Failed to save image.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Rafles Kristiyanto - 00000032818</Text>
      <View style={styles.button}>
        <Button title="OPEN CAMERA" onPress={handleCameraLaunch} />
      </View>
      <View style={styles.button}>
        <Button title="OPEN GALLERY" onPress={openImagePicker} />
      </View>
      {uri ? <Button title="SAVE PHOTO" onPress={saveImage} /> : null}
      {uri ? <Image source={{ uri }} style={styles.image} /> : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 500,
    marginTop: 10,
  },
});
