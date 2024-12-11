import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Pages/HomeScreen';
import UserList from './Pages/ListUser';
import EmailScreen from './Pages/EmailScreen';
import ProfileScreen from './Pages/ProfileScreen';


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EmailScreen" component={EmailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
