"use strict";

const elements = {
  canvas: document.getElementById("vfx"),
  formulaLayer: document.getElementById("formula-layer"),
  homePage: document.getElementById("home-page"),
  developerPage: document.getElementById("developer-page"),
  desmosPage: document.getElementById("desmos-page"),
  studyPage: document.getElementById("study-page"),
  apPage: document.getElementById("ap-page"),
  calcPage: document.getElementById("calc-page"),
  ti84Panel: document.querySelector(".ti84-panel"),
  ti84Fullscreen: document.getElementById("ti84-fullscreen"),
  gamePage: document.getElementById("game-page"),
  navHome: document.getElementById("nav-home"),
  navPlay: document.getElementById("nav-play"),
  navDesmos: document.getElementById("nav-desmos"),
  navCalc: document.getElementById("nav-calc"),
  navAP: document.getElementById("nav-ap"),
  navStudy: document.getElementById("nav-study"),
  navDeveloper: document.getElementById("nav-developer"),
  modeButtons: [...document.querySelectorAll("[data-mode]")],
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  level: document.getElementById("level"),
  modeLabel: document.getElementById("mode-label"),
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
  frqPanel: document.getElementById("frq-panel"),
  frqForm: document.getElementById("frq-form"),
  frqAnswer: document.getElementById("frq-answer"),
  frqSubmit: document.getElementById("frq-submit"),
  timeBar: document.getElementById("time-bar"),
  timeFlash: document.getElementById("time-flash"),
  gameOver: document.getElementById("game-over"),
  finalScore: document.getElementById("final-score"),
  desmosLabel: document.getElementById("desmos-label"),
  desmosPrompt: document.getElementById("desmos-prompt"),
  desmosPromptFonts: [...document.querySelectorAll("[data-desmos-prompt-font]")],
  desmosModeButtons: [...document.querySelectorAll("[data-desmos-mode]")],
  desmosModePanels: [...document.querySelectorAll("[data-desmos-panel]")],
  desmosCalculator: document.getElementById("desmos-calculator"),
  desmosStart: document.getElementById("desmos-start"),
  desmosGuideToggle: document.getElementById("desmos-guide-toggle"),
  desmosGuideClose: document.getElementById("desmos-guide-close"),
  desmosGuide: document.getElementById("desmos-guide"),
  desmosFeedback: document.getElementById("desmos-feedback"),
  desmosHideAnswerToggle: document.getElementById("desmos-hide-answer-toggle"),
  desmosTimebarToggle: document.getElementById("desmos-timebar-toggle"),
  desmosSpeedrunDifficultyButtons: [...document.querySelectorAll("[data-speedrun-difficulty]")],
  desmosTypingDifficultyButtons: [...document.querySelectorAll("[data-typing-difficulty]")],
  mathTypingPanel: document.querySelector(".math-typing-panel"),
  mathTypingTest: document.getElementById("typingTest"),
  mathTypingWords: document.getElementById("words"),
  mathTypingInput: document.getElementById("wordsInput"),
  mathTypingRestart: document.getElementById("restartTestButton"),
  mathTypingWpm: document.getElementById("math-typing-wpm"),
  mathTypingAccuracy: document.getElementById("math-typing-accuracy"),
  mathTypingProgress: document.getElementById("math-typing-progress"),
  mathTypingResult: document.getElementById("mathTypingResult"),
  mathTypingResultWpm: document.getElementById("math-typing-result-wpm"),
  mathTypingResultAccuracy: document.getElementById("math-typing-result-accuracy"),
  mathTypingResultRaw: document.getElementById("math-typing-result-raw"),
  mathTypingResultTime: document.getElementById("math-typing-result-time"),
  mathTypingResultKey: document.getElementById("math-typing-result-key"),
  mathTypingResultWords: document.getElementById("math-typing-result-words"),
  settingsButton: document.getElementById("settings-button"),
  settingsOverlay: document.getElementById("settings-overlay"),
  settingsClose: document.getElementById("settings-close"),
  themeDark: document.getElementById("theme-dark"),
  themeLight: document.getElementById("theme-light"),
  floatingToggle: document.getElementById("floating-toggle"),
  shell: document.querySelector(".shell")
};

const state = {
  running: false,
  mode: "all",
  score: 0,
  streak: 0,
  level: 1,
  problemIndex: 0,
  time: 45,
  maxTime: 60,
  current: null,
  locked: false,
  lastFrame: performance.now(),
  formulaTime: 0,
  formulaPulse: 0
};

const desmosState = {
  running: false,
  score: 0,
  time: 45,
  maxTime: 60,
  current: null,
  inputEnabled: false,
  userLatex: [],
  locked: false,
  transitioning: false,
  advanceTimer: 0,
  advanceToken: 0,
  readyTimer: 0,
  promptToken: 0,
  promptHealthTime: 0,
  mode: "speedrun"
};

const mathTypingState = {
  words: [],
  results: [],
  typedTerms: [],
  index: 0,
  typed: "",
  startedAt: 0,
  completedAt: 0,
  wpmChars: 0,
  correctKeys: 0,
  incorrectKeys: 0,
  finished: false,
  resultVisible: false,
  latestResult: null,
  caretX: 0,
  caretY: 0,
  caretHeight: 22,
  caretReady: false
};

const appSettings = {
  theme: localStorage.getItem("bc-blitz-theme") || "dark",
  floatingNumbers: localStorage.getItem("bc-blitz-floating-numbers") !== "off"
};

const desmosSettings = {
  hideAnswerBox: localStorage.getItem("bc-blitz-desmos-hide-answer") === "on",
  timebar: localStorage.getItem("bc-blitz-desmos-timebar") !== "off",
  speedrunDifficulty: localStorage.getItem("bc-blitz-desmos-speedrun-difficulty") || "normal",
  typingDifficulty: localStorage.getItem("bc-blitz-desmos-typing-difficulty") || "normal"
};

const desmosSpeedrunDifficulty = {
  easy: { start: 75, max: 90, bonus: 7 },
  normal: { start: 60, max: 75, bonus: 5 },
  hard: { start: 45, max: 60, bonus: 4 }
};

const desmosTypingDifficulty = {
  easy: { words: 24 },
  normal: { words: 34 },
  hard: { words: 52 }
};

const keys = ["A", "B", "C", "D"];
const modeLabels = {
  derivative: "Derivative",
  integral: "Integrals",
  series: "Series",
  all: "All"
};

if (!desmosSpeedrunDifficulty[desmosSettings.speedrunDifficulty]) desmosSettings.speedrunDifficulty = "normal";
if (!desmosTypingDifficulty[desmosSettings.typingDifficulty]) desmosSettings.typingDifficulty = "normal";

const ctx = elements.canvas.getContext("2d");
const particles = [];
const formulae = [];
const sparks = [];
let mathQuill = null;
let embeddedDesmos = null;
let desmosPromptTooltip = null;
const desmosPromptTooltipSize = { width: 270, height: 48 };
const desmosAnswerExpressionId = "bc-blitz-desmos-answer";
const floatingColors = ["#23b26d", "#31b7d6", "#efb938", "#f5f1e7"];
const formulaPoolLimit = 132;
const formulaCycleRate = 0.33;
const goldenAngle = Math.PI * (3 - Math.sqrt(5));

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const pick = (items) => items[Math.floor(Math.random() * items.length)];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (start, end, amount) => start + (end - start) * amount;
const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const desmosPrompts = [
  { label: "Quadratic", latex: "y=x^2+3x-4", answer: "y=x^2+3x-4" },
  { label: "Square Root", latex: "y=\\sqrt{x+5}", answer: "y=sqrt(x+5)" },
  { label: "Fraction", latex: "y=\\frac{x+1}{x-2}", answer: "y=(x+1)/(x-2)" },
  { label: "Absolute Value", latex: "y=|x-3|", answer: "y=abs(x-3)" },
  { label: "Sine", latex: "y=2\\sin(x)", answer: "y=2sin(x)" },
  { label: "Cosine", latex: "y=\\cos(2x)", answer: "y=cos(2x)" },
  { label: "Natural Log", latex: "y=\\ln(x)+1", answer: "y=ln(x)+1" },
  { label: "Exponential", latex: "y=e^x-4", answer: "y=e^x-4" },
  { label: "Circle", latex: "x^2+y^2=25", answer: "x^2+y^2=25" },
  { label: "Line", latex: "y=\\frac{2}{3}x-5", answer: "y=(2/3)x-5" },
  { label: "Tangent", latex: "y=\\tan(x)", answer: "y=tan(x)" },
  { label: "Pi", latex: "y=\\pi x", answer: "y=pi x" },
  { label: "Restriction", latex: "y=x^2\\{x>0\\}", answer: "y=x^2{x>0}" },
  { label: "Composite", latex: "y=\\sqrt{x^2+1}", answer: "y=sqrt(x^2+1)" },
  {
    label: "Derivative",
    collegeboard: ["f(x)=x^3-4x", { type: "mixed", parts: ["derivative of ", { math: "f(x)" }] }],
    desmos: ["f(x)=x^3-4x", "f'(x)"],
    answer: ["f(x)=x^3-4x", "f'(x)"]
  },
  {
    label: "Rate of Change",
    collegeboard: ["f(x)=x^3-5x", { type: "mixed", parts: ["rate of change of ", { math: "f" }, " at ", { math: "x=2" }] }],
    desmos: ["f(x)=x^3-5x", "f'(2)"],
    answer: ["f(x)=x^3-5x", "f'(2)"]
  },
  {
    label: "Antiderivative",
    collegeboard: ["f(x)=6x^2-4", { type: "mixed", parts: ["antiderivative of ", { math: "f(x)" }] }],
    desmos: ["f(x)=6x^2-4", "\\int_0^x f(t)dt"],
    answer: ["f(x)=6x^2-4", "\\int_0^x f(t)dt"]
  },
  {
    label: "Net Change",
    collegeboard: ["v(t)=3t^2-2t", { type: "mixed", parts: ["net change on ", { math: "[0,4]" }] }],
    desmos: ["v(t)=3t^2-2t", "\\int_0^4 v(t)dt"],
    answer: ["v(t)=3t^2-2t", "\\int_0^4 v(t)dt"]
  },
  {
    label: "Function Area",
    collegeboard: ["f(x)=x^2+1", { type: "mixed", parts: ["area under ", { math: "f" }, " on ", { math: "[0,3]" }] }],
    desmos: ["f(x)=x^2+1", "\\int_0^3 f(x)dx"],
    answer: ["f(x)=x^2+1", "\\int_0^3 f(x)dx"]
  },
  {
    label: "Polar Area",
    collegeboard: ["r(\\theta)=2\\sin(\\theta)", { type: "mixed", parts: ["area of ", { math: "r(\\theta)" }, " on ", { math: "[0,\\pi]" }] }],
    desmos: ["r(\\theta)=2\\sin(\\theta)", "\\frac{1}{2}\\int_0^\\pi r(\\theta)^2d\\theta"],
    answer: ["r(\\theta)=2sin(\\theta)", "\\frac{1}{2}\\int_0^\\pi r(\\theta)^2d\\theta"]
  },
  {
    label: "Average Value",
    collegeboard: ["f(x)=\\ln(x)", { type: "mixed", parts: ["average value on ", { math: "[1,e]" }] }],
    desmos: ["f(x)=\\ln(x)", "\\frac{1}{e-1}\\int_1^e f(x)dx"],
    answer: ["f(x)=ln(x)", "\\frac{1}{e-1}\\int_1^e f(x)dx"]
  }
];

const mathTypingTerms = [
  "sqrt",
  "sqrt(x)",
  "x",
  "x^2",
  "x^3",
  "f(x)",
  "g(x)",
  "f'(x)",
  "g'(x)",
  "int",
  "int_0^1",
  "d/dx",
  "sin",
  "cos",
  "tan",
  "ln",
  "abs",
  "pi",
  "theta",
  "r(theta)"
];

