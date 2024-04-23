import ChatItem from "@/components/ChatItem";
import Container from "@/components/Container";

import Header from "@/components/Header";
import Text from "@/components/Text";
import useSupabaseQuery from "@/hooks/useSupabaseQuery";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Tabs, router } from "expo-router";
import React from "react";
import { View } from "react-native";

const Index = () => {
  const { session, loading } = useAuth();

  if (!session) {
    return;
  }

  const { data } = useSupabaseQuery(
    supabase
      .from("connections")
      .select(
        "*,messages(*,from:profiles!public_messages_sent_by_fkey(*),to:profiles!public_messages_sent_to_fkey(*))"
      )
      .or(
        `and(connected_to.eq.${session.user.id},status.eq.ACCEPTED),and(connected_by.eq.${session.user.id},status.in.(ACCEPTED,BLOCKED,PENDING))`
      )
  );

  return (
    <>
      <Tabs.Screen options={{ header: () => <Header /> }} />
      <Container>
        <View className="mt-2">
          {data?.map((chat) => {
            if (!chat.messages || !chat.messages.from || !chat.messages.to) {
              return;
            }
            const user =
              chat.messages.from.id === session.user.id
                ? chat.messages.to
                : chat.messages.from;
            return (
              <ChatItem
                user={user}
                key={chat.id}
                connectionStatus={"ACCEPTED"}
                lastMessage={chat.messages!}
              />
            );
          })}
        </View>
      </Container>
    </>
  );
};

export default Index;
