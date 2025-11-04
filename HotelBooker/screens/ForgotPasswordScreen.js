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
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../src/services/firebase";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async () => {
    setError("");
    setSuccess("");
    
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent! Check your inbox.");
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError("No account found with this email address.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Forgot Password</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoFocus={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.link}>Back to Sign In</Text>
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
  successText: {
    color: "#27ae60",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: "#f0fff4",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c3e6cb"
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
