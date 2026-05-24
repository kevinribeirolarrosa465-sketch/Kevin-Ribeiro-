import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Phone, 
  MapPin, 
  ChevronRight, 
  ChefHat,
  CreditCard
} from "lucide-react";

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  unit: "kg" | "unidad";
  image: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: "asado-campo",
    name: "Asado de Campo",
    price: 425,
    unit: "kg",
    description: "Excelente asado de campo, tierno y sabroso.",
    image: "/src/assets/images/asado_de_campo_1779469781339.png"
  },
  {
    id: "asado-filo",
    name: "Asado Filo",
    price: 449,
    unit: "kg",
    description: "Corte premium con la grasa justa para el mejor sabor.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "nalga",
    name: "Nalga",
    price: 495,
    unit: "kg",
    description: "Corte magro y tierno, ideal para milanesas o al horno.",
    image: "/src/assets/images/nalga_beef_1779468445112.png"
  },
  {
    id: "cuadril",
    name: "Cuadril",
    price: 525,
    unit: "kg",
    description: "Carne de primera, tierna y jugosa para cualquier ocasión.",
    image: "/src/assets/images/cuadril_beef_cut_1779638856716.png"
  },
  {
    id: "lomo",
    name: "Lomo",
    price: 630,
    unit: "kg",
    description: "El corte más tierno y exclusivo de la vaca.",
    image: "/src/assets/images/lomo_beef_cut_1779639108726.png"
  },
  {
    id: "colita",
    name: "Colita de Cuadril",
    price: 544,
    unit: "kg",
    description: "Un clásico para el horno o la parrilla, sin desperdicio.",
    image: "/src/assets/images/colita_de_cuadril_1779639358246.png"
  },
  {
    id: "falda-parrillera",
    name: "Falda Parrillera",
    price: 304,
    unit: "kg",
    description: "Sabor intenso, el complemento ideal de tu parrillada.",
    image: "/src/assets/images/falda_parrillera_1779639965133.png"
  },
  {
    id: "falda",
    name: "Falda",
    price: 275,
    unit: "kg",
    description: "Corte tradicional para guisos o caldos con mucho sabor.",
    image: "/src/assets/images/falda_grilled_ribs_1779640998653.png"
  },
  {
    id: "aguja",
    name: "Aguja",
    price: 304,
    unit: "kg",
    description: "Carne veteada y jugosa, ideal para la parrilla o estofado.",
    image: "/src/assets/images/aguja_beef_cut_1779640183288.png"
  },
  {
    id: "chuleta-vaca",
    name: "Chuleta de Vaca",
    price: 444,
    unit: "kg",
    description: "Costilla ancha con carne tierna, directo al fuego.",
    image: "/src/assets/images/chuleta_de_vaca_1779640370452.png"
  },
  {
    id: "matambre",
    name: "Matambre",
    price: 544,
    unit: "kg",
    description: "Ideal para matambre relleno o a la pizza en la parrilla.",
    image: "/src/assets/images/matambre_beef_cut_1779640454322.png"
  },
  {
    id: "paleta",
    name: "Centro de Paleta",
    price: 334,
    unit: "kg",
    description: "Corte versátil y tierno, ideal para múltiples preparaciones.",
    image: "/src/assets/images/centro_de_paleta_1779640760091.png"
  },
  {
    id: "mondongo",
    name: "Mondongo",
    price: 305,
    unit: "kg",
    description: "Mondongo de primera calidad, limpio y tierno.",
    image: "/src/assets/images/mondongo_beef_tripe_1779641623574.png"
  },
  {
    id: "higado",
    name: "Hígado",
    price: 305,
    unit: "kg",
    description: "Fresco y de calidad, ideal para bifes encebollados.",
    image: "/src/assets/images/higado_beef_liver_1779641725281.png"
  },
  {
    id: "lengua",
    name: "Lengua",
    price: 290,
    unit: "kg",
    description: "Ideal para preparaciones a la vinagreta o estofados.",
    image: "/src/assets/images/lengua_beef_tongue_1779641874392.png"
  },
  {
    id: "milanesa-carne",
    name: "Milanesa de Carne",
    price: 430,
    unit: "kg",
    description: "Preparadas con la mejor carne, listas para freír u hornear.",
    image: "/src/assets/images/milanesa_de_carne_1779641958141.png"
  },
  {
    id: "milanesa-pollo",
    name: "Milanesa de Pollo",
    price: 304,
    unit: "kg",
    description: "Pechugas seleccionadas y empanadas, sabor y practicidad.",
    image: "/src/assets/images/milanesa_de_pollo_1779642112016.png"
  },
  {
    id: "muslos",
    name: "Muslos",
    price: 190,
    unit: "kg",
    description: "Muslos de pollo frescos, la parte más jugosa.",
    image: "/src/assets/images/muslos_chicken_quarters_1779642338205.png"
  },
  {
    id: "borrego",
    name: "Borrego",
    price: 315,
    unit: "kg",
    description: "Carne de borrego seleccionada, sabor intenso y tierno.",
    image: "/src/assets/images/borrego_lamb_chops_1779642438755.png"
  },
  {
    id: "cordero",
    name: "Cordero",
    price: 345,
    unit: "kg",
    description: "Cordero tierno de primera calidad para tu parrilla.",
    image: "/src/assets/images/cordero_raw_lamb_1779642560984.png"
  },
  {
    id: "lechon",
    name: "Lechón",
    price: 360,
    unit: "kg",
    description: "Carne de cerdo tierna y jugosa para ocasiones especiales.",
    image: "/src/assets/images/lechon_raw_pig_1779642627580.png"
  },
  {
    id: "chorizo-comun",
    name: "Chorizo Común",
    price: 315,
    unit: "kg",
    description: "El infaltable de la parrilla, receta tradicional.",
    image: "/src/assets/images/chorizo_comun_1779642701318.png"
  },
  {
    id: "chorizo-queso",
    name: "Chorizo con Queso",
    price: 335,
    unit: "kg",
    description: "Chorizo artesanal con un corazón de queso fundido.",
    image: "/src/assets/images/chorizo_queso_1779642822388.png"
  },
  {
    id: "calabreza",
    name: "Calabreza",
    price: 390,
    unit: "kg",
    description: "Embutido seco con el toque justo de picante.",
    image: "/src/assets/images/calabreza_skewered_sausage_1779642919065.png"
  },
  {
    id: "chincho",
    name: "Chincho",
    price: 390,
    unit: "kg",
    description: "Chinchulines frescos y limpios para una parrilla perfecta.",
    image: "/src/assets/images/chincho_chinchulines_1779643199876.png"
  },
  {
    id: "pollo-rostizado",
    name: "Pollo Rostizado",
    price: 550,
    unit: "unidad",
    description: "El clásico de la casa, rostizado a la leña.",
    image: "/src/assets/images/pollo_rostizado_whole_chicken_1779643118592.png"
  }
];

