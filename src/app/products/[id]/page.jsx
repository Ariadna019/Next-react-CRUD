import axios from "axios";
import Buttons from "./Buttons";

//se carga los productos de  la abse de datos , es lo que vera el usuario
async function loadProduct(productId) {
  const { data } = await axios.get("http://localhost:3000/api/products/" + productId);
  return data;
}

async function ProductPage({ params }) {
  const product = await loadProduct(params.id);
  console.log(product);

  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)] ">

      
        <div  className="flex w-4/6 h-2/6 justify-center">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center">{product.nombre}</h1>
        <p className="text-lg mt-4">{product.descripcion}</p>
        <h4 className="text-lg mt-2">Precio: ${product.precio}</h4>
        <p className="text-lg mt-2">Cantidad: {product.cantidad}</p>
        <Buttons productId={product.id}/>
      </div>

      <img src={product.image}  className="w-1/3"alt =""/>
      
      
      
      </div>
    </section>
  );
}

export default ProductPage;
