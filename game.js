"use strict";

const elements = {
  canvas: document.getElementById("vfx"),
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  level: document.getElementById("level"),
  topic: document.getElementById("topic"),
  problemCount: document.getElementById("problem-count"),
  difficulty: document.getElementById("difficulty"),
  questionCard: document.querySelector(".question-card"),
  question: document.getElementById("question"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  start: document.getElementById("start-btn"),
  skip: document.getElementById("skip-btn"),
  restart: document.getElementById("restart-btn"),
  timeBar: document.getElementById("time-bar"),
  timeFlash: document.getElementById("time-flash"),
  gameOver: document.getElementById("game-over"),
  finalScore: document.getElementById("final-score"),
  shell: document.querySelector(".shell")
};

const state = {
  running: false,
  score: 0,
  streak: 0,
  level: 1,
  problemIndex: 0,
  time: 45,
  maxTime: 60,
  current: null,
  locked: false,
  lastFrame: performance.now()
};

const keys = ["A", "B", "C", "D"];
const ctx = elements.canvas.getContext("2d");
const particles = [];
const formulae = [];
const sparks = [];

const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (items) => items[Math.floor(Math.random() * items.length)];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    [x, y] = [y, x % y];
  }
  return x || 1;
}

function fraction(numerator, denominator) {
  if (denominator === 0) return "undefined";
  const sign = numerator * denominator < 0 ? "-" : "";
  const n = Math.abs(numerator);
  const d = Math.abs(denominator);
  const divisor = gcd(n, d);
  const top = n / divisor;
  const bottom = d / divisor;
  return bottom === 1 ? `${sign}${top}` : `${sign}${top}/${bottom}`;
}

function term(coefficient, variable = "x", power = 1) {
  if (coefficient === 0) return "";
  const abs = Math.abs(coefficient);
  const sign = coefficient < 0 ? "-" : "";
  const shown = abs === 1 ? "" : abs;
  if (power === 0) return `${coefficient}`;
  if (power === 1) return `${sign}${shown}${variable}`;
  return `${sign}${shown}${variable}^${power}`;
}

function polynomial(parts) {
  const text = parts.filter(Boolean).join(" + ").replace(/\+ -/g, "- ");
  return text || "0";
}

