import { Tabs } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
import Header from "./Header";

const Loader = () => {
  return (
    <>
      <Tabs.Screen options={{ header: () => <Header /> }} />
      <ActivityIndicator className="bg-white dark:bg-black h-full" />
    </>
  );
};

export default Loader;
