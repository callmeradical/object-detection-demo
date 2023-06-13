let video, canvas, context, model, db;
let isCollecting = false;

function initDB() {
  let request = indexedDB.open("ObjectDetectionDB", 1);
  request.onerror = function (event) {
    console.error("Error opening database:", error);
  };
  request.onupgradeneeded = function (event) {
    db = event.target.result;
    let objectStore = db.createObjectStore("images", { autoIncrement: true });
  };
  request.onsuccess = function (event) {
    db = event.target.result;
  };
}
let dbPromise = new Promise(function (resolve, reject) {
  var request = indexedDB.open("ObjectDetectionDB", 1);

  request.onerror = function (event) {
    console.error("Error opening database:", event.target.error);
    reject(event.target.error);
  };

  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("images", { autoIncrement: true });
  };

  request.onsuccess = function (event) {
    var db = event.target.result;
    resolve(db);
  };
});

async function startObjectDetection() {
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  model = await cocoSsd.load();

  // Initialize IndexedDB
  initDB();
  // Fix for iOS Safari from https://leemartin.dev/hello-webrtc-on-safari-11-e8bcb5335295
  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
        video.onloadedmetadata = function () {
          video.play();
          detectObjects();
        };
      })
      .catch(function (error) {
        console.error("Error accessing camera:", error);
      });
  } else {
    console.error("getUserMedia not supported");
  }
}

let selectedObjectType = "all";

function updateSelectedObjectType() {
  const selectElement = document.getElementById("object-type");
  selectedObjectType = selectElement.value;
}

async function detectObjects() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const predictions = await model.detect(video);

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;

    context.beginPath();
    context.rect(x, y, width, height);
    context.lineWidth = 2;
    context.strokeStyle = "red";
    context.fillStyle = "red";
    context.stroke();

    const label = `${prediction.class} (${Math.round(
      prediction.score * 100
    )}%)`;
    context.fillText(label, x, y > 10 ? y - 5 : 10);

    if (isCollecting && isObjectTypeMatch(prediction.class)) {
      // Draw image on another canvas and get its data URL
      let imageCanvas = document.createElement("canvas");
      imageCanvas.width = width;
      imageCanvas.height = height;
      let imageContext = imageCanvas.getContext("2d");
      imageContext.drawImage(video, x, y, width, height, 0, 0, width, height);
      let imageDataUrl = imageCanvas.toDataURL("image/jpeg");

      // Save image data URL in IndexedDB
      let transaction = db.transaction(["images"], "readwrite");
      let objectStore = transaction.objectStore("images");
      let request = objectStore.add(imageDataUrl);
      request.onsuccess = function (event) {
        console.log("Image saved");
      };
      request.onerror = function (event) {
        console.log("Error saving image");
      };
    }
  });

  requestAnimationFrame(detectObjects);
}

function isObjectTypeMatch(className) {
  if (selectedObjectType === "all") {
    return true; // Collect all objects
  } else {
    return className === selectedObjectType;
  }
}

function startCollecting() {
  isCollecting = true;
  document.getElementById("start-collecting").disabled = true;
  document.getElementById("stop-collecting").disabled = false;
}

function stopCollecting() {
  isCollecting = false;
  document.getElementById("start-collecting").disabled = false;
  document.getElementById("stop-collecting").disabled = true;
}

let currentPage = 0;
const imagesPerPage = 9;

function showStoredImages() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Get the div to display images
  var storedImagesDiv = document.getElementById("stored-images");

  // First, clear out any existing images
  storedImagesDiv.innerHTML = "";

  // Load images from IndexedDB and display them based on the current page
  dbPromise.then(function (db) {
    var tx = db.transaction("images", "readonly");
    var store = tx.objectStore("images");

    // Retrieve the total count of images in the object store
    var countRequest = store.count();
    countRequest.onsuccess = function (event) {
      var count = event.target.result;
      const totalImages = count;
      const totalPages = Math.ceil(totalImages / imagesPerPage);

      // Calculate the start and end indices of images to display based on the current page
      const start = currentPage * imagesPerPage;
      const end = start + imagesPerPage;

      // Open a new transaction to retrieve the images for the current page
      // Open a new transaction to retrieve the images for the current page
      var tx = db.transaction("images", "readonly");
      var imageStore = tx.objectStore("images");
      var imageRequest = imageStore.getAll();

      imageRequest.onsuccess = function (event) {
        var items = event.target.result;
        const imagesToShow = items.slice(start, end);

        // Create an img element for each image in the current page and add it to the storedImagesDiv
        // Create a container to hold the images
        var imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        // Create an img element for each image in the current page and add it to the image container
        imagesToShow.forEach(function (item) {
          var img = document.createElement("img");
          img.src = item;
          img.classList.add("image-item");
          imageContainer.appendChild(img);
        });

        // Add the image container to the storedImagesDiv
        storedImagesDiv.appendChild(imageContainer);

        // Enable or disable pagination buttons based on the current page
        var prevBtn = document.getElementById("prev-btn");
        var nextBtn = document.getElementById("next-btn");
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;

        // Once all images are added, open the modal
        modal.style.display = "block";
      };
    };
  });
}

function goToPage(page) {
  currentPage = page;
  showStoredImages();
}

function nextPage() {
  dbPromise.then(function (db) {
    var tx = db.transaction("images", "readonly");
    var store = tx.objectStore("images");
    var countRequest = store.count();
    countRequest.onsuccess = function (event) {
      var count = event.target.result;
      const totalImages = count;
      const totalPages = Math.ceil(totalImages / imagesPerPage);
      if (currentPage < totalPages - 1) {
        currentPage++;
        showStoredImages();
      }
    };
  });
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    showStoredImages();
  }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

window.addEventListener("load", startObjectDetection);
