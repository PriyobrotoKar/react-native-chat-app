import { TextInput, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Icon from "./Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Tables } from "@/lib/database.types";

const MessageInput = ({
  userId,
  messages,
  setMessages,
}: {
  userId: string;
  messages: Tables<"messages">[];
  setMessages: Dispatch<SetStateAction<Tables<"messages">[]>>;
}) => {
  const { session } = useAuth();
  const [input, setInput] = useState("");

  const handleMessageSubmit = async () => {
    console.log("Message Submitted", input);
    if (!session) {
      return;
    }

    const { data, error } = await supabase
      .from("messages")
      .insert({
        message: input,
        sent_by: session.user.id,
        sent_to: userId,
      })
      .select();

    setMessages((prev) => [...prev, data![0]]);
    setInput("");
    console.log(data![0].id);

    if (!messages.length) {
      console.log("Create connection");
      await supabase.from("connections").insert({
        connected_to: userId,
        connected_by: session.user.id,
        status: "PENDING",
        last_message: data![0].id,
      });
    }
  };

  return (
    <View className="p-4 flex-row gap-4 items-center">
      <TextInput
        className="bg-neutral-200 dark:bg-neutral-800 dark:text-white text-black flex-1 placeholder:text-neutral-400 p-4 rounded-full"
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
