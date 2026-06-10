import type { AppUser } from "../types";

export const USERS: AppUser[] = [
  { id:1, name:"Budi Santoso", email:"budi@nikkyfrozen.com", role:"owner", branch:"Semua Cabang", status:"active", initials:"BS" },
  { id:2, name:"Siti Rahayu", email:"siti@nikkyfrozen.com", role:"admin_keuangan", branch:"Semua Cabang", status:"active", initials:"SR" },
  { id:3, name:"Ahmad Fauzi", email:"ahmad@nikkyfrozen.com", role:"admin_gudang", branch:"Cabang Utama", status:"active", initials:"AF" },
  { id:4, name:"Dewi Lestari", email:"dewi@nikkyfrozen.com", role:"kasir", branch:"Cabang Utama", status:"active", initials:"DL" },
  { id:5, name:"Rizki Pratama", email:"rizki@nikkyfrozen.com", role:"kasir", branch:"Cabang Bandung", status:"inactive", initials:"RP" },
  { id:6, name:"Maya Indah", email:"maya@nikkyfrozen.com", role:"kasir", branch:"Cabang Surabaya", status:"active", initials:"MI" },
  { id:7, name:"Eko Wibowo", email:"eko@nikkyfrozen.com", role:"admin_gudang", branch:"Cabang Bandung", status:"active", initials:"EW" },
];