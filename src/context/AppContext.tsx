import { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  time: string;
  available: boolean;
  orders: number;
}

export interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  time: string;
  type: 'delivery' | 'pickup' | 'dine-in';
  createdAt: number;
  address?: string;
  phone?: string;
}

export interface Reservation {
  id: number;
  name: string;
  guests: number;
  time: string;
  date: string;
  table: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  phone: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  orders: number;
  spent: number;
  points: number;
  tier: 'طلایی' | 'نقره‌ای' | 'برنزی';
  joinedAt: string;
}

export interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  expiresAt: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'order' | 'reservation' | 'system' | 'customer';
  read: boolean;
  createdAt: number;
}

interface AppState {
  menuItems: MenuItem[];
  orders: Order[];
  reservations: Reservation[];
  customers: Customer[];
  coupons: Coupon[];
  notifications: Notification[];
  restaurantInfo: {
    name: string;
    type: string;
    rating: number;
    reviews: number;
    deliveryTime: string;
    address: string;
    phone: string;
    isOpen: boolean;
  };
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: Omit<MenuItem, 'id' | 'orders'>) => void;
  updateMenuItem: (id: number, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: number) => void;
  toggleMenuItemAvailability: (id: number) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addReservation: (res: Omit<Reservation, 'id'>) => void;
  updateReservation: (id: number, updates: Partial<Reservation>) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (id: number, updates: Partial<Coupon>) => void;
  markNotificationRead: (id: number) => void;
  clearNotifications: () => void;
  updateRestaurantInfo: (info: Partial<AppState['restaurantInfo']>) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const initialMenu: MenuItem[] = [
  { id: 1, name: 'چلوکباب کوبیده', desc: 'دو سیخ کباب کوبیده گوسفندی با برنج زعفرانی، گوجه کبابی و کره', price: 285000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'غذای اصلی', popular: true, time: '25 دقیقه', available: true, orders: 156 },
  { id: 2, name: 'جوجه‌کباب زعفرانی', desc: 'سینه مرغ مزه‌دار شده با زعفران و لیمو، سرو شده با برنج', price: 265000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'غذای اصلی', popular: true, time: '20 دقیقه', available: true, orders: 134 },
  { id: 3, name: 'قورمه‌سبزی', desc: 'خورشت قورمه‌سبزی با گوشت گوسفندی، لوبیا قرمز و سبزیجات معطر', price: 195000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'غذای اصلی', popular: false, time: '15 دقیقه', available: true, orders: 89 },
  { id: 4, name: 'ماست و خیار', desc: 'ماست محلی با خیار تازه، نعنا و کشمش', price: 45000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'پیش‌غذا', popular: false, time: '5 دقیقه', available: true, orders: 67 },
  { id: 5, name: 'دوغ محلی', desc: 'دوغ سنتی با نعنا و پونه کوهی', price: 25000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'نوشیدنی', popular: false, time: '2 دقیقه', available: true, orders: 45 },
  { id: 6, name: 'باقلوای خانگی', desc: 'باقلوای خانگی با مغز پسته و بادام، شهد زعفرانی', price: 85000, image: 'https://image.qwenlm.ai/generated-images/7cb017fc-dbea-4836-ada0-e94414f8a930/_result.png', category: 'دسر', popular: true, time: '5 دقیقه', available: true, orders: 78 },
  { id: 7, name: 'سالاد فصل', desc: 'کاهو، خیار، گوجه، ذرت و سس مخصوص شف', price: 65000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'پیش‌غذا', popular: false, time: '8 دقیقه', available: true, orders: 52 },
  { id: 8, name: 'شربت به‌لیمو', desc: 'شربت خنک به‌لیمو با یخ و نعنا تازه', price: 35000, image: 'https://image.qwenlm.ai/generated-images/48e98453-6a83-46c1-abab-3354cfa62cf8/_result.png', category: 'نوشیدنی', popular: false, time: '3 دقیقه', available: true, orders: 34 },
];

