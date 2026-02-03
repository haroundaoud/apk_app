import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { auth } from "../firebase/firebaseConfig";

export default function LogoutScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <Button title="Log Out" onPress={handleLogout} color="#ff5c5c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
  },
}); 