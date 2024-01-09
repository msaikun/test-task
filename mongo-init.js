db = db.getSiblingDB('mydatabase');

db.ads.insertMany([
  {
    id: '1',
    name: 'Luxury Car',
    formattedAddress: 'ehiue iuuie1',
    description: 'Brand new luxury car for sale',
    price: 100000,
    rating: 5,
    location: { lat: 40.7128, lng: -74.0060 },
    photos: ['https://example.com/car1.jpg', 'https://example.com/car2.jpg'],
  },
  {
    id: '2',
    name: 'Modern Apartment',
    formattedAddress: 'ehiue iuuie2',
    description: 'Spacious apartment with a beautiful view',
    price: 1500,
    rating: 4.5,
    location: { lat: 34.0522, lng: -118.2437 },
    photos: ['https://example.com/apartment1.jpg', 'https://example.com/apartment2.jpg'],
  },
  {
    id: '3',
    name: 'Mountain Bike',
    formattedAddress: 'ehiue iuuie3',
    description: 'High-performance mountain bike',
    price: 800,
    rating: 2,
    location: { lat: 39.5501, lng: -105.7821 },
    photos: ['https://example.com/bike1.jpg', 'https://example.com/bike2.jpg'],
  },
  {
    id: '4',
    name: 'Cozy Coffee Shop',
    formattedAddress: 'ehiue iuuie4',
    description: 'Quaint coffee shop in the heart of the city',
    price: 20,
    rating: 1.2,
    location: { lat: 51.5074, lng: -0.1278 },
    photos: ['https://example.com/coffee1.jpg', 'https://example.com/coffee2.jpg'],
  },
]);