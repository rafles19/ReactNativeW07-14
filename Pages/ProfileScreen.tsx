import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { RouteProp } from '@react-navigation/native'

type ProfileScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ProfileScreen'>
type ProfileScreenRouteProps = RouteProp<RootStackParamList, 'ProfileScreen'>

type Props = {
    navigation : ProfileScreenNavigationProps;
    route : ProfileScreenRouteProps;
}


const ProfileScreen = ({ navigation, route} : Props) => {
    const { username, photo_url, email } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image style={styles.avatar} source={{ uri: photo_url }} />
        <Text>{email}</Text>
      <Text>{username}&apos;s Profile</Text>
      <Button title= "Go Back" onPress={()=> navigation.navigate('UserList')} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
})