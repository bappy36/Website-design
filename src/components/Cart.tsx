import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingBag } from "lucide-react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: { product: Product; quantity: number }[];
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

export function Cart({ isOpen, onClose, items, onRemove, onUpdateQuantity }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background border-l">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-serif uppercase tracking-widest flex items-center gap-3">
            <ShoppingBag className="h-6 w-6" /> Your Collection
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[40vh] text-muted-foreground">
              <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-sm uppercase tracking-widest">Your gallery is empty</p>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="h-24 w-20 bg-muted overflow-hidden">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg leading-tight">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                        ${item.product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border">
                        <button 
                          className="px-2 py-1 hover:bg-muted"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                        >
                          -
                        </button>
                        <span className="px-3 text-xs">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 hover:bg-muted"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onRemove(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="mt-auto pt-8">
            <Separator className="mb-6" />
            <div className="flex justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Subtotal</span>
              <span className="font-medium">${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-8">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Shipping</span>
              <span className="text-xs uppercase tracking-widest">Complimentary</span>
            </div>
            <SheetFooter>
              <Button className="w-full h-14 uppercase tracking-widest text-xs bg-primary hover:bg-accent transition-colors">
                Proceed to Checkout
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
