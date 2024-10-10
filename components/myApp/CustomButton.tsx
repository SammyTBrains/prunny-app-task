import { Pressable, Text } from "react-native";

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

const CustomButton = (props: Props) => {
  return (
    <Pressable
      className="px-3 py-2 m-1 h-14 bg-orange-500 rounded-lg shadow-md"
      onPress={props.onPress}
      style={({ pressed }) => pressed && { opacity: 0.7 }}
    >
      <Text className="text-center font-bold text-lg text-white">
        {props.children}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
