export interface Meal {
  _id: string;
  name: string;
  poster_image: string;
  logo_image: string;
  deliveryFee: string;
  arrival: number;
  address: string | undefined;
  rating: string;
  category: string | undefined;
  isCategoryActive: boolean;
  foods: [];
  description: string;
  price: string;
  quantity: number;
  ratings_and_reviews: [] | undefined | null;
  restaurant: string;
  date: string | undefined | null;
  body: Meal[] | undefined | null;
}

export type MealResponse = {
  Meal: Meal[];
};

export interface User {
  name: string | undefined | null;
  role: 'admin' | 'user' | 'guest';
  email: string | null;
  password: string | null;
  address: string | undefined;
  users: [
    {
      _id: string;
      name: string | undefined;
      address: string | undefined;
      favouritesRestaurants?: [{ _id: string }];
      orders?: [
        {
          restaurantId?: string;
          foods?: Meal[];
          id?: string;
          totalPrice: number;
        },
      ];
    },
  ];
}

export interface UserResponse {
  email: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PaymenyIntent {
  totalPrice: number;
  clientSecret?: string;
}

export interface AuthState {
  email: string | null;
  token: string | null;
  role: 'admin' | 'user' | 'guest' | null;
}
