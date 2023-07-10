import Link from "next/link";

export default function Home() {
  const user = null;
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
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body bg-slate-800 rounded-xl">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {user ? (
                  <div className="w-10 rounded-full">
                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />{" "}
                  </div>
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
