import { useTheme } from "@mui/material"
import { tokens } from "../theme"
import React, { useState, useRef, useEffect } from "react";
//import bot from "../assets/bot.svg";
import user from "../assets/user.svg";
import bot from "../assets/favicon.ico"

const AIPrompt = ({ isDashboard = false }, props) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [chatMessages, setChatMessages] = useState([]);
    
    let loadInterval

    //Function to simulate the loading dots
    function loader(element) {
        element.textContent = '';

        loadInterval = setInterval(() => {
            element.textContent += '.';

            if (element.textContent === '....') {
                element.textContent = '';
            }
        }, 300);

        return loadInterval
    }

    //Function to handle the API to GPT
    const handleSubmit = async (e) => {
        //Default browser behavior when form is submitted is to reload the page -> undesirable behavior
        e.preventDefault();
        const data = new FormData(e.target);
        
        //Generate user's chat stripe
        const chatContainer = document.querySelector('#chat_container');
        const chatMessage = chatStripe(false, data.get('prompt'));
        setChatMessages([...chatMessages, chatMessage]);
        chatContainer.innerHTML += chatMessage
        e.target.reset();

        //Generate AI's chat stripe
        const uniqueId = generateUniqueId();
        const aiChatMessage = chatStripe(true, ' ', uniqueId);
        setChatMessages([...chatMessages, aiChatMessage])
        chatContainer.innerHTML += aiChatMessage
        //Automatically scroll down when new message is generated
        chatContainer.scrollTop = chatContainer.scrollHeight;

        const messageDiv = document.getElementById(uniqueId);
        loader(messageDiv);

        //Fetch data from server (bot's response)
        //'https://davinci-chatbot.onrender.com' -> link where my bot from tutorial is deployed
        const response = await fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: data.get('prompt'),
            }),
        })

        //To get rid of the the loading dots
        clearInterval(loadInterval);
        messageDiv.innerHTML = ''

        if (response.ok) {
            //Get the Open AI response
            const responseData = await response.json()
            //Parse date
            const parsedData = responseData.bot.trim()

            //Call the typeText function to type out response letter per letter
            typeText(messageDiv, parsedData)
        } 
        else {
            //If an error has occured, and there is no valid json response -> display the error
            const err = await response.text()
            messageDiv.innerHTML = 'Something went wrong.'
            alert(err)
        }
    }

    
    //Function to simulate typing (letter per letter)
    function typeText(element, text) {
        let index = 0;

        let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } 
        else {
            clearInterval(interval);
        }
        }, 20);
    }

    function generateUniqueId() {
        const timestamp = Date.now();
        const randomNumber = Math.random();
        const hexadecimalString = randomNumber.toString(16);

        return `id-${timestamp}-${hexadecimalString}`;
    }

    //Function to style the chat app -> in lines of different color
    function chatStripe(isAi, value, uniqueId) {
        //Return a template string that can be styled
        return (
            `
            <div className={"wrapper ${isAi ? 'ai' : ''}"}>
                <div className="chat">
                    <div className="profile">
                        <img src="${isAi ? bot : user}" alt="Profile icon" />
                    </div>
                    <div className="message" id=${uniqueId}>
                        ${value}
                    </div>
                </div>
            </div>
            `
        );
    }

    return (
        <div id="app" class="max-h-screen p-4">
            <div class="bg-white shadow-lg rounded-lg">
                <div class="bg-gray-200 px-4 py-2 rounded-t-lg">
                    <div class="bg-gray-200 px-4 py-2 rounded-b-lg">
                    <form onSubmit={handleSubmit} class="flex items-center">
                        <textarea name="prompt" class="w-full resize-none border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 py-2 px-4" rows="1" placeholder="Ask the AI..."></textarea>
                        <button type="submit" class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
                    </form>
                </div>
                </div>
                <div id="chat_container" class="p-4 max-h-60vh overflow-y-auto"></div>
                
            </div>
        </div>
    )   
}

export default AIPrompt