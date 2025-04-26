const meteoForm = document.forms['meteoForm']

meteoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let city = meteoForm['city'].value.trim()

    const units = 'metric'
    let lang = meteoForm['lang'].value
    const appid = ""

    const URLweather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${appid}`
    const URLforecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&lang=${lang}&appid=${appid}`
    

    console.log(URLweather)
    console.log(URLforecast)

    const secActual = document.getElementById ('actual')
    const secPrevision = document.getElementById ('prevision')

    secActual.innerHTML = ""
    secPrevision.innerHTML = ""

    fetch(URLweather)
    .then(data => data.json())
    .then(data => {
        htmlActual = secActual.innerHTML
        const icon = `${data['weather'][0]['icon']}`
        const name = `${data['name']}`
        const pais = `${data['sys']['country']}`
        const description = `${data['weather'][0]['description']}`
        const temp = `${data['main']['temp']}`
        const feels_like = `${data['main']['feels_like']}`
        const temp_min = `${data['main']['temp_min']}`
        const temp_max = `${data['main']['temp_max']}`
        const humidity = `${data['main']['humidity']}`
        const speed = `${data['wind']['speed']}`
        const sunrise = `${data['sys']['sunrise']}`
        const sunset = `${data['sys']['sunset']}`
        
        htmlActual += `<div class="descripact"><h2 id="description">${name} (${pais}): ${description}</h2></div>`
        htmlActual += `<div class="tiempoactual">`
        htmlActual += `<div id="iconNow" class="iconact"><img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${icon}.svg" alt="${description}"></div>`
        htmlActual += `<div class="tempact">`
        htmlActual += `<p id="temp">Temperatura act.: ${temp}</p>`
        htmlActual += `<p id="feels_like">Temperatura sen.: ${feels_like}</p>`
        htmlActual += `<p id="temp_min">Temperatura max.: ${temp_min}</p>`
        htmlActual += `<p id="temp_max">Temperatura min.: ${temp_max}</p>`
        htmlActual += `</div>`
        htmlActual += `<div class="otact">`
        htmlActual += `<p id="humidity">Humedad r.: ${humidity}</p>`
        htmlActual += `<p id="speed">Velocidad v.:${speed}</p>`
        htmlActual += `<p id="sunrise">Salida del sol: ${sunrise}</p>`
        htmlActual += `<p id="sunset">Puesta del sol: ${sunset}</p>`
        htmlActual += `</div>`
        htmlActual += `</div>`
        secActual.innerHTML = htmlActual

    })
    .catch(error => console.log(error))

    fetch(URLforecast)
    .then(data => data.json())
    .then(data => {
        htmlDia = secPrevision.innerHTML
        let listaPrevision = data['list']
        for (i = 0; i < listaPrevision.length; i = i+1) {
            let icon = `${listaPrevision[i]['weather'][0]['icon']}`
            let description = `${listaPrevision[i]['weather'][0]['description']}`
            let temp = `${listaPrevision[i]['main']['temp']}`
            let temp_min = `${listaPrevision[i]['main']['temp_min']}`
            let temp_max = `${listaPrevision[i]['main']['temp_max']}`
            let humidity = `${listaPrevision[i]['main']['humidity']}`
            let fecha = `${listaPrevision[i]['dt_txt']}`
            htmlDia += `<div id="dia${i}" class="dia">`
            htmlDia += `<div id="iconPre${i}" class="iconpre"><img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${icon}.svg" alt="${description}"></div>`    
            htmlDia += `<div><p id="description${i}" class="description">${description}</p></div>`
            htmlDia += `<div class="temperatura">`
            htmlDia +=`<div class="temp_dia"><p id="temp${i}">${temp} ºC</p></div>`
            htmlDia += `<div class="temp_min_max_dia"><p id="temp_min${i}">${temp_min} ºC</p><p id="temp_max${i}">${temp_max} ºC</p><p id="humidity${i}">${humidity} %</p></div>`
            htmlDia += `</div>`
            htmlDia += `<div><p id="fecha${i}">${fecha}</p></div>`
            htmlDia += `</div>`
        }
        secPrevision.innerHTML = htmlDia
    })
    .catch(error => console.log(error))

})