import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomDrawer from "./BottomDrawer";
import Text from "./Text";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Image, View } from "react-native";
import { Database, Tables } from "@/lib/database.types";
import { useAuth } from "@/providers/AuthProvider";

const NewChat = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [users, setUsers] = useState<Tables<"profiles">[]>([]);
  const { session } = useAuth();
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .neq("fullname", session?.user.user_metadata.name);
      console.log(data);
      if (!data) {
        return;
      }
      setUsers(data);
    })();
  }, []);

  return (
    <>
      <BottomDrawer ref={bottomSheetRef}>
        <Text className="text-2xl font-semibold text-center">
          Find New People
        </Text>
        <View>
          {users.map((user) => {
            return (
              <View key={user.id} className="flex-row gap-4 items-center">
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
              </View>
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
