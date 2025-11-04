import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { auth, db } from "../src/services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      // Create user profile in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please sign in instead.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters long.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        setError("Sign up failed. Please try again.");
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        autoFocus={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20,
    backgroundColor: "#0046FF"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#fff"
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: "#fdf2f2",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f5c6cb"
  },
  input: {
    borderWidth: 1,
    borderColor: "#001BB7",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  button: {
    backgroundColor: "#FF8040",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  buttonText: { 
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "bold",
    fontSize: 16
  },
  link: { 
    color: "#fff", 
    textAlign: "center", 
    marginTop: 15,
    fontSize: 14,
    fontWeight: "500"
  },
});
