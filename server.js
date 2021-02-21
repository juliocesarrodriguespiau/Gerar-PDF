const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')
const pdf= require('html-pdf')
const app = express()

const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00",
    },   
    {
        name: "John",
        flightNumber: 7859,
        time: "18h00",
    }, 
    {
        name: "Júlio",
        flightNumber: 7859,
        time: "18h00",
    }, 
];

app.get('/pdf', async(request, response) => {

    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
    })
    // await page.goto('https://rocketseat.com.br/', {
    //     waitUntil: 'networkidle0'
    // })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'letter',
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)
})

app.get('/', (request, response) => {

    const filePath = path.join(__dirname, "print.ejs")
    ejs.renderFile(filePath, { passengers }, (err, html) => {
        if(err){
            return response.send('Erro na leitura do arquivo')
        }
        
        //enviar para o navegador
        return response.send(html)
        //return response.send("Arquivo gerado com Sucesso!")
        })
    })

app.listen(3000)

// passengers.forEach(passenger => {
//     console.log(passenger.name)
// })
