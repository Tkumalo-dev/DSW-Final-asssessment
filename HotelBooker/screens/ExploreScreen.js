import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';


import hotel1 from '../assets/hotel1.jpeg';
import hotel2 from '../assets/hotel2.jpeg';
import hotel3 from '../assets/hotel3.jpeg';

const hotels = [
  {
    id: '1',
    name: 'Ocean View Resort',
    location: 'Cape Town',
    rating: 4.5,
    price: 1200,
    image: hotel1,
  },
  {
    id: '2',
    name: 'Mountain Lodge',
    location: 'Drakensberg',
    rating: 4.2,
    price: 900,
    image: hotel2,
  },
  {
    id: '3',
    name: 'City Center Hotel',
    location: 'Johannesburg',
    rating: 4.0,
    price: 750,
    image: hotel3,
  },
];

export default function ExploreScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HotelDetails', { hotel: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.price}>R{item.price} / night</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#0046FF' },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: { width: '100%', height: 180 },
  info: { padding: 15 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  location: { fontSize: 14, color: '#001BB7' },
  rating: { fontSize: 14, color: '#FF8040', marginTop: 5 },
  price: { fontSize: 16, fontWeight: 'bold', marginTop: 5, color: '#000' },
});