function createFloatingFormulaLatex(category = "mixed") {
  const integralFormulas = [
    "\\int 1\\,dx",
    "\\int x\\,dx",
    "\\int x^2\\,dx",
    "\\int \\frac{1}{x}\\,dx",
    "\\int f(x)\\,dx",
    "\\int_a^b 1\\,dx",
    "\\int_0^1 x\\,dx",
    "\\int_a^b f(x)\\,dx",
    "\\int_0^1 f(x)\\,dx",
    "\\int_0^x f(t)\\,dt",
    "\\int e^x\\,dx",
    "\\int \\sin x\\,dx",
    "\\int \\cos x\\,dx",
    "\\int \\sec^2x\\,dx",
    "\\int_0^\\pi\\sin x\\,dx",
    "\\int_1^e \\frac{1}{x}\\,dx",
    "\\int_a^b f'(x)\\,dx",
    "\\int u\\,dv",
    "\\int r^2\\,d\\theta",
    "\\frac12\\int r^2\\,d\\theta",
    "\\int v(t)\\,dt"
  ];
  const derivativeFormulas = [
    "\\frac{d}{dx}x^n",
    "\\frac{d}{dx}e^x",
    "\\frac{d}{dx}\\ln x",
    "(\\sin x)'",
    "(\\cos x)'",
    "(\\tan x)'",
    "(fg)'",
    "(f\\circ g)'"
  ];
  const limitFormulas = [
    limitExpression("x\\to0", "\\frac{\\sin x}{x}"),
    limitExpression("x\\to0", "\\frac{\\tan x}{x}"),
    limitExpression("x\\to\\infty", "\\frac{1}{x}"),
    limitExpression("x\\to a", "f(x)"),
    limitExpression("n\\to\\infty", "a_n"),
    limitExpression("x\\to a", "\\frac{f(x)}{g(x)}")
  ];
  const parametricFormulas = [
    "\\frac{dy}{dx}",
    "\\frac{dx}{dt}",
    "\\frac{dy}{dt}",
    "x(t),\\ y(t)",
    "x=\\cos t,\\ y=\\sin t",
    "r=f(\\theta)",
    "r=1+\\cos\\theta",
    "r=2\\sin\\theta",
    "x=r\\cos\\theta",
    "y=r\\sin\\theta",
    "\\frac{dr}{d\\theta}"
  ];
  const vectorFormulas = [
    "\\vec r(t)",
    "\\vec v=\\vec r'",
    "\\vec a=\\vec r''",
    "|\\vec v|",
    "\\vec T",
    "\\vec v\\cdot\\vec w",
    "\\langle x,y\\rangle"
  ];
  const seriesFormulas = [
    "\\sum_{n=1}^{\\infty} a_n",
    "\\sum_{n=0}^{\\infty} x^n",
    "\\sum_{n=1}^{\\infty}\\frac{1}{n^2}",
    "\\sum_{n=1}^{\\infty} ar^{n-1}",
    "\\sum_{n=0}^{\\infty}\\frac{x^n}{n!}",
    "R=\\frac{1}{L}"
  ];
  const identityFormulas = [
    "e^{i\\pi}+1=0",
    "\\Delta x=\\frac{b-a}{n}",
    "\\frac{dV}{dt}=\\frac{dV}{dr}\\frac{dr}{dt}",
    "\\mathrm{BC}"
  ];

  const pools = {
    integral: integralFormulas,
    derivative: derivativeFormulas,
    limit: limitFormulas,
    parametric: parametricFormulas,
    vector: vectorFormulas,
    series: seriesFormulas,
    identity: identityFormulas
  };
  const fallback = ["integral", "derivative", "limit", "parametric", "vector", "identity"];
  return pick(pools[category] || pools[pick(fallback)]);
}

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
  return bottom === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${bottom}}`;
}

function piMultiple(numerator, denominator = 1) {
  const coefficient = fraction(numerator, denominator);
  if (coefficient === "1") return "\\pi";
  if (coefficient === "-1") return "-\\pi";
  return `${coefficient}\\pi`;
}

function limitExpression(condition, expression) {
  return `\\lim\\limits_{${condition}}${expression}`;
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

function textPart(value) {
  return { type: "text", value: String(value) };
}

function mathPart(latex) {
  return { type: "math", value: String(latex) };
}

function mathChoice(latex, value = latex) {
  return { type: "math", latex: String(latex), value: String(value) };
}

function textChoice(value) {
  return { type: "text", text: String(value), value: String(value) };
}

function normalizePrompt(prompt) {
  return Array.isArray(prompt) ? prompt : [mathPart(prompt)];
}

function normalizeChoice(choice) {
  if (choice && typeof choice === "object") {
    if (choice.type === "text") return textChoice(choice.text !== undefined ? choice.text : choice.value);
    const latex = choice.latex !== undefined ? choice.latex : choice.value;
    const value = choice.value !== undefined ? choice.value : choice.latex;
    return mathChoice(latex, value);
  }
  return mathChoice(choice);
}

function uniqueChoices(correct, distractors) {
  const values = [];
  const seen = new Set();
  const addChoice = (choice) => {
    const normalized = normalizeChoice(choice);
    if (seen.has(normalized.value)) return;
    seen.add(normalized.value);
    values.push(normalized);
  };

  addChoice(correct);
  for (const item of distractors) {
    addChoice(item);
  }

  let guard = 0;
  while (values.length < 4 && guard < 40) {
    guard += 1;
    const numeric = Number.parseFloat(normalizeChoice(correct).value);
    const fallback = Number.isFinite(numeric) ? String(numeric + pick([-6, -4, -3, -2, 2, 3, 4, 6])) : pick(["0", "1", "-1", "2"]);
    addChoice(fallback);
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
  const normalizedCorrect = normalizeChoice(correct);
  return {
    kind: "mc",
    topic,
    difficulty,
    prompt: normalizePrompt(prompt),
    correct: normalizedCorrect,
    correctValue: normalizedCorrect.value,
    choices: uniqueChoices(normalizedCorrect, distractors)
  };
}

function getMathQuill() {
  if (!mathQuill && window.MathQuill) {
    mathQuill = window.MathQuill.getInterface(2);
  }
  return mathQuill;
}

function renderStaticMath(target, latex, fresh = false) {
  let node = target;
  if (fresh) {
    node = target.cloneNode(false);
    target.replaceWith(node);
  }

  node.textContent = latex;
  node.classList.remove("math-fallback");

  const mq = getMathQuill();
  if (!mq) {
    node.classList.add("math-fallback");
    return node;
  }

  try {
    mq.StaticMath(node);
    if (!node.innerHTML.trim()) {
      node.textContent = latex;
      node.classList.add("math-fallback");
    }
  } catch {
    node.textContent = latex;
    node.classList.add("math-fallback");
  }

  return node;
}

function renderDataLatex(root = document, options = {}) {
  const { force = false, skipHidden = false } = options;
  root.querySelectorAll("[data-latex]").forEach((node) => {
    if (skipHidden && node.closest("[hidden]")) return;
    if (!force && node.dataset.mathRendered === "true") return;
    const rendered = renderStaticMath(node, node.dataset.latex, force);
    rendered.dataset.mathRendered = "true";
  });
}

function renderDesmosGuideMath(root) {
  root.querySelectorAll("[data-latex]").forEach((node) => {
    const rendered = renderStaticMath(node, node.dataset.latex, true);
    rendered.dataset.mathRendered = "true";
  });
}

function setDesmosGuideVisible(visible) {
  elements.desmosGuide.hidden = !visible;
  elements.desmosGuideToggle.setAttribute("aria-expanded", String(visible));
  document.body.classList.toggle("guide-open", visible);
  if (visible) {
    window.requestAnimationFrame(() => {
      renderDesmosGuideMath(elements.desmosGuide);
      elements.desmosGuideClose.focus();
    });
  }
}

function initEmbeddedDesmos() {
  if (embeddedDesmos || !elements.desmosCalculator) return embeddedDesmos;
  if (!window.Desmos) {
    setDesmosFeedback("Desmos is still loading...", "bad");
    return null;
  }

  embeddedDesmos = Desmos.GraphingCalculator(elements.desmosCalculator, {
    expressions: true,
    keypad: true,
    settingsMenu: false,
    zoomButtons: true,
    expressionsTopbar: false,
    lockViewport: false
  });

  embeddedDesmos.observeEvent("change", syncDesmosAnswerFromCalculator);
  syncDesmosAnswerFromCalculator();
  applyDesmosSettings();
  return embeddedDesmos;
}

function syncDesmosAnswerFromCalculator() {
  if (!embeddedDesmos) return;
  desmosState.userLatex = embeddedDesmos
    .getExpressions()
    .map((expression) => String(expression.latex || "").trim())
    .filter(Boolean);
  if (desmosState.transitioning) return;
  checkDesmosLiveAnswer();
}

function setDesmosAnswerEnabled(enabled) {
  desmosState.inputEnabled = enabled;
  elements.desmosCalculator.classList.toggle("desmos-disabled", !enabled);
}

function clearDesmosAnswer() {
  desmosState.userLatex = [];
  if (!embeddedDesmos) return;
  try {
    const expressions = embeddedDesmos.getExpressions().filter((expression) => expression.id);
    if (expressions.length && typeof embeddedDesmos.removeExpressions === "function") {
      embeddedDesmos.removeExpressions(expressions.map((expression) => ({ id: expression.id })));
    }
  } catch {
    desmosState.userLatex = [];
  }

  try {
    if (typeof embeddedDesmos.setExpression === "function") {
      embeddedDesmos.setExpression({ id: desmosAnswerExpressionId, latex: "" });
    }
  } catch {
    desmosState.userLatex = [];
  }
}

function getDesmosAnswer() {
  if (embeddedDesmos) syncDesmosAnswerFromCalculator();
  return desmosState.userLatex;
}

function focusDesmosAnswer() {
  if (embeddedDesmos && typeof embeddedDesmos.focusFirstExpression === "function") {
    embeddedDesmos.focusFirstExpression();
    window.requestAnimationFrame(() => {
      if (embeddedDesmos && typeof embeddedDesmos.focusFirstExpression === "function") {
        embeddedDesmos.focusFirstExpression();
      }
    });
    window.setTimeout(() => {
      if (embeddedDesmos && typeof embeddedDesmos.focusFirstExpression === "function") {
        embeddedDesmos.focusFirstExpression();
      }
    }, 90);
  }
}

function selectDesmosAnswer() {
  focusDesmosAnswer();
}

function desmosLatexToText(value) {
  let text = String(value || "")
    .replace(/\s+/g, "")
    .replace(/\\left/g, "")
    .replace(/\\right/g, "")
    .replace(/\\cdot|\\times/g, "*")
    .replace(/\\pi/g, "pi")
    .replace(/\\\{/g, "{")
    .replace(/\\\}/g, "}")
    .replace(/\\lvert|\\rvert/g, "|");

  let previous = "";
  while (text !== previous) {
    previous = text;
    text = text
      .replace(/\^\{([^{}]+)\}/g, "^$1")
      .replace(/_\{([^{}]+)\}/g, "_$1")
      .replace(/\\sqrt\{([^{}]+)\}/g, "sqrt($1)")
      .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1)/($2)")
      .replace(/\|([^|]+)\|/g, "abs($1)");
  }

  return text.replace(/\\(sin|cos|tan|ln|log|sqrt|abs)/g, "$1");
}

function canonicalizeSimpleFractions(value) {
  let text = String(value || "");
  let previous = "";
  while (text !== previous) {
    previous = text;
    text = text
      .replace(/\(([-+]?\d+)([a-z](?:\^\d+)?)\)\/\(([-+]?\d+)\)/g, "$1/$3$2")
      .replace(/\(([-+]?\d+)([a-z](?:\^\d+)?)\)\/([-+]?\d+)/g, "$1/$3$2")
      .replace(/([-+]?\d+)([a-z](?:\^\d+)?)\/([-+]?\d+)/g, "$1/$3$2")
      .replace(/\(([-+]?\d+)\/([-+]?\d+)\)([a-z](?:\^\d+)?)/g, "$1/$2$3");
  }
  return text;
}

function normalizeDesmosInput(value) {
  return canonicalizeSimpleFractions(desmosLatexToText(value)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\u03c0/g, "pi")
    .replace(/\u03b8/g, "theta")
    .replace(/\\pi/g, "pi")
    .replace(/\\theta/g, "theta")
    .replace(/\u2212/g, "-")
    .replace(/\u00f7/g, "/")
    .replace(/\u00d7/g, "*")
    .replace(/[{}]/g, "")
    .replace(/\*/g, ""))
    .replace(/abs\(([^()]+)\)/g, "abs$1")
    .replace(/\|([^|]+)\|/g, "abs$1")
    .replace(/\(([^()+\-*/]+)\)/g, "$1")
    .replace(/[()]/g, "");
}

function desmosLineList(value) {
  return (Array.isArray(value) ? value : [value]).map((line) => String(line || ""));
}

function desmosPromptLineList(value) {
  return Array.isArray(value) ? value : [value];
}

function normalizeDesmosLines(value) {
  return desmosLineList(value).map(normalizeDesmosInput).filter(Boolean);
}

function desmosLinesMatch(typedLines, expectedLines) {
  if (typedLines.length !== expectedLines.length) return false;
  return expectedLines.every((line, index) => typedLines[index] === line);
}

function pickDesmosPrompt() {
  let prompt = pick(desmosPrompts);
  if (desmosPrompts.length > 1) {
    while (prompt === desmosState.current) prompt = pick(desmosPrompts);
  }
  return prompt;
}

function clearPendingDesmosAdvance() {
  if (desmosState.advanceTimer) {
    window.clearTimeout(desmosState.advanceTimer);
    desmosState.advanceTimer = 0;
  }
}

function clearPendingDesmosReady() {
  if (desmosState.readyTimer) {
    window.clearTimeout(desmosState.readyTimer);
    desmosState.readyTimer = 0;
  }
}

function clearPendingDesmosTimers() {
  clearPendingDesmosAdvance();
  clearPendingDesmosReady();
}

function nextDesmosPrompt() {
  clearPendingDesmosTimers();
  const nextPrompt = pickDesmosPrompt();
  const promptToken = desmosState.promptToken + 1;
  desmosState.promptToken = promptToken;
  desmosState.promptHealthTime = 0;
  desmosState.transitioning = true;
  desmosState.locked = true;
  desmosState.current = nextPrompt;
  try {
    elements.desmosLabel.textContent = nextPrompt.label;
    renderDesmosPromptFonts(nextPrompt);
    setDesmosFeedback("");
    clearDesmosAnswer();
  } catch {
    renderDesmosPromptFallback(nextPrompt);
    ensureDesmosPromptCardsFilled(nextPrompt);
    setDesmosFeedback("");
    desmosState.userLatex = [];
  }

  desmosState.readyTimer = window.setTimeout(() => {
    desmosState.readyTimer = 0;
    if (!desmosState.running || desmosState.current !== nextPrompt || desmosState.promptToken !== promptToken) return;
    ensureDesmosPromptCardsFilled(nextPrompt);
    desmosState.userLatex = [];
    desmosState.transitioning = false;
    desmosState.locked = false;
    focusDesmosAnswer();
  }, 120);
}

function scheduleNextDesmosPrompt(previousPrompt) {
  clearPendingDesmosAdvance();
  const token = desmosState.advanceToken + 1;
  desmosState.advanceToken = token;
  desmosState.advanceTimer = window.setTimeout(() => {
    desmosState.advanceTimer = 0;
    if (!desmosState.running || desmosState.current !== previousPrompt || desmosState.advanceToken !== token) return;
    nextDesmosPrompt();
  }, 1000);
}

function isDesmosSpeedrunTimerActive() {
  return desmosSettings.timebar
    && desmosState.running
    && desmosState.mode === "speedrun"
    && elements.desmosPage.classList.contains("active");
}

function updateDesmosTimerView() {
  const active = isDesmosSpeedrunTimerActive();
  document.body.classList.toggle("desmos-speedrun-view", active);
  if (active) {
    elements.timeBar.style.transform = `scaleX(${clamp(desmosState.time / desmosState.maxTime, 0, 1)})`;
  }
}

function flashDesmosTime() {
  flashTime();
  updateDesmosTimerView();
}

function getPromptCardContent(prompt, target) {
  if (target.closest(".prompt-mathquill")) {
    return prompt.desmos || prompt.desmosLatex || prompt.latex;
  }
  return prompt.collegeboard || prompt.latex;
}

function getDesmosPromptCards() {
  if (!elements.desmosPrompt) return [];
  return [...elements.desmosPrompt.querySelectorAll(".prompt-font-card")];
}

function createDesmosPromptFontNode() {
  const node = document.createElement("span");
  node.className = "math-render desmos-prompt-font";
  node.setAttribute("data-desmos-prompt-font", "");
  return node;
}

function renderDesmosPromptFonts(prompt) {
  elements.desmosPromptFonts = getDesmosPromptCards().map((card) => renderDesmosPromptCard(card, prompt));
  ensureDesmosPromptCardsFilled(prompt);
}

function renderDesmosPromptCard(card, prompt) {
  const node = createDesmosPromptFontNode();
  card.replaceChildren(node);
  const source = getPromptCardContent(prompt, card);

  try {
    return renderDesmosPromptMathSet(node, source, prompt);
  } catch {
    return renderDesmosPromptFallback(prompt, node, source);
  }
}

function renderDesmosPromptMathSet(node, latex, prompt = null) {
  const lines = desmosPromptLineList(latex);
  node.classList.toggle("prompt-multiline", lines.length > 1);

  if (lines.length === 1) {
    renderDesmosPromptLine(node, lines[0]);
    return ensureDesmosPromptVisible(node, latex, prompt);
  }

  node.innerHTML = "";
  node.classList.remove("math-fallback");
  lines.forEach((line) => {
    const lineNode = document.createElement("span");
    lineNode.className = "math-render desmos-prompt-line";
    node.appendChild(lineNode);
    renderDesmosPromptLine(lineNode, line);
  });

  return ensureDesmosPromptVisible(node, latex, prompt);
}

function renderDesmosPromptLine(node, line) {
  if (line && typeof line === "object" && line.type === "text") return renderDesmosPromptText(node, line.value);
  if (line && typeof line === "object" && line.type === "mixed") return renderDesmosPromptMixed(node, line.parts);
  return renderDesmosPromptMath(node, line);
}

function renderDesmosPromptText(node, text) {
  node.classList.remove("math-render");
  node.classList.add("desmos-prompt-text-line");
  node.textContent = String(text || "");
  return node;
}

function renderDesmosPromptMixed(node, parts) {
  node.classList.remove("math-render");
  node.classList.add("desmos-prompt-text-line", "desmos-prompt-mixed-line");
  node.innerHTML = "";

  for (const part of parts || []) {
    if (part && typeof part === "object" && part.math) {
      const mathNode = document.createElement("span");
      mathNode.className = "math-render desmos-prompt-inline-math";
      node.appendChild(mathNode);
      renderDesmosPromptMath(mathNode, part.math);
    } else {
      const textNode = document.createElement("span");
      textNode.textContent = String(part || "");
      node.appendChild(textNode);
    }
  }

  return node;
}

function renderDesmosPromptMath(node, latex) {
  node.innerHTML = "";
  node.classList.remove("math-fallback");

  const mq = getMathQuill();
  if (!mq) {
    node.textContent = latex;
    node.classList.add("math-fallback");
    return node;
  }

  try {
    const rendered = mq.StaticMath(node);
    if (rendered && typeof rendered.latex === "function") rendered.latex(latex);
    if (!node.querySelector(".mq-root-block") || !node.textContent.trim()) {
      node.textContent = latex;
      node.classList.add("math-fallback");
    }
  } catch {
    node.textContent = latex;
    node.classList.add("math-fallback");
  }

  return node;
}

function desmosPromptPlainText(value) {
  if (Array.isArray(value)) return value.map(desmosPromptPlainText).filter(Boolean).join("\n");
  if (value && typeof value === "object") {
    if (value.type === "text") return String(value.value || "");
    if (value.type === "mixed") return (value.parts || []).map(desmosPromptPlainText).join("");
    if (value.math) return String(value.math);
  }
  return String(value || "");
}

function ensureDesmosPromptVisible(node, source, prompt) {
  if (node.textContent.trim()) return node;
  const fallback = desmosPromptPlainText(source || (prompt && prompt.latex) || (prompt && prompt.answer) || "");
  node.classList.add("math-fallback");
  node.textContent = fallback || "new problem";
  return node;
}

function renderDesmosPromptFallback(prompt, node = null, source = null) {
  let target = node || elements.desmosPromptFonts[0] || getDesmosPromptCards()[0];
  if (!target) return null;
  if (target.classList.contains("prompt-font-card")) {
    const nextNode = createDesmosPromptFontNode();
    target.replaceChildren(nextNode);
    target = nextNode;
  }
  const fallback = desmosPromptPlainText(source || (prompt && (prompt.collegeboard || prompt.latex || prompt.answer)) || "");
  target.className = "math-render desmos-prompt-font math-fallback";
  target.setAttribute("data-desmos-prompt-font", "");
  target.textContent = fallback || "new problem";
  return target;
}

function ensureDesmosPromptCardsFilled(prompt = desmosState.current) {
  if (!prompt) return false;
  const cards = getDesmosPromptCards();
  if (!cards.length) return false;

  cards.forEach((card) => {
    if (!card.textContent.trim()) renderDesmosPromptCard(card, prompt);
  });

  return cards.every((card) => card.textContent.trim());
}

function renderDesmosIntroPrompt() {
  const labels = ["collegeboard font", "desmos font"];
  elements.desmosPromptFonts = getDesmosPromptCards().map((card, index) => {
    const node = createDesmosPromptFontNode();
    node.textContent = labels[index] || "";
    card.replaceChildren(node);
    return node;
  });
}

function getDesmosPromptTooltip() {
  if (!desmosPromptTooltip) {
    desmosPromptTooltip = document.createElement("div");
    desmosPromptTooltip.className = "desmos-hover-tooltip";
    desmosPromptTooltip.setAttribute("role", "tooltip");
    document.body.appendChild(desmosPromptTooltip);
  }
  return desmosPromptTooltip;
}

function positionDesmosPromptTooltip(event) {
  if (!desmosPromptTooltip) return;
  const offset = 14;
  const margin = 10;
  let x = event.clientX + offset;
  let y = event.clientY + offset;

  if (x + desmosPromptTooltipSize.width > window.innerWidth - margin) {
    x = event.clientX - desmosPromptTooltipSize.width - offset;
  }
  if (y + desmosPromptTooltipSize.height > window.innerHeight - margin) {
    y = event.clientY - desmosPromptTooltipSize.height - offset;
  }

  desmosPromptTooltip.style.transform = `translate3d(${Math.max(margin, x)}px, ${Math.max(margin, y)}px, 0)`;
}

function showDesmosPromptTooltip(event) {
  const message = event.currentTarget.dataset.desmosTooltip;
  if (!message) return;
  const tooltip = getDesmosPromptTooltip();
  tooltip.textContent = message;
  tooltip.classList.add("visible");
  const rect = tooltip.getBoundingClientRect();
  desmosPromptTooltipSize.width = rect.width;
  desmosPromptTooltipSize.height = rect.height;
  positionDesmosPromptTooltip(event);
}

function hideDesmosPromptTooltip() {
  if (desmosPromptTooltip) desmosPromptTooltip.classList.remove("visible");
}

function initDesmosPromptTooltips() {
  if (!elements.desmosPrompt) return;
  elements.desmosPrompt.querySelectorAll("[data-desmos-tooltip]").forEach((card) => {
    card.addEventListener("mouseenter", showDesmosPromptTooltip);
    card.addEventListener("mousemove", positionDesmosPromptTooltip);
    card.addEventListener("mouseleave", hideDesmosPromptTooltip);
  });
}

function setDesmosFeedback(message, tone = "") {
  elements.desmosFeedback.textContent = message;
  elements.desmosFeedback.className = `desmos-result-mark ${tone}`.trim();
}

function checkDesmosLiveAnswer() {
  if (!desmosState.running || !desmosState.current || !desmosState.inputEnabled || desmosState.locked || desmosState.transitioning) return;
  const typed = normalizeDesmosLines(desmosState.userLatex);
  if (!typed.length) {
    setDesmosFeedback("");
    return;
  }

  const expected = normalizeDesmosLines(desmosState.current.answer);
  if (desmosLinesMatch(typed, expected)) {
    const timing = desmosSpeedrunDifficulty[desmosSettings.speedrunDifficulty] || desmosSpeedrunDifficulty.normal;
    desmosState.locked = true;
    desmosState.score += 1;
    if (desmosSettings.timebar) desmosState.time = clamp(desmosState.time + timing.bonus, 0, desmosState.maxTime);
    setDesmosFeedback("✓ correct", "good");
    flashDesmosTime();
    spawnFormulaBurst(18, true);
    scheduleNextDesmosPrompt(desmosState.current);
    return;
  }

  setDesmosFeedback("×", "bad");
}

function startDesmosSpeedrun() {
  if (!initEmbeddedDesmos()) {
    setDesmosFeedback("Desmos calculator did not load yet.", "bad");
    return;
  }
  clearPendingDesmosTimers();
  const timing = desmosSpeedrunDifficulty[desmosSettings.speedrunDifficulty] || desmosSpeedrunDifficulty.normal;
  desmosState.running = true;
  desmosState.score = 0;
  desmosState.time = timing.start;
  desmosState.maxTime = timing.max;
  desmosState.locked = false;
  desmosState.transitioning = false;
  desmosState.advanceToken += 1;
  desmosState.promptToken += 1;
  elements.desmosStart.textContent = "Restart";
  setDesmosAnswerEnabled(true);
  setDesmosFeedback("");
  updateDesmosTimerView();
  nextDesmosPrompt();
}

function endDesmosSpeedrun(options = {}) {
  clearPendingDesmosTimers();
  desmosState.running = false;
  desmosState.transitioning = false;
  desmosState.advanceToken += 1;
  desmosState.promptToken += 1;
  elements.desmosStart.textContent = "Start";
  setDesmosAnswerEnabled(false);
  desmosState.locked = true;
  elements.desmosLabel.textContent = "";
  renderDesmosIntroPrompt();
  if (!options.preserveFeedback) setDesmosFeedback("");
  updateDesmosTimerView();
}

function setDesmosMode(mode) {
  const nextMode = ["speedrun", "typing", "settings"].includes(mode) ? mode : "speedrun";
  desmosState.mode = nextMode;

  elements.desmosModeButtons.forEach((button) => {
    const active = button.dataset.desmosMode === nextMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  elements.desmosModePanels.forEach((panel) => {
    const active = panel.dataset.desmosPanel === nextMode;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });

  if (nextMode !== "speedrun" && desmosState.running) endDesmosSpeedrun();

  if (nextMode === "typing") {
    window.requestAnimationFrame(() => {
      if (elements.mathTypingInput) elements.mathTypingInput.focus();
      updateMathTypingCaret();
    });
    return;
  }

  if (nextMode === "speedrun") window.setTimeout(initEmbeddedDesmos, 0);
}

function buildMathTypingWords(count = null) {
  const targetCount = count || (desmosTypingDifficulty[desmosSettings.typingDifficulty] || desmosTypingDifficulty.normal).words;
  const words = [];
  let previous = "";
  for (let i = 0; i < targetCount; i += 1) {
    let next = pick(mathTypingTerms);
    let guard = 0;
    while (next === previous && guard < 12) {
      guard += 1;
      next = pick(mathTypingTerms);
    }
    words.push(next);
    previous = next;
  }
  return words;
}

function resetMathTypingGame() {
  if (elements.mathTypingTest) elements.mathTypingTest.classList.remove("result-visible");
  if (elements.mathTypingResult) elements.mathTypingResult.hidden = true;
  mathTypingState.words = buildMathTypingWords();
  mathTypingState.results = [];
  mathTypingState.typedTerms = [];
  mathTypingState.index = 0;
  mathTypingState.typed = "";
  mathTypingState.startedAt = 0;
  mathTypingState.completedAt = 0;
  mathTypingState.wpmChars = 0;
  mathTypingState.correctKeys = 0;
  mathTypingState.incorrectKeys = 0;
  mathTypingState.finished = false;
  mathTypingState.resultVisible = false;
  mathTypingState.latestResult = null;
  mathTypingState.caretX = 0;
  mathTypingState.caretY = 0;
  mathTypingState.caretHeight = 22;
  mathTypingState.caretReady = false;
  if (elements.mathTypingInput) {
    elements.mathTypingInput.disabled = false;
    elements.mathTypingInput.value = "";
  }
  renderMathTypingGame();
}

function isMathTypingActive() {
  return elements.mathTypingPanel && !elements.mathTypingPanel.hidden && desmosState.mode === "typing";
}

function restartMathTypingGame() {
  resetMathTypingGame();
  if (elements.mathTypingInput) elements.mathTypingInput.focus();
}

function getMathTypingElapsedMs() {
  if (!mathTypingState.startedAt) return 0;
  const endTime = mathTypingState.completedAt || performance.now();
  return Math.max(1, endTime - mathTypingState.startedAt);
}

function getMathTypingCharStats() {
  const stats = { correct: 0, incorrect: 0, missing: 0, extra: 0 };
  mathTypingState.words.forEach((term, index) => {
    const typed = mathTypingState.typedTerms[index] || "";
    [...term].forEach((char, charIndex) => {
      const typedChar = typed[charIndex];
      if (!typedChar) {
        if (index < mathTypingState.index) stats.missing += 1;
      } else if (typedChar === char) {
        stats.correct += 1;
      } else {
        stats.incorrect += 1;
      }
    });
    if (typed.length > term.length) stats.extra += typed.length - term.length;
  });
  return stats;
}

function getMathTypingResult() {
  const elapsedMs = getMathTypingElapsedMs();
  const minutes = elapsedMs / 60000;
  const keyCount = mathTypingState.correctKeys + mathTypingState.incorrectKeys;
  const charStats = getMathTypingCharStats();
  const wpm = minutes > 0 ? Math.round((mathTypingState.wpmChars / 5) / minutes) : 0;
  const raw = minutes > 0 ? Math.round((keyCount / 5) / minutes) : 0;
  const accuracy = keyCount ? Math.round((mathTypingState.correctKeys / keyCount) * 100) : 100;

  return {
    wpm,
    raw,
    accuracy,
    timeSeconds: elapsedMs / 1000,
    key: `${charStats.correct}/${charStats.incorrect}/${charStats.missing}/${charStats.extra}`,
    charStats
  };
}

function recordMathTypingKeys(nextValue) {
  const previous = mathTypingState.typed;
  if (nextValue.length <= previous.length) return;

  const expected = mathTypingState.words[mathTypingState.index] || "";
  const added = nextValue.slice(previous.length);
  for (let i = 0; i < added.length; i += 1) {
    const char = added[i];
    if (/\s/.test(char)) continue;

    const typedIndex = previous.length + i;
    if (char === expected[typedIndex]) {
      mathTypingState.correctKeys += 1;
    } else {
      mathTypingState.incorrectKeys += 1;
    }
  }
}

function completeMathTypingTerm(rawTyped, options = {}) {
  if (mathTypingState.finished) return;
  const expected = mathTypingState.words[mathTypingState.index];
  const typed = String(rawTyped || "").trim();
  if (!expected || !typed) {
    if (elements.mathTypingInput) elements.mathTypingInput.value = "";
    mathTypingState.typed = "";
    renderMathTypingGame();
    return;
  }

  if (!mathTypingState.startedAt) mathTypingState.startedAt = performance.now();

  const isCorrect = typed === expected;
  if (options.countSubmitKey) {
    if (isCorrect) {
      mathTypingState.correctKeys += 1;
    } else {
      mathTypingState.incorrectKeys += 1;
    }
  }
  if (isCorrect) mathTypingState.wpmChars += expected.length + 1;
  mathTypingState.results[mathTypingState.index] = isCorrect;
  mathTypingState.typedTerms[mathTypingState.index] = typed;
  mathTypingState.index += 1;
  mathTypingState.typed = "";

  if (elements.mathTypingInput) elements.mathTypingInput.value = "";

  if (mathTypingState.index >= mathTypingState.words.length) {
    mathTypingState.finished = true;
    mathTypingState.completedAt = performance.now();
  }

  renderMathTypingGame();
  if (mathTypingState.finished) showMathTypingResult();
}

function appendMathTypingLetter(word, char, className = "") {
  const letter = document.createElement("letter");
  letter.textContent = char;
  if (className) letter.className = className;
  word.appendChild(letter);
}

function renderMathTypingWord(term, index) {
  const word = document.createElement("span");
  word.className = "math-type-word word";
  word.dataset.wordindex = String(index);

  if (index < mathTypingState.index) {
    const typed = mathTypingState.typedTerms[index] || "";
    const isCorrect = Boolean(mathTypingState.results[index]);
    word.classList.add("typed", isCorrect ? "complete" : "error");
    if (!isCorrect) word.classList.add("missed");
    [...term].forEach((char, charIndex) => {
      const typedChar = typed[charIndex];
      appendMathTypingLetter(word, char, typedChar ? (typedChar === char ? "correct" : "incorrect") : "missing");
    });
    if (typed.length > term.length) {
      [...typed.slice(term.length)].forEach((char) => appendMathTypingLetter(word, char, "incorrect extra"));
    }
    return word;
  }

  if (index !== mathTypingState.index) {
    [...term].forEach((char) => appendMathTypingLetter(word, char));
    return word;
  }

  word.classList.add("active");
  const typed = mathTypingState.typed;
  [...term].forEach((char, charIndex) => {
    if (charIndex === typed.length) {
      const caret = document.createElement("span");
      caret.className = "math-type-caret-marker";
      word.appendChild(caret);
    }
    appendMathTypingLetter(word, char, typed[charIndex] ? (typed[charIndex] === char ? "correct" : "incorrect") : "");
  });

  if (typed.length > term.length) {
    [...typed.slice(term.length)].forEach((char) => appendMathTypingLetter(word, char, "incorrect extra"));
  }

  if (typed.length >= term.length) {
    const caret = document.createElement("span");
    caret.className = "math-type-caret-marker";
    word.appendChild(caret);
  }

  return word;
}

function renderMathTypingResultWords() {
  if (!elements.mathTypingResultWords) return;
  elements.mathTypingResultWords.innerHTML = "";
  mathTypingState.words.forEach((term, index) => {
    elements.mathTypingResultWords.appendChild(renderMathTypingWord(term, index));
  });
}

function showMathTypingResult() {
  const result = getMathTypingResult();
  mathTypingState.latestResult = result;
  mathTypingState.resultVisible = true;

  if (elements.mathTypingTest) elements.mathTypingTest.classList.add("result-visible");
  if (elements.mathTypingInput) {
    elements.mathTypingInput.disabled = true;
    elements.mathTypingInput.value = "";
  }

  if (elements.mathTypingResultWpm) elements.mathTypingResultWpm.textContent = String(result.wpm);
  if (elements.mathTypingResultAccuracy) elements.mathTypingResultAccuracy.textContent = `${result.accuracy}%`;
  if (elements.mathTypingResultRaw) elements.mathTypingResultRaw.textContent = String(result.raw);
  if (elements.mathTypingResultTime) elements.mathTypingResultTime.textContent = `${result.timeSeconds.toFixed(1)}s`;
  if (elements.mathTypingResultKey) elements.mathTypingResultKey.textContent = result.key;
  renderMathTypingResultWords();

  if (elements.mathTypingResult) {
    elements.mathTypingResult.hidden = false;
    window.requestAnimationFrame(() => elements.mathTypingResult.focus({ preventScroll: true }));
  }
}

function updateMathTypingCaret() {
  if (!elements.mathTypingWords) return;
  const caret = elements.mathTypingWords.querySelector(".math-typing-caret");
  const marker = elements.mathTypingWords.querySelector(".math-type-caret-marker");
  if (!caret || !marker || mathTypingState.finished) {
    if (caret) caret.hidden = true;
    return;
  }

  const rootRect = elements.mathTypingWords.getBoundingClientRect();
  const markerRect = marker.getBoundingClientRect();
  const x = markerRect.left - rootRect.left;
  const y = markerRect.top - rootRect.top;
  const height = Math.max(18, markerRect.height);

  if (!mathTypingState.caretReady) {
    caret.style.transition = "none";
    caret.style.height = `${height}px`;
    caret.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    caret.hidden = false;
    caret.offsetHeight;
    caret.style.transition = "";
  } else {
    caret.style.height = `${height}px`;
    caret.hidden = false;
    caret.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  mathTypingState.caretX = x;
  mathTypingState.caretY = y;
  mathTypingState.caretHeight = height;
  mathTypingState.caretReady = true;
}

function renderMathTypingGame() {
  if (!elements.mathTypingWords) return;

  elements.mathTypingWords.innerHTML = "";
  mathTypingState.words.forEach((term, index) => {
    elements.mathTypingWords.appendChild(renderMathTypingWord(term, index));
  });

  const caret = document.createElement("span");
  caret.className = "math-typing-caret";
  if (mathTypingState.caretReady) {
    caret.style.height = `${mathTypingState.caretHeight}px`;
    caret.style.transform = `translate3d(${mathTypingState.caretX}px, ${mathTypingState.caretY}px, 0)`;
    caret.hidden = false;
  } else {
    caret.hidden = true;
  }
  elements.mathTypingWords.appendChild(caret);

  const result = getMathTypingResult();

  if (elements.mathTypingWpm) elements.mathTypingWpm.textContent = String(result.wpm);
  if (elements.mathTypingAccuracy) elements.mathTypingAccuracy.textContent = String(result.accuracy);
  if (elements.mathTypingProgress) {
    elements.mathTypingProgress.textContent = `${Math.min(mathTypingState.index, mathTypingState.words.length)}/${mathTypingState.words.length}`;
  }

  window.requestAnimationFrame(updateMathTypingCaret);
}

function handleMathTypingInput() {
  if (!elements.mathTypingInput || mathTypingState.finished) return;
  if (!mathTypingState.startedAt && elements.mathTypingInput.value) mathTypingState.startedAt = performance.now();

  const value = elements.mathTypingInput.value;
  recordMathTypingKeys(value);
  if (/\s/.test(value)) {
    completeMathTypingTerm(value.split(/\s+/)[0], { countSubmitKey: true });
    return;
  }

  const expected = mathTypingState.words[mathTypingState.index] || "";
  const isLastTerm = mathTypingState.index === mathTypingState.words.length - 1;
  if (isLastTerm && value === expected) {
    completeMathTypingTerm(value);
    return;
  }

  mathTypingState.typed = value;
  renderMathTypingGame();
}

function renderPrompt(target, parts) {
  target.innerHTML = "";
  for (const part of parts) {
    const span = document.createElement("span");
    if (part.type === "text") {
      span.className = "question-text";
      span.textContent = part.value;
    } else {
      span.className = "math-render question-math";
      renderStaticMath(span, part.value);
    }
    target.appendChild(span);
  }
}

function renderChoiceLabel(target, choice) {
  target.innerHTML = "";
  if (choice.type === "text") {
    target.classList.add("choice-text");
    target.textContent = choice.text;
    return;
  }

  target.classList.add("math-render", "choice-math");
  renderStaticMath(target, choice.latex);
}

function setFeedback(message, tone = "", answerChoice = null) {
  elements.feedback.innerHTML = "";
  elements.feedback.className = `feedback ${tone}`.trim();

  const messageNode = document.createElement("span");
  messageNode.textContent = message;
  elements.feedback.appendChild(messageNode);

  if (!answerChoice) return;

  const answerNode = document.createElement("span");
  answerNode.className = "feedback-answer";
  renderChoiceLabel(answerNode, answerChoice);
  elements.feedback.append(" ");
  elements.feedback.appendChild(answerNode);
}

function normalizeTypedAnswer(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\u03c0/g, "pi")
    .replace(/\\pi/g, "pi")
    .replace(/\\frac\{(-?\d+)\}\{(-?\d+)\}/g, "$1/$2")
    .replace(/\\left|\\right/g, "")
    .replace(/[{}()\s*]/g, "")
    .replace(/,/g, "");
}

function makeFRQ(topic, difficulty, prompt, correct, acceptedAnswers) {
  const normalizedCorrect = normalizeChoice(correct);
  const accepted = [normalizedCorrect.value, ...(acceptedAnswers || [])].map(normalizeTypedAnswer);
  return {
    kind: "frq",
    category: "frq",
    topic,
    difficulty,
    prompt: normalizePrompt(prompt),
    correct: normalizedCorrect,
    correctValue: normalizedCorrect.value,
    accepted
  };
}

const generators = [
  {
    category: "derivative",
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
        [textPart("If "), mathPart(`f(x)=${a}x^2+${b}x`), textPart(", what is "), mathPart(`f'(${x})`), textPart("?")],
        correct,
        [correct + a, correct - b, 2 * a + b, a * x + b]
      );
    }
  },
  {
    category: "derivative",
    min: 1,
    max: 2,
    build() {
      const a = Math.floor(rand(2, 9));
      const n = Math.floor(rand(2, 5));
      const correct = `${a * n}x^${n - 1}`;
      return makeQuestion(
        "Power Rule",
        1,
        [textPart("Differentiate "), mathPart(`${a}x^${n}`), textPart(".")],
        correct,
        [`${a + n}x^${n - 1}`, `${a * n}x^${n}`, `${a}x^${n - 1}`, `${n}x^${a - 1}`]
      );
    }
  },
  {
    category: "integral",
    min: 1,
    max: 3,
    build() {
      const n = Math.floor(rand(2, 7));
      const correct = fraction(1, n + 1);
      return makeQuestion(
        "Integrals",
        2,
        [textPart("Evaluate "), mathPart(`\\int_{0}^{1}x^{${n}}dx`), textPart(".")],
        correct,
        [fraction(1, n), fraction(n, n + 1), `${n + 1}`, fraction(1, n + 2)]
      );
    }
  },
  {
    category: "integral",
    min: 2,
    max: 4,
    build() {
      const a = Math.floor(rand(1, 6));
      const b = Math.floor(rand(1, 7));
      const correct = `${a}e^x+${b}\\cos(x)`;
      return makeQuestion(
        "Antiderivatives",
        2,
        [textPart("Find an antiderivative of "), mathPart(`${a}e^x-${b}\\sin(x)`), textPart(".")],
        correct,
        [`${a}e^x-${b}\\cos(x)`, `${a}xe^x+${b}\\cos(x)`, `${a}e^x+${b}\\sin(x)`, `${a}e^x-${b}\\sin(x)`]
      );
    }
  },
  {
    category: "derivative",
    min: 2,
    max: 4,
    build() {
      const k = Math.floor(rand(2, 7));
      const x = Math.floor(rand(1, 5));
      const correct = `${k}e^{${k * x}}`;
      return makeQuestion(
        "Chain Rule",
        2,
        [textPart("If "), mathPart(`y=e^{${k}x}`), textPart(", what is "), mathPart(`\\frac{dy}{dx}`), textPart(` at x=${x}?`)],
        correct,
        [`e^{${k * x}}`, `${k * x}e^{${k * x}}`, `${k}e^${x}`, `${k + 1}e^{${k * x}}`]
      );
    }
  },
  {
    category: "series",
    min: 1,
    max: 4,
    build() {
      const power = Math.floor(rand(3, 6));
      const correct = textChoice("converges");
      return makeQuestion(
        "Series",
        3,
        [textPart("Does "), mathPart(`\\sum_{n=1}^{\\infty}\\frac{1}{n^${power}}`), textPart(" converge or diverge?")],
        correct,
        [textChoice("diverges"), textChoice("oscillates"), textChoice("equals 0"), textChoice("cannot tell")]
      );
    }
  },
  {
    category: "derivative",
    min: 3,
    max: 5,
    build() {
      const a = Math.floor(rand(2, 8));
      const b = Math.floor(rand(2, 8));
      const correct = `${a * b}\\cos(${b}x)`;
      return makeQuestion(
        "Chain Rule",
        3,
        [textPart("Differentiate "), mathPart(`${a}\\sin(${b}x)`), textPart(".")],
        correct,
        [`${a}\\cos(${b}x)`, `${a * b}\\sin(${b}x)`, `-${a * b}\\cos(${b}x)`, `${a + b}\\cos(${b}x)`]
      );
    }
  },
  {
    category: "series",
    min: 1,
    max: 5,
    build() {
      const ratio = pick([
        { latex: fraction(1, 2), sum: "2" },
        { latex: fraction(1, 3), sum: fraction(3, 2) },
        { latex: fraction(2, 3), sum: "3" },
        { latex: fraction(1, 4), sum: fraction(4, 3) }
      ]);
      return makeQuestion(
        "Geometric Series",
        3,
        [textPart("Find "), mathPart(`\\sum_{n=0}^{\\infty}(${ratio.latex})^n`), textPart(".")],
        ratio.sum,
        ["1", ratio.latex, textChoice("diverges"), fraction(5, 2)]
      );
    }
  },
  {
    category: "series",
    min: 4,
    max: 7,
    build() {
      const n = Math.floor(rand(3, 8));
      const power = 2 * n - 1;
      const correct = "0";
      return makeQuestion(
        "Taylor Series",
        4,
        [textPart("In the Maclaurin series for "), mathPart("\\cos(x)"), textPart(", what is the coefficient of "), mathPart(`x^${power}`), textPart("?")],
        correct,
        [fraction((n % 2 ? -1 : 1), factorial(power)), fraction((n % 2 ? -1 : 1), factorial(power + 1)), "1", "-1"]
      );
    }
  },
  {
    category: "series",
    min: 4,
    max: 7,
    build() {
      const n = Math.floor(rand(2, 6));
      const correct = fraction((n % 2 === 0 ? -1 : 1), n);
      return makeQuestion(
        "Taylor Series",
        4,
        [textPart("In the Maclaurin series for "), mathPart("\\ln(1+x)"), textPart(", what is the coefficient of "), mathPart(`x^${n}`), textPart("?")],
        correct,
        [fraction(1, n), fraction((n % 2 === 0 ? 1 : -1), n + 1), `${n}`, "0"]
      );
    }
  },
  {
    category: "derivative",
    min: 4,
    max: 8,
    build() {
      const a = Math.floor(rand(2, 7));
      const correct = `\\frac{${a}}{1+${a * a}t^2}`;
      return makeQuestion(
        "Parametric",
        4,
        [textPart("For "), mathPart("x=t"), textPart(" and "), mathPart(`y=\\arctan(${a}t)`), textPart(", find "), mathPart("\\frac{dy}{dx}"), textPart(".")],
        correct,
        [`\\frac{1}{1+${a * a}t^2}`, `\\frac{${a}}{1+${a}t^2}`, `\\frac{${a}t}{1+${a * a}t^2}`, `\\frac{${a}}{1-${a * a}t^2}`]
      );
    }
  },
  {
    category: "derivative",
    min: 5,
    max: 9,
    build() {
      const a = Math.floor(rand(2, 6));
      const b = Math.floor(rand(2, 7));
      const correct = fraction(a, b);
      return makeQuestion(
        "L'Hopital",
        5,
        [textPart("Evaluate "), mathPart(limitExpression("x\\to0", `\\frac{\\sin(${a}x)}{\\sin(${b}x)}`)), textPart(".")],
        correct,
        [fraction(b, a), `${a * b}`, "1", "0"]
      );
    }
  },
  {
    category: "series",
    min: 5,
    max: 9,
    build() {
      const n = Math.floor(rand(2, 5));
      const correct = `${n}!`;
      return makeQuestion(
        "Power Series",
        5,
        [textPart("If "), mathPart("f(x)=\\frac{1}{1-x}"), textPart(", what is "), mathPart(`f^{(${n})}(0)`), textPart("?")],
        correct,
        [`${n}`, `${n + 1}!`, "1", "0"]
      );
    }
  },
  {
    category: "integral",
    min: 5,
    max: 10,
    build() {
      const a = Math.floor(rand(2, 9));
      const areaNumerator = a * a;
      const correct = piMultiple(areaNumerator, 4);
      return makeQuestion(
        "Polar",
        5,
        [textPart("Find the area inside "), mathPart(`r=${a}\\sin(\\theta)`), textPart(" for "), mathPart("0\\le\\theta\\le\\pi"), textPart(".")],
        correct,
        [piMultiple(areaNumerator, 1), piMultiple(areaNumerator, 2), piMultiple(a, 2), piMultiple(a * 2, 1)]
      );
    }
  },
  {
    category: "derivative",
    min: 2,
    max: 5,
    build() {
      const a = Math.floor(rand(2, 6));
      const b = Math.floor(rand(1, 7));
      const x = Math.floor(rand(1, 4));
      const correct = 6 * a * x + 2 * b;
      return makeQuestion(
        "Second Derivatives",
        2,
        [textPart("If "), mathPart(`f(x)=${a}x^3+${b}x^2`), textPart(", find "), mathPart(`f''(${x})`), textPart(".")],
        correct,
        [correct + 2 * a, correct - 2 * b, 3 * a * x * x + 2 * b * x, 6 * a]
      );
    }
  },
  {
    category: "derivative",
    min: 4,
    max: 8,
    build() {
      const a = Math.floor(rand(2, 7));
      const correct = `${a}x^{${a - 1}}\\ln(x)+x^{${a - 1}}`;
      return makeQuestion(
        "Product Rule",
        4,
        [textPart("Differentiate "), mathPart(`x^${a}\\ln(x)`), textPart(".")],
        correct,
        [`${a}x^{${a - 1}}\\ln(x)`, `${a}x^{${a - 1}}\\ln(x)+x^${a}`, `x^${a}\\ln(x)+x^{${a - 1}}`, `${a}x^${a}\\ln(x)+x^{${a - 1}}`]
      );
    }
  },
  {
    category: "integral",
    min: 1,
    max: 4,
    build() {
      const a = Math.floor(rand(2, 9));
      const b = Math.floor(rand(1, 8));
      const correct = fraction(a + 2 * b, 2);
      return makeQuestion(
        "Integrals",
        2,
        [textPart("Evaluate "), mathPart(`\\int_{0}^{1}(${a}x+${b})dx`), textPart(".")],
        correct,
        [fraction(a + b, 2), `${a + b}`, fraction(a, 2), fraction(a + b, 3)]
      );
    }
  },
  {
    category: "integral",
    min: 3,
    max: 7,
    build() {
      const a = Math.floor(rand(2, 7));
      const correct = `${a}\\ln(2)`;
      return makeQuestion(
        "U-Substitution",
        3,
        [textPart("Evaluate "), mathPart(`\\int_{0}^{1}\\frac{${a}}{x+1}dx`), textPart(".")],
        correct,
        [`${a}`, `${a}\\ln(1)`, `${a}\\ln(3)`, fraction(a, 2)]
      );
    }
  },
  {
    category: "integral",
    min: 4,
    max: 9,
    build() {
      return makeQuestion(
        "U-Substitution",
        4,
        [textPart("Evaluate "), mathPart("\\int_{0}^{1}2x\\cos(x^2)dx"), textPart(".")],
        "\\sin(1)",
        ["\\cos(1)-1", "2\\sin(1)", "1-\\cos(1)", "\\sin(2)"]
      );
    }
  },
  {
    category: "series",
    min: 2,
    max: 6,
    build() {
      const r = Math.floor(rand(2, 7));
      return makeQuestion(
        "Power Series",
        3,
        [textPart("Find the radius of convergence of "), mathPart(`\\sum_{n=1}^{\\infty}\\frac{x^n}{${r}^n}`), textPart(".")],
        `${r}`,
        ["1", `${r * r}`, fraction(1, r), textChoice("infinite")]
      );
    }
  },
  {
    category: "series",
    min: 3,
    max: 7,
    build() {
      return makeQuestion(
        "Alternating Series",
        4,
        [textPart("The series "), mathPart("\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}}{n}"), textPart(" is what?")],
        textChoice("conditionally convergent"),
        [textChoice("absolutely convergent"), textChoice("divergent"), textChoice("geometric"), textChoice("telescoping")]
      );
    }
  }
];

