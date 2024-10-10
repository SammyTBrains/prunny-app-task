import { View, Text, TextInput, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authState, setToken } from "@/store/auth";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  phoneNumber: string;
  password: string;
};

export default function Login() {
  const token = useSelector((state: { auth: authState }) => state.auth.token);

  const dispatch = useDispatch();

  const login = () => {
    dispatch(setToken({ token: "123" }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <View>
      <Text>Login Screen</Text>
      <View className="justify-center items-center py-5 mb-[15px]">
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
              <TextInput
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
                keyboardType="phone-pad"
                placeholder="Phone Number"
              />
            );
          }}
          name="phoneNumber"
        />

        {errors.phoneNumber && (
          <Text className="text-red">{errors.phoneNumber.message}</Text>
        )}

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
            // <FloatingInput
            //   containerStyle={{ marginTop: 16 }}
            //   label='Password'
            //   rightElement={
            //     <TouchableOpacity onPress={() => alert("Forgot password?")}>
            //       <Text style={styles.forgotText}>Forgot?</Text>
            //     </TouchableOpacity>
            //   }
            // />
            <TextInput
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
              secureTextEntry
              placeholder="Password"
            />
          )}
          name="password"
        />

        {errors.password && (
          <Text className="text-red">{errors.password.message}</Text>
        )}
      </View>
      <Button onPress={handleSubmit(onSubmit)} title="Login" />
    </View>
  );
}
