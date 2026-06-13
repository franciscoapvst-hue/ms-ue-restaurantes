export interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  imageUrl: string;
  tags: string[];
  isOpen: boolean;
  location: {
    lat: number;
    lng: number;
    address: string;
    distance?: number; // km — se calcula al responder
  };
}

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    category: 'Hamburguesas',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: 2.5,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    tags: ['Hamburguesas', 'Papas', 'Bebidas'],
    isOpen: true,
    location: { lat: -12.0464, lng: -77.0428, address: 'Av. Larco 123, Miraflores' },
  },
  {
    id: '2',
    name: 'Pizza Roma',
    category: 'Pizza',
    rating: 4.6,
    deliveryTime: '30-45 min',
    deliveryFee: 0,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    tags: ['Pizza', 'Pasta', 'Italiana'],
    isOpen: true,
    location: { lat: -12.0510, lng: -77.0450, address: 'Calle Berlin 456, Miraflores' },
  },
  {
    id: '3',
    name: 'Sushi Zen',
    category: 'Sushi',
    rating: 4.9,
    deliveryTime: '35-50 min',
    deliveryFee: 3.0,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    tags: ['Sushi', 'Japonesa', 'Rolls'],
    isOpen: true,
    location: { lat: -12.0550, lng: -77.0380, address: 'Av. Pardo 789, Miraflores' },
  },
  {
    id: '4',
    name: 'Tacos El Rey',
    category: 'Mexicana',
    rating: 4.5,
    deliveryTime: '15-25 min',
    deliveryFee: 1.5,
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    tags: ['Tacos', 'Burritos', 'Mexicana'],
    isOpen: false,
    location: { lat: -12.0490, lng: -77.0410, address: 'Jr. Schell 321, Miraflores' },
  },
  {
    id: '5',
    name: 'Pollo Dorado',
    category: 'Pollo',
    rating: 4.3,
    deliveryTime: '20-35 min',
    deliveryFee: 2.0,
    imageUrl: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400',
    tags: ['Pollo', 'Frito', 'Combos'],
    isOpen: true,
    location: { lat: -12.0530, lng: -77.0460, address: 'Av. Benavides 654, Miraflores' },
  },
];
