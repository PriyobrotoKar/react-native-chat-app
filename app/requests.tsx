import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import useSupabaseQuery from "@/hooks/useSupabaseQuery";
import { supabase } from "@/lib/supabase";
import ChatItem from "@/components/ChatItem";
import Loader from "@/components/Loader";
import Container from "@/components/Container";

const requests = () => {
  const { session } = useAuth();
  const { data } = useSupabaseQuery(
    supabase
      .from("connections")
      .select(
        "*,messages(*,from:profiles!public_messages_sent_by_fkey(*),to:profiles!public_messages_sent_to_fkey(*))"
      )
      .eq("connected_to", session!.user.id)
      .eq("status", "PENDING")
  );

  if (!data) {
    return (
      <>
        <Stack.Screen
          options={{
            headerBackTitleVisible: false,
            headerTitle: "Message Requests",
          }}
        />
        <Loader />
      </>
    );
  }

  return (
    <Container>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: "Message Requests",
        }}
      />
      {data?.map((chat) => {
        if (!chat.messages || !chat.messages.from || !chat.messages.to) {
          return;
        }
        return (
          <ChatItem
            user={chat.messages.from}
            key={chat.id}
            lastMessage={chat.messages}
            connectionStatus={chat.status!}
          />
        );
      })}
    </Container>
  );
};

export default requests;