const WHATSAPP_NUMBER = "59899827404"; 

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({});
  const [grillItems, setGrillItems] = useState<Product[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // 12-hour rotation logic for "Parrilla del Día"
    const updateGrillItems = () => {
      // Create a seed based on the number of 12-hour periods since epoch
      const hoursSinceEpoch = Math.floor(Date.now() / (12 * 60 * 60 * 1000));
      const index1 = hoursSinceEpoch % PRODUCTS.length;
      const index2 = (hoursSinceEpoch + 1) % PRODUCTS.length;
      const index3 = (hoursSinceEpoch + 2) % PRODUCTS.length;
      setGrillItems([PRODUCTS[index1], PRODUCTS[index2], PRODUCTS[index3]]);
    };

    updateGrillItems();
    const interval = setInterval(updateGrillItems, 1000 * 60 * 10); // Check every 10 mins

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const orderProduct = (product: Product) => {
    const weight = product.unit === "kg" ? (selectedWeights[product.id] || 1) : 1;
    const weightStr = product.unit === "kg" ? ` (${weight >= 1 ? weight + 'kg' : weight * 1000 + 'g'})` : "";
    const message = `Hola! Me gustaría pedir: *${product.name}${weightStr}*.%0A%0A¡Muchas gracias!`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(waUrl, "_blank");
  };

  const schedule = [
    { day: "Lunes", hours: "08:00 - 17:00" },
    { day: "Martes", hours: "08:00 - 17:00" },
    { day: "Miércoles", hours: "08:00 - 17:00" },
    { day: "Jueves", hours: "08:00 - 17:00" },
    { day: "Viernes", hours: "08:00 - 17:00" },
    { day: "Sábado", hours: "07:00 - 16:00" },
    { day: "Domingo", hours: "07:00 - 15:00" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#FF0000] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md py-3 shadow-xl" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scaleX: [1, 1.2, 1, 1, 1],
              scaleY: [1, 0.9, 1, 1, 1],
              filter: [
                "brightness(1) drop-shadow(0 0 0px #FF0000)",
                "brightness(1.8) drop-shadow(0 0 15px #FFD700)",
                "brightness(1) drop-shadow(0 0 0px #FF0000)",
                "brightness(3) drop-shadow(0 0 40px #FF4500)", // Fire flare
                "brightness(1) drop-shadow(0 0 0px #FF0000)"
              ]
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 0.5 },
              scaleX: { 
                duration: 4, 
                repeat: Infinity, 
                repeatDelay: 6,
                ease: "easeInOut"
              },
              scaleY: { 
                duration: 4, 
                repeat: Infinity, 
                repeatDelay: 6,
                ease: "easeInOut"
              },
              filter: {
                duration: 4,
                repeat: Infinity,
                repeatDelay: 6,
                times: [0, 0.25, 0.5, 0.6, 1],
                ease: "easeInOut"
              }
            }}
            className="text-2xl md:text-3xl font-black tracking-tighter"
          >
            <span className="bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] border-b-2 border-[#FFD700]/30 bg-[length:200%_auto] bg-clip-text text-transparent animate-shine shadow-2xl">ALFONSO</span>
          </motion.h1>
          
          <div className="flex gap-2 sm:gap-4 md:gap-8 items-center">
            {["menu", "ubicacion", "contacto"].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                animate={{ 
                  filter: [
                    "brightness(1)",
                    "brightness(1.5) drop-shadow(0 0 5px #D4AF37)",
                    "brightness(1)",
                    "brightness(2.5) drop-shadow(0 0 15px #FF4500)",
                    "brightness(1)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 6,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.5, 0.6, 1]
                }}
                className="transition-colors text-sm sm:text-base md:text-lg font-black uppercase tracking-[0.25em] hover:text-[#FFD700] cursor-pointer py-2 px-1 flex items-center justify-center"
              >
                <span className="bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] bg-[length:200%_auto] bg-clip-text text-transparent animate-shine">
                  {item === "menu" ? "Menú" : item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black pt-20 md:pt-32">
        <div className="relative z-10 text-center px-6 w-full max-w-7xl pt-2 md:pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-[8rem] font-display leading-tight mb-6 uppercase tracking-[0.05em] scale-x-110 origin-center select-none">
              <motion.span 
                animate={{ 
                  color: ["#1a0000", "#FF0000", "#1a0000"],
                  textShadow: [
                    "0 0 20px rgba(0,0,0,1)", 
                    "0 0 50px rgba(255,0,0,0.8), 0 0 100px rgba(255,0,0,0.4)",
                    "0 0 20px rgba(0,0,0,1)"
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="block"
              >
                LO DEL
              </motion.span>
              <motion.span 
                animate={{ 
                  color: ["#1a0000", "#FF0000", "#1a0000"],
                  textShadow: [
                    "0 0 20px rgba(0,0,0,1)", 
                    "0 0 50px rgba(255,0,0,0.8), 0 0 100px rgba(255,0,0,0.4)",
                    "0 0 20px rgba(0,0,0,1)"
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="block"
              >
                ALFONSO
              </motion.span>
            </h2>
            <p className="text-base md:text-xl text-stone-600 font-bold tracking-[0.2em] mb-12 uppercase italic animate-pulse">
              Tradición Carnicera • Calidad Superior
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#menu" 
                className="px-8 py-4 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold rounded-full transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(255,0,0,0.3)]"
              >
                Ver Recomendaciones
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola+Alfonso%21+Quisiera+hacer+una+consulta+o+un+pedido.`}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold rounded-full transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Grill Section */}
      <section className="py-24 bg-stone-950 border-b border-stone-900 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-[#FF0000] text-sm font-black tracking-[0.5em] uppercase mb-4 block">Especialidad</span>
            <h3 className="text-5xl md:text-7xl font-display uppercase italic tracking-tighter mb-6">PARRILLA DEL DÍA</h3>
            <p className="text-stone-400 text-lg md:text-xl mb-12 leading-relaxed italic font-serif">
              "Cada día encendemos el fuego con leña seleccionada. Nuestras carnes rotan para que siempre pruebes lo mejor de nuestra heladera."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {grillItems.map((item, i) => (
                <div key={i} className="p-8 bg-stone-900 rounded-3xl border border-stone-800 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl flex flex-col justify-center items-center">
                  <span className="text-[#D4AF37] font-black block mb-2 uppercase text-2xl animate-pulse">{item.name}</span>
                  <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Sugerencia del Maestro</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 border-b border-stone-800 pb-8">
          <div>
            <span className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase mb-2 block">Nuestra Selección</span>
            <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">RECOMENDADOS</h3>
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <ChefHat className="w-6 h-6 text-[#FF0000]" />
            <p className="max-w-xs text-sm">La mejor calidad de la zona, seleccionada personalmente por Alfonso.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {PRODUCTS.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group bg-stone-900/50 rounded-2xl overflow-hidden border border-stone-800 hover:border-[#D4AF37]/30 transition-all flex flex-col hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              <div className="aspect-square overflow-hidden bg-stone-950">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="mb-2">
                  <h4 className="text-base md:text-xl font-bold italic tracking-tight uppercase group-hover:text-[#D4AF37] transition-colors leading-tight">{product.name}</h4>
                  <span className="text-xl md:text-2xl font-black text-[#FF0000] block mt-1">${product.price}</span>
                </div>
                <p className="text-stone-400 text-[10px] md:text-xs mb-4 flex-grow line-clamp-2 md:line-clamp-none opacity-60 group-hover:opacity-100 transition-opacity">{product.description}</p>
                
                {product.unit === "kg" && (
                  <div className="mb-4">
                    <span className="text-[8px] md:text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-2 block">Peso</span>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {[0.5, 1, 2].map((w) => (
                        <button
                          key={w}
                          onClick={() => setSelectedWeights(prev => ({ ...prev, [product.id]: w }))}
                          className={`px-2 py-1 rounded-md text-[9px] md:text-xs font-bold transition-all ${
                            (selectedWeights[product.id] || 1) === w 
                              ? "bg-[#D4AF37] text-black" 
                              : "bg-stone-800 text-stone-400 hover:bg-stone-700"
                          }`}
                        >
                          {w >= 1 ? `${w}kg` : `${w * 1000}g`}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 text-[10px] md:text-xs font-bold text-[#D4AF37]">
                      Total: ${(product.price * (selectedWeights[product.id] || 1)).toFixed(0)}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-auto border-t border-stone-800/50 pt-3">
                  <span className="text-[8px] md:text-[10px] text-stone-500 uppercase tracking-widest font-bold font-mono">Por {product.unit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info & Location Section */}
      <section id="ubicacion" className="py-20 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-[#FF0000] text-xs font-black tracking-[0.3em] uppercase mb-4 block">Contacto & Horarios</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                Presidente Viera y Suárez <br />
                Tu punto de confianza
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 shrink-0">
                      <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold mb-1 uppercase tracking-wider">Ubicación</h5>
                      <p className="text-stone-500 text-[10px]">Presidente Viera & Joaquín Suárez</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 shrink-0">
                      <CreditCard className="w-5 h-5 text-[#FF0000]" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold mb-1 uppercase tracking-wider">Pago</h5>
                      <p className="text-stone-500 text-[9px] leading-tight">
                        Efectivo, BROU, PREX, ITAU, SANTANDER, MASTERCARD
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 shrink-0">
                      <Phone className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold mb-1 uppercase tracking-wider">Atención</h5>
                      <p className="text-stone-500 text-[10px]">Consultas Personalizadas</p>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-900/50 p-6 rounded-[2rem] border border-stone-800 shadow-2xl">
                  <h5 className="text-[#D4AF37] font-black uppercase text-xs mb-4 border-b border-stone-800 pb-3 text-center">Horarios</h5>
                  <div className="space-y-2">
                    {schedule.map((item) => (
                      <div key={item.day} className="flex justify-between items-center text-[10px] md:text-xs uppercase tracking-tighter hover:bg-stone-800/50 p-1.5 rounded transition-colors">
                        <span className="text-stone-400 font-bold">{item.day}</span>
                        <span className="text-stone-100 font-mono font-black text-xs sm:text-sm md:text-base">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-video lg:aspect-square bg-stone-950 rounded-[3rem] border border-stone-800 flex items-center justify-center p-6 overflow-hidden max-w-lg mx-auto">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-10"
              >
                <div className="w-full h-full border-[40px] border-dotted border-[#D4AF37]/50 rounded-full scale-110" />
              </motion.div>
              
              <div className="text-center relative z-10">
                <MapPin className="w-12 h-12 text-[#FF0000] mx-auto mb-4 animate-bounce" />
                <h4 className="text-2xl font-black italic uppercase tracking-tighter sm:text-4xl">Presidente Viera & Suárez</h4>
                <p className="text-stone-500 text-[10px] mt-2 uppercase tracking-[0.5em] font-black">Esquina Tradicional</p>
                <div className="mt-6 flex flex-col gap-2">
                   <a 
                    href="https://www.google.com/maps/search/?api=1&query=-30.907944,-55.543000" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-[#D4AF37] text-black px-5 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Cómo Llegar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="py-12 border-t border-stone-900 text-center px-6">
        <h2 className="text-4xl font-black text-stone-800 uppercase italic tracking-tighter mb-4 opacity-50">Lo del Alfonso</h2>
        <p className="text-stone-500 text-sm max-w-md mx-auto">
          Calidad garantizada. Sabor tradicional uruguayo. Carnicería seleccionada por expertos.
        </p>
        <div className="mt-8 flex justify-center gap-6 text-stone-600 flex-wrap">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola+Alfonso%21+Quisiera+hacer+una+consulta+sobre+los+productos+de+la+carnicería.`} target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors font-mono text-xs uppercase tracking-widest flex items-center gap-1">WhatsApp</a>
            <a href="https://instagram.com/carnicerialode" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors font-mono text-xs uppercase tracking-widest">Instagram</a>
          <a href="https://www.google.com/maps/search/?api=1&query=-30.907944,-55.543000" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors font-mono text-xs uppercase tracking-widest">Google Maps</a>
        </div>
        <p className="mt-8 text-stone-700 text-[10px] uppercase tracking-widest">© 2024 Lo del Alfonso - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
