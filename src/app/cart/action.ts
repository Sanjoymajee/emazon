"use server";

import { CartItemWithProduct, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const removeItemFromCart = async (itemId: string) => {
  const cart = await getCart();
  if (!cart) throw new Error("Cart not found");
  await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      items: {
        delete: {
          id: itemId,
        },
      },
    },
  });

  revalidatePath("/cart");
};
