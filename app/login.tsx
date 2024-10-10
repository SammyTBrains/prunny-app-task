import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authState, setToken } from "@/store/auth";

export default function Login() {
  const token = useSelector((state: { auth: authState }) => state.auth.token);

  const dispatch = useDispatch();

  const login =() => {
    dispatch(setToken({token: '123'}));
  }

  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
}
