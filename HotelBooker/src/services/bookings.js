import { ref, push } from 'firebase/database';
import { db, auth } from './firebase';

export const addBooking = async (hotel, checkIn, checkOut, rooms) => {
  const user = auth.currentUser;
  if (!user) return;

  const totalDays = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  const totalCost = totalDays * hotel.price * rooms;

  const newBooking = {
    hotelId: hotel.id,
    hotelName: hotel.name,
    location: hotel.location,
    checkIn,
    checkOut,
    rooms,
    totalCost,
    timestamp: Date.now()
  };

  const bookingRef = ref(db, `users/${user.uid}/bookings`);
  await push(bookingRef, newBooking);
};
