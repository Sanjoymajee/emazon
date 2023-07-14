import Form from "./Form";
import { addProduct } from "./action";

export const metadata = {
  title: "Add Product - Emazon",
  description: "Add a product to Emazon",
};

export default function AddProduct() {
  return (
    <div className="rounded-none md:rounded-xl min-w-[300px] max-w-2xl flex flex-col bg-neutral p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-200">Add Product</h1>
      <Form addProduct={addProduct} />
    </div>
  );
}
