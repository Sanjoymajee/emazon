"use client";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-5">500 - Server Error</h1>
      <p className="text-xl">
        Oops!!! Something went wrong. Please refresh the page
      </p>
    </div>
  );
}
