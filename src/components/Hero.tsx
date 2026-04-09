import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://picsum.photos/seed/antique-shop/1920/1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-xs uppercase tracking-[0.5em] mb-6 block font-medium opacity-80">
            Est. 1892 — London
          </span>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">
            Timeless Elegance <br />
            <span className="italic">For The Modern Home</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl font-light mb-10 opacity-90 leading-relaxed">
            Discover our curated collection of rare antiques, meticulously sourced from the finest estates across Europe and Asia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="bg-white text-black hover:bg-accent hover:text-white transition-all duration-500 px-10 h-14 uppercase tracking-widest text-xs">
              Explore Collection
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-all duration-500 px-10 h-14 uppercase tracking-widest text-xs">
              Our Story
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-16 bg-white/30 relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white" />
        </div>
      </motion.div>
    </section>
  );
}
