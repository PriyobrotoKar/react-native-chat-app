import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomDrawer from "./BottomDrawer";
import Text from "./Text";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import { Database, Tables } from "@/lib/database.types";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import useSupabaseQuery from "@/hooks/useSupabaseQuery";
import ChatItem from "./ChatItem";

const NewChat = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { session } = useAuth();
  if (!session) {
    return;
  }
  const { data: users } = useSupabaseQuery(
    supabase
      .from("profiles")
      .select(
        "*, requestedBy:connections!public_connections_connected_by_fkey(status)"
      )
      .eq("requestedBy.connected_to", session.user.id)
      .neq("fullname", session.user.user_metadata.name),
    true
  );

  if (!users) {
    return;
  }

  return (
    <>
      <BottomDrawer ref={bottomSheetRef}>
        <Text className="text-2xl font-semibold text-center">
          Find New People
        </Text>
        <View>
          {users.map((user) => {
            return (
              <ChatItem
                key={user.id}
                connectionStatus={
                  user.requestedBy.length
                    ? user.requestedBy[0].status!
                    : "ACCEPTED"
                }
                onPress={() => {
                  bottomSheetRef.current?.dismiss();
                  router.push({
                    pathname: `/chat/${user.id}`,
                    params: {
                      fullname: user.fullname!,
                      profile_pic: user.profile_pic!,
                      connectionStatus: user.requestedBy[0].status || "",
                    },
                  });
                }}
                user={user}
              />
            );
          })}
        </View>
      </BottomDrawer>
      <Button variant="ghost" onPress={() => bottomSheetRef.current?.present()}>
        <Icon name="plus" size={28} />
      </Button>
    </>
  );
};

export default NewChat;
