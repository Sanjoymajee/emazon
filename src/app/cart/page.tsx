import CartItems from "@/app/cart/CartItem";
import { USDconversion } from "@/components/ProductCard";
import { getCart } from "@/lib/db/cart";

export const metadata = {
  title: "Cart - Emazon",
  description: "Emazon cart",
};

export default async function Cart() {
  const cart = await getCart();
  return (
    <div className="flex max-w-7xl mx-auto flex-col p-5">
      <h1 className="text-3xl font-bold mb-5">Your Cart</h1>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {cart?.items.map((item) => <CartItems key={item.id} item={item} />)}
      </div>

      <div className="bg-neutral p-5 mt-5 rounded-lg">
        {cart?.items.length ? (
          <>
            <h2 className="text-2xl font-bold mb-5 uppercase">Total</h2>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <div className="text-xl text-accent">Subtotal</div>
                <div className="text-xl text-secondary">
                  {USDconversion(cart?.subTotal || 0)}
                </div>
              </div>
              <div className="flex justify-between border-b-4 border-base-100 pb-3">
                <div className="text-xl text-accent capitalize">
                  convenience fees
                </div>
                <div className="text-xl text-secondary">
                  {USDconversion(1000)}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-xl text-accent capitalize">Total fees</div>
                <div className="text-xl text-secondary">
                  {USDconversion(1000 + (cart?.subTotal || 0))}
                </div>
              </div>
            </div>
            <button className="btn btn-accent mt-5">Order</button>
          </>
        ) : (
          <h2 className="text-2xl font-bold mb-5 capitalize">
            Your cart is empty
          </h2>
        )}
      </div>
    </div>
  );
}
