export type OrderStatus = "pending" | "shipped" | "delivered" | "canceled";

export interface Order {
  id: string;
  customer: string;
  status: OrderStatus;
  total: number;
  date: string;
  items: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  sales: number;
}

export interface SalesData {
  date: string;
  amount: number;
}

// Mock Orders
export const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Smith",
    status: "delivered",
    total: 124.99,
    date: "2023-07-01",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Emily Johnson",
    status: "shipped",
    total: 89.95,
    date: "2023-07-02",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    status: "pending",
    total: 74.5,
    date: "2023-07-03",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Sarah Davis",
    status: "delivered",
    total: 149.99,
    date: "2023-07-04",
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Robert Wilson",
    status: "canceled",
    total: 59.99,
    date: "2023-07-05",
    items: 1,
  },
  {
    id: "ORD-006",
    customer: "Jennifer Lee",
    status: "pending",
    total: 199.95,
    date: "2023-07-06",
    items: 3,
  },
  {
    id: "ORD-007",
    customer: "David Clark",
    status: "shipped",
    total: 129.99,
    date: "2023-07-07",
    items: 2,
  },
  {
    id: "ORD-008",
    customer: "Linda Martinez",
    status: "delivered",
    total: 84.5,
    date: "2023-07-08",
    items: 1,
  },
];

// Mock Products
export const products: Product[] = [
  {
    id: "PRD-001",
    name: "Premium Dog Food",
    price: 49.99,
    stock: 25,
    image: "/assets/images/bg.jpg",
    category: "Food",
    sales: 120,
  },
  {
    id: "PRD-002",
    name: "Dog Collar - Large",
    price: 19.99,
    stock: 15,
    image: "/assets/images/bg.jpg",
    category: "Accessories",
    sales: 85,
  },
  {
    id: "PRD-003",
    name: "Plush Toy Bundle",
    price: 24.95,
    stock: 30,
    image: "/assets/images/bg.jpg",
    category: "Toys",
    sales: 95,
  },
  {
    id: "PRD-004",
    name: "Dog Shampoo",
    price: 14.99,
    stock: 8,
    image: "/assets/images/bg.jpg",
    category: "Grooming",
    sales: 65,
  },
  {
    id: "PRD-005",
    name: "Cozy Dog Bed",
    price: 59.99,
    stock: 12,
    image: "/assets/images/bg.jpg",
    category: "Bedding",
    sales: 45,
  },
  {
    id: "PRD-006",
    name: "Puppy Training Pads",
    price: 29.99,
    stock: 50,
    image: "/assets/images/bg.jpg",
    category: "Training",
    sales: 110,
  },
  {
    id: "PRD-007",
    name: "Dog Leash",
    price: 15.95,
    stock: 22,
    image: "/assets/images/bg.jpg",
    category: "Accessories",
    sales: 78,
  },
  {
    id: "PRD-008",
    name: "Dental Chew Treats",
    price: 12.99,
    stock: 35,
    image: "/assets/images/bg.jpg",
    category: "Food",
    sales: 135,
  },
];

// Mock Sales Data
export const salesData: SalesData[] = [
  { date: "Mon", amount: 1200 },
  { date: "Tue", amount: 1800 },
  { date: "Wed", amount: 1400 },
  { date: "Thu", amount: 2000 },
  { date: "Fri", amount: 2400 },
  { date: "Sat", amount: 1800 },
  { date: "Sun", amount: 1200 },
];

// Stats Data
export const statsData = {
  totalSales: 28450,
  totalOrders: 145,
  totalCustomers: 89,
  avgOrderValue: 196.21,
  salesGrowth: 24.5,
  ordersGrowth: 12.3,
  customersGrowth: 18.7,
  revenueGrowth: -5.2,
};