const frqGenerators = [
  {
    category: "derivative",
    min: 1,
    max: 3,
    build() {
      const a = Math.floor(rand(2, 8));
      const b = Math.floor(rand(1, 7));
      const correct = 2 * a + b;
      return makeFRQ(
        "FRQ Derivatives",
        2,
        [textPart("Type "), mathPart("f'(1)"), textPart(" for "), mathPart(`f(x)=${a}x^2+${b}x`), textPart(".")],
        `${correct}`,
        [`${correct}.0`]
      );
    }
  },
  {
    category: "integral",
    min: 1,
    max: 4,
    build() {
      const n = Math.floor(rand(2, 7));
      const correct = fraction(1, n + 1);
      return makeFRQ(
        "FRQ Integrals",
        2,
        [textPart("Type the exact value of "), mathPart(`\\int_{0}^{1}x^{${n}}dx`), textPart(".")],
        correct,
        []
      );
    }
  },
  {
    category: "series",
    min: 2,
    max: 5,
    build() {
      const r = pick([
        { ratio: fraction(1, 2), sum: "2" },
        { ratio: fraction(1, 3), sum: fraction(3, 2) },
        { ratio: fraction(2, 3), sum: "3" },
        { ratio: fraction(1, 4), sum: fraction(4, 3) }
      ]);
      return makeFRQ(
        "FRQ Series",
        3,
        [textPart("Type the sum of "), mathPart(`\\sum_{n=0}^{\\infty}(${r.ratio})^n`), textPart(".")],
        r.sum,
        []
      );
    }
  },
  {
    category: "derivative",
    min: 3,
    max: 6,
    build() {
      const a = Math.floor(rand(2, 7));
      const b = Math.floor(rand(2, 8));
      const correct = a * b;
      return makeFRQ(
        "FRQ Chain Rule",
        3,
        [textPart("If "), mathPart(`y=${a}\\sin(${b}x)`), textPart(", type the coefficient of "), mathPart(`\\cos(${b}x)`), textPart(" in "), mathPart("\\frac{dy}{dx}"), textPart(".")],
        `${correct}`,
        [`${correct}.0`]
      );
    }
  },
  {
    category: "derivative",
    min: 4,
    max: 8,
    build() {
      const a = Math.floor(rand(2, 6));
      const b = Math.floor(rand(2, 7));
      const correct = fraction(a, b);
      return makeFRQ(
        "FRQ Limits",
        4,
        [textPart("Evaluate "), mathPart(limitExpression("x\\to0", `\\frac{\\sin(${a}x)}{\\sin(${b}x)}`)), textPart(".")],
        correct,
        []
      );
    }
  },
  {
    category: "integral",
    min: 5,
    max: 10,
    build() {
      const a = Math.floor(rand(2, 8));
      const correct = piMultiple(a * a, 4);
      return makeFRQ(
        "FRQ Polar",
        5,
        [textPart("Type the area inside "), mathPart(`r=${a}\\sin(\\theta)`), textPart(" for "), mathPart("0\\le\\theta\\le\\pi"), textPart(".")],
        correct,
        []
      );
    }
  }
];

