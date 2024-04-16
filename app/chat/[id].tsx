import { KeyboardAvoidingView, View } from "react-native";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import ChatHeader from "@/components/ChatHeader";
import Text from "@/components/Text";
import MessageInput from "@/components/MessageInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Tables } from "@/lib/database.types";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import useSupabaseQuery from "@/hooks/useSupabaseQuery";

let date: string | null = null;

const DateHeader = ({ message }: { message: Tables<"messages"> }) => {
  const messageCreatedAt = new Date(message.created_at).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      weekday: "short",
      month: "short",
    }
  );

  if (date === messageCreatedAt) {
    return;
  }
  date = messageCreatedAt;

  return (
    <View className="self-center  my-4 rounded-xl">
      <Text>{date}</Text>
    </View>
  );
};

export type ChatPageParams = {
  id: string;
  fullname: string;
  profile_pic: string;
};

const ChatPage = () => {
  const { id, ...params } = useLocalSearchParams<ChatPageParams>();

  const { session } = useAuth();
  if (!session) {
    return;
  }

  const { data: messages, setData } = useSupabaseQuery(
    supabase
      .from("messages")
      .select()
      .or(`sent_by.eq.${id},sent_by.eq.${session.user.id}`)
      .or(`sent_to.eq.${id},sent_to.eq.${session.user.id}`)
  );

  if (!messages) {
    return;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: () => <ChatHeader params={params} />,
        }}
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={120}
      >
        <View className="flex-1 p-4 gap-2">
          {messages.map((message) => {
            const isSentByCurrentUser = message.sent_by === session?.user.id;

            return (
              <Fragment key={message.id}>
                <DateHeader message={message} />
                <View
                  className={twMerge(
                    clsx(
                      " py-2 gap-4 px-4 bg-neutral-700 flex-row items-end  rounded-xl self-start ",
                      {
                        "self-end bg-yellow-400": isSentByCurrentUser,
                      }
                    )
                  )}
                >
                  <Text
                    className={clsx("text-lg", {
                      "text-black dark:text-black": isSentByCurrentUser,
                    })}
                  >
                    {message.message}
                  </Text>

                  <Text
                    className={clsx(
                      "text-right text-sm dark:text-neutral-400 ",
                      {
                        "dark:text-neutral-600": isSentByCurrentUser,
                      }
                    )}
                  >
                    {new Date(message.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </Fragment>
            );
          })}
        </View>
        <MessageInput userId={id} />
      </KeyboardAvoidingView>
      <SafeAreaView edges={["bottom"]} />
    </>
  );
};

export default ChatPage;
