"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function Buttons({ productId }) {
  const router = useRouter();

  return (
    <div className="flex justify-between mt-4">
      <button
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-6 rounded transition duration-300 transform hover:scale-105"
        onClick={async () => {
          if (confirm("Estas seguro de borrar este Producto?")) {
            const res = await axios.delete("/api/products/" + productId);
            if (res.status === 204) {
              router.push("/products");
              router.refresh();
            }
          }
        }}
      >
    Borrar    </button>
      
      <button
        className="text-white bg-green-500 hover:bg-green-700 py-2 px-6 rounded transition duration-300 transform hover:scale-105"
        onClick={() => {
          router.push(`/products/edit/${productId}`);
        }}
      >
       Editar
      </button>
    </div>
  );
}

export default Buttons;