function factorial(n) {
  let product = 1;
  for (let value = 2; value <= n; value += 1) product *= value;
  return product;
}

function generatorsForMode(source) {
  return state.mode === "all"
    ? source
    : source.filter((generator) => generator.category === state.mode);
}

function availableGenerators(source = generators) {
  const difficulty = Math.min(10, 1 + Math.floor(state.problemIndex / 3));
  const modePool = generatorsForMode(source);
  const currentBand = modePool.filter((generator) => difficulty >= generator.min && difficulty <= generator.max);
  if (currentBand.length) return currentBand;
  const unlocked = modePool.filter((generator) => difficulty >= generator.min);
  return unlocked.length ? unlocked : modePool;
}

function shouldAskFRQ() {
  const nextProblem = state.problemIndex + 1;
  return nextProblem % 4 === 0 || (nextProblem > 2 && Math.random() < 0.18);
}

function nextQuestion() {
  const frqPool = availableGenerators(frqGenerators);
  const useFRQ = frqPool.length > 0 && shouldAskFRQ();
  const generator = pick(useFRQ ? frqPool : availableGenerators(generators));
  const question = generator.build();
  state.current = question;
  state.locked = false;
  state.problemIndex += 1;
  state.level = Math.min(10, 1 + Math.floor((state.problemIndex - 1) / 3));
  renderQuestion(question);
  spawnFormulaBurst(36 + state.level * 6, true);
}

