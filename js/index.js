var canvas;
var ctx;
var imgPersonaje1;
var personajeUno= new Personaje(100,300);
var obstaculo=new Obstaculo(850,300);
var vidas=3;
var puntos=0;
var posicionFondo=0;
var posicionFondoDos=20;
var timer=0;
var flechasCola = [];
var arreglo = [];
var flechasAzar;
var traductor;
var aum = 4;
var animacion = 0;
var animacionDos = 0;
var animacionObstaculo=0;

// Estas dos variables determinan la
// velocidad inicial del nivel y el índice
// de aumento de esa velocidad.

var velocidadInicial=4000;
var velocidadAumento=0.95;
var valocidadRayo=10;
var velocidadFondo=10;
var velocidadObstaculo=10;
var velocidadCuerpo=1.65;

// -----------------------------------------------------------------------

// FUNCIONES DE EJECUCIÓN

// -----------------------------------------------------------------------

function dibujar(){

	/* document.getElementById('canvas').style.display='block';
	document.getElementById('play').style.display="none";
	document.getElementById('options').style.display="none";
 */

	//selecciono el canvas
	canvas=document.getElementById("canvas");
	//defino el contexto
	ctx=canvas.getContext("2d");

	imgPersonaje1=new Image();
	imgPersonaje1.src="img/character-lit.png";

	imgPersonaje2=new Image();
	imgPersonaje2.src="img/character-lit2.png";

	imgPersonaje3=new Image();
	imgPersonaje3.src="img/character-lit3.png";

	imgPersonajeSalto=new Image();
	imgPersonajeSalto.src="img/character-salto.png";

	flechaIzq=new Image();
	flechaIzq.src="img/left.png";

	flechaDer=new Image();
	flechaDer.src="img/right.png";

	flechaArriba=new Image();
	flechaArriba.src="img/up.png";

	flechaAbajo=new Image();
	flechaAbajo.src="img/down.png";

	correcto=new Image();
	correcto.src="img/correcto.png";

	incorrecto=new Image();
	incorrecto.src="img/incorrecto.png";

	corazon=new Image();
	corazon.src="img/heart.png";

	rayo=new Image();
	rayo.src="img/rayo.png";

	bruja=new Image();
	bruja.src="img/bruja.png";

	cuervo=new Image();
	cuervo.src="img/cuervo.png";

	carnivora=new Image();
	carnivora.src="img/carnivora.png";

	explosion=new Image();
	explosion.src="img/explosion.png";

	fondo=new Image();
	fondo.src="img/portadajuego.png"

	play=new Image();
	play.src="img/play.png";

	options=new Image();
	options.src="img/options.png";

	quit=new Image();
	quit.src="img/quit.png";

	audioMenu=new Audio();
	audioMenu.src="music/lobbymusic2.mp3";

	audioSalto=new Audio();
	audioSalto.src="music/salto.mp3";

	audioEsfuerzo=new Audio();
	audioEsfuerzo.src="music/esfuerzo.mp3";

	audioCuervo=new Audio();
	audioCuervo.src="music/cuervo2.mp3";

	audioDamage=new Audio();
	audioDamage.src="music/damage2.mp3";

	audioBruja=new Audio();
	audioBruja.src="music/cackle2.mp3";

	audioElectricidad=new Audio();
	audioElectricidad.src="music/electricidad2.mp3";

	audioTecla=new Audio();
	audioTecla.src="music/tecla.mp3";

	document.getElementById("canvas").style.backgroundImage="url(img/portadajuego.png)";
	dibujaPlay1();
	

	document.addEventListener('mousemove',handleEvent);

	document.addEventListener('click', (e) =>{
		if(e.x>339&&
			e.x<436&&
			e.y>235&&
			e.y<263){
				document.removeEventListener('mousemove', handleEvent);
				document.getElementById("canvas").style.backgroundImage="";
				borrar();
				enSusMarcas();
			}
	})
}

