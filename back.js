
var resultado;
var texto;
var texto_total;



inicial();
function inicial(){
    ocultar('encriptar')
    mostrar('mensaje')
    document.getElementById('texto').focus();
}


//PARAMETROS PARA ENCRIPTAR
// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

function encriptar(){
    texto= document.getElementById('texto').value;
    resultado = checkType(texto)

    //Comprobar si el campo Texto esta vacido

    if (texto=='') {
        mostrarAdvertencia("El campo esta vacido, digitaliza algo.");
        inicial();
    } else if (resultado == '1' || resultado == '2') {
        mostrarAdvertencia("Estas ingresando caracteres no validos.")
        inicial();

    } else{
        mostrar('encriptar'); 
        ocultar('mensaje')

        const chars = {
            'a': 'ai',
            'e': 'enter',
            'i': 'imes',
            'o': 'ober',
            'u': 'ufat'
        };
        let encripta = texto.replace(/[aeiou]/g, m => chars[m]);
        asignarTextoElemento('.salida', encripta);
        

    }

}





// Mostrar notificación de error
function mostrarAdvertencia(message) {
    Swal.fire({
        icon: 'warning',
        title: 'Cuidado',
        text: message,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Cerrar'
    });
}


//Funcion para detectar si hay mayusculas o numeros
function checkType(mensaje) {
    mensaje = String(mensaje).replace(/[" "]/g,"");
    mensaje = mensaje.replace(/\n/g, '');
    mensaje = String(mensaje).trim();
    const regxs = {
      "lower": /^[a-z]+$/,
      "upper": /^[A-Z0-9ÁÉÍÓÚÑÜ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
      "upperLower":  /^[A-Za-z0-9ÁÉÍÓÚÑÜáéíóúñü!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/
    }; 
    if (regxs.lower.test(mensaje)) {
        return '0';
      }
   
      if (regxs.upper.test(mensaje)){
       return '1';
      }
   
      if (regxs.upperLower.test(mensaje)){
       return '2';
      }
      
      return -1;
  }

  function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    if (elementoHTML) {
        elementoHTML.value = texto;
    } else {
        console.error(`Elemento con selector "${elemento}" no encontrado.`);
    }
}

function mostrar(objeto){
    document.getElementById(objeto).style.display = 'flex';
}
function ocultar(objeto){
    document.getElementById(objeto).style.display = 'none';
}