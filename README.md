# 🌤️ Projeto Front-End – Site de Previsão do Tempo com API

---

## 🖼️ Prévia do Projeto
<p align="center">
  <img src="assets/gif-site.gif" alt="Prévia do site de clima" width="80%">
</p>

---

## 📋 Descrição
Este projeto consiste no desenvolvimento de um **site de previsão do tempo totalmente responsivo**, que consome dados meteorológicos em **tempo real através de uma API pública (Open-Meteo)**.

A aplicação exibe:

- 🌡️ Temperatura atual  
- 💧 Umidade do ar  
- 💨 Velocidade do vento  
- ☁️ Condição climática  
- 📅 Previsão para os próximos dias  

---

## 🛠️ Tecnologias Utilizadas
<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/174/174854.png" width="20" alt="HTML5"> 
  <strong>HTML5</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

  <img src="https://cdn-icons-png.flaticon.com/512/732/732190.png" width="20" alt="CSS3"> 
  <strong>CSS3 / TailwindCSS</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

  <img src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" width="20" alt="JavaScript"> 
  <strong>JavaScript (ES6+)</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

  🌐 <strong>API Open-Meteo</strong>
</div>

---

## 🔗 API Utilizada

### Open-Meteo
API gratuita de dados meteorológicos em tempo real.

### Exemplo de requisição
https://api.open-meteo.com/v1/forecast?latitude=-26.4861&longitude=-49.0667&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min&forecast_days=4&timezone=auto


---

## ✨ Funcionalidades
- ✅ Clima atual em tempo real  
- ✅ Previsão para vários dias  
- ✅ Ícones dinâmicos conforme o clima  
- ✅ Troca automática de fundo (dia/noite/clima)  
- ✅ Busca por cidade ou coordenadas  
- ✅ Layout responsivo (mobile, tablet e desktop)  

---

## 📂 Estrutura do Projeto
```
API-PREVISAOTEMPO
├── assets
└── dist
    └── style.css
└── node_modules
├── index.html
├── package-lock.json
├── package.json
├── script.js
└── README.md
```
---

## 🚀 Como Executar Localmente

### Opção 1: Clonando o repositório

1. Clone o repositório:
```
git clone https://github.com/Liiiiisssz/api-previsaotempo.git
```

2. Entre na pasta:
```
cd api-previsaotempo
```

3. Abra o arquivo no navegador:
```
index.html
```
**Ou utilize a extensão **Live Server** no VS Code.**

---

### Opção 2: Baixando o arquivo .zip

1. Clique em **Code → Download ZIP**
2. Extraia os arquivos
3. Abra o `index.html` no navegador
---

## 👩‍💻 Autora
**Elis Jasper**  
📧 Email: elis_jasper@estudante.sesisenai.org.br  
🔗 GitHub: [Liiiiisssz](https://github.com/Liiiiisssz)  