function enSusMarcas(){
	preparados=setInterval(() => {

		timer++;

		switch(timer){
			case 1:
				borrar();
				textoInicial("¡Imita la secuencia de flechas!");
			break;
			case 2:
				borrar();
				textoInicial("¡Corre lo mas lejos que puedas!");
			break;
			case 3:
				borrar();
				textoInicialTres("¡Que no escape la bruja!");
			break;
			case 4:
				borrar();
				document.getElementById("canvas").style.backgroundImage="url(img/back.jpg)";
				document.getElementById('marcas').style.display="none";

				audioMenu.play();
				audioMenu.volume=0.2;
				dibujaTexto();
				dibujaTexto2();
				dibujarFondo();
				dibujaVida();
				dibujaBruja();

				personajeUno.dibujaPersonaje();

				//Imprime flechas en un orden aleatorio en la pantalla.
				//Aprovecho el contador del for para pasarlo como parámetro
				//y ordenar las flechas de la pantalla.

				espacio=setTimeout(() => {
					for(var i = 1; i < 5; i++){
						var flechasAzar = Math.floor(Math.random()*4);
						
						if (flechasAzar == 0){
							flechasCola.push(38);
						} else if(flechasAzar == 1){
							flechasCola.push(40);
						} else if (flechasAzar == 2){
							flechasCola.push(37);
						} else if (flechasAzar == 3){
							flechasCola.push(39);
						}
						
						renderFlechas(flechasAzar, i);
					}
				}, 1000);

				// Aparece el primer obstáculo

				obstaculo.movimiento();
				
				// Termina ejecutando la funcion evaluacion.

				document.addEventListener('keydown', (e) => {
					switch(e.keyCode){
						case 27:
							window.location.reload();
						break;
						case 37:
							arreglo.push(37);
							audioTecla.play();
							audioTecla.volume=0.5;
						break;
						case 38:
							arreglo.push(38);
							audioTecla.play();
							audioTecla.volume=0.5;
						break;
						case 39: 
							arreglo.push(39);
							audioTecla.play();
							audioTecla.volume=0.5;
						break;
						case 40:
							arreglo.push(40);
							audioTecla.play();
							audioTecla.volume=0.5;
						break;
					}
				})

				evaluacion();

				clearInterval(preparados);
			break;
		}
	}, 1000);
}

// -----------------------------------------------------------------------

// OBJETOS

// -----------------------------------------------------------------------

function Personaje(x,y){
	this.x=x;
	this.y=y;
	//metodos
	this.arriba=function(){
		this.y-=10;
	}
	this.abajo=function(){
		this.y+=10;
	}
	this.dibujaPersonaje=function(){
		loop=setInterval(() => {

			switch(animacion){
				case 0:
					ctx.clearRect(this.x, this.y, 30, 51);
					ctx.drawImage(imgPersonaje1,this.x,this.y);
					animacion++
				break;
				case 1:
					ctx.clearRect(this.x, this.y, 30, 51);
					ctx.drawImage(imgPersonaje2,this.x,this.y);
					animacion++
				break;
				case 2:
					ctx.clearRect(this.x, this.y, 30, 51);
					ctx.drawImage(imgPersonaje3,this.x,this.y);
					animacion = 0;
				break;
			}
		}, 100);
	}
	this.saltar=function(){

		ctx.clearRect(this.x, this.y, 30, 51);
		
		loopSaltar=setInterval(() => {

			//Usamos Switch porque el if no funcionaba.

			switch(animacionDos){
				case 0:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y-=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 1:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y-=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 2:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y-=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 3:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y-=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 4:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y-=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 5:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y+=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 6:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y+=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 7:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y+=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 8:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y+=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 9:
					ctx.clearRect(this.x, this.y, 30, 51);
					this.y+=30;
					ctx.drawImage(imgPersonajeSalto,this.x,this.y);
					animacionDos++;
				break;
				case 10:
					clearInterval(loopSaltar);
					animacionDos=0;
					personajeUno.dibujaPersonaje();
			}
		}, 100);

	}
}

