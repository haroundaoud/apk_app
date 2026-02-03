import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase/firebaseConfig";


/*  Define navigation routes */
type RootStackParamList = {
  login: undefined;
  register: undefined;
  home: undefined;
  "(tabs)": undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "login"
>;

export default function LoginScreen() {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async (): Promise<void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // SAVE credentials for biometric login
    await SecureStore.setItemAsync("email", email);
    await SecureStore.setItemAsync("password", password);

    const user = userCredential.user;

    const docSnap = await getDoc(doc(db, "users", user.uid));

    const name = docSnap.exists() ? docSnap.data().name : "User";

    Alert.alert("Welcome", `Welcome back, ${name}!`);
    navigation.navigate("(tabs)");
  } catch (error: any) {
    Alert.alert("Login error", error.message);
  }
};

// fingerprint login function (not used currently)
const handleBiometricLogin = async (): Promise<void> => {
  try {
    //  Check biometric availability
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Error", "Fingerprint not available");
      return;
    }

    //  Fingerprint auth
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with fingerprint",
    });

    if (!result.success) return;

    //  Get saved credentials
    const savedEmail = await SecureStore.getItemAsync("email");
    const savedPassword = await SecureStore.getItemAsync("password");

    if (!savedEmail || !savedPassword) {
      Alert.alert("Error", "No saved credentials found");
      return;
    }

    //  Firebase login
    const userCredential = await signInWithEmailAndPassword(
      auth,
      savedEmail,
      savedPassword
    );

    const user = userCredential.user;

    const docSnap = await getDoc(doc(db, "users", user.uid));
    const name = docSnap.exists() ? docSnap.data().name : "User";

    Alert.alert("Welcome", `Welcome back, ${name}!`);
    navigation.navigate("(tabs)");
  } catch (error: any) {
    Alert.alert("Login error", error.message);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={[styles.button, { backgroundColor: "#444", marginTop: 10 }]}
  onPress={handleBiometricLogin}
>
  <Text style={styles.buttonText}>🔐 Login with Fingerprint</Text>
</TouchableOpacity>


  
    </View>
  );
}

/* 🔹 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#007bff",
  },
});
