/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Share2, 
  ChevronRight, 
  Cpu, 
  Zap, 
  Plus, 
  Library, 
  User, 
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Layers,
  Maximize2,
  FileText,
  X
} from "lucide-react";

// --- Design Tokens ---
export const theme = {
  colors: {
    bg: "#FFFFFF",
    text: "#0B0D12",
    muted: "rgba(11, 13, 18, 0.60)",
    subtle: "rgba(11, 13, 18, 0.40)",
    border: "rgba(11, 13, 18, 0.10)",
    borderStrong: "rgba(11, 13, 18, 0.16)",
    surface: "#F7F8FB",
    primary: "#0038DF",
    primarySoft: "rgba(0, 56, 223, 0.10)",
    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#EF4444",
  },
  radius: {
    button: 12,
    card: 14,
    sheet: 20,
    chip: 999,
  },
  type: {
    display: "text-[32px] leading-[1.1] font-medium tracking-tight",
    h2: "text-[20px] leading-[1.2] font-medium",
    h3: "text-[16px] leading-[1.25] font-medium",
    body: "text-[13px] leading-[1.65] font-normal",
    small: "text-[12px] leading-[1.4] font-normal",
    micro: "text-[11px] leading-[1.0] font-medium tracking-[0.08em] uppercase",
  },
  spacing: [0, 4, 8, 12, 16, 24, 32],
};

// --- Mock Data ---
const CATEGORIES = ["All", "Power", "Robotics", "Sensors", "Audio", "Connectivity", "New"];

type Item = {
  id: string;
  title: string;
  price: string;       // "£9" | "Free"
  meta: string;        // "2-layer" | "USB-C" | "45×28mm"
  category: string;
  image: string;
  layers: string;
  size: string;
  estCost: string;
  dfmStatus: string;
  description: string;
};

const ITEMS: Item[] = [
  { 
    id: "1", 
    title: "USB-C PD Sink", 
    price: "£9", 
    meta: "2-layer", 
    category: "Power",
    image: "https://picsum.photos/seed/pcb1/600/400",
    layers: "2",
    size: "45×28mm",
    estCost: "£2.40",
    dfmStatus: "Passed",
    description: "A highly optimized USB-C Power Delivery sink module. Supports fixed voltages up to 20V at 5A."
  },
  { 
    id: "2", 
    title: "Li-ion Charger", 
    price: "£12", 
    meta: "45×28mm", 
    category: "Power",
    image: "https://picsum.photos/seed/pcb2/600/400",
    layers: "2",
    size: "45×28mm",
    estCost: "£3.10",
    dfmStatus: "Passed",
    description: "Compact Li-ion battery charger with integrated protection and status LEDs."
  },
  { 
    id: "3", 
    title: "DRV8833 Driver", 
    price: "Free", 
    meta: "2-layer", 
    category: "Robotics",
    image: "https://picsum.photos/seed/pcb3/600/400",
    layers: "2",
    size: "32×32mm",
    estCost: "£1.80",
    dfmStatus: "Passed",
    description: "Dual H-bridge motor driver for small robotics projects. Efficient and easy to interface."
  },
  { 
    id: "4", 
    title: "IMU Breakout", 
    price: "£6", 
    meta: "I2C", 
    category: "Sensors",
    image: "https://picsum.photos/seed/pcb4/600/400",
    layers: "2",
    size: "10×10mm",
    estCost: "£1.20",
    dfmStatus: "Passed",
    description: "Ultra-compact 6-axis IMU breakout board with I2C interface."
  },
  { 
    id: "5", 
    title: "ESP32-S3 Mini", 
    price: "£15", 
    meta: "4-layer", 
    category: "Connectivity",
    image: "https://picsum.photos/seed/pcb5/600/400",
    layers: "4",
    size: "40×20mm",
    estCost: "£5.50",
    dfmStatus: "Passed",
    description: "Minimalist ESP32-S3 development board with USB-C and LiPo charging."
  },
  { 
    id: "6", 
    title: "Audio Amp D", 
    price: "£8", 
    meta: "Stereo", 
    category: "Audio",
    image: "https://picsum.photos/seed/pcb6/600/400",
    layers: "2",
    size: "35×25mm",
    estCost: "£2.10",
    dfmStatus: "Passed",
    description: "Class D stereo audio amplifier with high efficiency and low distortion."
  },
];

// --- Components ---