function renderQuestion(question) {
  elements.topic.textContent = question.topic;
  elements.problemCount.textContent = `Problem ${state.problemIndex}`;
  renderPrompt(elements.question, question.prompt);
  setFeedback("");
  elements.level.textContent = state.level;

  elements.questionCard.classList.remove("pulse");
  void elements.questionCard.offsetWidth;
  elements.questionCard.classList.add("pulse");

  [...elements.difficulty.children].forEach((bar, index) => {
    bar.classList.toggle("active", index < question.difficulty);
  });

  elements.choices.innerHTML = "";
  const isFRQ = question.kind === "frq";
  elements.choices.hidden = isFRQ;
  elements.frqPanel.classList.toggle("active", isFRQ);
  elements.frqPanel.setAttribute("aria-hidden", String(!isFRQ));
  document.body.classList.toggle("frq-view", isFRQ);
  elements.frqAnswer.value = "";
  elements.frqAnswer.disabled = !isFRQ;
  elements.frqSubmit.disabled = !isFRQ;

  if (isFRQ) {
    window.setTimeout(() => elements.frqAnswer.focus(), 60);
    return;
  }

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.dataset.key = keys[index];
    button.dataset.value = choice.value;
    const label = document.createElement("strong");
    renderChoiceLabel(label, choice);
    button.appendChild(label);
    button.addEventListener("click", () => answer(choice, button));
    elements.choices.appendChild(button);
  });
}

