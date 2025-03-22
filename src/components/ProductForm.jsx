"use client"; //dse esta froma es usando el formualrio de la dlo cliente 
// la direccion que se usa es la de new  para  crear un neuvo rpodcuto en el fromualrio puesto qu esta vinculado con  esta
import { useRef,useState,useEffect } from "react";
import axios from "axios";
import {useRouter,useParams} from 'next/navigation'

function ProductForm() {
    const [product, setProduct] = useState({
        nombre:"",
        precio: 0,
        descripcion: "",
        cantidad:0,
        });
        const [file, setFile] = useState(null);
        const form = useRef(null);
        const router =useRouter();
        const params=useParams();
       
        useEffect(() => {
          if (params.id) {
            axios.get("/api/products/" + params.id).then((res) => {
              setProduct({
                nombre: res.data.nombre,
                precio: res.data.precio,
                descripcion: res.data.descripcion,
                cantidad:res.data.cantidad,
              });
            });
          }
        }, []);

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //-----------------------------

        const handleChange = (e) => {
          const { name, value } = e.target;
      
      // Usamos la versión funcional de setProduct para actualizar correctamente el estado
    setProduct((prevProduct) => ({
      ...prevProduct, // Mantenemos los valores previos
      [name]: value, // Actualizamos solo el campo modificado
    }));

    // Muestra en la consola el nombre del campo y el valor ingresado
    console.log(`${name}: ${value}`);
  };

  //----------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Aquí puedes realizar alguna acción como enviar los datos a un servidor, etc.
    console.log("Datos del producto guardados:", product);
  
    if (!params.id) {
      // Si no hay id (es un producto nuevo), se hace un POST
      try {
        const formData = new FormData()
        formData.append("nombre", product.nombre);
    formData.append("precio", product.precio);
    formData.append("descripcion", product.descripcion);
    formData.append("cantidad", product.cantidad);
   
    if(file){

      formData.append("image", file);
    } const res = await axios.post("/api/products", formData,{
          headers: {
            "Content-Type": "multipart/form-data",}


        });
        console.log("Producto creado:", res);
      } catch (error) {
        console.error("Error al crear el producto:", error);
      }
    
    } else {


      // Si hay id (es un producto que se está editando), se hace un PUT
      try {
        const red = await axios.put("/api/products/" + params.id, product);
        console.log("Producto actualizado:", red);
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
      
    }
  
    // Restablecer el formulario y hacer un refresco de la página
    form.current.reset();
    router.refresh();
    router.push("/products");
  };
  


  return (
    <div className="flex">
      <form className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
       onSubmit={handleSubmit} ref={form}>
<label 
htmlFor="nombre"
 className="block text-gray-700 text-sm font-bold mb-2" >
   Nombre del Producto :</label>

<input 
name="nombre"
 type="text"
 placeholder="nombre" onChange={handleChange}
 value={product.nombre}
className="shadow appearance-none border rounded w-full py-2 px-3 mb-4"
autoFocus
/>



<label htmlFor ="precio" 
className="block text-gray-700 text-sm font-bold mb-2" > 
Precio del Producto: </label>

<input type="text"   
 name="precio" 
 value={product.precio}
placeholder="00.00" onChange={handleChange}
className="shadow appearance-none border rounded w-full py-2 px-3 mb-4" />


<label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
  Descripcion del producto: </label>
  <textarea
          name="descripcion"
          rows={3}
          placeholder="descripcion"
          onChange={handleChange}
          value={product.descripcion}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

<label
          htmlFor="cantidad"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Cantidad del Producto:
        </label>
        <input
        value={product.cantidad}
          type="number"
          name="cantidad"
          placeholder="cantidad"
          onChange={handleChange}
          
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4" // Espacio debajo del campo
        />

<label
          htmlFor="productImage"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Imagen del Producto:
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
{file && (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}


<button 
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  {params.id ? "Actualizar Producto" : "Crear Producto"}
</button>






</form>

    </div>
  );
}
 export default ProductForm;