function BottomNav({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) {
  const tabs = [
    { id: "explore", label: "Explore", icon: Cpu },
    { id: "search", label: "Search", icon: Search },
    { id: "create", label: "Create", icon: Plus },
    { id: "library", label: "Library", icon: Library },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 px-4 pb-6 pt-2 flex justify-around items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === tab.id ? "text-[#0038DF]" : "text-black/40"
          }`}
        >
          <tab.icon size={20} />
          <span className="text-[10px] font-medium uppercase tracking-[0.08em]">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const [view, setView] = useState<"explore" | "detail" | "tweak">("explore");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeTab, setActiveTab] = useState("explore");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading for marketplace feel
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return ITEMS;
    return ITEMS.filter((i) => i.category === activeCategory);
  }, [activeCategory]);

  const openDetail = (item: Item) => {
    setSelectedItem(item);
    setView("detail");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white text-[#0B0D12] font-sans relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === "explore" && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24"
          >
            {/* Top Bar */}
            <header className="sticky top-0 z-20 bg-white border-b border-black/10">
              <div className="h-14 px-4 flex items-center justify-between">
                <div className="text-[14px] font-medium tracking-tight">Explorer</div>
                <button
                  aria-label="Search"
                  className="h-11 w-11 grid place-items-center border border-black/10 rounded-[12px] active:bg-black/5 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M10.5 19a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Z"
                      stroke="rgba(11,13,18,0.65)"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M16.8 16.8 21 21"
                      stroke="rgba(11,13,18,0.65)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </header>

            {/* Intro */}
            <section className="px-4 pt-5">
              <div className="text-[14px] font-medium">Explore templates</div>
              <p className="mt-1 text-[13px] leading-[1.6] text-black/60 max-w-[42ch]">
                Browse ready-to-tweak PCB templates. Tap one to preview, tweak, and export.
              </p>

              {/* Category Row */}
              <div className="mt-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 w-max pb-2">
                  {CATEGORIES.map((c) => {
                    const on = c === activeCategory;
                    return (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`h-8 px-3 rounded-full border text-[11px] tracking-[0.08em] uppercase transition-all ${
                          on
                            ? "border-[#0038DF]/20 bg-[#0038DF]/10 text-[#0038DF]"
                            : "border-black/10 text-black/60"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Grid */}
            <section className="px-4 pb-10 pt-2">
              <div className="grid grid-cols-2 gap-3">
                {isLoading ? (
                  // Skeleton Loading
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square border border-black/5 rounded-[14px] bg-black/[0.02]" />
                      <div className="mt-2 space-y-2">
                        <div className="h-3 w-3/4 bg-black/[0.05] rounded" />
                        <div className="h-2 w-1/2 bg-black/[0.03] rounded" />
                      </div>
                    </div>
                  ))
                ) : (
                  filtered.map((item) => (
                    <motion.button
                      layoutId={`item-${item.id}`}
                      key={item.id}
                      className="text-left group"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openDetail(item)}
                    >
                      {/* Square tile */}
                      <div className="aspect-square border border-black/10 rounded-[14px] bg-white grid place-items-center relative overflow-hidden group-active:border-[#0038DF] transition-colors duration-150">
                        {/* Subtle grid pattern */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                        
                        {/* PCB thumbnail placeholder */}
                        <div className="w-[48%] aspect-[4/3] border border-black/10 rounded-[12px] bg-[#F7F8FB] grid place-items-center overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover opacity-80 mix-blend-multiply" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Two lines only */}
                      <div className="mt-2">
                        <div className="text-[13px] font-medium truncate">{item.title}</div>
                        <div className="mt-[2px] text-[12px] text-black/60 truncate">
                          {item.price} • {item.meta}
                        </div>
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </section>
          </motion.div>
        )}

        {view === "detail" && selectedItem && (
          <motion.div
            key="detail"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto pb-24"
          >
            {/* Header */}
            <header className="px-4 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <button 
                onClick={() => setView("explore")} 
                className="h-10 w-10 flex items-center justify-center rounded-full border border-black/10 active:bg-black/5"
              >
                <ArrowLeft size={20} />
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-full border border-black/10 active:bg-black/5">
                <Share2 size={18} />
              </button>
            </header>

            {/* Hero */}
            <div className="px-4">
              <motion.div 
                layoutId={`item-${selectedItem.id}`}
                className="aspect-square rounded-[20px] bg-white border border-black/10 overflow-hidden relative grid place-items-center"
              >
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <div className="w-[70%] aspect-[4/3] border border-black/10 rounded-[16px] bg-[#F7F8FB] overflow-hidden">
                  <img src={selectedItem.image} className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
                </div>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex bg-white/90 backdrop-blur border border-black/10 rounded-full p-1 gap-1">
                  {["Board", "Schematic", "BOM"].map((tab) => (
                    <button key={tab} className={`px-4 py-1.5 rounded-full text-[11px] font-medium ${tab === "Board" ? "bg-[#0038DF] text-white" : "text-black/60"}`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </motion.div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-[20px] font-medium">{selectedItem.title}</h1>
                  <div className="text-[16px] font-medium text-[#0038DF]">{selectedItem.price}</div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-wider border border-green-100">
                    DFM: {selectedItem.dfmStatus}
                  </div>
                  <div className="text-[12px] text-black/40">by @kofilabs</div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[
                  { label: "Layers", val: selectedItem.layers, icon: Layers },
                  { label: "Size", val: selectedItem.size, icon: Maximize2 },
                  { label: "Est. Cost", val: selectedItem.estCost, icon: Zap },
                ].map((s) => (
                  <div key={s.label} className="bg-[#F7F8FB] border border-black/5 rounded-[14px] p-3 flex flex-col items-center text-center">
                    <s.icon size={16} className="text-black/40 mb-2" />
                    <div className="text-[11px] font-bold text-black/80">{s.val}</div>
                    <div className="text-[9px] text-black/40 uppercase tracking-wider mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="text-[14px] font-medium">Description</div>
                <p className="text-[13px] leading-[1.65] text-black/60">
                  {selectedItem.description}
                </p>
              </div>
            </div>

            {/* Sticky Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 p-4 flex gap-3 z-50">
              <button 
                onClick={() => setView("tweak")}
                className="h-12 flex-1 rounded-[12px] bg-[#0038DF] text-white text-[14px] font-medium active:bg-[#002bb3] transition-colors"
              >
                Try & Tweak
              </button>
              <button className="h-12 px-6 rounded-[12px] border border-black/10 text-[14px] font-medium active:bg-black/5 transition-colors">
                Buy
              </button>
            </div>
          </motion.div>
        )}

        {view === "tweak" && selectedItem && (
          <motion.div
            key="tweak"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-black/20 z-[60] flex items-end"
          >
            <div className="w-full bg-white rounded-t-[20px] max-h-[90vh] overflow-y-auto pb-24 shadow-[0_-12px_32px_rgba(0,0,0,0.10)]">
              {/* Header */}
              <div className="sticky top-0 bg-white px-4 pt-3 pb-4 border-b border-black/5 z-10">
                <div className="w-12 h-1 bg-black/10 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between">
                  <div className="text-[16px] font-medium">Tweak Template</div>
                  <button onClick={() => setView("detail")} className="h-8 w-8 flex items-center justify-center rounded-full bg-black/5 text-black/40">
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="px-4 pt-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-16 w-16 rounded-[12px] bg-[#F7F8FB] border border-black/10 overflow-hidden grid place-items-center">
                    <img src={selectedItem.image} className="w-[80%] h-[80%] object-contain opacity-80" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-0.5 bg-[#0038DF]/10 text-[#0038DF] text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Live: {selectedItem.price}
                      </div>
                    </div>
                    <div className="mt-1 text-[15px] font-medium">{selectedItem.title}</div>
                  </div>
                </div>

                {/* Parameter Rows */}
                <div className="space-y-1">
                  {[
                    { label: "Form factor", val: "Standard (45x28mm)" },
                    { label: "Power Input", val: "USB-C (PD)" },
                    { label: "Output Voltage", val: "Fixed 12V" },
                    { label: "Mounting", val: "M3 Holes" },
                    { label: "Finish", val: "ENIG" },
                  ].map((row) => (
                    <button key={row.label} className="w-full flex items-center justify-between py-4 border-b border-black/5 active:bg-black/5 px-2 rounded-lg transition-colors">
                      <span className="text-[13px] text-black/60">{row.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-medium">{row.val}</span>
                        <ChevronRight size={16} className="text-black/20" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Sticky */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 p-4 flex gap-3 z-50">
                <button 
                  onClick={() => {
                    alert("Generating Export...");
                    setView("explore");
                  }}
                  className="h-12 flex-1 rounded-[12px] bg-[#0038DF] text-white text-[14px] font-medium active:bg-[#002bb3] transition-colors"
                >
                  Generate Export
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "explore") setView("explore");
        }} 
      />
    </div>
  );
}
