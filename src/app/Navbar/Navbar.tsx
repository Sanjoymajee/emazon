import { getCart } from "@/lib/db/cart";
import Link from "next/link";
import ShoppingCartIcon from "./ShoppingCartIcon";
import Image from "next/image";
import ProfileButton from "./ProfileButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  return (
    <div className="navbar bg-neutral">
      <div className="flex-1 justify-start content-center">
        <Link
          href={"/"}
          className="btn btn-ghost normal-case text-3xl pb-1 text-primary"
        >
          <Image
            src={"/icons8-sigma-color-96.png"}
            alt="Emazon"
            width={50}
            height={50}
          />
        </Link>
        <div className="hidden sm:block">
          <Link
            href={"/add-product"}
            className="btn btn-ghost capitalize ml-2 text-xl "
          >
            Add product
          </Link>
          <Link
            href={"/products"}
            className="btn btn-ghost capitalize ml-2 text-xl "
          >
            Products
          </Link>
        </div>
      </div>
      <div className="flex-none gap-3">
        <ShoppingCartIcon cart={cart} />
        <ProfileButton session={session} />
      </div>
    </div>
  );
}
