import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { StackRouterOptions } from "@react-navigation/native";
import { AllRoutes, router } from "expo-router";

const Navigate = ({ initialRouteName }: { initialRouteName: AllRoutes }) => {
  if (!initialRouteName) return;
  useLayoutEffect(() => {
    router.push(initialRouteName);
  }, []);

  return null;
};

export default Navigate;
