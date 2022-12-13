# Mini proyecto : Identificador Facial

👉Para poder levantar el proyecto usar "open in browser" o "Live Server"

//En este mini proyecto la idea principal es ver que se puede hacer un reconociemiento facial, de manera sencilla.

👉Voy a explicar como lo hice paso a paso:

👉Tambien en el 'script.js' deje comentado unas pequeñas descripciones para que se puedan guiar'

# Vamos a usar la Librería face-api.js

https://github.com/justadudewhohacks/face-api.js/

1. Vamos a descargar de la librería face-api.js la carpeta weights y el archivo face-api.min.js.
   Los colocaremos dentro de nuestro proyecto y los añadiremos al archivo, en este caso, index.html para poderlos usar.

2)Iniciamos la webcam:
Para iniciar la webcam tenemos que crear un elemento <video></video> dentro de nuestro proyecto para reproducir el vídeo que recibamos de la webcam. El elemento vídeo lo definiremos como constante para usarlo a lo largo del código.

3)Para acceder a la webcam usaremos la función de navegador Navigator.getUserMedia. El cual nos devuelve el vídeo recibido de la webcam. Lo colocaremos dentro de la función cargarCamara().

4)Antes de empezar a reproducir el contenido de la webcam y empezar con el reconocimiento facial necesitamos incluir todos los modelos que hemos copiado de la librería face-api.js. Para ello usaremos la función Promise.all() para cargarlos de forma asíncrona y cuando termine, iniciar la webcam a través de la función antes creada cargarCamara()

5)Para leer el contenido de la webcam, crearemos un addEventListener en el objeto video que hemos creado al principio (elVideo) para añadir allí el reconocimiento facial una vez empiece a reproducirse...

6)Face-api.js tiene una función que se llama createCanvasFromMedia que nos permite crear un canvas con el contenido del reconocimiento facial. Éste nos crea un canvas el cual podemos añadir al documento sin problemas...
Pero a este canvas hay que redimensionarlo al tamaño del vídeo para que encaje correctamente con el contenido de la webcam....

7)Como estamos usando un vídeo, tenemos que actualizar constantemente el contenido del reconocimiento facial. Para tal cosa, usaremos el setInterval() para que vaya actualizándolo contínuamente.
Para empezar con las detecciones de cara usaremos la función de face-api.js detectAllFaces() y le añadiremos todos los modelos que hemos cargado al principio,(que lo van a encontrar en la carpeta 'models').

8)Lo siguiente que tenemos que hacer es colocar cada una de las detecciones al sitio correcto. Usaremos la función resizeResults de face-api.js para redimensionar el resultado al tamaño correcto del contenedor (elVideo).

9)Una vez tengamos el contenido creado, ya podremos empezar a dibujarlo y representarlo encima del vídeo de la webcam. Para ello usaremos la función faceapi.draw.

10)En cada una de las detecciones tenemos su información. Así que podemos acceder a ello a través de un forEach: ...Corremos todos los resezedDetections y podemos acceder al contenido de la caja dibujada (detection.detection.box). Y añadir el label que querramos usando la función DrawBox de face-api.js.
Y el género y edad van a ser las propiedades detection.age y detection.gender. Así que a través de DrawBox vamos a añadir el label personalizado:

🤞Espero que les haya gustado!
