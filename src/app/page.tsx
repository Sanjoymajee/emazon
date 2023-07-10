export default function Home() {
  return (
    <main className="p-5">
      <div className="rounded-md max-w-lg flex flex-col bg-gray-500 p-5 w-1/2 mx-auto my-5">
        <h1 className="text-3xl mb-4 text-gray-800">Home</h1>
        <div className="flex flex-col">
          <a
            href="/add-product"
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-2"
          >
            Add Product
          </a>
          <a
            href="/products"
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-2"
          >
            Products
          </a>
        </div>
      </div>
    </main>
  );
}
