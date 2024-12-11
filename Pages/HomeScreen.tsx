import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>

type Props = {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
}

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Navigation List</Text>
      <Button title="Email" onPress={() => navigation.navigate('EmailScreen')} />
        <Button title="UserList" onPress={() => navigation.navigate('UserList')} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})