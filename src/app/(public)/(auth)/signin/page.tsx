import SignInForm from "@/features/auth/components/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UDD PMI Depok - Sign In",
  description: "Login ke akun UDD PMI Depok",
};

export default function SignIn() {
  return <SignInForm />;
}
