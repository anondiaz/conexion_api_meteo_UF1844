// Función para convertir region (ES) a Locale (es-ES)
function localeFromRegion(region) {
    // creamos un locale con idioma 'und' (undefined)
    const loc = new Intl.Locale(`und-${region.toUpperCase()}`);
    // maximize añade el idioma probable según CLDR
    return loc.maximize().toString();
  }

// Función para obtener la fecha en formato locale (27/04/2025), utilizando la función anterior como conversor a locale
function secsAFechaLocal(secs, locale, opts = {}) {
// 1) Si solo es un código de región (2 letras), creamos el tag clean
let tag;
if (/^[A-Za-z]{2}$/.test(locale)) {
    const loc = new Intl.Locale(`und-${locale.toUpperCase()}`).maximize();
    tag = `${loc.language}-${loc.region}`;
} else {
    // 2) Si ya viene como "es-ES" o similar, nos aseguramos de eliminar subtags extra
    const parts = locale.split(/[-_]/);
    tag = `${parts[0].toLowerCase()}-${parts[1].toUpperCase()}`;
}

// 3) Creamos el Date; JS aplica tu zona local automáticamente
const date = new Date(secs * 1000);

// 4) Formateamos con el tag limpio y las opciones
return date.toLocaleString(tag, {
    year:   "numeric",
    month:  "2-digit",
    day:    "2-digit",
    hour:   "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    ...opts
});
}

// Función para convertir los m/s en km/h
function msToKmh(ms) {
    return ms * 3.6;
}

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
        const temp = `${data['main']['temp']}`.slice(0,2)
        const feels_like = `${data['main']['feels_like']}`.slice(0,2)
        const temp_min = `${data['main']['temp_min']}`.slice(0,2)
        const temp_max = `${data['main']['temp_max']}`.slice(0,2)
        const humidity = `${data['main']['humidity']}`
        const speed = `${data['wind']['speed']}`
        const speedKmh = msToKmh(speed).toString().slice(0,2)
        const UTC = `${data['timezone']}`
        const totalMin = UTC / 60              // minutos de offset
        const h = Math.floor(Math.abs(totalMin) / 60)
        const m = Math.abs(totalMin) % 60
        const hh = String(h).padStart(2, '0')
        const mm = String(m).padStart(2, '0')
        const sign = totalMin >= 0 ? '+ ' : '- '
        const horaLocal = `${sign}${hh}:${mm}`
        const fecha = `${data['dt']}`
        const horaCity = new Date((parseInt(fecha) + parseInt(UTC)) * 1000).toISOString().toString().slice(11,19)
        const fechaCity = secsAFechaLocal(parseInt(fecha), pais).toString().slice(0,10)
        const sunriseT = `${data['sys']['sunrise']}`
        const sunrise = new Date((parseInt(sunriseT) + parseInt(UTC)) * 1000).toISOString().toString().slice(11,19)
        const sunsetT = `${data['sys']['sunset']}`
        const sunset = new Date((parseInt(sunsetT) + parseInt(UTC)) * 1000).toISOString().toString().slice(11,19)
        
        htmlActual += `<div class="descripact"><h2 id="description">${name} (${pais}): ${description}</h2></div>`
        htmlActual += `<div class="descripact"><h3 id="description">${fechaCity} ${horaCity} (${horaLocal} h / UTC)</h3></div>`
        htmlActual += `<div class="tiempoactual">`
        htmlActual += `<div id="iconNow" class="iconact"><img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${icon}.svg" alt="${description}"></div>`
        htmlActual += `<div class="tempact">`
        htmlActual += `<p id="temp">Temperatura act.: ${temp} ºC</p>`
        htmlActual += `<p id="feels_like">Temperatura sen.: ${feels_like} ºC</p>`
        htmlActual += `<p id="temp_min">Temperatura min.: ${temp_min} ºC</p>`
        htmlActual += `<p id="temp_max">Temperatura max.: ${temp_max} ºC</p>`
        htmlActual += `</div>`
        htmlActual += `<div class="otact">`
        htmlActual += `<p id="humidity">Humedad r.: ${humidity} %</p>`
        htmlActual += `<p id="speed">Velocidad v.: ${speedKmh} Km/h</p>`
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
            const icon = `${listaPrevision[i]['weather'][0]['icon']}`
            const description = `${listaPrevision[i]['weather'][0]['description']}`
            const temp = `${listaPrevision[i]['main']['temp']}`.slice(0,2)
            const temp_min = `${listaPrevision[i]['main']['temp_min']}`.slice(0,2)
            const temp_max = `${listaPrevision[i]['main']['temp_max']}`.slice(0,2)
            const humidity = `${listaPrevision[i]['main']['humidity']}`
            const pais = `${data['city']['country']}`
            const UTC = `${data['city']['timezone']}`
            const fecha = `${listaPrevision[i]['dt']}`
            const horaCity = new Date((parseInt(fecha) + parseInt(UTC)) * 1000).toISOString().toString().slice(11,19)
            const fechaCity = secsAFechaLocal(parseInt(fecha), pais).toString().slice(0,10)
            htmlDia += `<div id="dia${i}" class="dia">`
            htmlDia += `<div id="iconPre${i}" class="iconpre"><img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${icon}.svg" alt="${description}"></div>`    
            htmlDia += `<div><p id="description${i}" class="description">${description}</p></div>`
            htmlDia += `<div class="temperatura">`
            htmlDia +=`<div class="temp_dia"><p id="temp${i}">${temp} ºC</p></div>`
            htmlDia += `<div class="temp_min_max_dia"><p id="temp_min${i}">m ${temp_min} ºC</p><p id="temp_max${i}">M ${temp_max} ºC</p><p id="humidity${i}">HR ${humidity} %</p></div>`
            htmlDia += `</div>`
            htmlDia += `<div><p id="fecha${i}">${fechaCity} ${horaCity}</p></div>`
            htmlDia += `</div>`
        }
        secPrevision.innerHTML = htmlDia
    })
    .catch(error => console.log(error))

})