import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ScrollView } from 'react-native';
import { updateProfile, signOut } from 'firebase/auth';
import { auth, db } from '../src/services/firebase';

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || '');
  const [editing, setEditing] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;


    setBookings([]);
  }, [user]);

  const handleSaveName = async () => {
    if (!name.trim()) return Alert.alert('Error', 'Name cannot be empty');
    
    try {
      await updateProfile(user, { displayName: name });
    
      setEditing(false);
      Alert.alert('Success', 'Name updated successfully');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to update name');
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .catch((error) => Alert.alert('Error', error.message));
  };

  const renderBooking = ({ item }) => (
    <View style={styles.bookingCard}>
      <Text style={styles.bookingHotel}>{item.hotelName}</Text>
      <Text>{item.checkIn} → {item.checkOut}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text style={styles.label}>Name</Text>
      {editing ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      ) : (
        <Text style={styles.value}>{name}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{user?.email}</Text>

      {editing ? (
        <TouchableOpacity style={styles.button} onPress={handleSaveName}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
          <Text style={styles.buttonText}>Edit Name</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionTitle}>My Bookings</Text>
      {bookings.length === 0 ? (
        <Text>You have no bookings yet.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderBooking}
          scrollEnabled={false}
        />
      )}

      <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c', marginTop: 30 }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0046FF' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#fff' },
  value: { fontSize: 16, marginBottom: 10, color: '#fff' },
  input: { borderWidth: 1, borderColor: '#001BB7', borderRadius: 12, padding: 15, marginBottom: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#FF8040', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 30, marginBottom: 10, color: '#fff' },
  bookingCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  bookingHotel: { fontWeight: 'bold', fontSize: 16, color: '#000' },
});
