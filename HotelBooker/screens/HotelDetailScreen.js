import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList, Modal, TextInput } from 'react-native';

export default function HotelDetailsScreen({ route, navigation }) {
  const { hotel } = route.params;

  const getHotelImage = (hotelId) => {
    const images = {
      1: require('../assets/hotel1.jpeg'),
      2: require('../assets/hotel2.jpeg'),
      3: require('../assets/hotel3.jpeg'),
    };
    return images[hotelId] || images[1];
  };

  const [reviews, setReviews] = useState([
    { id: '1', user: 'Alice', rating: 5, text: 'Amazing stay! Highly recommend.' },
    { id: '2', user: 'Bob', rating: 4, text: 'Comfortable and clean.' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleAddReview = () => {
    if (!newReviewText) return;

    const newReview = {
      id: Date.now().toString(),
      user: 'You',
      rating: newReviewRating,
      text: newReviewText,
    };

    setReviews([newReview, ...reviews]);
    setNewReviewText('');
    setNewReviewRating(5);
    setModalVisible(false);
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewUser}>{item.user}</Text>
      <Text style={styles.reviewRating}>⭐ {item.rating}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={hotel.id ? getHotelImage(hotel.id) : { uri: hotel.image }} 
        style={styles.image} 
      />
      <View style={styles.info}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.location}>{hotel.location}</Text>
        <Text style={styles.rating}>⭐ {hotel.rating}</Text>
        <Text style={styles.price}>R{hotel.price} / night</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Booking', { hotel })}
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>


        <Text style={styles.sectionTitle}>Reviews</Text>
        {reviews.length === 0 ? (
          <Text>No reviews yet. Be the first to review!</Text>
        ) : (
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={renderReview}
            scrollEnabled={false} // So FlatList doesn’t scroll inside ScrollView
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Review</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Your Review</Text>
              <TextInput
                style={styles.input}
                placeholder="Write your review..."
                multiline
                value={newReviewText}
                onChangeText={setNewReviewText}
              />
              <Text style={{ marginTop: 10 }}>Rating:</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setNewReviewRating(star)}>
                    <Text style={{ fontSize: 24, color: star <= newReviewRating ? '#f1c40f' : '#ccc' }}>★</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleAddReview}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
                <Text style={{ color: 'red', textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0046FF' 
  },
  image: { 
    width: '100%', 
    height: 300,
    resizeMode: 'cover'
  },
  info: { 
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  name: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8
  },
  location: { 
    fontSize: 16, 
    color: '#001BB7', 
    marginBottom: 8
  },
  rating: { 
    fontSize: 18, 
    color: '#FF8040', 
    marginBottom: 12,
    fontWeight: '600'
  },
  price: { 
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#FF8040',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },


  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 30, marginBottom: 10 },
  addButton: {
    backgroundColor: '#FF8040',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  reviewCard: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  reviewUser: { fontWeight: 'bold' },
  reviewRating: { color: '#f1c40f' },


  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
  },
  ratingContainer: { flexDirection: 'row', marginTop: 5 },
  submitButton: {
    backgroundColor: '#FF8040',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
});
