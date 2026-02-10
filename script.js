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
let iconeTempoD1;
let iconeTempoD2;
let iconeTempoD3;

const diasSemana = [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
    "Quinta-feira", "Sexta-feira", "Sábado"
];

const diasSemanaAbv = [
    "dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."
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

    const hoje = data.getDay();
    const nomeDia1 = diasSemanaAbv[(hoje + 1) % 7];
    const nomeDia2 = diasSemanaAbv[(hoje + 2) % 7];
    const nomeDia3 = diasSemanaAbv[(hoje + 3) % 7];

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = data.toLocaleString('pt-BR', {month: 'long'});

    try{
        document.getElementById("data").innerHTML = `${nomeDia}, ${dia} de ${mes.charAt(0).toLocaleUpperCase() + mes.slice(1)}`
        document.getElementById("nome-dia-um").innerHTML = nomeDia1;
        document.getElementById("nome-dia-dois").innerHTML = nomeDia2;
        document.getElementById("nome-dia-tres").innerHTML = nomeDia3;

        const geoResp = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&language=pt`
        );
        const geoData = await geoResp.json();

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const cidadeOficial = geoData.results[0].name;

        const climaResp = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=4&timezone=auto`
        )
        const climaData = await climaResp.json();
        
        const hora = climaData.current_weather.is_day;
        const temp = climaData.current_weather.temperature;
        const vento = climaData.current_weather.windspeed;
        const umidade = climaData.hourly.relative_humidity_2m[0];
        const codTempo = climaData.current_weather.weathercode;

        const codTempoD1 = climaData.daily.weathercode[1];
        const codTempoD2 = climaData.daily.weathercode[2];
        const codTempoD3 = climaData.daily.weathercode[3];

        const tempD1Max = climaData.daily.temperature_2m_max[1];
        const tempD1Min = climaData.daily.temperature_2m_min[1];
        const tempD2Max = climaData.daily.temperature_2m_max[2];
        const tempD2Min = climaData.daily.temperature_2m_min[2];
        const tempD3Max = climaData.daily.temperature_2m_max[3];
        const tempD3Min = climaData.daily.temperature_2m_min[3];

        if(!hora){
            const img = document
        }

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
                break;
        }

        switch(codTempoD1){
            case 0: case 1:
                iconeTempoD1 = "assets/sol.png";
                break;
            case 2:
                iconeTempoD1 ="assets/dia-nublado.png";
                break;
            case 3: case 45: case 48:
                iconeTempoD1 = "assets/nublado-menor.png";
                break;
            case 51: case 53: case 55: case 56: case 57: case 61: case 63:
            case 65: case 66: case 67: case 80: case 81: case 82: 
                iconeTempoD1 = "assets/chuva.png";
                break;
            case 71: case 73: case 75: case 77: case 85: case 86:
                iconeTempoD1 = "assets/neve.png";
                break;
            case 95: case 96: case 99:
                iconeTempoD1 = "assets/tempestade.png";
                break;
        }

        switch(codTempoD2){
            case 0: case 1:
                iconeTempoD2 = "assets/sol.png";
                break;
            case 2:
                iconeTempoD2 ="assets/dia-nublado.png";
                break;
            case 3: case 45: case 48:
                iconeTempoD2 = "assets/nublado-menor.png";
                break;
            case 51: case 53: case 55: case 56: case 57: case 61: case 63:
            case 65: case 66: case 67: case 80: case 81: case 82: 
                iconeTempoD2 = "assets/chuva.png";
                break;
            case 71: case 73: case 75: case 77: case 85: case 86:
                iconeTempoD2 = "assets/neve.png";
                break;
            case 95: case 96: case 99:
                iconeTempoD2 = "assets/tempestade.png";
                break;
        }

        switch(codTempoD3){
            case 0: case 1:
                iconeTempoD3 = "assets/sol.png";
                break;
            case 2:
                iconeTempoD3 ="assets/dia-nublado.png";
                break;
            case 3: case 45: case 48:
                iconeTempoD3 = "assets/nublado-menor.png";
                break;
            case 51: case 53: case 55: case 56: case 57: case 61: case 63:
            case 65: case 66: case 67: case 80: case 81: case 82: 
                iconeTempoD3 = "assets/chuva.png";
                break;
            case 71: case 73: case 75: case 77: case 85: case 86:
                iconeTempoD3 = "assets/neve.png";
                break;
            case 95: case 96: case 99:
                iconeTempoD3 = "assets/tempestade.png";
                break;
        }

        document.getElementById("nome-cidade").innerHTML = cidadeOficial;
        document.getElementById("temperatura").innerHTML = `${temp}°C`;
        document.getElementById("velocidade-vento").innerHTML = `${vento} km/h`;
        document.getElementById("umidade").innerHTML = `${umidade}%`;
        document.getElementById("tempo").innerHTML = weatherMap[codTempo];
        document.getElementById("icone-temp").src = iconeTempo;
        document.getElementById("frase").innerHTML = frase;

        document.getElementById("icone-temp-dia-um").src = iconeTempoD1;
        document.getElementById("icone-temp-dia-dois").src = iconeTempoD2;
        document.getElementById("icone-temp-dia-tres").src = iconeTempoD3;

        document.getElementById("temperatura-dia-um-max").innerHTML = `${tempD1Max}°C`
        document.getElementById("temperatura-dia-um-min").innerHTML = `${tempD1Min}°C`
        document.getElementById("temperatura-dia-dois-max").innerHTML = `${tempD2Max}°C`
        document.getElementById("temperatura-dia-dois-min").innerHTML = `${tempD2Min}°C`
        document.getElementById("temperatura-dia-tres-max").innerHTML = `${tempD3Max}°C`
        document.getElementById("temperatura-dia-tres-min").innerHTML = `${tempD3Min}°C`

    } catch(erro){
        document.getElementById("resultado").innerText = "Cidade não encontrada";
    }
}