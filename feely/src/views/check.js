import angryIcon from '../pngicons/angry.png';
import energeticIcon from '../pngicons/energetic.png';
import enoughIcon from '../pngicons/enough.png';
import happyIcon from '../pngicons/happy.png';
import homeIcon from '../pngicons/home.png';
import levellIcon from '../pngicons/level.png';
import lightIcon from '../pngicons/light.png';
import neutralIcon from '../pngicons/neutral.png';
import nihilistIcon from '../pngicons/nihilist.png';
import optimistIcon from '../pngicons/optimist.png';
import pesimistIcon from '../pngicons/pesimist.png';
import sunIcon from '../pngicons/sun.png';
import cloudIcon from '../pngicons/cloud.png';
import backIcon from '../pngicons/back.png';
import sadIcon from '../pngicons/sad.png';
import tiredIcon from '../pngicons/tired.png';
import workIcon from '../pngicons/work.png';
import planIcon from '../pngicons/plan.png';
import tickIcon from '../pngicons/tick.png';
import { navigate } from '../main.js';
import reflexionBackground from '../backgrounds/reflexion-background.jpg';
import Smooothy from 'smooothy';

// variable global accesible en navigate

export function renderCheck(container) {

  container.innerHTML = `
    <div class="nav-buttons">
        <button class="button-home" id="back" data-view="home">
        <img data-view="home" class="icon-home" src="${backIcon}" />
        <p>Back</p>
        </button>
        <h1 class="welcome">Check</h1> 
    </div>
      
      <ul class="question-list">
        <li>
          <div class="quote-container">
              <p class="quote-text"> Energy: Can you workout or be focused?</p>
          </div>
          <div class="question-container">
            <button class="button-home" value="tired">
              <img class="icon-home" src="${tiredIcon}" />
              <b >Tired</b>
            </button>
            <button class="button-home"  value="enough" >
              <img  class="icon-home" src="${enoughIcon}" />
              <b >Enough</b>
            </button>
            <button class="button-home"  value="energetic">
              <img class="icon-home" src="${energeticIcon}" />
              <b ">Energetic</b>
            </button>
          </div>
        </li>
        <li >
          <div class="quote-container">
              <p class="quote-text">Expectations: How do you feel about the future?</p>
          </div>
          <div class="question-container">
            <button class="button-home"  value="pesimism">
              <img  class="icon-home" src="${pesimistIcon}" />
              <b >Pesimism</b>
            </button>
            <button class="button-home" value="nihilism">
              <img  class="icon-home" src="${cloudIcon}" />
              <b >Nihilism</b>
            </button>
            <button class="button-home" value="optimism">
              <img  class="icon-home" src="${sunIcon}" />
              <b >Optimism</b>
            </button>
          </div>
        </li>
        
        <li>
          <div class="quote-container">
              <p class="quote-text">Fulfillment: How do you feel about, the things you are currently doing?</p>
          </div>
          <div class="question-container">
            <button class="button-home" value="sad">
              <img  class="icon-home" src="${sadIcon}" />
              <b >Sad</b>
            </button>
            <button class="button-home" value="neutral">
              <img class="icon-home" src="${neutralIcon}" />
              <b >Neutral</b>
            </button>
            <button class="button-home" value="happy">
              <img class="icon-home" src="${happyIcon}" />
              <b >Happy</b>
            </button>
          </div>
        </li>
        <li>
          <h2 class="quote-text text-block" id="name-message"></h2>
          <p class="quote-text text-block" id="checked"></p>
        </li>
        <li>
        <div class="reflexion-container">
        <div class="background" data-bg="${reflexionBackground}"></div>
        <button id="submit-check" class="button-home">
        <img  class="icon-home" src="${tickIcon}" />
        <p>Submit Check</p>
        </button>
        <button class="button-home-unabled" data-view="weekly_balance">
        <img   data-view="weekly_balance" class="icon-home" src="${planIcon}" />
        <p  data-view="weekly_balance">5 Day Balance</p>
        </button>
        </div>
        </li>
        </ul>

      `;
      container.querySelectorAll(".question-container button").forEach(btn => {
        btn.addEventListener("click", () => {
          const group = btn.getAttribute("data-group"); // energy, expectations, fulfillment
      
          // desactivar todos los botones del mismo grupo
          container.querySelectorAll(`button[data-group="${group}"]`)
            .forEach(b => b.classList.remove("active"));
      
          // activar el botón clicado
          btn.classList.add("active");
      
          // actualizar el objeto check
          setCheck(btn.value);
        });
      });
      document.querySelectorAll('.background').forEach(el => {
        const bg = el.getAttribute('data-bg');
        if (bg) {
          el.style.backgroundImage = `url(${bg})`;
        }
      });
      const user = JSON.parse(localStorage.getItem('user'));
      const weeklyButton = container.querySelector('.reflexion-container .button-home-unabled');   
      function setWeeklyButton(enabled) {
        if (!weeklyButton) return;
        if (enabled) {
          weeklyButton.classList.remove('button-home-unabled');
          weeklyButton.classList.add('button-home');
          weeklyButton.disabled = false;
        } else {
          weeklyButton.classList.remove('button-home');
          weeklyButton.classList.add('button-home-unabled');
          weeklyButton.disabled = true;
        }
      }   
      if (user && user.email) {
        fetch(`https://wdp-project-feely.onrender.com/weekcheck/${user.email}`)
          .then(res => {
            if (res.status === 404) return [];
            if (!res.ok) {
              console.warn("Response not OK when requesting weekcheck:", res.status);
              return [];
            }
            return res.json();
          })
          .then(rawData => {
            const data = Array.isArray(rawData) ? rawData : [];
            console.log("User records:", data);
      
            // Llamada a la función separada
            updateConsecutiveButton(data, container);
      
            // Check si ya existe un registro para hoy
            const todayISO = new Date().toISOString().split('T')[0];
            const alreadyToday = data.find(d => String(d.day) === todayISO);
      
            if (alreadyToday) {
              const fulData = alreadyToday.fulfillment;
              const enerData = alreadyToday.energy;
              const expData = alreadyToday.expectations;
              const energyMap = { 30: "tired", 50: "enough", 70: "energetic" };
              const expsMap  = { 30: "pessimism", 50: "nihilism", 70: "optimism" };
              const fulMap   = { 30: "sad", 50: "neutral", 70: "happy" };
      
              const checkedtext = container.querySelector('#checked');
              if (checkedtext) {
                checkedtext.textContent = `You already created a check for today (${todayISO}). Creating a new one will overwrite the existing record.`;
              }
      
              const nameMessage = document.getElementById("name-message");
              if (nameMessage) {
                nameMessage.innerHTML = `
                  <p>${fulMap[fulData] || "-"} ${energyMap[enerData] || "-"} ${expsMap[expData] || "-"} </p>
                `;
              }
            }
          })
          .catch(err => console.error("Error checking 5 consecutive days:", err));
      }
      
      
  const back = container.querySelector('#back');
  back.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('home');
  });
  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';
  setTimeout(() => {
    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100);

  console.log(user);

  // Convierte cualquier fecha a string YYYY-MM-DD en UTC (día puro)
function toUTCDateString(input) {
  const d = new Date(input);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Suma un día a un YYYY-MM-DD en UTC y devuelve YYYY-MM-DD
function addOneDayUTC(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const next = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  const ny = next.getUTCFullYear();
  const nm = String(next.getUTCMonth() + 1).padStart(2, '0');
  const nd = String(next.getUTCDate()).padStart(2, '0');
  return `${ny}-${nm}-${nd}`;
}

function getMaxConsecutiveDays(records) {
  // 1) Filtra válidos y normaliza a día UTC
  const days = records
    .filter(r => r && r.day)
    .map(r => toUTCDateString(r.day));

  if (days.length === 0) return 0;

  // 2) Deduplica por día
  const uniqueDays = Array.from(new Set(days));

  // 3) Ordena ascendente
  uniqueDays.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  // 4) Calcula rachas comparando día siguiente exacto (sin floats)
  let maxConsecutive = 1;
  let current = 1;

  for (let i = 1; i < uniqueDays.length; i++) {
    const prevDay = uniqueDays[i - 1];
    const currDay = uniqueDays[i];
    const prevPlusOne = addOneDayUTC(prevDay);

    if (currDay === prevPlusOne) {
      current++;
      if (current > maxConsecutive) maxConsecutive = current;
    } else {
      current = 1;
    }
  }

  return maxConsecutive;
}

function updateConsecutiveButton(records, container) {
  const maxConsecutive = getMaxConsecutiveDays(records);

  const checkedtext = container.querySelector('#checked');
  if (checkedtext) {
    checkedtext.textContent = `You have ${maxConsecutive}/5 consecutive days.`;
  }

  setWeeklyButton(maxConsecutive >= 5);
}

  const states = {
    energy: ["tired", "enough", "energetic"],
    expectations: ["pesimism", "nihilism", "optimism"],
    fulfillment: ["sad", "neutral", "happy"]
  };

  const check = { energy: "", expectations: "", fulfillment: "" };

  function setCheck(value) {
    for (let key in states) {
      if (states[key].includes(value)) {
        check[key] = value;
      }
    }

    const nameMessage = document.getElementById("name-message");
    if (nameMessage) {
      nameMessage.innerHTML = `
        <p>${check.fulfillment || "-"} ${check.energy || "-"} ${check.expectations || "-"} </p>
      `;
    }

    console.log("Estado actual de check:", check);
  }

  // Enganchar todos los botones con addEventListener
  container.querySelectorAll(".question-container button").forEach(btn => {
    btn.addEventListener("click", () => setCheck(btn.value));
  });
  const energyMap = { tired: 30, enough: 50, energetic: 70 };
  const expectationsMap = { pesimism: 30, nihilism: 50, optimism: 70 };
  const fulfillmentMap = { sad: 30, neutral: 50, happy: 70 };

  // Submit
  container.querySelector("#submit-check").addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!check.energy || !check.expectations || !check.fulfillment) {
      alert("Por favor selecciona Energy, Expectations y Fulfillment antes de enviar.");
      return;
    }

    const newCheck = {
      email: user.email,
      day: new Date().toISOString().split("T")[0],
      energy: energyMap[check.energy],
      expectations: expectationsMap[check.expectations],
      fulfillment: fulfillmentMap[check.fulfillment]
    };

    console.log("Objeto que se enviará al backend:", newCheck);

    localStorage.setItem("check-today", JSON.stringify({
      date: newCheck.day,
      check: {
        energy: newCheck.energy,
        expectations: newCheck.expectations,
        fulfillment: newCheck.fulfillment
      }
    }));

    // fetch("http://localhost:3000/weekcheck", {
    fetch ( "https://wdp-project-feely.onrender.com/weekcheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCheck)
    })
      .then(res => {
        console.log("Status:", res.status);
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message || "Respuesta no OK"); });
        }
        return res.json();
      })
      .then(data => {
        console.log("Registro actualizado:", data);
        let checkedtext = container.querySelector('#checked');
        checkedtext.textContent = `You have made the check of your day!`;
        // Recalcular consecutivos y actualizar botón
        updateConsecutiveButton(data.data, container);
      })      
      .catch(err => console.error("Error en fetch:", err));
    
  });

}


