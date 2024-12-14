import { Button, View } from "react-native";

interface ICounter {
  handleIncrement: () => void;
  handleDecrement: () => void;
  value: number;
}

const Counter = ({
  handleDecrement,
  handleIncrement,
  value,
}: ICounter) => {
  return (
    <View>
      {value}
      <Button title="Increment" onPress={handleIncrement} />
      <Button title="Decrement" onPress={handleDecrement} />
    </View>
  );
};

export default Counter;
