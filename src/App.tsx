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
    micro: "text-[11px] leading-[1.0] font-medium tracking-[0.02em]",
  },
  spacing: [0, 4, 8, 12, 16, 24, 32],
};

// --- Mock Data ---
const CATEGORIES = ["All", "Power", "Robotics", "Sensors", "Audio", "Connectivity", "New"];

type Item = {
  id: string;
  title: string;
  price: string;       // "$9"
  meta: string;        // "2-layer" | "USB-C" | "45×28mm"
  category: string;
  creator: string;
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
    price: "$9.00", 
    meta: "2-layer", 
    category: "Power",
    creator: "@kofilabs",
    image: "https://picsum.photos/seed/pcb1/600/400",
    layers: "2",
    size: "45×28mm",
    estCost: "$2.40",
    dfmStatus: "Passed",
    description: "A highly optimized USB-C Power Delivery sink module. Supports fixed voltages up to 20V at 5A."
  },
  { 
    id: "2", 
    title: "Li-ion Charger", 
    price: "$12.00", 
    meta: "45×28mm", 
    category: "Power",
    creator: "@circuitart",
    image: "https://picsum.photos/seed/pcb2/600/400",
    layers: "2",
    size: "45×28mm",
    estCost: "$3.10",
    dfmStatus: "Passed",
    description: "Compact Li-ion battery charger with integrated protection and status LEDs."
  },
  { 
    id: "3", 
    title: "DRV8833 Driver", 
    price: "$15.00", 
    meta: "2-layer", 
    category: "Robotics",
    creator: "@niarobotics",
    image: "https://picsum.photos/seed/pcb3/600/400",
    layers: "2",
    size: "32×32mm",
    estCost: "$1.80",
    dfmStatus: "Passed",
    description: "Dual H-bridge motor driver for small robotics projects. Efficient and easy to interface."
  },
  { 
    id: "4", 
    title: "IMU Breakout", 
    price: "$6.00", 
    meta: "I2C", 
    category: "Sensors",
    creator: "@sensornode",
    image: "https://picsum.photos/seed/pcb4/600/400",
    layers: "2",
    size: "10×10mm",
    estCost: "$1.20",
    dfmStatus: "Passed",
    description: "Ultra-compact 6-axis IMU breakout board with I2C interface."
  },
  { 
    id: "5", 
    title: "ESP32-S3 Mini", 
    price: "$25.00", 
    meta: "4-layer", 
    category: "Connectivity",
    creator: "@espdev",
    image: "https://picsum.photos/seed/pcb5/600/400",
    layers: "4",
    size: "40×20mm",
    estCost: "$5.50",
    dfmStatus: "Passed",
    description: "Minimalist ESP32-S3 development board with USB-C and LiPo charging."
  },
  { 
    id: "6", 
    title: "Audio Amp D", 
    price: "$18.00", 
    meta: "Stereo", 
    category: "Audio",
    creator: "@soundwave",
    image: "https://picsum.photos/seed/pcb6/600/400",
    layers: "2",
    size: "35×25mm",
    estCost: "$2.10",
    dfmStatus: "Passed",
    description: "Class D stereo audio amplifier with high efficiency and low distortion."
  },
];

// --- Components ---

