import { AppView } from '../App';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Carousel, CarouselItem } from '../components/Carousel';
import {
  BarChart3, ShoppingBag, Users, ChefHat, Calendar, Truck,
  CreditCard, Settings, Bell, Search, Plus, Edit, Trash2,
  TrendingUp, TrendingDown, Eye, Clock, Check, X, Menu,
  ArrowUpRight, ArrowDownRight, Filter, Download, Package,
  Star, MessageSquare, DollarSign, Layers, Tag, Gift,
  ChevronDown, AlertCircle, Sparkles, Target, Zap, Globe,
  Shield, Percent, Ticket, Send
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

interface AdminDashboardProps {
  navigate: (view: AppView) => void;
}

const salesData = [
  { name: 'شنبه', sales: 4200000, orders: 45 },
  { name: 'یکشنبه', sales: 3800000, orders: 38 },
  { name: 'دوشنبه', sales: 5100000, orders: 52 },
  { name: 'سه‌شنبه', sales: 4600000, orders: 47 },
  { name: 'چهارشنبه', sales: 6200000, orders: 63 },
  { name: 'پنج‌شنبه', sales: 7800000, orders: 78 },
  { name: 'جمعه', sales: 9500000, orders: 95 },
];

const hourlyData = [
  { hour: '۱۰', orders: 5 }, { hour: '۱۱', orders: 12 },
  { hour: '۱۲', orders: 28 }, { hour: '۱۳', orders: 35 },
  { hour: '۱۴', orders: 22 }, { hour: '۱۵', orders: 8 },
  { hour: '۱۶', orders: 5 }, { hour: '۱۷', orders: 10 },
  { hour: '۱۸', orders: 18 }, { hour: '۱۹', orders: 32 },
  { hour: '۲۰', orders: 42 }, { hour: '۲۱', orders: 38 },
  { hour: '۲۲', orders: 20 },
];

const categoryData = [
  { name: 'غذای اصلی', value: 45, color: '#e85d04' },
  { name: 'پیش‌غذا', value: 20, color: '#f48c06' },
  { name: 'نوشیدنی', value: 15, color: '#ffba08' },
  { name: 'دسر', value: 12, color: '#006d77' },
  { name: 'سالاد', value: 8, color: '#83c5be' },
];

const statusLabels: Record<string, string> = {
  pending: 'در انتظار',
  confirmed: 'تأیید شده',
  preparing: 'در حال آماده‌سازی',
  ready: 'آماده',
  delivering: 'در حال ارسال',
  delivered: 'تحویل شده',
  cancelled: 'لغو شده',
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  preparing: 'bg-orange-100 text-orange-700 border-orange-200',
  ready: 'bg-green-100 text-green-700 border-green-200',
  delivering: 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-gray-100 text-gray-700 border-gray-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export function AdminDashboard({ navigate }: AdminDashboardProps) {
  const {
    menuItems, orders, reservations, customers, coupons, notifications, restaurantInfo,
    addMenuItem, updateMenuItem, deleteMenuItem, toggleMenuItemAvailability,
    updateOrderStatus, addReservation, updateReservation,
    addCoupon, updateCoupon,
    markNotificationRead, clearNotifications, updateRestaurantInfo,
  } = useApp();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState<number | null>(null);
  const [showAddResModal, setShowAddResModal] = useState(false);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [menuCategoryFilter, setMenuCategoryFilter] = useState('all');

  // Form states
  const [newItem, setNewItem] = useState({ name: '', desc: '', price: 0, category: 'غذای اصلی', time: '15 دقیقه', image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', popular: false, available: true });
  const [newRes, setNewRes] = useState({ name: '', guests: 2, time: '20:00', date: 'امشب', table: 'A-1', status: 'pending' as const, phone: '' });
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: 0, type: 'percent' as const, expiresAt: '', usageLimit: 100, usedCount: 0, active: true });

  const menuItemsList = [
    { id: 'dashboard', icon: BarChart3, label: 'داشبورد', badge: null },
    { id: 'orders', icon: ShoppingBag, label: 'سفارش‌ها', badge: orders.filter(o => ['pending', 'confirmed', 'preparing'].includes(o.status)).length },
    { id: 'menu', icon: ChefHat, label: 'مدیریت منو', badge: null },
    { id: 'reservations', icon: Calendar, label: 'رزروها', badge: reservations.filter(r => r.status === 'pending').length },
    { id: 'delivery', icon: Truck, label: 'ارسال و پیک', badge: orders.filter(o => o.status === 'delivering').length },
    { id: 'customers', icon: Users, label: 'مشتریان', badge: null },
    { id: 'coupons', icon: Ticket, label: 'کد تخفیف', badge: null },
    { id: 'finance', icon: CreditCard, label: 'مالی', badge: null },
    { id: 'marketing', icon: Sparkles, label: 'بازاریابی', badge: null },
    { id: 'settings', icon: Settings, label: 'تنظیمات', badge: null },
  ];

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const activeOrders = orders.filter(o => ['pending', 'confirmed', 'preparing', 'ready', 'delivering'].includes(o.status));
  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter);
  const filteredMenuItems = menuCategoryFilter === 'all' ? menuItems : menuItems.filter(i => i.category === menuCategoryFilter);

  const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0);

  const handleAddMenuItem = () => {
    if (!newItem.name || !newItem.price) return;
    addMenuItem(newItem);
    setNewItem({ name: '', desc: '', price: 0, category: 'غذای اصلی', time: '15 دقیقه', image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', popular: false, available: true });
    setShowAddItemModal(false);
  };

  const handleAddReservation = () => {
    if (!newRes.name || !newRes.phone) return;
    addReservation(newRes);
    setNewRes({ name: '', guests: 2, time: '20:00', date: 'امشب', table: 'A-1', status: 'pending', phone: '' });
    setShowAddResModal(false);
  };

  const handleAddCoupon = () => {
    if (!newCoupon.code || !newCoupon.discount) return;
    addCoupon(newCoupon);
    setNewCoupon({ code: '', discount: 0, type: 'percent', expiresAt: '', usageLimit: 100, usedCount: 0, active: true });
    setShowAddCouponModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-40 w-72 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] shadow-2xl transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary-light to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-black text-white text-lg">سفرت</div>
                <div className="text-xs text-white/50">پنل مدیریت رستوران</div>
              </div>
            </div>
          </div>

          {/* Restaurant Status */}
          <div className="px-4 py-3 mx-4 mt-4 bg-gradient-to-l from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-xl">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${restaurantInfo.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className="text-sm text-white font-medium">{restaurantInfo.isOpen ? 'رستوران باز است' : 'رستوران بسته است'}</span>
            </div>
            <div className="text-xs text-white/50 mt-1">{restaurantInfo.name}</div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItemsList.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-l from-primary to-primary-dark text-white shadow-lg shadow-primary/30'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-right">{item.label}</span>
                {item.badge !== null && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeSection === item.id ? 'bg-white/20' : 'bg-primary/20 text-primary'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <button onClick={() => navigate('landing')} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all">
              <ArrowDownRight className="w-5 h-5" />
              بازگشت به سایت
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:mr-72 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-xl" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="جستجوی سفارش، مشتری، آیتم منو..." className="pr-10 pl-4 py-2.5 bg-gray-100/50 rounded-xl text-sm w-80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border border-transparent focus:border-primary/20" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowNotifPanel(!showNotifPanel)} className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">{unreadNotifs}</span>
                )}
              </button>
              <button onClick={() => setShowSettingsModal(true)} className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2 pr-2 mr-2 border-r border-gray-200">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">م</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-bold text-dark">مدیر سیستم</div>
                  <div className="text-xs text-gray-500">admin@sefart.ir</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Notifications Panel */}
        {showNotifPanel && (
          <div className="fixed top-16 left-4 lg:left-8 w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-l from-primary/5 to-transparent">
              <h3 className="font-bold text-dark">اعلان‌ها</h3>
              <div className="flex gap-2">
                <button onClick={clearNotifications} className="text-xs text-primary hover:underline">خواندن همه</button>
                <button onClick={() => setShowNotifPanel(false)}><X className="w-4 h-4 text-gray-400" /></button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[60vh]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">اعلانی وجود ندارد</div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        n.type === 'order' ? 'bg-orange-100' : n.type === 'reservation' ? 'bg-blue-100' : n.type === 'customer' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {n.type === 'order' && <ShoppingBag className="w-4 h-4 text-orange-600" />}
                        {n.type === 'reservation' && <Calendar className="w-4 h-4 text-blue-600" />}
                        {n.type === 'customer' && <Users className="w-4 h-4 text-green-600" />}
                        {n.type === 'system' && <Zap className="w-4 h-4 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{n.title}</span>
                          {!n.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 lg:p-8">
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome & Carousel */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Carousel height="h-56" autoPlay interval={4000}>
                    <CarouselItem image="https://image.qwenlm.ai/generated-images/01534e96-1a30-4399-896c-8e0fff37aae4/_result.png" overlay="gradient">
                      <div className="flex items-end justify-between w-full">
                        <div>
                          <div className="text-white/70 text-sm mb-1">خوش آمدید، مدیر عزیز</div>
                          <h2 className="text-white text-2xl font-black">امروز ۹۵ سفارش داشتید</h2>
                          <p className="text-white/80 text-sm mt-1">فروش امروز: ۹,۵۰۰,۰۰۰ تومان</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
                          <div className="text-white text-xs">نرخ رشد</div>
                          <div className="text-white font-black text-lg">+۱۸٪</div>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem image="https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png" overlay="gradient">
                      <div className="flex items-end justify-between w-full">
                        <div>
                          <div className="text-white/70 text-sm mb-1">پرفروش‌ترین آیتم</div>
                          <h2 className="text-white text-2xl font-black">چلوکباب کوبیده</h2>
                          <p className="text-white/80 text-sm mt-1">۱۵۶ سفارش این هفته</p>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem image="https://image.qwenlm.ai/generated-images/7cb017fc-dbea-4836-ada0-e94414f8a930/_result.png" overlay="gradient">
                      <div className="flex items-end justify-between w-full">
                        <div>
                          <div className="text-white/70 text-sm mb-1">رضایت مشتریان</div>
                          <h2 className="text-white text-2xl font-black">امتیاز ۴.۸ از ۵</h2>
                          <p className="text-white/80 text-sm mt-1">بر اساس ۳۲۴ نظر</p>
                        </div>
                      </div>
                    </CarouselItem>
                  </Carousel>
                </div>
                <div className="bg-gradient-to-br from-primary via-primary-dark to-[#9a3412] rounded-2xl p-6 text-white shadow-xl shadow-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <Sparkles className="w-8 h-8 text-white/80" />
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">امروز</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white/70 text-sm">درآمد کل</div>
                      <div className="text-2xl font-black">{totalRevenue.toLocaleString()}</div>
                      <div className="text-xs text-white/60">تومان</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-white/70 text-xs">سفارش فعال</div>
                        <div className="text-xl font-bold">{activeOrders.length}</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-white/70 text-xs">رزرو امروز</div>
                        <div className="text-xl font-bold">{reservations.filter(r => r.date === 'امشب').length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'فروش امروز', value: '۹,۵۰۰,۰۰۰', unit: 'تومان', change: '+۱۸٪', up: true, icon: DollarSign, gradient: 'from-green-500 to-emerald-600' },
                  { label: 'سفارش‌ها', value: '۹۵', unit: 'سفارش', change: '+۱۲٪', up: true, icon: ShoppingBag, gradient: 'from-blue-500 to-indigo-600' },
                  { label: 'مشتریان جدید', value: '۲۳', unit: 'نفر', change: '+۵٪', up: true, icon: Users, gradient: 'from-purple-500 to-pink-600' },
                  { label: 'میانگین سفارش', value: '۳۱۰,۰۰۰', unit: 'تومان', change: '-۳٪', up: false, icon: TrendingDown, gradient: 'from-orange-500 to-red-600' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.up ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                        {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-2xl font-black text-dark">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-dark text-lg">فروش هفتگی</h3>
                      <p className="text-xs text-gray-500 mt-1">مقایسه فروش ۷ روز اخیر</p>
                    </div>
                    <select className="text-xs bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:outline-none focus:border-primary">
                      <option>این هفته</option>
                      <option>هفته قبل</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#e85d04" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#e85d04" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="sales" stroke="#e85d04" fill="url(#salesGrad)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-dark text-lg">سفارش‌ها بر اساس ساعت</h3>
                      <p className="text-xs text-gray-500 mt-1">الگوی سفارش‌ها در طول روز</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#006d77" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* KDS & Category */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-dark mb-4">سهم دسته‌بندی‌ها</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                        {categoryData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {categoryData.map((cat, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                          <span className="text-gray-600">{cat.name}</span>
                        </div>
                        <span className="font-bold">{cat.value}٪</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-dark">نمایش آشپزخانه (KDS)</h3>
                    </div>
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">{activeOrders.length} فعال</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeOrders.slice(0, 4).map(order => (
                      <div key={order.id} className={`rounded-xl p-4 border-2 ${statusColors[order.status]} transition-all hover:shadow-md`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm">{order.id}</span>
                          <span className="text-xs opacity-70">{order.time}</span>
                        </div>
                        <div className="text-sm font-medium mb-1">{order.customer}</div>
                        <div className="text-xs opacity-70 mb-3">{order.items}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{statusLabels[order.status]}</span>
                          <button 
                            onClick={() => {
                              const nextStatus: Record<string, string> = { pending: 'confirmed', confirmed: 'preparing', preparing: 'ready', ready: 'delivering', delivering: 'delivered' };
                              if (nextStatus[order.status]) updateOrderStatus(order.id, nextStatus[order.status] as any);
                            }}
                            className="text-xs bg-white/80 px-2 py-1 rounded-lg font-medium hover:bg-white"
                          >
                            مرحله بعد
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-2xl font-black text-dark">مدیریت سفارش‌ها</h2>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-primary to-primary-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                  <Download className="w-4 h-4" />
                  خروجی اکسل
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { id: 'all', label: 'همه', count: orders.length },
                  { id: 'pending', label: 'در انتظار', count: orders.filter(o => o.status === 'pending').length },
                  { id: 'confirmed', label: 'تأیید شده', count: orders.filter(o => o.status === 'confirmed').length },
                  { id: 'preparing', label: 'در حال آماده‌سازی', count: orders.filter(o => o.status === 'preparing').length },
                  { id: 'ready', label: 'آماده', count: orders.filter(o => o.status === 'ready').length },
                  { id: 'delivering', label: 'در حال ارسال', count: orders.filter(o => o.status === 'delivering').length },
                  { id: 'delivered', label: 'تحویل شده', count: orders.filter(o => o.status === 'delivered').length },
                ].map(tab => (
                  <button 
                    key={tab.id} 
                    onClick={() => setOrderFilter(tab.id)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      orderFilter === tab.id 
                        ? 'bg-gradient-to-l from-primary to-primary-dark text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-primary'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Orders List */}
              <div className="space-y-3">
                {filteredOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusColors[order.status]} border`}>
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-dark">{order.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]} border`}>{statusLabels[order.status]}</span>
                            <span className="text-xs text-gray-400">{order.type === 'delivery' ? 'ارسال' : order.type === 'pickup' ? 'بیرون‌بر' : 'حضوری'}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{order.customer} • {order.items}</div>
                          <div className="text-xs text-gray-400 mt-1">{order.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-left">
                          <div className="font-black text-primary">{order.total.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">تومان</div>
                        </div>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="text-xs bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200 focus:outline-none focus:border-primary"
                        >
                          <option value="pending">در انتظار</option>
                          <option value="confirmed">تأیید شده</option>
                          <option value="preparing">در حال آماده‌سازی</option>
                          <option value="ready">آماده</option>
                          <option value="delivering">در حال ارسال</option>
                          <option value="delivered">تحویل شده</option>
                          <option value="cancelled">لغو شده</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'menu' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-2xl font-black text-dark">مدیریت منو</h2>
                <button onClick={() => setShowAddItemModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-primary to-primary-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                  <Plus className="w-4 h-4" />
                  افزودن آیتم جدید
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['all', 'غذای اصلی', 'پیش‌غذا', 'نوشیدنی', 'دسر'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setMenuCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      menuCategoryFilter === cat ? 'bg-gradient-to-l from-primary to-primary-dark text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary'
                    }`}
                  >
                    {cat === 'all' ? 'همه' : cat}
                  </button>
                ))}
              </div>

              {/* Menu Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredMenuItems.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all group">
                    <div className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-dark text-sm">{item.name}</h4>
                              {item.popular && <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded font-bold">پرفروش</span>}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">{item.category}</div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setShowEditItemModal(item.id)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4 text-gray-500" /></button>
                            <button onClick={() => deleteMenuItem(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-500" /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <div className="font-black text-primary">{item.price.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">تومان • {item.orders} سفارش</div>
                          </div>
                          <button 
                            onClick={() => toggleMenuItemAvailability(item.id)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${item.available ? 'bg-green-500' : 'bg-gray-300'}`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${item.available ? 'right-0.5' : 'right-6'}`}></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'reservations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-2xl font-black text-dark">مدیریت رزروها</h2>
                <button onClick={() => setShowAddResModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-primary to-primary-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20">
                  <Plus className="w-4 h-4" />
                  رزرو جدید
                </button>
              </div>

              {/* Floor Plan */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  پلان سالن
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {Array.from({ length: 12 }).map((_, idx) => {
                    const isReserved = reservations.some(r => r.table === (idx >= 10 ? `VIP-${idx - 9}` : `A-${idx + 1}`) && r.date === 'امشب');
                    const isVIP = idx >= 10;
                    return (
                      <div key={idx} className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-medium cursor-pointer transition-all hover:scale-105 ${
                        isReserved ? 'bg-red-100 text-red-700 border-2 border-red-300' : isVIP ? 'bg-gradient-to-br from-accent/20 to-amber-100 text-accent border-2 border-accent/30' : 'bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 border border-green-200'
                      }`}>
                        <span className="font-bold">{isVIP ? `VIP-${idx - 9}` : `A-${idx + 1}`}</span>
                        <span className="text-xs opacity-70">{isReserved ? 'رزرو' : 'آزاد'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reservations List */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-l from-primary/5 to-transparent">
                  <h3 className="font-bold text-dark">لیست رزروها</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {reservations.map(res => (
                    <div key={res.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${res.status === 'confirmed' ? 'bg-green-100' : res.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                        <Calendar className={`w-6 h-6 ${res.status === 'confirmed' ? 'text-green-600' : res.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{res.name}</div>
                        <div className="text-xs text-gray-500">{res.guests} نفر | میز {res.table} | {res.time} - {res.date}</div>
                      </div>
                      <select
                        value={res.status}
                        onChange={(e) => updateReservation(res.id, { status: e.target.value as any })}
                        className="text-xs bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200 focus:outline-none focus:border-primary"
                      >
                        <option value="pending">در انتظار</option>
                        <option value="confirmed">تأیید شده</option>
                        <option value="cancelled">لغو شده</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'customers' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-dark">مدیریت مشتریان و وفاداری</h2>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'کل مشتریان', value: customers.length.toString(), icon: Users, gradient: 'from-blue-500 to-indigo-600' },
                  { label: 'اعضای باشگاه', value: customers.filter(c => c.tier === 'طلایی').length.toString(), icon: Star, gradient: 'from-amber-500 to-orange-600' },
                  { label: 'میانگین خرید', value: '۷.۸M', icon: DollarSign, gradient: 'from-green-500 to-emerald-600' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-black text-dark">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-l from-primary/5 to-transparent">
                  <h3 className="font-bold text-dark">اعضای باشگاه مشتریان</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {customers.map(customer => (
                    <div key={customer.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${customer.tier === 'طلایی' ? 'bg-gradient-to-br from-amber-400 to-yellow-500' : customer.tier === 'نقره‌ای' ? 'bg-gradient-to-br from-gray-300 to-gray-400' : 'bg-gradient-to-br from-orange-300 to-orange-400'}`}>
                        <span className="text-white font-bold">{customer.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.phone} • {customer.orders} سفارش</div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold">{customer.points} امتیاز</div>
                        <div className={`text-xs font-bold ${customer.tier === 'طلایی' ? 'text-amber-600' : customer.tier === 'نقره‌ای' ? 'text-gray-500' : 'text-orange-500'}`}>{customer.tier}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'coupons' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-2xl font-black text-dark">مدیریت کد تخفیف</h2>
                <button onClick={() => setShowAddCouponModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-primary to-primary-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20">
                  <Plus className="w-4 h-4" />
                  کد تخفیف جدید
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map(coupon => (
                  <div key={coupon.id} className={`bg-white rounded-2xl p-5 border-2 ${coupon.active ? 'border-green-200' : 'border-gray-200 opacity-60'} hover:shadow-lg transition-all`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Ticket className={`w-5 h-5 ${coupon.active ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className="font-black text-lg">{coupon.code}</span>
                      </div>
                      <button 
                        onClick={() => updateCoupon(coupon.id, { active: !coupon.active })}
                        className={`relative w-10 h-5 rounded-full transition-colors ${coupon.active ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${coupon.active ? 'right-0.5' : 'right-5'}`}></div>
                      </button>
                    </div>
                    <div className="text-2xl font-black text-primary mb-2">
                      {coupon.type === 'percent' ? `${coupon.discount}٪` : `${coupon.discount.toLocaleString()} تومان`}
                    </div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>استفاده شده:</span>
                        <span className="font-bold">{coupon.usedCount} / {coupon.usageLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>انقضا:</span>
                        <span>{coupon.expiresAt}</span>
                      </div>
                    </div>
                    <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-l from-primary to-accent rounded-full" style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'delivery' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-dark">مدیریت ارسال و پیک</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'پیک‌های فعال', value: '۸', icon: Truck, gradient: 'from-blue-500 to-cyan-600' },
                  { label: 'سفارش در حال ارسال', value: orders.filter(o => o.status === 'delivering').length.toString(), icon: Package, gradient: 'from-purple-500 to-pink-600' },
                  { label: 'میانگین زمان تحویل', value: '۲۸ دقیقه', icon: Clock, gradient: 'from-green-500 to-emerald-600' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-black text-dark">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-l from-primary/5 to-transparent">
                  <h3 className="font-bold text-dark">سفارش‌های در حال ارسال</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {orders.filter(o => o.status === 'delivering').length === 0 ? (
                    <div className="p-8 text-center text-gray-500">سفارش در حال ارسال وجود ندارد</div>
                  ) : (
                    orders.filter(o => o.status === 'delivering').map(order => (
                      <div key={order.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Truck className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{order.customer}</div>
                          <div className="text-xs text-gray-500">{order.address || 'آدرس ثبت نشده'}</div>
                        </div>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-bold hover:bg-green-200"
                        >
                          تحویل شد
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'finance' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-dark">مدیریت مالی</h2>
              <Carousel height="h-48" autoPlay interval={5000}>
                <CarouselItem image="https://image.qwenlm.ai/generated-images/01534e96-1a30-4399-896c-8e0fff37aae4/_result.png" overlay="gradient">
                  <div>
                    <div className="text-white/70 text-sm">درآمد این ماه</div>
                    <div className="text-white text-3xl font-black">۱۸۵,۰۰۰,۰۰۰ تومان</div>
                  </div>
                </CarouselItem>
                <CarouselItem image="https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png" overlay="gradient">
                  <div>
                    <div className="text-white/70 text-sm">سود خالص</div>
                    <div className="text-white text-3xl font-black">۱۲۰,۰۰۰,۰۰۰ تومان</div>
                  </div>
                </CarouselItem>
              </Carousel>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="text-sm text-gray-500 mb-2">درآمد ماهانه</div>
                  <div className="text-2xl font-black text-green-600">۱۸۵,۰۰۰,۰۰۰</div>
                  <div className="text-xs text-gray-400">تومان</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="text-sm text-gray-500 mb-2">هزینه‌ها</div>
                  <div className="text-2xl font-black text-red-600">۶۵,۰۰۰,۰۰۰</div>
                  <div className="text-xs text-gray-400">تومان</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="text-sm text-gray-500 mb-2">سود خالص</div>
                  <div className="text-2xl font-black text-primary">۱۲۰,۰۰۰,۰۰۰</div>
                  <div className="text-xs text-gray-400">تومان</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-dark mb-4">تراکنش‌های اخیر</h3>
                <div className="space-y-3">
                  {orders.filter(o => o.status === 'delivered').slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{order.customer}</div>
                          <div className="text-xs text-gray-500">{order.id} • {order.time}</div>
                        </div>
                      </div>
                      <div className="font-bold text-green-600">+{order.total.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'marketing' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-dark">بازاریابی و محتوا</h2>
              <Carousel height="h-48" autoPlay>
                <CarouselItem image="https://image.qwenlm.ai/generated-images/48e98453-6a83-46c1-abab-3354cfa62cf8/_result.png" overlay="gradient">
                  <div>
                    <div className="text-white/70 text-sm">کمپین فعال</div>
                    <div className="text-white text-2xl font-black">تخفیف ویژه تابستانه</div>
                  </div>
                </CarouselItem>
                <CarouselItem image="https://image.qwenlm.ai/generated-images/a2cbbccf-7b36-400e-a171-d5ac31640bd6/_result.png" overlay="gradient">
                  <div>
                    <div className="text-white/70 text-sm">نرخ تبدیل</div>
                    <div className="text-white text-2xl font-black">۲۳٪ افزایش</div>
                  </div>
                </CarouselItem>
              </Carousel>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'بازدید سایت', value: '۱۲,۵۰۰', icon: Eye, gradient: 'from-blue-500 to-indigo-600' },
                  { label: 'نرخ تبدیل', value: '۸.۵٪', icon: Target, gradient: 'from-green-500 to-emerald-600' },
                  { label: 'مشترکین خبرنامه', value: '۲,۳۴۵', icon: Send, gradient: 'from-purple-500 to-pink-600' },
                  { label: 'کدهای فعال', value: coupons.filter(c => c.active).length.toString(), icon: Ticket, gradient: 'from-orange-500 to-red-600' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-black text-dark">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-dark">تنظیمات</h2>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  اطلاعات رستوران
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">نام رستوران</label>
                    <input 
                      type="text" 
                      value={restaurantInfo.name}
                      onChange={(e) => updateRestaurantInfo({ name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">نوع آشپزی</label>
                    <input 
                      type="text" 
                      value={restaurantInfo.type}
                      onChange={(e) => updateRestaurantInfo({ type: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">تلفن</label>
                    <input 
                      type="text" 
                      value={restaurantInfo.phone}
                      onChange={(e) => updateRestaurantInfo({ phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">زمان تحویل</label>
                    <input 
                      type="text" 
                      value={restaurantInfo.deliveryTime}
                      onChange={(e) => updateRestaurantInfo({ deliveryTime: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">آدرس</label>
                    <input 
                      type="text" 
                      value={restaurantInfo.address}
                      onChange={(e) => updateRestaurantInfo({ address: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">وضعیت رستوران</label>
                    <button 
                      onClick={() => updateRestaurantInfo({ isOpen: !restaurantInfo.isOpen })}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm ${restaurantInfo.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {restaurantInfo.isOpen ? 'باز' : 'بسته'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  امنیت و دسترسی
                </h3>
                <div className="space-y-3">
                  {['ورود دو مرحله‌ای', 'اعلان‌های ایمیلی', 'پشتیبان‌گیری خودکار', 'لاگ فعالیت‌ها'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium">{item}</span>
                      <button className="relative w-10 h-5 bg-green-500 rounded-full">
                        <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Menu Item Modal */}
      {showAddItemModal && (
        <Modal title="افزودن آیتم جدید به منو" onClose={() => setShowAddItemModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">نام غذا</label>
              <input type="text" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" placeholder="مثلاً: چلوکباب کوبیده" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">توضیحات</label>
              <textarea value={newItem.desc} onChange={(e) => setNewItem({...newItem, desc: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" rows={2} placeholder="توضیح مختصر..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">قیمت (تومان)</label>
                <input type="number" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: +e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">زمان آماده‌سازی</label>
                <input type="text" value={newItem.time} onChange={(e) => setNewItem({...newItem, time: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">دسته‌بندی</label>
              <select value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary">
                <option>غذای اصلی</option>
                <option>پیش‌غذا</option>
                <option>نوشیدنی</option>
                <option>دسر</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="popular" checked={newItem.popular} onChange={(e) => setNewItem({...newItem, popular: e.target.checked})} className="w-4 h-4 accent-primary" />
              <label htmlFor="popular" className="text-sm">علامت‌گذاری به عنوان پرفروش</label>
            </div>
            <button onClick={handleAddMenuItem} className="w-full py-3 bg-gradient-to-l from-primary to-primary-dark text-white font-bold rounded-xl">افزودن به منو</button>
          </div>
        </Modal>
      )}

      {/* Edit Menu Item Modal */}
      {showEditItemModal && (() => {
        const item = menuItems.find(i => i.id === showEditItemModal);
        if (!item) return null;
        return (
          <Modal title="ویرایش آیتم منو" onClose={() => setShowEditItemModal(null)}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">نام غذا</label>
                <input type="text" defaultValue={item.name} onChange={(e) => updateMenuItem(item.id, { name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">توضیحات</label>
                <textarea defaultValue={item.desc} onChange={(e) => updateMenuItem(item.id, { desc: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">قیمت</label>
                  <input type="number" defaultValue={item.price} onChange={(e) => updateMenuItem(item.id, { price: +e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">زمان آماده‌سازی</label>
                  <input type="text" defaultValue={item.time} onChange={(e) => updateMenuItem(item.id, { time: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="edit-popular" checked={item.popular} onChange={(e) => updateMenuItem(item.id, { popular: e.target.checked })} className="w-4 h-4 accent-primary" />
                <label htmlFor="edit-popular" className="text-sm">پرفروش</label>
              </div>
              <button onClick={() => setShowEditItemModal(null)} className="w-full py-3 bg-gradient-to-l from-primary to-primary-dark text-white font-bold rounded-xl">ذخیره تغییرات</button>
            </div>
          </Modal>
        );
      })()}

      {/* Add Reservation Modal */}
      {showAddResModal && (
        <Modal title="رزرو جدید" onClose={() => setShowAddResModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">نام مشتری</label>
              <input type="text" value={newRes.name} onChange={(e) => setNewRes({...newRes, name: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">شماره تماس</label>
              <input type="text" value={newRes.phone} onChange={(e) => setNewRes({...newRes, phone: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">تعداد نفرات</label>
                <input type="number" value={newRes.guests} onChange={(e) => setNewRes({...newRes, guests: +e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">ساعت</label>
                <input type="text" value={newRes.time} onChange={(e) => setNewRes({...newRes, time: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">تاریخ</label>
                <input type="text" value={newRes.date} onChange={(e) => setNewRes({...newRes, date: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">میز</label>
                <input type="text" value={newRes.table} onChange={(e) => setNewRes({...newRes, table: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <button onClick={handleAddReservation} className="w-full py-3 bg-gradient-to-l from-primary to-primary-dark text-white font-bold rounded-xl">ثبت رزرو</button>
          </div>
        </Modal>
      )}

      {/* Add Coupon Modal */}
      {showAddCouponModal && (
        <Modal title="کد تخفیف جدید" onClose={() => setShowAddCouponModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">کد تخفیف</label>
              <input type="text" value={newCoupon.code} onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">نوع تخفیف</label>
                <select value={newCoupon.type} onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value as any})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary">
                  <option value="percent">درصدی</option>
                  <option value="fixed">مبلغ ثابت</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">مقدار</label>
                <input type="number" value={newCoupon.discount} onChange={(e) => setNewCoupon({...newCoupon, discount: +e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">تاریخ انقضا</label>
                <input type="text" value={newCoupon.expiresAt} onChange={(e) => setNewCoupon({...newCoupon, expiresAt: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">محدودیت استفاده</label>
                <input type="number" value={newCoupon.usageLimit} onChange={(e) => setNewCoupon({...newCoupon, usageLimit: +e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <button onClick={handleAddCoupon} className="w-full py-3 bg-gradient-to-l from-primary to-primary-dark text-white font-bold rounded-xl">ایجاد کد تخفیف</button>
          </div>
        </Modal>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <Modal title="تنظیمات سریع" onClose={() => setShowSettingsModal(false)}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium">حالت تاریک</span>
              <button className="relative w-10 h-5 bg-gray-300 rounded-full">
                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium">اعلان‌های لحظه‌ای</span>
              <button className="relative w-10 h-5 bg-green-500 rounded-full">
                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium">صدای اعلان سفارش</span>
              <button className="relative w-10 h-5 bg-green-500 rounded-full">
                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
              </button>
            </div>
            <button onClick={() => navigate('landing')} className="w-full py-3 bg-red-100 text-red-700 font-bold rounded-xl">خروج از حساب</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Modal Component
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-l from-primary/5 to-transparent">
          <h3 className="text-lg font-black text-dark">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
