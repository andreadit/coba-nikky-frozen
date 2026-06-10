import type { Product } from "../types";
import { D } from "./helpers";

export const PRODUCTS: Product[] = [
  { id:1, sku:"CHK-001", name:"Chicken Nuggets (500g)", category:"Daging", price:35000, stock:45, branch:"Cabang Utama", expiry:D(3), emoji:"🍗" },
  { id:2, sku:"FSH-001", name:"Fish Ball (500g)", category:"Seafood", price:28000, stock:12, branch:"Cabang Utama", expiry:D(-2), emoji:"🐟" },
  { id:3, sku:"BEF-001", name:"Beef Burger Patty (6pcs)", category:"Daging", price:45000, stock:30, branch:"Cabang Bandung", expiry:D(60), emoji:"🥩" },
  { id:4, sku:"DMS-001", name:"Dimsum (12pcs)", category:"Snack", price:32000, stock:8, branch:"Cabang Utama", expiry:D(1), emoji:"🥟" },
  { id:5, sku:"FRF-001", name:"French Fries (500g)", category:"Sayuran", price:22000, stock:60, branch:"Cabang Surabaya", expiry:D(120), emoji:"🍟" },
  { id:6, sku:"SSG-001", name:"Sausage Premium (10pcs)", category:"Daging", price:38000, stock:25, branch:"Cabang Bandung", expiry:D(45), emoji:"🌭" },
  { id:7, sku:"CRB-001", name:"Crab Stick (250g)", category:"Seafood", price:30000, stock:5, branch:"Cabang Utama", expiry:D(5), emoji:"🦀" },
  { id:8, sku:"SPR-001", name:"Spring Roll (20pcs)", category:"Snack", price:25000, stock:40, branch:"Cabang Surabaya", expiry:D(90), emoji:"🥚" },
  { id:9, sku:"ICE-001", name:"Es Krim Vanilla (1L)", category:"Minuman", price:42000, stock:15, branch:"Cabang Utama", expiry:D(180), emoji:"🍦" },
  { id:10, sku:"SHR-001", name:"Udang Rebon (200g)", category:"Seafood", price:35000, stock:3, branch:"Cabang Bandung", expiry:D(7), emoji:"🍤" },
  { id:11, sku:"POT-001", name:"Potato Wedges (500g)", category:"Sayuran", price:20000, stock:55, branch:"Cabang Surabaya", expiry:D(100), emoji:"🥔" },
  { id:12, sku:"CKN-002", name:"Chicken Karage (300g)", category:"Daging", price:40000, stock:20, branch:"Cabang Utama", expiry:D(30), emoji:"🫓" },
];