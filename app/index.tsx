import { View, Text, TextInput, Button } from "react-native";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <View className="container flex-1 items-center">
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
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TextInput
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Email"
                className="rounded-2xl px-4 py-2 border-4 border-red-100"
              />
            );
          }}
          name="email"
        />

        {errors.email && (
          <Text className="text-red">{errors.email.message}</Text>
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
              className="rounded-2xl px-4 py-2 border-4 border-red-100"
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
