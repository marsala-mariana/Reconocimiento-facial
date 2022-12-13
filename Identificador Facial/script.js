const elVideo = document.getElementById("video");

navigator.getMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

//primero va a cargar la promesa , una vez que esta cargado ahi activa la camara
const cargarCamara = () => {
  navigator.getMedia(
    // le estamos pasando lo que queremos
    {
      video: true,
      audio: false,
    },
    (stream) => (elVideo.srcObject = stream),
    console.error
  );
};
//Cargando Modelos:
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
]).then(cargarCamara);

elVideo.addEventListener("play", async () => {
  //creamos el canvas con los elementos de la face api
  const canvas = faceapi.createCanvasFromMedia(elVideo);
  //los añadimos al body
  document.body.append(canvas);

  //tamaño del canvas
  const displaySize = { width: elVideo.width, height: elVideo.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    //hacer las detecciones de la cara.
    const detections = await faceapi
      .detectAllFaces(elVideo)
      .withFaceLandmarks() //las marcas
      .withFaceExpressions() //las expresiones
      .withAgeAndGender() //la edad
      .withFaceDescriptors(); //el descriptor
    //poner las detencion en su sitio
    const resezedDetections = faceapi.resizeResults(detections, displaySize);
    //limpiar canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    //dibujar lineas y representarlo encima del video

    faceapi.draw.drawDetections(canvas, resezedDetections),
      faceapi.draw.drawFaceLandmarks(canvas, resezedDetections),
      faceapi.draw.drawFaceExpressions(canvas, resezedDetections),
      //DrawBox
      resezedDetections.forEach((detection) => {
        const box = detection.detection.box;
        new faceapi.draw.DrawBox(box, {
          label:
            Math.round(detection.age) +
            " Años " +
            detection.gender +
            " Genero ",
        }).draw(canvas);
      });
  });
});
