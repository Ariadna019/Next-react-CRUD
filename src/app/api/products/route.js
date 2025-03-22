import { NextResponse } from "next/server";
import { conn} from "@/libs/mysql";
import { writeFile,unlink } from "fs/promises";
import { v2 as cloudinary } from 'cloudinary';

//SE USA  ESTA NUBE PARA ALMACENAR LAS IAMGENES DENTRO Y QUE APRESCA DENTRO DE LA TABLA
cloudinary.config({ 
  cloud_name: 'drc3lwwli', 
  api_key: '621119177136758', 
  api_secret: '-EXdwU6aYWYmi_Zs3ZiVfjauCVo' // Click 'View API Keys' above to copy your API secret
});

export async function GET() {
try {
const results = await conn.query("SELECT * FROM productos");
return NextResponse.json(results);
} catch (error) {
return NextResponse.json( {
message: error.message,
  },
  {
  status: 500,
  }
  );
  }

}

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    if (!data.get("nombre") || !data.get("descripcion") || !data.get("precio") || !data.get("cantidad") || !image) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    // Convertir la imagen a buffer image: res.secure_url
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir la imagen a Cloudinary directamente desde el buffer
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    // Guardar el producto en la base de datos
    const result = await conn.query("INSERT INTO productos SET ?", {
      nombre: data.get("nombre"),
      descripcion: data.get("descripcion"),
      precio: data.get("precio"),
      cantidad: data.get("cantidad"),
      image: res.secure_url, // URL de la imagen subida
    });

    return NextResponse.json({
      id: result.insertId,
      nombre: data.get("nombre"),
      descripcion: data.get("descripcion"),
      precio: data.get("precio"),
      cantidad: data.get("cantidad"),
      image: res.secure_url,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
