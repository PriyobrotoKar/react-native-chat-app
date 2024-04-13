import Button from "@/components/Button";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Text from "@/components/Text";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

const Profile = () => {
  const { session } = useAuth();

  const profilePicPath = session?.user.user_metadata.picture?.split("");
  profilePicPath?.splice(profilePicPath.indexOf("=") + 1, 3, "s150");
  const profilePicHighQuality = profilePicPath?.join("");
  return (
    <Container className="items-center gap-6 py-8">
      <Tabs.Screen
        options={{
          header: () => <Header />,
        }}
      />
      {profilePicHighQuality && (
        <View className="w-44">
          <Image
            source={{ uri: profilePicHighQuality }}
            width={150}
            height={150}
            className="w-full rounded-full"
          />
        </View>
      )}
      <View className="items-center">
        <Text className="text-2xl font-medium">
          {session?.user.user_metadata.name}
        </Text>
        <Text className=" ">{session?.user.user_metadata.email}</Text>
      </View>
      <Button
        onPress={() => {
          supabase.auth.signOut();
        }}
        variant="secondary"
      >
        Logout
      </Button>
    </Container>
  );
};

export default Profile;
