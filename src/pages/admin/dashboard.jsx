import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import groceryImage from "../../assets/image.png";
import "./css admin/dashboard-admin.css";

const menuItems = [
  {
    id: 1,
    name: "Chicken Teriyaki",
    store: "Rumah Makan Pak Baka",
    oldPrice: "Rp. 27.000",
    newPrice: "Rp. 20.000",
    status: "Expired",
  },
  {
    id: 2,
    name: "Donat Gula",
    store: "Bakery bu wani",
    oldPrice: "Rp. 10.000",
    newPrice: "Rp. 7.000",
    status: "Available",
  },
  {
    id: 3,
    name: "Brownies Coklat",
    store: "Toko Roti bersama",
    oldPrice: "Rp. 40.000",
    newPrice: "Rp. 20.000",
    status: "Expired",
  },
  {
    id: 4,
    name: "Chicken Teriyaki",
    store: "Rumah Makan Pak Baka",
    oldPrice: "Rp. 27.000",
    newPrice: "Rp. 20.000",
    status: "Expired",
  },
  {
    id: 5,
    name: "Donat Gula",
    store: "Bakery bu wani",
    oldPrice: "Rp. 10.000",
    newPrice: "Rp. 7.000",
    status: "Almost Expired",
  },
  {
    id: 6,
    name: "Brownies Coklat",
    store: "Toko Roti bersama",
    oldPrice: "Rp. 40.000",
    newPrice: "Rp. 20.000",
    status: "Expired",
  },
  {
    id: 7,
    name: "Chicken Teriyaki",
    store: "Rumah Makan Pak Baka",
    oldPrice: "Rp. 27.000",
    newPrice: "Rp. 20.000",
    status: "Expired",
  },
  {
    id: 8,
    name: "Donat Gula",
    store: "Bakery bu wani",
    oldPrice: "Rp. 10.000",
    newPrice: "Rp. 7.000",
    status: "Almost Expired",
  },
  {
    id: 9,
    name: "Brownies Coklat",
    store: "Toko Roti bersama",
    oldPrice: "Rp. 40.000",
    newPrice: "Rp. 20.000",
    status: "Expired",
  },
];

const activities = [
  { id: 1, title: "Deleted Menu", time: "Admin 1 mnt ago", tone: "danger" },
  { id: 2, title: "Message Received", time: "Admin 1 mnt ago", tone: "warning" },
  { id: 3, title: "New Store Registered", time: "Admin 1 mnt ago", tone: "success" },
];

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

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h5v-6h4v6h5V10" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 7h14M5 12h14M5 17h14" />
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
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

function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10h16l-1-5H5l-1 5Z" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 2 21h20L12 3Z" fill="#ff0505" stroke="#ff0505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9v5M12 17h.01" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Sidebar() {
  const navItems = [
    { id: "home", label: "Dashboard", icon: <HomeIcon />, to: "/admin/dashboard", active: true },
    { id: "menu", label: "Menu", icon: <MenuIcon />, to: "/admin/list-menu" },
    { id: "messages", label: "Messages", icon: <MessageIcon />, to: "/admin/messages" },
    { id: "profile", label: "Profile", icon: <UserIcon />, to: "/admin/profile" },
  ];

  return (
    <aside className="dashboard-sidebar" aria-label="Admin navigation">
      <div className="sidebar-avatar">
        <img src={groceryImage} alt="Admin profile" />
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            className={`sidebar-link ${item.active ? "active" : ""}`}
            to={item.to}
            key={item.id}
            aria-label={item.label}
          >
            {item.icon}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function Header({ search, onSearch }) {
  return (
    <header className="dashboard-header">
      <a className="brand-mark" href="/">
        <span>Food</span>
        <strong>Waste</strong>
      </a>

      <label className="search-box">
        <span className="sr-only">Search menu, store, reports</span>
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search menu, store, reports"
          type="search"
        />
        <SearchIcon />
      </label>

      <div className="admin-toolbar">
        <button className="icon-button notification-button" type="button" aria-label="Notifications">
          <BellIcon />
        </button>

        <button className="admin-profile" type="button">
          <img src={groceryImage} alt="Admin" />
          <span>Admin</span>
          <ChevronIcon />
        </button>
      </div>
    </header>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function ProductCard({ item }) {
  const slug = item.status.toLowerCase().replace(" ", "-");

  return (
    <article className="menu-card">
      <div className="menu-left">
        <div className={`menu-thumb thumb-${item.id % 3}`}>
          <img src={groceryImage} alt={item.name} />
        </div>
        <span className={`status-badge ${slug}`}>{item.status}</span>
      </div>

      <div className="menu-info">
        <h3>{item.name}</h3>
        <p>{item.store}</p>
        <div className="menu-price">
          <span>{item.oldPrice}</span>
          <strong>- {item.newPrice}</strong>
        </div>
      </div>
    </article>
  );
}

function ActivityIcon({ tone }) {
  if (tone === "danger") return <TrashIcon />;
  if (tone === "success") return <StoreIcon />;
  return <MessageIcon />;
}

function ActivityList() {
  return (
    <section className="activity-card" aria-labelledby="recent-activity-title">
      <h2 id="recent-activity-title">Recent Activity</h2>
      <div className="activity-list">
        {activities.map((activity) => (
          <article className="activity-item" key={activity.id}>
            <div className={`activity-icon ${activity.tone}`}>
              <ActivityIcon tone={activity.tone} />
            </div>
            <div>
              <h3>{activity.title}</h3>
              <p>{activity.time}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DashboardAdmin() {
  const [search, setSearch] = useState("");

  const filteredMenu = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return menuItems;

    return menuItems.filter((item) =>
      [item.name, item.store, item.status].some((value) => value.toLowerCase().includes(query)),
    );
  }, [search]);

  return (
    <main className="dashboard-admin">
      <div className="dashboard-backdrop" aria-hidden="true" />
      <Header search={search} onSearch={setSearch} />

      <div className="dashboard-shell">
        <Sidebar />

        <section className="dashboard-content" aria-label="Admin dashboard">
          <div className="welcome-panel">
            <div>
              <h1>Welcome , Admin!</h1>
              <p>Monitor and reduce food waste today.</p>
            </div>
            <Link className="primary-button" to="/admin/list-menu">
              View Expiring Menu
            </Link>
          </div>

          <div className="stats-row">
            <StatCard icon={<ClockIcon />} label="Expiring Soon" value="122 Items" />
            <StatCard icon={<MessageIcon />} label="New Messages" value="144 Messages" />
          </div>

          <div className="dashboard-grid">
            <section className="menu-grid" aria-label="Expiring menu list">
              {filteredMenu.map((item) => (
                <ProductCard item={item} key={item.id} />
              ))}

              {filteredMenu.length === 0 && (
                <div className="empty-state">Menu tidak ditemukan.</div>
              )}
            </section>

            <aside className="right-panel">
              <section className="attention-card" aria-labelledby="attention-title">
                <div className="attention-title">
                  <h2 id="attention-title">Need Attention</h2>
                  <AlertIcon />
                </div>
                <button className="manage-button" type="button">
                  Manage Now
                </button>
              </section>

              <ActivityList />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardAdmin;
