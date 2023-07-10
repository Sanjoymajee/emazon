import { Cart, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers";

type CartWithProduct = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

type ShoopingCart = {
  size: number;
  subTotal: number;
} & CartWithProduct;

export const getCart = async (): Promise<ShoopingCart | null> => {
  const localCartId = cookies().get("localCartId")?.value;
  console.log("localCartId", localCartId);
  const cart: CartWithProduct | null = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    : null;
  if (!cart) return null;
  const size = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const subTotal = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );

  return {
    ...cart,
    size,
    subTotal,
  };
};

export const createCart = async (): Promise<ShoopingCart> => {
  const newCart: Cart = await prisma.cart.create({
    data: {},
  });
  cookies().set("localCartId", newCart.id);
  return {
    ...newCart,
    items: [],
    size: 0,
    subTotal: 0,
  };
};
