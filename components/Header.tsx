import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";
import Container from "./Container";
import Icon from "./Icon";
import Text from "./Text";

const Header = () => {
  return (
    <View className="bg-white dark:bg-black">
      <SafeAreaView edges={["top"]} />
      <Container className="h-auto flex-row justify-between items-center">
        <Text className="text-2xl font-medium ">ChatApp</Text>
        <Button variant="ghost" className="w-fit  px-3 py-2 ">
          <Icon name="search" size={20} />
        </Button>
      </Container>
    </View>
  );
};

export default Header;
