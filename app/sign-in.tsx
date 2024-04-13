import Button from "@/components/Button";
import Container from "@/components/Container";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Loader from "@/components/Loader";
import Navigate from "@/components/Navigate";
import Text from "@/components/Text";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

const SignIn = () => {
  const { session, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInWithEmail() {
    if (!email || !password) return;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(data, error);
  }

  if (loading) {
    return <Loader />;
  }

  if (session) {
    return <Navigate initialRouteName={"/(tabs)/"} />;
  }
  return (
    <Container className="py-6 gap-8 items-center">
      <View className="gap-2 items-center">
        <Text className="text-4xl font-medium">Let's join with us</Text>
        <Text className="w-72 text-center text-neutral-600 dark:text-neutral-300">
          Enter your email address or social account to get started
        </Text>
      </View>
      <View className="w-full gap-2">
        <Text className="font-semibold">Email Address</Text>
        <TextInput
          autoComplete="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          className="bg-white border border-neutral-400 py-2 px-6 rounded-full"
          placeholder="yourmail@xyz.com"
        />
        <Text className="font-semibold">Password</Text>
        <TextInput
          secureTextEntry
          autoComplete="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          className="bg-white border border-neutral-400 py-2 px-6 rounded-full"
          placeholder="********"
        />
        <Button onPress={signInWithEmail} className="mt-4">
          Continue
        </Button>
      </View>
      <View className="w-full">
        <GoogleSignInButton />
      </View>
    </Container>
  );
};

export default SignIn;
