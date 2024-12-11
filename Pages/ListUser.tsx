import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { ZoomIn, BounceIn, FadeIn } from 'react-native-reanimated';
import userData from './data.json';
import styles from './Styles';
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
      {userData.map((user, index) => {
        const animation = index % 3 === 0
          ? ZoomIn
          : index % 3 === 1
          ? BounceIn
          : FadeIn;

        return (
          <Animated.View
            key={user.name}
            entering={animation.duration(5000 + index * 100)}
            style={styles.userList}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ProfileScreen', { username: user.name, photo_url: user.photo_url, email: user.email })}
            >
              <Image style={styles.avatar} source={{ uri: user.photo_url }} />
              <View>
                <Text style={styles.boldText}>{user.name}</Text>
                <Text>{user.email}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

export default UserList;
