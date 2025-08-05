export interface Meal {
  quantity: number;
  _id: string;
  name: string;
  poster_image: string;
  logo_image: string;
  deliveryFee: string;
  arrival: number;
  address: string | undefined;
  rating: string;
  category: string | undefined;
  foods: string[];
  ratings_and_reviews: [] | undefined | null;
  admin: string;
}

export interface Food {
  _id: string;
  name: string;
  price: string;
  description: string;
  poster_image: string;
  quantity: number;
  restaurant: string;
}

export interface Review {
  ratings_and_reviews: [
    {
      _id: string;
      description: string;
      date: string;
      name: string;
      rating: string;
      restaurant: string;
    },
  ];
}

export interface User {
  name: string | undefined | null;
  role: 'admin' | 'user' | 'guest';
  email: string | null;
  password: string | null;
  address: string | undefined;
  favouritesRestaurants?: [{ _id: string }];
  orders?: [
    {
      foods: Meal[];
      timeStamp: number;
      totalPrice: number;
      _id: string;
    },
  ];
  _id: string;
}

export interface UserResponse {
  email: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PaymentIntent {
  totalPrice: number;
  clientSecret?: string;
}

export interface AuthState {
  email: string | null;
  token: string | null;
  role: 'admin' | 'user' | 'guest' | null;
  address: string | null;
  favorites: Meal[] | null;
  orders: Meal[] | null;
}

export interface ListData {
  categories?: [{ _id: string; name: string }];
  restaurants?: Meal[];
  foods?: Food[];
}