function Obstaculo(x,y){
	this.x=x;
	this.y=y;
		
	this.movimiento=function(){

		var obstaculoRandom=Math.floor(Math.random()*3);

		obstaculoAnim=setInterval(() => {
			ctx.clearRect(this.x, this.y, 100, 61);
			this.x-=velocidadCuerpo;

			switch(obstaculoRandom){
				case 0:
					ctx.drawImage(rayo,this.x,this.y, 50,30);
					audioElectricidad.play();
					audioElectricidad.volume=0.2;
				break;
				case 1:
					ctx.drawImage(cuervo,this.x,this.y);
					audioCuervo.play();
					audioCuervo.volume=0.1;
				break;
				case 2:
					ctx.drawImage(carnivora,this.x,this.y);
				break;
				default:
					ctx.drawImage(rayo,this.x,this.y,50,30);
				break;
			}

			if (this.x==-10){
				clearInterval(obstaculoAnim);
				ctx.clearRect(this.x, this.y, 100, 61);
			}
		}, velocidadObstaculo);
	}
}

// -----------------------------------------------------------------------

// FUNCIONES VISUALES

// -----------------------------------------------------------------------

function borrar(){
	canvas.width=800;
	canvas.heigth=414;
}
function dibujaTexto(){
	
	ctx.font="20px Impact";
	ctx.fillStyle="#FFFFFF";
	ctx.fillText(vidas,50,50);
}
function dibujaTexto2(){

	ctx.font="20px Impact";
	ctx.fillStyle="#FFFFFF";
	ctx.fillText(puntos,50,75);
}

function textoInicial(oracion){

	ctx.font="50px Impact";
	ctx.fillStyle="#000000";
	ctx.fillText(oracion,50,208);
}

function textoInicialDos(oracion){

	ctx.font="50px Impact";
	ctx.fillStyle="#000000";
	ctx.fillText(oracion,50,208);
}

function textoInicialTres(oracion){
	ctx.font="50px Impact";
	ctx.fillStyle="#000000";
	ctx.fillText(oracion,100,208);
}

function dibujaTextoEscape(){

	ctx.font="20px Impact";
	ctx.fillStyle="#FFFFFF";
	ctx.fillText("'ESC' para reiniciar",50,50);
}

function dibujaTextoPerdiste(){

	ctx.font="80px Impact";
	ctx.fillStyle="#FFFFFF";
	ctx.fillText("¡LA BRUJA ESCAPÓ!",100,208);
}

function dibujaVida(){
	if(vidas==3){
		ctx.drawImage(corazon, 110, 32, 20, 20);
		ctx.drawImage(corazon, 90, 32, 20, 20);
		ctx.drawImage(corazon, 70, 32, 20, 20);
	} else if(vidas==2){
		ctx.drawImage(corazon, 90, 32, 20, 20);
		ctx.drawImage(corazon, 70, 32, 20, 20);
	}else if(vidas==1){
		ctx.drawImage(corazon, 70, 32, 20, 20);
	}
}

function dibujaBruja(){
	ctx.drawImage(bruja, 700, 105, 70, 109);
}

function dibujaPlay1(){
	ctx.font="20px Impact";
	ctx.fillStyle="#FFFFFF";
	ctx.fillText("Play",370,257);
}

function dibujaPlay2(){
	ctx.font="20px Impact";
	ctx.fillStyle="#4c2882";
	ctx.fillText("Play",370,257);
}

// -----------------------------------------------------------------------

// FUNCIONES DE MECANISMOS

// -----------------------------------------------------------------------

// Devuelve un número aleatorio.

function flechasRandom(){
    var flechasAzar = Math.floor(Math.random()*4);
    return flechasAzar;
}

// Otorga una imagen en pantalla a las flechas a presionar.

