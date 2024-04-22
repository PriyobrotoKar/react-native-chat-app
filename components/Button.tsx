import { cva } from "cva";
import React, { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { twMerge } from "tailwind-merge";
import Text from "./Text";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const Button = ({ children, variant, icon, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.6}
      className={twMerge(buttonVariants({ variant }), props.className)}
    >
      {icon && <View className="absolute left-4">{icon}</View>}
      <Text
        className={
          "font-medium text-lg " +
          (variant === "primary" || !variant ? "dark:text-black" : "")
        }
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const buttonVariants = cva(
  "w-full  relative  p-4 rounded-full items-center justify-center  gap-4 ",
  {
    variants: {
      variant: {
        primary: "bg-yellow-400 dark:bg-yellow-500",
        secondary: "border border-neutral-400",
        ghost: "",
        danger: "border border-red-500 bg-red-500/20",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export default Button;
