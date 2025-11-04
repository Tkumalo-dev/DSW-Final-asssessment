import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";


import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import ForgotPasswordScreen from "../../screens/ForgotPasswordScreen";
import ExploreScreen from "../../screens/ExploreScreen";
import HotelDetailsScreen from "../../screens/HotelDetailScreen";
import BookingScreen from "../../screens/BookingScreen";
import ProfileScreen from "../../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const bookingsRef = ref(db, `users/${currentUser.uid}/bookings`);
        onValue(bookingsRef, (snapshot) => {
          const data = snapshot.val() || {};
          setBookingCount(Object.keys(data).length);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // HeaderRight component with badge
  const ProfileIcon = ({ navigation }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      style={{ marginRight: 15 }}
    >
      <Ionicons name="person-circle-outline" size={28} color="#000" />
      {bookingCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{bookingCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen
              name="Explore"
              component={ExploreScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: 'Explore Hotels',
                headerRight: () => <ProfileIcon navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="HotelDetails"
              component={HotelDetailsScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: 'Hotel Details',
                headerRight: () => <ProfileIcon navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Booking"
              component={BookingScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: 'Book Hotel',
                headerRight: () => <ProfileIcon navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: true, title: 'Profile' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