function uniqueChoices(correct, distractors) {
  const values = [String(correct)];
  for (const item of distractors.map(String)) {
    if (!values.includes(item)) values.push(item);
  }
  let guard = 0;
  while (values.length < 4 && guard < 40) {
    guard += 1;
    const numeric = Number.parseFloat(String(correct));
    const fallback = Number.isFinite(numeric) ? String(numeric + pick([-6, -4, -3, -2, 2, 3, 4, 6])) : pick(["0", "1", "-1", "2"]);
    if (!values.includes(fallback)) values.push(fallback);
  }
  return shuffle(values.slice(0, 4));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeQuestion(topic, difficulty, prompt, correct, distractors) {
  return {
    topic,
    difficulty,
    prompt,
    correct: String(correct),
    choices: uniqueChoices(correct, distractors)
  };
}

const generators = [
  {
    min: 1,
    max: 2,
    build() {
      const a = Math.floor(rand(2, 8));
      const b = Math.floor(rand(1, 7));
      const x = Math.floor(rand(1, 6));
      const correct = 2 * a * x + b;
      return makeQuestion(
        "Derivatives",
        1,
        `If f(x) = ${a}x^2 + ${b}x, what is f'(${x})?`,
        correct,
        [correct + a, correct - b, 2 * a + b, a * x + b]
      );
    }
  },
  {
    min: 1,
    max: 2,
    build() {
      const a = Math.floor(rand(2, 9));
      const n = Math.floor(rand(2, 5));
      const correct = `${a * n}x^${n - 1}`;
      return makeQuestion(
        "Power Rule",
        1,
        `Differentiate ${a}x^${n}.`,
        correct,
        [`${a + n}x^${n - 1}`, `${a * n}x^${n}`, `${a}x^${n - 1}`, `${n}x^${a - 1}`]
      );
    }
  },
  {
    min: 1,
    max: 3,
    build() {
      const n = Math.floor(rand(2, 7));
      const correct = fraction(1, n + 1);
      return makeQuestion(
        "Integrals",
        2,
        `Evaluate integral from 0 to 1 of x^${n} dx.`,
        correct,
        [fraction(1, n), fraction(n, n + 1), `${n + 1}`, fraction(1, n + 2)]
      );
    }
  },
  {
    min: 2,
    max: 4,
    build() {
      const a = Math.floor(rand(1, 6));
      const b = Math.floor(rand(1, 7));
      const correct = `${a}e^x + ${b}cos(x)`;
      return makeQuestion(
        "Antiderivatives",
        2,
        `Find an antiderivative of ${a}e^x - ${b}sin(x).`,
        correct,
        [`${a}e^x - ${b}cos(x)`, `${a}xe^x + ${b}cos(x)`, `${a}e^x + ${b}sin(x)`, `${a}e^x - ${b}sin(x)`]
      );
    }
  },
  {
    min: 2,
    max: 4,
    build() {
      const k = Math.floor(rand(2, 7));
      const x = Math.floor(rand(1, 5));
      const correct = `${k}e^${k * x}`;
      return makeQuestion(
        "Chain Rule",
        2,
        `If y = e^(${k}x), what is dy/dx at x = ${x}?`,
        correct,
        [`e^${k * x}`, `${k * x}e^${k * x}`, `${k}e^${x}`, `${k + 1}e^${k * x}`]
      );
    }
  },
  {
    min: 3,
    max: 5,
    build() {
      const n = Math.floor(rand(2, 5));
      const correct = "converges";
      return makeQuestion(
        "Series",
        3,
        `Does sum from n=1 to infinity of 1/n^${n + 1} converge or diverge?`,
        correct,
        ["diverges", "oscillates", "equals 0", "cannot tell"]
      );
    }
  },
  {
    min: 3,
    max: 5,
    build() {
      const a = Math.floor(rand(2, 8));
      const b = Math.floor(rand(2, 8));
      const correct = `${a * b}cos(${b}x)`;
      return makeQuestion(
        "Chain Rule",
        3,
        `Differentiate ${a}sin(${b}x).`,
        correct,
        [`${a}cos(${b}x)`, `${a * b}sin(${b}x)`, `-${a * b}cos(${b}x)`, `${a + b}cos(${b}x)`]
      );
    }
  },
  {
    min: 3,
    max: 6,
    build() {
      const ratio = pick(["1/2", "1/3", "2/3", "1/4"]);
      const value = { "1/2": "2", "1/3": "3/2", "2/3": "3", "1/4": "4/3" }[ratio];
      return makeQuestion(
        "Geometric Series",
        3,
        `Find sum from n=0 to infinity of (${ratio})^n.`,
        value,
        ["1", ratio, "diverges", fraction(Number(value.split("/")[0] || value), 2)]
      );
    }
  },
  {
    min: 4,
    max: 7,
    build() {
      const n = Math.floor(rand(3, 8));
      const correct = "0";
      return makeQuestion(
        "Taylor Series",
        4,
        `In the Maclaurin series for cos(x), what is the coefficient of x^${2 * n - 1}?`,
        correct,
        [fraction((n % 2 ? -1 : 1), factorial(2 * n - 1)), fraction((n % 2 ? -1 : 1), factorial(2 * n)), "1", "-1"]
      );
    }
  },
  {
    min: 4,
    max: 7,
    build() {
      const n = Math.floor(rand(2, 6));
      const correct = fraction((n % 2 === 0 ? -1 : 1), n);
      return makeQuestion(
        "Taylor Series",
        4,
        `In the Maclaurin series for ln(1+x), what is the coefficient of x^${n}?`,
        correct,
        [fraction(1, n), fraction((n % 2 === 0 ? 1 : -1), n + 1), `${n}`, "0"]
      );
    }
  },
  {
    min: 4,
    max: 8,
    build() {
      const a = Math.floor(rand(2, 7));
      const correct = `${a} / (1 + ${a}^2t^2)`;
      return makeQuestion(
        "Parametric",
        4,
        `For x=t and y=arctan(${a}t), find dy/dx.`,
        correct,
        [`1 / (1 + ${a}^2t^2)`, `${a} / (1 + ${a}t^2)`, `${a}t / (1 + ${a}^2t^2)`, `${a} / (1 - ${a}^2t^2)`]
      );
    }
  },
  {
    min: 5,
    max: 9,
    build() {
      const a = Math.floor(rand(2, 6));
      const b = Math.floor(rand(2, 7));
      const correct = fraction(a, b);
      return makeQuestion(
        "L'Hopital",
        5,
        `Evaluate lim as x approaches 0 of sin(${a}x) / sin(${b}x).`,
        correct,
        [fraction(b, a), `${a * b}`, "1", "0"]
      );
    }
  },
  {
    min: 5,
    max: 9,
    build() {
      const n = Math.floor(rand(2, 5));
      const correct = `${n}!`;
      return makeQuestion(
        "Power Series",
        5,
        `If f(x)=1/(1-x), what is f^(${n})(0)?`,
        correct,
        [`${n}`, `${n + 1}!`, "1", "0"]
      );
    }
  },
  {
    min: 5,
    max: 10,
    build() {
      const a = Math.floor(rand(2, 9));
      const areaNumerator = a * a;
      const correct = `${fraction(areaNumerator, 4)}pi`;
      return makeQuestion(
        "Polar",
        5,
        `Find the area inside r = ${a}sin(theta), 0 <= theta <= pi.`,
        correct,
        [`${areaNumerator}pi`, `${fraction(areaNumerator, 2)}pi`, `${fraction(a, 2)}pi`, `${a * 2}pi`]
      );
    }
  }
];

function factorial(n) {
  let product = 1;
  for (let value = 2; value <= n; value += 1) product *= value;
  return product;
}

function availableGenerators() {
  const difficulty = Math.min(10, 1 + Math.floor(state.problemIndex / 3));
  return generators.filter((generator) => difficulty >= generator.min && difficulty <= generator.max);
}

function nextQuestion() {
  const generator = pick(availableGenerators());
  const question = generator.build();
  state.current = question;
  state.locked = false;
  state.problemIndex += 1;
  state.level = Math.min(10, 1 + Math.floor((state.problemIndex - 1) / 3));
  renderQuestion(question);
  spawnFormulaBurst(10 + state.level * 2, true);
}

function renderQuestion(question) {
  elements.topic.textContent = question.topic;
  elements.problemCount.textContent = `Problem ${state.problemIndex}`;
  elements.question.textContent = question.prompt;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
  elements.level.textContent = state.level;

  elements.questionCard.classList.remove("pulse");
  void elements.questionCard.offsetWidth;
  elements.questionCard.classList.add("pulse");

  [...elements.difficulty.children].forEach((bar, index) => {
    bar.classList.toggle("active", index < question.difficulty);
  });

  elements.choices.innerHTML = "";
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.dataset.key = keys[index];
    button.dataset.value = choice;
    button.innerHTML = `<strong>${choice}</strong>`;
    button.addEventListener("click", () => answer(choice, button));
    elements.choices.appendChild(button);
  });
}

