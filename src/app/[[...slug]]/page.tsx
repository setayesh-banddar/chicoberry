"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  Star,
  Instagram,
  ChevronUp,
  Menu,
  X,
  Sparkles,
  Send,
  Phone,
  Cherry,
  Gift,
  HeartHandshake,
  Mail,
  Clock,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Minus,
  Plus,
  Trash2,
  MapPin,
  CreditCard,
  CheckCircle,
  Edit3,
  Upload,
  Settings,
  ChevronLeft,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  UserPlus,
  Package,
  Eye,
  Image,
  Flower2,
  Candy,
  CakeSlice,
  Citrus,
  Coffee,
  LayoutGrid,
  BadgeCheck,
  MessageSquare,
  ClipboardList,
  Save,
  FileText,
  Wallet,
  ListChecks,
} from "lucide-react";

const C = {
  dark: "#880D1E",
  red: "#DD2D4A",
  pink: "#F26A8D",
  light: "#F49CBB",
  bg: "#FFF5F7",
  text: "#3D0A14",
  textL: "#6B2040",
};

const fixImg = (url: string) => url.replace(/^\/uploads\//, "/api/uploads/");
const isIconUrl = (icon: string) => icon.startsWith("/") || icon.startsWith("http");
const CatIconRender = ({ icon, className }: { icon: string; className?: string }) => {
  if (isIconUrl(icon)) return <img src={icon} alt="" className={className || "w-7 h-7 object-contain"} />;
  const IC = catIconMap[icon] || Sparkles;
  return <IC className={className || "w-7 h-7 text-white"} />;
};

const gradH = "linear-gradient(90deg, #DD2D4A, #F26A8D)";
const gradV = "linear-gradient(135deg, #880D1E 0%, #DD2D4A 40%, #F26A8D 70%, #F49CBB 100%)";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section id={id} ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, staggerChildren: 0.08 } } }} className={className}>
      {children}
    </motion.section>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div variants={fadeUp} custom={0} className="text-center mb-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: C.dark }}>{title}</h2>
      <div className="w-16 h-1 rounded-full mx-auto mb-4" style={{ background: gradH }} />
      <p className="text-base max-w-md mx-auto" style={{ color: C.textL }}>{subtitle}</p>
    </motion.div>
  );
}

type CartItem = {
  idx: number;
  qty: number;
  name: string;
  price: string;
  img: string;
};

type Product = {
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  img: string;
  desc: string;
  cat: string;
};
type HeroSlide = { img: string; badge: string; t1: string; t2: string; t3: string; desc: string; btn: string; };
type Order = { id: string; items: { name: string; img: string; qty: number; price: string }[]; total: number; status: string; date: string; address: string; phone: string; };
type ContactMessage = { id: string; name: string; phone: string; subject: string; message: string; date: string; reply: string; replyDate: string; };
type CheckoutFieldConfig = { id: string; label: string; placeholder: string; type: "text" | "tel" | "textarea" | "number"; required: boolean; width: "full" | "half"; dir: "rtl" | "ltr"; enabled: boolean; };


const DEFAULT_CHECKOUT_FIELDS: CheckoutFieldConfig[] = [
  { id: "name", label: "نام و نام خانوادگی", placeholder: "سارا محمدی", type: "text", required: true, width: "half", dir: "rtl", enabled: true },
  { id: "phone", label: "شماره تماس", placeholder: "۰۹۱۲XXXXXXXX", type: "tel", required: true, width: "half", dir: "ltr", enabled: true },
  { id: "address", label: "آدرس کامل", placeholder: "خیابان، کوچه، پلاک، واحد...", type: "textarea", required: true, width: "full", dir: "rtl", enabled: true },
  { id: "postal", label: "کد پستی", placeholder: "XXXXXXXXXX", type: "text", required: false, width: "half", dir: "ltr", enabled: true },
  { id: "city", label: "استان / شهر", placeholder: "تهران", type: "text", required: false, width: "half", dir: "rtl", enabled: true },
  { id: "note", label: "توضیحات سفارش", placeholder: "توضیحات اضافی (اختیاری)", type: "textarea", required: false, width: "full", dir: "rtl", enabled: true },
];

const defaultProducts: Product[] = [
  { name: "عروسک گل رز فانتزی", price: "۲۴۵,۰۰۰", oldPrice: "۳۲۰,۰۰۰", discount: "۲۳٪", img: "/products/rose.jpg", desc: "عروسک گل رز فانتزی با طراحی بامزه و ناز، بهترین هدیه برای عزیزانتان. این عروسک با پارچه‌های نرم و ضد حساسیت ساخته شده و مناسب برای همه سنین است.", cat: "عروسک گل" },
  { name: "عروسک گیلاس کیوت", price: "۱۸۵,۰۰۰", oldPrice: "۲۴۰,۰۰۰", discount: "۲۳٪", img: "/products/cherry.webp", desc: "عروسک گیلاس با ظاهر شیرین و جذاب، یک انتخاب عالی برای هدیه دادن. جنس نرم و لطیف و سایز مناسب برای حمل آسان.", cat: "عروسک میوه" },
  { name: "عروسک کیک تولد", price: "۲۶۰,۰۰۰", oldPrice: "۳۵۰,۰۰۰", discount: "۲۶٪", img: "/products/cake.jpg", desc: "عروسک کیک تولد با طراحی ویژه و رنگ‌های شاد، یک هدیه بی‌نظیر برای روز تولد عزیزانتان. شمع و تزئینات جذاب.", cat: "عروسک تولد" },
  { name: "عروسک لیمو بامزه", price: "۱۹۵,۰۰۰", oldPrice: "۲۶۰,۰۰۰", discount: "۲۵٪", img: "/products/lemon.jpg", desc: "عروسک لیمو با لبخند بامزه و رنگ زرد شاداب، یک دوست کوچک برای تزئین اتاق یا هدیه دادن. بسیار نرم و دلنشین.", cat: "عروسک میوه" },
  { name: "عروسک مارشمالو دوتایی", price: "۲۱۰,۰۰۰", oldPrice: "۲۹۰,۰۰۰", discount: "۲۸٪", img: "/products/marshmallow.jpg", desc: "ست دو تایی عروسک مارشمالو به رنگ صورتی و سفید، یک هدیه فوق‌العاده ناز و عاشقانه. پارچه بسیار نرم و ضد حساسیت.", cat: "عروسک خوراکی" },
  { name: "عروسک گلدان گل", price: "۲۳۰,۰۰۰", oldPrice: "۳۱۰,۰۰۰", discount: "۲۶٪", img: "/products/flower-pot.jpg", desc: "عروسک گلدان با گل‌های صورتی رنگ، یک هدیه زیبا و ماندگار. مناسب برای تزئین میز کار یا اتاق خواب.", cat: "عروسک گل" },
  { name: "عروسک بروکلی فانتزی", price: "۱۷۵,۰۰۰", oldPrice: "۲۳۰,۰۰۰", discount: "۲۴٪", img: "/products/brocoli.jpg", desc: "عروسک بروکلی با لبخند بامزه و رنگ سبز طبیعی، یک هدیه خاص و متفاوت. پارچه نرم و ضد حساسیت، مناسب تزئین و هدیه.", cat: "عروسک خوراکی" },
  { name: "عروسک پرتزل شیرین", price: "۱۹۰,۰۰۰", oldPrice: "۲۵۰,۰۰۰", discount: "۲۴٪", img: "/products/pretzel.jpg", desc: "عروسک پرتزل با طراحی خلاقانه و رنگ طلایی، یک هدیه جذاب و خاص. جنس نرم و لطیف با سایز مناسب حمل آسان.", cat: "عروسک خوراکی" },
  // === آرایشی ===
  { name: "ست آرایشی روزانه صورتی", price: "۳۸۵,۰۰۰", oldPrice: "۴۸۰,۰۰۰", discount: "۲۰٪", img: "/products/cosmetic-daily-pink.jpg", desc: "ست کامل آرایشی روزانه شامل رژ لب، کرم پودر، سایه و رژ گونه با رنگ‌های صورتی. مناسب برای هدیه دادن.", cat: "آرایشی" },
  { name: "پالت رژ لب مات", price: "۲۸۵,۰۰۰", oldPrice: "۳۵۰,۰۰۰", discount: "۱۹٪", img: "/products/lip-palette-matte.webp", desc: "پالت رژ لب مات با پوشش بالا و ماندگاری طولانی. رنگ‌های زیبا و طبیعی مناسب هر سلیقه‌ای.", cat: "آرایشی" },
  { name: "ست مانیکور کلاسیک", price: "۴۲۰,۰۰۰", oldPrice: "۵۵۰,۰۰۰", discount: "۲۴٪", img: "/products/manicure-classic.jpg", desc: "ست مانیکور شامل ناخن‌گیر، سوهان، کرم ناخن و لاک کلاسیک. تکمیل عالی برای روزهای خاص.", cat: "آرایشی" },
  { name: "پالت سایه چشم شیک", price: "۳۱۵,۰۰۰", oldPrice: "۴۰۰,۰۰۰", discount: "۲۱٪", img: "/products/eyeshadow-palette.webp", desc: "پالت سایه چشم شیک با ۱۲ رنگ متمایز. پیگمنت‌های مات و شیمری برای آرایش‌های حرفه‌ای.", cat: "آرایشی" },
  { name: "رژ گونه رز گلد", price: "۱۹۵,۰۰۰", oldPrice: "۲۶۰,۰۰۰", discount: "۲۵٪", img: "/products/blush-rose-gold.jpg", desc: "رژ گونه با ذرات شیمر. رنگ صورتی طبیعی برای شادابی پوست. پودری و ماندگار.", cat: "آرایشی" },
  { name: "ست برس آرایشی حرفه‌ای", price: "۲۹۵,۰۰۰", oldPrice: "۳۸۰,۰۰۰", discount: "۲۲٪", img: "/products/makeup-brushes.jpg", desc: "ست کامل برس آرایشی با دسته شیک. برس‌های نرم و حرفه‌ای برای آرایش حرفه‌ای.", cat: "آرایشی" },
  { name: "ست مراقبت پوست", price: "۴۵۰,۰۰۰", oldPrice: "۵۹۰,۰۰۰", discount: "۲۴٪", img: "/products/skincare-set.webp", desc: "ست مراقبت پوست شامل سرم هیالورون، مرطوب‌کننده و ماسک صورت. مناسب برای روتین روزانه.", cat: "آرایشی" },
  // === ماگ ===
  { name: "ماگ عاشقانه صورتی", price: "۱۶۵,۰۰۰", oldPrice: "۲۲۰,۰۰۰", discount: "۲۵٪", img: "/products/mug-love-pink.jpg", desc: "ماگ سرامیک عاشقانه با طراحی صورتی و دسته قلبی. مناسب برای هدیه دادن به عزیزان. قابل شستشو در ماشین ظرفشویی.", cat: "ماگ" },
  { name: "ماگ متن انگلیسی کیوت", price: "۱۴۵,۰۰۰", oldPrice: "۱۹۵,۰۰۰", discount: "۲۶٪", img: "/products/mug-english-cute.jpg", desc: "ماگ سرامیک با متن انگلیسی زیبا و دلنشین. یک هدیه عالی برای دوستان و همکاران.", cat: "ماگ" },
  { name: "ماگ ست هدیه فانتزی", price: "۲۵۰,۰۰۰", oldPrice: "۳۴۰,۰۰۰", discount: "۲۴٪", img: "/products/mug-giftset.jpg", desc: "ماگ فانتزی با جعبه شیک و تزئینات خاص. مناسب برای تولد و هدیه‌های خاص. شامل قاشق و شیرینی.", cat: "ماگ" },
  { name: "ماگ مینیمالیستی", price: "۱۷۵,۰۰۰", oldPrice: "۲۳۰,۰۰۰", discount: "۲۴٪", img: "/products/mug-minimalist.jpg", desc: "ماگ مینیمالیستی رنگ کرم با طراحی ساده و شیک. مناسب برای محیط کار و استفاده روزانه.", cat: "ماگ" },
  { name: "ماگ سفری", price: "۱۹۵,۰۰۰", oldPrice: "۲۷۰,۰۰۰", discount: "۲۸٪", img: "/products/mug-travel.jpg", desc: "ماگ سفری با درب ضد نشت مناسب برای مسافرت و استفاده روزمره. عایق دما و ضد نشت.", cat: "ماگ" },
  { name: "ماگ نوردی", price: "۲۲۰,۰۰۰", oldPrice: "۳۰۰,۰۰۰", discount: "۲۷٪", img: "/products/mug-nordic.jpg", desc: "ماگ طراحی نوردی با استوانه مخصوص. حس گرما و راحتی را به شما هدیه می‌دهد. مناسب برای شب‌های سرد.", cat: "ماگ" },
];

const defaultReviews: ReviewItem[] = [
  { name: "سارا م.", text: "عروسک گل رز رو خریدم، همونطور که تو عکس بود. بسته‌بندی هم خیلی شیک بود و سریع رسید.", rating: 5 },
  { name: "نیلوفر ر.", text: "عروسک کیک تولد رو برای دوستم هدیه گرفتم. فوق‌العاده بامزه بود و خیلی راضی هستم.", rating: 5 },
  { name: "مینا ک.", text: "کیفیت عروسک‌ها عالیه. مارشمالو دوتایی رو خریدم خیلی ناز بودن. حتماً دوباره سفارش میدم.", rating: 5 },
];

type CatItem = { n: string; icon: string; };
type FeatureItem = { icon: string; t: string; d: string; };
type ReviewItem = { name: string; text: string; rating: number; };

const catIconMap: Record<string, React.ComponentType<any>> = {
  candy: Candy, flower: Flower2, citrus: Citrus, cake: CakeSlice, sparkle: Sparkles, coffee: Coffee, gift: Gift, heart: Heart, cherry: Cherry, star: Star, package: Package, truck: Truck,
};
const catIconList = [
  { key: "candy", label: "خوراکی" }, { key: "flower", label: "گل" }, { key: "citrus", label: "میوه" }, { key: "cake", label: "تولد" }, { key: "sparkle", label: "درخشش" }, { key: "coffee", label: "ماگ" }, { key: "gift", label: "کادو" }, { key: "heart", label: "قلب" }, { key: "cherry", label: "گیلاس" }, { key: "star", label: "ستاره" }, { key: "package", label: "بسته" }, { key: "truck", label: "ارسال" },
];

const defaultCategories: CatItem[] = [
  { n: "عروسک خوراکی", icon: "candy" },
  { n: "عروسک گل", icon: "flower" },
  { n: "عروسک میوه", icon: "citrus" },
  { n: "عروسک تولد", icon: "cake" },
  { n: "آرایشی", icon: "sparkle" },
  { n: "ماگ", icon: "coffee" },
];

const defaultFeatures: FeatureItem[] = [
  { icon: "🚚", t: "ارسال رایگان", d: "برای خریدهای بالای ۵۰۰ هزار تومان" },
  { icon: "🛡️", t: "ضمانت اصالت", d: "تمامی محصولات ما اصل و دارای ضمانت هستند" },
  { icon: "↩️", t: "بازگشت آسان", d: "امکان بازگشت کالا تا ۷ روز پس از دریافت" },
  { icon: "🎧", t: "پشتیبانی ۲۴/۷", d: "تیم پشتیبانی ما همیشه در کنار شماست" },
];

const defaultHeroSlides: HeroSlide[] = [
  { img: "/slides/festival-1920x900.jpg", badge: "فروشگاه آنلاین چیکوبری", t1: "عروسک‌های", t2: "فانتزی ", t3: "چیکوبری", desc: "مجموعه‌ای از بامزه‌ترین عروسک‌های فانتزی با تضمین کیفیت و قیمت مناسب.", btn: "مشاهده محصولات" },
  { img: "/slides/IMG_2597.png", badge: "پیشنهاد ویژه", t1: "هدیه‌ای", t2: "خاص برای ", t3: "عزیزانتان", desc: "با ست‌های هدیه چیکوبری، بهترین لحظات رو به عزیزانتون هدیه بدید.", btn: "خرید ست هدیه" },
  { img: "/slides/rooftop-desktop-1270x704.jpg", badge: "جدیدترین محصولات", t1: "عروسک‌های", t2: "ناز و ", t3: "دلنشین", desc: "از عروسک‌های خوراکی تا عروسک‌های گل، هر سلیقه‌ای رو پوشش میدیم.", btn: "بیشتر ببینید" },
];


