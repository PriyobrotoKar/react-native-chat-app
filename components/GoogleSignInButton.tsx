import { supabase } from "@/lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import Button from "./Button";

const GoogleSignInButton = () => {
  GoogleSignin.configure({
    scopes: [],
    webClientId:
      "502107474829-rg8neo052ntd7b7a44ca6se885rnb3qm.apps.googleusercontent.com",
    iosClientId:
      "502107474829-erhtajlcg30b4qbrl3kqslj8cudptoii.apps.googleusercontent.com",
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Button onPress={handleGoogleSignIn} variant="secondary">
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
