//BACK-END API REST ACTULIZAR , ELIMINAR

import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server"; // Asegúrate de que esté importado

export async function GET(request, { params }) { // permtie obtener datos de la abse de datos
  try {
    // Corregir la consulta SQL
    const result = await conn.query("SELECT * FROM productos WHERE id = ?", [
      params.id,
    ]);

    // Verificar si no se encontraron productos
    if (result.length === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Devolver el producto encontrado
    return NextResponse.json(result[0]);
  } catch (error) {
    // Manejar errores de manera adecuada
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE (request, { params }) {
    try {
    const result = await conn.query("DELETE FROM productos WHERE id = ?", [
    params.id,
    ]);
    if (result.affectedRows === 0) {
    return NextResponse.json(
    {
    message: "Producto no encontrado",
    },
    {
    status: 404,
    }
    );
    }return new Response (null, {
        status: 204,
        });
        } catch (error) {
        return NextResponse.json( 
            {
        message: error.message, 
    },
       { status: 500}
        );
    }
}


export async function PUT(request, { params }) {
    try {
    const data = await request.json();
    const result = await conn.query("UPDATE productos SET? WHERE id = ?", [
    data,
    params.id,
    ]);
        if (result.affectedRows === 0) {
        return NextResponse.json(
            {
            message: "Producto no encontrado",
            },
                {
                status: 404,
                }
        );
        }
    const updatedProduct = await conn.query("SELECT * FROM productos WHERE id = ?",
        [params.id]
    );
    return NextResponse.json(updatedProduct[0]);
} catch (error) {
return NextResponse.json(
{
message: error.message,
 },
{ status: 500}
);
}
}