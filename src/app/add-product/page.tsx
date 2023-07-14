import Form from "./Form";
import { addProduct } from "./action";

export const metadata = {
  title: "Add Product - Emazon",
  description: "Add a product to Emazon",
};

export default function AddProduct() {
  return (
    <div className="rounded-xl min-w-[300px] max-w-2xl flex flex-col bg-neutral p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-current">Add Product</h1>
      <Form addProduct={addProduct} />
    </div>
  );
}