function renderFlechas(flecha, lugar){
	switch(flecha){
		case 0:
			ctx.drawImage(flechaArriba, lugar * 140, 100, 100, 100);
		break;
		case 1:
			ctx.drawImage(flechaAbajo, lugar * 140, 100, 100, 100);
		break;
		case 2:
			ctx.drawImage(flechaIzq, lugar * 140, 100, 100, 100);
		break;
		case 3:
			ctx.drawImage(flechaDer, lugar * 140, 100, 100, 100);
		break;
	}
}

function dibujarFondo(){
	tiempoFondo=setInterval(() => {
		posicionFondo--;
		canvas.style.backgroundPositionX=posicionFondo+"px";
	}, velocidadFondo);
}

// Esta funcion evalua los datos ingresados por el usuario y la secuencia
// aleatoria calculada en la funcion update.

function evaluacion(){
	
	// Debería escuchar y pushear esa tecla apretada en un array Secuencia[].
	if(vidas!=0){
		
	// Debería interpretar si el array aleatorio original es igual al array de la secuencia del usuario.
	
	timeout=setTimeout(() => {
	
		if(arreglo[0] == flechasCola[0] && arreglo[1] == flechasCola[1] && arreglo[2] == flechasCola[2] && arreglo[3] == flechasCola[3]){
			ctx.drawImage(correcto, 300, 100, 200, 200);

			audioSalto.play();
			audioSalto.volume=0.2;

			clearInterval(loop);
			personajeUno.saltar();
			audioEsfuerzo.play();
			audioEsfuerzo.volume=0.2;
			
			puntos=puntos+100;

			console.log(arreglo);
			console.log(flechasCola);

			actualizar=setTimeout(() => {
				
				clearInterval(obstaculoAnim);
				vaciar();
				borrar();
				update();
				
				
			}, 2000);
			
		} else {

			ctx.drawImage(incorrecto, 300, 100, 200, 200);
			audioDamage.play();
			audioDamage.volume=1;
			audioBruja.play();
			audioBruja.volume=0.5;
			clearInterval(obstaculoAnim);
			clearInterval(loop);
			ctx.drawImage(explosion, 50, 200, 193,208);
			vidas= vidas -1;

			

			console.log(arreglo);
			console.log(flechasCola);
	
			actualizar=setTimeout(() => {
				
				clearInterval(obstaculoAnim);
				vaciar();
				borrar();
				update();
	
			}, 2000);
			
		}
	}, velocidadInicial);

	} else {
		borrar();
		dibujaTextoPerdiste();
		espera=setTimeout(() => {
			window.location.reload();
		}, 2000);
	}
	
}

// Vuelve a poner en marcha el juego con un nuevo desafio de flechas.
// Termina ejecutando la funcion evaluacion que a su vez al final vuelve a ejectuar el update.

function update(){
				dibujaTexto();
				dibujaTexto2();
				clearInterval(tiempoFondo);
				clearInterval(loop);
				dibujarFondo();
				dibujaVida();
				dibujaBruja();

				velocidadInicial=velocidadInicial*velocidadAumento;
				velocidadObstaculo=velocidadObstaculo*velocidadAumento;

				personajeUno.dibujaPersonaje();

				//Imprime flechas en un orden aleatorio en la pantalla.

				for(var i = 1; i < 5; i++){
					var flechasAzar = Math.floor(Math.random()*4);
					
					if (flechasAzar == 0){
						flechasCola.push(38);
					} else if(flechasAzar == 1){
						flechasCola.push(40);
					} else if (flechasAzar == 2){
						flechasCola.push(37);
					} else if (flechasAzar == 3){
						flechasCola.push(39);
					}
					
					renderFlechas(flechasAzar, i);
				}

				obstaculo.x=850;
				obstaculo.movimiento();
				evaluacion();
}

// Esta funcion debería vaciar el contenido de los arrays para reutilizarlos.

function vaciar(){
	arreglo = [];
	flechasCola = [];
}

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

// Function salvadora.

function handleEvent(e){
	if(e.x>339&&
		e.x<436&&
		e.y>235&&
		e.y<263){
			borrar();
			dibujaPlay2();
	} else {
		borrar();
		dibujaPlay1();
	}
}