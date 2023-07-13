"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface ProfileButtonProps {
  session: Session | null;
}

export default function ProfileButton({ session }: ProfileButtonProps) {
  const user = session?.user;
  return (
    <div className="dropdown dropdown-end hidden md:block">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full flex content-center justify-center">
          <Image
            src={user?.image || "/profile-pic-placeholder.png"}
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
        {user ? (
          <>
            <li>
              <Link href={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={() => signOut()}>Log out</button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => signIn()}>Log In</button>
          </li>
        )}
      </ul>
    </div>
  );
}
