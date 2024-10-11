import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-white items-center pt-20">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-4/5 max-w-xs">
          <Text className="text-2xl font-bold mb-6 text-primary-dark">
            Welcome Back
          </Text>
          <Text className="text-sm mb-14 text-primary-dark opacity-80">
            Log into your account and continue to make your transactions easily
          </Text>

          <View className="mb-9 w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
            <TextInput
              className="text-sm"
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-4 w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
            <TextInput
              className="text-sm"
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

          <TouchableOpacity className="self-start mb-6">
            <Text className="text-gray-500 text-sm">Forgot Password</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-purple-500 rounded-lg p-4 flex-row items-center justify-center mb-6">
            <Text className="text-white text-base font-bold mr-2">Log In</Text>
            <MaterialIcons
              name="fingerprint"
              size={24}
              color="white"
              className="ml-2"
            />
          </TouchableOpacity>

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
