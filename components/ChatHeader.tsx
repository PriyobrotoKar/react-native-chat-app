import { Image, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "./Text";
import useSupabaseQuery from "@/hooks/useSupabaseQuery";
import { supabase } from "@/lib/supabase";
import Icon from "./Icon";

const ChatHeader = ({ id }: { id: string }) => {
  const { data } = useSupabaseQuery(
    supabase.from("profiles").select().eq("id", id).single()
  );

  if (!data) {
    return;
  }
  return (
    <View className=" flex-1">
      <View className=" items-center gap-4 flex-row">
        <Image
          source={{ uri: data.profile_pic || "" }}
          alt="Profile"
          width={45}
          height={45}
          className="rounded-full"
        />
        <View>
          <Text className="text-xl font-medium">{data.fullname}</Text>
          <Text>See more info</Text>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
