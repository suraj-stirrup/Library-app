// generate a layout component for the sign-up page
import SignUp from "@/components/SignUpForm";
import React from "react";

export default function SignUpLayout({ children }) {
    return <SignUp>{children}</SignUp>;
}