import { KeyboardAvoidingView, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import ChatHeader from "@/components/ChatHeader";
import Text from "@/components/Text";
import MessageInput from "@/components/MessageInput";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={120}
      >
        <View className="flex-1 ">
          <Text>Messages</Text>
        </View>
        <MessageInput />
      </KeyboardAvoidingView>
      <SafeAreaView edges={["bottom"]} />
    </>
  );
};

export default ChatPage;
