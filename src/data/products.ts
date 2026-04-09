export interface Product {
  id: string;
  name: string;
  category: "Vintage Decor" | "Antique Ceramics" | "Collectible Figurines" | "Rare Books";
  price: number;
  description: string;
  image: string;
  details: string[];
  year?: string;
  origin?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Victorian Gilt Mirror",
    category: "Vintage Decor",
    price: 1250,
    description: "An exquisite 19th-century Victorian mirror with intricate giltwood carving and original glass.",
    image: "https://picsum.photos/seed/mirror/800/1000",
    year: "1880",
    origin: "England",
    details: [
      "Hand-carved giltwood frame",
      "Original mercury-silvered glass",
      "Excellent vintage condition",
      "Height: 120cm, Width: 85cm"
    ]
  },
  {
    id: "2",
    name: "Ming Dynasty Style Vase",
    category: "Antique Ceramics",
    price: 3400,
    description: "A stunning blue and white porcelain vase featuring traditional dragon motifs and floral patterns.",
    image: "https://picsum.photos/seed/vase/800/1000",
    year: "Early 20th Century",
    origin: "China",
    details: [
      "Hand-painted porcelain",
      "Traditional cobalt blue glaze",
      "Signed by the artist at the base",
      "Height: 45cm"
    ]
  },
  {
    id: "3",
    name: "Bronze Art Deco Figurine",
    category: "Collectible Figurines",
    price: 850,
    description: "An elegant Art Deco bronze sculpture of a dancer, mounted on a marble base.",
    image: "https://picsum.photos/seed/statue/800/1000",
    year: "1925",
    origin: "France",
    details: [
      "Solid bronze with dark patina",
      "Genuine black marble base",
      "Classic Art Deco geometric styling",
      "Height: 30cm"
    ]
  },
  {
    id: "4",
    name: "First Edition 'The Great Gatsby'",
    category: "Rare Books",
    price: 15000,
    description: "A rare first edition, second printing of F. Scott Fitzgerald's masterpiece.",
    image: "https://picsum.photos/seed/book/800/1000",
    year: "1925",
    origin: "USA",
    details: [
      "Original cloth binding",
      "Facsimile dust jacket included",
      "Clean pages with minimal foxing",
      "A true collector's item"
    ]
  },
  {
    id: "5",
    name: "Regency Mahogany Desk",
    category: "Vintage Decor",
    price: 2800,
    description: "A magnificent Regency period mahogany writing desk with leather inlay and brass hardware.",
    image: "https://picsum.photos/seed/desk/800/1000",
    year: "1820",
    origin: "Scotland",
    details: [
      "Solid mahogany construction",
      "Original green leather writing surface",
      "Nine working drawers",
      "Width: 150cm, Depth: 75cm"
    ]
  },
  {
    id: "6",
    name: "Meissen Porcelain Clock",
    category: "Antique Ceramics",
    price: 4200,
    description: "A highly decorative Meissen porcelain mantel clock adorned with hand-applied flowers and cherubs.",
    image: "https://picsum.photos/seed/clock/800/1000",
    year: "1860",
    origin: "Germany",
    details: [
      "Exquisite hand-painted details",
      "Mechanical movement (serviced)",
      "Crossed swords mark to base",
      "Height: 55cm"
    ]
  }
];
