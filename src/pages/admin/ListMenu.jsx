import { useMemo, useState } from "react";
import groceryImage from "../../assets/image.png";
import "./css admin/list-menu-admin.css";

const menus = [
  {
    id: 1,
    name: "Chicken Teriyaki",
    price: "Rp. 27.000",
    salePrice: "Rp. 20.000",
    expiry: "Menu Tak Habis Terjual",
    store: "Rumah Makan Pak Baka",
    status: "Expired",
  },
  {
    id: 2,
    name: "Donat Gula",
    price: "Rp. 10.000",
    salePrice: "Rp. 7.000",
    expiry: "Exp. 1 hari lagi",
    store: "Bakery bu wani",
    status: "Available",
  },
  {
    id: 3,
    name: "Brownies Coklat",
    price: "Rp. 40.000",
    salePrice: "Rp. 20.000",
    expiry: "Exp. 3 hari lagi",
    store: "Toko Roti bersama",
    status: "Almost Expired",
  },
  {
    id: 4,
    name: "Soto Ayam",
    price: "Rp. 27.000",
    salePrice: "Rp. 20.000",
    expiry: "Menu Tak Habis Terjual",
    store: "Rumah Makan Pak Baka",
    status: "Expired",
  },
  {
    id: 5,
    name: "Brownies Coklat",
    price: "Rp. 40.000",
    salePrice: "Rp. 20.000",
    expiry: "Exp. 3 hari lagi",
    store: "Toko Roti bersama",
    status: "Available",
  },
  {
    id: 6,
    name: "Soto Ayam",
    price: "Rp. 27.000",
    salePrice: "Rp. 20.000",
    expiry: "Menu Tak Habis Terjual",
    store: "Rumah Makan Pak Baka",
    status: "Almost Expired",
  },
];

const menuCards = Array.from({ length: 18 }, (_, index) => ({
  ...menus[index % menus.length],
  id: index + 1,
}));

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h5v-6h4v6h5V10" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 5h6M9 3h6v4H9z" />
      <path d="M7 5H5v16h14V5h-2" />
      <path d="M8 12h8M8 16h8" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 21a8 8 0 1 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}

function Header({ search, onSearch }) {
  return (
    <header className="list-menu-header">
      <a className="lm-brand" href="/">
        <span>Food</span>
        <strong>Waste</strong>
      </a>

      <label className="lm-search">
        <span className="sr-only">Search menu, store, reports</span>
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search menu, store, reports"
          type="search"
        />
        <SearchIcon />
      </label>

      <div className="lm-toolbar">
        <button className="lm-icon-button" type="button" aria-label="Notifications">
          <BellIcon />
        </button>
        <button className="lm-profile" type="button">
          <img src={groceryImage} alt="Admin" />
          <span>Admin</span>
          <ChevronIcon />
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="lm-sidebar" aria-label="Admin navigation">
      <div className="lm-sidebar-avatar">
        <img src={groceryImage} alt="Admin profile" />
      </div>

      <nav className="lm-sidebar-nav">
        <a className="lm-sidebar-link" href="/admin/dashboard" aria-label="Dashboard">
          <HomeIcon />
        </a>
        <a className="lm-sidebar-link active" href="/admin/list-menu" aria-label="List Menu">
          <ClipboardIcon />
        </a>
        <a className="lm-sidebar-link" href="/admin/messages" aria-label="Messages">
          <MessageIcon />
        </a>
        <a className="lm-sidebar-link" href="/admin/profile" aria-label="Profile">
          <UserIcon />
        </a>
      </nav>
    </aside>
  );
}

function MenuCard({ item }) {
  const statusClass = item.status.toLowerCase().replace(" ", "-");

  return (
    <article className="lm-card">
      <div className="lm-card-image">
        <img src={groceryImage} alt={item.name} />
      </div>

      <div className="lm-card-body">
        <h2 className="lm-card-title">{item.name}</h2>
        <div className="lm-price">
          <span>{item.price}</span>
          <strong>- {item.salePrice}</strong>
        </div>
        <p className="lm-expiry">{item.expiry}</p>
        <p className="lm-store">{item.store}</p>

        <div className="lm-card-footer">
          <span className={`lm-status ${statusClass}`}>{item.status}</span>
          <div className="lm-actions">
            <button className="lm-action delete" type="button">
              <TrashIcon />
              Delete
            </button>
            <button className="lm-action" type="button">
              <EditIcon />
              Edit
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ListMenuAdmin() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [store, setStore] = useState("All");

  const stores = useMemo(
    () => ["All", ...Array.from(new Set(menuCards.map((item) => item.store)))],
    [],
  );

  const filteredMenus = useMemo(() => {
    const query = search.trim().toLowerCase();

    return menuCards.filter((item) => {
      const matchesSearch =
        !query ||
        [item.name, item.store, item.status].some((value) =>
          value.toLowerCase().includes(query),
        );
      const matchesStatus = status === "All" || item.status === status;
      const matchesStore = store === "All" || item.store === store;

      return matchesSearch && matchesStatus && matchesStore;
    });
  }, [search, status, store]);

  return (
    <main className="list-menu-page">
      <div className="list-menu-bg" aria-hidden="true" />
      <Header search={search} onSearch={setSearch} />

      <div className="list-menu-shell">
        <Sidebar />

        <section className="lm-content" aria-label="Admin list menu">
          <h1 className="lm-title">List Menu</h1>

          <div className="lm-controls">
              <label className="lm-filter">
                <span>Status :</span>
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option>All</option>
                  <option>Expired</option>
                  <option>Available</option>
                  <option>Almost Expired</option>
                </select>
              </label>

              <label className="lm-filter">
                <span>Store :</span>
                <select value={store} onChange={(event) => setStore(event.target.value)}>
                  {stores.map((storeName) => (
                    <option key={storeName}>{storeName}</option>
                  ))}
                </select>
              </label>

              <button className="lm-add-button" type="button">
                <PlusIcon />
                Add menu
              </button>
          </div>

          <section className="lm-grid" aria-label="Menu cards">
            {filteredMenus.map((item) => (
              <MenuCard item={item} key={item.id} />
            ))}

            {filteredMenus.length === 0 && (
              <div className="lm-empty">Menu tidak ditemukan.</div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}

export default ListMenuAdmin;
