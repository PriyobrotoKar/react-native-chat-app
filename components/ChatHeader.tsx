import { Image, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "./Text";
import useSupabaseQuery from "@/hooks/useSupabaseQuery";
import { supabase } from "@/lib/supabase";
import Icon from "./Icon";
import { ChatPageParams } from "@/app/chat/[id]";

const ChatHeader = ({ params }: { params: Omit<ChatPageParams, "id"> }) => {
  return (
    <View className=" flex-1">
      <View className=" items-center gap-4 flex-row">
        {params.profile_pic ? (
          <Image
            source={{ uri: params.profile_pic }}
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
          <Text className="text-xl font-medium">{params.fullname}</Text>
          <Text>See more info</Text>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
