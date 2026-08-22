import React, { useState, useEffect } from 'react';
import { ViewMode, Category, Product, CartItem, ThemeConfig } from './types';
import { PRODUCTS, DEFAULT_THEME_CONFIG } from './data/products';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { OtherPages } from './components/OtherPages';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [currentCategory, setCurrentCategory] = useState<Category>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals & Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Editable Theme Config persisted in localStorage
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('ak27_theme_config');
      return saved ? JSON.parse(saved) : DEFAULT_THEME_CONFIG;
    } catch {
      return DEFAULT_THEME_CONFIG;
    }
  });

  // Editable Products list persisted in localStorage
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ak27_products_list');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ak27_theme_config', JSON.stringify(themeConfig));
      if (themeConfig.companyName) {
        document.title = `${themeConfig.companyName} | Timeless Sustainable Luxury`;
      }
    } catch {
      // ignore
    }
  }, [themeConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('ak27_products_list', JSON.stringify(productsList));
    } catch {
      // ignore
    }
  }, [productsList]);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ak27_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ak27_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Scroll to top on view change
  const handleNavigate = (view: ViewMode, category?: Category) => {
    setCurrentView(view);
    if (category) {
      setCurrentCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: Product,
    color: { name: string; hex: string },
    size: string,
    quantity: number
  ) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#4a3129] flex flex-col font-['Satoshi',sans-serif]">
      {/* Header Bar */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        themeConfig={themeConfig}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            products={productsList}
            themeConfig={themeConfig}
            onOpenCustomizer={() => setCustomizerOpen(true)}
          />
        )}

        {currentView === 'shop' && (
          <ShopView
            initialCategory={currentCategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentView !== 'home' && currentView !== 'shop' && (
          <OtherPages view={currentView} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Product Detail Quick Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Search & Dynamic Filter Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Mobile-Optimized Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
      />

      {/* Theme Customizer Admin Drawer */}
      <ThemeCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        config={themeConfig}
        onSaveConfig={(newCfg) => setThemeConfig(newCfg)}
        products={productsList}
        onUpdateProducts={(newProds) => setProductsList(newProds)}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} themeConfig={themeConfig} />
    </div>
  );
}
