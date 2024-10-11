import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-white items-center pt-20">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-4/5 max-w-xs">
          <Text className="text-lg font-[roboto-bold] mb-3 text-primary-dark">
            Welcome Back
          </Text>
          <Text className="text-sm mb-11 font-[roboto] text-primary-dark opacity-80">
            Log into your account and continue to make your transactions easily
          </Text>

          <View className="mb-7 w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
            <TextInput
              className="text-sm font-[roboto]"
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-7 w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
            <TextInput
              className="text-sm font-[roboto]"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              className="absolute right-3 top-[60%]"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Entypo name="eye" size={24} color="#6b7280" />
              ) : (
                <Entypo name="eye-with-line" size={24} color="#6b7280" />
              )}
            </TouchableOpacity>
          </View>

          <View className="mb-20 flex flex-row items-center gap-2">
            <FontAwesome name="lock" size={20} color="black" />
            <TouchableOpacity>
              <Text className="font-[roboto] text-primary-dark text-sm">
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between mb-20">
            <TouchableOpacity className="bg-primary rounded-[80px] w-[246px] h-[54px] items-center justify-center">
              <Text className="font-[roboto-medium] text-white text-base">
                Log In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[58px] h-[54px] rounded-full justify-center items-center shadow-lg 
            elevation-2"
            >
              <MaterialIcons name="fingerprint" size={30} color="#B1B1B1" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <Text className="text-gray-500 text-sm">
              I don't have an account?{" "}
            </Text>
            <TouchableOpacity>
              <Text className="text-purple-500 text-sm font-bold">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
