async function buscarClima(){
    const cidade = document.getElementById("cidade").value;
    if(!cidade) return;

    try{
        const geoResp = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}`
        );
        const geoData = await geoResp.json();

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        const climaResp = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        )
        const climaData = await climaResp.json();

        const temp = climaData.current_weather.temperature;
        const vento = climaData.current_weather.windspeed;

        document.getElementById("resultado").innerHTML = 
            `${temp} graus <br> ${vento} km/h`;

    } catch(erro){
        document.getElementById("resultado").innerText = 
            "Cidade não encontrada";
    }
}