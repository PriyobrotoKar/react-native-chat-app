import Container from "@/components/Container";
import Header from "@/components/Header";
import Text from "@/components/Text";
import { useAuth } from "@/providers/AuthProvider";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const Index = () => {
  const { session, loading } = useAuth();

  return (
    <>
      <Tabs.Screen options={{ header: () => <Header /> }} />
      <Container>
        <View>
          <Text>React Native Chat App</Text>
        </View>
      </Container>
    </>
  );
};

export default Index;
