import { AppView } from '../App';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Carousel, CarouselItem } from '../components/Carousel';
import {
  Search, MapPin, Clock, Star, Heart, ShoppingBag,
  ChevronLeft, Minus, Plus, X, CreditCard,
  Wallet, Gift, User, Bell, Home, Grid3X3, Receipt,
  Award, Settings, LogOut, Check, Coffee, Pizza, Fish, Leaf, Package
} from 'lucide-react';

interface CustomerAppProps {
  navigate: (view: AppView) => void;
}

const categories = [
  { id: 1, name: 'همه', icon: Grid3X3 },
  { id: 2, name: 'ایرانی', icon: Home },
  { id: 3, name: 'فست‌فود', icon: ShoppingBag },
  { id: 4, name: 'کافه', icon: Coffee },
  { id: 5, name: 'پیتزا', icon: Pizza },
  { id: 6, name: 'دریایی', icon: Fish },
  { id: 7, name: 'سالاد', icon: Leaf },
];

const restaurants = [
  { id: 1, name: 'رستوران سنتی اصفهان', type: 'ایرانی', rating: 4.8, reviews: 324, time: '30-45', price: '$$', image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', discount: 15, tags: ['حلال', 'فضای باز'] },
  { id: 2, name: 'کافه هنر', type: 'کافه', rating: 4.6, reviews: 189, time: '15-25', price: '$', image: 'https://image.qwenlm.ai/generated-images/48e98453-6a83-46c1-abab-3354cfa62cf8/_result.png', discount: 0, tags: ['وای‌فای', 'پت‌فرندلی'] },
  { id: 3, name: 'برگرلند', type: 'فست‌فود', rating: 4.5, reviews: 567, time: '20-35', price: '$$', image: 'https://image.qwenlm.ai/generated-images/3684ff9c-4d63-45e1-90f4-2bf6a74ee5c3/_result.png', discount: 20, tags: ['سریع', 'خانوادگی'] },
  { id: 4, name: 'پیتزیا ناپلی', type: 'پیتزا', rating: 4.7, reviews: 234, time: '25-40', price: '$$', image: 'https://image.qwenlm.ai/generated-images/a2cbbccf-7b36-400e-a171-d5ac31640bd6/_result.png', discount: 0, tags: ['تنوری', 'ایتالیایی'] },
  { id: 5, name: 'دریا', type: 'دریایی', rating: 4.9, reviews: 145, time: '35-50', price: '$$$', image: 'https://image.qwenlm.ai/generated-images/9bd112c4-b93e-4c63-86f4-b61aeb0f36aa/_result.png', discount: 10, tags: ['تازه', 'لوکس'] },
  { id: 6, name: 'شیرینی‌سرای گلستان', type: 'قنادی', rating: 4.4, reviews: 98, time: '15-20', price: '$', image: 'https://image.qwenlm.ai/generated-images/7cb017fc-dbea-4836-ada0-e94414f8a930/_result.png', discount: 0, tags: ['سنتی', 'هدیه'] },
];

export function CustomerApp({ navigate }: CustomerAppProps) {
  const { menuItems, addOrder, restaurantInfo } = useApp();
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'profile'>('home');
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{item: typeof menuItems[0], qty: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderTracking, setOrderTracking] = useState<string | null>(null);

  const addToCart = (item: typeof menuItems[0]) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === itemId);
      if (existing && existing.qty > 1) {
        return prev.map(c => c.item.id === itemId ? { ...c, qty: c.qty - 1 } : c);
      }
      return prev.filter(c => c.item.id !== itemId);
    });
  };

  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  const totalPrice = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);

  const placeOrder = () => {
    const orderId = `#${Math.floor(Math.random() * 9000) + 1000}`;
    addOrder({
      customer: 'علی محمدی',
      items: cart.map(c => c.item.name).join('، '),
      total: totalPrice + 35000,
      status: 'confirmed',
      time: 'همین الان',
      type: 'delivery',
      address: 'تهران، ونک',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
    });
    setOrderTracking(orderId);
    setCart([]);
    setShowCart(false);
  };

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.includes(searchQuery) || r.type.includes(searchQuery);
    const matchesCategory = selectedCategory === 1 || 
      (selectedCategory === 2 && r.type === 'ایرانی') ||
      (selectedCategory === 3 && r.type === 'فست‌فود') ||
      (selectedCategory === 4 && r.type === 'کافه') ||
      (selectedCategory === 5 && r.type === 'پیتزا') ||
      (selectedCategory === 6 && r.type === 'دریایی') ||
      (selectedCategory === 7 && r.type === 'قنادی');
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:px-16">
      {/* Header */}
      <header className="sticky top-16 z-40 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">س</span>
            </div>
            <span className="font-black text-dark">سفرت</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 hover:bg-gray-100 rounded-xl">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button onClick={() => setShowCart(true)} className="relative p-2 hover:bg-gray-100 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Order Tracking */}
      {orderTracking && (
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="bg-gradient-to-l from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-bold text-green-800 text-sm">سفارش شما ثبت شد</div>
                  <div className="text-xs text-green-600">کد رهگیری: {orderTracking}</div>
                </div>
              </div>
              <button onClick={() => setOrderTracking(null)} className="text-green-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-700 mb-2">
              <Clock className="w-3 h-3" />
              <span>زمان تقریبی تحویل: ۲۵ دقیقه</span>
            </div>
            <div className="flex items-center gap-1">
              {['ثبت', 'تأیید', 'آماده‌سازی', 'ارسال', 'تحویل'].map((step, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`h-2 w-full rounded-full ${idx < 3 ? 'bg-green-500' : 'bg-green-200'}`}></div>
                  <span className="text-[10px] text-green-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-primary" />
              <span>تهران، ونک</span>
              <ChevronLeft className="w-4 h-4" />
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="جستجوی رستوران، غذا..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
            </div>

            {/* Carousel Banner */}
            <Carousel height="h-44" autoPlay interval={4000}>
              <CarouselItem image="https://image.qwenlm.ai/generated-images/01534e96-1a30-4399-896c-8e0fff37aae4/_result.png" overlay="gradient">
                <div>
                  <div className="text-white/70 text-xs mb-1">پیشنهاد ویژه</div>
                  <div className="text-white text-lg font-black">۲۰٪ تخفیف اولین سفارش</div>
                  <div className="text-white/80 text-xs mt-1">با کد WELCOME20</div>
                </div>
              </CarouselItem>
              <CarouselItem image="https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png" overlay="gradient">
                <div>
                  <div className="text-white/70 text-xs mb-1">رستوران‌های برتر</div>
                  <div className="text-white text-lg font-black">غذاهای اصیل ایرانی</div>
                  <div className="text-white/80 text-xs mt-1">با بهترین کیفیت</div>
                </div>
              </CarouselItem>
              <CarouselItem image="https://image.qwenlm.ai/generated-images/3684ff9c-4d63-45e1-90f4-2bf6a74ee5c3/_result.png" overlay="gradient">
                <div>
                  <div className="text-white/70 text-xs mb-1">ارسال رایگان</div>
                  <div className="text-white text-lg font-black">سفارش بالای ۲۰۰ هزار تومان</div>
                  <div className="text-white/80 text-xs mt-1">در کمتر از ۳۰ دقیقه</div>
                </div>
              </CarouselItem>
            </Carousel>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-gradient-to-l from-primary to-primary-dark text-white shadow-lg shadow-primary/30' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-primary'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Restaurants */}
            <div>
              <h2 className="text-lg font-black text-dark mb-4">رستوران‌های نزدیک شما</h2>
              <div className="space-y-4">
                {filteredRestaurants.map(r => (
                  <div key={r.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('restaurant')}>
                    <div className="relative h-44">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                      {r.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                          {r.discount}٪ تخفیف
                        </div>
                      )}
                      <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      {!restaurantInfo.isOpen && r.id === 1 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">بسته</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-dark">{r.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-bold">{r.rating}</span>
                          <span className="text-xs text-gray-400">({r.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{r.type}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{r.time} دقیقه</span>
                        </div>
                        <span>{r.price}</span>
                        <div className="flex gap-1">
                          {r.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-dark">سفارش‌های من</h2>
            
            {orderTracking && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-dark">سفارش فعال</div>
                    <div className="text-sm text-gray-500">کد رهگیری: {orderTracking}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-800">در حال آماده‌سازی</span>
                    <span className="text-xs text-green-600 mr-auto">۱۰ دقیقه پیش</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-500">ارسال</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-500">تحویل</span>
                  </div>
                </div>
              </div>
            )}
            
            <h3 className="text-lg font-bold text-dark mt-6">تاریخچه سفارش‌ها</h3>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-medium text-sm">رستوران سنتی اصفهان</div>
                  <div className="text-xs text-gray-500">۲ روز پیش</div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">۳۸۵,۰۰۰ تومان</div>
                  <div className="text-xs text-green-600">تحویل شده</div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-medium text-sm">کافه هنر</div>
                  <div className="text-xs text-gray-500">۵ روز پیش</div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">۱۲۵,۰۰۰ تومان</div>
                  <div className="text-xs text-green-600">تحویل شده</div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-sm">برگرلند</div>
                  <div className="text-xs text-gray-500">۱ هفته پیش</div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">۲۴۵,۰۰۰ تومان</div>
                  <div className="text-xs text-green-600">تحویل شده</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary/30">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-black text-dark">علی محمدی</h2>
              <p className="text-sm text-gray-500">۰۹۱۲۳۴۵۶۷۸۹</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                <div className="text-2xl font-black text-primary">۱۲</div>
                <div className="text-xs text-gray-500">سفارش</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                <div className="text-2xl font-black text-accent">۸۵۰</div>
                <div className="text-xs text-gray-500">امتیاز</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                <div className="text-2xl font-black text-green-600">۵۰K</div>
                <div className="text-xs text-gray-500">کیف پول</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              {[
                { icon: MapPin, label: 'آدرس‌های من' },
                { icon: Heart, label: 'علاقه‌مندی‌ها' },
                { icon: Wallet, label: 'کیف پول' },
                { icon: Award, label: 'باشگاه مشتریان' },
                { icon: Gift, label: 'کد معرف' },
                { icon: Settings, label: 'تنظیمات' },
              ].map((item, idx) => (
                <button key={idx} className="flex items-center gap-3 w-full px-4 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-dark">{item.label}</span>
                  <ChevronLeft className="w-4 h-4 text-gray-400 mr-auto" />
                </button>
              ))}
            </div>

            <button 
              onClick={() => navigate('landing')}
              className="flex items-center gap-3 w-full px-4 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">خروج از حساب</span>
            </button>
          </div>
        )}
      </main>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end">
          <div className="bg-white w-full max-w-lg mx-auto rounded-t-3xl max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-black">سبد خرید</h3>
              <button onClick={() => setShowCart(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">سبد خرید شما خالی است</p>
                </div>
              ) : (
                <>
                  {cart.map(c => (
                    <div key={c.item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img src={c.item.image} alt={c.item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{c.item.name}</div>
                        <div className="text-sm text-primary font-bold">{(c.item.price * c.qty).toLocaleString()} تومان</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromCart(c.item.id)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">{c.qty}</span>
                        <button onClick={() => addToCart(c.item)} className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                          <Plus className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">جمع سفارش</span>
                      <span>{totalPrice.toLocaleString()} تومان</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">هزینه ارسال</span>
                      <span className="text-green-600">رایگان</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                      <span>مبلغ قابل پرداخت</span>
                      <span className="text-primary">{totalPrice.toLocaleString()} تومان</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all">
                        <CreditCard className="w-4 h-4" />
                        درگاه بانکی
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm hover:border-primary transition-colors">
                        <Wallet className="w-4 h-4" />
                        کیف پول
                      </button>
                    </div>
                    <button 
                      onClick={placeOrder}
                      className="w-full py-4 bg-gradient-to-l from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-xl transition-all"
                    >
                      ثبت سفارش و پرداخت
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          {[
            { id: 'home' as const, icon: Home, label: 'خانه' },
            { id: 'orders' as const, icon: Receipt, label: 'سفارش‌ها' },
            { id: 'profile' as const, icon: User, label: 'پروفایل' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                activeTab === tab.id ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
