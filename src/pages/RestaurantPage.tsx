import { AppView } from '../App';
import { useState } from 'react';
import {
  ArrowRight, Star, Clock, MapPin, Phone, Share2, Heart,
  ChevronLeft, Plus, Minus, ShoppingBag, X, Image,
  Calendar, Users as UsersIcon, ChefHat, Info, MessageSquare
} from 'lucide-react';

interface RestaurantPageProps {
  navigate: (view: AppView) => void;
}

const menuCategories = ['همه', 'غذای اصلی', 'پیش‌غذا', 'نوشیدنی', 'دسر'];

const menuItems = [
  { id: 1, name: 'چلوکباب کوبیده', desc: 'دو سیخ کباب کوبیده گوسفندی با برنج زعفرانی، گوجه کبابی و کره', price: 285000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'غذای اصلی', popular: true, time: '25 دقیقه' },
  { id: 2, name: 'جوجه‌کباب زعفرانی', desc: 'سینه مرغ مزه‌دار شده با زعفران و لیمو، سرو شده با برنج', price: 265000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'غذای اصلی', popular: true, time: '20 دقیقه' },
  { id: 3, name: 'قورمه‌سبزی', desc: 'خورشت قورمه‌سبزی با گوشت گوسفندی، لوبیا قرمز و سبزیجات معطر', price: 195000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'غذای اصلی', popular: false, time: '15 دقیقه' },
  { id: 4, name: 'ماست و خیار', desc: 'ماست محلی با خیار تازه، نعنا و کشمش', price: 45000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'پیش‌غذا', popular: false, time: '5 دقیقه' },
  { id: 5, name: 'دوغ محلی', desc: 'دوغ سنتی با نعنا و پونه کوهی', price: 25000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'نوشیدنی', popular: false, time: '2 دقیقه' },
  { id: 6, name: 'باقلوای خانگی', desc: 'باقلوای خانگی با مغز پسته و بادام، شهد زعفرانی', price: 85000, image: 'https://image.qwenlm.ai/generated-images/7cb017fc-dbea-4836-ada0-e94414f8a930/_result.png', category: 'دسر', popular: true, time: '5 دقیقه' },
  { id: 7, name: 'سالاد فصل', desc: 'کاهو، خیار، گوجه، ذرت و سس مخصوص شف', price: 65000, image: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png', category: 'پیش‌غذا', popular: false, time: '8 دقیقه' },
  { id: 8, name: 'شربت به‌لیمو', desc: 'شربت خنک به‌لیمو با یخ و نعنا تازه', price: 35000, image: 'https://image.qwenlm.ai/generated-images/48e98453-6a83-46c1-abab-3354cfa62cf8/_result.png', category: 'نوشیدنی', popular: false, time: '3 دقیقه' },
];

const gallery = [
  'https://image.qwenlm.ai/generated-images/01534e96-1a30-4399-896c-8e0fff37aae4/_result.png',
  'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png',
  'https://image.qwenlm.ai/generated-images/48e98453-6a83-46c1-abab-3354cfa62cf8/_result.png',
  'https://image.qwenlm.ai/generated-images/7cb017fc-dbea-4836-ada0-e94414f8a930/_result.png',
];

const reviews = [
  { name: 'محمد رضایی', rating: 5, text: 'غذای عالی، سرویس سریع و فضای بسیار دلنشین. حتماً دوباره می‌آیم.', date: '۲ روز پیش' },
  { name: 'سارا احمدی', rating: 4, text: 'کباب‌ها فوق‌العاده بودند. برنج زعفرانی هم عالی بود. فقط سالاد کمی کم بود.', date: '۵ روز پیش' },
  { name: 'علی کریمی', rating: 5, text: 'بهترین رستوران سنتی منطقه. فضای سنتی و غذای اصیل ایرانی.', date: '۱ هفته پیش' },
];

export function RestaurantPage({ navigate }: RestaurantPageProps) {
  const [activeTab, setActiveTab] = useState<'menu' | 'gallery' | 'reviews' | 'info'>('menu');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [cart, setCart] = useState<{item: typeof menuItems[0], qty: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showReservation, setShowReservation] = useState(false);

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

  const filteredMenu = selectedCategory === 'همه' ? menuItems : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('customer')} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Heart className="w-5 h-5 text-gray-600" />
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

      {/* Hero Image */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img 
          src="https://image.qwenlm.ai/generated-images/01534e96-1a30-4399-896c-8e0fff37aae4/_result.png"
          alt="رستوران سنتی اصفهان"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 right-4 left-4">
          <h1 className="text-2xl font-black text-white mb-1">رستوران سنتی اصفهان</h1>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-bold text-white">۴.۸</span>
              <span>(۳۲۴ نظر)</span>
            </div>
            <span>|</span>
            <span>ایرانی</span>
            <span>|</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>۳۰-۴۵ دقیقه</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="max-w-4xl mx-auto px-4 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-4 grid grid-cols-3 gap-4">
          <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-gray-600">مسیریابی</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs text-gray-600">تماس</span>
          </button>
          <button onClick={() => setShowReservation(true)} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-gray-600">رزرو میز</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {[
            { id: 'menu' as const, label: 'منو' },
            { id: 'gallery' as const, label: 'گالری' },
            { id: 'reviews' as const, label: 'نظرات' },
            { id: 'info' as const, label: 'اطلاعات' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'menu' && (
          <div className="space-y-4">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {menuCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-3">
              {filteredMenu.map(item => {
                const cartItem = cart.find(c => c.item.id === item.id);
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-dark text-sm">{item.name}</h3>
                            {item.popular && <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">پرفروش</span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.desc}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">{item.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-black text-primary">{item.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">تومان</span></span>
                        {cartItem ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-sm w-5 text-center">{cartItem.qty}</span>
                            <button onClick={() => addToCart(item)} className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => addToCart(item)} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all">
                            <Plus className="w-4 h-4" />
                            افزودن
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden aspect-square">
                <img src={img} alt={`گالری ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-dark">۴.۸</div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 5 ? 'fill-accent text-accent' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">از ۳۲۴ نظر</div>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">
                ثبت نظر
              </button>
            </div>

            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">{review.name[0]}</span>
                    </div>
                    <span className="font-medium text-sm">{review.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <h3 className="font-bold text-dark mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                درباره رستوران
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                رستوران سنتی اصفهان با بیش از ۲۰ سال سابقه، بهترین غذاهای اصیل ایرانی را با کیفیت بالا و در فضایی سنتی و دلنشین ارائه می‌دهد. سرآشپز ما با تجربه‌ای بیش از ۱۵ سال، طعم‌های اصیل ایرانی را برای شما آماده می‌کند.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <h3 className="font-bold text-dark mb-3 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                سرآشپز
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <ChefHat className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-sm">استاد رحیمی</div>
                  <div className="text-xs text-gray-500">۱۵ سال تجربه در آشپزی ایرانی</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3">
              <h3 className="font-bold text-dark flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                ساعات کاری
              </h3>
              {[
                { day: 'شنبه تا چهارشنبه', time: '۱۱:۰۰ - ۲۳:۰۰' },
                { day: 'پنج‌شنبه و جمعه', time: '۱۱:۰۰ - ۲۴:۰۰' },
              ].map((schedule, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600">{schedule.day}</span>
                  <span className="font-medium">{schedule.time}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <h3 className="font-bold text-dark mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                آدرس
              </h3>
              <p className="text-sm text-gray-600">اصفهان، خیابان چهارباغ، کوچه گلستان، پلاک ۱۲</p>
              <div className="mt-3 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <h3 className="font-bold text-dark mb-3">امکانات</h3>
              <div className="flex flex-wrap gap-2">
                {['پارکینگ', 'فضای باز', 'وای‌فای', 'مناسب کودکان', 'حلال', 'فضای سیگار'].map(facility => (
                  <span key={facility} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">{facility}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Cart Bar */}
      {totalItems > 0 && !showCart && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-30">
          <button 
            onClick={() => setShowCart(true)}
            className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-l from-primary to-primary-dark text-white rounded-2xl shadow-xl shadow-primary/30"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-bold">{totalItems} آیتم</span>
            </div>
            <span className="font-bold">{totalPrice.toLocaleString()} تومان</span>
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
          <div className="bg-white w-full max-w-lg mx-auto rounded-t-3xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold">سبد خرید</h3>
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
                  {/* Service Type */}
                  <div className="flex gap-2">
                    {['ارسال', 'بیرون‌بر', 'حضوری'].map((type, idx) => (
                      <button key={idx} className={`flex-1 py-2 rounded-xl text-sm font-medium ${idx === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {type}
                      </button>
                    ))}
                  </div>

                  {cart.map(c => (
                    <div key={c.item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img src={c.item.image} alt={c.item.name} className="w-14 h-14 rounded-xl object-cover" />
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

                  {/* Coupon */}
                  <div className="flex gap-2">
                    <input type="text" placeholder="کد تخفیف" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                    <button className="px-4 py-2.5 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200">اعمال</button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">جمع سفارش</span>
                      <span>{totalPrice.toLocaleString()} تومان</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">هزینه ارسال</span>
                      <span>۳۵,۰۰۰ تومان</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                      <span>مبلغ قابل پرداخت</span>
                      <span className="text-primary">{(totalPrice + 35000).toLocaleString()} تومان</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-l from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-lg transition-all">
                    ثبت سفارش و پرداخت
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      {showReservation && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">رزرو میز</h3>
              <button onClick={() => setShowReservation(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">تاریخ</label>
                <div className="flex gap-2">
                  {['امشب', 'فردا', 'پس‌فردا'].map((d, idx) => (
                    <button key={idx} className={`flex-1 py-2 rounded-xl text-sm font-medium ${idx === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">ساعت</label>
                <div className="grid grid-cols-4 gap-2">
                  {['۱۹:۰۰', '۱۹:۳۰', '۲۰:۰۰', '۲۰:۳۰', '۲۱:۰۰', '۲۱:۳۰', '۲۲:۰۰', '۲۲:۳۰'].map((time, idx) => (
                    <button key={idx} className={`py-2 rounded-xl text-sm ${idx === 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">تعداد نفرات</label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5, 6].map(n => (
                    <button key={n} className={`flex-1 py-2 rounded-xl text-sm font-medium ${n === 4 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {n} نفر
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">نوع میز</label>
                <div className="flex gap-2">
                  {['سالن', 'تراس', 'VIP'].map((type, idx) => (
                    <button key={idx} className={`flex-1 py-2 rounded-xl text-sm font-medium ${idx === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowReservation(false)} className="w-full py-3 bg-gradient-to-l from-primary to-primary-dark text-white font-bold rounded-xl mt-4">
                تأیید رزرو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
