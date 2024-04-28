import ChatItem from "@/components/ChatItem";
import Container from "@/components/Container";

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Text from "@/components/Text";
import useSupabaseQuery from "@/hooks/useSupabaseQuery";
import { Tables } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const Index = () => {
  const { session } = useAuth();

  if (!session) {
    return;
  }

  const { data, setData, loading } = useSupabaseQuery(
    supabase
      .from("connections")
      .select(
        "*,messages(*,from:profiles!public_messages_sent_by_fkey(*),to:profiles!public_messages_sent_to_fkey(*))"
      )
      .or(
        `and(connected_to.eq.${session.user.id},status.eq.ACCEPTED),and(connected_by.eq.${session.user.id},status.in.(ACCEPTED,BLOCKED,PENDING))`
      )
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    supabase
      .channel(session.user.id)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sent_to=eq.${session.user.id}`,
        },
        (payload: Record<string, any>) => {
          console.log(payload);
          const updatedChats = data?.map((chat) => {
            if (
              (chat.connected_by === payload.new.sent_by &&
                chat.connected_to === session.user.id) ||
              (chat.connected_to === payload.new.sent_by &&
                chat.connected_by === session.user.id)
            ) {
              return {
                ...chat,
                messages: {
                  ...payload.new,
                  to: chat.messages?.to,
                  from: chat.messages?.from,
                },
              };
            }
            return chat;
          });
          console.log(updatedChats);
          updatedChats && setData(updatedChats);
        }
      )
      .subscribe();

    return () => {
      supabase.channel(session.user.id).unsubscribe();
    };
  }, [data]);

  if (loading && !data) {
    return <Loader />;
  }

  return (
    <>
      <Tabs.Screen options={{ header: () => <Header /> }} />
      <Container>
        <View className="mt-2">
          {data!.map((chat) => {
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
