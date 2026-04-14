import { useState, useMemo, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { ProductDetail } from "./components/ProductDetail";
import { Cart } from "./components/Cart";
import { Chatbot } from "./components/Chatbot";
import { products, Product } from "@/data/products";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, TrendingUp, ShieldCheck, Truck } from "lucide-react";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [dynamicPrices, setDynamicPrices] = useState<Record<string, number>>({});

  // Simulated AI Price Optimization
  useEffect(() => {
    const optimizePrices = () => {
      const newPrices: Record<string, number> = {};
      products.forEach(p => {
        // AI logic: slightly adjust prices based on "market trends" (simulated)
        const trend = Math.random() > 0.5 ? 1.02 : 0.98;
        newPrices[p.id] = Math.round(p.price * trend);
      });
      setDynamicPrices(newPrices);
    };

    optimizePrices();
    const interval = setInterval(optimizePrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const categories = ["All", "Vintage Decor", "Antique Ceramics", "Collectible Figurines", "Rare Books"];

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-accent-foreground">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      
      <main>
        <Hero />

        {/* Features Section */}
        <section className="py-20 border-b bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="h-8 w-8 text-accent mb-6" />
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-4">Guaranteed Authenticity</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Every piece in our collection is verified by our expert curators and comes with a certificate of provenance.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-8 w-8 text-accent mb-6" />
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-4">White Glove Delivery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Complimentary worldwide shipping with specialized handling for delicate and high-value treasures.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="h-8 w-8 text-accent mb-6" />
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-4">Dynamic Valuation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Our AI-driven pricing model analyzes global auction trends to ensure you receive the most accurate market value.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Collection Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-accent font-bold mb-4 block">The Collection</span>
              <h2 className="text-4xl md:text-5xl font-serif">Curated Masterpieces</h2>
            </div>
            
            <Tabs defaultValue="All" className="w-full md:w-auto" onValueChange={setActiveCategory}>
              <TabsList className="bg-transparent border-b rounded-none h-auto p-0 flex-wrap justify-start">
                {categories.map(cat => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-4 text-[10px] uppercase tracking-widest font-bold"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard 
                      product={{...product, price: dynamicPrices[product.id] || product.price}} 
                      onClick={setSelectedProduct}
                      onAddToCart={addToCart}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-32 text-center">
              <p className="text-muted-foreground font-serif italic text-xl">No treasures found matching your criteria.</p>
            </div>
          )}
        </section>

        {/* AI Recommendation Banner */}
        <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 blur-3xl rounded-full translate-x-1/2" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-xs uppercase tracking-[0.4em] font-bold">AI Personalized Curation</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                Can't find what you're <br />
                <span className="italic">looking for?</span>
              </h2>
              <p className="text-lg md:text-xl font-light mb-10 opacity-80 leading-relaxed">
                Our AI Curator can help you source specific items from private collections worldwide or recommend pieces based on your existing interior style.
              </p>
              <button className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold">
                Consult Our AI Curator
                <div className="h-[1px] w-12 bg-accent group-hover:w-24 transition-all duration-500" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary/50 py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-serif tracking-widest uppercase mb-8">Aethelgard</h2>
              <p className="max-w-sm text-sm text-muted-foreground leading-relaxed mb-8">
                Preserving history through timeless objects. We specialize in rare antiques from the 17th to early 20th century.
              </p>
              <div className="flex gap-6">
                <a href="https://instagram.com" className="text-xs uppercase tracking-widest hover:text-accent transition-colors">Instagram</a>
                <a href="https://pinterest.com" className="text-xs uppercase tracking-widest hover:text-accent transition-colors">Pinterest</a>
                <a href="/blogs/news" className="text-xs uppercase tracking-widest hover:text-accent transition-colors">Journal</a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Navigation</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="/collections/all" className="hover:text-accent transition-colors">All Collections</a></li>
                <li><a href="/collections/all" className="hover:text-accent transition-colors">New Arrivals</a></li>
                <li><a href="/pages/about" className="hover:text-accent transition-colors">Archive</a></li>
                <li><a href="/pages/about" className="hover:text-accent transition-colors">Our Story</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Support</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="/pages/shipping-returns" className="hover:text-accent transition-colors">Shipping & Returns</a></li>
                <li><a href="/pages/authenticity" className="hover:text-accent transition-colors">Authenticity Guarantee</a></li>
                <li><a href="/pages/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="/pages/contact" className="hover:text-accent transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            <p>© 2026 Aethelgard Antiques. All Rights Reserved.</p>
            <p>Designed for the Timeless.</p>
          </div>
        </div>
      </footer>

      <ProductDetail 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <Chatbot />
    </div>
  );
}
