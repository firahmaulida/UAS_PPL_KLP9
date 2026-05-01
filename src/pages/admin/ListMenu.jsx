import { useMemo, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Plus,
  Trash2,
  Pencil,
  Upload,
  Calendar,
  X,
  AlertTriangle,
} from "lucide-react";
import SideBarAdmin from "../../components/SideBarAdmin";
import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";

// Import gambar per menu — pastikan file ada di folder assets dengan nama persis ini
import donatGula from "../../assets/donat gula.jpg";
import croissant from "../../assets/croissant.jpg";
import bolu from "../../assets/bolu.jpg";
import brownies from "../../assets/brownies.jpg";
import cake from "../../assets/cake.jpg";
import cheescake from "../../assets/cheescake.jpg";

const menuImages = {
  "donat gula": donatGula,
  croissant: croissant,
  bolu: bolu,
  brownies: brownies,
  cake: cake,
  cheescake: cheescake,
};

/* ─── Dummy data ───────────────────────────────────────────── */
const baseMenus = [
  {
    id: 1,
    name: "Donat Gula",
    price: "Rp. 10.000",
    salePrice: "Rp. 7.000",
    description:
      "Donat empuk dengan taburan gula halus klasik. Kotak isi 6 Donat.",
    productionDate: "29 April 2026",
    expiredDate: "30 April 2026",
    expiry: "Exp. 1 hari lagi",
    store: "BakeryPPL",
    status: "Available",
    image: "donat gula",
  },
  {
    id: 2,
    name: "Croissant",
    price: "Rp. 15.000",
    salePrice: "Rp. 10.000",
    description:
      "Croissant berlapis mentega dengan tekstur renyah di luar dan lembut di dalam.",
    productionDate: "29 April 2026",
    expiredDate: "01 Mei 2026",
    expiry: "Exp. 2 hari lagi",
    store: "BakeryPPL",
    status: "Almost Expired",
    image: "croissant",
  },
  {
    id: 3,
    name: "Bolu",
    price: "Rp. 25.000",
    salePrice: "Rp. 12.000",
    description:
      "Bolu kukus lembut dengan rasa manis ringan dan aroma pandan khas.",
    productionDate: "28 April 2026",
    expiredDate: "29 April 2026",
    expiry: "Menu Tak Habis Terjual",
    store: "BakeryPPL",
    status: "Expired",
    image: "bolu",
  },
  {
    id: 4,
    name: "Brownies",
    price: "Rp. 40.000",
    salePrice: "Rp. 20.000",
    description:
      "Brownies coklat lembut dengan rasa manis pekat dan potongan padat.",
    productionDate: "29 April 2026",
    expiredDate: "02 Mei 2026",
    expiry: "Exp. 3 hari lagi",
    store: "BakeryPPL",
    status: "Almost Expired",
    image: "brownies",
  },
  {
    id: 5,
    name: "Cake",
    price: "Rp. 55.000",
    salePrice: "Rp. 35.000",
    description:
      "Cake sponge lembut dengan lapisan krim manis dan dekorasi cantik.",
    productionDate: "29 April 2026",
    expiredDate: "03 Mei 2026",
    expiry: "Exp. 4 hari lagi",
    store: "BakeryPPL",
    status: "Available",
    image: "cake",
  },
  {
    id: 6,
    name: "Cheesecake",
    price: "Rp. 65.000",
    salePrice: "Rp. 40.000",
    description:
      "Cheesecake creamy dengan base biskuit renyah dan topping buah segar.",
    productionDate: "28 April 2026",
    expiredDate: "29 April 2026",
    expiry: "Menu Tak Habis Terjual",
    store: "BakeryPPL",
    status: "Expired",
    image: "cheescake",
  },
];

const initialMenuCards = baseMenus;

/* ─── Status badge helper ──────────────────────────────────── */
const statusStyles = {
  Expired: "bg-red-500 text-white",
  Available: "bg-green-500 text-white",
  "Almost Expired": "bg-yellow-400 text-yellow-900",
};

/* ─── Empty form ───────────────────────────────────────────── */
const emptyForm = {
  image: "",
  name: "",
  description: "",
  productionDate: "",
  expiredDate: "",
  price: "",
  discountPrice: "",
};

