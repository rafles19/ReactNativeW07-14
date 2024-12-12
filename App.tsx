import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const requestPermissions = async () => {
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

    if (locationStatus !== 'granted') {
      Alert.alert('Permission Denied', 'Izin lokasi diperlukan untuk menggunakan fitur ini.');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const captureLocation = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      Alert.alert('Location Captured', `Latitude: ${loc.coords.latitude}, Longitude: ${loc.coords.longitude}`);
    } catch (error) {
      console.error('Error capturing location:', error);
      Alert.alert('Error', 'Tidak dapat mengambil lokasi.');
    }
  };

  const ensureDownloadFolderExists = async () => {
    const downloadFolder = `${FileSystem.documentDirectory}Download/`;
    const folderInfo = await FileSystem.getInfoAsync(downloadFolder);

    if (!folderInfo.exists) {
      console.log('Folder unduhan tidak ada. Membuat...');
      await FileSystem.makeDirectoryAsync(downloadFolder, { intermediates: true });
      console.log('Folder unduhan dibuat.');
    }

    return downloadFolder;
  };

  const saveDataToFile = async () => {
    if (!image || !location) {
      Alert.alert('Error', 'Pastikan gambar dan lokasi sudah diambil.');
      return;
    }

    try {
      const downloadFolder = await ensureDownloadFolderExists();
      const fileName = `${downloadFolder}data_${Date.now()}.txt`;
      const fileContent = `Image URI: ${image}\nLatitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}\nTimestamp: ${new Date(location.timestamp).toString()}`;

      await FileSystem.writeAsStringAsync(fileName, fileContent);
      Alert.alert('Success', `Data disimpan ke: ${fileName}`);
      console.log('File disimpan di:', fileName);
    } catch (error) {
      console.error('Error saving file:', error);
      Alert.alert('Error', 'Tidak dapat menyimpan data ke file.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Contoh Geolocation & Image Picker</Text>
      <Button title="Pilih gambar dari galeri" onPress={pickImage} />
      <Button title="Tangkap Lokasi" onPress={captureLocation} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Simpan Data" onPress={saveDataToFile} disabled={!image || !location} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});