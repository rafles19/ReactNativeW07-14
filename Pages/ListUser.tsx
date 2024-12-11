import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import userData from './data.json';
import styles from './Styles'; // Ensure styles are defined here
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


type UserListNavigationProps = StackNavigationProp<RootStackParamList, 'UserList'>;
type UserListRouteProps = RouteProp<RootStackParamList, 'UserList'>;
type Props = {
    navigation : UserListNavigationProps;
    route : UserListRouteProps;
}

const UserList = ({ navigation } : Props) => {
  return (
    <ScrollView>
      {userData.map((user) => (
        <View style={styles.userList} key={user.name}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
                navigation.navigate('ProfileScreen', { username: user.name, photo_url: user.photo_url, email: user.email });
              console.log("Navigating to Profile with user:", user.name);
            }}
          >
            <Image style={styles.avatar} source={{ uri: user.photo_url }} />
            <View>
              <Text style={styles.boldText}>{user.name}</Text>
              <Text>{user.email}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default UserList;
