import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Animated, { ZoomIn, BounceIn, FadeIn } from 'react-native-reanimated';

type HomeNavigationProps = {
  navigate: (screen: string, params?: { postId: number }) => void;
};

type Props = {
  navigation: HomeNavigationProps;
};

const Home = ({ navigation }: Props) => {
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://jsonplaceholder.typicode.com/posts');
      setPosts(result.data);
    };
    fetchData();
  }, []);

  return (
    <ScrollView>
      {posts.map((post: { id: number; title: string; body: string }, index) => {
        const animation = index % 3 === 0
          ? ZoomIn
          : index % 3 === 1
          ? BounceIn
          : FadeIn;
        return (
          <Animated.View key={post.id} entering={animation.duration(5000 + index * 100)}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Form', { postId: post.id })}>
              <View style={{ justifyContent:"center", alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{post.title}</Text>
                <Text style={{ marginTop: 8, color: '#555' }}>{post.body}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};



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
        marginBottom: 10,
        elevation: 5
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


export default Home;
