import { View, PressableProps, Pressable, Image } from "react-native";
import React from "react";
import { Tables } from "@/lib/database.types";
import Text from "./Text";
import Icon from "./Icon";

const ChatItem = ({
  user,
  lastMessage,
  ...props
}: {
  user: Tables<"profiles">;
  lastMessage?: Tables<"messages">;
} & PressableProps) => {
  return (
    <Pressable
      {...props}
      className="flex-row justify-between items-center active:bg-neutral-100 dark:active:bg-neutral-800 p-2 rounded-xl"
    >
      <View className="flex-row gap-4 items-center">
        {user.profile_pic ? (
          <Image
            source={{ uri: user.profile_pic }}
            alt="profile"
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <View className="dark:bg-neutral-700 size-14 items-center justify-center rounded-full">
            <Icon name="person" size={24} />
          </View>
        )}
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
