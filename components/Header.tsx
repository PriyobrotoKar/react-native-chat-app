import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";
import Container from "./Container";
import Icon from "./Icon";
import Text from "./Text";
import useSupabaseQuery from "@/hooks/useSupabaseQuery";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";

const Header = () => {
  const { session } = useAuth();
  const { data } = useSupabaseQuery(
    supabase.from("connections").select().eq("connected_to", session!.user.id)
  );
  if (!data) {
    return;
  }
  return (
    <View className="bg-white dark:bg-black">
      <SafeAreaView edges={["top"]} />
      <Container className="h-auto flex-row justify-between items-center">
        <Text className="text-2xl font-medium ">ChatApp</Text>
        <View className="flex-row gap-4">
          <Button variant="ghost" className="w-fit  px-3 py-2 ">
            <Icon name="search" size={20} />
          </Button>
          <View className="  relative">
            <Button
              variant="ghost"
              className="w-fit  px-3 py-2 "
              style={{ position: "relative" }}
              onPress={() => router.push("/requests")}
            >
              <Icon name="person-add" size={20} />
            </Button>
            {data.length !== 0 && (
              <View className="bg-red-500 dark:bg-red-700 absolute bottom-0 right-0 rounded-full justify-center items-center size-5">
                <Text className="text-sm leading-[1.2] text-white">
                  {data.length}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Header;