function answer(choice, button) {
  if (!state.running || state.locked || !state.current || state.current.kind !== "mc") return;
  state.locked = true;
  const correct = choice.value === state.current.correctValue;
  completeAnswer(correct, button);
}

function answerFRQ(event) {
  event.preventDefault();
  if (!state.running || state.locked || !state.current || state.current.kind !== "frq") return;
  const typed = elements.frqAnswer.value.trim();
  if (!typed) {
    setFeedback("Type an answer first.", "bad");
    elements.frqAnswer.focus();
    return;
  }
  state.locked = true;
  elements.frqAnswer.disabled = true;
  elements.frqSubmit.disabled = true;
  const normalized = normalizeTypedAnswer(typed);
  const correct = state.current.accepted.includes(normalized);
  completeAnswer(correct, null);
}

function completeAnswer(correct, button) {
  const isFRQ = state.current.kind === "frq";
  if (correct) {
    const gain = (isFRQ ? 6 : 4) + Math.min(8, Math.floor(state.streak / 2));
    const points = (isFRQ ? 160 : 100) * state.level + state.streak * (isFRQ ? 40 : 25);
    state.time = clamp(state.time + gain, 0, state.maxTime);
    state.score += points;
    state.streak += 1;
    setFeedback(`Correct  +${gain}s  +${points}`, "good");
    if (button) button.classList.add("correct");
    burstAtTarget(button || elements.frqPanel, "#23b26d", 36);
    addShockwave("good");
  } else {
    state.time = clamp(state.time - (isFRQ ? 10 : 8), 0, state.maxTime);
    state.streak = 0;
    setFeedback(`Wrong  -${isFRQ ? 10 : 8}s  Answer:`, "bad", state.current.correct);
    if (button) button.classList.add("wrong");
    elements.shell.classList.remove("shake");
    void elements.shell.offsetWidth;
    elements.shell.classList.add("shake");
    if (!isFRQ) markCorrectChoice();
    burstAtTarget(button || elements.frqPanel, "#e44d43", 28);
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
    if (choice.dataset.value === state.current.correctValue) choice.classList.add("correct");
  });
}