function answer(choice, button) {
  if (!state.running || state.locked || !state.current) return;
  state.locked = true;
  const correct = choice === state.current.correct;

  if (correct) {
    const gain = 4 + Math.min(8, Math.floor(state.streak / 2));
    const points = 100 * state.level + state.streak * 25;
    state.time = clamp(state.time + gain, 0, state.maxTime);
    state.score += points;
    state.streak += 1;
    elements.feedback.textContent = `Correct  +${gain}s  +${points}`;
    elements.feedback.className = "feedback good";
    button.classList.add("correct");
    burstAtButton(button, "#23b26d", 36);
    addShockwave("good");
  } else {
    state.time = clamp(state.time - 8, 0, state.maxTime);
    state.streak = 0;
    elements.feedback.textContent = `Wrong  -8s  Answer: ${state.current.correct}`;
    elements.feedback.className = "feedback bad";
    button.classList.add("wrong");
    elements.shell.classList.remove("shake");
    void elements.shell.offsetWidth;
    elements.shell.classList.add("shake");
    markCorrectChoice();
    burstAtButton(button, "#e44d43", 28);
    addShockwave("bad");
  }

  flashTime();
  renderStats();

  window.setTimeout(() => {
    if (!state.running) return;
    if (state.time <= 0) {
      endGame();
      return;
    }
    nextQuestion();
  }, correct ? 640 : 1120);
}

function markCorrectChoice() {
  [...elements.choices.children].forEach((choice) => {
    if (choice.dataset.value === state.current.correct) choice.classList.add("correct");
  });
}

function renderStats() {
  elements.score.textContent = state.score.toLocaleString();
  elements.streak.textContent = state.streak;
  elements.level.textContent = state.level;
  elements.timeBar.style.transform = `scaleX(${clamp(state.time / state.maxTime, 0, 1)})`;
}

function flashTime() {
  elements.timeFlash.classList.remove("hit");
  void elements.timeFlash.offsetWidth;
  elements.timeFlash.classList.add("hit");
}

function startGame() {
  state.running = true;
  state.score = 0;
  state.streak = 0;
  state.level = 1;
  state.problemIndex = 0;
  state.time = 45;
  state.maxTime = 60;
  state.current = null;
  state.locked = false;
  elements.start.disabled = true;
  elements.skip.disabled = false;
  elements.gameOver.classList.remove("show");
  elements.gameOver.setAttribute("aria-hidden", "true");
  renderStats();
  nextQuestion();
}