function BottomNav({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 px-6 pb-8 pt-3 flex justify-between items-center z-50">
      {/* Left Group: Plus and Person */}
      <div className="flex items-center gap-8">
        <button
          onClick={() => onTabChange("create")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "create" ? "text-[#0038DF]" : "text-black/40"
          }`}
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => onTabChange("profile")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "profile" ? "text-[#0038DF]" : "text-black/40"
          }`}
        >
          <User size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Right Group: Home */}
      <div className="flex items-center">
        <button
          onClick={() => onTabChange("explore")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "explore" ? "text-[#0038DF]" : "text-black/40"
          }`}
        >
          <Cpu size={22} strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}

export default function App() {
  const [view, setView] = useState<"explore" | "detail" | "tweak" | "list" | "search" | "library" | "profile">("explore");
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
                  onClick={() => {
                    setActiveTab("search");
                    setView("search");
                  }}
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

            {/* Hero Section */}
            <section className="px-6 pt-12 pb-8 bg-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-[36px] font-medium leading-[1.05] tracking-[-0.03em] text-[#0B0D12]">
                  Design <br />
                  <span className="text-[#0038DF]">without limits.</span>
                </h1>
                <p className="mt-4 text-[15px] leading-[1.6] text-black/50 max-w-[280px]">
                  Browse ready-to-tweak templates. <br />
                  Tap to preview, tweak, and export.
                </p>
              </motion.div>
            </section>

            {/* Category Row - Shifted down with flair */}
            <div className="px-6 mt-12 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 w-max pb-2">
                {CATEGORIES.map((c) => {
                  const on = c === activeCategory;
                  return (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`h-7 px-4 rounded-full border text-[11px] font-medium transition-all duration-300 ${
                        on
                          ? "border-[#0038DF] bg-[#0038DF] text-white shadow-[0_4px_12px_rgba(0,56,223,0.1)]"
                          : "bg-[#F7F7F7] border-transparent text-black/40 hover:bg-[#EFEFEF]"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid - Shifted down and vertical tiles */}
            <section className="px-6 pb-40 pt-8">
              <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[3/4] border border-black/5 rounded-[6px] bg-black/[0.02]" />
                      <div className="mt-4 space-y-2">
                        <div className="h-5 w-1/4 bg-black/[0.05] rounded" />
                        <div className="h-4 w-3/4 bg-black/[0.03] rounded" />
                      </div>
                    </div>
                  ))
                ) : (
                  filtered.map((item) => (
                    <motion.button
                      layoutId={`item-${item.id}`}
                      key={item.id}
                      className="text-left group"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openDetail(item)}
                    >
                      {/* Vertical Tile - Portrait Aspect */}
                      <div className="aspect-[3/4] border border-black/[0.06] rounded-[6px] bg-white grid place-items-center relative overflow-hidden group-active:border-[#0038DF] transition-all duration-500 hover:shadow-2xl hover:shadow-black/5">
                        {/* Subtle grid pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                        
                        {/* PCB thumbnail placeholder */}
                        <div className="w-[70%] aspect-square border border-black/[0.04] rounded-[4px] bg-[#F9FAFB] grid place-items-center overflow-hidden shadow-inner">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover opacity-90 mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Info lines - Minimal Typography */}
                      <div className="mt-4 px-0.5">
                        <div className="text-[14px] font-bold text-[#0B0D12] leading-none mb-1.5">
                          {item.price}
                        </div>
                        <div className="text-[13px] font-medium text-[#0B0D12] truncate leading-tight mb-1">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-black/30 truncate font-normal">
                          by {item.creator.replace('@', '')}
                        </div>
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </section>
          </motion.div>
        )}

        {view === "search" && (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 pb-24"
          >
            <h1 className="text-[20px] font-medium mb-6">Search</h1>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-[#0038DF] transition-colors" size={16} />
              <input 
                type="text" 
                autoFocus
                placeholder="Search templates, chips, boards..."
                className="w-full h-12 pl-10 pr-4 border border-black/10 rounded-[12px] text-[14px] outline-none focus:border-[#0038DF] transition-all"
              />
            </div>
            <div className="mt-8">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.08em] text-black/40 mb-4">Recent Searches</h2>
              <div className="space-y-3">
                {["ESP32-S3", "USB-C PD", "Motor Driver"].map(s => (
                  <div key={s} className="flex items-center gap-3 text-[14px] text-black/60">
                    <Search size={14} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === "library" && (
          <motion.div
            key="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 pb-24"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[20px] font-medium">Library</h1>
              <button onClick={() => {
                setActiveTab("create");
                setView("list");
              }} className="h-10 px-4 rounded-full bg-[#0038DF] text-white text-[12px] font-medium flex items-center gap-2">
                <Plus size={14} /> List New
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-black/10 rounded-[14px] flex items-center gap-4">
                <div className="h-12 w-12 bg-surface rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-black/20" />
                </div>
                <div>
                  <div className="text-[14px] font-medium">My Custom Controller</div>
                  <div className="text-[12px] text-black/40">Draft • Modified 2h ago</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 pb-24"
          >
            <div className="flex flex-col items-center text-center mt-8">
              <div className="h-24 w-24 rounded-full bg-surface border border-black/5 mb-4 flex items-center justify-center">
                <User size={40} className="text-black/20" />
              </div>
              <h1 className="text-[20px] font-medium">Kofi Labs</h1>
              <p className="text-[13px] text-black/40">Hardware Engineer • London, UK</p>
            </div>
            <div className="mt-12 space-y-1">
              {["My Listings", "Sales Analytics", "Payouts", "Settings"].map(item => (
                <button key={item} className="w-full flex items-center justify-between py-4 border-b border-black/5 px-2 active:bg-black/5 rounded-lg transition-colors">
                  <span className="text-[14px]">{item}</span>
                  <ChevronRight size={16} className="text-black/20" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {view === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[70] p-6 pb-24 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[20px] font-medium">List Template</h1>
              <button onClick={() => {
                setActiveTab("explore");
                setView("explore");
              }} className="text-black/40">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="aspect-video rounded-[14px] bg-surface border border-dashed border-black/20 flex flex-col items-center justify-center text-black/40">
                <FileText size={32} className="mb-2" />
                <span className="text-[12px]">Thumbnail auto-generated</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-[0.08em] block mb-2 text-black/40">Title</label>
                  <input type="text" defaultValue="My Custom Board" className="w-full h-12 px-4 border border-black/10 rounded-[12px] text-[14px] outline-none focus:border-[#0038DF]" />
                </div>
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-[0.08em] block mb-2 text-black/40">Price</label>
                  <input type="text" defaultValue="$5.00" className="w-full h-12 px-4 border border-black/10 rounded-[12px] text-[14px] outline-none focus:border-[#0038DF]" />
                </div>
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-[0.08em] block mb-2 text-black/40">Tweakable Params</label>
                  <div className="flex flex-wrap gap-2">
                    {["Dimensions", "Connectors", "Voltage", "Mounting"].map(p => (
                      <div key={p} className="px-3 py-1.5 bg-[#0038DF]/10 text-[#0038DF] text-[11px] font-medium rounded-full flex items-center gap-2">
                        {p} <Plus size={12} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  alert("Published!");
                  setActiveTab("explore");
                  setView("explore");
                }}
                className="w-full h-14 bg-[#0038DF] text-white rounded-[12px] font-medium text-[15px] mt-8 shadow-lg shadow-blue-200"
              >
                Publish Listing
              </button>
            </div>
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
                  <div className="text-[12px] text-black/40">by {selectedItem.creator}</div>
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
                    setActiveTab("explore");
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
          else if (tab === "search") setView("search");
          else if (tab === "create") setView("list");
          else if (tab === "library") setView("library");
          else if (tab === "profile") setView("profile");
        }} 
      />
    </div>
  );
}
