import { AppView } from '../App';
import { 
  Store, Smartphone, BarChart3, Users, Truck, CreditCard, 
  Calendar, Star, ArrowLeft, ChefHat, Globe, Shield, Zap,
  Menu, X, ChevronDown, MapPin, Clock, Heart
} from 'lucide-react';
import { useState } from 'react';
import { Carousel, CarouselItem } from '../components/Carousel';

interface LandingPageProps {
  navigate: (view: AppView) => void;
}

export function LandingPage({ navigate }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 left-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-dark">سفرت</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">امکانات</a>
              <a href="#business-types" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">انواع کسب‌وکار</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">تعرفه‌ها</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">نظرات</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => navigate('customer')}
                className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                ورود مشتری
              </button>
              <button 
                onClick={() => navigate('admin')}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-l from-primary to-primary-dark rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                پنل مدیریت
              </button>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3">
            <a href="#features" className="block py-2 text-gray-600">امکانات</a>
            <a href="#business-types" className="block py-2 text-gray-600">انواع کسب‌وکار</a>
            <a href="#pricing" className="block py-2 text-gray-600">تعرفه‌ها</a>
            <button onClick={() => navigate('customer')} className="block w-full text-right py-2 text-primary font-medium">ورود مشتری</button>
            <button onClick={() => navigate('admin')} className="block w-full text-right py-2 text-primary font-medium">پنل مدیریت</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-orange-50 via-white to-amber-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">پلتفرم نسل جدید رستوران‌داری</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-dark">
                اکوسیستم دیجیتال
                <br />
                <span className="gradient-text">یکپارچه رستوران</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                از کشف و رزرو تا سفارش، تحویل و وفاداری مشتری — تمام چرخه حیات رستوران شما در یک پلتفرم هوشمند، بدون پیچیدگی فنی.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('admin')}
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-l from-primary to-primary-dark text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/30 transition-all transform hover:-translate-y-1"
                >
                  شروع رایگان
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('customer')}
                  className="flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-dark font-bold rounded-2xl hover:border-primary hover:text-primary transition-all"
                >
                  <Smartphone className="w-5 h-5" />
                  مشاهده دمو
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-black text-dark">۲,۵۰۰+</div>
                  <div className="text-xs text-gray-500">رستوران فعال</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-dark">۱.۲M</div>
                  <div className="text-xs text-gray-500">سفارش ماهانه</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-dark">۹۹.۹%</div>
                  <div className="text-xs text-gray-500">آپتایم سرویس</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <Carousel height="h-[500px]" autoPlay interval={4000}>
                <CarouselItem image="https://image.qwenlm.ai/generated-images/01534e96-1a30-4399-896c-8e0fff37aae4/_result.png" overlay="gradient">
                  <div className="flex items-end justify-between w-full">
                    <div>
                      <div className="text-white/80 text-sm">رستوران مدرن</div>
                      <div className="text-white text-2xl font-black">تجربه‌ای متفاوت از غذا</div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem image="https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png" overlay="gradient">
                  <div>
                    <div className="text-white/80 text-sm">غذاهای اصیل</div>
                    <div className="text-white text-2xl font-black">طعم واقعی ایران</div>
                  </div>
                </CarouselItem>
                <CarouselItem image="https://image.qwenlm.ai/generated-images/3684ff9c-4d63-45e1-90f4-2bf6a74ee5c3/_result.png" overlay="gradient">
                  <div>
                    <div className="text-white/80 text-sm">ارسال سریع</div>
                    <div className="text-white text-2xl font-black">در کمتر از ۳۰ دقیقه</div>
                  </div>
                </CarouselItem>
              </Carousel>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-slide-in-right">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-dark">فروش امروز</div>
                    <div className="text-lg font-black text-green-600">+۳۴٪</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-dark">رزرو جدید</div>
                    <div className="text-sm text-gray-500">۴ نفر - ساعت ۲۰:۰۰</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-dark mb-4">همه‌چیز در یک پلتفرم</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              از مدیریت منو و سفارش‌ها تا تحلیل کسب‌وکار و وفاداری مشتری — تمام ابزارهایی که برای رشد نیاز دارید
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Store, title: 'منوی دیجیتال هوشمند', desc: 'مدیریت منو با تصویر، دسته‌بندی، آلرژن‌ها، تنوع و موجودی لحظه‌ای', color: 'bg-orange-100 text-orange-600' },
              { icon: Smartphone, title: 'سفارش آنلاین روان', desc: 'تجربه سفارش‌دهی ساده با شخصی‌سازی کامل و پرداخت ترکیبی', color: 'bg-blue-100 text-blue-600' },
              { icon: Calendar, title: 'رزرو هوشمند میز', desc: 'پلان گرافیکی سالن، انتخاب میز، یادآوری و مدیریت لیست انتظار', color: 'bg-green-100 text-green-600' },
              { icon: Truck, title: 'مدیریت ارسال و پیک', desc: 'تخصیص هوشمند پیک، ردیابی زنده روی نقشه و بهینه‌سازی مسیر', color: 'bg-purple-100 text-purple-600' },
              { icon: CreditCard, title: 'پرداخت بی‌دغدغه', desc: 'درگاه بانکی، کیف پول، اعتبار باشگاه، تقسیم حساب و فاکتور رسمی', color: 'bg-pink-100 text-pink-600' },
              { icon: BarChart3, title: 'داشبورد تحلیلی', desc: 'نمودار فروش، پرفروش‌ترین‌ها، نرخ تبدیل و گزارش‌های پیشرفته', color: 'bg-indigo-100 text-indigo-600' },
              { icon: Users, title: 'باشگاه مشتریان', desc: 'امتیاز خرید، کد معرف، جوایز و کمپین‌های شخصی‌سازی‌شده', color: 'bg-amber-100 text-amber-600' },
              { icon: Globe, title: 'چندشعبه‌ای', desc: 'مدیریت شعب متعدد با منوی اختصاصی، قیمت‌گذاری و گزارش مجزا', color: 'bg-teal-100 text-teal-600' },
              { icon: Shield, title: 'امنیت سازمانی', desc: 'رمزنگاری داده، ورود دو مرحله‌ای، لاگ کامل و انطباق با الزامات', color: 'bg-red-100 text-red-600' },
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section id="business-types" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-dark mb-4">هر نوع کسب‌وکار غذایی</h2>
            <p className="text-gray-600 text-lg">از یک مغازه کوچک تا زنجیره چندشعبه‌ای — سفرت برای همه مناسب است</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'رستوران سنتی', img: 'https://image.qwenlm.ai/generated-images/9653abd5-65ae-4823-9aec-a378da6ead27/_result.png' },
              { name: 'کافه و قهوه‌خانه', img: 'https://image.qwenlm.ai/generated-images/48e98453-6a83-46c1-abab-3354cfa62cf8/_result.png' },
              { name: 'فست‌فود و برگر', img: 'https://image.qwenlm.ai/generated-images/3684ff9c-4d63-45e1-90f4-2bf6a74ee5c3/_result.png' },
              { name: 'پیتزا و ساندویچ', img: 'https://image.qwenlm.ai/generated-images/a2cbbccf-7b36-400e-a171-d5ac31640bd6/_result.png' },
              { name: 'غذای دریایی', img: 'https://image.qwenlm.ai/generated-images/9bd112c4-b93e-4c63-86f4-b61aeb0f36aa/_result.png' },
              { name: 'قنادی و شیرینی', img: 'https://image.qwenlm.ai/generated-images/7cb017fc-dbea-4836-ada0-e94414f8a930/_result.png' },
              { name: 'آشپزی بین‌المللی', img: 'https://image.qwenlm.ai/generated-images/01534e96-1a30-4399-896c-8e0fff37aae4/_result.png' },
              { name: 'کترینگ سازمانی', img: 'https://image.qwenlm.ai/generated-images/50fab5c0-0916-4b5a-a88f-4a42bd0aab3c/_result.png' },
            ].map((biz, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square" onClick={() => navigate('restaurant')}>
                <img src={biz.img} alt={biz.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 right-4 left-4">
                  <h3 className="text-white font-bold text-sm sm:text-base">{biz.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-bl from-dark to-darker text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">در ۳ قدم ساده شروع کنید</h2>
            <p className="text-gray-400 text-lg">بدون نیاز به دانش فنی، رستوران دیجیتال خود را راه‌اندازی کنید</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '۰۱', title: 'ثبت‌نام و راه‌اندازی', desc: 'حساب کاربری بسازید، اطلاعات رستوران و منوی خود را وارد کنید' },
              { step: '۰۲', title: 'شخصی‌سازی', desc: 'قالب، رنگ‌بندی، دامنه اختصاصی و تنظیمات سفارشی را پیکربندی کنید' },
              { step: '۰۳', title: 'شروع فروش', desc: 'لینک سفارش آنلاین را به اشتراک بگذارید و سفارش‌ها را دریافت کنید' },
            ].map((item, idx) => (
              <div key={idx} className="relative glass-card rounded-2xl p-8 hover:bg-white/10 transition-all">
                <div className="text-6xl font-black text-primary/30 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-px bg-primary/50"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-dark mb-4">پلن مناسب کسب‌وکار شما</h2>
            <p className="text-gray-600 text-lg">بدون هزینه اولیه، فقط کمیسیون از هر سفارش موفق</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'استارتر', price: 'رایگان', desc: 'مناسب کسب‌وکارهای کوچک', features: ['منوی دیجیتال', 'سفارش آنلاین', 'حداکثر ۵۰ آیتم منو', 'پشتیبانی ایمیلی', 'گزارش پایه'], highlight: false },
              { name: 'حرفه‌ای', price: '۴۹۹,۰۰۰', desc: 'مناسب رستوران‌های در حال رشد', features: ['تمام امکانات استارتر', 'رزرو آنلاین میز', 'مدیریت پیک', 'باشگاه مشتریان', 'گزارش‌های پیشرفته', 'پشتیبانی تلفنی', 'دامنه اختصاصی'], highlight: true },
              { name: 'سازمانی', price: 'سفارشی', desc: 'مناسب زنجیره‌ها و فودکور‌ت‌ها', features: ['تمام امکانات حرفه‌ای', 'چند شعبه‌ای', 'API اختصاصی', 'مدیر برندینگ سفارشی', 'SLA تضمینی', 'مدیر حساب اختصاصی', 'آموزش تیم'], highlight: false },
            ].map((plan, idx) => (
              <div key={idx} className={`rounded-3xl p-8 ${plan.highlight ? 'bg-gradient-to-bl from-primary to-primary-dark text-white shadow-2xl shadow-primary/30 scale-105' : 'bg-white border border-gray-200'}`}>
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-dark'}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-white/70' : 'text-gray-500'}`}>{plan.desc}</p>
                <div className="mb-6">
                  <span className={`text-3xl font-black ${plan.highlight ? 'text-white' : 'text-dark'}`}>{plan.price}</span>
                  {plan.price !== 'سفارشی' && plan.price !== 'رایگان' && <span className={`text-sm ${plan.highlight ? 'text-white/70' : 'text-gray-500'}`}> تومان/ماه</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-white/90' : 'text-gray-600'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-white/20' : 'bg-primary/10'}`}>
                        <ChevronDown className={`w-3 h-3 ${plan.highlight ? 'text-white' : 'text-primary'} rotate-[-90deg]`} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-white text-primary hover:bg-gray-100' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}>
                  شروع کنید
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-dark mb-4">اعتماد هزاران رستوران‌دار</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'محمد رضایی', role: 'مدیر رستوران سنتی اصفهان', text: 'از وقتی سفرت را راه‌اندازی کردیم، سفارش‌های آنلاین ما ۳ برابر شده و مدیریت آشپزخانه بسیار منظم‌تر شده است.', rating: 5 },
              { name: 'سارا احمدی', role: 'صاحب کافه هنر', text: 'رزرو آنلاین میز و منوی دیجیتال، تجربه مشتری‌های ما را کاملاً متحول کرد. دیگر نیازی به انتظار نیست.', rating: 5 },
              { name: 'علی محمدی', role: 'مدیر زنجیره فست‌فود برگرلند', text: 'با ۵ شعبه، مدیریت یکپارچه از طریق سفرت باعث صرفه‌جویی ۴۰ درصدی در زمان و هزینه‌های ما شده.', rating: 5 },
            ].map((t, idx) => (
              <div key={idx} className="bg-surface rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-bold text-dark text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-bl from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">آماده‌اید رستوران خود را دیجیتال کنید؟</h2>
          <p className="text-white/80 text-lg mb-8">همین حالا ثبت‌نام کنید و در کمتر از ۱۰ دقیقه، حضور دیجیتال خود را راه‌اندازی کنید</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('admin')} className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:shadow-xl transition-all">
              شروع رایگان
            </button>
            <button onClick={() => navigate('customer')} className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
              مشاهده دمو
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darker text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">سفرت</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">اکوسیستم دیجیتال یکپارچه برای تمام کسب‌وکارهای غذایی ایران</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">محصولات</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">سفارش آنلاین</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">رزرو میز</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">مدیریت رستوران</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">باشگاه مشتریان</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">شرکت</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">درباره ما</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">تماس با ما</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">فرصت‌های شغلی</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">بلاگ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">پشتیبانی</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">مرکز راهنما</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">مستندات API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">قوانین و مقررات</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">حریم خصوصی</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            تمامی حقوق محفوظ است. سفرت ۱۴۰۳
          </div>
        </div>
      </footer>
    </div>
  );
}
