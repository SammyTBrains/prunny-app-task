import { FIREBASE_API_KEY } from "@/env";
import axios from "axios";

export const createUser = async (email: string, password: string) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
};
