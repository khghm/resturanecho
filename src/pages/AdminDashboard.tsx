import { AppView } from '../App';
import { useState } from 'react';
import {
  BarChart3, ShoppingBag, Users, ChefHat, Calendar, Truck,
  CreditCard, Settings, Bell, Search, Plus, Edit, Trash2,
  TrendingUp, TrendingDown, Eye, Clock, Check, X, Menu,
  ArrowUpRight, ArrowDownRight, Filter, Download, MoreVertical,
  Package, Star, MessageSquare, DollarSign, Layers
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
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

const orders = [
  { id: '#۱۲۳۴', customer: 'علی احمدی', items: 'چلوکباب، دوغ', total: 310000, status: 'preparing', time: '۵ دقیقه پیش', type: 'delivery' },
  { id: '#۱۲۳۳', customer: 'مریم رضایی', items: 'قورمه‌سبزی، سالاد', total: 240000, status: 'confirmed', time: '۸ دقیقه پیش', type: 'pickup' },
  { id: '#۱۲۳۲', customer: 'حسین کریمی', items: 'جوجه‌کباب، نوشابه', total: 290000, status: 'ready', time: '۱۲ دقیقه پیش', type: 'delivery' },
  { id: '#۱۲۳۱', customer: 'زهرا محمدی', items: 'باقلوا، چای', total: 110000, status: 'delivered', time: '۲۵ دقیقه پیش', type: 'dine-in' },
  { id: '#۱۲۳۰', customer: 'رضا نوری', items: 'کباب کوبیده، ماست', total: 330000, status: 'delivered', time: '۴۰ دقیقه پیش', type: 'delivery' },
];

const reservations = [
  { id: 1, name: 'خانواده احمدی', guests: 4, time: '۲۰:۰۰', date: 'امشب', table: 'A-3', status: 'confirmed' },
  { id: 2, name: 'آقای رضایی', guests: 2, time: '۲۱:۰۰', date: 'امشب', table: 'B-1', status: 'confirmed' },
  { id: 3, name: 'خانواده کریمی', guests: 6, time: '۱۹:۳۰', date: 'امشب', table: 'VIP-1', status: 'pending' },
  { id: 4, name: 'آقای محمدی', guests: 3, time: '۲۰:۳۰', date: 'فردا', table: 'A-5', status: 'confirmed' },
];

const menuItems = [
  { id: 1, name: 'چلوکباب کوبیده', category: 'اصلی', price: 285000, available: true, popular: true, orders: 156 },
  { id: 2, name: 'جوجه‌کباب زعفرانی', category: 'اصلی', price: 265000, available: true, popular: true, orders: 134 },
  { id: 3, name: 'قورمه‌سبزی', category: 'اصلی', price: 195000, available: true, popular: false, orders: 89 },
  { id: 4, name: 'ماست و خیار', category: 'پیش‌غذا', price: 45000, available: true, popular: false, orders: 67 },
  { id: 5, name: 'دوغ محلی', category: 'نوشیدنی', price: 25000, available: false, popular: false, orders: 45 },
  { id: 6, name: 'باقلوا', category: 'دسر', price: 85000, available: true, popular: true, orders: 78 },
  { id: 7, name: 'سالاد فصل', category: 'سالاد', price: 65000, available: true, popular: false, orders: 52 },
  { id: 8, name: 'سوپ جو', category: 'پیش‌غذا', price: 55000, available: true, popular: false, orders: 34 },
];

const statusLabels: Record<string, string> = {
  preparing: 'در حال آماده‌سازی',
  confirmed: 'تأیید شده',
  ready: 'آماده',
  delivered: 'تحویل شده',
  cancelled: 'لغو شده',
};

const statusColors: Record<string, string> = {
  preparing: 'bg-orange-100 text-orange-700',
  confirmed: 'bg-blue-100 text-blue-700',
  ready: 'bg-green-100 text-green-700',
  delivered: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function AdminDashboard({ navigate }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItemsList = [
    { id: 'dashboard', icon: BarChart3, label: 'داشبورد' },
    { id: 'orders', icon: ShoppingBag, label: 'سفارش‌ها' },
    { id: 'menu', icon: ChefHat, label: 'مدیریت منو' },
    { id: 'reservations', icon: Calendar, label: 'رزروها' },
    { id: 'delivery', icon: Truck, label: 'ارسال و پیک' },
    { id: 'customers', icon: Users, label: 'مشتریان' },
    { id: 'finance', icon: CreditCard, label: 'مالی' },
    { id: 'marketing', icon: Star, label: 'بازاریابی' },
    { id: 'settings', icon: Settings, label: 'تنظیمات' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-l border-gray-200 fixed h-full z-30">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-dark text-sm">پنل مدیریت</div>
              <div className="text-xs text-gray-500">رستوران سنتی اصفهان</div>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItemsList.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button onClick={() => navigate('landing')} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-100">
            <ArrowDownRight className="w-5 h-5" />
            بازگشت به سایت
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <aside className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-sm">پنل مدیریت</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {menuItemsList.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id ? 'bg-primary/10 text-primary' : 'text-gray-600'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:mr-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="جستجو..." className="pr-10 pl-4 py-2 bg-gray-50 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-xl">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-xs font-bold">م</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8">
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'فروش امروز', value: '۹,۵۰۰,۰۰۰', unit: 'تومان', change: '+۱۸٪', up: true, icon: DollarSign, color: 'bg-green-100 text-green-600' },
                  { label: 'سفارش‌ها', value: '۹۵', unit: 'سفارش', change: '+۱۲٪', up: true, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
                  { label: 'مشتریان جدید', value: '۲۳', unit: 'نفر', change: '+۵٪', up: true, icon: Users, color: 'bg-purple-100 text-purple-600' },
                  { label: 'میانگین سفارش', value: '۳۱۰,۰۰۰', unit: 'تومان', change: '-۳٪', up: false, icon: TrendingDown, color: 'bg-orange-100 text-orange-600' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-xl font-black text-dark">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-dark">فروش هفتگی</h3>
                    <select className="text-xs bg-gray-50 rounded-lg px-3 py-1.5 border-none focus:outline-none">
                      <option>این هفته</option>
                      <option>هفته قبل</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#e85d04" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#e85d04" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="sales" stroke="#e85d04" fill="url(#salesGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-dark">سفارش‌ها بر اساس ساعت</h3>
                    <select className="text-xs bg-gray-50 rounded-lg px-3 py-1.5 border-none focus:outline-none">
                      <option>امروز</option>
                      <option>دیروز</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#006d77" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Distribution & Recent Orders */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-dark mb-4">سهم دسته‌بندی‌ها</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
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

                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-dark">سفارش‌های اخیر</h3>
                    <button onClick={() => setActiveSection('orders')} className="text-sm text-primary hover:underline">مشاهده همه</button>
                  </div>
                  <div className="space-y-3">
                    {orders.slice(0, 4).map(order => (
                      <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className={`w-2 h-2 rounded-full ${order.status === 'preparing' ? 'bg-orange-500' : order.status === 'confirmed' ? 'bg-blue-500' : order.status === 'ready' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{order.customer}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
                          </div>
                          <div className="text-xs text-gray-500 truncate">{order.items}</div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold">{order.total.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">{order.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Orders KDS */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-dark flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    نمایش آشپزخانه (KDS)
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">سفارش‌های فعال:</span>
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">۳</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orders.filter(o => o.status !== 'delivered').map(order => (
                    <div key={order.id} className={`rounded-xl p-4 border-2 ${order.status === 'preparing' ? 'border-orange-200 bg-orange-50' : order.status === 'confirmed' ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm">{order.id}</span>
                        <span className="text-xs text-gray-500">{order.time}</span>
                      </div>
                      <div className="text-sm font-medium mb-1">{order.customer}</div>
                      <div className="text-xs text-gray-600 mb-3">{order.items}</div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
                        <button className="text-xs text-primary font-medium hover:underline">تغییر وضعیت</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark">مدیریت سفارش‌ها</h2>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200">
                    <Filter className="w-4 h-4" />
                    فیلتر
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200">
                    <Download className="w-4 h-4" />
                    خروجی
                  </button>
                </div>
              </div>

              {/* Order Status Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['همه (۹۵)', 'در حال آماده‌سازی (۱۲)', 'تأیید شده (۸)', 'آماده (۵)', 'تحویل شده (۶۵)', 'لغو شده (۵)'].map((tab, idx) => (
                  <button key={idx} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${idx === 0 ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">شماره</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">مشتری</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 hidden sm:table-cell">آیتم‌ها</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">مبلغ</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 hidden md:table-cell">نوع</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">زمان</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                          <td className="px-4 py-3 text-sm">{order.customer}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{order.items}</td>
                          <td className="px-4 py-3 text-sm font-bold">{order.total.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                            {order.type === 'delivery' ? 'ارسال' : order.type === 'pickup' ? 'بیرون‌بر' : 'حضوری'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{order.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'menu' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark">مدیریت منو</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                  <Plus className="w-4 h-4" />
                  افزودن آیتم
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {menuItems.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                      <ChefHat className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm truncate">{item.name}</h4>
                        {item.popular && <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">پرفروش</span>}
                      </div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-bold text-primary">{item.price.toLocaleString()} تومان</span>
                        <span className="text-xs text-gray-400">{item.orders} سفارش</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-6 rounded-full flex items-center cursor-pointer transition-colors ${item.available ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                        <div className="w-5 h-5 bg-white rounded-full shadow mx-0.5"></div>
                      </div>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4 text-gray-400" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'reservations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark">مدیریت رزروها</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  رزرو جدید
                </button>
              </div>

              {/* Floor Plan */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-dark mb-4">پلان سالن</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {Array.from({ length: 12 }).map((_, idx) => {
                    const isReserved = idx === 2 || idx === 5 || idx === 8;
                    const isVIP = idx >= 10;
                    return (
                      <div key={idx} className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-medium cursor-pointer transition-all hover:scale-105 ${
                        isReserved ? 'bg-red-100 text-red-700 border-2 border-red-300' : isVIP ? 'bg-accent/10 text-accent border-2 border-accent/30' : 'bg-green-50 text-green-700 border border-green-200'
                      }`}>
                        <span className="font-bold">{isVIP ? `VIP-${idx - 9}` : `A-${idx + 1}`}</span>
                        <span className="text-xs opacity-70">{isReserved ? 'رزرو' : 'آزاد'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reservations List */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-dark">رزروهای امروز و فردا</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {reservations.map(res => (
                    <div key={res.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${res.status === 'confirmed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <Calendar className={`w-6 h-6 ${res.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{res.name}</div>
                        <div className="text-xs text-gray-500">{res.guests} نفر | میز {res.table} | {res.time} - {res.date}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${res.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {res.status === 'confirmed' ? 'تأیید شده' : 'در انتظار'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'customers' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-dark">مدیریت مشتریان و وفاداری</h2>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="text-3xl font-black text-dark">۱,۲۳۴</div>
                  <div className="text-sm text-gray-500">کل مشتریان</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="text-3xl font-black text-primary">۸۵۶</div>
                  <div className="text-sm text-gray-500">اعضای باشگاه</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="text-3xl font-black text-accent">۶۷٪</div>
                  <div className="text-sm text-gray-500">نرخ بازگشت</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-dark">مشتریان برتر</h3>
                  <button className="text-sm text-primary">مشاهده همه</button>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { name: 'علی احمدی', orders: 45, spent: '۱۲,۵۰۰,۰۰۰', points: 1250, tier: 'طلایی' },
                    { name: 'مریم رضایی', orders: 38, spent: '۹,۸۰۰,۰۰۰', points: 980, tier: 'طلایی' },
                    { name: 'حسین کریمی', orders: 28, spent: '۷,۲۰۰,۰۰۰', points: 720, tier: 'نقره‌ای' },
                    { name: 'زهرا محمدی', orders: 22, spent: '۵,۶۰۰,۰۰۰', points: 560, tier: 'نقره‌ای' },
                  ].map((customer, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">{customer.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.orders} سفارش | {customer.spent} تومان</div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold">{customer.points} امتیاز</div>
                        <div className={`text-xs ${customer.tier === 'طلایی' ? 'text-accent' : 'text-gray-400'}`}>{customer.tier}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'delivery' || activeSection === 'finance' || activeSection === 'marketing' || activeSection === 'settings') && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                {activeSection === 'delivery' && <Truck className="w-10 h-10 text-primary" />}
                {activeSection === 'finance' && <CreditCard className="w-10 h-10 text-primary" />}
                {activeSection === 'marketing' && <Star className="w-10 h-10 text-primary" />}
                {activeSection === 'settings' && <Settings className="w-10 h-10 text-primary" />}
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">
                {activeSection === 'delivery' && 'مدیریت ارسال و پیک'}
                {activeSection === 'finance' && 'مدیریت مالی'}
                {activeSection === 'marketing' && 'بازاریابی و محتوا'}
                {activeSection === 'settings' && 'تنظیمات'}
              </h3>
              <p className="text-gray-500 text-sm text-center max-w-md">
                این بخش شامل ابزارهای پیشرفته برای مدیریت {
                  activeSection === 'delivery' ? 'پیک‌ها، ردیابی زنده و بهینه‌سازی مسیر ارسال' :
                  activeSection === 'finance' ? 'تراکنش‌ها، تسویه، کمیسیون و گزارش‌های مالی' :
                  activeSection === 'marketing' ? 'کد تخفیف، کمپین‌ها، بنرها و مدیریت محتوا' :
                  'چندشعبه‌ای، اتصال API، درگاه پرداخت و قالب‌های سفارشی'
                } است.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
