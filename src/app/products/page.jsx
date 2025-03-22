import ProductCard from "@/components/ProductCard";
import axios from 'axios';

async function loadProduct() {
  const { data } = await axios.get('http://localhost:3000/api/products');
  return data;
}

async function ProductsPage() {
  const products = await loadProduct();
  

  return (
    <div className="text-white">
      {products.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
}

export default ProductsPage;