function endGame() {
  state.running = false;
  state.locked = true;
  elements.start.disabled = false;
  elements.skip.disabled = true;
  elements.finalScore.textContent = state.score.toLocaleString();
  elements.gameOver.classList.add("show");
  elements.gameOver.setAttribute("aria-hidden", "false");
  elements.feedback.textContent = "";
  elements.choices.innerHTML = "";
  spawnFormulaBurst(72, false);
}

function skipQuestion() {
  if (!state.running || state.locked) return;
  state.time = clamp(state.time - 5, 0, state.maxTime);
  state.streak = 0;
  elements.feedback.textContent = "Skipped  -5s";
  elements.feedback.className = "feedback bad";
  flashTime();
  renderStats();
  if (state.time <= 0) {
    endGame();
    return;
  }
  nextQuestion();
}

function resizeCanvas() {
  const scale = window.devicePixelRatio || 1;
  elements.canvas.width = Math.floor(window.innerWidth * scale);
  elements.canvas.height = Math.floor(window.innerHeight * scale);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

function spawnFormulaBurst(count, calm) {
  const tokens = ["int", "sum", "pi", "dx", "dy/dx", "e^x", "lim", "inf", "BC"];
  for (let i = 0; i < count; i += 1) {
    formulae.push({
      text: pick(tokens),
      x: rand(0, window.innerWidth),
      y: calm ? rand(window.innerHeight * 0.12, window.innerHeight * 0.72) : rand(0, window.innerHeight),
      vx: rand(-18, 18),
      vy: rand(calm ? -14 : -60, calm ? 18 : 28),
      life: rand(1.1, calm ? 2.2 : 3.6),
      age: 0,
      size: rand(18, calm ? 40 : 70),
      hue: pick(["#23b26d", "#31b7d6", "#efb938", "#f5f1e7"])
    });
  }
}

function burstAtButton(button, color, count) {
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  for (let i = 0; i < count; i += 1) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(70, 360);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: rand(0.5, 1.05),
      age: 0,
      size: rand(2, 7),
      color
    });
  }
}

function addShockwave(kind) {
  sparks.push({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: 0,
    life: 0.6,
    age: 0,
    color: kind === "good" ? "rgba(35,178,109," : "rgba(228,77,67,"
  });
}

function drawVfx(now) {
  const dt = Math.min(0.033, (now - state.lastFrame) / 1000);
  state.lastFrame = now;
  tickTimer(dt);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawAmbient(now);
  drawParticles(dt);
  drawFormulae(dt);
  drawSparks(dt);
  window.requestAnimationFrame(drawVfx);
}

function tickTimer(dt) {
  if (!state.running) return;
  state.time = clamp(state.time - dt, 0, state.maxTime);
  renderStats();
  if (state.time <= 0) endGame();
}

function drawAmbient(now) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const time = now * 0.001;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 9; i += 1) {
    const x = width * (0.08 + i * 0.11) + Math.sin(time * 0.7 + i) * 18;
    const y = height * (0.18 + (i % 4) * 0.18) + Math.cos(time * 0.5 + i * 2) * 24;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 90);
    gradient.addColorStop(0, "rgba(245,241,231,0.08)");
    gradient.addColorStop(1, "rgba(245,241,231,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 90, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawParticles(dt) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const p = particles[i];
    p.age += dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 260 * dt;
    const alpha = 1 - p.age / p.life;
    if (alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawFormulae(dt) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = formulae.length - 1; i >= 0; i -= 1) {
    const f = formulae[i];
    f.age += dt;
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    f.vy -= 4 * dt;
    const alpha = 1 - f.age / f.life;
    if (alpha <= 0) {
      formulae.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = alpha * 0.75;
    ctx.fillStyle = f.hue;
    ctx.font = `800 ${f.size}px Georgia, serif`;
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.restore();
}

function drawSparks(dt) {
  ctx.save();
  for (let i = sparks.length - 1; i >= 0; i -= 1) {
    const spark = sparks[i];
    spark.age += dt;
    spark.radius += 760 * dt;
    const alpha = 1 - spark.age / spark.life;
    if (alpha <= 0) {
      sparks.splice(i, 1);
      continue;
    }
    ctx.strokeStyle = `${spark.color}${alpha * 0.45})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

elements.start.addEventListener("click", startGame);
elements.restart.addEventListener("click", startGame);
elements.skip.addEventListener("click", skipQuestion);

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !state.running) startGame();
  if (event.key === "Escape" && state.running) skipQuestion();
  const index = keys.indexOf(event.key.toUpperCase());
  if (index >= 0 && elements.choices.children[index]) {
    elements.choices.children[index].click();
  }
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
renderStats();
spawnFormulaBurst(18, true);
window.requestAnimationFrame(drawVfx);
