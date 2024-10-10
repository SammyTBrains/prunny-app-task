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

  const login =() => {
    dispatch(setToken({token: '123'}));
  }

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

  const onSubmit = () =>{}
  
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
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
            //   <FloatingInput
            //     onBlur={onBlur}
            //     onChangeText={(text) => onChange(text)}
            //     value={value}
            //     autoCapitalize='none'
            //     keyboardType='email-address'
            //     leftIcon={<MailSvg />}
            //     label='Hello'
            //   />
              <TextInput />
            );
          }}
          name='phoneNumber'
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
            //   leftIcon={<LockSvg />}
            //   label='Password'
            //   onBlur={onBlur}
            //   onChangeText={(text) => onChange(text)}
            //   value={value}
            //   secureTextEntry
            //   rightElement={
            //     <TouchableOpacity onPress={() => alert("Forgot password?")}>
            //       <Text style={styles.forgotText}>Forgot?</Text>
            //     </TouchableOpacity>
            //   }
            // />
            <TextInput />
          )}
          name='password'
        />

        {errors.password && (
          <Text className="text-red">{errors.password.message}</Text>
        )}
      </View>
      <Button onPress={handleSubmit(onSubmit)} title="Login"/>
    </View>
  );
}
