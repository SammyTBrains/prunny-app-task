import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import colors from "@/constants/myApp/colors";

type FormData = {
  otp: string;
};

export default function OTPVerification() {
  const [timer, setTimer] = useState(59);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: FormData) => {
    // console.log(data);
    // Handle OTP verification
  };

  const resendOTP = () => {
    setTimer(59);
    // Implement OTP resend logic here
  };

  let canSubmit = getValues("otp").length === 4 && !errors.otp;

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <TouchableOpacity onPress={() => router.back()} className="self-start">
        <Ionicons name="chevron-back" size={28} color="#291539" />
      </TouchableOpacity>

      <View className="mt-9">
        <Text className="text-lg font-[roboto-bold] text-primary-dark">
          Kindly verify your number with the OTP you just received
        </Text>

        <View className="mt-10">
          <Controller
            control={control}
            rules={{
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{4}$/,
                message: "Please enter a valid 4-digit OTP",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View className="flex-row justify-between">
                {[0, 1, 2, 3].map((index) => (
                  <TextInput
                    key={index}
                    className="w-14 h-14 border border-[#2d114510] rounded-[5px] text-center text-lg font-[roboto-bold]"
                    maxLength={1}
                    keyboardType="number-pad"
                    value={value[index] || ""}
                    onChangeText={(text) => {
                      const newValue = value.split("");
                      newValue[index] = text;
                      onChange(newValue.join(""));
                    }}
                  />
                ))}
              </View>
            )}
            name="otp"
          />
          {errors.otp && (
            <Text className="text-red mt-1">{errors.otp.message}</Text>
          )}
        </View>

        <View className="flex-row justify-between items-center mt-6">
          <TouchableOpacity onPress={resendOTP} disabled={timer > 0}>
            <Text
              className={`font-[roboto] ${
                timer > 0 ? "text-gray-400" : "text-primary-dark"
              }`}
            >
              Resend SMS
            </Text>
          </TouchableOpacity>
          <Text className="font-[roboto] text-primary-dark">
            00:{timer.toString().padStart(2, "0")}
          </Text>
        </View>

        <TouchableOpacity
          className="mt-60 rounded-full py-4 w-full"
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
    </View>
  );
}
