import {
  Bell,
  Menu,
} from "lucide-react";

import { PAGE_TITLES } from "../../constants/pageTitles";

import type { Page } from "../../types";

interface HeaderProps {
  page: Page;
  onMenuClick: () => void;
}

export function Header({
  page,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="h-16 bg-white/95 backdrop-blur border-b border-gray-100 flex items-center px-4 lg:px-6 gap-4 flex-shrink-0 z-10">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-gray-900 truncate">
          {PAGE_TITLES[page]}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />

          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
