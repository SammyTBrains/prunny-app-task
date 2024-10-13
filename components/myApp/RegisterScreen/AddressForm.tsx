import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import colors from "@/constants/myApp/colors";
import { Dropdown } from "react-native-element-dropdown";

type FormData = {
  address: string;
  city: string;
  state: string;
};

interface AddressFormProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function AddressForm({ onContinue, onBack }: AddressFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      address: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = (data: FormData) => {
    //console.log(data);
    onContinue();
  };

  const stateData = [
    { label: "Lagos", value: "Lagos" },
    { label: "Abuja", value: "Abuja" },
  ];

  return (
    <>
      <View className="px-4 pt-4 self-start">
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={28} color="#291539" />
        </TouchableOpacity>
      </View>

      <View className="px-4 mt-9">
        <Text className="text-lg font-[roboto-bold] text-primary-dark">
          Where do you live?
        </Text>
        <Text className="text-sm font-[roboto] text-primary-dark mt-2 opacity-80">
          Tell us a little bit about yourself
        </Text>

        <View className="mt-6">
          <Controller
            control={control}
            rules={{
              required: "Address is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
                <TextInput
                  className="text-sm font-[roboto] text-primary-dark"
                  placeholder="Enter your address"
                  placeholderTextColor={colors.primaryDark50}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="address"
          />
          {errors.address && (
            <Text className="text-red">{errors.address.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "City is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="w-80 mt-6 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
                <TextInput
                  className="text-sm font-[roboto] text-primary-dark"
                  placeholder="City"
                  placeholderTextColor={colors.primaryDark50}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="city"
          />
          {errors.city && (
            <Text className="text-red">{errors.city.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "State is required",
            }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={{
                  width: 320,
                  height: 56,
                  paddingHorizontal: 24,
                  paddingVertical: 15,
                  borderWidth: 1,
                  borderColor: "rgba(45, 17, 69, 0.06)",
                  borderRadius: 5,
                  marginTop: 24,
                }}
                data={stateData}
                labelField="label"
                valueField="value"
                placeholder="State"
                placeholderStyle={{
                  color: colors.primaryDark50,
                  fontSize: 14,
                  lineHeight: 20,
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  lineHeight: 20,
                  fontFamily: "roboto",
                  color: colors.primaryDark,
                }}
                value={value}
                onChange={(item) => {
                  onChange(item.value);
                }}
              />
            )}
            name="state"
          />
          {errors.state && (
            <Text className="text-red">{errors.state.message}</Text>
          )}
        </View>

        <TouchableOpacity
          className="mt-52 rounded-full py-4 w-80"
          onPress={handleSubmit(onSubmit)}
          style={
            isValid
              ? { backgroundColor: colors.primary }
              : { backgroundColor: colors.primaryLight }
          }
          disabled={!isValid}
        >
          <Text className="text-white text-center font-[roboto-medium] text-base">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