/* ─── MenuCard ─────────────────────────────────────────────── */
function MenuCard({ item, onDelete, onEdit }) {
  const imgSrc = menuImages[item.image] ?? menuImages["donat gula"];

  return (
    <article className="bg-white/75 backdrop-blur-sm rounded-[22px] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-32 object-cover"
        />
        <span
          className={`absolute top-2 right-2 text-[10px] font-black px-2.5 py-1 rounded-full ${statusStyles[item.status] ?? "bg-gray-400 text-white"}`}
        >
          {item.status}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-3 gap-1">
        <h3 className="font-black text-[#63714e] text-sm leading-tight">
          {item.name}
        </h3>
        <p className="text-[10px] text-gray-500 leading-tight">{item.store}</p>

        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[10px] text-gray-400 line-through">
            {item.price}
          </span>
          <span className="text-xs font-black text-[#f8bc22]">
            {item.salePrice}
          </span>
        </div>

        <p className="text-[10px] text-[#63714e]/70 italic">{item.expiry}</p>

        <div className="flex gap-2 mt-auto pt-2">
          <button
            type="button"
            onClick={() => onDelete(item)}
            className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-500 text-[11px] font-bold py-1.5 rounded-xl transition-colors"
          >
            <Trash2 size={12} />
            Delete
          </button>
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="flex-1 flex items-center justify-center gap-1 bg-[#f8bc22]/20 hover:bg-[#f8bc22]/40 text-[#63714e] text-[11px] font-bold py-1.5 rounded-xl transition-colors"
          >
            <Pencil size={12} />
            Edit
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─── Modal backdrop ───────────────────────────────────────── */
function Backdrop({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {children}
    </div>
  );
}

/* ─── Add Menu Modal ───────────────────────────────────────── */
function AddMenuModal({ form, imagePreview, onChange, onClose, onSubmit }) {
  return (
    <Backdrop>
      <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="bg-[#63714e] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-black text-lg">Add Menu</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-6 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          {/* Image upload */}
          <div className="flex gap-4">
            <label className="flex-1 border-2 border-dashed border-[#63714e]/30 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#63714e]/60 transition-colors">
              <Upload size={22} className="text-[#63714e]/50" />
              <span className="text-xs text-[#63714e]/60 text-center font-semibold">
                File Upload <span className="font-normal">(Optional)</span>
              </span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => onChange("image", e.target.files?.[0] || "")}
              />
            </label>

            <div className="w-28 h-24 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">Preview</span>
              )}
            </div>
          </div>

          {/* Name */}
          <Field label="Nama Menu">
            <input
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Nama menu..."
              className={inputClass}
            />
          </Field>

          {/* Description */}
          <Field label="Deskripsi Menu">
            <input
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
              placeholder="Deskripsi..."
              className={inputClass}
            />
          </Field>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Production Date">
              <DateInput
                value={form.productionDate}
                onChange={(v) => onChange("productionDate", v)}
                placeholder="Tgl. Produksi"
              />
            </Field>
            <Field label="Expired Date">
              <DateInput
                value={form.expiredDate}
                onChange={(v) => onChange("expiredDate", v)}
                placeholder="Tgl. Expired"
              />
            </Field>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Harga">
              <input
                value={form.price}
                onChange={(e) => onChange("price", e.target.value)}
                placeholder="Rp"
                className={inputClass}
              />
            </Field>
            <Field label="Harga Diskon">
              <input
                value={form.discountPrice}
                onChange={(e) => onChange("discountPrice", e.target.value)}
                placeholder="Rp"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#63714e]/30 text-[#63714e] font-bold text-sm hover:bg-[#63714e]/10 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-black text-sm transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </Backdrop>
  );
}

