export type Category = 'tees' | 'bottoms' | 'outerwear' | 'headwear' | 'all' | 'new-arrivals';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  fabricDetails: string;
  sustainabilityNote: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  isBestseller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  verified: boolean;
  productSlug: string;
}

export interface FilterState {
  category: Category;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  selectedColor: string | null;
  selectedSize: string | null;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest';
}

export interface ConsciousMetric {
  id: string;
  value: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CategoryCardConfig {
  id: Category;
  title: string;
  subtitle: string;
  image: string;
}

export interface ThemeConfig {
  companyName: string;
  shortName: string;
  copyrightText: string;
  heroHeadline: string;
  heroSubheadline: string;
  
  // Soft as Moss Section
  ethosTitle: string;
  ethosDescription: string;
  ethosVideoUrl: string;
  ethosPosterUrl: string;
  
  // Built for Journey Section
  journeyTitle: string;
  journeySubtitle: string;
  journeyVideoUrl: string;
  journeyPosterUrl: string;
  
  // Categories
  categories: CategoryCardConfig[];
  
  // Metrics
  consciousMetrics: ConsciousMetric[];
}

export type ViewMode = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'size-guide' | 'privacy' | 'terms' | 'returns' | 'checkout';

