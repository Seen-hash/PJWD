// Establish WebSocket connection to backend
const socket = new WebSocket("ws://localhost:3000");
socket.binaryType = "text";

// DOM references
const typed = document.getElementById("msgBox");
const chatboxDiv = document.getElementById("chatbox");
const userCountDisplay = document.getElementById("userCount");
const themeToggle = document.getElementById("themeToggle");

// Prompt user for a temporary name
let username = prompt("Enter a temporary username:");
if (!username) username = "Anonymous";

// Display incoming messages
socket.onmessage = async (event) => {
  const data = JSON.parse(event.data);

  // If it's a user count update
  if (data.type === "userCount") {
    userCountDisplay.textContent = `Currently online: ${data.count}`;
  }

  // If it's a chat message
  if (data.type === "chat") {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${data.sender}:</strong> ${data.text}`;
    chatboxDiv.appendChild(msg);
    chatboxDiv.scrollTop = chatboxDiv.scrollHeight;
  }
};

// Send message to server
function uploadMsg() {
  const message = typed.value.trim();
  if (message) {
    socket.send(JSON.stringify({ text: message, sender: username }));
    typed.value = "";
  }
}

// Pressing Enter sends message
typed.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("enterKey").click();
  }
});

// Theme toggle logic
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle("light-mode");
});
