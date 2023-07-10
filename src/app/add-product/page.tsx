import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image") as string;
  await prisma.product.create({
    data: {
      name,
      price: Number(price),
      description,
      imageUrl,
    },
  });
  redirect("/products");
}

export default function AddProduct() {
  return (
    <div className="rounded-md max-w-lg flex flex-col bg-gray-500 p-5 w-1/2 mx-auto my-5">
      <h1 className="text-3xl mb-4 text-gray-800">Add Product</h1>
      <form action={addProduct} className="flex flex-col">
        <label className="text-gray-800" htmlFor="name">
          Name
        </label>
        <input
          required
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          className="input input-bordered input-primary w-full max-w-lg mb-2"
        />
        <label htmlFor="price" className="text-gray-800">
          Price
        </label>
        <input
          required
          placeholder="Price"
          className="input input-bordered input-primary w-full max-w-lg mb-2"
          type="number"
          name="price"
          id="price"
        />
        <label className="text-gray-800" htmlFor="description">
          Description
        </label>
        <textarea
          required
          placeholder="Description"
          className="textarea textarea-primary mb-2"
          name="description"
          id="description"
        ></textarea>
        <label htmlFor="image" className="text-gray-800">
          Image URL
        </label>
        <input
          required
          placeholder="Image URL"
          className="input input-bordered input-primary w-full max-w-lg mb-2"
          type="text"
          name="image"
          id="image"
        />
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-2"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
