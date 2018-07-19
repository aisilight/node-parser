// подключение модулей
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

//подключение ссылки
request('http://htmlbook.ru/', (error, response, body) => {
    //если нет ошибки и сервер возвращает код 200
    if (!error && response.statusCode === 200) {

        // загружаем тело страницы в Cheerio
        const $ = cheerio.load(body)
        const srcs = []

        // указываем класс изображений и откуда их брать
        $('.fig img', '.view-content')
            .each((idx, pic) => {
                const src = $(pic).attr('src')
                srcs.push(src)
            })


        srcs.forEach((s, i) => {
            request(s).pipe(fs.createWriteStream(`pictures/${i}.jpg`))
        })

    }
})



