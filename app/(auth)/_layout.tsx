import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0000FF",
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "log-in-sharp" : "log-in-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          headerTitle: "Register",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person-add-sharp" : "person-add-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}