import React, { ReactNode } from "react";
import { Text as NativeText, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

const Text = ({
  children,
  className,
  ...props
}: TextProps & { children: ReactNode }) => {
  return (
    <NativeText className={twMerge("text-black dark:text-white ", className)}>
      {children}
    </NativeText>
  );
};

export default Text;
