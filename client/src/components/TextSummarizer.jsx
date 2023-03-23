import { useTheme } from "@mui/material"
import { tokens } from "../theme"
import React, { useState, useRef, useEffect } from "react"

const TextSummarizer = ({ isDashboard = false }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    let loadInterval

    //Function to simulate the loading dots
    function loader(element) {
        element.textContent = '';

        loadInterval = setInterval(() => {
            element.textContent += '.'

            if (element.textContent === '....') {
                element.textContent = ''
            }
        }, 300)

        return loadInterval
    }

    //Function to handle the submit to back-end and response from back-end
    //Back-end server then manages the API trafic
    const handleSubmit = async (e) => {
        //Default browser behavior when form is submitted is to reload the page -> undesired
        e.preventDefault()
        const data = new FormData(e.target)
        
        const inputLink = data.get('link_to_summarize') 
        
        //Add the loading dots
        const outputDiv = document.querySelector('#output_container')
        loader(outputDiv)

        //Fetch data from back-end server
        const response = await fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: inputLink
            })
        })

        //Remove the loading dots
        clearInterval(loadInterval)
        outputDiv.innerHTML = ''

        if (response.ok) {
            //Get Open AI response
            const responseData = await response.json()
            //Parse data
            const parsedData = responseData.bot.trim()
            
            outputDiv.innerHTML = parsedData
        }
        else {
            //If an error occured, and there is no valid json response -> display the error
            const err = await response.text()
            outputDiv.innerHTML = 'Something went wrong.'
            alert(err)
        }
    }

    return (
        // <div id="app" class="h-full max-h-screen p-4">
        //     <div class="h-full bg-white shadow-lg rounded-lg">
        //         <div class="bg-gray-200 px-4 py-2 rounded-t-lg">
        //             <div class="bg-gray-200 px-4 py-2 rounded-b-lg">
        //                 <form onSubmit={handleSubmit} class="flex items-center">
        //                     <textarea name="link_to_summarize" class="w-full resize-none border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 py-2 px-4" rows="1" placeholder="Insert the article link..."></textarea>
        //                     <button type="submit" class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
        //                 </form>
        //             </div>
        //         </div>
        //         <div id="output_container" class="p-4 max-h-60vh overflow-y-auto"></div>
        //     </div>
        // </div>
        
        <div id="app" class="h-full max-h-screen p-4">
        <div class="h-full bg-white shadow-lg rounded-lg">
          <div class="bg-gray-200 px-4 py-2 rounded-t-lg">
            <div class="bg-gray-200 px-4 py-2 rounded-b-lg">
              <form onSubmit={handleSubmit} class="flex flex-col">
                    <div class="flex items-center mb-4">
                        <label class="inline-flex items-center">
                            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
                            <span class="ml-2 text-gray-700">Use bullet points</span>
                        </label>
                        <label class="inline-flex items-center ml-6">
                            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
                            <span class="ml-2 text-gray-700">Bold keywords</span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <textarea name="link_to_summarize" class="mr-2 flex-grow resize-none border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 py-2 px-4 mb-4" rows="1" placeholder="Insert the article link..."></textarea>
                        <button type="submit" class="-mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
                    </div>
              </form>
            </div>
          </div>
          <div id="output_container" class="p-4 max-h-60vh overflow-y-auto"></div>
        </div>
      </div>
    )
}

export default TextSummarizer