const PRODUCTS_VERSION = "v3";
const SLIDES_VERSION = "v8";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const relatedRef = useRef<HTMLDivElement>(null);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<"home" | "contact" | "product" | "archive" | "cart" | "checkout" | "about" | "user" | "admin">("home");
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [formSent, setFormSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", subject: "", message: "" });
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [replyingMsgId, setReplyingMsgId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("همه");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [checkoutForm, setCheckoutForm] = useState<Record<string, string>>({});
  const [checkoutErrors, setCheckoutErrors] = useState<Record<string, string>>({});
  const [checkoutFields, setCheckoutFields] = useState<CheckoutFieldConfig[]>(DEFAULT_CHECKOUT_FIELDS);
  const [editFormField, setEditFormField] = useState<CheckoutFieldConfig | null>(null);
  const [showFormFieldForm, setShowFormFieldForm] = useState(false);
  const [payMethod, setPayMethod] = useState<string>("online");
  const [paySettings, setPaySettings] = useState<{
    onlineEnabled: boolean; onlineTitle: string; onlineDesc: string; gatewayMerchant: string;
    cardEnabled: boolean; cardTitle: string; cardDesc: string; cardNumber: string; cardHolder: string; bankName: string;
    codEnabled: boolean; codTitle: string; codDesc: string;
    shippingFreeMin: number; shippingCost: number;
  }>({
    onlineEnabled: true, onlineTitle: "پرداخت آنلاین (درگاه پرداخت)", onlineDesc: "پرداخت سریع و امن از طریق درگاه زرین‌پال", gatewayMerchant: "",
    cardEnabled: true, cardTitle: "کارت به کارت", cardDesc: "پرداخت از طریق انتقال وجه به شماره کارت ما", cardNumber: "", cardHolder: "", bankName: "",
    codEnabled: true, codTitle: "پرداخت در محل", codDesc: "پرداخت هنگام تحویل سفارش",
    shippingFreeMin: 500000, shippingCost: 45000,
  });
  const [currency, setCurrency] = useState<string>(() => { try { return JSON.parse(localStorage.getItem("cb_currency") || '"toman"'); } catch { return "toman"; } });
  const [dollarRate, setDollarRate] = useState<number>(() => { try { return JSON.parse(localStorage.getItem("cb_dollar_rate") || "85000"); } catch { return 85000; } });
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [editingSlideIdx, setEditingSlideIdx] = useState<number | null>(null);
  const [showSlideForm, setShowSlideForm] = useState(false);
  const [slideForm, setSlideForm] = useState<HeroSlide>({ img: "", badge: "", t1: "", t2: "", t3: "", desc: "", btn: "" });
  const [cats, setCats] = useState<CatItem[]>(defaultCategories);
  const [features, setFeatures] = useState<FeatureItem[]>(defaultFeatures);
  const [reviews, setReviews] = useState<ReviewItem[]>(defaultReviews);
  const [adminSection, setAdminSection] = useState<string>("dashboard");
  const [catForm, setCatForm] = useState<CatItem>({ n: "", icon: "" });
  const [editingCatIdx, setEditingCatIdx] = useState<number | null>(null);
  const [featForm, setFeatForm] = useState<FeatureItem>({ icon: "", t: "", d: "" });
  const [editingFeatIdx, setEditingFeatIdx] = useState<number | null>(null);
  const [revForm, setRevForm] = useState<ReviewItem>({ name: "", text: "", rating: 5 });
  const [editingRevIdx, setEditingRevIdx] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [catIconUploading, setCatIconUploading] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [prodForm, setProdForm] = useState<Partial<Product>>({ name: "", price: "", oldPrice: "", discount: "", img: "", desc: "", cat: "" });
  const [showProdForm, setShowProdForm] = useState(false);
  const [editingProductIdx, setEditingProductIdx] = useState<number | null>(null);
  const [prodUploading, setProdUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminFabOpen, setAdminFabOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login"|"register">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPass2, setRegPass2] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUserPhone, setEditingUserPhone] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<{name:string;phone:string;email:string;pass:string;pass2:string}>({name:"",phone:"",email:"",pass:"",pass2:""});
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<{name:string;email:string;pass:string;pass2:string}>({name:"",email:"",pass:"",pass2:""});
  const [editingOrderIdx, setEditingOrderIdx] = useState<number | null>(null);
  const [editAddrVal, setEditAddrVal] = useState("");
  const [featIconUploading, setFeatIconUploading] = useState(false);
  const [siteAbout, setSiteAbout] = useState({ title: "درباره چیکوبری", desc: "ما با عشق و علاقه به دنیای عروسک‌ها، مجموعه‌ای از بامزه‌ترین و باکیفیت‌ترین عروسک‌های فانتزی را برای شما گردآوری کرده‌ایم تا لحظات شادی را به عزیزانتان هدیه بدهیم.", story: "چیکوبری از یک علاقه ساده به عروسک‌های فانتزی شروع شد. ما متوجه شدیم که پیدا کردن عروسک‌های ناز و باکیفیت کار ساده‌ای نیست و بسیاری از افراد برای خرید هدیه‌های خاص دچار مشکل هستند.\nبه همین دلیل تصمیم گرفتیم یک فروشگاه تخصصی برای عروسک‌های فانتزی راه‌اندازی کنیم. ما هر محصول را با دقت انتخاب می‌کنیم تا مطمئن باشیم کیفیت و زیبایی آن با استانداردهای بالای چیکوبری همخوانی دارد.\nامروز چیکوبری به یکی از محبوب‌ترین فروشگاه‌های اینستاگرامی در حوزه عروسک‌های فانتزی تبدیل شده و افتخار می‌کنیم که هزاران مشتری راضی داریم.", mission: "ارائه باکیفیت‌ترین عروسک‌های فانتزی با قیمت مناسب و ارسال سریع به سراسر ایران، تا لبخند را به چهره شما و عزیزانتان بیاوریم." });
  const [siteHeader, setSiteHeader] = useState({
    brandName: "چیکوبری",
    logoUrl: "/logo.png",
    instaLabel: "پیج اینستاگرام",
    instaUrl: "https://www.instagram.com/chicoberry.onlineshop",
    showInsta: true,
    navItems: [
      { label: "خانه", url: "/" },
      { label: "محصولات", url: "/archive" },
      { label: "درباره ما", url: "/about" },
      { label: "تماس با ما", url: "/contact" },
    ],
  });
  const [siteContact, setSiteContact] = useState({ phone: "۰۹۱۲-XXX-XXXX", instagram: "@chicoberry.onlineshop", instagramUrl: "https://www.instagram.com/chicoberry.onlineshop", email: "info@chicoberry.ir", hours: "۹ صبح تا ۹ شب", hoursSub: "همه روزه" });
  const [siteFooter, setSiteFooter] = useState<{
    desc: string; copyright: string;
    col1Title: string; col2Title: string; col3Title: string;
    quickLinks: { label: string; url: string }[];
    contactItems: { label: string; value: string; icon: string; link: string }[];
    copyrightText: string;
  }>({
    desc: "فروشگاه آنلاین چیکوبری، مرجع خرید عروسک‌های فانتزی و کادویی با تضمین کیفیت و قیمت مناسب.",
    copyright: "چیکوبری",
    col1Title: "درباره ما",
    col2Title: "دسترسی سریع",
    col3Title: "ارتباط با ما",
    quickLinks: [
      { label: "خانه", url: "/" },
      { label: "محصولات", url: "/archive" },
      { label: "سبد خرید", url: "/cart" },
      { label: "درباره ما", url: "/about" },
      { label: "تماس با ما", url: "/contact" },
    ],
    contactItems: [
      { label: "اینستاگرام", value: "@chicoberry.onlineshop", icon: "instagram", link: "https://www.instagram.com/chicoberry.onlineshop" },
      { label: "تلفن", value: "۰۹۱۲-XXX-XXXX", icon: "phone", link: "" },
      { label: "ایمیل", value: "info@chicoberry.ir", icon: "email", link: "mailto:info@chicoberry.ir" },
    ],
    copyrightText: "تمامی حقوق محفوظ است © چیکوبری 2026",
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      try { const u = localStorage.getItem("cb_user"); if (u) { const d = JSON.parse(u); if (d.name) { setIsLoggedIn(true); setUserName(d.name); setUserPhone(d.phone || ""); setUserEmail(d.email || ""); } } } catch {}
      try { const o = localStorage.getItem("cb_orders"); if (o) setUserOrders(JSON.parse(o)); } catch {}
      try { const a = localStorage.getItem("cb_site_about"); if (a) setSiteAbout(JSON.parse(a)); } catch {}
      try { const h = localStorage.getItem("cb_site_header"); if (h) { const hp = JSON.parse(h); if (hp.navItems && hp.navItems[0]?.page) { hp.navItems = hp.navItems.map((n: any) => ({ label: n.label, url: n.page === "home" ? "/" : n.page === "archive" ? "/archive" : n.page === "about" ? "/about" : n.page === "contact" ? "/contact" : n.page === "cart" ? "/cart" : "/" })); } setSiteHeader(p => ({ ...p, ...hp, navItems: hp.navItems || p.navItems })); } } catch {}
      try { const c = localStorage.getItem("cb_site_contact"); if (c) setSiteContact(JSON.parse(c)); } catch {}
      try { const f = localStorage.getItem("cb_site_footer"); if (f) { const parsed = JSON.parse(f); setSiteFooter(p => ({ ...p, ...parsed, quickLinks: parsed.quickLinks || p.quickLinks, col1Title: parsed.col1Title || p.col1Title, col2Title: parsed.col2Title || p.col2Title, col3Title: parsed.col3Title || p.col3Title, contactItems: parsed.contactItems || p.contactItems, copyrightText: parsed.copyrightText || p.copyrightText })); } } catch {}
      try { const m = localStorage.getItem("cb_messages"); if (m) setContactMessages(JSON.parse(m)); } catch {}
      try { const ps = localStorage.getItem("cb_pay_settings"); if (ps) setPaySettings(p => ({ ...p, ...JSON.parse(ps) })); } catch {}
    }
  }, []);
  const doLogin = () => {
    if (!loginPhone || !loginPass) { setToast(""); setTimeout(() => setToast("شماره تماس و رمز عبور را وارد کنید"), 10); return; }
    // Admin login check
    if (loginPhone.toLowerCase().trim() === "admin" && loginPass.trim() === "chicoberry2024") {
      setIsAdmin(true); localStorage.setItem("cb_admin", "1"); setShowAuth(false); setCurrentPage("admin"); setLoginPhone(""); setLoginPass(""); window.scrollTo({ top: 0, behavior: "smooth" }); setToast(""); setTimeout(() => setToast("خوش آمدید، مدیریت!"), 10); return;
    }
    // Normal user login
    try {
      const u = localStorage.getItem("cb_user_" + loginPhone);
      if (u) { const d = JSON.parse(u); if (d.pass === loginPass) { setIsLoggedIn(true); setUserName(d.name); setUserPhone(loginPhone); setUserEmail(d.email || ""); localStorage.setItem("cb_user", JSON.stringify({ name: d.name, phone: loginPhone, email: d.email || "" })); setShowAuth(false); setLoginPhone(""); setLoginPass(""); navTo("user"); return; } }
    } catch {}
    setToast(""); setTimeout(() => setToast("شماره تماس یا رمز عبور اشتباه است"), 10);
  };
  const doRegister = () => {
    if (!regName || !regPhone || !regPass) { setToast(""); setTimeout(() => setToast("تمام فیلدها را پر کنید"), 10); return; }
    if (regPass !== regPass2) { setToast(""); setTimeout(() => setToast("رمز عبور متفاوت است"), 10); return; }
    try {
      const u = localStorage.getItem("cb_user_" + regPhone);
      if (u) { setToast(""); setTimeout(() => setToast("این شماره قبلاً ثبت شده"), 10); return; }
      localStorage.setItem("cb_user_" + regPhone, JSON.stringify({ name: regName, phone: regPhone, pass: regPass }));
      setIsLoggedIn(true); setUserName(regName); setUserPhone(regPhone); setUserEmail("");
      localStorage.setItem("cb_user", JSON.stringify({ name: regName, phone: regPhone, email: "" }));
      setShowAuth(false); setRegName(""); setRegPhone(""); setRegPass(""); setRegPass2("");
      navTo("user");
    } catch {}
  };
  const doLogout = () => { setIsLoggedIn(false); setUserName(""); setUserPhone(""); setUserEmail(""); setShowUserPanel(false); localStorage.removeItem("cb_user"); };
  const saveUserProfile = () => {
    if (!profileForm.name) { setToast(""); setTimeout(() => setToast("نام نمی‌تواند خالی باشد"), 10); return; }
    if (profileForm.pass && profileForm.pass !== profileForm.pass2) { setToast(""); setTimeout(() => setToast("رمز عبور مطابقت ندارد"), 10); return; }
    try {
      const uKey = "cb_user_" + userPhone;
      const uData = JSON.parse(localStorage.getItem(uKey) || "{}");
      uData.name = profileForm.name;
      uData.email = profileForm.email;
      if (profileForm.pass) uData.pass = profileForm.pass;
      localStorage.setItem(uKey, JSON.stringify(uData));
      localStorage.setItem("cb_user", JSON.stringify({ name: uData.name, phone: userPhone, email: uData.email || "" }));
      setUserName(profileForm.name);
      setUserEmail(profileForm.email);
      setEditingProfile(false);
      setToast(""); setTimeout(() => setToast("پروفایل بروزرسانی شد"), 10);
    } catch {}
  };
  const startEditProfile = () => { setProfileForm({ name: userName, email: userEmail, pass: "", pass2: "" }); setEditingProfile(true); };
  const saveOrderAddress = (orderGlobalIdx: number) => {
    if (!editAddrVal.trim()) { setToast(""); setTimeout(() => setToast("آدرس نمی‌تواند خالی باشد"), 10); return; }
    const ns = [...userOrders]; ns[orderGlobalIdx].address = editAddrVal.trim();
    setUserOrders(ns); localStorage.setItem("cb_orders", JSON.stringify(ns));
    setEditingOrderIdx(null); setEditAddrVal("");
    setToast(""); setTimeout(() => setToast("آدرس سفارش بروزرسانی شد"), 10);
  };
  const sendContactMessage = () => {
    if (!contactForm.name || !contactForm.message) { setToast(""); setTimeout(() => setToast("نام و پیام الزامی است"), 10); return; }
    const msg: ContactMessage = { id: "MSG-" + Date.now().toString(36).toUpperCase(), name: contactForm.name, phone: contactForm.phone || (isLoggedIn ? userPhone : ""), subject: contactForm.subject, message: contactForm.message, date: new Date().toLocaleDateString("fa-IR"), reply: "", replyDate: "" };
    const nm = [msg, ...contactMessages];
    setContactMessages(nm); localStorage.setItem("cb_messages", JSON.stringify(nm));
    setContactForm({ name: "", phone: "", subject: "", message: "" }); setFormSent(true);
  };
  const saveReply = (msgId: string) => {
    if (!replyText.trim()) { setToast(""); setTimeout(() => setToast("پاسخ نمی‌تواند خالی باشد"), 10); return; }
    const nm = contactMessages.map(m => m.id === msgId ? { ...m, reply: replyText.trim(), replyDate: new Date().toLocaleDateString("fa-IR") } : m);
    setContactMessages(nm); localStorage.setItem("cb_messages", JSON.stringify(nm));
    setReplyingMsgId(null); setReplyText("");
    setToast(""); setTimeout(() => setToast("پاسخ ارسال شد"), 10);
  };
  const saveCheckout = () => {
    const errors: Record<string, string> = {};
    checkoutFields.filter(f => f.required && f.enabled).forEach(f => {
      if (!checkoutForm[f.id] || !checkoutForm[f.id].trim()) errors[f.id] = f.label + " الزامی است";
    });
    if (Object.keys(errors).length > 0) { setCheckoutErrors(errors); return false; }
    setCheckoutErrors({});
    if (!isLoggedIn) return false;
    const order: Order = {
      id: "CB-" + Date.now().toString(36).toUpperCase(),
      items: cart.map(item => ({ name: item.name, img: item.img, qty: item.qty, price: item.price })),
      total: cartTotal + (cartTotal >= paySettings.shippingFreeMin ? 0 : paySettings.shippingCost),
      status: "در حال پردازش",
      date: new Date().toLocaleDateString("fa-IR"),
      address: checkoutFields.filter(f => checkoutForm[f.id]).map(f => f.label + ": " + checkoutForm[f.id]).join(" | "),
      phone: checkoutForm.phone,
    };
    const newOrders = [order, ...userOrders];
    setUserOrders(newOrders);
    localStorage.setItem("cb_orders", JSON.stringify(newOrders));
    setCart([]);
    setCheckoutForm(Object.fromEntries(checkoutFields.map(f => [f.id, ""])));
    setCheckoutStep(1);
    return true;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      try { const v = localStorage.getItem("cb_slides_ver"); if (v !== SLIDES_VERSION) { localStorage.removeItem("cb_hero_slides"); localStorage.setItem("cb_slides_ver", SLIDES_VERSION); } else { const s = localStorage.getItem("cb_hero_slides"); if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) setHeroSlides(p); } } } catch {}
      try { const v = localStorage.getItem("cb_products_ver"); if (v !== PRODUCTS_VERSION) { localStorage.removeItem("cb_products"); localStorage.setItem("cb_products_ver", PRODUCTS_VERSION); } else { const s = localStorage.getItem("cb_products"); if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) setProducts(p); } } } catch {}
      try { const a = localStorage.getItem("cb_admin"); if (a === "1") setIsAdmin(true); } catch {}
      try { const cf = localStorage.getItem("cb_checkout_fields"); if (cf) { const p = JSON.parse(cf); if (Array.isArray(p) && p.length > 0 && p[0].id !== undefined) { setCheckoutFields(p); const init: Record<string, string> = {}; p.forEach((f: CheckoutFieldConfig) => { init[f.id] = ""; }); setCheckoutForm(init); } else { const init: Record<string, string> = {}; DEFAULT_CHECKOUT_FIELDS.forEach(f => { init[f.id] = ""; }); setCheckoutForm(init); } } else { const init: Record<string, string> = {}; DEFAULT_CHECKOUT_FIELDS.forEach(f => { init[f.id] = ""; }); setCheckoutForm(init); } } catch {}
    }
  }, []);
  useEffect(() => { if (typeof window !== "undefined" && products.length > 0) localStorage.setItem("cb_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { if (typeof window !== "undefined" && heroSlides.length > 0) localStorage.setItem("cb_hero_slides", JSON.stringify(heroSlides)); }, [heroSlides]);
  useEffect(() => { if (typeof window !== "undefined") { try { const c = localStorage.getItem("cb_categories"); if (c) { const p = JSON.parse(c); if (Array.isArray(p) && p.length > 0 && (catIconMap[p[0].icon] || (p[0].icon && (p[0].icon.startsWith("/") || p[0].icon.startsWith("http"))))) setCats(p); else { localStorage.removeItem("cb_categories"); } } } catch {} } }, []);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("cb_categories", JSON.stringify(cats)); }, [cats]);
  useEffect(() => { if (typeof window !== "undefined") { try { const f = localStorage.getItem("cb_features"); if (f) { const p = JSON.parse(f); if (Array.isArray(p) && p.length > 0 && p[0].icon !== undefined) setFeatures(p); else { localStorage.removeItem("cb_features"); } } } catch {} } }, []);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("cb_features", JSON.stringify(features)); }, [features]);
  useEffect(() => { if (typeof window !== "undefined") { try { const r = localStorage.getItem("cb_reviews"); if (r) { const p = JSON.parse(r); if (Array.isArray(p) && p.length > 0 && p[0].rating !== undefined) setReviews(p); else { localStorage.removeItem("cb_reviews"); } } } catch {} } }, []);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("cb_reviews", JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const t = setInterval(() => setHeroSlideIdx(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [heroSlides.length]);
  const addSlide = () => { setSlideForm({ img: "", badge: "", t1: "", t2: "", t3: "", desc: "", btn: "" }); setEditingSlideIdx(null); setShowSlideForm(true); };
  const editSlide = (i: number) => { setSlideForm({ ...heroSlides[i] }); setEditingSlideIdx(i); setShowSlideForm(true); };
  const saveSlide = () => {
    if (!slideForm.img) { setToast(""); setTimeout(() => setToast("ابتدا عکس اسلاید را آپلود کنید"), 10); return; }
    if (editingSlideIdx !== null) {
      const ns = [...heroSlides]; ns[editingSlideIdx] = { ...slideForm }; setHeroSlides(ns);
    } else {
      setHeroSlides(p => [...p, { ...slideForm }]);
    }
    setShowSlideForm(false);
  };
  const deleteSlide = (i: number) => { if (!confirm("حذف شود؟")) return; setHeroSlides(p => p.filter((_, j) => j !== i)); if (heroSlideIdx >= heroSlides.length - 1) setHeroSlideIdx(Math.max(0, heroSlides.length - 2)); };
  const moveSlide = (i: number, dir: -1 | 1) => { const ni = i + dir; if (ni < 0 || ni >= heroSlides.length) return; const ns = [...heroSlides]; [ns[i], ns[ni]] = [ns[ni], ns[i]]; setHeroSlides(ns); };
  const uploadSlideImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setSlideForm(p => ({ ...p, img: localUrl }));
    setUploading(true);
    e.target.value = "";
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.url) { setSlideForm(p => ({ ...p, img: data.url })); setTimeout(() => URL.revokeObjectURL(localUrl), 3000); }
    } catch { setToast(""); setTimeout(() => setToast("خطا در آپلود عکس"), 10); } finally { setUploading(false); }
  };
  const uploadProdImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setProdForm(p => ({ ...p, img: localUrl }));
    setProdUploading(true);
    e.target.value = "";
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.url) { setProdForm(p => ({ ...p, img: data.url })); setTimeout(() => URL.revokeObjectURL(localUrl), 3000); }
    } catch { setToast(""); setTimeout(() => setToast("خطا در آپلود عکس"), 10); } finally { setProdUploading(false); }
  };
  const saveProduct = () => {
    if (!prodForm.name || !prodForm.price || !prodForm.cat || !prodForm.img) { setToast(""); setTimeout(() => setToast("همه فیلدها الزامی است"), 10); return; }
    if (editingProductIdx !== null) {
      setProducts(p => p.map((pr, i) => i === editingProductIdx ? { ...prodForm } as Product : pr));
      setToast(""); setTimeout(() => setToast("محصول ویرایش شد!"), 10);
    } else {
      setProducts(p => [...p, prodForm as Product]);
      setToast(""); setTimeout(() => setToast("محصول اضافه شد!"), 10);
    }
    setProdForm({ name: "", price: "", oldPrice: "", discount: "", img: "", desc: "", cat: "" });
    setEditingProductIdx(null);
    setShowProdForm(false);
  };
  const editProduct = (i: number) => {
    setProdForm({ ...products[i] });
    setEditingProductIdx(i);
    setShowProdForm(true);
  };
  const deleteProduct = (i: number) => { if (!confirm("محصول حذف شود؟")) return; setProducts(p => p.filter((_, j) => j !== i)); setToast(""); setTimeout(() => setToast("محصول حذف شد"), 10); };
  
  const uploadCatIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setCatIconUploading(true);
    e.target.value = "";
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.url) setCatForm(p => ({ ...p, icon: data.url }));
    } catch { setToast(""); setTimeout(() => setToast("خطا در آپلود آیکون"), 10); } finally { setCatIconUploading(false); }
  };

  const logoutAdmin = () => { setIsAdmin(false); setCurrentPage("home"); localStorage.removeItem("cb_admin"); window.history.pushState({ page: "home" }, "", "/"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const [adminUsers, setAdminUsers] = useState<{name:string;phone:string;email:string;pass:string}[]>([]);
  const loadAdminUsers = () => { try { const users: {name:string;phone:string;email:string;pass:string}[] = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith("cb_user_")) { try { const d = JSON.parse(localStorage.getItem(k) || "{}"); if (d.name && d.phone) users.push({ name: d.name, phone: d.phone, email: d.email || "", pass: d.pass || "" }); } catch {} } } setAdminUsers(users); } catch {} };
  const deleteUser = (phone: string) => { if (!confirm("کاربر حذف شود؟")) return; try { localStorage.removeItem("cb_user_" + phone); loadAdminUsers(); setToast(""); setTimeout(() => setToast("کاربر حذف شد"), 10); } catch {} };
  const addUser = () => { setUserForm({name:"",phone:"",email:"",pass:"",pass2:""}); setEditingUserPhone(null); setShowUserForm(true); };
  const editUser = (phone: string) => { try { const d = JSON.parse(localStorage.getItem("cb_user_" + phone) || "{}"); setUserForm({name: d.name||"",phone: d.phone||phone,email: d.email||"",pass: "",pass2: ""}); setEditingUserPhone(phone); setShowUserForm(true); } catch {} };
  const saveUser = () => { if (!userForm.name || !userForm.phone) { setToast(""); setTimeout(() => setToast("نام و شماره تلفن الزامی است"), 10); return; } if (editingUserPhone) { const d = JSON.parse(localStorage.getItem("cb_user_" + editingUserPhone) || "{}"); if (userForm.pass) { if (userForm.pass !== userForm.pass2) { setToast(""); setTimeout(() => setToast("رمز عبور مطابقت ندارد"), 10); return; } d.pass = userForm.pass; } d.name = userForm.name; d.email = userForm.email; localStorage.setItem("cb_user_" + editingUserPhone, JSON.stringify(d)); if (userForm.phone !== editingUserPhone) { localStorage.setItem("cb_user_" + userForm.phone, JSON.stringify(d)); localStorage.removeItem("cb_user_" + editingUserPhone); } setToast(""); setTimeout(() => setToast("کاربر ویرایش شد"), 10); } else { if (!userForm.pass || userForm.pass !== userForm.pass2) { setToast(""); setTimeout(() => setToast("رمز عبور الزامی و باید مطابقت داشته باشد"), 10); return; } const existing = localStorage.getItem("cb_user_" + userForm.phone); if (existing) { setToast(""); setTimeout(() => setToast("این شماره تلفن قبلاً ثبت شده"), 10); return; } localStorage.setItem("cb_user_" + userForm.phone, JSON.stringify({ name: userForm.name, phone: userForm.phone, email: userForm.email, pass: userForm.pass })); setToast(""); setTimeout(() => setToast("کاربر اضافه شد"), 10); } setShowUserForm(false); loadAdminUsers(); };
  const [homeProdPage, setHomeProdPage] = useState(1);
  const HOME_PER_PAGE = 6;
  const homeTotalPages = Math.max(1, Math.ceil(products.length / HOME_PER_PAGE));
  const homeCurrentPage = Math.min(homeProdPage, homeTotalPages);
  const homePageStart = (homeCurrentPage - 1) * HOME_PER_PAGE;
  const homePageProducts = products.slice(homePageStart, homePageStart + HOME_PER_PAGE);

  const toFa = (n: number) => n.toLocaleString("fa-IR");
  const parsePrice = (s: string) => parseInt(s.replace(/[۰-۹٬,\s]/g, (c) => c >= '۰' && c <= '۹' ? String(c.charCodeAt(0) - 0x06F0) : '')) || 0;
  const currencySymbol = () => currency === "toman" ? " تومان" : currency === "rial" ? " ریال" : " $";
  const currencyLabel = () => currency === "toman" ? "تومان" : currency === "rial" ? "ریال" : "دلار";
  const formatPrice = (priceStr: string) => {
    const num = parsePrice(priceStr);
    if (currency === "dollar") return (num / dollarRate).toFixed(2) + " $";
    if (currency === "rial") return toFa(num * 10) + " ریال";
    return priceStr + " تومان";
  };
  const formatPriceNum = (num: number) => {
    if (currency === "dollar") return (num / dollarRate).toFixed(2) + " $";
    if (currency === "rial") return toFa(num * 10) + " ریال";
    return toFa(num) + " تومان";
  };


  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 50); setShowTop(window.scrollY > 600); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleLike = (idx: number, e?: React.MouseEvent) => {
 if (e) e.stopPropagation();
    setLikedProducts((prev) => { const next = new Set(prev); if (next.has(idx)) next.delete(idx); else next.add(idx); return next; });
  };

  const addToCart = (idx: number) => {
    const pr = products[idx];
    if (!pr) return;
    setCart(prev => {
      const existing = prev.find(item => item.idx === idx);
      if (existing) {
        return prev.map(item => item.idx === idx ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { idx, qty: 1, name: pr.name, price: pr.price, img: pr.img }];
    });
    setCartOpen(true);
  };

  const updateQty = (idx: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.idx === idx) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      }).filter(item => item.qty > 0);
    });
  };

  const removeFromCart = (idx: number) => {
    setCart(prev => prev.filter(item => item.idx !== idx));
  };

  const cartTotal = cart.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.qty;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const navTo = (page: "home" | "contact" | "product" | "archive" | "cart" | "checkout" | "about" | "user" | "admin", productIdx?: number) => {
    const state = { page, productIdx };
    const path = page === "home" ? "/" : page === "product" ? `/product/${productIdx ?? 0}` : `/${page}`;
    window.history.pushState(state, "", path);
    setCurrentPage(page);
    setMobileMenu(false);
    setCartOpen(false);
    if (productIdx !== undefined) setSelectedProduct(productIdx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Browser back/forward support
  useEffect(() => {
    const onPop = () => {
      const s = window.history.state;
      if (s && s.page) {
        setCurrentPage(s.page);
        if (s.productIdx !== undefined) setSelectedProduct(s.productIdx);
      } else {
        setCurrentPage("home");
      }
      setMobileMenu(false);
      setCartOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Set initial history state
  useEffect(() => { window.history.replaceState({ page: "home" }, "", "/"); }, []);

  const p = products[selectedProduct];
  const navLight = false;
  const pageMap: Record<string, string> = { "/": "home", "/archive": "archive", "/about": "about", "/contact": "contact", "/cart": "cart", "/checkout": "checkout", "/user": "user" };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.bg }}>
      {/* NAVBAR - hidden on admin page */}
      {currentPage !== "admin" && (
      <nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md" + (scrolled ? " shadow-md" : "")}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="flex items-center gap-2 cursor-pointer">
            <img src={siteHeader.logoUrl} alt={siteHeader.brandName} className="h-9 w-9 rounded-full object-cover" />
            <span className={"font-extrabold text-lg transition-colors duration-300 " + (navLight ? "text-white" : "")} style={navLight ? {} : { color: C.dark }}>{siteHeader.brandName}</span>
          </a>
          <div className={"hidden md:flex items-center gap-8 transition-colors duration-300 " + (navLight ? "text-white" : "")}>
            {siteHeader.navItems.map((ni, idx) => {
              const isExternal = ni.url.startsWith("http");
              return isExternal ? (
                <a key={idx} href={ni.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium transition-colors cursor-pointer hover:opacity-70" style={navLight ? {} : { color: C.textL }}>{ni.label}</a>
              ) : (
                <a key={idx} href="#" onClick={(e) => { e.preventDefault(); const pg = pageMap[ni.url]; if (pg) navTo(pg as any); }} className="text-sm font-medium transition-colors cursor-pointer hover:opacity-70" style={navLight ? {} : { color: currentPage === (pageMap[ni.url] || "") ? C.dark : C.textL }}>{ni.label}</a>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            {/* User/Admin Login Button */}
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={() => setShowUserPanel(!showUserPanel)} className={"w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer " + (navLight ? "hover:bg-white/20 text-white" : "hover:bg-white/30")} style={navLight ? {} : { color: C.dark }} aria-label="پنل کاربری">
                  <div className="w-7 h-7 rounded-full text-white text-xs font-extrabold flex items-center justify-center" style={{ background: gradH }}>{userName.charAt(0)}</div>
                </button>
                <AnimatePresence>
                  {showUserPanel && (
                    <>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUserPanel(false)} className="fixed inset-0 z-[60]" />
                      <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border z-[61] overflow-hidden" style={{ borderColor: C.light + "44" }}>
                        <div className="p-4 border-b" style={{ borderColor: C.light + "33" }}>
                          <div className="font-bold text-sm" style={{ color: C.dark }}>{userName}</div>
                          <div className="text-xs mt-0.5" style={{ color: C.textL }}>{userPhone}</div>
                        </div>
                        <div className="p-2">
                          <button onClick={() => { setShowUserPanel(false); navTo("user"); }} className="w-full text-right px-3 py-2.5 rounded-xl text-sm hover:bg-pink-50 transition-colors cursor-pointer flex items-center gap-2.5" style={{ color: C.text }}><User className="w-4 h-4" style={{ color: C.pink }} />پنل کاربری</button>
                          <button onClick={() => { setShowUserPanel(false); navTo("user"); }} className="w-full text-right px-3 py-2.5 rounded-xl text-sm hover:bg-pink-50 transition-colors cursor-pointer flex items-center gap-2.5" style={{ color: C.text }}><Package className="w-4 h-4" style={{ color: C.pink }} />سفارش‌های من</button>
                          <button onClick={() => { setShowUserPanel(false); doLogout(); }} className="w-full text-right px-3 py-2.5 rounded-xl text-sm hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-2.5" style={{ color: C.red }}><LogOut className="w-4 h-4" />خروج</button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : isAdmin ? (
              <div className="relative">
                <button onClick={() => setShowUserPanel(!showUserPanel)} className={"w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer " + (navLight ? "hover:bg-white/20 text-white" : "hover:bg-white/30")} style={navLight ? {} : { color: C.dark }} aria-label="پنل مدیریت">
                  <div className="w-7 h-7 rounded-full text-white text-xs font-extrabold flex items-center justify-center" style={{ background: C.dark }}>اد</div>
                </button>
                <AnimatePresence>
                  {showUserPanel && (
                    <>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUserPanel(false)} className="fixed inset-0 z-[60]" />
                      <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border z-[61] overflow-hidden" style={{ borderColor: C.light + "44" }}>
                        <div className="p-4 border-b" style={{ borderColor: C.light + "33" }}>
                          <div className="font-bold text-sm" style={{ color: C.dark }}>مدیریت</div>
                          <div className="text-xs mt-0.5" style={{ color: C.textL }}>دسترسی ادمین</div>
                        </div>
                        <div className="p-2">
                          <button onClick={() => { setShowUserPanel(false); setCurrentPage("admin"); }} className="w-full text-right px-3 py-2.5 rounded-xl text-sm hover:bg-pink-50 transition-colors cursor-pointer flex items-center gap-2.5" style={{ color: C.text }}><Settings className="w-4 h-4" style={{ color: C.pink }} />پنل مدیریت</button>
                          <button onClick={() => { setShowUserPanel(false); logoutAdmin(); }} className="w-full text-right px-3 py-2.5 rounded-xl text-sm hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-2.5" style={{ color: C.red }}><LogOut className="w-4 h-4" />خروج ادمین</button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={() => { setShowAuth(true); setAuthMode("login"); }} className={"w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer " + (navLight ? "hover:bg-white/20 text-white" : "hover:bg-white/30")} style={navLight ? {} : { color: C.dark }} aria-label="ورود">
                <User className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setCartOpen(true)} className={"relative w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer " + (navLight ? "hover:bg-white/20 text-white" : "hover:bg-white/30")} style={navLight ? {} : { color: C.dark }} aria-label="سبد خرید">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -left-0.5 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-sm" style={{ background: C.red }}>{cartCount}</motion.span>
              )}
            </button>
            {siteHeader.showInsta && (
            <a href={siteHeader.instaUrl} target="_blank" rel="noopener noreferrer" className={"hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer " + (navLight ? "text-white border border-white/40 hover:bg-white/10" : "text-white")} style={navLight ? {} : { background: gradH }}>
              <Instagram className="w-4 h-4" />{siteHeader.instaLabel}
            </a>
            )}
            <button className={"md:hidden w-10 h-10 rounded-full flex items-center justify-center " + (navLight ? "text-white" : "")} style={navLight ? {} : { color: C.dark }} onClick={() => setMobileMenu(!mobileMenu)} aria-label="منو">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 backdrop-blur-md border-t overflow-hidden" style={{ borderColor: C.light + "33" }}>
              <div className="px-6 py-4 flex flex-col gap-4">
                {siteHeader.navItems.map((ni, idx) => {
                  const isExternal = ni.url.startsWith("http");
                  return isExternal ? (
                    <a key={idx} href={ni.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium py-2 text-right cursor-pointer" style={{ color: C.textL }}>{ni.label}</a>
                  ) : (
                    <a key={idx} href="#" onClick={(e) => { e.preventDefault(); const pageMap: Record<string, any> = { "/": "home", "/archive": "archive", "/about": "about", "/contact": "contact", "/cart": "cart" }; const pg = pageMap[ni.url]; if (pg) navTo(pg); }} className="text-sm font-medium py-2 text-right cursor-pointer" style={{ color: C.textL }}>{ni.label}</a>
                  );
                })}
                <a href="#" onClick={(e) => { e.preventDefault(); setCartOpen(true); }} className="text-sm font-medium py-2 text-right flex items-center justify-between cursor-pointer" style={{ color: C.textL }}><span>سبد خرید</span>{cartCount > 0 && <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: C.red }}>{cartCount}</span>}</a>
                <button onClick={() => { setMobileMenu(false); if (isLoggedIn) { setShowUserPanel(!showUserPanel); } else if (isAdmin) { setShowUserPanel(!showUserPanel); } else { setShowAuth(true); setAuthMode("login"); } }} className="text-sm font-medium py-2 text-right flex items-center justify-between cursor-pointer" style={{ color: C.textL }}><span>{isLoggedIn || isAdmin ? "پنل من" : "ورود / ثبت‌نام"}</span><User className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      )}

      <AnimatePresence mode="wait">
        {/* ===== HOME ===== */}
        {currentPage === "home" && (
          <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {/* HERO SLIDER */}
            {heroSlides.length > 0 && (
            <section className="relative w-full overflow-hidden pt-28" style={{ background: C.bg }}>
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-pink-200/50" style={{ height: "clamp(340px, 52vh, 500px)" }}>
                {heroSlides.map((slide, si) => (
                  <div key={si} className="absolute inset-0 transition-opacity duration-[1000ms] ease-in-out" style={{ opacity: heroSlideIdx === si ? 1 : 0 }}>
                    <img src={slide.img} alt="" className="w-full h-full object-cover scale-[1.03]" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(136,13,30,0.55) 0%, rgba(221,45,74,0.35) 50%, rgba(242,106,141,0.25) 100%)" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)" }} />
                  </div>
                ))}
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-10 z-[1]" style={{ background: "radial-gradient(circle, #fff, transparent)" }} />
                <div className="absolute bottom-8 left-4 sm:bottom-16 sm:left-8 w-28 h-28 sm:w-48 sm:h-48 rounded-full opacity-[0.07] z-[1]" style={{ background: "radial-gradient(circle, #F49CBB, transparent)" }} />
                {/* Content */}
                <div className="absolute inset-0 z-10 flex items-center">
                  <div className="w-full max-w-6xl mx-auto px-6 sm:px-10">
                    <AnimatePresence mode="wait">
                      <motion.div key={heroSlideIdx} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }} className="inline-flex items-center gap-2 text-xs font-bold text-white/90 mb-3 px-3.5 py-1 rounded-full backdrop-blur-md" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                          <Sparkles className="w-3.5 h-3.5" style={{ color: "#fce7f3" }} />{heroSlides[heroSlideIdx]?.badge || ""}
                        </motion.div>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-[1.15] text-white mb-2.5" style={{ textShadow: "0 3px 30px rgba(0,0,0,0.25)" }}>
                          {heroSlides[heroSlideIdx]?.t1 || ""}<br />
                          <span>{heroSlides[heroSlideIdx]?.t2 || ""}</span><span style={{ color: "#fce7f3" }}>{heroSlides[heroSlideIdx]?.t3 || ""}</span>
                        </h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }} className="text-xs sm:text-sm text-white/75 mb-5 max-w-sm leading-relaxed">{heroSlides[heroSlideIdx]?.desc || ""}</motion.p>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="flex flex-wrap items-center gap-3">
                          <a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }} className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-pink-500/30 hover:scale-[1.04]" style={{ background: "linear-gradient(135deg, #DD2D4A 0%, #F26A8D 100%)", boxShadow: "0 8px 25px rgba(221,45,74,0.3)" }}>{heroSlides[heroSlideIdx]?.btn || ""}<ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /></a>
                          <a href="https://www.instagram.com/chicoberry.onlineshop" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white/90 text-sm font-bold backdrop-blur-md transition-all duration-300 hover:bg-white/20 cursor-pointer" style={{ border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}><Instagram className="w-4 h-4" />اینستاگرام</a>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              {heroSlides.length > 1 && (
              <div className="flex items-center justify-center gap-2.5 py-3">
                {heroSlides.map((_, i) => (
                  <button key={i} onClick={() => setHeroSlideIdx(i)} className="h-1.5 rounded-full transition-all duration-500 ease-out" style={{ width: heroSlideIdx === i ? "2rem" : "0.5rem", background: heroSlideIdx === i ? C.red : C.light }} />
                ))}
              </div>
              )}
              </div>
            </section>
            )}

            {/* CATEGORIES */}
            <section className="py-10 sm:py-14 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionHeader title="دسته‌بندی محصولات" subtitle="" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                  {cats.map((cat, i) => (
                    <motion.div key={cat.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08, duration: 0.4 }} whileHover={{ y: -6, scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => { setSelectedCat(cat.n); navTo("archive"); }} className="group flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-pink-200 hover:shadow-xl hover:shadow-pink-100/80" style={{ background: "linear-gradient(160deg, #FFF8FA 0%, #FFF0F4 100%)" }}>
                      <div className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: "linear-gradient(135deg, #DD2D4A 0%, #F26A8D 100%)", boxShadow: "0 6px 20px rgba(221,45,74,0.25)" }}>
                        <CatIconRender icon={cat.icon} className="w-7 h-7 object-contain" />
                      </div>
                      <span className="text-sm font-bold" style={{ color: C.text }}>{cat.n}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* PRODUCTS */}
            <Section id="products" className="py-20 sm:py-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionHeader title="محصولات محبوب" subtitle="پرفروش‌ترین محصولات فروشگاه ما" />
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-7">
                  {homePageProducts.map((pr, i) => {
                    const realIdx = homePageStart + i;
                    return (
                    <motion.div key={pr.name} variants={fadeUp} custom={i} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => navTo("product", realIdx)}>
                      <div className="relative h-48 sm:h-56 md:h-64 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #FFE0E8 50%, #FFD6E0 100%)" }}>
                        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-20" style={{ background: C.light }} />
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-15" style={{ background: C.pink }} />
                        <img src={pr.img} alt={pr.name} className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                        <div className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm" style={{ background: C.red }}>{pr.discount}</div>
                        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ color: likedProducts.has(realIdx) ? C.red : "#aaa" }} onClick={(e) => toggleLike(realIdx, e)} aria-label="مورد علاقه">
                          <Heart className="w-4 h-4" fill={likedProducts.has(realIdx) ? C.red : "none"} />
                        </button>
                      </div>
                      <div className="p-3 sm:p-4 md:p-5">
                        <h3 className="font-bold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: C.text }}>{pr.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm sm:text-lg" style={{ color: C.dark }}>{formatPrice(pr.price)}</span>
                          {pr.oldPrice && <span className="line-through text-[10px] sm:text-xs" style={{ color: C.textL + "55" }}>{formatPrice(pr.oldPrice)}</span>}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(realIdx); }} className="w-full mt-2 sm:mt-3 py-2 sm:py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2" style={{ background: gradH }}>
                          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />افزودن به سبد
                        </button>
                      </div>
                    </motion.div>
                    );
                  })}
                </div>
                {products.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button onClick={() => setHomeProdPage(p => Math.max(1, p - 1))} disabled={homeCurrentPage <= 1} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-md" style={{ background: homeCurrentPage > 1 ? "#fff" : undefined, border: homeCurrentPage > 1 ? "1px solid " + C.light : undefined, color: C.dark }}>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {Array.from({ length: homeTotalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setHomeProdPage(p)} className="w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 hover:shadow-md" style={{ background: p === homeCurrentPage ? gradH : "#fff", color: p === homeCurrentPage ? "#fff" : C.dark, border: p === homeCurrentPage ? "none" : "1px solid " + C.light }}>{toFa(p)}</button>
                  ))}
                  <button onClick={() => setHomeProdPage(p => Math.min(homeTotalPages, p + 1))} disabled={homeCurrentPage >= homeTotalPages} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-md" style={{ background: homeCurrentPage < homeTotalPages ? "#fff" : undefined, border: homeCurrentPage < homeTotalPages ? "1px solid " + C.light : undefined, color: C.dark }}>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
                )}
                <motion.div variants={fadeUp} custom={6} className="text-center mt-12">
                  <a href="#" onClick={(e) => { e.preventDefault(); navTo("archive"); }} className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl cursor-pointer" style={{ background: gradH }}>
                    مشاهده همه محصولات<ShoppingBag className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </Section>

            {/* FEATURES */}
            <Section className="py-20 sm:py-24 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionHeader title="چرا چیکوبری؟" subtitle="ما به شما تعهد می‌دهیم بهترین تجربه خرید را داشته باشید" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                  {features.map((f, i) => (
                    <motion.div key={f.t} variants={fadeUp} custom={i} className="flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 shadow-md text-3xl" style={{ background: "linear-gradient(135deg, #DD2D4A, #F26A8D)" }}>{f.icon}</div>
                      <h3 className="font-bold text-sm sm:text-base mb-2" style={{ color: C.text }}>{f.t}</h3>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.textL + "88" }}>{f.d}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* REVIEWS */}
            <Section className="py-20 sm:py-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionHeader title="نظرات مشتریان" subtitle="نظرات واقعی مشتریان ما درباره خریدشان" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
                  {reviews.map((r, i) => (
                    <motion.div key={r.name} variants={fadeUp} custom={i} className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center gap-1 mb-4">{[1, 2, 3, 4, 5].map((s) => (<Star key={s} className={s <= r.rating ? "w-4 h-4 fill-[#F26A8D] text-[#F26A8D]" : "w-4 h-4 text-gray-200"} />))}</div>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: C.textL }}>&ldquo;{r.text}&rdquo;</p>
                      <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid " + C.light + "33" }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: gradH }}>{r.name.charAt(0)}</div>
                        <span className="text-sm font-bold" style={{ color: C.text }}>{r.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* INSTAGRAM CTA */}
            <Section className="py-20 sm:py-24">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div variants={scaleIn} className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl" style={{ background: gradV }}>
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
                  <Instagram className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-6 opacity-90 relative z-10" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 relative z-10">ما را در اینستاگرام دنبال کنید</h2>
                  <p className="text-white/85 text-sm sm:text-base mb-6 sm:mb-10 max-w-md mx-auto relative z-10 leading-relaxed">برای دیدن جدیدترین محصولات، تخفیف‌های ویژه و محتوای جذاب، پیج ما را فالو کنید</p>
                  <a href="https://www.instagram.com/chicoberry.onlineshop" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-white rounded-full font-bold text-sm sm:text-lg hover:bg-white/90 transition-colors relative z-10 shadow-xl cursor-pointer" style={{ color: C.dark }}>
                    @chicoberry.onlineshop<Send className="w-5 h-5 rotate-180" />
                  </a>
                </motion.div>
              </div>
            </Section>
          </motion.main>
        )}

        {/* ===== PRODUCT SINGLE ===== */}
        {currentPage === "product" && p && (
          <motion.main key="product" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="flex-1 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm mb-8" style={{ color: C.textL }}>
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="hover:opacity-70 transition-opacity cursor-pointer">خانه</a>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("archive"); }} className="hover:opacity-70 transition-opacity cursor-pointer">محصولات</a>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <span style={{ color: C.dark }} className="font-medium">{p.name}</span>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Image */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <div className="rounded-3xl overflow-hidden flex items-center justify-center min-h-[260px] sm:min-h-[380px]" style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #FFE0E8 50%, #FFD6E0 100%)" }}>
                    <div className="relative">
                      <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-20" style={{ background: C.light }} />
                      <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-15" style={{ background: C.pink }} />
                      <img src={p.img} alt={p.name} className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain drop-shadow-xl" />
                    </div>
                  </div>
                </motion.div>

                {/* Product Info */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white w-fit mb-4" style={{ background: C.red }}>{p.discount} تخفیف</div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: C.dark }}>{p.name}</h1>
                  <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: C.textL }}>{p.desc}</p>

                  <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-2xl sm:text-3xl font-extrabold" style={{ color: C.dark }}>{formatPrice(p.price)}</span>
                      
                    </div>
                    <div className="flex items-center gap-3">
                      {p.oldPrice && <span className="line-through text-sm" style={{ color: C.textL + "66" }}>{formatPrice(p.oldPrice)}</span>}
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: C.red }}>{p.discount}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => addToCart(selectedProduct)} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg cursor-pointer" style={{ background: gradV }}>
                      <ShoppingBag className="w-5 h-5" />افزودن به سبد خرید
                    </button>
                    <a href="https://www.instagram.com/chicoberry.onlineshop" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg cursor-pointer" style={{ background: gradH }}>
                      <Instagram className="w-5 h-5" />سفارش از اینستاگرام
                    </a>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {[{ icon: <Truck className="w-5 h-5" />, t: "ارسال رایگان" }, { icon: <Shield className="w-5 h-5" />, t: "ضمانت اصالت" }, { icon: <RotateCcw className="w-5 h-5" />, t: "بازگشت ۷ روزه" }].map((f, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-white shadow-sm">
                        <span style={{ color: C.red }}>{f.icon}</span>
                        <span className="text-xs font-medium" style={{ color: C.text }}>{f.t}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Related Products Slider */}
              <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold" style={{ color: C.dark }}>محصولات مرتبط</h2>
                  <div className="flex gap-2">
                    <button onClick={() => relatedRef.current?.scrollBy({ left: 200, behavior: "smooth" })} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center hover:bg-pink-50 transition-colors cursor-pointer" style={{ borderColor: C.light + "44", color: C.dark }}><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                    <button onClick={() => relatedRef.current?.scrollBy({ left: -200, behavior: "smooth" })} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center hover:bg-pink-50 transition-colors cursor-pointer" style={{ borderColor: C.light + "44", color: C.dark }}><ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                  </div>
                </div>
                <div ref={relatedRef} className="related-slider flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {products.filter((_, i) => i !== selectedProduct).map((pr) => (
                    <div key={pr.name} className="snap-start shrink-0 w-44 sm:w-48 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => navTo("product", products.indexOf(pr))}>
                      <div className="h-36 flex items-center justify-center" style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #FFE0E8 100%)" }}>
                        <img src={pr.img} alt={pr.name} className="w-20 h-20 object-contain" />
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-bold text-xs mb-1 truncate" style={{ color: C.text }}>{pr.name}</h3>
                        <span className="font-bold text-sm" style={{ color: C.dark }}>{formatPrice(pr.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.main>
        )}

        {/* ===== ARCHIVE ===== */}
        {currentPage === "archive" && (() => {
          const catList = ["همه", ...Array.from(new Set(products.map(p => p.cat)))];
          const filtered = selectedCat === "همه" ? products : products.filter(p => p.cat === selectedCat);
          return (
            <motion.main key="archive" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="flex-1 pt-24 pb-16">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm mb-8" style={{ color: C.textL }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="hover:opacity-70 transition-opacity cursor-pointer">خانه</a>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                  <span style={{ color: C.dark }} className="font-medium">آرشیو محصولات</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: C.dark }}>آرشیو محصولات</h1>
                  <div className="w-16 h-1 rounded-full mb-4" style={{ background: gradH }} />
                  <p className="text-base mb-8" style={{ color: C.textL }}>همه عروسک‌های فانتزی چیکوبری رو اینجا ببینید و انتخاب کنید.</p>
                </motion.div>
                {/* Filters */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="flex flex-wrap gap-3 mb-10">
                  {catList.map(cat => (
                    <button key={cat} onClick={() => setSelectedCat(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${selectedCat === cat ? "text-white shadow-lg" : "bg-white text-[#6B2040] shadow-sm hover:shadow-md"}`} style={selectedCat === cat ? { background: gradH } : {}}>
                      {cat}
                    </button>
                  ))}
                </motion.div>
                {/* Product count */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-sm" style={{ color: C.textL }}>
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>{filtered.length} محصول</span>
                  </div>
                </div>
                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {filtered.map((pr, i) => {
                    const realIdx = products.indexOf(pr);
                    return (
                      <motion.div key={pr.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.4 }} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => navTo("product", realIdx)}>
                        <div className="relative h-40 sm:h-48 md:h-56 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #FFE0E8 50%, #FFD6E0 100%)" }}>
                          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-20" style={{ background: C.light }} />
                          <img src={pr.img} alt={pr.name} className="relative w-32 h-32 sm:w-36 sm:h-36 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                          <div className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm" style={{ background: C.red }}>{pr.discount}</div>
                          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ color: likedProducts.has(realIdx) ? C.red : "#aaa" }} onClick={(e) => toggleLike(realIdx, e)} aria-label="مورد علاقه">
                            <Heart className="w-3.5 h-3.5" fill={likedProducts.has(realIdx) ? C.red : "none"} />
                          </button>
                        </div>
                        <div className="p-4">
                          <span className="text-[10px] font-medium mb-1 block" style={{ color: C.pink }}>{pr.cat}</span>
                          <h3 className="font-bold text-sm mb-2" style={{ color: C.text }}>{pr.name}</h3>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-extrabold text-base" style={{ color: C.dark }}>{formatPrice(pr.price)}</span>
                            {pr.oldPrice && <span className="line-through text-xs" style={{ color: C.textL + "55" }}>{formatPrice(pr.oldPrice)}</span>}
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); addToCart(realIdx); }} className="w-full py-2 rounded-lg text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-1.5" style={{ background: gradH }}>
                            <ShoppingBag className="w-3.5 h-3.5" />افزودن
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {filtered.length === 0 && (
                  <div className="text-center py-20">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: C.pink }} />
                    <p className="text-base font-medium" style={{ color: C.textL }}>محصولی در این دسته‌بندی یافت نشد.</p>
                  </div>
                )}
              </div>
            </motion.main>
          );
        })()}

        {/* ===== CART ===== */}
        {currentPage === "cart" && (
          <motion.main key="cart" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="flex-1 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm mb-8" style={{ color: C.textL }}>
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="hover:opacity-70 transition-opacity cursor-pointer">خانه</a>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <span style={{ color: C.dark }} className="font-medium">سبد خرید</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ color: C.dark }}>سبد خرید</h1>
                  {cartCount > 0 && <span className="px-3 py-0.5 rounded-full text-white text-xs font-bold" style={{ background: C.red }}>{cartCount} کالا</span>}
                </div>
                <div className="w-16 h-1 rounded-full mb-4" style={{ background: gradH }} />
              </motion.div>

              {cart.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="text-center py-24">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #FFE0E8, #FFF0F3)" }}>
                    <ShoppingBag className="w-10 h-10" style={{ color: C.pink }} />
                  </div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: C.dark }}>سبد خرید شما خالی است!</h2>
                  <p className="text-sm mb-8" style={{ color: C.textL }}>محصولات مورد علاقه خود را اضافه کنید.</p>
                  <button onClick={() => navTo("archive")} className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity shadow-lg cursor-pointer" style={{ background: gradH }}>
                    مشاهده محصولات<ShoppingBag className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Cart Items */}
                  <div className="md:col-span-2 flex flex-col gap-4">
                    {cart.map((item, ci) => {
                      const itemTotal = parsePrice(item.price) * item.qty;
                      return (
                        <motion.div key={item.idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * ci, duration: 0.4 }} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 sm:gap-6">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 flex items-center justify-center cursor-pointer" style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #FFE0E8 100%)" }} onClick={() => navTo("product", item.idx)}>
                            <img src={item.img} alt={item.name} className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] object-contain" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="font-bold text-sm sm:text-base truncate cursor-pointer hover:opacity-70 transition-opacity" style={{ color: C.text }} onClick={() => navTo("product", item.idx)}>{item.name}</h3>
                              </div>
                              <button onClick={() => removeFromCart(item.idx)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shrink-0 cursor-pointer" style={{ color: C.textL + "88" }} aria-label="حذف">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                                <button onClick={() => updateQty(item.idx, -1)} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer" style={{ color: C.dark }}><Minus className="w-4 h-4" /></button>
                                <span className="w-8 text-center text-sm font-bold" style={{ color: C.text }}>{item.qty}</span>
                                <button onClick={() => updateQty(item.idx, 1)} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer" style={{ color: C.dark }}><Plus className="w-4 h-4" /></button>
                              </div>
                              <div className="text-left">
                                <div className="font-extrabold text-base sm:text-lg" style={{ color: C.dark }}>{formatPriceNum(itemTotal)}</div>
                                {item.qty > 1 && <div className="text-[10px] line-through" style={{ color: C.textL + "66" }}>{formatPrice(item.price)}</div>}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Summary */}
                  <div className="md:col-span-1">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                      <h2 className="text-lg font-bold mb-5" style={{ color: C.dark }}>خلاصه سفارش</h2>
                      <div className="flex flex-col gap-3 pb-5 mb-5" style={{ borderBottom: "1px solid " + C.light + "33" }}>
                        <div className="flex items-center justify-between text-sm">
                          <span style={{ color: C.textL }}>تعداد اقلام</span>
                          <span className="font-bold" style={{ color: C.text }}>{cartCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span style={{ color: C.textL }}>هزینه ارسال</span>
                          <span className="font-bold text-xs px-2 py-0.5 rounded-full text-white" style={{ background: cartTotal >= paySettings.shippingFreeMin ? "#22c55e" : C.pink }}>{cartTotal >= paySettings.shippingFreeMin ? "رایگان" : formatPriceNum(paySettings.shippingCost)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-bold" style={{ color: C.dark }}>مبلغ قابل پرداخت</span>
                        <span className="text-xl font-extrabold" style={{ color: C.dark }}>{formatPriceNum(cartTotal)}</span>
                      </div>
                      {cartTotal < paySettings.shippingFreeMin && (
                        <p className="text-xs mb-4 text-center" style={{ color: C.textL + "aa" }}>برای ارسال رایگان تا {formatPriceNum(paySettings.shippingFreeMin - cartTotal)} دیگر خرید کنید!</p>
                      )}
                      <button onClick={() => navTo("checkout")} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg cursor-pointer" style={{ background: gradH }}>
                        <CreditCard className="w-5 h-5" />تکمیل سفارش
                      </button>
                      <button onClick={() => navTo("archive")} className="w-full mt-3 py-3 rounded-xl font-bold text-sm border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.dark }}>
                        ادامه خرید
                      </button>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.main>
        )}

        {/* ===== CHECKOUT ===== */}
        {currentPage === "checkout" && (
          <motion.main key="checkout" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="flex-1 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm mb-8" style={{ color: C.textL }}>
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="hover:opacity-70 transition-opacity cursor-pointer">خانه</a>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("cart"); }} className="hover:opacity-70 transition-opacity cursor-pointer">سبد خرید</a>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <span style={{ color: C.dark }} className="font-medium">تکمیل سفارش</span>
              </motion.div>

              {checkoutDone ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #DD2D4A, #F26A8D)" }}><CheckCircle className="w-12 h-12 text-white" /></div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: C.dark }}>سفارش شما ثبت شد!</h1>
                  <p className="text-sm mb-2" style={{ color: C.textL }}>سفارش شما با موفقیت ثبت شد و در حال بررسی است.</p>
                  <p className="text-sm mb-8" style={{ color: C.textL }}>تیم چیکوبری در اسرع وقت با شما تماس خواهد گرفت.</p>
                  <button onClick={() => { setCheckoutDone(false); navTo("home"); }} className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity shadow-lg cursor-pointer" style={{ background: gradH }}>
                    بازگشت به خانه<Heart className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: C.dark }}>تکمیل سفارش</h1>
                    <div className="w-16 h-1 rounded-full mb-4" style={{ background: gradH }} />
                    <p className="text-base mb-8" style={{ color: C.textL }}>اطلاعات خود را وارد کنید تا سفارش شما ثبت شود.</p>
                  </motion.div>

                  {cart.length === 0 ? (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                      <p className="text-base font-medium mb-6" style={{ color: C.textL }}>سبد خرید شما خالی است. ابتدا محصول اضافه کنید.</p>
                      <button onClick={() => navTo("archive")} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-bold cursor-pointer" style={{ background: gradH }}>مشاهده محصولات</button>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
                      {/* Form */}
                      <div className="md:col-span-3 flex flex-col gap-6">
                        {/* Steps Indicator */}
                        <div className="flex items-center justify-center gap-0 mb-2">
                          {[{n: "سبد خرید", active: false, done: true}, {n: "اطلاعات ارسال", active: checkoutStep === 1, done: checkoutStep >= 2}, {n: "ثبت سفارش", active: checkoutStep === 2, done: false}].map((step, i) => (
                            <div key={step.n} className="flex items-center">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step.active ? "text-white" : step.done ? "text-white" : ""}`} style={{ background: step.active ? gradH : step.done ? C.red : C.light + "44", color: (!step.active && !step.done) ? C.textL : "#fff" }}>
                                  {step.done ? <CheckCircle className="w-4 h-4" /> : (i + 1)}
                                </div>
                                <span className={`text-xs font-medium hidden sm:block ${step.active ? "" : ""}`} style={{ color: step.active ? C.dark : C.textL + "88" }}>{step.n}</span>
                              </div>
                              {i < 2 && <div className="w-10 sm:w-16 h-0.5 mx-2" style={{ background: step.done ? gradH : C.light + "44" }} />}
                            </div>
                          ))}
                        </div>

                        {/* Shipping Info */}
                        {/* Step 1: Shipping Info & Payment */}
                        {checkoutStep === 1 && (<>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="bg-white rounded-2xl p-6 shadow-sm">
                          <div className="flex items-center gap-2 mb-5">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FFE0E8, #FFF0F3)" }}>
                              <MapPin className="w-5 h-5" style={{ color: C.red }} />
                            </div>
                            <h2 className="text-lg font-bold" style={{ color: C.dark }}>اطلاعات ارسال</h2>
                          </div>
                          <div className="flex flex-col gap-4">
                            {(() => {
                              const enabledFields = checkoutFields.filter(f => f.enabled);
                              return enabledFields.map((field, fi) => {
                                const prevField = fi > 0 ? enabledFields[fi - 1] : null;
                                const isSecondHalf = field.width === "half" && prevField && prevField.width === "half";
                                const inputEl = (
                                  <>
                                    <label className="block text-sm font-medium mb-2" style={{ color: C.text }}>{field.label}{field.required && <span style={{ color: C.red }}> *</span>}</label>
                                    {field.type === "textarea" ? (
                                      <textarea rows={field.type === "textarea" && fi === enabledFields.length - 1 ? 2 : 3} value={checkoutForm[field.id] || ""} onChange={e => { setCheckoutForm(p => ({ ...p, [field.id]: e.target.value })); if (checkoutErrors[field.id]) setCheckoutErrors(p => { const n = { ...p }; delete n[field.id]; return n; }); }} placeholder={field.placeholder} className={"w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" + (checkoutErrors[field.id] ? " border-red-400" : "")} style={{ borderColor: checkoutErrors[field.id] ? undefined : C.light + "66", background: C.bg, color: C.text }} dir={field.dir} />
                                    ) : (
                                      <input type={field.type} value={checkoutForm[field.id] || ""} onChange={e => { setCheckoutForm(p => ({ ...p, [field.id]: e.target.value })); if (checkoutErrors[field.id]) setCheckoutErrors(p => { const n = { ...p }; delete n[field.id]; return n; }); }} placeholder={field.placeholder} className={"w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40" + (checkoutErrors[field.id] ? " border-red-400" : "")} style={{ borderColor: checkoutErrors[field.id] ? undefined : C.light + "66", background: C.bg, color: C.text }} dir={field.dir} />
                                    )}
                                    {checkoutErrors[field.id] && <p className="text-xs mt-1 text-red-500">{checkoutErrors[field.id]}</p>}
                                  </>
                                );
                                if (isSecondHalf) return null;
                                const nextField = fi < enabledFields.length - 1 ? enabledFields[fi + 1] : null;
                                const hasNextHalf = nextField && nextField.width === "half";
                                if (field.width === "half" && hasNextHalf) {
                                  return <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div>{inputEl}</div><div>{enabledFields[fi + 1] && <label className="block text-sm font-medium mb-2" style={{ color: C.text }}>{enabledFields[fi + 1].label}{enabledFields[fi + 1].required && <span style={{ color: C.red }}> *</span>}</label>}{enabledFields[fi + 1] && enabledFields[fi + 1].type === "textarea" ? (<textarea rows={enabledFields[fi + 1].type === "textarea" && fi + 1 === enabledFields.length - 1 ? 2 : 3} value={checkoutForm[enabledFields[fi + 1].id] || ""} onChange={e => { setCheckoutForm(p => ({ ...p, [enabledFields[fi + 1].id]: e.target.value })); if (checkoutErrors[enabledFields[fi + 1].id]) setCheckoutErrors(p => { const n = { ...p }; delete n[enabledFields[fi + 1].id]; return n; }); }} placeholder={enabledFields[fi + 1].placeholder} className={"w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" + (checkoutErrors[enabledFields[fi + 1].id] ? " border-red-400" : "")} style={{ borderColor: checkoutErrors[enabledFields[fi + 1].id] ? undefined : C.light + "66", background: C.bg, color: C.text }} dir={enabledFields[fi + 1].dir} />) : (<input type={enabledFields[fi + 1].type} value={checkoutForm[enabledFields[fi + 1].id] || ""} onChange={e => { setCheckoutForm(p => ({ ...p, [enabledFields[fi + 1].id]: e.target.value })); if (checkoutErrors[enabledFields[fi + 1].id]) setCheckoutErrors(p => { const n = { ...p }; delete n[enabledFields[fi + 1].id]; return n; }); }} placeholder={enabledFields[fi + 1].placeholder} className={"w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40" + (checkoutErrors[enabledFields[fi + 1].id] ? " border-red-400" : "")} style={{ borderColor: checkoutErrors[enabledFields[fi + 1].id] ? undefined : C.light + "66", background: C.bg, color: C.text }} dir={enabledFields[fi + 1].dir} />)}{checkoutErrors[enabledFields[fi + 1].id] && <p className="text-xs mt-1 text-red-500">{checkoutErrors[enabledFields[fi + 1].id]}</p>}</div></div>;
                                }
                                return <div key={field.id}>{inputEl}</div>;
                              });
                            })()}
                          </div>
                        </motion.div>

                        {/* Payment Method */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="bg-white rounded-2xl p-6 shadow-sm">
                          <div className="flex items-center gap-2 mb-5">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FFE0E8, #FFF0F3)" }}>
                              <CreditCard className="w-5 h-5" style={{ color: C.red }} />
                            </div>
                            <h2 className="text-lg font-bold" style={{ color: C.dark }}>روش پرداخت</h2>
                          </div>
                          <div className="flex flex-col gap-3">
                            {[
                              paySettings.onlineEnabled && {id: "online", title: paySettings.onlineTitle, desc: paySettings.onlineDesc},
                              paySettings.cardEnabled && {id: "card", title: paySettings.cardTitle, desc: paySettings.cardDesc + (paySettings.cardNumber ? ` – ${paySettings.cardNumber}` : "")},
                              paySettings.codEnabled && {id: "cod", title: paySettings.codTitle, desc: paySettings.codDesc},
                            ].filter(Boolean).map((pm) => (
                              <button key={pm!.id} onClick={() => setPayMethod(pm!.id)} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer text-right ${payMethod === pm!.id ? "" : "bg-white"}`} style={{ borderColor: payMethod === pm!.id ? C.red : C.light + "44", background: payMethod === pm!.id ? C.bg : "white" }}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all`} style={{ borderColor: payMethod === pm!.id ? C.red : C.light }}>
                                  {payMethod === pm!.id && <div className="w-3 h-3 rounded-full" style={{ background: C.red }} />}
                                </div>
                                <div>
                                  <p className="text-sm font-bold" style={{ color: C.text }}>{pm!.title}</p>
                                  <p className="text-xs mt-0.5" style={{ color: C.textL + "88" }}>{pm!.desc}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                        </>)}

                        {/* Step 2: Order Review */}
                        {checkoutStep === 2 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                          <div className="flex items-center gap-2 mb-5">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FFE0E8, #FFF0F3)" }}>
                              <ClipboardList className="w-5 h-5" style={{ color: C.red }} />
                            </div>
                            <h2 className="text-lg font-bold" style={{ color: C.dark }}>بررسی و تأیید سفارش</h2>
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="rounded-xl p-4" style={{ background: C.bg }}>
                              <p className="text-xs font-bold mb-2" style={{ color: C.textL }}>اطلاعات ارسال</p>
                              {checkoutFields.filter(f => checkoutForm[f.id]).map(f => (
                                <p key={f.id} className="text-sm" style={{ color: f.id === "name" ? C.text : C.textL }} dir={f.dir}>{f.label}: {checkoutForm[f.id]}</p>
                              ))}
                            </div>
                            <button onClick={() => setCheckoutStep(1)} className="text-sm font-bold cursor-pointer" style={{ color: C.red }}>ویرایش اطلاعات</button>
                          </div>
                        </motion.div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
                          <h2 className="font-bold text-base mb-4" style={{ color: C.dark }}>خلاصه سفارش</h2>
                          <div className="flex flex-col gap-3 mb-4 max-h-60 overflow-y-auto">
                            {cart.map((item) => {
                              return (
                                <div key={item.idx} className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #FFE0E8 100%)" }}>
                                    <img src={item.img} alt={item.name} className="w-9 h-9 object-contain" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate" style={{ color: C.text }}>{item.name}</p>
                                    <p className="text-[10px]" style={{ color: C.textL + "88" }}>تعداد: {item.qty} | قیمت واحد: {formatPrice(item.price)}</p>
                                  </div>
                                  <span className="text-xs font-bold shrink-0" style={{ color: C.dark }}>{formatPriceNum(parsePrice(item.price) * item.qty)}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="border-t pt-4 flex flex-col gap-2" style={{ borderColor: C.light + "33" }}>
                            <div className="flex items-center justify-between text-sm">
                              <span style={{ color: C.textL }}>جمع کالاها</span>
                              <span className="font-bold" style={{ color: C.text }}>{formatPriceNum(cartTotal)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span style={{ color: C.textL }}>هزینه ارسال</span>
                              <span className="font-bold text-xs px-2 py-0.5 rounded-full text-white" style={{ background: cartTotal >= paySettings.shippingFreeMin ? "#22c55e" : C.pink }}>{cartTotal >= paySettings.shippingFreeMin ? "رایگان" : formatPriceNum(paySettings.shippingCost)}</span>
                            </div>
                            <div className="border-t pt-3 mt-1 flex items-center justify-between" style={{ borderColor: C.light + "33" }}>
                              <span className="font-bold" style={{ color: C.dark }}>مبلغ نهایی</span>
                              <span className="text-lg font-extrabold" style={{ color: C.dark }}>{formatPriceNum(cartTotal + (cartTotal >= paySettings.shippingFreeMin ? 0 : paySettings.shippingCost))}</span>
                            </div>
                          </div>
                          <button onClick={() => { if (checkoutStep === 1) { const errors: Record<string, string> = {}; checkoutFields.filter(f => f.required && f.enabled).forEach(f => { if (!checkoutForm[f.id] || !checkoutForm[f.id].trim()) errors[f.id] = f.label + " الزامی است"; }); if (Object.keys(errors).length > 0) { setCheckoutErrors(errors); return; } setCheckoutErrors({}); setCheckoutStep(2); } else { if (!isLoggedIn) { setToast(""); setTimeout(() => setToast("لطفاً ابتدا وارد حساب کاربری شوید"), 10); setShowAuth(true); setAuthMode("login"); return; } if (saveCheckout()) setCheckoutDone(true); } }} className="w-full mt-5 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg cursor-pointer" style={{ background: gradV }}>
                            <CheckCircle className="w-5 h-5" />{checkoutStep === 1 ? "ادامه به مرحله بعد" : "ثبت و پرداخت سفارش"}
                          </button>
                          <button onClick={() => navTo("cart")} className="w-full mt-2 py-2.5 rounded-xl font-bold text-xs border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.textL }}>بازگشت به سبد خرید</button>
                          <div className="flex items-center gap-2 mt-4 justify-center">
                            <Shield className="w-3.5 h-3.5" style={{ color: C.pink }} />
                            <p className="text-[10px]" style={{ color: C.textL + "88" }}>پرداخت امن و ضمانت بازگشت کالا</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.main>
        )}

        {/* ===== ABOUT ===== */}
        {currentPage === "about" && (
          <motion.main key="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="flex-1 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm mb-8" style={{ color: C.textL }}>
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="hover:opacity-70 transition-opacity cursor-pointer">خانه</a>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <span style={{ color: C.dark }} className="font-medium">درباره ما</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: C.dark }}>{siteAbout.title}</h1>
                <div className="w-16 h-1 rounded-full mb-4" style={{ background: gradH }} />
              </motion.div>

              {/* Hero About */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-10 text-white relative overflow-hidden" style={{ background: gradV }}>
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <img src="/logo.png" alt="Chicoberry" className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white/30 object-cover shadow-xl" />
                  <div className="text-center md:text-right">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">فروشگاه عروسک‌های فانتزی {siteFooter.copyright}</h2>
                    <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">{siteAbout.desc}</p>
                  </div>
                </div>
              </motion.div>

              {/* Story Section */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h2 className="text-xl font-bold mb-4" style={{ color: C.dark }}>داستان ما</h2>
                  <div className="w-12 h-1 rounded-full mb-4" style={{ background: gradH }} />
                  {siteAbout.story.split('\n').filter(p => p.trim()).map((para, pi) => (
                    <p key={pi} className="text-sm leading-relaxed mb-4" style={{ color: C.textL }}>{para}</p>
                  ))}
                </div>
                <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #FFE0E8 50%, #FFD6E0 100%)" }}>
                  <div className="p-8 flex flex-col items-center justify-center h-full min-h-[280px]">
                    <Sparkles className="w-12 h-12 mb-4" style={{ color: C.pink }} />
                    <h3 className="text-lg font-bold mb-2" style={{ color: C.dark }}>ماموریت ما</h3>
                    <p className="text-sm text-center leading-relaxed" style={{ color: C.textL }}>{siteAbout.mission}</p>
                  </div>
                </div>
              </motion.div>

              {/* Values */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mb-10">
                <h2 className="text-xl font-bold mb-6" style={{ color: C.dark }}>ارزش‌های ما</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
                  {[
                    { icon: <Heart className="w-7 h-7" style={{ color: "#fff" }} />, t: "عشق و علاقه", d: "هر عروسک با عشق انتخاب و بسته‌بندی می‌شود", bg: "linear-gradient(135deg, #DD2D4A, #F26A8D)" },
                    { icon: <Shield className="w-7 h-7" style={{ color: "#fff" }} />, t: "تضمین کیفیت", d: "تمامی محصولات دارای ضمانت کیفیت و اصالت هستند", bg: "linear-gradient(135deg, #880D1E, #DD2D4A)" },
                    { icon: <Truck className="w-7 h-7" style={{ color: "#fff" }} />, t: "ارسال سریع", d: "ارسال به سراسر ایران در کمترین زمان ممکن", bg: "linear-gradient(135deg, #F26A8D, #F49CBB)" },
                    { icon: <Headphones className="w-7 h-7" style={{ color: "#fff" }} />, t: "پشتیبانی همیشگی", d: "تیم ما همیشه آماده پاسخگویی به سوالات شماست", bg: "linear-gradient(135deg, #DD2D4A, #880D1E)" },
                  ].map((v, i) => (
                    <motion.div key={v.t} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.4 }} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md" style={{ background: v.bg }}>{v.icon}</div>
                      <h3 className="font-bold text-sm mb-2" style={{ color: C.text }}>{v.t}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: C.textL + "88" }}>{v.d}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { n: "+۵۰۰۰", l: "مشتری راضی" },
                  { n: "+۲۰۰", l: "محصول متنوع" },
                  { n: "+۳۱", l: "استان تحت پوشش" },
                  { n: "۹۸٪", l: "رضایت مشتریان" },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm">
                    <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: C.dark }}>{s.n}</div>
                    <div className="text-xs" style={{ color: C.textL }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden shadow-xl" style={{ background: gradV }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
                <Instagram className="w-12 h-12 mx-auto mb-4 text-white/90 relative z-10" />
                <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-white relative z-10">ما را در اینستاگرام دنبال کنید</h2>
                <p className="text-white/80 text-sm mb-6 max-w-md mx-auto relative z-10">برای دیدن پشت صحنه چیکوبری، محتوای جذاب و تخفیف‌های ویژه، ما را فالو کنید.</p>
                <a href={siteContact.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-white rounded-full font-bold hover:bg-white/90 transition-colors relative z-10 shadow-xl cursor-pointer" style={{ color: C.dark }}>
                  {siteContact.instagram}<Send className="w-4 h-4 rotate-180" />
                </a>
              </motion.div>
            </div>
          </motion.main>
        )}

        {/* ===== CONTACT ===== */}
        {currentPage === "contact" && (
          <motion.main key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="flex-1 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm mb-8" style={{ color: C.textL }}>
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="hover:opacity-70 transition-opacity cursor-pointer">خانه</a>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <span style={{ color: C.dark }} className="font-medium">تماس با ما</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: C.dark }}>تماس با ما</h1>
                <div className="w-16 h-1 rounded-full mb-4" style={{ background: gradH }} />
                <p className="text-base mb-10" style={{ color: C.textL }}>سوالی دارید یا می‌خواهید سفارش خاصی ثبت کنید؟ با ما در ارتباط باشید.</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <motion.div className="md:col-span-2 flex flex-col gap-4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                  {[
                    { icon: <Phone className="w-6 h-6" />, title: "تلفن", value: siteContact.phone, sub: "شنبه تا پنج‌شنبه" },
                    { icon: <Instagram className="w-6 h-6" />, title: "اینستاگرام", value: siteContact.instagram, sub: "پیج رسمی ما", href: siteContact.instagramUrl },
                    { icon: <Mail className="w-6 h-6" />, title: "ایمیل", value: siteContact.email, sub: "پاسخ‌گویی سریع" },
                    { icon: <Clock className="w-6 h-6" />, title: "ساعت کاری", value: siteContact.hours, sub: siteContact.hoursSub },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #FFE0E8, #FFF0F3)" }}>
                          <span style={{ color: C.red }}>{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm mb-1" style={{ color: C.text }}>{item.title}</h3>
                          {item.href ? (
                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer" style={{ color: C.red }}>{item.value}</a>
                          ) : (<p className="text-sm font-medium" style={{ color: C.text }}>{item.value}</p>)}
                          <p className="text-xs mt-0.5" style={{ color: C.textL + "88" }}>{item.sub}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
                <motion.div className="md:col-span-3" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl font-bold mb-6" style={{ color: C.dark }}>فرم تماس</h2>
                    {formSent ? (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: gradH }}><Send className="w-8 h-8 text-white" /></div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: C.dark }}>پیام شما ارسال شد!</h3>
                        <p className="text-sm" style={{ color: C.textL }}>در اسرع وقت با شما تماس خواهیم گرفت.</p>
                        <button onClick={() => setFormSent(false)} className="mt-6 px-6 py-2 rounded-full text-white text-sm font-medium cursor-pointer" style={{ background: gradH }}>ارسال پیام جدید</button>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col gap-5">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: C.text }}>نام و نام خانوادگی *</label>
                          <input type="text" value={contactForm.name} onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))} placeholder="مثال: سارا محمدی" className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: C.text }}>شماره تماس</label>
                          <input type="tel" value={contactForm.phone || userPhone} onChange={e => setContactForm(p => ({ ...p, phone: e.target.value }))} placeholder="۰۹۱۲XXXXXXXX" className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} dir="ltr" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: C.text }}>موضوع</label>
                          <input type="text" value={contactForm.subject} onChange={e => setContactForm(p => ({ ...p, subject: e.target.value }))} placeholder="مثال: سفارش عروسک" className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: C.text }}>پیام شما *</label>
                          <textarea rows={4} value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))} placeholder="پیام خود را بنویسید..." className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} />
                        </div>
                        <button onClick={sendContactMessage} className="w-full py-3.5 rounded-xl text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg cursor-pointer" style={{ background: gradH }}>ارسال پیام</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>


      {/* ADMIN PANEL - DISABLED */}
      {false && isAdmin && (

        <div className="fixed bottom-6 right-6 z-[70]">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5 w-[calc(100vw-3rem)] sm:w-80 max-w-sm max-h-[70vh] sm:max-h-[80vh] overflow-y-auto" dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base" style={{ color: C.dark }}>پنل مدیریت</h3>
              <button onClick={logoutAdmin} className="text-xs px-3 py-1 rounded-full text-white cursor-pointer" style={{ background: C.red }}>خروج</button>
            </div>
            {/* Slider Management */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold" style={{ color: C.text }}>اسلایدر هیرو</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: C.pink }}>{heroSlides.length}</span>
              </div>
              <button onClick={addSlide} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Plus className="w-4 h-4" />افزودن اسلاید</button>
              <div className="flex flex-col gap-2 mt-3">
                {heroSlides.map((slide, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => moveSlide(i, -1)} disabled={i === 0} className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer ${i===0?"opacity-20 cursor-not-allowed":"hover:bg-pink-50"}`} style={{color:C.dark}}><ChevronUp className="w-4 h-4"/></button>
                      <button onClick={() => moveSlide(i, 1)} disabled={i === heroSlides.length - 1} className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer ${i===heroSlides.length-1?"opacity-20 cursor-not-allowed":"hover:bg-pink-50"}`} style={{color:C.dark}}><ChevronDown className="w-4 h-4"/></button>
                    </div>
                    <img src={slide.img} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: C.text }}>{slide.badge || slide.t1}</p>
                      <p className="text-[10px] truncate" style={{ color: C.textL }}>{slide.t2}{slide.t3}</p>
                    </div>
                    <button onClick={() => editSlide(i)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer" style={{ color: "#3B82F6" }}><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteSlide(i)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer" style={{ color: C.red }}><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                {heroSlides.length === 0 && (
                  <p className="text-xs text-center py-4" style={{ color: C.textL }}>اسلایدی وجود ندارد</p>
                )}
              </div>
            </div>
            {/* Orders Management */}
            <div className="border-t pt-4 mt-2" style={{ borderColor: C.light + "33" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold" style={{ color: C.text }}>سفارشات مشتریان</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: C.dark }}>{userOrders.length}</span>
              </div>
              {userOrders.length > 0 ? (
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {userOrders.slice(0, 10).map((order, oi) => (
                    <div key={order.id} className="p-2 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold" style={{ color: C.dark }}>{order.id}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white" style={{ background: order.status === "\u062a\u062d\u0648\u06cc\u0644 \u062f\u0627\u062f\u0647 \u0634\u062f" ? "#22c55e" : C.pink }}>{order.status}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {order.items.slice(0, 3).map((item, ii) => (
                          <img key={ii} src={fixImg(item.img)} alt="" className="w-6 h-6 rounded object-cover" />
                        ))}
                        <span className="text-[10px]" style={{ color: C.textL }}>{order.items.length} کالا</span>
                        <span className="text-[10px] font-bold mr-auto" style={{ color: C.dark }}>{formatPriceNum(order.total)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px]" style={{ color: C.textL }}>{order.date}</span>
                        <button onClick={() => { const ns = [...userOrders]; ns[oi].status = ns[oi].status === "در حال پردازش" ? "ارسال شد" : "تحویل داده شد"; setUserOrders(ns); localStorage.setItem("cb_orders", JSON.stringify(ns)); }} className="text-[10px] font-bold cursor-pointer" style={{ color: "#3B82F6" }}>تغییر وضعیت</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-center py-3" style={{ color: C.textL }}>سفارشی ثبت نشده</p>
              )}
            </div>
          </div>
        </div>
        )}


          {/* Slide Form Modal */}
          {showSlideForm && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg" style={{ color: C.dark }}>{editingSlideIdx !== null ? "ویرایش اسلاید" : "افزودن اسلاید جدید"}</h3>
                  <button onClick={() => setShowSlideForm(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer" style={{ color: C.textL }}><X className="w-5 h-5" /></button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-40 rounded-xl overflow-hidden" style={{ background: C.bg }}>
                    {slideForm.img ? (
                      <img src={slideForm.img} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <Upload className="w-8 h-8" style={{ color: C.light }} />
                        <span className="text-xs" style={{ color: C.textL }}>عکس را آپلود کنید</span>
                      </div>
                    )}
                    <label className="absolute top-2 right-2 px-3 py-1.5 rounded-lg text-white text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1.5" style={{ background: gradH }}>
                      <Upload className="w-3.5 h-3.5" />{slideForm.img ? "تغییر عکس" : "آپلود"}
                      <input type="file" accept="image/*" className="hidden" onChange={uploadSlideImg} disabled={uploading} />
                    </label>
                    {!slideForm.img && (
                      <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" onChange={uploadSlideImg} disabled={uploading} />
                      </label>
                    )}
                  </div>
                  {uploading && <p className="text-xs text-center" style={{ color: C.textL }}>در حال آپلود...</p>}
                  <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>بج بالایی</label><input type="text" value={slideForm.badge} onChange={e => setSlideForm(p => ({ ...p, badge: e.target.value }))} placeholder="مثلاً: فروشگاه آنلاین چیکوبری" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                  <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>عنوان خط ۱</label><input type="text" value={slideForm.t1} onChange={e => setSlideForm(p => ({ ...p, t1: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                  <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>عنوان خط ۲</label><input type="text" value={slideForm.t2} onChange={e => setSlideForm(p => ({ ...p, t2: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                  <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>عنوان خط ۳</label><input type="text" value={slideForm.t3} onChange={e => setSlideForm(p => ({ ...p, t3: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                  <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>توضیحات</label><textarea value={slideForm.desc} onChange={e => setSlideForm(p => ({ ...p, desc: e.target.value }))} rows={2} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                  <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>متن دکمه</label><input type="text" value={slideForm.btn} onChange={e => setSlideForm(p => ({ ...p, btn: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={saveSlide} className="flex-1 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}>{editingSlideIdx !== null ? "ذخیره تغییرات" : "افزودن اسلاید"}</button>
                    <button onClick={() => setShowSlideForm(false)} className="px-6 py-3 rounded-xl font-bold text-sm border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.textL }}>انصراف</button>
                  </div>
                </div>
              </div>
            </div>

          )}


      {/* Admin floating button - DISABLED */}
      {false && isAdmin && (
        <div className="fixed bottom-6 right-6 z-[70]">
          <AnimatePresence>
            {adminFabOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAdminFabOpen(false)} className="fixed inset-0 z-[69]" />
                <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 10 }} transition={{ duration: 0.2 }} className="absolute bottom-16 right-0 w-52 bg-white rounded-2xl shadow-2xl border overflow-hidden z-[71]" style={{ borderColor: C.light + "44" }}>
                  <button onClick={() => { setAdminFabOpen(false); setCurrentPage("admin"); }} className="w-full text-right px-4 py-3 text-sm font-medium hover:bg-pink-50 transition-colors cursor-pointer flex items-center gap-3" style={{ color: C.text }}><Settings className="w-4 h-4" style={{ color: C.red }} />پنل مدیریت</button>
                  <div className="border-t" style={{ borderColor: C.light + "22" }} />
                  <button onClick={() => { setAdminFabOpen(false); logoutAdmin(); }} className="w-full text-right px-4 py-3 text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-3 text-red-500"><LogOut className="w-4 h-4" />خروج از مدیریت</button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <button onClick={() => setAdminFabOpen(!adminFabOpen)} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white shadow-xl flex items-center justify-center hover:opacity-90 transition-all cursor-pointer z-[71] relative" style={{ background: adminFabOpen ? C.red : C.dark + "CC" }}>
            {adminFabOpen ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* UNIFIED LOGIN MODAL */}
      <AnimatePresence>
        {showAuth && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAuth(false)} className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} transition={{ type:  "spring", damping: 28, stiffness: 300 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[81] w-[90vw] max-w-md max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden" dir="rtl">
              <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
                {/* Header */}
                <div className="p-6 pb-0 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #FFE0E8, #FFF0F3)" }}>
                    {authMode === "login" ? <LogIn className="w-8 h-8" style={{ color: C.red }} /> : <UserPlus className="w-8 h-8" style={{ color: C.red }} />}
                  </div>
                  <h2 className="text-xl font-extrabold mb-1" style={{ color: C.dark }}>{authMode === "login" ? "ورود به حساب" : "ثبت‌نام"}</h2>
                  <p className="text-xs" style={{ color: C.textL }}>{authMode === "login" ? "شماره تماس و رمز عبور خود را وارد کنید" : "حساب جدید بسازید"}</p>
                </div>
                {/* Form */}
                <div className="p-6 flex flex-col gap-4">
                  {authMode === "register" && (
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>نام و نام خانوادگی</label>
                      <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder="مثال: سارا محمدی" className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>شماره تماس</label>
                    <input type="tel" value={authMode === "login" ? loginPhone : regPhone} onChange={e => { if (authMode === "login") setLoginPhone(e.target.value); else setRegPhone(e.target.value); }} placeholder={authMode === "login" ? "۰۹۱۲XXXXXXXX" : "۰۹۱۲XXXXXXXX"} className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>رمز عبور</label>
                    <input type="password" value={authMode === "login" ? loginPass : regPass} onChange={e => { if (authMode === "login") setLoginPass(e.target.value); else setRegPass(e.target.value); }} onKeyDown={e => { if (e.key === "Enter") { if (authMode === "login") doLogin(); else doRegister(); } }} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} dir="ltr" />
                  </div>
                  {authMode === "register" && (
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>تکرار رمز عبور</label>
                      <input type="password" value={regPass2} onChange={e => setRegPass2(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} dir="ltr" />
                    </div>
                  )}
                  <button onClick={authMode === "login" ? doLogin : doRegister} className="w-full py-3.5 rounded-xl text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg cursor-pointer" style={{ background: gradH }}>
                    {authMode === "login" ? "ورود" : "ثبت‌نام"}
                  </button>
                  <div className="text-center">
                    <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")} className="text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity" style={{ color: C.red }}>
                      {authMode === "login" ? "حساب ندارید؟ ثبت‌نام کنید" : "حساب دارید؟ ورود کنید"}
                    </button>
                  </div>
                </div>
              </div>
              {/* Modal Toast - inside modal so always visible */}
              <AnimatePresence>
                {toast && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-6 overflow-hidden">
                    <div className="py-2.5 px-4 rounded-xl text-white text-sm font-bold text-center flex items-center justify-center gap-2" style={{ background: C.dark }}>
                      {toast}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Close Button */}
              <div className="px-6 pb-5">
                <button onClick={() => { setShowAuth(false); }} className="w-full py-2.5 rounded-xl font-bold text-xs border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.textL }}>بستن</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

        {/* ===== USER PANEL ===== */}
        {currentPage === "user" && (
          <motion.main key="user" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="flex-1 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm mb-8" style={{ color: C.textL }}>
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="hover:opacity-70 transition-opacity cursor-pointer">خانه</a>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <span style={{ color: C.dark }} className="font-medium">پنل کاربری</span>
              </motion.div>
              {!isLoggedIn ? (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #FFE0E8, #FFF0F3)" }}>
                    <User className="w-10 h-10" style={{ color: C.pink }} />
                  </div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: C.dark }}>وارد حساب کاربری شوید</h2>
                  <p className="text-sm mb-8" style={{ color: C.textL }}>برای مشاهده سفارشات و اطلاعات خود وارد شوید.</p>
                  <button onClick={() => { setShowAuth(true); setAuthMode("login"); }} className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity shadow-lg cursor-pointer" style={{ background: gradH }}>
                    <LogIn className="w-4 h-4" />ورود / ثبت‌نام
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* User Profile Card */}
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 text-white relative overflow-hidden" style={{ background: gradV }}>
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-extrabold border-4 border-white/30 shadow-xl" style={{ background: "rgba(255,255,255,0.2)" }}>{userName.charAt(0)}</div>
                      <div className="text-center sm:text-right flex-1">
                        <h2 className="text-2xl font-extrabold mb-1">{userName}</h2>
                        <p className="text-white/80 text-sm">{userPhone}</p>
                        {userEmail && <p className="text-white/60 text-xs mt-1">{userEmail}</p>}
                        <div className="flex items-center gap-4 mt-3 justify-center sm:justify-start">
                          <div className="text-center">
                            <div className="text-xl sm:text-2xl font-extrabold">{userOrders.filter(o => o.phone === userPhone).length}</div>
                            <div className="text-white/70 text-[10px] sm:text-xs">سفارش</div>
                          </div>
                          <div className="w-px h-8 bg-white/20" />
                          <div className="text-center">
                            <div className="text-xl sm:text-2xl font-extrabold">{likedProducts.size}</div>
                            <div className="text-white/70 text-[10px] sm:text-xs">علاقه‌مندی</div>
                          </div>
                          <div className="w-px h-8 bg-white/20" />
                          <div className="text-center">
                            <div className="text-sm sm:text-lg font-extrabold">{userOrders.filter(o => o.phone === userPhone).reduce((s, o) => s + o.total, 0).toLocaleString("fa-IR")}</div>
                            <div className="text-white/70 text-[10px] sm:text-xs">{currencyLabel()} خرید</div>
                          </div>
                        </div>
                      </div>
                      <button onClick={startEditProfile} className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-bold backdrop-blur-sm cursor-pointer"><Edit3 className="w-4 h-4" />ویرایش پروفایل</button>
                    </div>
                  </motion.div>

                  {/* Edit Profile Form */}
                  <AnimatePresence>
                  {editingProfile && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-8">
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="font-bold text-lg" style={{ color: C.dark }}>ویرایش پروفایل</h3>
                          <button onClick={() => setEditingProfile(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer" style={{ color: C.textL }}><X className="w-5 h-5" /></button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>نام *</label><input type="text" value={profileForm.name} onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} placeholder="نام شما" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                          <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>ایمیل</label><input type="email" value={profileForm.email} onChange={e => setProfileForm(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" dir="ltr" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                          <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>رمز عبور جدید (خالی = بدون تغییر)</label><input type="password" value={profileForm.pass} onChange={e => setProfileForm(p => ({ ...p, pass: e.target.value }))} placeholder="رمز عبور جدید" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                          <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>تکرار رمز عبور جدید</label><input type="password" value={profileForm.pass2} onChange={e => setProfileForm(p => ({ ...p, pass2: e.target.value }))} placeholder="تکرار رمز عبور" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} /></div>
                        </div>
                        <div className="flex items-center gap-3 mt-5">
                          <button onClick={saveUserProfile} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Save className="w-4 h-4" />ذخیره تغییرات</button>
                          <button onClick={() => setEditingProfile(false)} className="px-6 py-2.5 rounded-xl text-sm font-bold border hover:bg-gray-50 transition-colors cursor-pointer" style={{ borderColor: C.light + "66", color: C.textL }}>انصراف</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>

                  {/* Orders Section */}
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
                    <h2 className="text-xl font-bold mb-4" style={{ color: C.dark }}>سفارش‌های من</h2>
                    <div className="w-12 h-1 rounded-full mb-6" style={{ background: gradH }} />
                  </motion.div>
                  {(() => { const mo = userOrders.map((o, gi) => ({ ...o, _gi: gi })).filter(o => o.phone === userPhone); return mo.length === 0 ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16 bg-white rounded-2xl shadow-sm">
                      <Package className="w-12 h-12 mx-auto mb-4" style={{ color: C.light }} />
                      <h3 className="font-bold mb-1" style={{ color: C.dark }}>سفارشی ثبت نشده</h3>
                      <p className="text-sm mb-6" style={{ color: C.textL }}>هنوز سفارشی ثبت نکرده‌اید.</p>
                      <button onClick={() => navTo("archive")} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-bold cursor-pointer" style={{ background: gradH }}><ShoppingBag className="w-4 h-4" />مشاهده محصولات</button>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {mo.map((order) => (
                        <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="font-bold text-sm" style={{ color: C.dark }}>{order.id}</span>
                              <span className="text-xs mr-2" style={{ color: C.textL }}>{order.date}</span>
                            </div>
                            <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: order.status === "تحویل داده شد" ? "#22c55e" : order.status === "ارسال شد" ? "#3B82F6" : C.pink }}>{order.status}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex items-center gap-2 flex-1">
                              {order.items.slice(0, 4).map((item, ii) => (
                                <div key={ii} className="w-12 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(160deg, #FFF5F7, #FFE0E8)" }}><img src={fixImg(item.img)} alt={item.name} className="w-12 h-12 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = "none" }} /></div>
                              ))}
                              {order.items.length > 4 && <span className="text-xs font-bold" style={{ color: C.textL }}>+{order.items.length - 4}</span>}
                            </div>
                            <div className="text-left sm:text-right">
                              <div className="text-xs" style={{ color: C.textL }}>مبلغ کل</div>
                              <div className="font-extrabold text-lg" style={{ color: C.dark }}>{formatPriceNum(order.total)}</div>
                            </div>
                          </div>
                          <div className="border-t mt-4 pt-3 flex flex-wrap gap-2" style={{ borderColor: C.light + "33" }}>
                            {order.items.map((item, ii) => (
                              <span key={ii} className="text-[10px] px-2 py-1 rounded-lg" style={{ background: C.bg, color: C.textL }}>{item.name} × {item.qty}</span>
                            ))}
                          </div>
                          {/* Address Section */}
                          <div className="border-t mt-4 pt-3" style={{ borderColor: C.light + "33" }}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" style={{ color: C.pink }} />
                                <span className="text-xs font-bold" style={{ color: C.dark }}>آدرس ارسال:</span>
                              </div>
                              {editingOrderIdx === order._gi ? null : (
                                <button onClick={() => { setEditingOrderIdx(order._gi); setEditAddrVal(order.address); }} className="text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer" style={{ color: "#3B82F6" }}><Edit3 className="w-3 h-3" />ویرایش</button>
                              )}
                            </div>
                            {editingOrderIdx === order._gi ? (
                              <div className="flex flex-col sm:flex-row gap-2">
                                <input type="text" value={editAddrVal} onChange={e => setEditAddrVal(e.target.value)} className="flex-1 px-3 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: C.bg, color: C.text }} />
                                <div className="flex gap-2">
                                  <button onClick={() => saveOrderAddress(order._gi)} className="flex items-center gap-1 px-3 py-2 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Save className="w-3 h-3" />ذخیره</button>
                                  <button onClick={() => setEditingOrderIdx(null)} className="px-3 py-2 rounded-xl text-xs font-bold border hover:bg-gray-50 transition-colors cursor-pointer" style={{ borderColor: C.light + "66", color: C.textL }}>انصراف</button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs" style={{ color: C.textL }}>{order.address || ""}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ); })()}

                  {/* My Messages */}
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
                    <h2 className="text-xl font-bold mb-4 mt-10" style={{ color: C.dark }}>پیام‌های من</h2>
                    <div className="w-12 h-1 rounded-full mb-6" style={{ background: gradH }} />
                  </motion.div>
                  {(() => { const myMsgs = contactMessages.filter(m => !userPhone || m.phone === userPhone); return myMsgs.length === 0 ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 bg-white rounded-2xl shadow-sm">
                      <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: C.light }} />
                      <h3 className="font-bold mb-1" style={{ color: C.dark }}>پیامی ثبت نشده</h3>
                      <p className="text-sm mb-6" style={{ color: C.textL }}>هنوز پیامی ارسال نکرده‌اید.</p>
                      <button onClick={() => navTo("contact")} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-bold cursor-pointer" style={{ background: gradH }}><Send className="w-4 h-4" />ارسال پیام جدید</button>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {myMsgs.map((msg) => (
                        <motion.div key={msg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold" style={{ color: C.dark }}>{msg.subject || ""}</span>
                            <span className="text-xs" style={{ color: C.textL }}>{msg.date}</span>
                          </div>
                          <div className="rounded-xl p-3 mb-3" style={{ background: C.bg }}>
                            <p className="text-sm" style={{ color: C.text }}>{msg.message}</p>
                          </div>
                          {msg.reply ? (
                            <div className="rounded-xl p-3 border" style={{ borderColor: "#22c55e44", background: "#f0fdf4" }}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold" style={{ color: "#16a34a" }}>پاسخ فروشگاه:</span>
                                <span className="text-[10px]" style={{ color: C.textL }}>{msg.replyDate}</span>
                              </div>
                              <p className="text-sm" style={{ color: C.text }}>{msg.reply}</p>
                            </div>
                          ) : null}
                        </motion.div>
                      ))}
                    </div>
                  ); })()}

                  {/* Logout */}
                  <div className="mt-8 text-center">
                    <button onClick={doLogout} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm border-2 hover:bg-red-50 transition-colors cursor-pointer" style={{ borderColor: C.red, color: C.red }}>
                      <LogOut className="w-4 h-4" />خروج از حساب کاربری
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.main>
        )}

        {/* ===== ADMIN PAGE ===== */}
        {isAdmin && currentPage === "admin" && (
          <div className="flex min-h-screen" style={{ background: "#fdf8f9" }}>
            {/* ===== ADMIN SIDEBAR (Desktop - Full Height Right) ===== */}
            <aside className="hidden md:flex flex-col w-60 shrink-0 fixed right-0 top-0 h-screen z-40" style={{ background: "linear-gradient(180deg, #1a0b1e 0%, #2d0a1a 50%, #1a0b1e 100%)" }}>
              <div className="p-5 border-b border-white/10 mt-2">
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={siteHeader.logoUrl} alt={siteHeader.brandName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <span className="text-white text-sm font-bold block">{siteHeader.brandName}</span>
                    <span className="text-white/40 text-[10px]">پنل مدیریت</span>
                  </div>
                </a>
              </div>
              <nav className="p-2.5 flex-1 flex flex-col gap-0.5 overflow-y-auto">
                {[
                  { key: "dashboard", label: "داشبورد", Icon: LayoutGrid },
                  { key: "slides", label: "اسلایدر", Icon: Image },
                  { key: "categories", label: "دسته‌بندی‌ها", Icon: LayoutGrid },
                  { key: "features", label: "ویژگی‌ها", Icon: BadgeCheck },
                  { key: "reviews", label: "نظرات", Icon: MessageSquare },
                  { key: "products", label: "محصولات", Icon: Package },
                  { key: "orders", label: "سفارشات", Icon: ClipboardList },
                  { key: "users", label: "کاربران", Icon: UserPlus },
                  { key: "about", label: "درباره ما", Icon: FileText },
                  { key: "contact", label: "تماس با ما", Icon: Phone },
                  { key: "header", label: "هدر", Icon: Menu },
                  { key: "footer", label: "فوتر", Icon: Settings },
                  { key: "payment", label: "تنظیمات پرداخت", Icon: Wallet },
                  { key: "formfields", label: "فیلدهای فرم سفارش", Icon: ListChecks },
                  { key: "messages", label: "پیام‌ها", Icon: MessageSquare },
                ].map(item => (
                  <button key={item.key} onClick={() => setAdminSection(item.key)}
                    className={"flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer " + (adminSection === item.key ? "text-white shadow-lg" : "text-white/60 hover:text-white/90 hover:bg-white/5")}
                    style={adminSection === item.key ? { background: "linear-gradient(135deg, #ff4d6d, #c9184a)" } : {}}>
                    <item.Icon className="w-[18px] h-[18px] shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="p-2.5 border-t border-white/10">
                <button onClick={() => { logoutAdmin(); navTo("home"); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
                  <LogOut className="w-[18px] h-[18px] shrink-0" />
                  <span>خروج از حساب</span>
                </button>
              </div>
            </aside>

            {/* ===== ADMIN CONTENT ===== */}
            <div className="flex-1 md:mr-60 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm mb-8" style={{ color: C.textL }}>
                <a href="#" onClick={(e) => { e.preventDefault(); navTo("home"); }} className="hover:opacity-70 transition-opacity cursor-pointer">خانه</a>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <span style={{ color: C.dark }} className="font-medium">{adminSection === "dashboard" ? "داشبورد" : "پنل مدیریت"}</span>
              </motion.div>

              {adminSection === "dashboard" && (
              <>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ color: C.dark }}>داشبورد</h1>
                  <span className="px-3 py-0.5 rounded-full text-white text-xs font-bold" style={{ background: C.dark }}>ادمین</span>
                </div>
                <div className="w-16 h-1 rounded-full mb-6" style={{ background: gradH }} />
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {[
                  { n: toFa(products.length), l: "محصول", icon: <Package className="w-5 h-5" />, iconBg: "#FEE2E2", iconColor: "#EF4444" },
                  { n: toFa(userOrders.length), l: "سفارش", icon: <ShoppingBag className="w-5 h-5" />, iconBg: "#DBEAFE", iconColor: "#3B82F6" },
                  { n: toFa(heroSlides.length), l: "اسلاید", icon: <Eye className="w-5 h-5" />, iconBg: "#FCE7F3", iconColor: "#EC4899" },
                  { n: toFa(cats.length), l: "دسته‌بندی", icon: <Sparkles className="w-5 h-5" />, iconBg: "#FEF3C7", iconColor: "#F59E0B" },
                  { n: toFa(reviews.length), l: "نظر", icon: <Star className="w-5 h-5" />, iconBg: "#D1FAE5", iconColor: "#10B981" },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden">
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: s.iconBg, color: s.iconColor }}>{s.icon}</div>
                    <div className="text-3xl font-extrabold mt-2" style={{ color: "#4a0e17" }}>{s.n}</div>
                    <div className="text-sm mt-1" style={{ color: "#6c757d" }}>{s.l}</div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Orders Card */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold" style={{ color: "#4a0e17" }}>آخرین سفارشات</h2>
                  <button onClick={() => setAdminSection("orders")} className="text-sm font-bold hover:opacity-70 transition-opacity cursor-pointer" style={{ color: "#ef476f" }}>مشاهده همه</button>
                </div>
                {userOrders.length === 0 ? (
                  <p className="text-sm text-center py-8" style={{ color: "#6c757d" }}>سفارشی ثبت نشده است.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {userOrders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center" style={{ background: "#fdf2f8" }}>
                          {order.items[0] && <img src={fixImg(order.items[0].img)} alt="" className="w-10 h-10 object-contain" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate" style={{ color: "#4a0e17" }}>{order.id}</p>
                          <p className="text-[11px]" style={{ color: "#6c757d" }}>{order.date} — {order.items.length} کالا</p>
                        </div>
                        <div className="text-left shrink-0">
                          <p className="text-sm font-extrabold" style={{ color: "#4a0e17" }}>{formatPriceNum(order.total)}</p>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#fce7f3", color: "#ef476f" }}>{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              </>
              )}

              {/* Non-dashboard sections */}
              {adminSection !== "dashboard" && (
              <>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ color: C.dark }}>پنل مدیریت</h1>
                  <span className="px-3 py-0.5 rounded-full text-white text-xs font-bold" style={{ background: C.dark }}>ادمین</span>
                </div>
                <div className="w-16 h-1 rounded-full mb-6" style={{ background: gradH }} />
              </motion.div>

              {/* Mobile Admin Tabs */}
              <div className="md:hidden flex gap-2 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
                {[
                  { key: "dashboard", label: "داشبورد", Icon: LayoutGrid },
                  { key: "slides", label: "اسلایدر", Icon: Image },
                  { key: "categories", label: "دسته‌بندی‌ها", Icon: LayoutGrid },
                  { key: "features", label: "ویژگی‌ها", Icon: BadgeCheck },
                  { key: "reviews", label: "نظرات", Icon: MessageSquare },
                  { key: "products", label: "محصولات", Icon: Package },
                  { key: "orders", label: "سفارشات", Icon: ClipboardList },
                  { key: "users", label: "کاربران", Icon: UserPlus },
                  { key: "about", label: "درباره ما", Icon: FileText },
                  { key: "contact", label: "تماس با ما", Icon: Phone },
                  { key: "header", label: "هدر", Icon: Menu },
                  { key: "footer", label: "فوتر", Icon: Settings },
                  { key: "payment", label: "تنظیمات پرداخت", Icon: Wallet },
                  { key: "formfields", label: "فیلدهای فرم سفارش", Icon: ListChecks },
                  { key: "messages", label: "پیام‌ها", Icon: MessageSquare },
                ].map(item => (
                  <button key={item.key} onClick={() => setAdminSection(item.key)}
                    className={"flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 " + (adminSection === item.key ? "text-white shadow-lg" : "bg-white hover:bg-pink-50")}
                    style={adminSection === item.key ? { background: gradH } : { color: C.textL, border: "1px solid " + C.light + "44" }}>
                    <item.Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* === SLIDES SECTION === */}
              {adminSection === "slides" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold" style={{ color: C.dark }}>مدیریت اسلایدر</h2>
                    <button onClick={addSlide} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Plus className="w-4 h-4" />افزودن اسلاید</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {heroSlides.map((slide, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                        <div className="flex flex-col gap-0.5">
                          <button onClick={() => moveSlide(i, -1)} disabled={i === 0} className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer ${i===0?"opacity-20 cursor-not-allowed":"hover:bg-pink-50"}`} style={{color:C.dark}}><ChevronUp className="w-4 h-4"/></button>
                          <button onClick={() => moveSlide(i, 1)} disabled={i === heroSlides.length - 1} className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer ${i===heroSlides.length-1?"opacity-20 cursor-not-allowed":"hover:bg-pink-50"}`} style={{color:C.dark}}><ChevronDown className="w-4 h-4"/></button>
                        </div>
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 flex items-center justify-center" style={{ background: C.bg }}><img src={slide.img} alt="" className="w-16 h-16 object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none" }} /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate" style={{ color: C.text }}>{slide.badge}</p>
                          <p className="text-[10px] truncate" style={{ color: C.textL }}>{slide.t1} {slide.t2}{slide.t3}</p>
                        </div>
                        <button onClick={() => editSlide(i)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer" style={{ color: "#3B82F6" }}><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => deleteSlide(i)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer" style={{ color: C.red }}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                  {heroSlides.length === 0 && <p className="text-sm text-center py-8" style={{ color: C.textL }}>اسلایدی وجود ندارد.</p>}
                </motion.div>
              )}

              {/* === CATEGORIES SECTION === */}
              {adminSection === "categories" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold" style={{ color: C.dark }}>مدیریت دسته‌بندی‌ها</h2>
                    <button onClick={() => { setCatForm({ n: "", icon: "" }); setEditingCatIdx(-1); }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Plus className="w-4 h-4" />افزودن دسته‌بندی</button>
                  </div>
                  {editingCatIdx !== null && (
                    <div className="border rounded-2xl p-5 mb-5" style={{ borderColor: C.light + "44", background: C.bg }}>
                      <h3 className="font-bold text-sm mb-4" style={{ color: C.dark }}>{editingCatIdx !== null && editingCatIdx >= 0 ? "ویرایش دسته‌بندی" : "دسته‌بندی جدید"}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>نام دسته‌بندی *</label><input type="text" value={catForm.n} onChange={e => setCatForm(p => ({ ...p, n: e.target.value }))} placeholder="مثلاً: عروسک خوراکی" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>آیکون *</label>
                          <div className="flex items-center gap-2">
                            <select value={isIconUrl(catForm.icon) ? "" : catForm.icon} onChange={e => setCatForm(p => ({ ...p, icon: e.target.value }))} className="flex-1 px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }}><option value="">انتخاب آیکون</option>{catIconList.map(ci => <option key={ci.key} value={ci.key}>{ci.label}</option>)}</select>
                            <label className="relative px-3 py-2.5 rounded-xl text-white text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0" style={{ background: gradH }}>
                              <Upload className="w-3.5 h-3.5" />آپلود
                              <input type="file" accept="image/*" className="hidden" onChange={uploadCatIcon} disabled={catIconUploading} />
                            </label>
                          </div>
                          {catIconUploading && <p className="text-xs mt-1" style={{ color: C.textL }}>در حال آپلود...</p>}
                          {isIconUrl(catForm.icon) && <div className="mt-2 w-10 h-10 rounded-lg overflow-hidden" style={{ background: C.bg }}><img src={catForm.icon} alt="" className="w-full h-full object-contain" /></div>}
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button onClick={() => {
                          if (!catForm.n || !catForm.icon) { setToast(""); setTimeout(() => setToast("نام و آیکون را انتخاب کنید"), 10); return; }
                          const isEditCat = editingCatIdx >= 0;
                          if (isEditCat) { const ns = [...cats]; ns[editingCatIdx!] = { ...catForm }; setCats(ns); }
                          else { setCats(p => [...p, { ...catForm }]); }
                          setCatForm({ n: "", icon: "" }); setEditingCatIdx(null);
                          setToast(""); setTimeout(() => setToast(isEditCat ? "دسته‌بندی ویرایش شد" : "دسته‌بندی اضافه شد"), 10);
                        }} className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}>{editingCatIdx !== null && editingCatIdx >= 0 ? "ذخیره تغییرات" : "افزودن"}</button>
                        <button onClick={() => { setCatForm({ n: "", icon: "" }); setEditingCatIdx(null); }} className="flex-1 py-2.5 rounded-xl font-bold text-sm border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.textL }}>انصراف</button>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cats.map((cat, i) => (
                      <div key={cat.n} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: C.bg, color: C.dark }}><CatIconRender icon={cat.icon} className="w-6 h-6 object-contain" /></div>
                        <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate" style={{ color: C.text }}>{cat.n}</p></div>
                        <button onClick={() => { setCatForm({ ...cat }); setEditingCatIdx(i); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors shrink-0 cursor-pointer" style={{ color: "#3B82F6" }}><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => { if (!confirm("حذف شود؟")) return; setCats(p => p.filter((_, j) => j !== i)); setToast(""); setTimeout(() => setToast("دسته‌بندی حذف شد"), 10); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors shrink-0 cursor-pointer" style={{ color: C.red }}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                  {cats.length === 0 && <p className="text-sm text-center py-8" style={{ color: C.textL }}>دسته‌بندی‌ای وجود ندارد.</p>}
                </motion.div>
              )}

              {/* === FEATURES SECTION === */}
              {adminSection === "features" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold" style={{ color: C.dark }}>مدیریت ویژگی‌ها</h2>
                    <button onClick={() => { setFeatForm({ icon: "", t: "", d: "" }); setEditingFeatIdx(-1); }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Plus className="w-4 h-4" />افزودن ویژگی</button>
                  </div>
                  {editingFeatIdx !== null && (
                    <div className="border rounded-2xl p-5 mb-5" style={{ borderColor: C.light + "44", background: C.bg }}>
                      <h3 className="font-bold text-sm mb-4" style={{ color: C.dark }}>{editingFeatIdx !== null && editingFeatIdx >= 0 ? "ویرایش ویژگی" : "ویژگی جدید"}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>ایموجی آیکون *</label><input type="text" value={featForm.icon} onChange={e => setFeatForm(p => ({ ...p, icon: e.target.value }))} placeholder="🚚" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 text-2xl" style={{ borderColor: C.light + "66", background: "white", color: C.text }} dir="ltr" /></div>
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>عنوان *</label><input type="text" value={featForm.t} onChange={e => setFeatForm(p => ({ ...p, t: e.target.value }))} placeholder="ارسال رایگان" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>توضیحات *</label><input type="text" value={featForm.d} onChange={e => setFeatForm(p => ({ ...p, d: e.target.value }))} placeholder="برای خریدهای بالای ۵۰۰ هزار تومان" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button onClick={() => {
                          if (!featForm.icon || !featForm.t || !featForm.d) { setToast(""); setTimeout(() => setToast("تمام فیلدها را پر کنید"), 10); return; }
                          const isEditFeat = editingFeatIdx >= 0;
                          if (isEditFeat) { const ns = [...features]; ns[editingFeatIdx!] = { ...featForm }; setFeatures(ns); }
                          else { setFeatures(p => [...p, { ...featForm }]); }
                          setFeatForm({ icon: "", t: "", d: "" }); setEditingFeatIdx(null);
                          setToast(""); setTimeout(() => setToast(isEditFeat ? "ویژگی ویرایش شد" : "ویژگی اضافه شد"), 10);
                        }} className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}>{editingFeatIdx !== null && editingFeatIdx >= 0 ? "ذخیره تغییرات" : "افزودن"}</button>
                        <button onClick={() => { setFeatForm({ icon: "", t: "", d: "" }); setEditingFeatIdx(null); }} className="flex-1 py-2.5 rounded-xl font-bold text-sm border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.textL }}>انصراف</button>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((f, i) => (
                      <div key={f.t} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: C.bg }}>{f.icon}</div>
                        <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate" style={{ color: C.text }}>{f.t}</p><p className="text-[11px] truncate" style={{ color: C.textL }}>{f.d}</p></div>
                        <button onClick={() => { setFeatForm({ ...f }); setEditingFeatIdx(i); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors shrink-0 cursor-pointer" style={{ color: "#3B82F6" }}><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => { if (!confirm("حذف شود؟")) return; setFeatures(p => p.filter((_, j) => j !== i)); setToast(""); setTimeout(() => setToast("ویژگی حذف شد"), 10); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors shrink-0 cursor-pointer" style={{ color: C.red }}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                  {features.length === 0 && <p className="text-sm text-center py-8" style={{ color: C.textL }}>ویژگی‌ای وجود ندارد.</p>}
                </motion.div>
              )}

              {/* === REVIEWS SECTION === */}
              {adminSection === "reviews" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold" style={{ color: C.dark }}>مدیریت نظرات</h2>
                    <button onClick={() => { setRevForm({ name: "", text: "", rating: 5 }); setEditingRevIdx(-1); }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Plus className="w-4 h-4" />افزودن نظر</button>
                  </div>
                  {editingRevIdx !== null && (
                    <div className="border rounded-2xl p-5 mb-5" style={{ borderColor: C.light + "44", background: C.bg }}>
                      <h3 className="font-bold text-sm mb-4" style={{ color: C.dark }}>{editingRevIdx !== null && editingRevIdx >= 0 ? "ویرایش نظر" : "نظر جدید"}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>نام *</label><input type="text" value={revForm.name} onChange={e => setRevForm(p => ({ ...p, name: e.target.value }))} placeholder="مثلاً: سارا م." className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>امتیاز</label>
                          <div className="flex items-center gap-1 mt-2">{[1,2,3,4,5].map(s => (<button key={s} type="button" onClick={() => setRevForm(p => ({ ...p, rating: s }))} className="cursor-pointer"><Star className={`w-6 h-6 ${s <= revForm.rating ? "fill-[#F26A8D] text-[#F26A8D]" : "text-gray-300"}`} /></button>))}</div>
                        </div>
                        <div className="sm:col-span-2"><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>متن نظر *</label><textarea value={revForm.text} onChange={e => setRevForm(p => ({ ...p, text: e.target.value }))} placeholder="متن نظر مشتری..." rows={3} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button onClick={() => {
                          if (!revForm.name || !revForm.text) { setToast(""); setTimeout(() => setToast("نام و متن نظر را وارد کنید"), 10); return; }
                          const isEditRev = editingRevIdx >= 0;
                          if (isEditRev) { const ns = [...reviews]; ns[editingRevIdx!] = { ...revForm }; setReviews(ns); }
                          else { setReviews(p => [...p, { ...revForm }]); }
                          setRevForm({ name: "", text: "", rating: 5 }); setEditingRevIdx(null);
                          setToast(""); setTimeout(() => setToast(isEditRev ? "نظر ویرایش شد" : "نظر اضافه شد"), 10);
                        }} className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}>{editingRevIdx !== null && editingRevIdx >= 0 ? "ذخیره تغییرات" : "افزودن"}</button>
                        <button onClick={() => { setRevForm({ name: "", text: "", rating: 5 }); setEditingRevIdx(null); }} className="flex-1 py-2.5 rounded-xl font-bold text-sm border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.textL }}>انصراف</button>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {reviews.map((r, i) => (
                      <div key={r.name + i} className="flex items-start gap-3 p-3 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1"><p className="text-sm font-bold" style={{ color: C.text }}>{r.name}</p><div className="flex gap-0.5">{[1,2,3,4,5].map(s => (<Star key={s} className={`w-3 h-3 ${s <= r.rating ? "fill-[#F26A8D] text-[#F26A8D]" : "text-gray-200"}`} />))}</div></div>
                          <p className="text-xs leading-relaxed" style={{ color: C.textL }}>{r.text}</p>
                        </div>
                        <button onClick={() => { setRevForm({ ...r }); setEditingRevIdx(i); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors shrink-0 cursor-pointer" style={{ color: "#3B82F6" }}><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => { if (!confirm("حذف شود؟")) return; setReviews(p => p.filter((_, j) => j !== i)); setToast(""); setTimeout(() => setToast("نظر حذف شد"), 10); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors shrink-0 cursor-pointer" style={{ color: C.red }}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                  {reviews.length === 0 && <p className="text-sm text-center py-8" style={{ color: C.textL }}>نظری وجود ندارد.</p>}
                </motion.div>
              )}

              {/* === PRODUCTS SECTION === */}
              {adminSection === "products" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold" style={{ color: C.dark }}>مدیریت محصولات</h2>
                    <button onClick={() => { setProdForm({ name: "", price: "", oldPrice: "", discount: "", img: "", desc: "", cat: "" }); setEditingProductIdx(null); setShowProdForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Plus className="w-4 h-4" />افزودن محصول</button>
                  </div>
                  {showProdForm && (
                    <div className="border rounded-2xl p-5 mb-5" style={{ borderColor: C.light + "44", background: C.bg }}>
                      <h3 className="font-bold text-sm mb-4" style={{ color: C.dark }}>{editingProductIdx !== null ? "ویرایش محصول" : "افزودن محصول جدید"}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>عکس محصول *</label>
                          <div className="relative w-full h-36 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer" style={{ borderColor: C.light + "66" }} onClick={() => document.getElementById("prod-img-input")?.click()}>
                            {prodForm.img ? <img src={prodForm.img} className="w-full h-full object-cover pointer-events-none" /> : <span className="text-xs" style={{ color: C.textL }}>عکس را آپلود کنید</span>}
                            <div className="absolute top-2 right-2 px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-1.5" style={{ background: gradH }}>
                              <Upload className="w-3.5 h-3.5" />{prodForm.img ? "تغییر عکس" : "آپلود"}
                            </div>
                            <input id="prod-img-input" type="file" accept="image/*" className="hidden" onChange={uploadProdImg} disabled={prodUploading} />
                          </div>
                          {prodUploading && <p className="text-xs text-center mt-1" style={{ color: C.textL }}>در حال آپلود...</p>}
                        </div>
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>نام محصول *</label><input type="text" value={prodForm.name || ""} onChange={e => setProdForm(p => ({ ...p, name: e.target.value }))} placeholder="مثلاً: ماگ صورتی" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>دسته‌بندی *</label><select value={prodForm.cat || ""} onChange={e => setProdForm(p => ({ ...p, cat: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }}><option value="">انتخاب دسته‌بندی</option>{cats.map(c => <option key={c.n} value={c.n}>{c.n}</option>)}</select></div>
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>قیمت (تومان) *</label><input type="text" value={prodForm.price || ""} onChange={e => setProdForm(p => ({ ...p, price: e.target.value }))} placeholder="مثلاً: ۲۴۵,۰۰۰" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} dir="ltr" /></div>
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>قیمت قبلی</label><input type="text" value={prodForm.oldPrice || ""} onChange={e => setProdForm(p => ({ ...p, oldPrice: e.target.value }))} placeholder="مثلاً: ۳۲۰,۰۰۰" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} dir="ltr" /></div>
                        <div><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>تخفیف</label><input type="text" value={prodForm.discount || ""} onChange={e => setProdForm(p => ({ ...p, discount: e.target.value }))} placeholder="مثلاً: ۲۳٪" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} dir="ltr" /></div>
                        <div className="sm:col-span-2"><label className="block text-xs font-medium mb-1.5" style={{ color: C.text }}>توضیحات</label><textarea value={prodForm.desc || ""} onChange={e => setProdForm(p => ({ ...p, desc: e.target.value }))} placeholder="توضیحات محصول..." rows={3} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      </div>
                      <div className="flex gap-3 mt-5">
                        <button onClick={saveProduct} className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}>{editingProductIdx !== null ? "ذخیره تغییرات" : "ذخیره محصول"}</button>
                        <button onClick={() => { setShowProdForm(false); setEditingProductIdx(null); }} className="flex-1 py-2.5 rounded-xl font-bold text-sm border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.textL }}>انصراف</button>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((pr, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 flex items-center justify-center" style={{ background: C.bg }}><img src={pr.img} alt={pr.name} className="w-14 h-14 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = "none" }} /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate" style={{ color: C.text }}>{pr.name}</p>
                          <p className="text-[10px]" style={{ color: C.textL }}>{pr.cat}</p>
                          <p className="text-xs font-extrabold" style={{ color: C.dark }}>{formatPrice(pr.price)}</p>
                        </div>
                        <button onClick={() => editProduct(i)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors shrink-0 cursor-pointer" style={{ color: "#3B82F6" }}><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => deleteProduct(i)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors shrink-0 cursor-pointer" style={{ color: C.red }}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                  {products.length === 0 && <p className="text-sm text-center py-8" style={{ color: C.textL }}>محصولی وجود ندارد.</p>}
                </motion.div>
              )}

              {/* === ORDERS SECTION === */}
              {adminSection === "orders" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-5" style={{ color: C.dark }}>مدیریت سفارشات</h2>
                  {userOrders.length === 0 ? (
                    <p className="text-sm text-center py-8" style={{ color: C.textL }}>سفارشی ثبت نشده است.</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {userOrders.map((order, oi) => (
                        <div key={order.id} className="p-4 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold" style={{ color: C.dark }}>{order.id}</span>
                              <span className="text-xs" style={{ color: C.textL }}>{order.date}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-extrabold" style={{ color: C.dark }}>{formatPriceNum(order.total)}</span>
                              <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: order.status === "تحویل داده شد" ? "#22c55e" : order.status === "ارسال شد" ? "#3B82F6" : C.pink }}>{order.status}</span>
                              <button onClick={() => { const ns = [...userOrders]; ns[oi].status = ns[oi].status === "در حال پردازش" ? "ارسال شد" : "تحویل داده شد"; setUserOrders(ns); localStorage.setItem("cb_orders", JSON.stringify(ns)); }} className="text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer" style={{ color: "#fff", background: "#3B82F6" }}>تغییر وضعیت</button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {order.items.map((item, ii) => (
                              <div key={ii} className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{ background: C.bg }}>
                                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center" style={{ background: C.bg }}><img src={fixImg(item.img)} alt="" className="w-8 h-8 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = "none" }} /></div>
                                <span className="text-[10px]" style={{ color: C.textL }}>{item.name} x {item.qty}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* === USERS SECTION === */}
              {adminSection === "users" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-bold" style={{ color: C.dark }}>مدیریت کاربران</h2>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: C.bg, color: C.textL }}>{adminUsers.length} کاربر</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { loadAdminUsers(); }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: "#3B82F6" }}><RotateCcw className="w-4 h-4" />بارگذاری مجدد</button>
                      <button onClick={addUser} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><UserPlus className="w-4 h-4" />افزودن کاربر</button>
                    </div>
                  </div>
                  {adminUsers.length === 0 ? (
                    <p className="text-sm text-center py-8" style={{ color: C.textL }}>کاربری ثبت نشده است. روی «بارگذاری مجدد» کلیک کنید.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr style={{ borderBottom: "2px solid " + C.light + "44" }}>
                            <th className="text-right py-3 px-2 font-bold" style={{ color: C.dark }}>نام</th>
                            <th className="text-right py-3 px-2 font-bold" style={{ color: C.dark }}>تلفن</th>
                            <th className="text-right py-3 px-2 font-bold hidden sm:table-cell" style={{ color: C.dark }}>ایمیل</th>
                            <th className="text-center py-3 px-2 font-bold" style={{ color: C.dark }}>سفارشات</th>
                            <th className="text-center py-3 px-2 font-bold" style={{ color: C.dark }}>عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminUsers.map((u) => {
                            const uOrderCount = userOrders.filter(o => o.phone === u.phone).length;
                            return (
                              <tr key={u.phone} style={{ borderBottom: "1px solid " + C.light + "22" }} className="hover:bg-pink-50/50 transition-colors">
                                <td className="py-3 px-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: gradH }}>{u.name.charAt(0)}</div>
                                    <span className="font-medium" style={{ color: C.dark }}>{u.name}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-2" style={{ color: C.textL }}>{u.phone}</td>
                                <td className="py-3 px-2 hidden sm:table-cell" style={{ color: C.textL }}>{u.email || "—"}</td>
                                <td className="py-3 px-2 text-center">
                                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: C.bg, color: C.dark }}>{uOrderCount}</span>
                                </td>
                                <td className="py-3 px-2">
                                  <div className="flex items-center justify-center gap-1">
                                    <button onClick={() => editUser(u.phone)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer" style={{ color: "#3B82F6" }}><Edit3 className="w-4 h-4" /></button>
                                    <button onClick={() => deleteUser(u.phone)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer" style={{ color: C.red }}><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {/* === ABOUT SECTION === */}
              {adminSection === "about" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-5" style={{ color: C.dark }}>ویرایش صفحه درباره ما</h2>
                  <div className="flex flex-col gap-4">
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>عنوان صفحه</label><input type="text" value={siteAbout.title} onChange={e => setSiteAbout(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>توضیح کوتاه (هیرو)</label><textarea rows={3} value={siteAbout.desc} onChange={e => setSiteAbout(p => ({ ...p, desc: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>داستان ما (هر پاراگراف با خط جدید)</label><textarea rows={6} value={siteAbout.story} onChange={e => setSiteAbout(p => ({ ...p, story: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>ماموریت ما</label><textarea rows={3} value={siteAbout.mission} onChange={e => setSiteAbout(p => ({ ...p, mission: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <button onClick={() => { localStorage.setItem("cb_site_about", JSON.stringify(siteAbout)); setToast(""); setTimeout(() => setToast("درباره ما ذخیره شد"), 10); }} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Save className="w-4 h-4" />ذخیره تغییرات</button>
                  </div>
                </motion.div>
              )}

              {/* === CONTACT SECTION === */}
              {adminSection === "contact" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-5" style={{ color: C.dark }}>ویرایش صفحه تماس با ما</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>شماره تلفن</label><input type="text" value={siteContact.phone} onChange={e => setSiteContact(p => ({ ...p, phone: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>آیدی اینستاگرام</label><input type="text" value={siteContact.instagram} onChange={e => setSiteContact(p => ({ ...p, instagram: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>لینک اینستاگرام</label><input type="text" value={siteContact.instagramUrl} onChange={e => setSiteContact(p => ({ ...p, instagramUrl: e.target.value }))} dir="ltr" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>ایمیل</label><input type="email" value={siteContact.email} onChange={e => setSiteContact(p => ({ ...p, email: e.target.value }))} dir="ltr" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>ساعت کاری</label><input type="text" value={siteContact.hours} onChange={e => setSiteContact(p => ({ ...p, hours: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>توضیح ساعت کاری</label><input type="text" value={siteContact.hoursSub} onChange={e => setSiteContact(p => ({ ...p, hoursSub: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                  </div>
                  <button onClick={() => { localStorage.setItem("cb_site_contact", JSON.stringify(siteContact)); setToast(""); setTimeout(() => setToast("تماس با ما ذخیره شد"), 10); }} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer mt-5" style={{ background: gradH }}><Save className="w-4 h-4" />ذخیره تغییرات</button>
                </motion.div>
              )}

              {/* === HEADER SECTION === */}
              {adminSection === "header" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: gradH }}><Menu className="w-5 h-5 text-white" /></div>
                    <h2 className="text-lg font-bold" style={{ color: C.dark }}>ویرایش هدر سایت</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-3">
                      <label className="text-xs font-medium self-start" style={{ color: C.textL }}>لوگو</label>
                      <div className="relative group">
                        <img src={siteHeader.logoUrl} alt="لوگو" className="w-20 h-20 rounded-2xl object-cover border-2" style={{ borderColor: C.light + "66" }} />
                        <label className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <Upload className="w-5 h-5 text-white" />
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            const file = e.target.files?.[0]; if (!file) return;
                            const fd = new FormData(); fd.append("file", file);
                            try {
                              const res = await fetch("/api/upload", { method: "POST", body: fd });
                              const data = await res.json();
                              if (data.url) setSiteHeader(p => ({ ...p, logoUrl: "/api/uploads/" + data.url.replace(/^\/uploads\//, "") }));
                            } catch {}
                          }} />
                        </label>
                      </div>
                      <input type="text" value={siteHeader.logoUrl} onChange={e => setSiteHeader(p => ({ ...p, logoUrl: e.target.value }))} placeholder="آدرس لوگو" className="w-full px-3 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text, direction: "ltr", textAlign: "left" }} />
                    </div>
                    {/* Brand Name */}
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>نام برند</label>
                        <input type="text" value={siteHeader.brandName} onChange={e => setSiteHeader(p => ({ ...p, brandName: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} />
                      </div>
                    </div>
                    {/* Instagram Button */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium" style={{ color: C.textL }}>نمایش دکمه اینستاگرام</label>
                        <button onClick={() => setSiteHeader(p => ({ ...p, showInsta: !p.showInsta }))} className={"relative w-11 h-6 rounded-full transition-colors cursor-pointer " + (siteHeader.showInsta ? "" : "bg-gray-200")} style={siteHeader.showInsta ? { background: C.red } : {}}>
                          <div className={"absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all " + (siteHeader.showInsta ? "left-0.5" : "left-[22px]")} />
                        </button>
                      </div>
                      {siteHeader.showInsta && (
                        <>
                          <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>متن دکمه</label><input type="text" value={siteHeader.instaLabel} onChange={e => setSiteHeader(p => ({ ...p, instaLabel: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} /></div>
                          <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>لینک اینستاگرام</label><input type="text" value={siteHeader.instaUrl} onChange={e => setSiteHeader(p => ({ ...p, instaUrl: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text, direction: "ltr", textAlign: "left" }} /></div>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Nav Items */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold" style={{ color: C.dark }}>آیتم‌های منوی ناوبری</label>
                      <button onClick={() => setSiteHeader(p => ({ ...p, navItems: [...p.navItems, { label: "", url: "/" }] }))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer hover:opacity-90 transition-opacity" style={{ background: C.red }}><Plus className="w-3.5 h-3.5" />افزودن</button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {siteHeader.navItems.map((ni, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: C.light }}>{toFa(i + 1)}</span>
                          <input type="text" value={ni.label} onChange={e => setSiteHeader(p => ({ ...p, navItems: p.navItems.map((n, j) => j === i ? { ...n, label: e.target.value } : n) }))} placeholder="عنوان" className="w-36 sm:w-44 px-3 py-2 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 shrink-0" style={{ borderColor: C.light + "66", color: C.text }} />
                          <input type="text" value={ni.url} onChange={e => setSiteHeader(p => ({ ...p, navItems: p.navItems.map((n, j) => j === i ? { ...n, url: e.target.value } : n) }))} placeholder="/path یا https://..." className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text, direction: "ltr", textAlign: "left" }} />
                          <button onClick={() => setSiteHeader(p => ({ ...p, navItems: p.navItems.filter((_, j) => j !== i) }))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shrink-0" style={{ color: C.textL + "88" }}><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] mt-2" style={{ color: C.textL + "88" }}>لینک‌های داخلی: / , /archive , /about , /contact , /cart  |  لینک خارجی: https://...</p>
                  </div>
                  <div className="mt-6 text-center">
                    <button onClick={() => { localStorage.setItem("cb_site_header", JSON.stringify(siteHeader)); setToast(""); setTimeout(() => setToast("هدر ذخیره شد!"), 10); }} className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-lg" style={{ background: gradH }}><Save className="w-4 h-4" />ذخیره تغییرات</button>
                  </div>
                </motion.div>
              )}

              {/* === FOOTER SECTION === */}
              {adminSection === "footer" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-5" style={{ color: C.dark }}>ویرایش فوتر سایت</h2>
                  <div className="flex flex-col gap-5">
                    {/* Column Titles */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>عنوان ستون ۱</label><input type="text" value={siteFooter.col1Title} onChange={e => setSiteFooter(p => ({ ...p, col1Title: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>عنوان ستون ۲</label><input type="text" value={siteFooter.col2Title} onChange={e => setSiteFooter(p => ({ ...p, col2Title: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>عنوان ستون ۳</label><input type="text" value={siteFooter.col3Title} onChange={e => setSiteFooter(p => ({ ...p, col3Title: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    </div>
                    {/* Desc + Copyright */}
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>توضیح فروشگاه</label><textarea rows={3} value={siteFooter.desc} onChange={e => setSiteFooter(p => ({ ...p, desc: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>نام برند (کپی‌رایت)</label><input type="text" value={siteFooter.copyright} onChange={e => setSiteFooter(p => ({ ...p, copyright: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    {/* Quick Links */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium" style={{ color: C.text }}>لینک‌های سریع</label>
                        <button onClick={() => setSiteFooter(p => ({ ...p, quickLinks: [...p.quickLinks, { label: "", url: "/" }] }))} className="text-[10px] font-bold px-2 py-1 rounded-lg text-white cursor-pointer" style={{ background: gradH }}>+ لینک جدید</button>
                      </div>
                      <div className="flex flex-col gap-2">
                        {siteFooter.quickLinks.map((lk, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input type="text" value={lk.label} onChange={e => { const n = [...siteFooter.quickLinks]; n[i] = { ...n[i], label: e.target.value }; setSiteFooter(p => ({ ...p, quickLinks: n })); }} placeholder="متن لینک" className="w-32 px-3 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} />
                            <input type="text" value={lk.url} onChange={e => { const n = [...siteFooter.quickLinks]; n[i] = { ...n[i], url: e.target.value }; setSiteFooter(p => ({ ...p, quickLinks: n })); }} placeholder="/path یا https://..." className="flex-1 px-3 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} dir="ltr" />
                            <button onClick={() => { const n = siteFooter.quickLinks.filter((_, j) => j !== i); setSiteFooter(p => ({ ...p, quickLinks: n })); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shrink-0" style={{ color: C.red }}><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Contact Items */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium" style={{ color: C.text }}>آیتم‌های ارتباط با ما</label>
                        <button onClick={() => setSiteFooter(p => ({ ...p, contactItems: [...p.contactItems, { label: "", value: "", icon: "phone", link: "" }] }))} className="text-[10px] font-bold px-2 py-1 rounded-lg text-white cursor-pointer" style={{ background: gradH }}>+ آیتم جدید</button>
                      </div>
                      <div className="flex flex-col gap-2">
                        {siteFooter.contactItems.map((ci, i) => (
                          <div key={i} className="flex items-center gap-2 flex-wrap">
                            <input type="text" value={ci.label} onChange={e => { const n = [...siteFooter.contactItems]; n[i] = { ...n[i], label: e.target.value }; setSiteFooter(p => ({ ...p, contactItems: n })); }} placeholder="لیبل" className="w-24 px-2 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} />
                            <input type="text" value={ci.value} onChange={e => { const n = [...siteFooter.contactItems]; n[i] = { ...n[i], value: e.target.value }; setSiteFooter(p => ({ ...p, contactItems: n })); }} placeholder="مقدار" className="flex-1 min-w-[120px] px-2 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} />
                            <select value={ci.icon} onChange={e => { const n = [...siteFooter.contactItems]; n[i] = { ...n[i], icon: e.target.value }; setSiteFooter(p => ({ ...p, contactItems: n })); }} className="px-2 py-2 rounded-xl border text-xs outline-none" style={{ borderColor: C.light + "66", background: "white", color: C.text }}>
                              <option value="instagram">اینستاگرام</option><option value="phone">تلفن</option><option value="email">ایمیل</option><option value="clock">ساعت کاری</option>
                            </select>
                            <input type="text" value={ci.link} onChange={e => { const n = [...siteFooter.contactItems]; n[i] = { ...n[i], link: e.target.value }; setSiteFooter(p => ({ ...p, contactItems: n })); }} placeholder="لینک (اختیاری)" className="w-36 px-2 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} />
                            <button onClick={() => { const n = siteFooter.contactItems.filter((_, j) => j !== i); setSiteFooter(p => ({ ...p, contactItems: n })); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shrink-0" style={{ color: C.red }}><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Extra Text */}
                    <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>متن کپی‌رایت پایین فوتر</label><input type="text" value={siteFooter.copyrightText} onChange={e => setSiteFooter(p => ({ ...p, copyrightText: e.target.value }))} placeholder="تمامی حقوق محفوظ است © ..." className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                    <div className="flex justify-center">
                      <button onClick={() => { localStorage.setItem("cb_site_footer", JSON.stringify(siteFooter)); setToast(""); setTimeout(() => setToast("فوتر ذخیره شد"), 10); }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Save className="w-3.5 h-3.5" />ذخیره تغییرات</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* === MESSAGES SECTION === */}
              {adminSection === "payment" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: gradH }}><Wallet className="w-5 h-5 text-white" /></div>
                      <h2 className="text-lg font-bold" style={{ color: C.dark }}>تنظیمات پرداخت و ارسال</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Online Payment */}
                    <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ borderColor: paySettings.onlineEnabled ? C.red + "44" : C.light + "33" }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3B82F6, #60A5FA)" }}><CreditCard className="w-4.5 h-4.5 text-white" /></div>
                          <span className="font-bold text-sm" style={{ color: C.dark }}>پرداخت آنلاین</span>
                        </div>
                        <button onClick={() => setPaySettings(p => ({ ...p, onlineEnabled: !p.onlineEnabled }))} className={"relative w-11 h-6 rounded-full transition-colors cursor-pointer " + (paySettings.onlineEnabled ? "" : "bg-gray-200")} style={paySettings.onlineEnabled ? { background: C.red } : {}}>
                          <div className={"absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all " + (paySettings.onlineEnabled ? "left-0.5" : "left-[22px]")} />
                        </button>
                      </div>
                      <div className="flex flex-col gap-3" style={{ opacity: paySettings.onlineEnabled ? 1 : 0.5, pointerEvents: paySettings.onlineEnabled ? "auto" : "none" }}>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>عنوان</label><input type="text" value={paySettings.onlineTitle} onChange={e => setPaySettings(p => ({ ...p, onlineTitle: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} /></div>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>توضیحات</label><input type="text" value={paySettings.onlineDesc} onChange={e => setPaySettings(p => ({ ...p, onlineDesc: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} /></div>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>کد پذیرنده (مرچنت)</label><input type="text" value={paySettings.gatewayMerchant} onChange={e => setPaySettings(p => ({ ...p, gatewayMerchant: e.target.value }))} placeholder="مثلاً: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text, direction: "ltr", textAlign: "left" }} /></div>
                      </div>
                    </div>
                    {/* Card to Card */}
                    <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ borderColor: paySettings.cardEnabled ? C.red + "44" : C.light + "33" }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8B5CF6, #A78BFA)" }}><CreditCard className="w-4.5 h-4.5 text-white" /></div>
                          <span className="font-bold text-sm" style={{ color: C.dark }}>کارت به کارت</span>
                        </div>
                        <button onClick={() => setPaySettings(p => ({ ...p, cardEnabled: !p.cardEnabled }))} className={"relative w-11 h-6 rounded-full transition-colors cursor-pointer " + (paySettings.cardEnabled ? "" : "bg-gray-200")} style={paySettings.cardEnabled ? { background: C.red } : {}}>
                          <div className={"absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all " + (paySettings.cardEnabled ? "left-0.5" : "left-[22px]")} />
                        </button>
                      </div>
                      <div className="flex flex-col gap-3" style={{ opacity: paySettings.cardEnabled ? 1 : 0.5, pointerEvents: paySettings.cardEnabled ? "auto" : "none" }}>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>عنوان</label><input type="text" value={paySettings.cardTitle} onChange={e => setPaySettings(p => ({ ...p, cardTitle: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} /></div>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>توضیحات</label><input type="text" value={paySettings.cardDesc} onChange={e => setPaySettings(p => ({ ...p, cardDesc: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} /></div>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>شماره کارت</label><input type="text" value={paySettings.cardNumber} onChange={e => setPaySettings(p => ({ ...p, cardNumber: e.target.value }))} placeholder="XXXX-XXXX-XXXX-XXXX" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text, direction: "ltr", textAlign: "left" }} /></div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>نام صاحب کارت</label><input type="text" value={paySettings.cardHolder} onChange={e => setPaySettings(p => ({ ...p, cardHolder: e.target.value }))} placeholder="نام و نام خانوادگی" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} /></div>
                          <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>نام بانک</label><input type="text" value={paySettings.bankName} onChange={e => setPaySettings(p => ({ ...p, bankName: e.target.value }))} placeholder="مثلاً: ملت" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} /></div>
                        </div>
                      </div>
                    </div>
                    {/* Cash on Delivery */}
                    <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ borderColor: paySettings.codEnabled ? C.red + "44" : C.light + "33" }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F59E0B, #FBBF24)" }}><Truck className="w-4.5 h-4.5 text-white" /></div>
                          <span className="font-bold text-sm" style={{ color: C.dark }}>پرداخت در محل</span>
                        </div>
                        <button onClick={() => setPaySettings(p => ({ ...p, codEnabled: !p.codEnabled }))} className={"relative w-11 h-6 rounded-full transition-colors cursor-pointer " + (paySettings.codEnabled ? "" : "bg-gray-200")} style={paySettings.codEnabled ? { background: C.red } : {}}>
                          <div className={"absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all " + (paySettings.codEnabled ? "left-0.5" : "left-[22px]")} />
                        </button>
                      </div>
                      <div className="flex flex-col gap-3" style={{ opacity: paySettings.codEnabled ? 1 : 0.5, pointerEvents: paySettings.codEnabled ? "auto" : "none" }}>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>عنوان</label><input type="text" value={paySettings.codTitle} onChange={e => setPaySettings(p => ({ ...p, codTitle: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} /></div>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>توضیحات</label><input type="text" value={paySettings.codDesc} onChange={e => setPaySettings(p => ({ ...p, codDesc: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text }} /></div>
                      </div>
                    </div>
                    {/* Currency Settings */}
                    <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ borderColor: C.light + "44" }}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8B5CF6, #A78BFA)" }}><Wallet className="w-4.5 h-4.5 text-white" /></div>
                        <span className="font-bold text-sm" style={{ color: C.dark }}>واحد پول</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[{v:"toman",l:"تومان"},{v:"rial",l:"ریال"},{v:"dollar",l:"دلار $"}].map(c => (
                          <button key={c.v} onClick={() => setCurrency(c.v)} className={"py-2.5 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer " + (currency === c.v ? "text-white" : "")} style={{ borderColor: currency === c.v ? C.red : C.light + "66", background: currency === c.v ? C.red : "white", color: currency === c.v ? "white" : C.textL }}>{c.l}</button>
                        ))}
                      </div>
                      {currency === "dollar" && (
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>نرخ دلار (تومان)</label>
                          <input type="number" value={dollarRate} onChange={e => setDollarRate(parseInt(e.target.value) || 1)} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text, direction: "ltr", textAlign: "left" }} />
                          <p className="text-[10px] mt-1" style={{ color: C.textL + "88" }}>هر ۱ دلار = {dollarRate.toLocaleString("fa-IR")} تومان</p>
                        </div>
                      )}
                      <div className="rounded-xl p-3 mt-1" style={{ background: C.bg }}>
                        <p className="text-xs" style={{ color: C.textL }}>واحد پول فعال: <span className="font-bold" style={{ color: C.dark }}>{currency === "toman" ? "تومان" : currency === "rial" ? "ریال" : "دلار ($)"}</span> — تمام قیمت‌های سایت با این واحد نمایش داده می‌شوند.</p>
                      </div>
                    </div>
{/* Shipping Settings */}
                    <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ borderColor: C.light + "44" }}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #22c55e, #4ade80)" }}><Truck className="w-4.5 h-4.5 text-white" /></div>
                        <span className="font-bold text-sm" style={{ color: C.dark }}>تنظیمات ارسال</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>حداقل خرید برای ارسال رایگان (واحد پول)</label><input type="number" value={paySettings.shippingFreeMin} onChange={e => setPaySettings(p => ({ ...p, shippingFreeMin: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text, direction: "ltr", textAlign: "left" }} /></div>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.textL }}>هزینه ارسال (واحد پول)</label><input type="number" value={paySettings.shippingCost} onChange={e => setPaySettings(p => ({ ...p, shippingCost: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", color: C.text, direction: "ltr", textAlign: "left" }} /></div>
                        <div className="rounded-xl p-3 mt-1" style={{ background: C.bg }}>
                          <p className="text-xs" style={{ color: C.textL }}>ارسال برای خریدهای بالای <span className="font-bold" style={{ color: C.dark }}>{formatPriceNum(paySettings.shippingFreeMin)}</span> رایگان و در غیر این صورت <span className="font-bold" style={{ color: C.dark }}>{formatPriceNum(paySettings.shippingCost)}</span> خواهد بود.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button onClick={() => { localStorage.setItem("cb_pay_settings", JSON.stringify(paySettings)); localStorage.setItem("cb_currency", JSON.stringify(currency)); localStorage.setItem("cb_dollar_rate", JSON.stringify(dollarRate)); setToast(""); setTimeout(() => setToast("تنظیمات پرداخت و واحد پول ذخیره شد!"), 10); }} className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-lg" style={{ background: gradH }}><Save className="w-4 h-4" />ذخیره تنظیمات</button>
                  </div>
                </motion.div>
              )}

                            {adminSection === "formfields" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: gradH }}><ListChecks className="w-5 h-5 text-white" /></div>
                      <h2 className="text-lg font-bold" style={{ color: C.dark }}>فیلدهای فرم تکمیل سفارش</h2>
                    </div>
                    <button onClick={() => { setEditFormField(null); setShowFormFieldForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Plus className="w-4 h-4" />افزودن فیلد</button>
                  </div>
                  <p className="text-xs mb-4" style={{ color: C.textL + "aa" }}>فیلدهایی که کاربر هنگام تکمیل سفارش پر می‌کند. می‌توانید افزودن، حذف، ویرایش و جابجایی کنید.</p>
                  <div className="flex flex-col gap-3">
                    {checkoutFields.map((field, i) => (
                      <div key={field.id} className="flex items-center gap-3 p-3.5 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                        <div className="flex flex-col gap-0.5 shrink-0">
                          <button onClick={() => { if (i > 0) { const ns = [...checkoutFields]; [ns[i], ns[i-1]] = [ns[i-1], ns[i]]; setCheckoutFields(ns); } }} disabled={i === 0} className={"w-6 h-6 rounded flex items-center justify-center cursor-pointer " + (i === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-pink-50")} style={{ color: C.dark }}><ChevronUp className="w-4 h-4" /></button>
                          <button onClick={() => { if (i < checkoutFields.length - 1) { const ns = [...checkoutFields]; [ns[i], ns[i+1]] = [ns[i+1], ns[i]]; setCheckoutFields(ns); } }} disabled={i === checkoutFields.length - 1} className={"w-6 h-6 rounded flex items-center justify-center cursor-pointer " + (i === checkoutFields.length - 1 ? "opacity-20 cursor-not-allowed" : "hover:bg-pink-50")} style={{ color: C.dark }}><ChevronDown className="w-4 h-4" /></button>
                        </div>
                        <div className={"flex-1 min-w-0" + (field.enabled ? "" : " opacity-50")}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold" style={{ color: field.enabled ? C.dark : C.textL }}>{field.label}</span>
                            {field.required && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white" style={{ background: C.red }}>ضروری</span>}
                            {!field.enabled && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: "#f3f4f6", color: "#9ca3af" }}>غیرفعال</span>}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: C.bg, color: C.textL }}>{field.type === "textarea" ? "متن بلند" : field.type === "tel" ? "شماره" : field.type === "number" ? "عدد" : "متن"}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: C.bg, color: C.textL }}>{field.width === "half" ? "نیم‌عرض" : "تمام‌عرض"}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: C.bg, color: C.textL }}>{field.dir === "ltr" ? "چپ‌به‌راست" : "راست‌به‌چپ"}</span>
                          </div>
                        </div>
                        <button onClick={() => setCheckoutFields(p => p.map((f, j) => j === i ? { ...f, enabled: !f.enabled } : f))} className={"relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 " + (field.enabled ? "" : "bg-gray-200")} style={field.enabled ? { background: "#22c55e" } : {}}><div className={"absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all " + (field.enabled ? "left-0.5" : "left-[22px]")} /></button>
                        <button onClick={() => { setEditFormField(field); setShowFormFieldForm(true); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-pink-50 transition-colors cursor-pointer shrink-0" style={{ color: C.textL }}><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => { if (!confirm("فیلد حذف شود؟")) return; setCheckoutFields(p => p.filter((_, j) => j !== i)); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shrink-0 text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                    {checkoutFields.length === 0 && <div className="text-center py-10"><p className="text-sm" style={{ color: C.textL }}>هیچ فیلدی تعریف نشده. روی «افزودن فیلد» کلیک کنید.</p></div>}
                  </div>
                  <div className="mt-6 text-center">
                    <button onClick={() => { localStorage.setItem("cb_checkout_fields", JSON.stringify(checkoutFields)); setToast(""); setTimeout(() => setToast("فیلدهای فرم سفارش ذخیره شد!"), 10); }} className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-lg" style={{ background: gradH }}><Save className="w-4 h-4" />ذخیره تغییرات</button>
                  </div>
                </motion.div>
              )}

{adminSection === "messages" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-bold" style={{ color: C.dark }}>پیام‌های تماس با ما</h2>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: C.bg, color: C.textL }}>{contactMessages.length} پیام</span>
                    </div>
                  </div>
                  {contactMessages.length === 0 ? (
                    <p className="text-sm text-center py-8" style={{ color: C.textL }}>پیامی ثبت نشده است.</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {contactMessages.map((msg) => (
                        <div key={msg.id} className="p-4 rounded-xl border" style={{ borderColor: C.light + "44" }}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm" style={{ color: C.dark }}>{msg.name}</span>
                              {msg.phone && <span className="text-xs" style={{ color: C.textL }}>{msg.phone}</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs" style={{ color: C.textL }}>{msg.date}</span>
                              {msg.reply ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#22c55e" }}>پاسخ داده شد</span> : <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: C.pink }}>بدون پاسخ</span>}
                            </div>
                          </div>
                          {msg.subject && <p className="text-xs font-bold mb-1" style={{ color: C.pink }}>موضوع: {msg.subject}</p>}
                          <div className="rounded-lg p-3 mb-3" style={{ background: C.bg }}>
                            <p className="text-sm" style={{ color: C.text }}>{msg.message}</p>
                          </div>
                          {msg.reply ? (
                            <div className="rounded-lg p-3 border" style={{ borderColor: "#22c55e44", background: "#f0fdf4" }}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold" style={{ color: "#16a34a" }}>پاسخ ادمین:</span>
                                <span className="text-[10px]" style={{ color: C.textL }}>{msg.replyDate}</span>
                              </div>
                              <p className="text-sm" style={{ color: C.text }}>{msg.reply}</p>
                            </div>
                          ) : replyingMsgId === msg.id ? (
                            <div className="flex flex-col gap-2">
                              <textarea rows={3} value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="پاسخ خود را بنویسید..." className="w-full px-3 py-2 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 resize-none" style={{ borderColor: C.light + "66", background: "white", color: C.text }} />
                              <div className="flex gap-2">
                                <button onClick={() => saveReply(msg.id)} className="flex items-center gap-1 px-4 py-2 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}><Save className="w-3 h-3" />ارسال پاسخ</button>
                                <button onClick={() => { setReplyingMsgId(null); setReplyText(""); }} className="px-4 py-2 rounded-xl text-xs font-bold border hover:bg-gray-50 transition-colors cursor-pointer" style={{ borderColor: C.light + "66", color: C.textL }}>انصراف</button>
                              </div>
                            </div>
                          ) : (
                            <button onClick={() => { setReplyingMsgId(msg.id); setReplyText(""); }} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer" style={{ color: "#3B82F6" }}><Edit3 className="w-3 h-3" />ارسال پاسخ</button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Form Field Modal */}
              {showFormFieldForm && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-md max-h-[90vh] overflow-y-auto" dir="rtl">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold text-lg" style={{ color: C.dark }}>{editFormField ? "ویرایش فیلد" : "افزودن فیلد جدید"}</h3>
                      <button onClick={() => setShowFormFieldForm(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer" style={{ color: C.textL }}><X className="w-5 h-5" /></button>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>شناسه فیلد (انگلیسی) *</label><input type="text" value={editFormField?.id || ""} onChange={e => setEditFormField(p => p ? { ...p, id: e.target.value.replace(/[^a-zA-Z0-9_]/g, "") } : { id: e.target.value.replace(/[^a-zA-Z0-9_]/g, ""), label: "", placeholder: "", type: "text", required: false, width: "full", dir: "rtl", enabled: true })} placeholder="مثلاً: email" disabled={!!editFormField} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 disabled:bg-gray-100 disabled:cursor-not-allowed" style={{ borderColor: C.light + "66", background: "white", color: C.text }} dir="ltr" /></div>
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>نمایش (لیبل) *</label><input type="text" value={editFormField?.label || ""} onChange={e => setEditFormField(p => p ? { ...p, label: e.target.value } : { id: "", label: e.target.value, placeholder: "", type: "text", required: false, width: "full", dir: "rtl", enabled: true })} placeholder="مثلاً: ایمیل" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>متن راهنما (placeholder)</label><input type="text" value={editFormField?.placeholder || ""} onChange={e => setEditFormField(p => p ? { ...p, placeholder: e.target.value } : { id: "", label: "", placeholder: e.target.value, type: "text", required: false, width: "full", dir: "rtl", enabled: true })} placeholder="مثلاً: email@example.com" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      <div className="grid grid-cols-3 gap-3">
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>نوع فیلد</label><select value={editFormField?.type || "text"} onChange={e => setEditFormField(p => p ? { ...p, type: e.target.value as any } : { id: "", label: "", placeholder: "", type: e.target.value as any, required: false, width: "full", dir: "rtl", enabled: true })} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }}><option value="text">متن</option><option value="tel">شماره</option><option value="number">عدد</option><option value="textarea">متن بلند</option></select></div>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>عرض</label><select value={editFormField?.width || "full"} onChange={e => setEditFormField(p => p ? { ...p, width: e.target.value as any } : { id: "", label: "", placeholder: "", type: "text", required: false, width: e.target.value as any, dir: "rtl" })} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }}><option value="full">تمام عرض</option><option value="half">نیم عرض</option></select></div>
                        <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>جهت</label><select value={editFormField?.dir || "rtl"} onChange={e => setEditFormField(p => p ? { ...p, dir: e.target.value as any } : { id: "", label: "", placeholder: "", type: "text", required: false, width: "full", dir: e.target.value as any })} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }}><option value="rtl">راست به چپ</option><option value="ltr">چپ به راست</option></select></div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: C.bg }}>
                        <span className="text-sm font-medium" style={{ color: C.text }}>فیلد ضروری</span>
                        <button onClick={() => setEditFormField(p => p ? { ...p, required: !p.required } : { id: "", label: "", placeholder: "", type: "text", required: true, width: "full", dir: "rtl" })} className={"relative w-11 h-6 rounded-full transition-colors cursor-pointer " + (editFormField?.required ? "" : "bg-gray-200")} style={editFormField?.required ? { background: C.red } : {}}><div className={"absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all " + (editFormField?.required ? "left-0.5" : "left-[22px]")} /></button>
                      </div>
                      <div className="flex gap-3 mt-2">
                        <button onClick={() => {
                          if (!editFormField || !editFormField.id.trim() || !editFormField.label.trim()) { return; }
                          if (editFormField) {
                            const exists = checkoutFields.findIndex(f => f.id === editFormField.id);
                            if (exists !== -1) {
                              const ns = [...checkoutFields]; ns[exists] = editFormField; setCheckoutFields(ns);
                            } else {
                              setCheckoutFields(p => [...p, editFormField]);
                            }
                          }
                          setShowFormFieldForm(false);
                        }} className="flex-1 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}>{editFormField && checkoutFields.find(f => f.id === editFormField.id) ? "ذخیره تغییرات" : "افزودن فیلد"}</button>
                        <button onClick={() => setShowFormFieldForm(false)} className="px-6 py-3 rounded-xl font-bold text-sm border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.textL }}>انصراف</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* User Form Modal */}
              {showUserForm && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-md max-h-[90vh] overflow-y-auto" dir="rtl">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold text-lg" style={{ color: C.dark }}>{editingUserPhone ? "ویرایش کاربر" : "افزودن کاربر جدید"}</h3>
                      <button onClick={() => setShowUserForm(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer" style={{ color: C.textL }}><X className="w-5 h-5" /></button>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>نام *</label><input type="text" value={userForm.name} onChange={e => setUserForm(p => ({ ...p, name: e.target.value }))} placeholder="نام کاربر" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>شماره تلفن *</label><input type="text" value={userForm.phone} onChange={e => setUserForm(p => ({ ...p, phone: e.target.value }))} placeholder="۰۹۱۲۳۴۵۶۷۸۹" disabled={!!editingUserPhone} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40 disabled:bg-gray-100 disabled:cursor-not-allowed" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>ایمیل</label><input type="email" value={userForm.email} onChange={e => setUserForm(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>{editingUserPhone ? "رمز عبور جدید (خالی = بدون تغییر)" : "رمز عبور *"}</label><input type="password" value={userForm.pass} onChange={e => setUserForm(p => ({ ...p, pass: e.target.value }))} placeholder={editingUserPhone ? "رمز عبور جدید" : "رمز عبور"} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      <div><label className="block text-xs font-medium mb-1" style={{ color: C.text }}>تکرار رمز عبور</label><input type="password" value={userForm.pass2} onChange={e => setUserForm(p => ({ ...p, pass2: e.target.value }))} placeholder="تکرار رمز عبور" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#F49CBB]/40" style={{ borderColor: C.light + "66", background: "white", color: C.text }} /></div>
                      <div className="flex gap-3 mt-2">
                        <button onClick={saveUser} className="flex-1 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }}>{editingUserPhone ? "ذخیره تغییرات" : "افزودن کاربر"}</button>
                        <button onClick={() => setShowUserForm(false)} className="px-6 py-3 rounded-xl font-bold text-sm border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.textL }}>انصراف</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              </> 
              )}

              {/* Logout Admin (Mobile) */}
              <div className="mt-8 text-center md:hidden">
                <button onClick={logoutAdmin} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm border-2 hover:bg-red-50 transition-colors cursor-pointer" style={{ borderColor: C.red, color: C.red }}>
                  <LogOut className="w-4 h-4" />خروج از پنل مدیریت
                </button>
              </div>
              </div>
            </div>
          </div>
        )}

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setCartOpen(false)} className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="fixed top-0 right-0 bottom-0 z-[61] w-full sm:w-[420px] bg-white shadow-2xl flex flex-col overflow-hidden" dir="rtl">
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: C.light + "33" }}>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" style={{ color: C.dark }} />
                  <h2 className="font-bold text-base" style={{ color: C.dark }}>سبد خرید</h2>
                  {cartCount > 0 && <span className="px-2 py-0.5 rounded-full text-white text-[10px] font-bold" style={{ background: C.red }}>{cartCount} کالا</span>}
                </div>
                <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer" style={{ color: C.textL }}><X className="w-5 h-5" /></button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center px-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #FFE0E8, #FFF0F3)" }}>
                    <ShoppingBag className="w-8 h-8" style={{ color: C.pink }} />
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color: C.dark }}>سبد خرید خالی است</p>
                  <p className="text-xs mb-5" style={{ color: C.textL + "88" }}>محصولات مورد علاقه خود را اضافه کنید</p>
                  <button onClick={() => { setCartOpen(false); navTo("archive"); }} className="px-6 py-2 rounded-full text-white text-sm font-bold cursor-pointer" style={{ background: gradH }}>مشاهده محصولات</button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                    {cart.map((item) => {
                      const itemTotal = parsePrice(item.price) * item.qty;
                      return (
                        <div key={item.idx} className="flex gap-3 p-3 rounded-xl bg-gray-50/80">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 flex items-center justify-center cursor-pointer" style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #FFE0E8 100%)" }} onClick={() => { setCartOpen(false); navTo("product", item.idx); }}>
                            <img src={item.img} alt={item.name} className="w-12 h-12 object-contain" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-1">
                              <h3 className="font-bold text-xs truncate" style={{ color: C.text }}>{item.name}</h3>
                              <button onClick={() => removeFromCart(item.idx)} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors shrink-0 cursor-pointer" style={{ color: C.textL + "88" }}><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 bg-white rounded-lg p-0.5 shadow-sm">
                                <button onClick={() => updateQty(item.idx, -1)} className="w-6 h-6 rounded flex items-center justify-center hover:opacity-70 cursor-pointer" style={{ color: C.dark }}><Minus className="w-3 h-3" /></button>
                                <span className="w-6 text-center text-xs font-bold" style={{ color: C.text }}>{item.qty}</span>
                                <button onClick={() => updateQty(item.idx, 1)} className="w-6 h-6 rounded flex items-center justify-center hover:opacity-70 cursor-pointer" style={{ color: C.dark }}><Plus className="w-3 h-3" /></button>
                              </div>
                              <span className="font-extrabold text-sm" style={{ color: C.dark }}>{formatPriceNum(itemTotal)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Drawer Footer */}
                  <div className="border-t px-5 py-4 flex flex-col gap-2.5" style={{ borderColor: C.light + "33", background: C.bg }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: C.textL }}>جمع کل:</span>
                      <span className="text-lg font-extrabold" style={{ color: C.dark }}>{formatPriceNum(cartTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: C.textL }}>ارسال:</span>
                      <span className="text-sm font-bold" style={{ color: cartTotal >= paySettings.shippingFreeMin ? "#22c55e" : C.dark }}>{cartTotal >= paySettings.shippingFreeMin ? "رایگان" : formatPriceNum(paySettings.shippingCost)}</span>
                    </div>
                    <button onClick={() => { setCartOpen(false); navTo("checkout"); }} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm cursor-pointer" style={{ background: gradV }}>
                      <Send className="w-4 h-4" />ادامه فرایند تسویه
                    </button>
                    <div className="flex gap-2">
                      <button onClick={() => { setCartOpen(false); }} className="flex-1 py-2.5 rounded-xl font-bold text-xs border-2 hover:bg-white/50 transition-colors cursor-pointer" style={{ borderColor: C.light, color: C.dark }}>ادامه خرید</button>
                      <button onClick={() => { setCartOpen(false); navTo("cart"); }} className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white cursor-pointer" style={{ background: gradH }}>مشاهده سبد خرید</button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FOOTER - hidden on admin page */}
      {currentPage !== "admin" && (
      <footer className="bg-white border-t py-8 sm:py-12 mt-auto" style={{ borderColor: C.light + "33" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Chicoberry" className="h-8 w-8 rounded-full object-cover" />
                <span className="font-extrabold text-lg" style={{ color: C.dark }}>{siteFooter.copyright}</span>
              </div>
              <h4 className="font-bold mb-2 text-sm" style={{ color: C.dark }}>{siteFooter.col1Title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: C.textL }}>{siteFooter.desc}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm" style={{ color: C.dark }}>{siteFooter.col2Title}</h4>
              <ul className="space-y-2.5">
                {siteFooter.quickLinks.filter(l => l.label).map((lk, i) => (
                  <li key={i}><a href={lk.url} className="text-sm hover:opacity-70 transition-opacity cursor-pointer" style={{ color: C.textL }}>{lk.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm" style={{ color: C.dark }}>{siteFooter.col3Title}</h4>
              <div className="space-y-3">
                {siteFooter.contactItems.filter(ci => ci.label || ci.value).map((ci, i) => {
                  const IconComp = ci.icon === "instagram" ? Instagram : ci.icon === "email" ? Mail : ci.icon === "clock" ? Clock : Phone;
                  const href = ci.link || "#";
                  const isExternal = href.startsWith("http");
                  return (
                    <a key={i} href={href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex items-center gap-2.5 text-sm hover:opacity-70 transition-opacity cursor-pointer" style={{ color: C.textL }}><IconComp className="w-4 h-4" />{ci.label}{ci.value ? ": " + ci.value : ""}</a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border-t pt-6 text-center" style={{ borderColor: C.light + "33" }}>
            <p className="text-xs" style={{ color: C.textL + "88" }}>{siteFooter.copyrightText}</p>
          </div>
        </div>
      </footer>
      )}

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 40, x: "-50%", scale: 0.9 }} animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }} exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.9 }} transition={{ type: "spring", damping: 20, stiffness: 300 }} className="fixed bottom-6 sm:bottom-8 left-1/2 z-[90] px-5 sm:px-8 py-3 sm:py-4 rounded-2xl text-white text-sm sm:text-base font-bold shadow-[0_8px_32px_rgba(136,13,30,0.45)] flex items-center gap-2.5 sm:gap-3 whitespace-nowrap border-2 border-white/30 backdrop-blur-none max-w-[90vw]" style={{ background: C.dark }}>
            <ShoppingBag className="w-5 h-5" />{toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL TO TOP */}
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} whileHover={{ scale: 1.1 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white shadow-lg flex items-center justify-center z-40 hover:opacity-90 transition-opacity cursor-pointer" style={{ background: gradH }} aria-label="بازگشت به بالا">
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
