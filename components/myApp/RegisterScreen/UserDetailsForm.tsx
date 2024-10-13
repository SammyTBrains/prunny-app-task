import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import colors from "@/constants/myApp/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

type FormData = {
  phoneNumber: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
};

interface UserDetailsFormProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function UserDetailsForm({
  onContinue,
  onBack,
}: UserDetailsFormProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      phoneNumber: "",
      lastName: "",
      dateOfBirth: new Date(),
      gender: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // console.log(data);
    onContinue();
  };

  return (
    <>
      <View className="px-4 pt-4 self-start">
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={28} color="#291539" />
        </TouchableOpacity>
      </View>

      <View className="w-full">
        <View className="px-4 mt-9">
          <Text className="text-lg font-[roboto-bold] text-primary-dark">
            Please enter your details
          </Text>
          <Text className="text-sm font-[roboto] text-primary-dark mt-2 opacity-80">
            Tell us a little bit about yourself
          </Text>

          <View className="mt-6">
            <Controller
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Please enter a valid 11-digit phone number",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
                  <TextInput
                    className="text-sm font-[roboto] text-primary-dark"
                    placeholder="Phone Number"
                    placeholderTextColor={colors.primaryDark50}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="phone-pad"
                  />
                </View>
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber && (
              <Text className="text-red">{errors.phoneNumber.message}</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: "Last name is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]">
                  <TextInput
                    className="text-sm font-[roboto] text-primary-dark"
                    placeholder="Enter your lastname e.g Ogbensi"
                    placeholderTextColor={colors.primaryDark50}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="lastName"
            />
            {errors.lastName && (
              <Text className="text-red">{errors.lastName.message}</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: "Date of birth is required",
              }}
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  className="w-80 h-14 pl-6 py-[15px] border border-[#2d114510] justify-center rounded-[5px]"
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text className="font-[roboto] text-primary-dark">
                    {value.toDateString() || "Date of birth"}
                  </Text>
                </TouchableOpacity>
              )}
              name="dateOfBirth"
            />
            {showDatePicker && (
              <DateTimePicker
                value={control._formValues.dateOfBirth}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setValue("dateOfBirth", selectedDate);
                  }
                }}
              />
            )}
            {errors.dateOfBirth && (
              <Text className="text-red">{errors.dateOfBirth.message}</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: "Gender is required",
              }}
              render={({ field: { onChange, value } }) => (
                <View className="border border-[#2d114510] rounded-[5px]">
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                      onChange(itemValue)
                    }
                  >
                    <Picker.Item label="Choose your gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
              )}
              name="gender"
            />
            {errors.gender && (
              <Text className="text-red">{errors.gender.message}</Text>
            )}
          </View>

          <TouchableOpacity
            className="mt-10 rounded-full py-4 w-full"
            onPress={handleSubmit(onSubmit)}
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-white text-center font-[roboto-medium] text-base">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
