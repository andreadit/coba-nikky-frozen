// src/app/App.tsx

import { useState } from "react";

import { Sidebar, Header } from "./components/layout";

import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { ProductPage } from "./pages/products/ProductPage";
import POSPage from "./pages/pos/POSPage";
import ExpiryPage from "./pages/expiry/ExpiryPage";
import StockPage from "./pages/stock/StockPage";
import { FinancePage } from "./pages/finance/FinancePage";
import UsersPage from "./pages/users/UserPage";
import LoginPage from "./pages/login/LoginPage";
import { logout } from "./services/authService";

import type { Page, Role } from "./types";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function App() {
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const [page, setPage] =
    useState<Page>("dashboard");

  const savedUser = localStorage.getItem("user");
  const parsedUser = savedUser
    ? JSON.parse(savedUser)
    : null;

  const [role, setRole] =
    useState<Role>(
      (parsedUser?.role as Role) ?? "owner"
    );

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const currentUser = {
    name: parsedUser?.name ?? "Owner Nikky Frozen",
    email: parsedUser?.email ?? "owner@nikkyfrozen.com",
    initials: getInitials(
      parsedUser?.name ?? "Owner Nikky Frozen"
    ),
    role: parsedUser?.role ?? role,
  };

  function handleLogin() {
    const nextUser = localStorage.getItem("user");
    const user = nextUser ? JSON.parse(nextUser) : null;

    setToken(localStorage.getItem("token"));
    setRole((user?.role as Role) ?? "owner");
    setPage("dashboard");
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      // Token lokal tetap dibersihkan meskipun request logout gagal.
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setPage("dashboard");
  }

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <DashboardPage />;
        case "products":
        return <ProductPage />;
        case "pos":
        return <POSPage />;
        case "expiry":
        return <ExpiryPage />;
        case "stock":
        return <StockPage />;
        case "finance":
        return <FinancePage />;
        case "users":
        return <UsersPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F0F5FA] text-gray-900 overflow-hidden">
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
        role={role}
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <Header
          page={page}
          onMenuClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
