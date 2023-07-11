import { getCart } from "@/lib/db/cart";
import Link from "next/link";
import ShoppingCartIcon from "./ShoppingCartIcon";
import Image from "next/image";

export default async function Navbar() {
  const user = null;
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
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src={"/profile-pic-placeholder.png"}
                alt={"profile-pic"}
                width={40}
                height={40}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-30 p-2 shadow bg-neutral rounded-box w-52"
          >
            <li>
              <Link href={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href={"/settings"}>Settings</Link>
            </li>
            <li>
              <Link href={"/logout"}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
