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

    fetch(URLweather)
    .then(data => data.json())
    .then(data => {
        console.log(data['name'])
        // const name = `${data['name']}`
        // const temp = `${data['main']['temp']}`
        // const feels_like = `${data['main']['feels_like']}`
        // const temp_min = `${data['main']['temp_min']}`
        // const temp_max = `${data['main']['temp_max']}`
        // const humidity = `${data['main']['humidity']}`
        // const speed = `${data['wind']['speed']}`
        const sunrise = `${data['sys']['sunrise']}`
        const sunset = `${data['sys']['sunset']}`
        const description = `${data['weather'][0]['description']}`
        const icon = `${data['weather'][0]['icon']}`
        // document.getElementById('name').textContent = `A ${data['name']} avui tenim:`
        document.getElementById('description').textContent = `A ${data['name']} avui tenim: ${description}`
        document.getElementById('temp').textContent = `${data['main']['temp']} ºC`
        document.getElementById('feels_like').textContent = `La temperatura actual es de: ${data['main']['feels_like']} ºC`
        document.getElementById('temp_min').textContent = `${data['main']['temp_min']} ºC`
        document.getElementById('temp_max').textContent = `${data['main']['temp_max']} ºC`
        document.getElementById('humidity').textContent = `${data['main']['humidity']} %`
        document.getElementById('speed').textContent = `${data['wind']['speed']} m/s`
        document.getElementById('sunrise').textContent = `Amanece a las ${sunrise}`
        document.getElementById('sunset').textContent = `Anochece a las ${sunset}`
        document.getElementById('iconNow').innerHTML = `<img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${icon}.svg" alt="${description}">`
    })
    .catch(error => console.log(error))

    fetch(URLforecast)
    .then(data => data.json())
    .then(data => {
        console.log(data['city']['name'])
        // console.log(data['list']['weather']['description'])
        let prevision = data['list'][0]['weather']
        console.log(prevision);

        // const sunrise = `${data['sys']['sunrise']}`
        // const sunset = `${data['sys']['sunset']}`
        // const description = `${data['weather'][0]['description']}`
        // const icon = `${data['weather'][0]['icon']}`
        // // document.getElementById('name').textContent = `A ${data['name']} avui tenim:`
        // document.getElementById('description').textContent = `A ${data['name']} avui tenim: ${description}`
        // document.getElementById('temp').textContent = `${data['main']['temp']} ºC`
        // document.getElementById('feels_like').textContent = `La temperatura actual es de: ${data['main']['feels_like']} ºC`
        // document.getElementById('temp_min').textContent = `${data['main']['temp_min']} ºC`
        // document.getElementById('temp_max').textContent = `${data['main']['temp_max']} ºC`
        // document.getElementById('humidity').textContent = `${data['main']['humidity']} %`
        // document.getElementById('speed').textContent = `${data['wind']['speed']} m/s`
        // document.getElementById('sunrise').textContent = `Amanece a las ${sunrise}`
        // document.getElementById('sunset').textContent = `Anochece a las ${sunset}`
        // document.getElementById('iconNow').innerHTML = `<img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${icon}.svg" alt="${description}">`
    })
    .catch(error => console.log(error))

})