const initialOrders: Order[] = [
  { id: '#۱۲۳۴', customer: 'علی احمدی', items: 'چلوکباب، دوغ', total: 310000, status: 'preparing', time: '۵ دقیقه پیش', type: 'delivery', createdAt: Date.now() - 300000, address: 'تهران، ونک، خیابان گاندی', phone: '۰۹۱۲۳۴۵۶۷۸۹' },
  { id: '#۱۲۳۳', customer: 'مریم رضایی', items: 'قورمه‌سبزی، سالاد', total: 260000, status: 'confirmed', time: '۸ دقیقه پیش', type: 'pickup', createdAt: Date.now() - 480000, phone: '۰۹۱۲۱۱۱۲۲۲۳' },
  { id: '#۱۲۳۲', customer: 'حسین کریمی', items: 'جوجه‌کباب، نوشابه', total: 290000, status: 'ready', time: '۱۲ دقیقه پیش', type: 'delivery', createdAt: Date.now() - 720000, address: 'تهران، سعادت‌آباد', phone: '۰۹۱۲۴۴۴۵۵۵۶' },
  { id: '#۱۲۳۱', customer: 'زهرا محمدی', items: 'باقلوا، چای', total: 110000, status: 'delivered', time: '۲۵ دقیقه پیش', type: 'dine-in', createdAt: Date.now() - 1500000 },
  { id: '#۱۲۳۰', customer: 'رضا نوری', items: 'کباب کوبیده، ماست', total: 330000, status: 'delivered', time: '۴۰ دقیقه پیش', type: 'delivery', createdAt: Date.now() - 2400000, address: 'تهران، تجریش', phone: '۰۹۱۲۷۷۷۸۸۸۹' },
  { id: '#۱۲۲۹', customer: 'فاطمه حسینی', items: 'جوجه‌کباب، سالاد، دوغ', total: 375000, status: 'delivered', time: '۱ ساعت پیش', type: 'delivery', createdAt: Date.now() - 3600000 },
];

const initialReservations: Reservation[] = [
  { id: 1, name: 'خانواده احمدی', guests: 4, time: '۲۰:۰۰', date: 'امشب', table: 'A-3', status: 'confirmed', phone: '۰۹۱۲۱۲۳۴۵۶۷' },
  { id: 2, name: 'آقای رضایی', guests: 2, time: '۲۱:۰۰', date: 'امشب', table: 'B-1', status: 'confirmed', phone: '۰۹۱۲۲۳۴۵۶۷۸' },
  { id: 3, name: 'خانواده کریمی', guests: 6, time: '۱۹:۳۰', date: 'امشب', table: 'VIP-1', status: 'pending', phone: '۰۹۱۲۳۴۵۶۷۸۹' },
  { id: 4, name: 'آقای محمدی', guests: 3, time: '۲۰:۳۰', date: 'فردا', table: 'A-5', status: 'confirmed', phone: '۰۹۱۲۴۵۶۷۸۹۰' },
];

const initialCustomers: Customer[] = [
  { id: 1, name: 'علی احمدی', phone: '۰۹۱۲۳۴۵۶۷۸۹', orders: 45, spent: 12500000, points: 1250, tier: 'طلایی', joinedAt: '۱۴۰۲/۰۶/۱۵' },
  { id: 2, name: 'مریم رضایی', phone: '۰۹۱۲۱۱۱۲۲۲۳', orders: 38, spent: 9800000, points: 980, tier: 'طلایی', joinedAt: '۱۴۰۲/۰۷/۲۰' },
  { id: 3, name: 'حسین کریمی', phone: '۰۹۱۲۴۴۴۵۵۵۶', orders: 28, spent: 7200000, points: 720, tier: 'نقره‌ای', joinedAt: '۱۴۰۲/۰۸/۱۰' },
  { id: 4, name: 'زهرا محمدی', phone: '۰۹۱۲۵۵۵۶۶۶۷', orders: 22, spent: 5600000, points: 560, tier: 'نقره‌ای', joinedAt: '۱۴۰۲/۰۹/۰۵' },
  { id: 5, name: 'رضا نوری', phone: '۰۹۱۲۷۷۷۸۸۸۹', orders: 15, spent: 3800000, points: 380, tier: 'برنزی', joinedAt: '۱۴۰۲/۱۰/۱۲' },
];

