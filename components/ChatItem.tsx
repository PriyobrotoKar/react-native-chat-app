import { View, PressableProps, Pressable, Image } from "react-native";
import React from "react";
import { Tables } from "@/lib/database.types";
import Text from "./Text";
import Icon from "./Icon";
import { router } from "expo-router";
import Avatar from "./Avatar";

const ChatItem = ({
  user,
  lastMessage,
  connectionStatus,
  ...props
}: {
  user: Tables<"profiles">;
  connectionStatus?: Exclude<Tables<"connections">["status"], null>;
  lastMessage?: Tables<"messages">;
} & PressableProps) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: `/chat/${user.id}`,
          params: {
            fullname: user.fullname!,
            profile_pic: user.profile_pic!,
            connectionStatus: connectionStatus!,
          },
        });
      }}
      {...props}
      className="flex-row justify-between items-center active:bg-neutral-100 dark:active:bg-neutral-800 p-2 rounded-xl"
    >
      <View className="flex-row gap-4 items-center h-14">
        <Avatar profile_pic={user.profile_pic} size={24} />
        <View>
          <Text className="text-xl font-medium">{user.fullname}</Text>
          <Text className=" ">{lastMessage?.message || user.email}</Text>
        </View>
      </View>
      {lastMessage && (
        <View>
          <Text>
            {new Date(lastMessage.created_at).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default ChatItem;
