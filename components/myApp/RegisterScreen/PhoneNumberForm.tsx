import { View, Text, TextInput, TouchableOpacity, LogBox } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { useEffect, useState } from "react";
import colors from "@/constants/myApp/colors";
import { useRouter } from "expo-router";

type FormData = {
  phoneNumber: string;
};

export default function PhoneNumberForm() {
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [country, setCountry] = useState<Country | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

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
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // console.log(data);
    // Handle form submission
  };

  let canSubmit =
    getValues("phoneNumber").trim().length > 0 && !errors.phoneNumber;

  return (
    <>
      <View className="px-4 pt-4 self-start">
        <TouchableOpacity onPress={() => router.back()}>
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
              required: {
                value: true,
                message: "This is required.",
              },
              pattern: {
                value: /^(0?\d{10}|\d{10})$/,
                message:
                  "Invalid phone number. It should be 10 or 11 digits, optionally starting with 0.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex-row w-80 items-center borderw-80 h-14 border border-[#2d114510] rounded-[5px]">
                <TouchableOpacity
                  className="flex-row items-center p-2 mr-2"
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
                  <Text className="ml-2 text-sm font-[roboto]">
                    {!country?.callingCode[0]
                      ? "+234"
                      : "+" + country?.callingCode[0]}
                  </Text>
                </TouchableOpacity>
                <View className="w-[50%] mt-[-3.5px]">
                  <TextInput
                    placeholder="Type your phone number"
                    placeholderTextColor={colors.primaryDark50}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    keyboardType="phone-pad"
                    className="text-sm font-[roboto]"
                  />
                </View>
              </View>
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <Text className="text-red mt-1">{errors.phoneNumber.message}</Text>
          )}
        </View>

        <View className="w-80 h-[60px] justify-center px-5 rounded-[5px] bg-[#FAF5FF] mt-6">
          <Text className="text-xs font-[roboto] text-[#2D1145]">
            By adding your phone number, you agree to{" "}
            <Text className="font-[roboto-bold]">
              Prunny Terms & Conditions
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          className="mt-60 rounded-full py-4 w-80"
          onPress={handleSubmit(onSubmit)}
          style={
            canSubmit
              ? { backgroundColor: colors.primary }
              : { backgroundColor: colors.primaryLight }
          }
          disabled={!canSubmit}
        >
          <Text className="text-white text-center font-[roboto-medium] text-base">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
