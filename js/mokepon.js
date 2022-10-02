let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
    //* ocultar seccion
    //todo: Posible funcion
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click',reiniciarJuego)
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } else {
        alert('Selecciona una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1, 3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    if(ataqueJugador == ataqueEnemigo) {
        crearMensaje('EMPATE 😐')
    } else if(
        (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') ||
        (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') ||
        (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')) {
        crearMensaje('GANASTES 🤩')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        revisarVidas()
    } else {
        crearMensaje('PERDISTES 😓')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
        revisarVidas()
    }
}

function revisarVidas() {
    if(vidasEnemigo == 0) {
        resultadoFinal('Felicitaciones🎉! Ganastes la partida👊')
        deshabilitarAtaques()
    } else if (vidasJugador == 0) {
        resultadoFinal('Perdistes💣, vuelve a intentarlo👍')
        deshabilitarAtaques()
    }
}
//! ATENCION
function crearMensaje(resultado) {
    // let sectionMensajes = document.getElementById('mensajes')
    let sectionResultado = document.getElementById('resultado')
    let sectionAtaquesDelJugador = document.getElementById('ataques-del-jugador')
    let sectionAtaquesDelEnemigo = document.getElementById('ataques-del-enemigo')

    // let parrafo = document.createElement('p')
    // parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', la mascota del enemigo atacó con - ' + ataqueEnemigo + ' - ' + resultado

    sectionResultado.innerHTML = resultado

    let ataqueNuevoDelJugador = document.createElement('p')
    ataqueNuevoDelJugador.innerHTML = ataqueJugador
    sectionAtaquesDelJugador.appendChild(ataqueNuevoDelJugador)
    let ataqueNuevoDelEnemigo = document.createElement('p')
    ataqueNuevoDelEnemigo.innerHTML = ataqueEnemigo
    sectionAtaquesDelEnemigo.appendChild(ataqueNuevoDelEnemigo)

    // sectionMensajes.appendChild(parrafo) //AppendChild agrega un hijo al final
}
//! ATENCION
function resultadoFinal(resultadoPartida) {
    let sectionResultado = document.getElementById('resultado')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoPartida
    // sectionResultado.appendChild(parrafo) //AppendChild agrega un hijo al final
    sectionResultado.innerHTML = resultadoPartida //?probar

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function habilitarAtaques (){
    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = false
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = false
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = false
}

function deshabilitarAtaques() {
    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego)