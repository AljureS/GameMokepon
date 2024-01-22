const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById ('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonInstrucciones = document.getElementById ('boton-instrucciones')
const botonReiniciar= document.getElementById ('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById ('mascota-enemigo')

const spanVidasJugador =document.getElementById('vidas-jugador')
const spanVidasEnemigo =document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultados')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')

const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueEnemigo = []
let ataqueJugador = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let inputLangostelvis
let inputPydos
let inputTucapalma
let mascotaJugador
let mascotaJugadorObjeto
let mascotaAleatorio 
let ataquesMokepon
let ataquesMokeponEnemigo = []
let botonFuego
let botonAgua
let botonTierra 
let botonLava
let botonRayo
let botonViento
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3   
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image ()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 540

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa 
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id 
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = [] 
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio (0, mapa.width - this.ancho)
        this.y = aleatorio (0, mapa.height - this.alto)
        this.mapaFoto = new Image ()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage (
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon ('Hipodoge' , './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')

let capipepo = new Mokepon ('Capipepo' , './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')

let ratigueya = new Mokepon ('Ratigueya' , './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

let langostelvis = new Mokepon ('Langostelvis' , './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/langostelvis.png')

let pydos = new Mokepon ('Pydos' , './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/pydos.png')

let tucapalma = new Mokepon ('Tucapalma' , './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/tucapalma.png')

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma)

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}, 
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌋', id: 'boton-lava'}, 
    {nombre: '⚡', id: 'boton-trueno'},
    {nombre: '🌪️', id: 'boton-viento'}
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌋', id: 'boton-lava'}, 
    {nombre: '⚡', id: 'boton-trueno'},
    {nombre: '🌪️', id: 'boton-viento'} 
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const LANGOSTELVIS_ATAQUES =[
    {nombre: '🌋', id: 'boton-lava'}, 
    {nombre: '🌋', id: 'boton-lava'},
    {nombre: '🌋', id: 'boton-lava'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}, 
    {nombre: '⚡', id: 'boton-trueno'},
    {nombre: '🌪️', id: 'boton-viento'}, 
    {nombre: '🔥', id: 'boton-fuego'}
]

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

const PYDOS_ATAQUES =[
    {nombre: '⚡', id: 'boton-trueno'}, 
    {nombre: '⚡', id: 'boton-trueno'},
    {nombre: '⚡', id: 'boton-trueno'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}, 
    {nombre: '🌋', id: 'boton-lava'}, 
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌪️', id: 'boton-viento'}
]

pydos.ataques.push(...PYDOS_ATAQUES)

const TUCAPALMA_ATAQUES = [
    {nombre: '🌪️', id: 'boton-viento'}, 
    {nombre: '🌪️', id: 'boton-viento'},
    {nombre: '🌪️', id: 'boton-viento'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}, 
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌋', id: 'boton-lava'}, 
    {nombre: '⚡', id: 'boton-trueno'}

]

tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'}, 
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}, 
    {nombre: '🌋', id: 'boton-lava'}, 
    {nombre: '⚡', id: 'boton-trueno'}, 
    {nombre: '🌪️', id: 'boton-viento'}

]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