const initialCoupons: Coupon[] = [
  { id: 1, code: 'WELCOME20', discount: 20, type: 'percent', expiresAt: '۱۴۰۳/۱۲/۲۹', usageLimit: 100, usedCount: 45, active: true },
  { id: 2, code: 'SUMMER50', discount: 50000, type: 'fixed', expiresAt: '۱۴۰۳/۰۶/۳۱', usageLimit: 50, usedCount: 23, active: true },
  { id: 3, code: 'VIP30', discount: 30, type: 'percent', expiresAt: '۱۴۰۳/۱۲/۲۹', usageLimit: 30, usedCount: 12, active: true },
];

const initialNotifications: Notification[] = [
  { id: 1, title: 'سفارش جدید', message: 'سفارش #۱۲۳۴ از علی احمدی ثبت شد', type: 'order', read: false, createdAt: Date.now() - 300000 },
  { id: 2, title: 'رزرو جدید', message: 'رزرو میز از خانواده کریمی برای ۶ نفر', type: 'reservation', read: false, createdAt: Date.now() - 600000 },
  { id: 3, title: 'مشتری جدید', message: 'رضا نوری به باشگاه مشتریان پیوست', type: 'customer', read: true, createdAt: Date.now() - 3600000 },
  { id: 4, title: 'بروزرسانی سیستم', message: 'نسخه جدید سیستم با موفقیت نصب شد', type: 'system', read: true, createdAt: Date.now() - 86400000 },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'رستوران سنتی اصفهان',
    type: 'ایرانی',
    rating: 4.8,
    reviews: 324,
    deliveryTime: '30-45',
    address: 'اصفهان، خیابان چهارباغ، کوچه گلستان، پلاک ۱۲',
    phone: '۰۳۱-۳۲۲۵۶۷۸۹',
    isOpen: true,
  });

  const addMenuItem = (item: Omit<MenuItem, 'id' | 'orders'>) => {
    const newItem: MenuItem = { ...item, id: Date.now(), orders: 0 };
    setMenuItems(prev => [...prev, newItem]);
    setNotifications(prev => [{ id: Date.now(), title: 'آیتم جدید', message: `${item.name} به منو اضافه شد`, type: 'system', read: false, createdAt: Date.now() }, ...prev]);
  };

  const updateMenuItem = (id: number, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleMenuItemAvailability = (id: number) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, available: !item.available } : item));
  };

  const addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = { ...order, id: `#${Math.floor(Math.random() * 9000) + 1000}`, createdAt: Date.now() };
    setOrders(prev => [newOrder, ...prev]);
    setNotifications(prev => [{ id: Date.now(), title: 'سفارش جدید', message: `سفارش ${newOrder.id} از ${order.customer} ثبت شد`, type: 'order', read: false, createdAt: Date.now() }, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addReservation = (res: Omit<Reservation, 'id'>) => {
    const newRes: Reservation = { ...res, id: Date.now() };
    setReservations(prev => [...prev, newRes]);
    setNotifications(prev => [{ id: Date.now(), title: 'رزرو جدید', message: `رزرو میز از ${res.name} برای ${res.guests} نفر`, type: 'reservation', read: false, createdAt: Date.now() }, ...prev]);
  };

  const updateReservation = (id: number, updates: Partial<Reservation>) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const addCoupon = (coupon: Omit<Coupon, 'id'>) => {
    setCoupons(prev => [...prev, { ...coupon, id: Date.now() }]);
  };

  const updateCoupon = (id: number, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const markNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const updateRestaurantInfo = (info: Partial<AppState['restaurantInfo']>) => {
    setRestaurantInfo(prev => ({ ...prev, ...info }));
  };

  return (
    <AppContext.Provider value={{
      menuItems, orders, reservations, customers, coupons, notifications, restaurantInfo,
      setMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, toggleMenuItemAvailability,
      addOrder, updateOrderStatus,
      addReservation, updateReservation,
      addCoupon, updateCoupon,
      markNotificationRead, clearNotifications,
      updateRestaurantInfo,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
