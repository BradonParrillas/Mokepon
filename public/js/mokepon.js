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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

const serverURL = "192.168.1.6"

let jugadorId = null
let enemigoId = null

let contenedorAtaques = document.getElementById("contenedorAtaques")

let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let mascotaJugador
let mascotaJugadorObjeto
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
//Variables para mapa
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaxDelMapa = 350

if (anchoDelMapa > anchoMaxDelMapa) {
    anchoDelMapa = anchoMaxDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoCara, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.fotoCara = fotoCara
        this.mapaFoto = new Image()
        this.mapaFoto.src = this.fotoCara
        this.velocidadx = 0
        this.velocidady = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon(
    'Hipodoge',
    './assets/mokepons_mokepon_hipodoge_attack.png',
    5,
    './assets/hipodoge.png'
)
let capipepo = new Mokepon(
    'Capipepo',
    './assets/mokepons_mokepon_capipepo_attack.png',
    5,
    './assets/capipepo.png'
)
let ratigueya = new Mokepon(
    'Ratigueya',
    './assets/mokepons_mokepon_ratigueya_attack.png',
    5,
    './assets/ratigueya.png'
)

const HIPODOGE_ATAQUES = [
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
]

const CAPIPEPO_ATAQUES = [
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
]

const RATIGUEYA_ATAQUES = [
    { nombre:'Agua', emoticon: '💧', id: 'boton-agua' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Fuego', emoticon: '🔥', id: 'boton-fuego' },
    { nombre:'Tierra', emoticon: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    //* ocultar seccion
    //todo: Posible funcion
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch(`http://${serverURL}:8080/unirse`)
        .then(function (res) {
            // console.log(res)
            if(res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    
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
        return
    }

    seleccionarMokepon(mascotaJugador)
    iniciarMapa()
    extraerAtaques(mascotaJugador)
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://${serverURL}:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
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

            if (ataqueJugador.length === 5) {
                console.log("5 ataques")
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques () {
    fetch(`http://${serverURL}:8080/mokepon/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function obtenerAtaques() {
    fetch(`http://${serverURL}:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo: ', ataquesMokeponEnemigo)
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
    clearInterval(intervalo)

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

function pintarCanvas() {
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadx
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidady
    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://${serverURL}:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            x,
            y
        }),
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function ({ enemigos }) {
                mokeponesEnemigos = enemigos.map(enemigo => {
                    let mokeponEnemigo = null
                    try {
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                    if (mokeponNombre === "Hipodoge") {
                        mokeponEnemigo = new Mokepon(
                            'Hipodoge',
                            './assets/mokepons_mokepon_hipodoge_attack.png',
                            5,
                            './assets/hipodoge.png',
                            enemigo.id
                        )
                    } else if (mokeponNombre === "Capipepo") {
                        mokeponEnemigo = new Mokepon(
                            'Capipepo',
                            './assets/mokepons_mokepon_capipepo_attack.png',
                            5,
                            './assets/capipepo.png',
                            enemigo.id
                        )
                    } else if (mokeponNombre === "Ratigueya") {
                        mokeponEnemigo = new Mokepon(
                            'Ratigueya',
                            './assets/mokepons_mokepon_ratigueya_attack.png',
                            5,
                            './assets/ratigueya.png',
                            enemigo.id
                        )
                    }

                    mokeponEnemigo.x = enemigo.x;
                    mokeponEnemigo.y = enemigo.y;
                    return mokeponEnemigo
                    } catch (error) {
                        
                    }
                })
            });
        }
    });
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadx = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadx = -5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidady = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidady = 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadx = 0
    mascotaJugadorObjeto.velocidady = 0
}

function sePresionoUnaTecla(event) {
    // console.log(event.key)
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    sectionSeleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota =
        mascotaJugadorObjeto.y
    const abajoMascota =
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota =
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota =
        mascotaJugadorObjeto.x
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }
    detenerMovimiento()
    clearInterval(intervalo) //Detenemos el intervalo
    console.warn("Se detecto una colision")
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)