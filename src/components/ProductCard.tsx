import { motion } from "motion/react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
    >
      <Card className="border-none bg-transparent overflow-hidden shadow-none">
        <CardContent className="p-0 relative aspect-[3/4]">
          <div 
            className="w-full h-full overflow-hidden"
            onClick={() => onClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Quick Add Button */}
          <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <Button 
              size="icon" 
              className="rounded-full bg-white text-black hover:bg-accent hover:text-white shadow-xl"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="text-[10px] uppercase tracking-widest bg-background/80 backdrop-blur-sm px-3 py-1 font-medium">
              {product.category}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 text-center" onClick={() => onClick(product)}>
        <h3 className="text-lg font-serif mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
        <p className="text-sm font-medium tracking-widest text-muted-foreground">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
