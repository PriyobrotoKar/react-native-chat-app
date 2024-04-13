import { View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import ChatHeader from "@/components/ChatHeader";
import Text from "@/components/Text";

const ChatPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: () => <ChatHeader id={id} />,
        }}
      />
      <View>
        <Text>Messages</Text>
      </View>
    </>
  );
};

export default ChatPage;
