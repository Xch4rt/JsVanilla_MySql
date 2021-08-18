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


const on = (element, event, selector, handler) => {
    /*
        al utilizar target puede ser utilizada para una delegacion al evento
        closest devuelve el ascendiente mas cercano o el propio elemento actual y 
        si no se encuentra devuelve null
    */
    element.addEventListener(event, e => {
        if (e.target.closest(selector)){
            handler(e)
        }
    })
}
// borrar
on(document, 'click', '.btnBorrar', e => {
    console.log('se borro')
    // procedimiento de borrado
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML

    alertify.confirm("",
    function(){
        fetch(url+id,{
            method: 'DELETE'
        })
        //uso de promesas
        .then(res=>res.json())
        .then(()=>location.reload())
        alertify.success("Aceptar")
    },
    function()
    {
        alertify.error("Cancelar")
    })


})


//editar
let idForm = 0

on(document,'click','.btnEditar', e=>{
    console.log('editando')
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML

    const descripcionForm = fila.children[1].innerHTML
    const precioForm = fila.children[1].innerHTML
    const stockForm = fila.children[1].innerHTML

    descripcion.value = descripcionForm
    precio.value = precioForm
    stock.value = stockForm
    opcion = 'editar'
    myModalArticulo.show()
})

//crear o editar