"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/db/prisma";

export const increamentProductQuantity = async (productId: string) => {
  const cart = (await getCart()) ?? (await createCart());
  const itemInCart = cart.items.find((item) => item.productId === productId);
  if (itemInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: {
              id: itemInCart.id,
            },
            data: {
              quantity: {
                increment: 1,
              },
            },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            quantity: 1,
            productId,
          },
        },
      },
    });
  }

  revalidatePath("/products/[productId]");
};
