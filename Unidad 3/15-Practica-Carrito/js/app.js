const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody') 
const btnVaciarCarrito = document.querySelector('#vaciar-carrito') 

const listaCursos = document.querySelector('#lista-cursos') 

let articulosCarrito = [];
cargarEventListeners ();

function cargarEventListeners (){
    listaCursos.addEventListener('click', agregarCurso)
    carrito.addEventListener('click', eliminarArticulo);
}

// Funcitions 
function eliminarArticulo(e){
    if (e.target.classList.contains('borrar-curso')){
        const articuloId = e.target.getAttribute('data-id')
        // regresa un nuevo arreglo filtrando lo especificado
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id!== articuloId);
        carritoHtml();
    }
    
}





function agregarCurso (e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionados = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionados)
    } 
}

function leerDatosCursos (curso){
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        autor : curso.querySelector('.info-card p').textContent,
        cantidad: 1,
        
    }
    const existe = articulosCarrito.some(articulo => articulo.id === infoCurso.id);
    if (existe){
        const articulos = articulosCarrito.map(articulo => {
            if (articulo.id ===infoCurso.id){
                articulo.cantidad++;
                return articulo;
            }else{
                return articulo
            }
        })
        articulosCarrito = [...articulos]
    } else{
        articulosCarrito = [...articulosCarrito,infoCurso];
    }
    
    // articulosCarrito.push(infoCurso)
    
    carritoHtml();
}


function carritoHtml(){
    limpiarHtml();
    articulosCarrito.forEach(({titulo,imagen,precio,id,cantidad}) => {
        // crear filas 
      // const {titulo,imagen,precio,id,cantidad} = artuculo
        const row = document.createElement('TR');
        row.innerHTML = `
        <td>
            <img src= '${imagen}' width = 100 />
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href = "#" class = "borrar-curso" data-id = "${id}">x</a>
        </td>
        `;
        contenedorCarrito.appendChild(row)
    });


}

// limpiar html y volver a agregar todo (Carrito)
function limpiarHtml () {
    // lo mas facil
    // afecta el rendimiento
    //contenedorCarrito.innerHTML= '';

    // Forma eficiente no tan tan facil

    // elimina los hijos de 1 en 1 hasta elimininarse todos y termina el ciclo
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

let vaciar = document.addEventListener('vaciarCarrito')