import Button from "@/components/Button";
import Container from "@/components/Container";
import Text from "@/components/Text";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect, router } from "expo-router";
import React from "react";
import { View } from "react-native";

const OnBoarding = () => {
  const { session } = useAuth();
  if (session) {
    return <Redirect href={"/(tabs)/"} />;
  }
  return (
    <Container className="py-36 justify-end items-center gap-8">
      <View className="flex gap-2">
        <Text className="font-semibold text-4xl">Welcome to Appname!</Text>
        <View className="flex items-center">
          <Text className="text-xl text-neutral-600">
            A home for all groups in your life.
          </Text>
          <Text className="text-xl text-neutral-600">
            Share with anyone, anywhere.
          </Text>
        </View>
      </View>
      <View className="gap-4  w-full">
        <Button onPress={() => router.push("/sign-in")}>Sign In</Button>
        <Button onPress={() => router.push("/sign-up")} variant="secondary">
          Create a new Account
        </Button>
      </View>
    </Container>
  );
};

export default OnBoarding;
