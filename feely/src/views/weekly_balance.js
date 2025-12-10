import backIcon from '../pngicons/back.png';
import downIcon from '../pngicons/downloads.png';
import html2canvas from 'html2canvas';
import reflexionBackground from '../backgrounds/reflexion-background.jpg';
export function renderWeeklyBalance(container) {
  container.innerHTML = `
              <div class="nav-buttons">
                  <button class="button-home" id="back" data-view="home">
                  <img data-view="home" class="icon-home" src="${backIcon}" />
                  <p>Back</p>
                  </button>
                  <h1 class="welcome">Balance</h1> 
              </div>
          <ul>
          <li>
                    <div class="question-container">
                    <p class="quote-text">ENERGY: </p>
                      <button class="button-home" >
                        <b id="value-energy"></b>
                      </button>
                    <p class="quote-text">EXPECTATIONS: </p>
                      <button class="button-home" >
                        <b id="value-expectations" >Neutral</b>
                      </button>
                    <p class="quote-text">MORAL: </p>
                      <button class="button-home" >
                        <b id="value-moral"></b>
                      </button>
                    </div>
                    </li>
                    <li>
                      <section class="home-section">
                      <h1 style="color:white"id="week"></h1>
                      <button class="button-home" id="downloadpng">
                      <img class="icon-home" src="${downIcon}" />
                      <b>Download PNG</b>
                      </button>
                      </section>
                    </li>
                    <li>
                    <section class="home-section">
                      <div class="left-column">
                      <section class="reflexion-container">
                          <div class="quote-container">
                            <p id="title-analysis" class="quote-text">
                            Stress-Biased Activation</p>
                          </div>
                          <p id="text-analysis">
                          High energy without positive expectation can increase 
                          stress levels, as your mental state prepares for challenges
                            but does not anticipate constructive results. Neutral moral
                            stance suggests you are not experiencing strong ethical
                              conflict, but you are also not drawing significant motivation
                              from values or purpose.</p>
                          <div class="background" data-bg="${reflexionBackground}"></div>
                          </section>
                      </div>
                      <div class="right-column">
                        <div class="reflexion-container">
                          <div class="quote-container">
                            <p id="title-recomend" class="quote-text">
                            Recommendation</p>
                          </div>
                          <p id="text-recomend">
                            High energy without positive expectation can increase 
                          stress levels, as your mental state prepares for challenges
                            but does not anticipate constructive results. Neutral moral
                            stance suggests you are not experiencing strong ethical
                              conflict, but you are also not drawing significant motivation
                              from values or purpose.
                          </p>
                        </div>
                      </div>
                    </section>
                    </li>

                    <ul>
        `;

  document.querySelectorAll('.background').forEach(el => {
    const bg = el.getAttribute('data-bg');
    if (bg) {
      el.style.backgroundImage = `url(${bg})`;
    }
  });

  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';
  setTimeout(() => {
    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100);

    const back = container.querySelector('#back');
    back.addEventListener('click', (event) => {
      event.preventDefault();
      navigate('home');
    });

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // meses empiezan en 0
  const day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `Week - ${month}/${day}/${year}`;

  const weekElement = container.querySelector('#week');
  weekElement.textContent = formattedDate;

  // 🔑 Mapas inversos
  const energyInverse = { 30: "Tired", 50: "Enough", 70: "Energetic" };
  const expectationsInverse = { 30: "Pesimism", 50: "Nihilism", 70: "Optimism" };
  const fulfillmentInverse = { 30: "Sad", 50: "Neutral", 70: "Happy" };
  // 🔑 JSON con TODAS las combinaciones posibles (27)
  const analysisTexts = {
    "Tired-Pesimism-Sad": {
      analysis: "Low energy, negative expectations, and sadness signal a deep depletion of both physical and emotional resources. Tasks feel heavier, motivation drops, and pessimism undermines the possibility of meaningful outcomes. Sadness compounds this, narrowing attention to losses and draining momentum. Left unchecked, this loop reinforces disengagement and makes recovery harder without intentional, compassionate intervention.",
      recommendation: "Prioritize restorative routines that address body and mind: consistent sleep, gentle movement, and quiet reflection. Break responsibilities into small, achievable steps to rebuild trust in your capacity and generate sparks of motivation. Seek supportive environments and voices that counter pessimistic narratives with grounded optimism. Use journaling or brief mindfulness to name emotions without judgment and to re-anchor in values and small wins."
    },

    "Tired-Pesimism-Neutral": {
      analysis: "Low energy paired with pessimism and neutral fulfillment reflects functional stagnation: you are getting by, but not moving toward anything that feels meaningful. Pessimism dampens curiosity and risk-taking, while neutral fulfillment suggests a lack of joy or emotional payoff. This steady flatline can keep you stuck, as limited energy discourages experimentation and neutral outcomes fail to motivate change.",
      recommendation: "Design micro-moments of progress that deliver immediate feedback and small satisfactions. Choose two-minute actions that reduce friction—organize a folder, write a single sentence, stretch for one minute—to create momentum. Introduce low-effort novelty: a new playlist for focus, a different work spot, or a small learning challenge. Reconnect each task, however small, to a broader value or intention to gently lift expectations and interest."
    },

    "Tired-Pesimism-Happy": {
      analysis: "Happiness amidst low energy and pessimism suggests emotional resilience constrained by physical fatigue and cautious outlooks. Joy is present but not fully leveraged, and negative expectations limit commitment to goals that could amplify that positivity. This tension can feel frustrating: you know what uplifts you, but your energy ceiling keeps you from engaging deeply. The opportunity lies in preserving joy while scaffolding gentle recovery.",
      recommendation: "Protect the activities that reliably generate joy, but pace them to fit your current energy bandwidth. Pair rest with brief, joyful rituals—music, light social contact, or creative play—to recharge without overextending. Translate positive moments into tiny commitments: one focused block, one message sent, one outline drafted. Over time, let repeated small wins reshape expectations and gently expand your energy envelope."
    },

    "Tired-Nihilism-Sad": {
      analysis: "Low energy, nihilism, and sadness point to disengagement rooted in perceived meaninglessness. When effort feels pointless, energy naturally recedes, and sadness colors daily experiences with heaviness. This combination often reflects unaddressed needs for coherence and purpose, not a flaw in character. Without reframing, it risks turning into avoidance patterns and further erosion of drive.",
      recommendation: "Start with values discovery rather than forceful productivity: list what has mattered across years, even in small ways—learning, care, craft, curiosity. Choose one micro-action that expresses a value today, regardless of mood or grand outcomes. Introduce novelty that is intrinsically interesting, not instrumentally “useful,” to rekindle curiosity. Keep reflections short and concrete; let meaning emerge from consistent value-aligned behavior."
    },

    "Tired-Nihilism-Neutral": {
      analysis: "With low energy, nihilism, and neutral fulfillment, you are operating but not inspired. Tasks feel like maintenance rather than progress, and a lack of perceived meaning flattens both enthusiasm and satisfaction. Neutrality prevents distress but also dampens engagement, making routines feel hollow. This is a signal to rebuild relevance, not just output.",
      recommendation: "Redesign routines to include personally resonant anchors: a daily check-in question, a short read that sparks thought, or a moment of craft you care about. Convert maintenance tasks into value-linked actions—for instance, “organizing” becomes “clearing space to think.” Use lightweight experiments (one new method or tool per week) to locate fresh interest. Track one small impact per day to reestablish a sense of effect and personal agency."
    },

    "Tired-Nihilism-Happy": {
      analysis: "Happiness with low energy and nihilism suggests pockets of satisfaction without a broader sense of meaning or direction. Joy appears in specific contexts, yet the larger narrative feels empty, constraining motivation and effort. This can create a paradox: you feel okay in moments, but unmotivated to invest longer or deeper. The path forward is to connect joy to intentional, low-friction action.",
      recommendation: "Identify the joyful activities and extract a tiny, reproducible habit from them—five minutes daily is enough. Link those habits to a value statement (“I practice to grow my craft,” “I connect to nourish relationships”) to give joy a coherent frame. Reduce energy barriers by pre-arranging tools, spaces, or prompts. Let consistency—not intensity—carry you from isolated joy to sustained engagement and emerging meaning."
    },

    "Tired-Optimism-Sad": {
      analysis: "Optimism with sadness and low energy reflects hope constrained by emotional heaviness and fatigue. You believe better outcomes are possible, but current capacity and mood make action feel daunting. This tension can create internal dissonance—knowing what could be yet feeling unable to move. The task is to respect the sadness while preserving a gentle pathway for hope to translate into action.",
      recommendation: "Use optimism to shape tiny, compassionate commitments that don’t ignore sadness. Set one clear, realistic step per day that honors current energy—one email, one paragraph, one walk. Acknowledge feelings explicitly (brief journaling works) to prevent suppression from draining energy. Keep a visible trail of completed micro-steps; over time, the accumulation rebuilds trust and slowly lifts emotional weight."
    },

    "Tired-Optimism-Neutral": {
      analysis: "Low energy with optimism and neutral fulfillment suggests potential without momentum. You can envision progress, but daily engagement lacks emotional payoff, so efforts stall. Neutral fulfillment means tasks don’t feel rewarding yet, and as energy is limited, you hesitate to invest. The opportunity is to convert optimistic vision into small experiences of reward.",
      recommendation: "Engineer immediate feedback: choose tasks where completion is visible and satisfying within minutes. Use time-boxing (10–15 minutes) to lower activation costs and protect energy. Introduce a simple reward loop—a quick note of “what worked,” a progress bar, or sharing a small win—to attach positive affect to effort. Let repeated, rewarding micro-actions grow into sustainable momentum."
    },

    "Tired-Optimism-Happy": {
      analysis: "Optimism and happiness despite low energy indicate strong emotional resilience paired with reduced physical capacity. You have clarity on positive possibilities and access to joy, yet fatigue limits execution depth. This is a healthy foundation that needs careful pacing to avoid boom-and-bust cycles. The aim is to convert emotional assets into steady, energy-aware progress.",
      recommendation: "Plan with guardrails: short sessions, frequent breaks, and clear stop points. Prioritize tasks that compound—small steps that add up visibly—to keep optimism connected to outcomes. Protect the sources of happiness as non-negotiable maintenance, not optional extras. As energy improves, scale gradually; make “consistent and light” your core operating principle before increasing load."
    },

    "Enough-Pesimism-Sad": {
      analysis: "Moderate energy with pessimism and sadness suggests functional capacity constrained by a discouraging emotional climate. You can act, but negative expectations and low mood dilute effort and satisfaction. This often manifests as doing the work but feeling little pride or hope, which gradually erodes motivation. It’s a signal to recalibrate outlook and emotional nourishment, not just productivity.",
      recommendation: "Connect daily actions to long-term values to restore a sense of direction. Use reframing intentionally: write one sentence on why a task matters beyond today. Pair effort with mood-lifting rituals—music, brief sunlight, a message to a friend—to counter emotional drag. Celebrate completions explicitly; rewarding closure helps prevent pessimism from dominating perception of progress."
    },

    "Enough-Pesimism-Neutral": {
      analysis: "With moderate energy, pessimism, and neutral fulfillment, you are capable but not convinced: work happens, meaning doesn’t. Neutrality blunts joy while pessimism questions outcomes, creating a low-reward loop. Over time, this reduces discretionary effort and creative risk. The path forward is to rebuild a believable narrative around impact and satisfaction.",
      recommendation: "Introduce novelty that is safe but stimulating—one new method, tool, or perspective per week. Use short “impact reflections” after tasks: what changed, who benefited, what moved forward. Create small stakes—share with a peer, set a lightweight deadline—to boost commitment without pressure. Let repeated proof of impact soften pessimism and invite fulfillment to return."
    },

    "Enough-Pesimism-Happy": {
      analysis: "Moderate energy with pessimism but happiness indicates emotional resilience despite doubts. Joy surfaces even as your outlook questions future outcomes, suggesting you have sources of renewal. The mismatch can cause hesitancy to fully invest, fearing disappointment. The invitation is to use happiness as stabilizing fuel and give pessimism a practical counterweight.",
      recommendation: "Schedule joy intentionally before demanding work to prime mood and focus. Translate happiness into small commitments: one clear task that benefits from a positive state. Use evidence-based reframes—review past successes and name specific skills—to counter generic pessimism. Keep task scope modest; pair repetitions of success with joy to build a reliable confidence loop."
    },

    "Enough-Nihilism-Sad": {
      analysis: "Moderate energy alongside nihilism and sadness reflects purposeful disengagement: you can act, but meaning feels absent. Sadness colors effort with heaviness, and nihilism denies significance, muting fulfillment. This combination often hides unmet needs for connection, creativity, or purpose. Recovering meaning—not just output—is the lever for change.",
      recommendation: "Return to values and relationships: list two people or pursuits that have mattered and take one tiny action toward them. Engage in low-pressure creation—writing, design, music—for its intrinsic value. Seek environments that model purpose (communities, mentors, studios) to borrow coherence while yours rebuilds. Track moments of resonance each day; meaning often reappears through repeated contact, not sudden insight."
    },

    "Enough-Nihilism-Neutral": {
      analysis: "With moderate energy, nihilism, and neutral fulfillment, work functions but feels hollow. You perform tasks yet remain emotionally uninvested, which eventually undermines initiative. Neutrality protects against distress but also blocks satisfaction. The task is to invite relevance back into routine work and gently challenge the “nothing matters” narrative.",
      recommendation: "Make work personally legible: define what “good” means to you in a sentence per task. Add small aesthetic or craft touches to care about—the name of a file, the clarity of a function, the elegance of a layout. Use weekly retrospectives to spot patterns of genuine interest. Let meaningful micro-design accumulate until neutrality gives way to quiet pride."
    },

    "Enough-Nihilism-Happy": {
      analysis: "Happiness with moderate energy and nihilism suggests you’re finding enjoyment despite questioning broader meaning. Joy offers protection, yet a skeptical narrative may keep you from deep commitment. This balance is workable but can cap growth if left unexamined. The opportunity is to translate joy into a thread of personal significance.",
      recommendation: "Define a simple personal project that turns joy into a series—ten sketches, five tracks, three articles. Give it a title and a why, however modest, to anchor meaning. Reduce friction with prepared tools and scheduled windows that you can keep even on neutral days. As the series grows, let the evidence of care gently revise the story about what matters."
    },

    "Enough-Optimism-Sad": {
      analysis: "Optimism with sadness and moderate energy indicates belief in better outcomes despite emotional heaviness. You can act, but mood narrows attention and dulls reward, making progress feel fragile. This dissonance is workable with structure and self-compassion. The goal is to translate optimism into consistent, mood-proof action while tending to emotional needs.",
      recommendation: "Use clear, bounded tasks that survive mood shifts—short sprints with defined deliverables. Pair effort with mood care: sunlight, movement, or a supportive check-in before work. After each task, name one concrete gain to prevent sadness from erasing progress. Keep a visible log of completions; the accumulating proof helps optimism stabilize motivation."
    },

    "Enough-Optimism-Neutral": {
      analysis: "Moderate energy with optimism and neutral fulfillment suggests potential waiting to be activated. You believe good things can happen, but current tasks don’t feel rewarding yet, so momentum is cautious. Neutrality signals the need for better feedback loops. The opportunity is to make optimism tangible through satisfying micro-closures.",
      recommendation: "Design tasks for immediate completeness—ship small, often. Add a celebration ritual: share a snippet, tick a box, update a progress bar. Use time-boxing to create urgency without pressure. As positive sensations reliably follow effort, optimism converts into durable motivation and fulfillment begins to rise."
    },

    "Enough-Optimism-Happy": {
      analysis: "Optimism and happiness with moderate energy provide a stable base for consistent progress. You have emotional fuel and realistic capacity, which together support sustainable work. The risk is overcommitting and disrupting balance. The opportunity is to compound small wins into meaningful outcomes while preserving the emotional core.",
      recommendation: "Keep cadence over intensity: set weekly caps, not daily marathons. Prioritize tasks that build on each other and make progress visible. Protect joy-generating habits as structural supports, not optional extras. Review and refine gently each week; measured scaling keeps momentum aligned with well-being."
    },

    "Energetic-Pesimism-Sad": {
      analysis: "High energy, pessimism, and sadness create stress-biased activation: you’re primed to act but expect poor outcomes, and mood dampens satisfaction. This misalignment drives tension, reactivity, and potential burnout. Effort feels urgent yet unrewarding, feeding frustration. The solution is not more intensity but better direction and emotional care.",
      recommendation: "Channel energy into clear, bounded goals with visible results to reduce churn. Pair execution with reframing: list concrete reasons a task could succeed and past evidence that it has. Actively schedule mood-regulating practices—social contact, nature, or creative play—to lower stress baselines. As outcomes accumulate, let proof rewrite expectations and rebalance the system."
    },

    "Energetic-Pesimism-Neutral": {
      analysis: "High energy with pessimism and neutral fulfillment signals strong drive without rewarding outcomes. You push forward, but skeptical expectations blunt satisfaction, making success feel precarious. Over time, this erodes meaning and risks reactive work. The aim is to align energy with believable narratives and reinforcing feedback.",
      recommendation: "Choose goals that produce quick, verifiable impact; measure what changes immediately. Use pre-mortems to address pessimism constructively—identify risks and countermeasures—then commit. Build a lightweight showcase of results to re-anchor fulfillment. Let energy serve clarity, not anxiety; direction plus proof converts effort into satisfaction."
    },

    "Energetic-Pesimism-Happy": {
      analysis: "Happiness alongside high energy and pessimism suggests strong emotional resources navigating skeptical outlooks. Joy helps regulate stress, yet doubts can still limit commitment and depth. This tension can keep work shallow or cautious despite capability. The opportunity is to harness joy to stabilize focus and gently challenge pessimism.",
      recommendation: "Start sessions with brief joy primers—music, connection, or a creative warm-up—to anchor attention. Define one ambitious-but-contained task to leverage energy without risking overwhelm. Document wins and name the skills you used to build a realistic confidence story. Over time, let repeated success reduce pessimism and unlock deeper engagement."
    },

    "Energetic-Nihilism-Sad": {
      analysis: "High energy with nihilism and sadness reflects the painful experience of capability without meaning. You can push hard, but if nothing feels significant, momentum turns hollow and stress rises. Sadness adds emotional weight, making output feel empty. This is a call to rebuild purpose and connection, not just performance.",
      recommendation: "Shift from output to resonance: identify who or what you want your work to serve, even in small ways. Engage in communities or mentorships that model purpose and invite belonging. Create a tiny project with a clear “why” and a visible beneficiary to reestablish impact. Let consistent, value-aligned actions repair meaning gradually."
    },

    "Energetic-Nihilism-Neutral": {
      analysis: "With high energy, nihilism, and neutral fulfillment, you’re productive but emotionally detached. Work moves, but without significance, fulfillment stays flat, risking cynicism. This combination often masks unexpressed values or untapped creativity. Relevance—not effort—is the missing ingredient.",
      recommendation: "Define a personal standard of craft and apply it purposefully—clarity, elegance, or kindness in details. Tie outputs to small audiences or teammates to reintroduce relational meaning. Schedule a weekly slot for exploratory work that answers a genuine curiosity. As care and connection return, neutral fulfillment shifts toward quiet pride."
    },

    "Energetic-Nihilism-Happy": {
      analysis: "Happiness with high energy and nihilism suggests you can feel good and act decisively even while questioning larger meaning. Joy sustains momentum, but skepticism may cap ambition or depth. This balance is livable but may plateau without intentional framing. The opportunity is to channel happiness into coherent, value-linked growth.",
      recommendation: "Name a value your joy expresses—play, mastery, service—and build a small series around it. Keep friction low with prepared tools and ritualized start times. Share results with someone who appreciates them to add relational meaning. Let the series become a narrative; coherence transforms energy and joy into significance."
    },

    "Energetic-Optimism-Sad": {
      analysis: "High energy with optimism and sadness reflects strong drive and belief in outcomes constrained by emotional heaviness. You can move, and you expect good things, yet mood narrows focus and dampens reward. This can lead to overworking to outrun sadness, which backfires. The task is to integrate mood care with structured progress.",
      recommendation: "Use clear sprints with defined endings to avoid runaway effort. Pair each sprint with a mood-care practice—walk, breathwork, brief connection—before and after. Track specific gains to prevent sadness from erasing wins. Consistency in care and closure converts potential into sustained, emotionally safe progress."
    },

    "Energetic-Optimism-Neutral": {
      analysis: "High energy, optimism, and neutral fulfillment indicate strong potential with underpowered reward systems. You produce and believe, but the emotional payoff doesn’t land yet, risking impatient scaling. Neutrality invites better celebration and integration of results. The goal is to make outcomes felt, not just achieved.",
      recommendation: "Design visible milestones and simple rituals of completion—demo, share, reflect. Balance ambition with cadence; keep cycles short to sustain enthusiasm. Translate outcomes into impact statements: who benefited, what improved, why it matters. As felt meaning increases, optimism anchors deeper commitment and fulfillment rises."
    },

    "Energetic-Optimism-Happy": {
      analysis: "This is a high-alignment state: energy, outlook, and emotional satisfaction reinforce each other, enabling resilient and joyful progress. You can take on challenges, recover from setbacks, and sustain effort with purpose. The main risk is overcommitment or neglecting recovery, which can erode the balance that makes this powerful. Protecting the system ensures sustained excellence without burnout.",
      recommendation: "Keep structure proportional to ambition: clear priorities, bounded workloads, and regular recovery cycles. Choose compounding goals where each step builds on the last and displays progress. Maintain the habits that feed happiness—connection, creativity, movement—as strategic assets. Review weekly to fine-tune without overcorrecting; steadiness preserves the conditions for long-term, meaningful growth."
    }
  };



  // 🔑 Función para calcular el valor más frecuente
  function mostFrequent(arr) {
    const counts = {};
    arr.forEach(v => counts[v] = (counts[v] || 0) + 1);
    return Object.keys(counts).reduce((a, b) => counts[a] >= counts[b] ? a : b);
  }
  const downloadBtn = container.querySelector('#downloadpng');
  downloadBtn.addEventListener('click', () => {
    html2canvas(container).then(canvas => {
      const link = document.createElement('a');
      link.download = `weekly-balance${month}/${day}/${year}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });

  const user = JSON.parse(localStorage.getItem('user'));
  // 👉 Obtener registros del backend
  if (user && user.email) {
    fetch(`https://wdp-project-feely.onrender.com/weekcheck/${user.email}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // sacar arrays de cada categoría
          const energies = data.map(d => d.energy);
          const expectations = data.map(d => d.expectations);
          const fulfillments = data.map(d => d.fulfillment);

          // calcular más frecuentes
          const energyVal = mostFrequent(energies);
          const expectationsVal = mostFrequent(expectations);
          const fulfillmentVal = mostFrequent(fulfillments);

          // poner equivalencias en el DOM
          container.querySelector('#value-energy').textContent = energyInverse[energyVal];
          container.querySelector('#value-expectations').textContent = expectationsInverse[expectationsVal];
          container.querySelector('#value-moral').textContent = fulfillmentInverse[fulfillmentVal];
          const key = `${energyInverse[energyVal]}-${expectationsInverse[expectationsVal]}-${fulfillmentInverse[fulfillmentVal]}`;
          if (analysisTexts[key]) {
            container.querySelector('#title-analysis').textContent = "Analysis";
            container.querySelector('#text-analysis').textContent = analysisTexts[key].analysis;
            container.querySelector('#title-recomend').textContent = "Recommendation";
            container.querySelector('#text-recomend').textContent = analysisTexts[key].recommendation;
          }
        }
      })
      .catch(err => console.error("Error al obtener registros:", err));
  }
}
