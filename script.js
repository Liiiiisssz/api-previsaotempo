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
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`
        )
        const climaData = await climaResp.json();

        const temp = climaData.current_weather.temperature;
        const vento = climaData.current_weather.windspeed;
        const umidade = climaData.hourly.relative_humidity_2m[0];

        document.getElementById("temperatura").innerHTML = temp;
        document.getElementById("velocidade-vento").innerHTML = `${vento} km/h`;
        document.getElementById("umidade").innerHTML = `${umidade}%`;

    } catch(erro){
        document.getElementById("resultado").innerText = 
            "Cidade não encontrada";
    }
}