/* ─── Delete Modal ─────────────────────────────────────────── */
function DeleteModal({ item, onClose, onConfirm }) {
  return (
    <Backdrop>
      <div className="bg-white rounded-[28px] shadow-2xl w-80 mx-4 p-6 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle size={28} className="text-red-500" />
        </div>
        <h2 className="font-black text-[#63714e] text-lg">Hapus Menu?</h2>
        <p className="text-sm text-gray-500">
          Menu <strong>{item.name}</strong> akan dihapus dari dashboard. Kamu
          perlu menambahkannya lagi jika ingin menampilkan kembali.
        </p>
        <div className="flex gap-3 w-full pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onConfirm(item.id)}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black text-sm transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

/* ─── Edit Modal ───────────────────────────────────────────── */
function EditModal({ form, imagePreview, onChange, onClose, onSubmit }) {
  return (
    <Backdrop>
      <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="bg-[#63714e] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-black text-lg">Edit Menu</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-6 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          <label className="block cursor-pointer group">
            <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={imagePreview}
                alt={form.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">
                  Ganti Gambar
                </span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => onChange("image", e.target.files?.[0] || "")}
            />
          </label>

          <Field label="Nama Menu">
            <input
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Deskripsi Menu">
            <textarea
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Production Date">
              <DateInput
                value={form.productionDate}
                onChange={(v) => onChange("productionDate", v)}
              />
            </Field>
            <Field label="Expired Date">
              <DateInput
                value={form.expiredDate}
                onChange={(v) => onChange("expiredDate", v)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Harga">
              <input
                value={form.price}
                onChange={(e) => onChange("price", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Harga Diskon">
              <input
                value={form.salePrice}
                onChange={(e) => onChange("salePrice", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#63714e]/30 text-[#63714e] font-bold text-sm hover:bg-[#63714e]/10 transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-black text-sm transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </Backdrop>
  );
}

/* ─── Shared small components ─────────────────────────────── */
const inputClass =
  "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#63714e] outline-none focus:border-[#63714e]/60 focus:ring-2 focus:ring-[#63714e]/10 transition-all";

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold text-[#63714e]/70">{label}</span>
      {children}
    </label>
  );
}

function DateInput({ value, onChange, placeholder = "" }) {
  return (
    <div className="relative flex items-center">
      <Calendar
        size={14}
        className="absolute left-3 text-[#63714e]/50 pointer-events-none"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="text"
        onFocus={(e) => {
          e.currentTarget.type = "date";
        }}
        onBlur={(e) => {
          if (!e.currentTarget.value) e.currentTarget.type = "text";
        }}
        className={`${inputClass} pl-9`}
      />
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export function ListMenuAdmin() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [menuCards, setMenuCards] = useState(initialMenuCards);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");

  /* Form handlers */
  const handleFormChange = (field, value) => {
    if (field === "image") {
      setForm((f) => ({ ...f, image: value }));
      setImagePreview(value ? URL.createObjectURL(value) : "");
      return;
    }
    setForm((f) => ({ ...f, [field]: value }));
  };

  const closeAdd = () => {
    setIsAddOpen(false);
    setForm(emptyForm);
    setImagePreview("");
  };

  const handleAddMenu = (e) => {
    e.preventDefault();
    closeAdd();
  };

  const handleDeleteMenu = (id) => {
    setMenuCards((c) => c.filter((item) => item.id !== id));
    setDeleteTarget(null);
  };

  const openEdit = (item) => {
    setEditTarget(item);
    setEditForm({
      name: item.name,
      description: item.description,
      productionDate: item.productionDate,
      expiredDate: item.expiredDate,
      price: item.price,
      salePrice: item.salePrice,
      image: "",
    });
    setEditImagePreview(menuImages[item.image] ?? menuImages["donat gula"]);
  };

  const handleEditFormChange = (field, value) => {
    if (field === "image") {
      setEditForm((f) => ({ ...f, image: value }));
      setEditImagePreview(
        value
          ? URL.createObjectURL(value)
          : (menuImages[editTarget?.image] ?? menuImages["donat gula"]),
      );
      return;
    }
    setEditForm((f) => ({ ...f, [field]: value }));
  };

  const closeEdit = () => {
    setEditTarget(null);
    setEditForm(null);
    setEditImagePreview("");
  };

  const handleEditMenu = (e) => {
    e.preventDefault();
    setMenuCards((c) =>
      c.map((item) =>
        item.id === editTarget.id ? { ...item, ...editForm } : item,
      ),
    );
    closeEdit();
  };

  const filteredMenus = useMemo(() => {
    const q = search.trim().toLowerCase();
    return menuCards.filter((item) => {
      const matchSearch =
        !q ||
        [item.name, item.store, item.status].some((v) =>
          v.toLowerCase().includes(q),
        );
      const matchStatus = status === "All" || item.status === status;
      return matchSearch && matchStatus;
    });
  }, [menuCards, search, status]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#effae8] font-sans">
      {/* ── Background ── */}
      <div className="fixed inset-0 z-0 flex w-full h-full pointer-events-none">
        <img
          src={bgUtama}
          alt=""
          className="w-1/2 h-full object-cover opacity-80"
        />
        <img
          src={bgUtama}
          alt=""
          className="w-1/2 h-full object-cover opacity-60"
        />
      </div>

      {/* ── Logo ── */}
      <header className="absolute top-6 left-12 z-30">
        <div className="px-7 py-3 bg-[#63714ed1] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-xl border border-white/20">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            Food <span className="text-[#eb9f29]">Waste</span>
          </h1>
        </div>
      </header>

      {/* ── Search centre ── */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-96">
        <div className="bg-white/80 rounded-full px-5 py-2.5 shadow-lg backdrop-blur-xl flex items-center gap-3">
          <input
            type="text"
            placeholder="Search menu, store, reports"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-[#63714e] text-sm"
          />
          <Search className="text-[#63714e]" size={18} />
        </div>
      </div>

      {/* ── Top-right ── */}
      <div className="absolute top-6 right-12 flex items-center gap-4 z-30">
        <button className="relative w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all text-[#63714e]">
          <Bell size={24} strokeWidth={2.5} />
        </button>
        <div className="p-0.5 bg-white rounded-full shadow-lg border border-gray-100 overflow-hidden flex items-center gap-2 pr-3">
          <img
            src={userProfil}
            alt=""
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-bold text-[#63714e]">Admin</span>
          <ChevronDown size={14} className="text-[#63714e]/60" />
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="absolute top-24 left-12 right-12 bottom-4 flex items-stretch gap-4 z-10 overflow-hidden">
        {/* Sidebar */}
        <div className="h-full">
          <SideBarAdmin activePage="menuAdmin" />
        </div>

        {/* Content */}
        <section className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* Page header */}
          <div className="bg-white/70 backdrop-blur-sm rounded-[28px] shadow-xl px-8 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-[#63714e]">List Menu</h1>
              <p className="text-sm text-[#63714e]/60 mt-0.5">
                Kelola semua menu makanan yang terdaftar.
              </p>
            </div>

            {/* Filters + Add */}
            <div className="flex items-center gap-3">
              <FilterSelect
                label="Status"
                value={status}
                onChange={setStatus}
                options={["All", "Expired", "Available", "Almost Expired"]}
              />
              <button
                type="button"
                onClick={() => setIsAddOpen(true)}
                className="flex items-center gap-2 bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-black px-5 py-2.5 rounded-full text-sm shadow-md transition-all"
              >
                <Plus size={16} />
                Add Menu
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-4">
            {filteredMenus.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onDelete={setDeleteTarget}
                onEdit={openEdit}
              />
            ))}
            {filteredMenus.length === 0 && (
              <div className="col-span-full text-center py-16 text-[#63714e]/50 text-sm">
                Menu tidak ditemukan.
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── Modals ── */}
      {isAddOpen && (
        <AddMenuModal
          form={form}
          imagePreview={imagePreview}
          onChange={handleFormChange}
          onClose={closeAdd}
          onSubmit={handleAddMenu}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          item={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteMenu}
        />
      )}

      {editTarget && editForm && (
        <EditModal
          form={editForm}
          imagePreview={editImagePreview}
          onChange={handleEditFormChange}
          onClose={closeEdit}
          onSubmit={handleEditMenu}
        />
      )}
    </main>
  );
}

/* ─── Filter select pill ───────────────────────────────────── */
function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/60 rounded-full px-4 py-2 shadow-sm">
      <span className="text-xs font-bold text-[#63714e]/70">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-xs font-bold text-[#63714e] outline-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ListMenuAdmin;
