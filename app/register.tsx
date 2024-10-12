import PhoneNumberForm from "@/components/myApp/RegisterScreen/PhoneNumberForm";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function Register() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-[90%] items-center">
          <PhoneNumberForm />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
