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
        const bulletPointCheckBox = data.get('checkbox_bullet_points')
        const boldKeywordCheckbox = data.get('checkbox_bold_keywords')
        let basePrompt, fullPrompt, readingTimeInMin
        

        //Hyperlink validation -> on submit
        const hyperLinkRegEx = /^(http|https):\/\/[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9#?=&\/\.-]+)*/
        if (!hyperLinkRegEx.test(inputLink)) {
            alert("Please enter a valid link.")
            return false
        }
        
        //Define base prompt
        basePrompt = `You are a professional article summarizer with 
                    a lot of experience in making high quality summaries. 
                    Provide a clear summary of the following article: `
        
        readingTimeInMin = 15
        fullPrompt = `${basePrompt}${inputLink}. The average person should be able to read the summary
                        in about ${readingTimeInMin} seconds. `
        
        fullPrompt = fullPrompt.replace(/[\n\t]/g, "").replace(/\s+/g, " ")
        
        //Check if checkboxes are checked or not and engineer the prompt accordingly
        if (bulletPointCheckBox == 'on') {
            fullPrompt = fullPrompt + "Write this summary in bullet points emphasizing the most important parts. Each bullet point characters is represented by a dash. "
        }
        if (boldKeywordCheckbox == 'on') {
            fullPrompt = fullPrompt + "Encapsulate the most important keywords in double asterisks. "
        }

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
                prompt: fullPrompt
            })
        })

        //Remove the loading dots
        clearInterval(loadInterval)
        outputDiv.innerHTML = ''

        if (response.ok) {
            //Get Open AI response
            const responseData = await response.json()
            //Parse data
            let parsedData = responseData.bot

            //Use bullet points to summarize
            if (bulletPointCheckBox == 'on') {
                parsedData = parsedData.replace(/\s-\s/g, '<br>$&')
            }

            //Make keywords bold
            if (boldKeywordCheckbox == 'on') {
                parsedData = parsedData.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            }
            
            //View the response in UI
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
                            <input name="checkbox_bullet_points" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
                            <span class="ml-2 text-gray-700">Use Bullet Points</span>
                        </label>
                        <label class="inline-flex items-center ml-6">
                            <input name="checkbox_bold_keywords" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
                            <span class="ml-2 text-gray-700">Bold Keywords</span>
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