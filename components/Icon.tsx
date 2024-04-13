import { Octicons } from "@expo/vector-icons";
import React from "react";
import { useColorScheme } from "react-native";

const Icon = ({ className, ...props }: any) => {
  const colorScheme = useColorScheme();
  return (
    <Octicons {...props} color={colorScheme === "dark" ? "white" : "black"} />
  );
};

export default Icon;
