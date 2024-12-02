//para cargar la lista al localstorage
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

const inputTarea = document.getElementById('inputTarea');
const botonAgregar = document.getElementById('botonAgregar');
const listaTarea = document.getElementById('listaTarea');
const plantillaTarea = document.querySelector('.cosasTarea'); 


function renderizarTareas() {
    listaTarea.innerHTML = '';  
    tareas.forEach((tarea, posicion) => {
        const nuevaTarea = plantillaTarea.cloneNode(true); 
        nuevaTarea.style.display = 'flex'; 
        nuevaTarea.querySelector('.textoTarea').textContent = tarea.texto;

        const botonEliminar = nuevaTarea.querySelector('#eliminar');
        botonEliminar.textContent = 'Eliminar'; 

        const botonEditar = nuevaTarea.querySelector('#editar');
        botonEditar.textContent = 'Editar';
        
        const checkbox = nuevaTarea.querySelector('.completarBoton');
        checkbox.checked = tarea.completada;
        
    
        if (tarea.completada) {
            nuevaTarea.classList.add('tareaCompletada');
        }
        
        botonEliminar.addEventListener('click', () => eliminarTarea(posicion));
        botonEditar.addEventListener('click', () => editarTarea(posicion));
        checkbox.addEventListener('change', () => marcarCompletada(posicion));

        listaTarea.appendChild(nuevaTarea);
    });
}

botonAgregar.addEventListener('click', () => {
    const texto = inputTarea.value.trim();
    if (texto !== '') {
        tareas.push({ texto, completada: false });
        actualizarLocalStorage();
        inputTarea.value = '';
        renderizarTareas();
    }
});

function eliminarTarea(posicion) {
    tareas.splice(posicion, 1);
    actualizarLocalStorage();
    renderizarTareas();
}

function editarTarea(posicion) {
    const nuevoTexto = prompt('Editar tarea:', tareas[posicion].texto);
    if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
        tareas[posicion].texto = nuevoTexto.trim();
        actualizarLocalStorage();
        renderizarTareas();
    }
}

function marcarCompletada(posicion) {
    const tarea = tareas[posicion];
    tarea.completada = !tarea.completada; 
    const tareaElement = listaTarea.children[posicion];
 
    if (tarea.completada) {
        tareaElement.classList.add('tareaCompletada'); 
    } else {
        tareaElement.classList.remove('tareaCompletada'); 
    }

    actualizarLocalStorage();
    renderizarTareas();
}


function actualizarLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

renderizarTareas();
