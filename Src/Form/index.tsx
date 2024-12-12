import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Form = ({ route }: { route: any }) => {
  const { postId } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.title);
        setContent(json.body);
      })
      .catch((error) => console.error('Error:', error));
  }, [postId]);

  const handleUpdate = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: postId,
        title: title,
        body: content,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        Alert.alert('Success', 'Post updated successfully', [
          { text: 'OK', onPress: () => navigation.navigate('Home' as never) },
        ]);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Update Post ID: {postId}</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Update Post" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

export default Form;