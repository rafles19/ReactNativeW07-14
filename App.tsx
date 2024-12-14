import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { fetchPosts, increment, decrement } from './counterSlice';
import { RootState } from './rootReducer';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.count);
  const status = useSelector((state: RootState) => state.counter.status);
  const error = useSelector((state: RootState) => state.counter.error);
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useSelector((state: RootState) => state.counter.count);
  const status = useSelector((state: RootState) => state.counter.status);
  const error = useSelector((state: RootState) => state.counter.error);

  const handleFetchPosts = () => {
    dispatch(fetchPosts());
  };

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <View style={styles.container}>
      <Text>Selamat Datang My Interface - 0000000072</Text>
      <Text>Status : {status ?? "Loading..."}</Text>
      <Text>Error: {error ?? "Error tampil"}</Text>
      <Text>Counter: {count}</Text>
      <Button title="Fetch Data" onPress={handleFetchPosts} />
      <Button title="Increment" onPress={handleIncrement} />
      <Button title="Decrement" onPress={handleDecrement} />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
