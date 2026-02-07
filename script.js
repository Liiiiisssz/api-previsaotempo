const weatherMap = {
    0: "Céu limpo",
    1: "Principalmente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
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

const frasesDia = {
    sol: "O dia está ensolarado, perfeito para atividades ao ar livre.",
    parcialmenteNublado: "O sol aparece entre nuvens, clima agradável.",
    nublado: "O céu está encoberto, com poucas aberturas de sol.",
    chuva: "Há chuva ao longo do dia. Não esqueça o guarda-chuva.",
    neve: "Neve caindo durante o dia. Agasalhe-se bem.",
    tempestade: "Tempestades previstas. Evite áreas abertas."
};

const frasesNoite = {
    sol: "Noite com céu limpo e estrelado.",
    parcialmenteNublado: "Algumas nuvens cobrem o céu nesta noite.",
    nublado: "Noite nublada, sem visibilidade das estrelas.",
    chuva: "Chuva durante a noite. Ruído de pancadas no telhado.",
    neve: "Neve caindo silenciosamente nesta noite fria.",
    tempestade: "Tempestades noturnas com raios e trovões."
};

let iconeTempo;
let frase; 

const diasSemana = [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
    "Quinta-feira", "Sexta-feira", "Sábado"
];

const input = document.getElementById("cidade");
input.addEventListener('keyup', function(event){
    if(event.key === "Enter"){
        buscarClima();
        input.blur();
    }
});

async function buscarClima(){
    const cidade = document.getElementById("cidade").value;
    
    if(!cidade) return;

    const data = new Date();
    const nomeDia = diasSemana[data.getDay()]
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = data.toLocaleString('pt-BR', {month: 'long'});

    try{
        document.getElementById("data").innerHTML = `${nomeDia}, ${dia} de ${mes.charAt(0).toLocaleUpperCase() + mes.slice(1)}`

        const geoResp = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&language=pt`
        );
        const geoData = await geoResp.json();

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const cidadeOficial = geoData.results[0].name;

        const climaResp = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`
        )
        const climaData = await climaResp.json();
        console.log(climaData)
        const hora = climaData.current_weather.is_day;
        const temp = climaData.current_weather.temperature;
        const vento = climaData.current_weather.windspeed;
        const umidade = climaData.hourly.relative_humidity_2m[0];
        const codTempo = climaData.current_weather.weathercode;

        switch(codTempo){
            case 0: case 1:
                iconeTempo = hora ? "assets/sol-grande.png" : "assets/lua.png";
                frase = hora ? frasesDia.sol : frasesNoite.sol;
                break;
            case 2:
                iconeTempo = hora ? "assets/dia-nublado-grande.png" : "assets/noite-nublada.png";
                frase = hora ? frasesDia.parcialmenteNublado : frasesNoite.parcialmenteNublado;
                break;
            case 3: case 45: case 48:
                iconeTempo = "assets/nublado.png";
                frase = hora ? frasesDia.nublado : frasesNoite.nublado;
                break;
            case 51: case 53: case 55: case 56: case 57: case 61: case 63:
            case 65: case 66: case 67: case 80: case 81: case 82: 
                iconeTempo = "assets/chuva-grande.png";
                frase = hora ? frasesDia.chuva : frasesNoite.chuva;
                break;
            case 71: case 73: case 75: case 77: case 85: case 86:
                iconeTempo = "assets/neve-grande.png";
                frase = hora ? frasesDia.neve : frasesNoite.neve;
                break;
            case 95: case 96: case 99:
                iconeTempo = "assets/tempestade-grande.png";
                frase = hora ? frasesDia.tempestade : frasesNoite.tempestade;
        }

        document.getElementById("nome-cidade").innerHTML = cidadeOficial;
        document.getElementById("temperatura").innerHTML = `${temp}°C`;
        document.getElementById("velocidade-vento").innerHTML = `${vento} km/h`;
        document.getElementById("umidade").innerHTML = `${umidade}%`;
        document.getElementById("tempo").innerHTML = weatherMap[codTempo];
        document.getElementById("icone-temp").src = iconeTempo;
        document.getElementById("frase").innerHTML = frase;

    } catch(erro){
        document.getElementById("resultado").innerText = 
            "Cidade não encontrada";
    }
}