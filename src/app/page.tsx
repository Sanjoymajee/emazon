import Link from "next/link";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { getCart } from "../lib/db/cart";

export default async function Home() {
  const user = null;
  const cart = await getCart();
  return (
    <main>
      <nav>
        <div className="navbar bg-neutral">
          <div className="flex-1 justify-start content-center">
            <Link
              href={"/"}
              className="btn btn-ghost normal-case text-3xl pb-1 text-primary"
            >
              Emazon
            </Link>
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
          <div className="flex-none gap-3">
            <ShoppingCartIcon cart={cart} />
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {user ? (
                  <div className="w-10 rounded-full"></div>
                ) : (
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">E</span>
                  </div>
                )}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52"
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
      </nav>
    </main>
  );
}
