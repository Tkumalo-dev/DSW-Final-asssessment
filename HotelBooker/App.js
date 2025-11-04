import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import './src/services/firebase';
import { auth, db } from './src/services/firebase';



export default function App() {
  return (
 <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
