"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import SwapMenu from "./SwapMenu";
import ShoppingCartIcon from "./ShoppingCartIcon";
import ProfileButton from "./ProfileButton";
import { ShoopingCart } from "@/lib/db/cart";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";

interface MenuProps {
  session: Session | null;
  cart: ShoopingCart | null;
}

export default function Menu({ session, cart }: MenuProps) {
  const [show, setShow] = useState(false);
  const showMenu = () => {
    setShow(!show);
  };
  const user = session?.user;
  return (
    <div className="flex flex-col">
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
          <div className="hidden md:block">
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
        <SwapMenu showMenu={showMenu} />
        <div className="flex-none gap-3">
          <ShoppingCartIcon cart={cart} />
          <ProfileButton session={session} />
        </div>
      </div>
      <div
        className={(show ? "block" : "hidden") + " " + "bg-neutral md:hidden"}
      >
        <div className="bg-neutral rounded-box w-52 flex flex-col">
          <ul className="menu items-start rounded-box w-full flex-start">
            <li>
              <Link
                href={"/add-product"}
                className="btn btn-ghost capitalize ml-2 text-xl "
              >
                Add Product
              </Link>
            </li>
            <li>
              <Link
                href={"/products"}
                className="btn btn-ghost capitalize ml-2 text-xl "
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href={"/cart"}
                className="btn btn-ghost capitalize ml-2 text-xl "
              >
                Cart
                <span className="badge badge-md indicator-item">
                  {cart?.size || 0}
                </span>
              </Link>
            </li>
            <li>
              {user ? (
                <button
                  className="btn btn-ghost capitalize ml-2 text-xl "
                  onClick={() => signOut()}
                >
                  Log out
                </button>
              ) : (
                <button
                  className="btn btn-ghost capitalize ml-2 text-xl "
                  onClick={() => signIn()}
                >
                  Log In
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
