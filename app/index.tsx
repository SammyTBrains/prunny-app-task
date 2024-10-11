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
import { Controller, useForm } from "react-hook-form";
import colors from "@/constants/myApp/colors";

type FormData = {
  phoneNumber: string;
  password: string;
};

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  let canSubmit;

  if (
    getValues("phoneNumber") &&
    getValues("password") &&
    !errors.phoneNumber &&
    !errors.password
  ) {
    canSubmit = true;
  } else {
    canSubmit = false;
  }

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

          <View className="mb-7 gap-1">
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "This is required.",
                },
                pattern: {
                  value: /^0\d{10}$/,
                  message:
                    "Invalid phone number. It should be 11 digits starting with 0.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <View className="w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(text)}
                      value={value}
                      className="text-sm font-[roboto]"
                      placeholder="Phone Number"
                      keyboardType="phone-pad"
                    />
                  </View>
                );
              }}
              name="phoneNumber"
            />

            {errors.phoneNumber && (
              <Text style={{ color: "red" }}>{errors.phoneNumber.message}</Text>
            )}
          </View>

          <View className="mb-7 gap-1">
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "This is required.",
                },
                minLength: { value: 4, message: "Password too short." },
                maxLength: { value: 12, message: "Password too long." },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
                  <TextInput
                    className="text-sm font-[roboto]"
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
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
              )}
              name="password"
            />

            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
            )}
          </View>

          <View className="mb-20 flex flex-row items-center gap-2">
            <FontAwesome name="lock" size={20} color="black" />
            <TouchableOpacity>
              <Text className="font-[roboto] text-primary-dark text-sm">
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between mb-24">
            <TouchableOpacity
              className="rounded-[80px] w-[246px] h-[54px] items-center justify-center"
              style={
                canSubmit
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: colors.primaryLight }
              }
              onPress={handleSubmit(onSubmit)}
              disabled={!canSubmit}
            >
              <Text className="font-[roboto-medium] text-white text-base">
                Log In
              </Text>
            </TouchableOpacity>
            <View
              className="w-[58px] h-[54px] rounded-full justify-center items-center border-spacing-4"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 5 },
              }}
            >
              <MaterialIcons name="fingerprint" size={30} color="#B1B1B1" />
            </View>
          </View>

          <View className="flex-row justify-center">
            <Text className="font-[roboto-medium] text-primary-dark text-sm">
              I don't have an account?{" "}
            </Text>
            <TouchableOpacity>
              <Text className="text-primary text-sm font-[roboto-bold]">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
