import { getCart } from "@/lib/db/cart";
import Link from "next/link";
import ShoppingCartIcon from "./ShoppingCartIcon";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Menu from "./Menu";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  return <Menu session={session} cart={cart} />;
}
