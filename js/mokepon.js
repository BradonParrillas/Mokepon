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
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0

let botonFuego
let botonAgua
let botonTierra

let botones = []

let inputHipodoge
let inputCapipepo
let inputRatigueya

let indexAtaqueJugador
let indexAtaqueEnemigo

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
    secuenciaAtaque()
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

    botones = document.querySelectorAll('.boton-de-ataque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent.indexOf('🔥') != -1) {
                ataqueJugador.push('FUEGO')
            } else if(e.target.textContent.indexOf('💧') != -1) {
                ataqueJugador.push('AGUA')
            } else {
                ataqueJugador.push('TIERRA')
            }
            boton.disabled = true
            console.log(e.target.textContent)
            console.log(ataqueJugador)
            boton.style.color = '#D9A443'
            boton.style.background = '#112f58'
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
}

function ataqueAleatorioEnemigo() {
    ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    preparacionParaCombateListo()
}

function preparacionParaCombateListo() {
    if(ataqueJugador.length === 5 && ataqueEnemigo.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] == ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje('EMPATE 😐')
        } else if(
            (ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') ||
            (ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO') ||
            (ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA')) {
                victoriasJugador++;
                indexAmbosOponente(index, index)
                crearMensaje('GANASTES 🤩')
        } else {
            victoriasEnemigo++;
            indexAmbosOponente(index, index)
            crearMensaje('PERDISTES 😓')
        }
    }
    revisarVictorias()
}

function revisarVictorias() {
    if(victoriasJugador === victoriasEnemigo) {
        resultadoFinal('Empate')
    } else if (victoriasJugador > victoriasEnemigo) {
        resultadoFinal('Felicitaciones🎉! Ganastes la partida👊')
    } else {
        resultadoFinal('Perdistes💣, vuelve a intentarlo👍')
    }
}

function crearMensaje(resultado) {
    sectionResultado.innerHTML = resultado

    let ataqueNuevoDelJugador = document.createElement('p')
    ataqueNuevoDelJugador.innerHTML = indexAtaqueJugador
    sectionAtaquesDelJugador.appendChild(ataqueNuevoDelJugador)
    let ataqueNuevoDelEnemigo = document.createElement('p')
    ataqueNuevoDelEnemigo.innerHTML = indexAtaqueEnemigo
    sectionAtaquesDelEnemigo.appendChild(ataqueNuevoDelEnemigo)
}

function resultadoFinal(resultadoPartida) {
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoPartida
    sectionResultado.innerHTML = resultadoPartida
    sectionReiniciar.style.display = 'block'
    spanVidasEnemigo.innerHTML = victoriasEnemigo
    spanVidasJugador.innerHTML = victoriasJugador
    console.log(victoriasEnemigo,victoriasJugador)
}

function reiniciarJuego() {
    location.reload()
}

function habilitarAtaques (){
    botonFuego.disabled = false
    botonAgua.disabled = false
    botonTierra.disabled = false
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego)