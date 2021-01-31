const socket = io("https://socket-servers.herokuapp.com");

const form = document.getElementById("send-container");
const messageContainer = document.querySelector(".tcontainer");
const formdiv = document.getElementById("form-div");
const fromId = document.getElementById("main-from");
const messageInput = document.getElementById("messageInp");
const room = 1234;

//image bhejne wala function
fromId.addEventListener("submit", (eve) => {
  const imgUpload = document.getElementById("output").src;
  eve.preventDefault();
  socket.emit("sendImage", imgUpload);
});
//image bhejne wala function end

//text bhejne wala start

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;

  append(`You : ${message}`, "right");

  console.log(message);

  socket.emit("sendText", message);
  messageInput.value = "";
});
//text bhejne wala start end

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

const appendImage = (base64str, position) => {
  const imageElement = new Image();
  imageElement.src = base64str;
  imageElement.width = 260;
  imageElement.height = 260;
  imageElement.classList.add(position);
  messageContainer.append(imageElement);
};

//yha pe thoda testing ho rha hai kyunki photo lene wala scene chal rha hai yha
var encoded = "hai";
var loadfile = function (event) {
  var output = document.getElementById("output");

  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
  const filess = event.target.files[0];

  var result = readFile(filess, cb);

  console.log("result: " + result);
};

function readFile(fileObj, cb) {
  const reader = new FileReader();
  reader.onloadend = (e) => {
    encoded = cb(reader.result);
  };
  reader.readAsDataURL(fileObj);
  return encoded;
}

function cb(base64string) {
  const str = base64string;
  console.log("yhsa hai " + base64string);
  output.src = str;
  return base64string;
}

//yha pe thoda testing ho rha hai

socket.on("connects", (msg) => {
  console.log(msg);

  socket.emit("room", room);
});

socket.on("receivedImage", (base64image) => {
  console.log("image received");
  console.log(base64image);
  appendImage(base64image, "left");
});

socket.on("textreceived", (text) => {
  console.log(text);
  append(`${text}`, "left");
});

socket.on("disconnected", (val) => {
  console.log(val);
});
