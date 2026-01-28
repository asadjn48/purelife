// Type Definitions for Pure Life Pharmacy

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  image: string;
  stock: number;
  prescription: boolean;
  rating: number;
  reviews: number;
  dosage?: string;
  manufacturer?: string;
  expiryDate?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  address?: Address;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  emirate: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  phoneNumber: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderStatus {
  status: string;
  timestamp: Date;
  note?: string;
}