function renderStats() {
  elements.score.textContent = state.score.toLocaleString();
  elements.streak.textContent = state.streak;
  elements.level.textContent = state.level;
  elements.modeLabel.textContent = modeLabels[state.mode] || modeLabels.all;
  elements.timeBar.style.transform = `scaleX(${clamp(state.time / state.maxTime, 0, 1)})`;
}

function flashTime() {
  elements.timeFlash.classList.remove("hit");
  void elements.timeFlash.offsetWidth;
  elements.timeFlash.classList.add("hit");
}

function applyAppSettings() {
  const lightMode = appSettings.theme === "light";
  document.body.classList.toggle("light-mode", lightMode);
  elements.themeDark.classList.toggle("active", !lightMode);
  elements.themeLight.classList.toggle("active", lightMode);
  elements.themeDark.setAttribute("aria-pressed", String(!lightMode));
  elements.themeLight.setAttribute("aria-pressed", String(lightMode));

  document.body.classList.toggle("floating-off", !appSettings.floatingNumbers);
  elements.floatingToggle.classList.toggle("active", appSettings.floatingNumbers);
  elements.floatingToggle.setAttribute("aria-pressed", String(appSettings.floatingNumbers));
  if (!appSettings.floatingNumbers) {
    formulae.forEach((formula) => {
      if (formula.node) formula.node.style.opacity = "0";
    });
  }
}

