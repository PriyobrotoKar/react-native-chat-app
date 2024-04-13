import Icon from "@/components/Icon";
import Loader from "@/components/Loader";
import Navigate from "@/components/Navigate";
import NewChat from "@/components/NewChat";
import { useAuth } from "@/providers/AuthProvider";

import { Redirect, Tabs, router } from "expo-router";
import React, { useEffect, useLayoutEffect } from "react";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!session && !loading) {
    return <Navigate initialRouteName={"/onboarding"} />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
            borderColor: "transparent",
          },
        }}
        sceneContainerStyle={{ backgroundColor: "black" }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: () => <Icon name="home" size={28} />,
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            tabBarIcon: () => <NewChat />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: () => <Icon name="person" size={28} />,
          }}
        />
      </Tabs>
    </>
  );
}
