const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionResultado = document.getElementById('resultado')
const sectionAtaquesDelJugador = document.getElementById('ataques-del-jugador')
const sectionAtaquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')

let contenedorAtaques = document.getElementById("contenedorAtaques")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let mascotaJugador
let ataquesMokepon
let vidasJugador = 3
let vidasEnemigo = 3

let botonFuego = document
let botonAgua = document
let botonTierra = document

let inputHipodoge
let inputCapipepo
let inputRatigueya

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/4.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/1.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/2.png', 5)

hipodoge.ataques.push(
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
)

ratigueya.ataques.push(
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    //* ocultar seccion
    //todo: Posible funcion
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} >
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    inputCapipepo = document.getElementById('Capipepo')
    inputHipodoge = document.getElementById('Hipodoge')
    inputRatigueya = document.getElementById('Ratigueya')

    sectionReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click',reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarAtaque.style.display = 'flex'

    sectionSeleccionarMascota.style.display = 'none'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascota) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascota == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque" >${ataque.emoticon}<br>${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
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

function crearMensaje(resultado) {
    sectionResultado.innerHTML = resultado

    let ataqueNuevoDelJugador = document.createElement('p')
    ataqueNuevoDelJugador.innerHTML = ataqueJugador
    sectionAtaquesDelJugador.appendChild(ataqueNuevoDelJugador)
    let ataqueNuevoDelEnemigo = document.createElement('p')
    ataqueNuevoDelEnemigo.innerHTML = ataqueEnemigo
    sectionAtaquesDelEnemigo.appendChild(ataqueNuevoDelEnemigo)
}

function resultadoFinal(resultadoPartida) {
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoPartida
    sectionResultado.innerHTML = resultadoPartida

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function habilitarAtaques (){
    botonFuego.disabled = false
    botonAgua.disabled = false
    botonTierra.disabled = false
}

function deshabilitarAtaques() {
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego)