import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

type EmailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EmailScreen'>
type EmailScreenRouteProp = RouteProp<RootStackParamList, 'EmailScreen'>

type Props = {
    navigation: EmailScreenNavigationProp;
    route: EmailScreenRouteProp;
}

const EmailScreen = ({ navigation }: Props) => {
    return (
        <View style={{ flex:1,  alignItems: "center", justifyContent:"center"}}>
            <Text>EmailScreen list Page</Text>
            <Button title='Go Home' onPress={() => navigation.navigate('HomeScreen')} />
        </View>
    )
}

export default EmailScreen

const styles = StyleSheet.create({})