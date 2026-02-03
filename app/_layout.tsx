import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <>
    <StatusBar style="dark" />
    
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ title: "Oops!", headerStyle: { backgroundColor: "#25292e" }, headerTintColor: "#fff" }} />
        

    </Stack>
    </>
  );
}
