//Establishing front-end WebSocket connection & declaring message datatype
const socket = new WebSocket("ws://localhost:3000");
socket.binaryType = "text";
const typed = document.getElementById("msgBox");
const chatboxDiv = document.getElementById("chatbox");

//Updating front-end with new messages
socket.onmessage = async (event) => {
    const text = typeof event.data === "string"
      ? event.data
      : await event.data.text();
  
    const msg = document.createElement("div");
    msg.textContent = text;
    chatboxDiv.appendChild(msg);
    chatboxDiv.scrollTop = chatboxDiv.scrollHeight;
  };  

//Uploading messages to the server
function uploadMsg() {
  const message = typed.value.trim();
  if (message) {
    socket.send(message);
    typed.value = "";
  }
}

//Simulating "Shoot" button press when pressing the Enter key on the keyboard
document.getElementById("msgBox").addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();    
    document.getElementById("enterKey").click();
  }
});
