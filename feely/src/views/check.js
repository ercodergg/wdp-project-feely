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
        <p  data-view="weekly_balance">Weekly Balance</p>
        </button>
        </div>
        </li>
        </ul>

      `;
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
            console.warn("Respuesta no OK al pedir weekcheck:", res.status);
            return [];
          }
          return res.json();
        })        
          .then(rawData => {
            // Normalize data shape
            const data = Array.isArray(rawData) ? rawData : [];
            console.log("Registros del usuario:", data);
      
            // Current week range — Monday 00:00:00 to next Monday 00:00:00 — timezone safe
            const now = new Date();
            const dayOfWeek = (now.getDay() + 6) % 7; // Monday=0 ... Sunday=6
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - dayOfWeek);
            startOfWeek.setHours(0, 0, 0, 0);
      
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 7);
            endOfWeek.setHours(0, 0, 0, 0);
      
            // Filter records for current week, guard missing fields
            const currentWeekRecords = data.filter(d => {
              if (!d || !d.day) return false;
              // parse ISO yyyy-mm-dd in local time to avoid UTC shifting
              const [yyyy, mm, dd] = String(d.day).split('-').map(Number);
              const dayDate = new Date(yyyy, (mm || 1) - 1, dd || 1);
              return dayDate >= startOfWeek && dayDate < endOfWeek;
            });

            const n = currentWeekRecords.length;
            let checkedtext = container.querySelector('#checked');
            if(n === 7){
              checkedtext.textContent = `You checked feelings of all the week, get the weekcheck bellow! `;
            }
            else{
              checkedtext.textContent = `You already checked feelings in ${n} days!`;
            }
      
            if (currentWeekRecords.length >= 7) {
              setWeeklyButton(true);
            } else {
              setWeeklyButton(false);
              // Ya no borramos aquí, el backend se encarga
            }
            
          })
          .catch(err => console.error("Error al comprobar weekly balance:", err));
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

  const namemessage = container.querySelector('#name-message');
  console.log(user);

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
        <p>${check.energy || "-"} ${check.expectations || "-"} ${check.fulfillment || "-"}</p>
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
        alert("Check enviado correctamente");
      })
      .catch(err => console.error("Error en fetch:", err));
    
  });

}


