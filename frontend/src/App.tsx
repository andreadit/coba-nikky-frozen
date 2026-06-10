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

import type { Page, Role } from "./types";


export default function App() {
  const [page, setPage] =
    useState<Page>("dashboard");

  const [role] =
    useState<Role>("owner");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const currentUser = {
    name: "Budi Santoso",
    email: "budi@nikkyfrozen.com",
    initials: "BS",
    role: "owner",
  };

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
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
        role={role}
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
        currentUser={currentUser}
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