function iniciarJuego (){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((Mokepon) => {  
        opcionDeMokepones = `
        <input type ="radio" name="mascota" id = ${Mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${Mokepon.nombre}>
            <p>${Mokepon.nombre}</p>
            <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
        </label>
        ` 
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputPydos = document.getElementById('Pydos')
        inputTucapalma = document.getElementById('Tucapalma')

    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonInstrucciones.addEventListener('click',instrucciones)
    
    botonReiniciar.addEventListener('click',reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://192.168.1.111:8080/unirse")
        .then(function (res){
            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta);
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador (){
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if (inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else if (inputPydos.checked){
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    } else if (inputTucapalma.checked){
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    } else {
        //reiniciarJuego()
        alert ('Tienes que seleccionar algo para continuar')
        return
    }
    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    inciarMapa()
}

function seleccionarMokepon (mascotaJugador){
    fetch (`http://192.168.1.111:8080/mokepon/${jugadorId}`, { 
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques 
    for (let i =0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id = ${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById ('boton-fuego')
    botonAgua = document.getElementById ('boton-agua')
    botonTierra = document.getElementById ('boton-tierra')
    botonLava = document.getElementById('boton-lava')
    botonRayo = document.getElementById('boton-trueno')
    botonRoca = document.getElementById('boton-piedra')
    
    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque (){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#240033'
                boton.disabled = true
            } else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#240033'
                boton.disabled = true
            } else if (e.target.textContent === '🌋'){
                ataqueJugador.push('LAVA')
                console.log(ataqueJugador)
                boton.style.background = '#240033'
                boton.disabled = true
            } else if (e.target.textContent === '⚡'){ 
                ataqueJugador.push('TRUENO')
                console.log(ataqueJugador)
                boton.style.background = '#240033'
                boton.disabled = true
            } else if (e.target.textContent === '🌪️'){
                ataqueJugador.push('AIRE')
                console.log(ataqueJugador)
                boton.style.background = '#240033'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#240033'
                boton.disabled = true
            }

            if (ataqueJugador.length === 8){
                enviarAtaques()
            }
            //ataqueAleatorioEnemigo()
        })
    })
}

function enviarAtaques(){
    fetch (`http://192.168.1.111:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques,50)
}

function obtenerAtaques (){
    fetch(`http://192.168.1.111:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if (res.ok){
            res.json()
                .then(function ({ ataques }) {
                    if (ataques.length === 8){
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
        }
    })
}

function seleccionarMascotaEnemigo (enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo= enemigo.ataques
    secuenciaAtaque() 
}

function ataqueAleatorioEnemigo(){ 
    let ataqueAleatorio =  aleatorio(0, ataquesMokeponEnemigo.length-1)
    let simboloAtaque

    if(ataqueAleatorio === 0){
        simboloAtaque = ataquesMokeponEnemigo[0].nombre
    } else if (ataqueAleatorio === 1){
        simboloAtaque = ataquesMokeponEnemigo[1].nombre
    } else if (ataqueAleatorio === 2){
        simboloAtaque = ataquesMokeponEnemigo[2].nombre
    } else if (ataqueAleatorio === 3){
        simboloAtaque = ataquesMokeponEnemigo[3].nombre
    } else if (ataqueAleatorio === 4){
        simboloAtaque = ataquesMokeponEnemigo[4].nombre
    } else if (ataqueAleatorio === 5){
        simboloAtaque = ataquesMokeponEnemigo[5].nombre
    } else if (ataqueAleatorio === 6){
        simboloAtaque = ataquesMokeponEnemigo[6].nombre
    } else if (ataqueAleatorio === 7){
        simboloAtaque = ataquesMokeponEnemigo[7].nombre
    }

    if (simboloAtaque === '🔥'){
        ataqueEnemigo.push('FUEGO')
    } else if (simboloAtaque === '💧'){    
        ataqueEnemigo.push('AGUA')
    } else if (simboloAtaque === '🌋') {
        ataqueEnemigo.push('LAVA')
    } else if (simboloAtaque === '🌪'){    
        ataqueEnemigo.push('AIRE')
    } else if (simboloAtaque === '⚡') {
        ataqueEnemigo.push('TRUENO')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 8){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index,index)
            crearMensaje("Empate") 
        } else if ((ataqueJugador[index] === 'AIRE' && ataqueEnemigo[index] === 'FUEGO') || (ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] === 'FUEGO') || (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') || (ataqueJugador[index] === 'AIRE' && ataqueEnemigo[index] === 'TIERRA') || (ataqueJugador[index] === 'AIRE' && ataqueEnemigo[index] === 'LAVA')|| (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'TRUENO') || (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'AIRE') || (ataqueJugador[index] === 'TRUENO' && ataqueEnemigo[index] === 'AGUA') || (ataqueJugador[index] === 'LAVA' && ataqueEnemigo[index] === 'TIERRA') || (ataqueJugador[index] === 'LAVA' && ataqueEnemigo[index] === 'TRUENO') || (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'LAVA') || (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'FUEGO') || (ataqueJugador[index] === 'LAVA' && ataqueEnemigo[index] === 'FUEGO') || (ataqueJugador[index] === 'TRUENO' && ataqueEnemigo[index] === 'FUEGO') || (ataqueJugador[index] === 'TRUENO' && ataqueEnemigo[index] === 'AIRE'))
        {
            indexAmbosOponentes(index,index)
            crearMensaje("Ganaste") 
            victoriasJugador = victoriasJugador + 1
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index,index)
            crearMensaje("Perdiste")
            victoriasEnemigo = victoriasEnemigo + 1 
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

function revisarVidas (){
    if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal ('QUE CRACK, GANASTE')
    } else if (victoriasJugador < victoriasEnemigo){
        crearMensajeFinal ('PERDISTE, LAMPARA')
    } else if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal ('EMPATE')
    }
}

function crearMensaje(resultado){
    // Creamos un nuevo nodo <p>
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    // Agregamos el nuevo nodo <span> como hijo del <div> con id 'notificacion, at..J , at..E'
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}


function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display ='block'
}

function reiniciarJuego (){
    location.reload()
}

function instrucciones (){
    alert('FUEGO le gana a TIERRA, TIERRA le gana a AGUA, AGUA le gana a FUEGO')
}

function aleatorio (min, max) {
    return Math.floor( Math.random() * (max-min+1) +min)
}

function pintarCanva() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)

    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

}

function enviarPosicion (x, y){
    fetch(`http://192.168.1.111:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers :{
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if (res.ok){
            res.json()
                .then(function ({ enemigos }) {
                    //console.log(enemigos);
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null 
                        if (enemigo.mokepon != undefined) {
                            const mokeponNombre = enemigo.mokepon.nombre ||""
                            if (mokeponNombre === 'Hipodoge'){
                                mokeponEnemigo = new Mokepon ('Hipodoge' , './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                            } else if (mokeponNombre === 'Capipepo'){
                                mokeponEnemigo = new Mokepon ('Capipepo' , './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                            } else if (mokeponNombre === 'Ratigueya'){
                                mokeponEnemigo = new Mokepon ('Ratigueya' , './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                            } else if (mokeponNombre === 'Langostelvis'){
                                mokeponEnemigo = new Mokepon ('Langostelvis' , './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/langostelvis.png', enemigo.id)
                            } else if (mokeponNombre === 'Pydos'){
                                mokeponEnemigo = new Mokepon ('Pydos' , './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/pydos.png', enemigo.id)
                            } else if (mokeponNombre === 'Tucapalma'){
                                mokeponEnemigo = new Mokepon ('Tucapalma' , './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/tucapalma.png', enemigo.id)
                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                            //mokeponEnemigo.pintarMokepon()
                        }
                    })             
                })
        }
    })

}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0 
}

function sePresionoUnaTecla (event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        default:
            break;
    }
}

function inciarMapa (){

    mascotaJugadorObjeto = obtenerObjetoMascota()

    intervalo = setInterval(pintarCanva, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i =0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return 
    }
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionVerMapa.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    seleccionarMascotaEnemigo(enemigo)

    //alert('Hay colisión con ' + enemigo.nombre)
    
}
window.addEventListener('load', iniciarJuego)

//``