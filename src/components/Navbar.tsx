import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
}

export function Navbar({ cartCount, onOpenCart, onSearch }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background border-r">
              <div className="flex flex-col gap-8 mt-12">
                <a href="#" className="text-2xl font-serif hover:text-accent transition-colors">Home</a>
                <a href="#" className="text-2xl font-serif hover:text-accent transition-colors">Collection</a>
                <a href="#" className="text-2xl font-serif hover:text-accent transition-colors">About</a>
                <a href="#" className="text-2xl font-serif hover:text-accent transition-colors">Contact</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl font-serif tracking-widest uppercase cursor-pointer">
            Aethelgard
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12 text-xs uppercase tracking-[0.2em] font-medium">
          <a href="#" className="hover:text-accent transition-colors">Collection</a>
          <a href="#" className="hover:text-accent transition-colors">Curated</a>
          <a href="#" className="hover:text-accent transition-colors">Archive</a>
          <a href="#" className="hover:text-accent transition-colors">Journal</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-1 lg:flex-none justify-end">
          <div className="relative hidden md:block">
            {isSearchOpen ? (
              <div className="flex items-center animate-fade-in">
                <Input 
                  autoFocus
                  placeholder="Search treasures..." 
                  className="w-64 bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 px-0"
                  onChange={(e) => onSearch(e.target.value)}
                />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="relative" onClick={onOpenCart}>
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
