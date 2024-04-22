import { View, Image } from "react-native";
import React from "react";
import Icon from "./Icon";
import Text from "./Text";
import { Tables } from "@/lib/database.types";

const Avatar = ({
  profile_pic,
  size,
}: {
  profile_pic: string | null;
  size: number;
}) => {
  return (
    <View>
      {profile_pic ? (
        <Image
          source={{ uri: profile_pic }}
          alt="profile"
          width={size * 2}
          height={size * 2}
          className="rounded-full"
        />
      ) : (
        <View
          style={{ width: size * 2, height: size * 2 }}
          className="bg-neutral-200 dark:bg-neutral-700 items-center justify-center rounded-full"
        >
          <Icon name="person" size={size} />
        </View>
      )}
    </View>
  );
};

export default Avatar;