function applyDesmosSettings() {
  document.body.classList.toggle("desmos-answer-box-hidden", desmosSettings.hideAnswerBox);
  document.body.classList.toggle("desmos-timebar-off", !desmosSettings.timebar);

  if (elements.desmosCalculator) {
    elements.desmosCalculator.classList.toggle("hide-answer-box", desmosSettings.hideAnswerBox);
  }

  if (elements.desmosHideAnswerToggle) {
    elements.desmosHideAnswerToggle.classList.toggle("active", desmosSettings.hideAnswerBox);
    elements.desmosHideAnswerToggle.setAttribute("aria-pressed", String(desmosSettings.hideAnswerBox));
  }
  if (elements.desmosTimebarToggle) {
    elements.desmosTimebarToggle.classList.toggle("active", desmosSettings.timebar);
    elements.desmosTimebarToggle.setAttribute("aria-pressed", String(desmosSettings.timebar));
  }

  elements.desmosSpeedrunDifficultyButtons.forEach((button) => {
    const active = button.dataset.speedrunDifficulty === desmosSettings.speedrunDifficulty;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  elements.desmosTypingDifficultyButtons.forEach((button) => {
    const active = button.dataset.typingDifficulty === desmosSettings.typingDifficulty;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  updateDesmosTimerView();
  if (embeddedDesmos && typeof embeddedDesmos.resize === "function") {
    window.setTimeout(() => embeddedDesmos.resize(), 80);
  }
}

function setTheme(theme) {
  appSettings.theme = theme === "light" ? "light" : "dark";
  localStorage.setItem("bc-blitz-theme", appSettings.theme);
  applyAppSettings();
}

function toggleFloatingNumbers() {
  appSettings.floatingNumbers = !appSettings.floatingNumbers;
  localStorage.setItem("bc-blitz-floating-numbers", appSettings.floatingNumbers ? "on" : "off");
  applyAppSettings();
}

function toggleDesmosAnswerBox() {
  desmosSettings.hideAnswerBox = !desmosSettings.hideAnswerBox;
  localStorage.setItem("bc-blitz-desmos-hide-answer", desmosSettings.hideAnswerBox ? "on" : "off");
  applyDesmosSettings();
}

function toggleDesmosTimebar() {
  desmosSettings.timebar = !desmosSettings.timebar;
  localStorage.setItem("bc-blitz-desmos-timebar", desmosSettings.timebar ? "on" : "off");
  applyDesmosSettings();
}

function setDesmosSpeedrunDifficulty(difficulty) {
  if (!desmosSpeedrunDifficulty[difficulty]) return;
  desmosSettings.speedrunDifficulty = difficulty;
  localStorage.setItem("bc-blitz-desmos-speedrun-difficulty", difficulty);
  if (!desmosState.running) {
    const timing = desmosSpeedrunDifficulty[difficulty];
    desmosState.time = timing.start;
    desmosState.maxTime = timing.max;
  }
  applyDesmosSettings();
}

function setDesmosTypingDifficulty(difficulty) {
  if (!desmosTypingDifficulty[difficulty]) return;
  desmosSettings.typingDifficulty = difficulty;
  localStorage.setItem("bc-blitz-desmos-typing-difficulty", difficulty);
  if (desmosState.mode === "typing") resetMathTypingGame();
  applyDesmosSettings();
}

function setSettingsOpen(open) {
  elements.settingsOverlay.hidden = !open;
  elements.settingsOverlay.setAttribute("aria-hidden", String(!open));
  elements.settingsButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("settings-open", open);
  if (open) {
    elements.settingsClose.focus();
  } else {
    elements.settingsButton.focus();
  }
}

function isTi84Fullscreen() {
  return document.fullscreenElement === elements.ti84Panel;
}

function updateTi84FullscreenButton() {
  if (!elements.ti84Fullscreen) return;
  const active = isTi84Fullscreen();
  elements.ti84Fullscreen.classList.toggle("active", active);
  elements.ti84Fullscreen.setAttribute("aria-label", active ? "Exit TI84 fullscreen" : "Open TI84 fullscreen");
  elements.ti84Fullscreen.title = active ? "Exit fullscreen" : "Fullscreen";
  postTi84FrameMessage({ type: "ti84:fullscreen", active });
}

function postTi84FrameMessage(message) {
  const frame = document.getElementById("ti84-frame");
  if (frame && frame.contentWindow) frame.contentWindow.postMessage(message, "*");
}

async function toggleTi84Fullscreen() {
  if (!elements.ti84Panel || !elements.ti84Fullscreen) return;
  if (!document.fullscreenEnabled || !elements.ti84Panel.requestFullscreen) {
    elements.ti84Fullscreen.disabled = true;
    elements.ti84Fullscreen.title = "Fullscreen is not supported";
    return;
  }

  try {
    if (isTi84Fullscreen()) {
      await document.exitFullscreen();
    } else {
      await elements.ti84Panel.requestFullscreen();
    }
  } catch {
    elements.ti84Fullscreen.blur();
  }

  updateTi84FullscreenButton();
}

function showPage(page) {
  const showingHome = page === "home";
  const showingDeveloper = page === "developer";
  const showingDesmos = page === "desmos";
  const showingStudy = page === "study";
  const showingAP = page === "ap";
  const showingCalc = page === "calc";
  const showingGame = page === "game";

  elements.homePage.classList.toggle("active", showingHome);
  elements.homePage.setAttribute("aria-hidden", String(!showingHome));
  elements.developerPage.classList.toggle("active", showingDeveloper);
  elements.developerPage.setAttribute("aria-hidden", String(!showingDeveloper));
  elements.desmosPage.classList.toggle("active", showingDesmos);
  elements.desmosPage.setAttribute("aria-hidden", String(!showingDesmos));
  elements.studyPage.classList.toggle("active", showingStudy);
  elements.studyPage.setAttribute("aria-hidden", String(!showingStudy));
  elements.apPage.classList.toggle("active", showingAP);
  elements.apPage.setAttribute("aria-hidden", String(!showingAP));
  elements.calcPage.classList.toggle("active", showingCalc);
  elements.calcPage.setAttribute("aria-hidden", String(!showingCalc));
  elements.gamePage.hidden = !showingGame;
  document.body.classList.toggle("game-view", showingGame);
  document.body.classList.toggle("frq-view", showingGame && state.current && state.current.kind === "frq");
  elements.frqPanel.classList.toggle("active", showingGame && state.current && state.current.kind === "frq");
  elements.frqPanel.setAttribute("aria-hidden", String(!(showingGame && state.current && state.current.kind === "frq")));

  elements.navPlay.classList.toggle("active", showingHome);
  elements.navDesmos.classList.toggle("active", showingDesmos);
  elements.navCalc.classList.toggle("active", showingCalc);
  elements.navAP.classList.toggle("active", showingAP);
  elements.navStudy.classList.toggle("active", showingStudy);
  elements.navDeveloper.classList.toggle("active", showingDeveloper);

  if (showingDesmos) {
    renderDataLatex(elements.desmosPage, { skipHidden: true });
    setDesmosMode(desmosState.mode);
  }
  updateDesmosTimerView();
  if (showingCalc) {
    window.setTimeout(() => {
      postTi84FrameMessage({ type: "ti84:center" });
      postTi84FrameMessage({ type: "ti84:fullscreen", active: isTi84Fullscreen() });
    }, 80);
  }
  if (showingStudy) renderDataLatex(elements.studyPage);
}

function leaveGame(page) {
  if (page !== "desmos" && desmosState.running) endDesmosSpeedrun();
  state.running = false;
  state.locked = true;
  elements.start.disabled = false;
  elements.skip.disabled = true;
  elements.choices.hidden = false;
  elements.frqAnswer.disabled = true;
  elements.frqSubmit.disabled = true;
  elements.gameOver.classList.remove("show");
  elements.gameOver.setAttribute("aria-hidden", "true");
  showPage(page);
}

function startGame(mode = state.mode) {
  state.mode = modeLabels[mode] ? mode : "all";
  state.running = true;
  state.score = 0;
  state.streak = 0;
  state.level = 1;
  state.problemIndex = 0;
  state.time = 45;
  state.maxTime = 60;
  state.current = null;
  state.locked = false;
  showPage("game");
  elements.start.disabled = true;
  elements.start.textContent = "Restart";
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
  elements.start.textContent = "Restart";
  elements.skip.disabled = true;
  elements.frqPanel.classList.remove("active");
  elements.frqPanel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("frq-view");
  elements.frqAnswer.disabled = true;
  elements.frqSubmit.disabled = true;
  elements.finalScore.textContent = state.score.toLocaleString();
  elements.gameOver.classList.add("show");
  elements.gameOver.setAttribute("aria-hidden", "false");
  setFeedback("");
  elements.choices.innerHTML = "";
  spawnFormulaBurst(280, false);
}

function skipQuestion() {
  if (!state.running || state.locked) return;
  state.time = clamp(state.time - 5, 0, state.maxTime);
  state.streak = 0;
  setFeedback("Skipped  -5s", "bad");
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
  state.formulaPulse = clamp(state.formulaPulse + count / (calm ? 360 : 460), 0, 1.25);

  const target = formulaTargetCount();
  const refreshCount = Math.min(Math.max(4, Math.round(count / 9)), Math.floor(target * 0.18));
  for (let i = 0; i < refreshCount; i += 1) {
    const token = formulae[(state.problemIndex * 19 + i * 13) % formulae.length];
    if (token) refreshFormulaToken(token, true);
  }
}

function getFormulaLayer() {
  if (elements.formulaLayer) return elements.formulaLayer;

  const layer = document.createElement("div");
  layer.id = "formula-layer";
  layer.setAttribute("aria-hidden", "true");
  elements.canvas.insertAdjacentElement("afterend", layer);
  elements.formulaLayer = layer;
  return layer;
}

function attachFormulaNode(token) {
  const layer = getFormulaLayer();
  const node = document.createElement("span");
  node.className = `floating-formula math-render formula-${token.category}${token.integralLane ? " integral-formula" : ""}`;
  node.style.color = token.hue;
  node.style.fontSize = `${token.baseSize}px`;
  node.style.opacity = "0";
  layer.appendChild(node);
  renderStaticMath(node, token.text);
  token.node = node;
  return token;
}

function removeFormulaNode(token) {
  if (token.node && token.node.parentNode) {
    token.node.parentNode.removeChild(token.node);
  }
  token.node = null;
}

function formulaTargetCount() {
  if (window.innerWidth < 560) return state.running ? 62 : 48;
  if (window.innerWidth < 900) return state.running ? 86 : 64;
  return state.running ? 108 : 78;
}

function refreshFormulaToken(token, keepPhase = false) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const diagonal = Math.hypot(width, height);
  const categoryCycle = [
    "derivative",
    "limit",
    "series",
    "vector",
    "integral",
    "parametric",
    "derivative",
    "limit",
    "series",
    "vector",
    "integral",
    "derivative",
    "parametric"
  ];
  const angle = (token.index * goldenAngle + rand(-0.1, 0.1)) % (Math.PI * 2);
  const dirX = Math.cos(angle);
  const dirY = Math.sin(angle);
  const category = categoryCycle[token.index % categoryCycle.length];
  const integralLane = category === "integral";

  token.category = category;
  token.integralLane = integralLane;
  token.text = createFloatingFormulaLatex(category);
  token.angle = angle;
  token.dirX = dirX;
  token.dirY = dirY;
  token.startRadius = rand(8, Math.min(width, height) * 0.045);
  token.endRadius = diagonal * rand(0.52, 0.66);
  token.depthStart = rand(-560, -360);
  token.depthEnd = rand(90, 170);
  token.baseSize = integralLane ? rand(32, 46) : rand(22, 36);
  token.startScale = rand(0.34, 0.48);
  token.endScale = integralLane ? rand(1.08, 1.32) : rand(1.05, 1.42);
  token.tiltX = -dirY * rand(8, 18);
  token.tiltY = dirX * rand(8, 18);
  token.roll = rand(-5, 5);
  token.rollDrift = rand(-9, 9);
  token.opacity = integralLane ? 1 : rand(0.64, 0.88);
  token.stretch = rand(1.02, 1.1);
  token.hue = {
    integral: pick(["#ffd866", "#f5f1e7", "#45d7f4"]),
    derivative: pick(["#23b26d", "#f5f1e7", "#31b7d6"]),
    limit: pick(["#31b7d6", "#f5f1e7", "#8558cf"]),
    parametric: pick(["#efb938", "#23b26d", "#f5f1e7"]),
    vector: pick(["#23b26d", "#31b7d6", "#f5f1e7"]),
    series: pick(["#f5f1e7", "#8558cf"]),
    identity: pick(floatingColors)
  }[category];

  if (!keepPhase) token.phase = token.index / formulaPoolLimit;
  if (token.node) {
    token.node.className = `floating-formula math-render formula-${category}${token.integralLane ? " integral-formula" : ""}`;
    token.node.style.color = token.hue;
    token.node.style.fontSize = `${token.baseSize}px`;
    renderStaticMath(token.node, token.text);
  }
}

function createFormulaToken(index) {
  const token = {
    index,
    phase: index / formulaPoolLimit,
    cycle: -1,
    node: null
  };

  refreshFormulaToken(token);
  return attachFormulaNode(token);
}

function replenishFormulae(dt) {
  const speed = formulaCycleRate * (state.running ? 1.08 : 0.82);
  state.formulaTime += dt * speed * (1 + state.formulaPulse * 0.18);
  state.formulaPulse = Math.max(0, state.formulaPulse - dt * 0.75);
}

function seedAmbientFormulae(count) {
  const target = Math.min(count, formulaPoolLimit);
  for (let i = formulae.length; i < target; i += 1) {
    formulae.push(createFormulaToken(i));
  }
}

function burstAtTarget(target, color, count) {
  const rect = target.getBoundingClientRect();
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
  tickDesmosTimer(dt);
  if (appSettings.floatingNumbers) replenishFormulae(dt);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawAmbient(now);
  drawParticles(dt);
  if (appSettings.floatingNumbers) drawFormulae(dt);
  drawSparks(dt);
  window.requestAnimationFrame(drawVfx);
}

function tickTimer(dt) {
  if (!state.running) return;
  state.time = clamp(state.time - dt, 0, state.maxTime);
  renderStats();
  if (state.time <= 0) endGame();
}

function tickDesmosTimer(dt) {
  if (!desmosState.running) return;
  desmosState.promptHealthTime += dt;
  if (desmosState.promptHealthTime >= 0.25) {
    desmosState.promptHealthTime = 0;
    ensureDesmosPromptCardsFilled(desmosState.current);
  }
  if (!desmosSettings.timebar) {
    updateDesmosTimerView();
    return;
  }
  desmosState.time = clamp(desmosState.time - dt, 0, desmosState.maxTime);
  updateDesmosTimerView();
  if (desmosState.time <= 0) {
    setDesmosFeedback(`Time up  Score: ${desmosState.score}`, "bad");
    endDesmosSpeedrun({ preserveFeedback: true });
  }
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
  const target = Math.min(formulaTargetCount(), formulae.length);
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const edgePadding = Math.max(220, Math.min(window.innerWidth, window.innerHeight) * 0.24);

  for (let i = 0; i < formulae.length; i += 1) {
    const f = formulae[i];

    if (i >= target) {
      if (f.node) f.node.style.opacity = "0";
      continue;
    }

    if (!f.node) attachFormulaNode(f);
    const rawProgress = state.formulaTime + i / target;
    const cycle = Math.floor(rawProgress);
    const progress = rawProgress - cycle;

    if (cycle !== f.cycle) {
      f.cycle = cycle;
      if ((cycle + f.index) % 3 === 0) refreshFormulaToken(f, true);
    }

    const depthEase = smoothstep(0, 1, progress);
    const distanceToVerticalEdge = f.dirX === 0 ? 0 : (f.dirX > 0 ? window.innerWidth - centerX : centerX) / Math.abs(f.dirX);
    const distanceToHorizontalEdge = f.dirY === 0 ? 0 : (f.dirY > 0 ? window.innerHeight - centerY : centerY) / Math.abs(f.dirY);
    const distanceToScreenEdge = Math.min(
      distanceToVerticalEdge || Number.POSITIVE_INFINITY,
      distanceToHorizontalEdge || Number.POSITIVE_INFINITY
    );
    const endRadius = Math.max(f.endRadius, distanceToScreenEdge + edgePadding);
    const radius = lerp(f.startRadius, endRadius, progress);
    const x = centerX + f.dirX * radius;
    const y = centerY + f.dirY * radius;
    const depth = lerp(f.depthStart, f.depthEnd, depthEase);
    const scale = lerp(f.startScale, f.endScale, depthEase);
    const stretch = lerp(f.stretch, 1, depthEase);
    const rotateX = lerp(f.tiltX * 0.12, f.tiltX, depthEase);
    const rotateY = lerp(f.tiltY * 0.12, f.tiltY, depthEase);
    const rotateZ = f.roll + f.rollDrift * progress;
    const pulseScale = 1 + state.formulaPulse * 0.08 * (1 - progress);
    const alpha = smoothstep(0.02, 0.16, progress) * f.opacity;

    f.x = x;
    f.y = y;
    f.node.style.opacity = `${alpha}`;
    f.node.style.transform = `translate3d(${x}px, ${y}px, ${depth}px) translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale3d(${scale * stretch * pulseScale}, ${scale * pulseScale}, 1)`;
  }
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

elements.modeButtons.forEach((button) => {
  button.addEventListener("click", () => startGame(button.dataset.mode));
});
elements.navHome.addEventListener("click", () => leaveGame("home"));
elements.navPlay.addEventListener("click", () => leaveGame("home"));
elements.navDesmos.addEventListener("click", () => leaveGame("desmos"));
elements.navCalc.addEventListener("click", () => leaveGame("calc"));
elements.navAP.addEventListener("click", () => leaveGame("ap"));
elements.navStudy.addEventListener("click", () => leaveGame("study"));
elements.navDeveloper.addEventListener("click", () => leaveGame("developer"));
elements.start.addEventListener("click", () => startGame());
elements.restart.addEventListener("click", () => startGame());
elements.skip.addEventListener("click", skipQuestion);
elements.frqForm.addEventListener("submit", answerFRQ);
elements.desmosStart.addEventListener("click", startDesmosSpeedrun);
elements.desmosGuideToggle.addEventListener("click", () => {
  setDesmosGuideVisible(elements.desmosGuide.hidden);
});
elements.desmosGuideClose.addEventListener("click", () => {
  setDesmosGuideVisible(false);
  elements.desmosGuideToggle.focus();
});
elements.desmosModeButtons.forEach((button) => {
  button.addEventListener("click", () => setDesmosMode(button.dataset.desmosMode));
});
elements.mathTypingInput.addEventListener("input", handleMathTypingInput);
elements.mathTypingInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    event.stopPropagation();
    restartMathTypingGame();
  }
});
elements.mathTypingRestart.addEventListener("click", () => {
  restartMathTypingGame();
});
elements.mathTypingPanel.addEventListener("click", () => {
  if (!mathTypingState.resultVisible && elements.mathTypingInput) elements.mathTypingInput.focus();
});
elements.settingsButton.addEventListener("click", () => setSettingsOpen(true));
elements.settingsClose.addEventListener("click", () => setSettingsOpen(false));
elements.settingsOverlay.addEventListener("click", (event) => {
  if (event.target === elements.settingsOverlay) setSettingsOpen(false);
});
elements.themeDark.addEventListener("click", () => setTheme("dark"));
elements.themeLight.addEventListener("click", () => setTheme("light"));
elements.floatingToggle.addEventListener("click", toggleFloatingNumbers);
if (elements.desmosHideAnswerToggle) elements.desmosHideAnswerToggle.addEventListener("click", toggleDesmosAnswerBox);
if (elements.desmosTimebarToggle) elements.desmosTimebarToggle.addEventListener("click", toggleDesmosTimebar);
elements.desmosSpeedrunDifficultyButtons.forEach((button) => {
  button.addEventListener("click", () => setDesmosSpeedrunDifficulty(button.dataset.speedrunDifficulty));
});
elements.desmosTypingDifficultyButtons.forEach((button) => {
  button.addEventListener("click", () => setDesmosTypingDifficulty(button.dataset.typingDifficulty));
});
elements.ti84Fullscreen.addEventListener("click", toggleTi84Fullscreen);
document.addEventListener("fullscreenchange", updateTi84FullscreenButton);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.settingsOverlay.hidden) {
    setSettingsOpen(false);
    return;
  }
  if (event.key === "Escape" && !elements.desmosGuide.hidden) {
    setDesmosGuideVisible(false);
    elements.desmosGuideToggle.focus();
    return;
  }
  if (event.key === "Enter" && isMathTypingActive() && elements.settingsOverlay.hidden && elements.desmosGuide.hidden) {
    event.preventDefault();
    restartMathTypingGame();
    return;
  }
  if (event.key === "Enter" && !state.running && !elements.gamePage.hidden) startGame();
  if (event.key === "Escape" && state.running) skipQuestion();
  if (event.target && ["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
  if (elements.gamePage.hidden) return;
  const index = keys.indexOf(event.key.toUpperCase());
  if (index >= 0 && elements.choices.children[index]) {
    elements.choices.children[index].click();
  }
});

window.addEventListener("resize", () => {
  resizeCanvas();
  updateMathTypingCaret();
});

resizeCanvas();
renderStats();
applyAppSettings();
applyDesmosSettings();
initDesmosPromptTooltips();
resetMathTypingGame();
setDesmosMode("speedrun");
showPage("home");
seedAmbientFormulae(formulaPoolLimit);
setDesmosAnswerEnabled(false);
window.requestAnimationFrame(drawVfx);
