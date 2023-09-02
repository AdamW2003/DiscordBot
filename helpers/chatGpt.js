import {Configuration, OpenAiApi} from "openai"

const { chatGpt } = require("./config.json");

const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const conversationDiv = document.getElementById('conversation');

sendButton.addEventListener('click', sendMessage);

async function sendMessage(message) {
    const message = userInput.value;

    if (!message) return;

    // Clear input
    userInput.value = '';

    // Display user message in the conversation
    appendMessage('You', message);

    // Make API request
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: message }],
        }),
    });

    const data = await response.json();

    // Get AI's response
    const aiResponse = data.choices[0].message.content;

    // Display AI response in the conversation
    appendMessage('AI', aiResponse);
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${sender}: </strong>${message}`;
    conversationDiv.appendChild(messageDiv);
}
