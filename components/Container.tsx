import React, { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

const Container = ({
  children,
  className,
  ...props
}: ViewProps & { children: ReactNode }) => {
  return (
    <View
      className={twMerge(
        "w-full h-full px-4 bg-white dark:bg-black",
        className
      )}
    >
      {children}
    </View>
  );
};

export default Container;
