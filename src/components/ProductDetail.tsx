import { motion, AnimatePresence } from "motion/react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { X, ShoppingBag, Globe, Calendar, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl bg-background border shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 z-10 rounded-full bg-background/50 backdrop-blur-md"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Image Section */}
          <div className="flex-1 relative overflow-hidden bg-muted group min-h-[300px] md:min-h-0">
            <div 
              className={`w-full h-full transition-transform duration-500 cursor-zoom-in ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'}`}
              onClick={() => setIsZoomed(!isZoomed)}
              style={{
                transformOrigin: 'center center'
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {!isZoomed && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-sm text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Click to zoom
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 p-6 md:p-12 overflow-y-auto">
            <div className="max-w-md mx-auto">
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-4 block">
                {product.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-serif mb-6">{product.name}</h2>
              <p className="text-xl md:text-2xl font-light mb-8 tracking-widest">
                ${product.price.toLocaleString()}
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Period</p>
                    <p className="text-sm font-medium">{product.year || "Circa 1900"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Origin</p>
                    <p className="text-sm font-medium">{product.origin || "Unknown"}</p>
                  </div>
                </div>
              </div>

              <Separator className="mb-8" />

              <div className="mb-10">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Specifications</h4>
                <ul className="space-y-3">
                  {product.details.map((detail, i) => (
                    <li key={i} className="text-sm flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  size="lg" 
                  className="w-full h-14 uppercase tracking-widest text-xs bg-primary hover:bg-accent transition-colors"
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Add to Collection
                </Button>
                <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <ShieldCheck className="h-3 w-3" />
                  Certificate of Authenticity Included
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
