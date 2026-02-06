const weatherMap = {
    0: "Céu limpo",
    1: "Principalmente limpo",
    2: "Parcialmente nublado",
    3: "Encoberto",
    45: "Névoa",
    48: "Névoa com geada",
    51: "Garoa leve",
    53: "Garoa moderada",
    55: "Garoa forte",
    56: "Garoa congelante leve",
    57: "Garoa congelante forte",
    61: "Chuva fraca",
    63: "Chuva moderada",
    65: "Chuva forte",
    66: "Chuva congelante leve",
    67: "Chuva congelante forte",
    71: "Neve fraca",
    73: "Neve moderada",
    75: "Neve forte",
    77: "Grãos de neve",
    80: "Pancadas de chuva fraca",
    81: "Pancadas de chuva moderada",
    82: "Pancadas de chuva forte",
    85: "Pancadas de neve fraca",
    86: "Pancadas de neve forte",
    95: "Tempestade",
    96: "Tempestade com granizo leve",
    99: "Tempestade com granizo forte"
  };

  const diasSemana = [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
    "Quinta-feira", "Sexta-feira", "Sábado"
  ];

async function buscarClima(){
    const cidade = document.getElementById("cidade").value;
    
    if(!cidade) return;

    const data = new Date();
    const nomeDia = diasSemana[data.getDay()]
    const dia = String(data.getDay()).padStart(2, "0");
    const mes = data.toLocaleString('pt-BR', {month: 'long'});

    try{
        document.getElementById("data").innerHTML = `${nomeDia}, ${dia} de ${mes.charAt(0).toLocaleUpperCase() + mes.slice(1)}`

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
        console.log(climaData)
        const temp = climaData.current_weather.temperature;
        const vento = climaData.current_weather.windspeed;
        const umidade = climaData.hourly.relative_humidity_2m[0];
        const codTempo = climaData.current_weather.weathercode;

        document.getElementById("temperatura").innerHTML = `${temp}°C`;
        document.getElementById("velocidade-vento").innerHTML = `${vento} km/h`;
        document.getElementById("umidade").innerHTML = `${umidade}%`;
        document.getElementById("tempo").innerHTML = weatherMap[codTempo];

    } catch(erro){
        document.getElementById("resultado").innerText = 
            "Cidade não encontrada";
    }
}