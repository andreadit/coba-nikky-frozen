import { useState } from "react";
import {
  DollarSign,
  Eye,
  EyeOff,
  Lock,
  Package2,
  ShoppingCart,
  Snowflake,
  Star,
  User,
} from "lucide-react";

import { login } from "../../services/authService";
import { cn } from "../../lib/cn";
import type { Role } from "../../types";

interface LoginPageProps {
  onLogin: () => void;
}

interface RolePreset {
  role: Role;
  label: string;
  desc: string;
  email: string;
  icon: React.ReactNode;
}

const ROLE_PRESETS: RolePreset[] = [
  {
    role: "owner",
    label: "Owner",
    desc: "Akses penuh",
    email: "owner@nikkyfrozen.com",
    icon: <Star className="w-4 h-4" />,
  },
  {
    role: "kasir",
    label: "Kasir",
    desc: "POS & transaksi",
    email: "kasir@nikkyfrozen.com",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  {
    role: "admin_gudang",
    label: "Admin Gudang",
    desc: "Stok & produk",
    email: "gudang@nikkyfrozen.com",
    icon: <Package2 className="w-4 h-4" />,
  },
  {
    role: "admin_keuangan",
    label: "Keuangan",
    desc: "Laporan bisnis",
    email: "owner@nikkyfrozen.com",
    icon: <DollarSign className="w-4 h-4" />,
  },
];

export default function LoginPage({
  onLogin,
}: LoginPageProps) {
  const [selectedRole, setSelectedRole] =
    useState<Role>("owner");
  const [email, setEmail] =
    useState("owner@nikkyfrozen.com");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] =
    useState(false);

  function chooseRole(preset: RolePreset) {
    setSelectedRole(preset.role);
    setEmail(preset.email);
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(
        email,
        password
      );

      localStorage.setItem(
        "token",
        data.token
      );
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      onLogin();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.errors?.email?.[0] ||
          "Login gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F0F5FA]">
      <section className="hidden lg:flex lg:w-5/12 xl:w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 relative overflow-hidden flex-col items-center justify-center p-12 text-white">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-white/[0.07] select-none"
              style={{
                fontSize: `${40 + (i % 4) * 25}px`,
                top: `${(i * 19 + 3) % 100}%`,
                left: `${(i * 27 + 5) % 100}%`,
                transform: `rotate(${i * 25}deg)`,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-sm w-full">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-xl">
              <Snowflake className="w-9 h-9 text-white" />
            </div>

            <div className="text-left">
              <div className="text-3xl font-bold tracking-tight">
                Nikky Frozen
              </div>
              <div className="text-blue-300 text-sm">
                Point of Sale System
              </div>
            </div>
          </div>

          <div className="relative w-56 h-56 mx-auto mb-10">
            <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 flex flex-col items-center justify-center shadow-2xl">
              <div className="text-7xl mb-3">🧊</div>
              <p className="text-blue-200 text-sm font-medium">
                Produk Frozen Berkualitas
              </p>
            </div>

            {[
              { e: "🍗", t: "-8%", l: "-12%" },
              { e: "🐟", t: "78%", l: "-14%" },
              { e: "🥩", t: "70%", l: "92%" },
              { e: "🍟", t: "-6%", l: "88%" },
            ].map(({ e, t, l }) => (
              <div
                key={e}
                className="absolute text-2xl bg-white/15 backdrop-blur-sm rounded-2xl w-11 h-11 flex items-center justify-center border border-white/20 shadow-lg"
                style={{
                  top: t,
                  left: l,
                }}
              >
                {e}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-3 leading-tight">
            Kelola Bisnis Frozen Food
            <br />
            dengan Lebih Mudah
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed mb-8">
            Sistem POS terpadu untuk penjualan, stok, kadaluarsa,
            dan laporan keuangan secara real-time.
          </p>

          <div className="flex flex-col gap-2.5 text-sm text-left">
            {[
              "Multi-cabang & multi-role support",
              "Monitoring kadaluarsa otomatis",
              "Laporan keuangan real-time",
              "Kasir cepat dengan stok terhubung",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-blue-100"
              >
                <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-xs">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center p-5 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center shadow-lg shadow-blue-300/40">
              <Snowflake className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Nikky Frozen
              </h1>
              <p className="text-sm text-blue-500">
                Point of Sale System
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-blue-900/10 p-7">
            <div className="mb-6">
              <p className="text-sm font-semibold text-blue-600">
                Selamat datang kembali
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                Masuk ke Sistem
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Pilih role, lalu masuk menggunakan akun terdaftar.
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Pilih akses
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ROLE_PRESETS.map((preset) => (
                  <button
                    key={preset.role}
                    type="button"
                    onClick={() =>
                      chooseRole(preset)
                    }
                    className={cn(
                      "text-left rounded-2xl border p-3 transition-all",
                      selectedRole === preset.role
                        ? "border-blue-600 bg-blue-50 shadow-sm shadow-blue-100"
                        : "border-gray-100 bg-gray-50 hover:border-blue-200"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center mb-2",
                        selectedRole === preset.role
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-400"
                      )}
                    >
                      {preset.icon}
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {preset.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {preset.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <label className="block">
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email
                </span>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="email@nikkyfrozen.com"
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Password
                </span>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300/50 active:scale-[0.99] text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Memproses..."
                  : "Masuk ke Sistem"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-5">
              Gunakan password default{" "}
              <span className="font-semibold text-gray-600">
                password123
              </span>{" "}
              jika database memakai seeder.
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Nikky Frozen POS • © 2026
          </p>
        </div>
      </section>
    </div>
  );
}
