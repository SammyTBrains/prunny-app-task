import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  LogBox,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { useEffect, useState } from "react";

type FormData = {
  phoneNumber: string;
};

export default function Register() {
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [country, setCountry] = useState<Country | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  //Warning for the country picker package, this is a temporary fix
  useEffect(() => {
    LogBox.ignoreLogs(["Support for defaultProps"]);
  }, []);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setModalVisible(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-[90%]">
          <View className="px-4 pt-4">
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={28} color="#291539" />
            </TouchableOpacity>
          </View>
          <View className="px-4 mt-9">
            <Text className="text-lg font-[roboto-bold] text-primary-dark">
              Get Started
            </Text>
            <Text className="text-sm font-[roboto] text-primary-dark mt-2 opacity-80">
              Start making your payments, settling your bills easily and faster
            </Text>

            <View className="mt-10">
              <Controller
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Please enter a valid phone number",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="flex-row justify-center items-center borderw-80 h-14 border border-[#2d114510] rounded-[5px]">
                    <TouchableOpacity
                      className="flex-row items-center p-2 border-r border-gray-300"
                      onPress={() => setModalVisible(true)}
                    >
                      <CountryPicker
                        countryCode={countryCode}
                        withFilter
                        withFlag
                        withCountryNameButton={false}
                        withAlphaFilter
                        withCallingCode
                        withEmoji
                        onSelect={onSelect}
                        visible={modalVisible}
                      />
                      <Text className="ml-2">
                        {!country?.callingCode[0]
                          ? "+234"
                          : "+" + country?.callingCode[0]}
                      </Text>
                    </TouchableOpacity>
                    <TextInput
                      placeholder="Type your phone number"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="phone-pad"
                      className="flex-1 py-2 text-base"
                    />
                  </View>
                )}
                name="phoneNumber"
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>

            <Text className="text-xs text-[#2D1145] mt-4 opacity-70">
              By adding your phone number, you agree to Prunny Terms &
              Conditions
            </Text>

            <TouchableOpacity
              className="bg-[#C8A2C8] rounded-full py-4 mt-auto mb-8"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white text-center font-semibold">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
