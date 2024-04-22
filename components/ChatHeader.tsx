import { Image, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "./Text";
import useSupabaseQuery from "@/hooks/useSupabaseQuery";
import { supabase } from "@/lib/supabase";
import Icon from "./Icon";
import { ChatPageParams } from "@/app/chat/[id]";
import Avatar from "./Avatar";

const ChatHeader = ({ params }: { params: Omit<ChatPageParams, "id"> }) => {
  return (
    <View className="items-center gap-4 flex-row flex-1">
      <Avatar size={22} profile_pic={params.profile_pic} />
      <View>
        <Text className="text-xl font-medium">{params.fullname}</Text>
        <Text>See more info</Text>
      </View>
    </View>
  );
};

export default ChatHeader;
