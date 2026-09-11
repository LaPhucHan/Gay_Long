"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "add">("dashboard");

  // State quản lý danh sách sản phẩm
  const [products, setProducts] = useState<Product[]>([
    { id: 101, name: "CyberDeck Terminal V1", price: "1,200 USD", category: "Hardware" },
    { id: 102, name: "Neural Link Processor", price: "3,500 USD", category: "Chips" },
    { id: 103, name: "Quantum Encryption Key", price: "800 USD", category: "Security" },
  ]);

  // State quản lý Form Thêm/Sửa
  const [formData, setFormData] = useState({ name: "", price: "", category: "Hardware" });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Thao tác Thêm hoặc Cập nhật Sản phẩm
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (editingId !== null) {
      // Cập nhật sản phẩm
      setProducts(products.map((p) => (p.id === editingId ? { ...p, ...formData } : p)));
      setEditingId(null);
    } else {
      // Thêm sản phẩm mới
      const newProduct: Product = {
        id: Date.now(),
        ...formData,
      };
      setProducts([...products, newProduct]);
    }

    setFormData({ name: "", price: "", category: "Hardware" });
    setActiveTab("products"); // Tự động chuyển về trang danh sách
  };

  // Kích hoạt chế độ Sửa
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, price: product.price, category: product.category });
    setActiveTab("add");
  };

  // Xóa sản phẩm
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Background Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#00ff00_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

      {/* Main Terminal Window */}
      <div className="w-full max-w-5xl bg-zinc-950 border-2 border-green-500 shadow-[0_0_50px_rgba(0,255,0,0.3)] rounded-lg p-6 relative z-10 backdrop-blur-md">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-green-800 pb-4 mb-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <p className="text-xs text-green-400 tracking-widest font-bold uppercase hidden sm:block">
            ROOT@DEVOPS-SERVER:~ # LOLI_SYSTEM_v2.0
          </p>
        </div>

        {/* Navigation Tabs (Các Trang Tương Tác) */}
        <div className="flex space-x-2 mb-6 border-b border-green-900 pb-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded transition-all ${
              activeTab === "dashboard"
                ? "bg-green-500 text-black shadow-[0_0_10px_#00ff00]"
                : "bg-zinc-900 text-green-600 hover:text-green-400"
            }`}
          >
            [1] TRANG CHỦ
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded transition-all ${
              activeTab === "products"
                ? "bg-green-500 text-black shadow-[0_0_10px_#00ff00]"
                : "bg-zinc-900 text-green-600 hover:text-green-400"
            }`}
          >
            [2] DANH SÁCH ({products.length})
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ name: "", price: "", category: "Hardware" });
              setActiveTab("add");
            }}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded transition-all ${
              activeTab === "add"
                ? "bg-green-500 text-black shadow-[0_0_10px_#00ff00]"
                : "bg-zinc-900 text-green-600 hover:text-green-400"
            }`}
          >
            [3] {editingId !== null ? "SỬA SẢN PHẨM" : "THÊM MỚI"}
          </button>
        </div>

        {/* ================= TRANG 1: DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-green-500 bg-green-950/20 p-6 rounded-md text-center">
              <p className="text-xs text-green-600 tracking-widest mb-2 font-bold">
                [ ALERT: SYSTEM ONLINE ]
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-600 tracking-wider animate-pulse drop-shadow-[0_0_20px_rgba(0,255,0,0.8)]">
                HÂN CẤN SYSTEM
              </h1>
              <p className="mt-2 text-sm text-green-400">
                Hệ thống Quản lý Sản phẩm Cyberpunk – Tương tác Realtime!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-green-800 p-4 rounded text-center">
                <p className="text-xs text-green-600">TỔNG SẢN PHẨM</p>
                <p className="text-3xl font-bold text-green-400 mt-1">{products.length}</p>
              </div>
              <div className="bg-zinc-900 border border-green-800 p-4 rounded text-center">
                <p className="text-xs text-green-600">TRẠNG THÁI SERVER</p>
                <p className="text-3xl font-bold text-emerald-400 mt-1">ONLINE</p>
              </div>
              <div className="bg-zinc-900 border border-green-800 p-4 rounded text-center">
                <p className="text-xs text-green-600">DOCKER CONTAINER</p>
                <p className="text-3xl font-bold text-green-400 mt-1">RUNNING</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TRANG 2: DANH SÁCH SẢN PHẨM (XÓA / SỬA) ================= */}
        {activeTab === "products" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-green-800 text-xs md:text-sm">
              <thead>
                <tr className="bg-zinc-900 text-green-400 border-b border-green-800">
                  <th className="p-3 border-r border-green-800">ID</th>
                  <th className="p-3 border-r border-green-800">TÊN SẢN PHẨM</th>
                  <th className="p-3 border-r border-green-800">DANH MỤC</th>
                  <th className="p-3 border-r border-green-800">GIÁ</th>
                  <th className="p-3 text-center">THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-zinc-600">
                      Chưa có sản phẩm nào trong hệ thống.
                    </td>
                  </tr>
                ) : (
                  products.map((item) => (
                    <tr key={item.id} className="border-b border-green-900/50 hover:bg-green-950/30">
                      <td className="p-3 border-r border-green-900 font-mono text-green-600">#{item.id}</td>
                      <td className="p-3 border-r border-green-900 font-bold text-green-300">{item.name}</td>
                      <td className="p-3 border-r border-green-900 text-green-500">{item.category}</td>
                      <td className="p-3 border-r border-green-900 text-yellow-400 font-bold">{item.price}</td>
                      <td className="p-3 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-2 py-1 bg-yellow-600/30 text-yellow-400 border border-yellow-600 rounded hover:bg-yellow-500 hover:text-black transition"
                        >
                          SỬA
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-2 py-1 bg-red-600/30 text-red-400 border border-red-600 rounded hover:bg-red-500 hover:text-black transition"
                        >
                          XÓA
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= TRANG 3: FORM THÊM / SỬA SẢN PHẨM ================= */}
        {activeTab === "add" && (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-zinc-900 p-6 border border-green-800 rounded">
            <h2 className="text-lg font-bold text-green-400 border-b border-green-800 pb-2">
              {editingId !== null ? "[ EDIT ] CẬP NHẬT SẢN PHẨM" : "[ CREATE ] THÊM SẢN PHẨM MỚI"}
            </h2>

            <div>
              <label className="block text-xs text-green-600 mb-1">TÊN SẢN PHẨM</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black border border-green-800 rounded p-2 text-green-300 focus:outline-none focus:border-green-500"
                placeholder="Ví dụ: Cyber Laptop X1"
              />
            </div>

            <div>
              <label className="block text-xs text-green-600 mb-1">DANH MỤC</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-black border border-green-800 rounded p-2 text-green-300 focus:outline-none focus:border-green-500"
              >
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Chips">Chips</option>
                <option value="Security">Security</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-green-600 mb-1">GIÁ BÁN</label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-black border border-green-800 rounded p-2 text-green-300 focus:outline-none focus:border-green-500"
                placeholder="Ví dụ: 999 USD"
              />
            </div>

            <div className="pt-2 flex space-x-2">
              <button
                type="submit"
                className="flex-1 bg-green-500 text-black font-bold py-2 rounded hover:bg-green-400 shadow-[0_0_15px_#00ff00] transition"
              >
                {editingId !== null ? "LƯU CẬP NHẬT" : "XÁC NHẬN THÊM"}
              </button>
            </div>
          </form>
        )}

        {/* Terminal Footer */}
        <div className="mt-6 pt-4 border-t border-green-900 flex flex-wrap justify-between text-xs text-green-700">
          <span>PORT: 3000 // CRUD ACTIVE</span>
          <span>GITHUB ACTIONS: ONLINE</span>
          <span>DEPLOYED TO: PRODUCTION</span>
        </div>
      </div>
    </div>
  );
}