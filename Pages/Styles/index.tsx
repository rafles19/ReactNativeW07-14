import { StyleSheet } from 'react-native';
// ini week 5
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userList: {
        padding: 10
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    boldText: {
        fontWeight: 'bold'
    }
})

export default styles;