import Link from 'next/link';

function ProductCard({ product }) {
  return (
    <Link
      className="bg-gray-800 p-4 rounded shadow-md hover:bg-yellow-700 hover:cursor-pointer mb-3"
      href={`/products/${product.id}`} // Ruta dinámica hacia /products/[id]
    >
       {product.image && <img src={product.image} className="w-full rounded-t-lg" alt="" />}
       <div className='p-4'>
      <h1 className="text-xl font-bold">{product.nombre}</h1>
      <h2 className="text-lg">${product.precio}</h2>
      <p>{product.descripcion}</p>
      <p>Cantidad: {product.cantidad}</p></div>
    </Link>
  );
}

export default ProductCard;
