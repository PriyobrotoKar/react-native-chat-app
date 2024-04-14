import { TextInput, View } from "react-native";
import React, { useState } from "react";
import Icon from "./Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

const MessageInput = () => {
  const [input, setInput] = useState("");

  const handleMessageSubmit = async () => {
    console.log("Message Submitted", input);
  };

  return (
    <View className="px-4 flex-row gap-4 items-center">
      <TextInput
        className="bg-neutral-800 dark:text-white text-black flex-1 placeholder:text-neutral-400 p-4 rounded-full"
        placeholder="Type your message..."
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <TouchableOpacity onPress={handleMessageSubmit}>
        <Icon name="paper-airplane" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
