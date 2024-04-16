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

const NewChat = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { session } = useAuth();
  const { data: users } = useSupabaseQuery(
    supabase
      .from("profiles")
      .select()
      .neq("fullname", session?.user.user_metadata.name)
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
              <Pressable
                key={user.id}
                onPress={() => {
                  bottomSheetRef.current?.dismiss();
                  router.push({
                    pathname: `/chat/${user.id}`,
                    params: {
                      fullname: user.fullname!,
                      profile_pic: user.profile_pic!,
                    },
                  });
                }}
                className="flex-row gap-4 items-center active:bg-neutral-100 dark:active:bg-neutral-800 p-2"
              >
                {user.profile_pic && (
                  <Image
                    source={{ uri: user.profile_pic }}
                    alt="profile"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <View>
                  <Text className="text-xl font-medium">{user.fullname}</Text>
                  <Text className=" ">{user.email}</Text>
                </View>
              </Pressable>
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
