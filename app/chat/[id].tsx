import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import React, {
  Fragment,
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
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
import Loader from "@/components/Loader";
import Container from "@/components/Container";
import Button from "@/components/Button";

const DateHeader = ({
  message,
  dates,
}: {
  message: Tables<"messages">;
  dates: Set<string>;
}) => {
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    weekday: "short",
    month: "short",
  };
  const messageCreatedAt = new Date(message.created_at).toLocaleDateString(
    "en-IN",
    dateFormatOptions
  );

  if (dates.has(messageCreatedAt)) {
    return;
  }

  dates.add(messageCreatedAt);

  const today = new Date().toLocaleDateString("en-IN", dateFormatOptions);
  const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toLocaleDateString("en-IN", dateFormatOptions);

  let finalDate = messageCreatedAt;
  if (messageCreatedAt === today) {
    finalDate = "Today";
  } else if (messageCreatedAt === yesterday) {
    finalDate = "Yesterday";
  }

  return (
    <View className="self-center  my-4 rounded-xl">
      <Text>{finalDate}</Text>
    </View>
  );
};

export type ChatPageParams = {
  id: string;
  fullname: string;
  profile_pic: string;
  connectionStatus: Exclude<Tables<"connections">["status"], null>;
};

const ChatPage = () => {
  const { id, ...params } = useLocalSearchParams<ChatPageParams>();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const dateRef = useRef<string | null>(null);
  const date: string | null = null;
  const [messages, setMessages] = useState<Tables<"messages">[]>([]);
  const dates = new Set<string>();

  const { session } = useAuth();
  if (!session) {
    return;
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("messages")
        .select()
        .or(`sent_by.eq.${id},sent_by.eq.${session.user.id}`)
        .or(`sent_to.eq.${id},sent_to.eq.${session.user.id}`);

      if (!data) {
        return;
      }

      supabase
        .channel(`${id}_${session.user.id}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload: Record<string, any>) => {
            if (!messages.length && payload.new.sent_by !== session.user.id) {
              setMessages((prev) => [...prev, payload.new]);
            }
            // else if (payload.new.sent_by !== session.user.id) {
            //   setMessages((prev) => [...prev, payload.new]);
            // }
          }
        )
        .subscribe();

      setMessages(data);
    })();

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      scrollToEnd
    );

    return () => {
      keyboardDidShowListener.remove();
      supabase.channel(`${id}_${session.user.id}`).unsubscribe();
      dateRef.current = null;
    };
  }, []);

  const scrollToEnd = useCallback(() => {
    // if (scrollViewRef.current && messages && messages.length)
    setTimeout(
      () => scrollViewRef.current?.scrollToEnd({ animated: true }),
      50
    );
  }, [scrollViewRef]);

  useEffect(() => {
    scrollToEnd();
  }, [messages, scrollViewRef]);

  const handleAcceptRequest = async () => {
    const { error } = await supabase
      .from("connections")
      .update({
        status: "ACCEPTED",
      })
      .eq("connected_by", id)
      .eq("connected_to", session.user.id);

    if (!error) {
      router.setParams({ id, ...params, connectionStatus: "ACCEPTED" });
    }
  };

  if (!messages) {
    return (
      <>
        <Stack.Screen
          options={{
            headerBackTitleVisible: false,
            headerTitle: () => <ChatHeader params={params} />,
          }}
        />
        <Loader />
      </>
    );
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
        behavior={"padding"}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex flex-col py-4 gap-2"
          // onLayout={scrollToEnd}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            rowGap: 8,
            paddingHorizontal: 10,
            paddingBottom: 20,
          }}
        >
          {messages.map((message) => {
            const isSentByCurrentUser = message.sent_by === session?.user.id;

            return (
              <Fragment key={message.id}>
                <DateHeader message={message} dates={dates} />
                <View
                  className={twMerge(
                    clsx(
                      " py-2 gap-4 px-4 bg-neutral-200 dark:bg-neutral-700 flex-row items-end  rounded-xl self-start ",
                      {
                        "self-end bg-yellow-400 dark:bg-yellow-400":
                          isSentByCurrentUser,
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
        </ScrollView>
        {params.connectionStatus === "PENDING" ? (
          <Container className="h-auto py-6 gap-6 border-t border-neutral-200 dark:border-neutral-700 ">
            <Text className="text-center text-xl mx-auto w-[18rem]">
              Accept message request from{" "}
              <Text className="font-bold">{params.fullname}</Text>?
            </Text>
            <View className="flex-row gap-4">
              <Button className="flex-1 p-2 rounded-xl" variant="danger">
                Block
              </Button>
              <Button className="flex-1 p-2 rounded-xl" variant="danger">
                Delete
              </Button>
              <Button
                onPress={handleAcceptRequest}
                className="flex-1 p-2 rounded-xl"
                variant="primary"
              >
                Accept
              </Button>
            </View>
          </Container>
        ) : (
          <MessageInput
            userId={id}
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </KeyboardAvoidingView>
      <SafeAreaView edges={["bottom"]} />
    </>
  );
};

export default ChatPage;
