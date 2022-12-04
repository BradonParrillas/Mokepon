const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const jugadores = []

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }

    static encontrarJugador(id) {
        return jugadores.findIndex((jugador) => id === jugador.id)
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = Jugador.encontrarJugador(jugadorId)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)

    res.end()
})


app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = Jugador.encontrarJugador(jugadorId)
    
    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorIndex = Jugador.encontrarJugador(jugadorId)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end()
})

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugadorId === jugador.id)

    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(8080, () => {
    console.error("Servidor funcionando");
})