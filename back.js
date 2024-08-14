var resultado;
var texto;

inicial();
function inicial() {
    ocultar('encriptar');
    mostrar('mensaje');
    document.getElementById('texto').focus();
}

function encriptar() {
    texto = document.getElementById('texto').value;
    resultado = checkType(texto);

    if (texto === '') {
        mostrarAdvertencia("El campo está vacío, digitaliza algo.");
        inicial();
    } else if (resultado === '1' || resultado === '2') {
        mostrarAdvertencia("Estás ingresando caracteres no válidos.");
        inicial();
    } else {
        mostrar('encriptar');
        ocultar('mensaje');

        const chars = {
            'a': 'ai',
            'e': 'enter',
            'i': 'imes',
            'o': 'ober',
            'u': 'ufat'
        };
        let encriptar = texto.replace(/[aeiou]/g, m => chars[m]);
        asignarTextoElemento('.salida', encriptar);
        limpiarCaja('.texto')
    }
}

function desencriptar() {
    texto = document.getElementById('texto').value;
    resultado = checkType(texto);

    if (texto === '') {
        mostrarAdvertencia("El campo está vacío, digitaliza algo.");
        inicial();
    } else if (resultado === '1' || resultado === '2') {
        mostrarAdvertencia("Estás ingresando caracteres no válidos.");
        inicial();
    } else {
        mostrar('encriptar');
        ocultar('mensaje');

        const reverse = {
            'ai': 'a',
            'enter': 'e',
            'imes': 'i',
            'ober': 'o',
            'ufat': 'u',
        };

        const reverseRegEx = new RegExp(Object.keys(reverse).join('|'), 'g');
        let desencriptar = texto.replace(reverseRegEx, m => reverse[m]);
        asignarTextoElemento('.salida', desencriptar);
        limpiarCaja('.texto')
    }
}

function mostrarAdvertencia(message) {
    Swal.fire({
        icon: 'warning',
        title: 'Cuidado',
        text: message,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Cerrar'
    });
}

function checkType(mensaje) {
    mensaje = String(mensaje).replace(/[" "]/g, "");
    mensaje = mensaje.replace(/\n/g, '');
    mensaje = String(mensaje).trim();
    const regxs = {
        "lower": /^[a-z]+$/,
        "upper": /^[A-Z0-9ÁÉÍÓÚÑÜ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
        "upperLower": /^[A-Za-z0-9ÁÉÍÓÚÑÜáéíóúñü!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/
    };
    if (regxs.lower.test(mensaje)) {
        return '0';
    }

    if (regxs.upper.test(mensaje)) {
        return '1';
    }

    if (regxs.upperLower.test(mensaje)) {
        return '2';
    }

    return -1;
}

function copy (){
    texto = document.querySelector('.salida');
    texto.select();
    document.execCommand('copy');
    inicial();
    limpiarCaja('#texto')
       Swal.fire({
        icon: 'success',
        title: 'Copiado',
        text: 'El texto ha sido copiado al portapapeles.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Cerrar',
        timer: 3000,  // Cierra automáticamente después de 3000 milisegundos (3 segundos)
        timerProgressBar: true  // Muestra una barra de progreso para el temporizador
    });
    

}
function limpiarCaja(caja){
    document.querySelector(caja).value='';
    return;
     }


function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    if (elementoHTML) {
        elementoHTML.value = texto;
    } else {
        console.error(`Elemento con selector "${elemento}" no encontrado.`);
    }
}

function mostrar(objeto) {
    document.getElementById(objeto).style.display = 'flex';
}

function ocultar(objeto) {
    document.getElementById(objeto).style.display = 'none';
}
