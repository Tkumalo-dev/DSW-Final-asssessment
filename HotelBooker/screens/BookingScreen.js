import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingScreen({ route, navigation }) {
  const { hotel } = route.params;

  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)); 
  const [rooms, setRooms] = useState(1);

  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  const handleConfirmBooking = () => {
    if (checkOut <= checkIn) {
      Alert.alert('Error', 'Check-out date must be after check-in date');
      return;
    }

    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalCost = days * hotel.price * rooms;

   
    Alert.alert(
      'Booking Confirmed',
      `You booked ${rooms} room(s) at ${hotel.name} for ${days} night(s). Total: $${totalCost}`,
      [{ text: 'OK', onPress: () => navigation.navigate('Explore') }]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Book {hotel.name}</Text>

      <Text style={styles.label}>Check-In Date</Text>
      <TouchableOpacity onPress={() => setShowCheckIn(true)} style={styles.dateButton}>
        <Text>{checkIn.toDateString()}</Text>
      </TouchableOpacity>
      {showCheckIn && (
        <DateTimePicker
          value={checkIn}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          minimumDate={new Date()}
          onChange={(event, date) => {
            setShowCheckIn(Platform.OS === 'ios');
            if (date) setCheckIn(date);
          }}
        />
      )}

      <Text style={styles.label}>Check-Out Date</Text>
      <TouchableOpacity onPress={() => setShowCheckOut(true)} style={styles.dateButton}>
        <Text>{checkOut.toDateString()}</Text>
      </TouchableOpacity>
      {showCheckOut && (
        <DateTimePicker
          value={checkOut}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          minimumDate={new Date(checkIn.getTime() + 24 * 60 * 60 * 1000)}
          onChange={(event, date) => {
            setShowCheckOut(Platform.OS === 'ios');
            if (date) setCheckOut(date);
          }}
        />
      )}

      <Text style={styles.label}>Number of Rooms</Text>
      <View style={styles.roomsContainer}>
        <TouchableOpacity
          style={styles.roomButton}
          onPress={() => setRooms(Math.max(1, rooms - 1))}
        >
          <Text style={styles.roomButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.roomCount}>{rooms}</Text>
        <TouchableOpacity style={styles.roomButton} onPress={() => setRooms(rooms + 1)}>
          <Text style={styles.roomButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleConfirmBooking}>
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#0046FF' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center',
    color: '#fff'
  },
  label: { 
    fontSize: 16, 
    marginTop: 20, 
    marginBottom: 8,
    fontWeight: '600',
    color: '#fff'
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#001BB7',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  roomsContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  roomButton: {
    backgroundColor: '#FF8040',
    padding: 12,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center'
  },
  roomButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  roomCount: { 
    marginHorizontal: 30, 
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  bookButton: {
    backgroundColor: '#FF8040',
    padding: 18,
    borderRadius: 12,
    marginTop: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  bookButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});
