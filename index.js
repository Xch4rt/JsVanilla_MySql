// Definicion de variables
const url = 'http://localhost:3000/api/articulos'
const contenedor = document.querySelector('tbody')

let resultados = ''

const myModalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')

let opcion = ''



btnCrear.addEventListener('click', ()=>{
    //console.log('ola')
    descripcion.value = ''
    precio.value = ''
    stock.value = ''
    myModalArticulo.show()
    opcion = 'crear'
})

//funcion mostrar
const mostrar = (articulos) => {
    articulos.forEach(articulo => {
    resultados += `
                    <tr>
                        <td>${articulo.id}</td>
                        <td>${articulo.descripcion}</td>
                        <td>${articulo.precio}</td>
                        <td>${articulo.stock}</td>
                        <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a> <a class="btnBorrar btn btn-secondary">Eliminar</a></td>
                    </tr>                
    `
    })
    contenedor.innerHTML = resultados
}
//ola
//Mostrar
fetch(url)
    .then(response => response.json)
    .then(data => mostrar(data))
    .catch(error => console.log(error))