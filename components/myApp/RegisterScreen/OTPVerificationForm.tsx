import { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import colors from "@/constants/myApp/colors";

type FormData = {
  otp: string;
};

interface OTPVerificationFormProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function OTPVerificationForm(props: OTPVerificationFormProps) {
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<TextInput[]>([]);

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
    inputRefs.current = inputRefs.current.slice(0, 4);
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: FormData) => {
    // console.log(data);
    props.onContinue();
  };

  const resendOTP = () => {
    setTimer(59);
    // Implement OTP resend logic here
  };

  let canSubmit = getValues("otp").length === 4 && !errors.otp;

  return (
    <>
      <View className="px-4 pt-4 self-start">
        <TouchableOpacity onPress={props.onBack}>
          <Ionicons name="chevron-back" size={28} color="#291539" />
        </TouchableOpacity>
      </View>

      <View className="px-4 mt-9">
        <Text className="text-lg font-[roboto-bold] text-primary-dark">
          Kindly verify your number with the OTP you just received
        </Text>

        <View className="mt-12">
          <View className="flex flex-row justify-between">
            <Text className="font-[roboto] text-sm text-primary-dark opacity-80">
              Enter the 4 digit OTP
            </Text>
            <Text className="font-[roboto] text-sm text-primary">
              00:{timer.toString().padStart(2, "0")}
            </Text>
          </View>
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
              <View className="flex-row justify-between mt-3">
                {[0, 1, 2, 3].map((index) => (
                  <TextInput
                    key={index}
                    className="w-[68px] h-[52px] border border-[#2d114510] rounded-[5px] text-center text-lg font-[roboto-bold]"
                    maxLength={1}
                    placeholder="."
                    placeholderTextColor="#2D114533"
                    keyboardType="number-pad"
                    value={value[index] || ""}
                    secureTextEntry
                    onChangeText={(text) => {
                      const newValue = value.split("");
                      newValue[index] = text;
                      onChange(newValue.join(""));
                      if (text && index < 3) {
                        // Move focus to the next input
                        inputRefs.current[index + 1].focus();
                      } else if (!text && index > 0) {
                        // Move focus to the previous input when backspace is pressed
                        inputRefs.current[index - 1].focus();
                      }
                    }}
                    onKeyPress={({ nativeEvent }) => {
                      if (
                        nativeEvent.key === "Backspace" &&
                        !value[index] &&
                        index > 0
                      ) {
                        // Move focus to the previous input when backspace is pressed on an empty input
                        inputRefs.current[index - 1].focus();
                      }
                    }}
                    ref={(ref) => (inputRefs.current[index] = ref!)}
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

        <View className="flex-row gap-2 items-center mt-3">
          <Ionicons name="chatbox-ellipses-outline" color="#291539" size={16} />
          <TouchableOpacity onPress={resendOTP} disabled={timer > 0}>
            <Text
              className={`font-[roboto-medium] text-sm ${
                timer > 0 ? "text-grey" : "text-[#291539]"
              }`}
            >
              Resend SMS
            </Text>
          </TouchableOpacity>
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
