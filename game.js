"use strict";

const elements = {
  canvas: document.getElementById("vfx"),
  formulaLayer: document.getElementById("formula-layer"),
  landingPage: document.getElementById("landing-page"),
  homePage: document.getElementById("home-page"),
  developerPage: document.getElementById("developer-page"),
  desmosPage: document.getElementById("desmos-page"),
  studyPage: document.getElementById("study-page"),
  studyVideoWatch: document.getElementById("study-video-watch"),
  studyVideoPlayer: document.getElementById("study-video-player"),
  studyVideoGrid: document.getElementById("study-video-grid"),
  studyVideoClose: document.getElementById("study-video-close"),
  studyVideoChapter: document.getElementById("study-video-chapter"),
  studyVideoTitle: document.getElementById("study-video-title"),
  calcPage: document.getElementById("calc-page"),
  ti84Panel: document.querySelector(".ti84-panel"),
  ti84Fullscreen: document.getElementById("ti84-fullscreen"),
  ti84GuideToggle: document.getElementById("ti84-guide-toggle"),
  ti84Guide: document.getElementById("ti84-guide"),
  gamePage: document.getElementById("game-page"),
  navHome: document.getElementById("nav-home"),
  navPlay: document.getElementById("nav-play"),
  navDesmos: document.getElementById("nav-desmos"),
  navCalc: document.getElementById("nav-calc"),
  navAP: document.getElementById("nav-ap"),
  navStudy: document.getElementById("nav-study"),
  navDeveloper: document.getElementById("nav-developer"),
  homeTargetButtons: [...document.querySelectorAll("[data-home-target]")],
  landingOrbitMenu: document.querySelector(".landing-orbit-menu"),
  landingOrbitWheel: document.querySelector(".landing-orbit-wheel"),
  landingOrbitItems: [...document.querySelectorAll(".landing-orbit-item")],
  modeButtons: [...document.querySelectorAll("[data-mode]")],
  modeStart: document.getElementById("mode-start-btn"),
  modeSettings: document.getElementById("mode-settings-btn"),
  modeGrid: document.getElementById("mode-grid"),
  selectedModeLabel: document.getElementById("selected-mode-label"),
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
  desmosCalculatorStage: document.getElementById("desmos-calculator-stage"),
  desmosCalculator: document.getElementById("desmos-calculator"),
  desmosStart: document.getElementById("desmos-start"),
  desmosScore: document.getElementById("desmos-score"),
  desmosScoreValue: document.getElementById("desmos-score-value"),
  desmosAnswerToggle: document.getElementById("desmos-answer-toggle"),
  desmosGuide: document.getElementById("desmos-guide"),
  desmosFeedback: document.getElementById("desmos-feedback"),
  desmosFeedbackEffect: document.getElementById("desmos-feedback-effect"),
  desmosTimebarToggle: document.getElementById("desmos-timebar-toggle"),
  mathTypingPanel: document.querySelector(".math-typing-panel"),
  mathTypingTest: document.getElementById("typingTest"),
  mathTypingConfig: document.getElementById("math-typing-config"),
  mathTypingModeButtons: [...document.querySelectorAll("[data-math-typing-mode]")],
  mathTypingAmountButtons: [...document.querySelectorAll("[data-math-typing-amount]")],
  mathTypingWordsWrapper: document.getElementById("wordsWrapper"),
  mathTypingWords: document.getElementById("words"),
  mathTypingInput: document.getElementById("wordsInput"),
  mathTypingKeyboard: document.getElementById("math-typing-keyboard"),
  mathTypingKeyHint: document.getElementById("math-typing-key-hint"),
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
  mode: "unit1",
  modes: ["unit1"],
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
  formulaPulse: 0,
  formulaDrain: false,
  formulaDrainComplete: false,
  formulaDrainTarget: 0,
  page: "landing"
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
  feedbackEffectTimer: 0,
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
  deadline: 0,
  timerId: 0,
  viewportLine: 0,
  viewportOffset: 0,
  caretX: 0,
  caretY: 0,
  caretHeight: 22,
  caretReady: false
};

const appSettings = {
  theme: localStorage.getItem("bc-blitz-theme") || "dark",
  floatingNumbers: false
};

const desmosSettings = {
  hideAnswerBox: true,
  timebar: localStorage.getItem("bc-blitz-desmos-timebar") !== "off"
};

const mathTypingAmounts = [15, 30, 60];
const storedMathTypingMode = localStorage.getItem("bc-blitz-math-typing-mode");
const storedMathTypingAmount = Number(localStorage.getItem("bc-blitz-math-typing-amount"));
const mathTypingSettings = {
  mode: ["time", "words"].includes(storedMathTypingMode) ? storedMathTypingMode : "time",
  amount: mathTypingAmounts.includes(storedMathTypingAmount) ? storedMathTypingAmount : 30
};

const desmosSpeedrunTiming = { start: 60, max: 75, bonus: 5 };
const mathTypingTimedBufferSize = 72;

const studyVideos = Object.freeze([
  { id: "WUvTyaaNkzM", title: "The essence of calculus" },
  { id: "9vKqVkMQHKk", title: "The paradox of the derivative" },
  { id: "S0_qX4VJhMQ", title: "Derivative formulas through geometry" },
  { id: "YG15m2VwSjA", title: "Visualizing the chain rule and product rule" },
  { id: "m2MIpDrF7Es", title: "What's so special about Euler's number e?" },
  { id: "qb40J4N1fa4", title: "Implicit differentiation, what's going on here?" },
  { id: "kfF40MiS7zA", title: "Limits, L'Hôpital's rule, and epsilon delta definitions" },
  { id: "rfG8ce4nNh0", title: "Integration and the fundamental theorem of calculus" },
  { id: "FnJqaIESC2s", title: "What does area have to do with slope?" },
  { id: "BLkz5LGWihw", title: "Higher order derivatives" },
  { id: "3d6DsjIBzJ4", title: "Taylor series" },
  { id: "CfW845LNObM", title: "The other way to visualize derivatives" }
]);

const studyVideoState = { selectedIndex: null };

const keys = ["A", "B", "C", "D"];
const modeLabels = {
  unit1: "Unit 1",
  unit2: "Unit 2",
  unit3: "Unit 3",
  unit4: "Unit 4",
  unit5: "Unit 5",
  unit6: "Unit 6",
  unit7: "Unit 7",
  unit8: "Unit 8",
  unit9: "Unit 9",
  unit10: "Unit 10"
};
const modeOrder = Object.keys(modeLabels);

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
const formulaPoolLimit = 118;
const formulaCycleRate = 0.31;
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
  { label: "Restricted Parabola", latex: "y=(x^2-4)\\{-2<x<3\\}", answer: "y=(x^2-4){-2<x<3}" },
  { label: "Upper Semicircle", latex: "y=\\sqrt{25-x^2}\\{-5\\le x\\le5\\}", answer: "y=sqrt(25-x^2){-5<=x<=5}" },
  { label: "Log Domain", latex: "y=\\ln(x-1)\\{x>1\\}", answer: "y=ln(x-1){x>1}" },
  { label: "Trig Window", latex: "y=\\sin(x)\\{0\\le x\\le2\\pi\\}", answer: "y=sin(x){0<=x<=2pi}" },
  { label: "Absolute Ray", latex: "y=|x-4|\\{x\\ge4\\}", answer: "y=abs(x-4){x>=4}" },
  { label: "Rational Branch", latex: "y=\\frac{x+1}{x-2}\\{x>2\\}", answer: "y=(x+1)/(x-2){x>2}" },
  { label: "Restricted Line", latex: "y=3x-1\\{-1\\le x\\le4\\}", answer: "y=3x-1{-1<=x<=4}" },
  { label: "Restricted Cubic", latex: "y=x^3-3x\\{-2\\le x\\le2\\}", answer: "y=x^3-3x{-2<=x<=2}" },
  { label: "Inequality", latex: "y>x^2-4", answer: "y>x^2-4" },
  { label: "Ellipse", latex: "\\frac{(x-1)^2}{9}+\\frac{(y+2)^2}{4}=1", answer: "((x-1)^2)/9+((y+2)^2)/4=1" },
  { label: "Shifted Circle", latex: "(x-2)^2+(y+3)^2=16", answer: "(x-2)^2+(y+3)^2=16" },
  { label: "Polar Rose", latex: "r=2\\sin(3\\theta)", answer: "r=2sin(3theta)" },
  { label: "Composite", latex: "y=\\sqrt{x^2+1}", answer: "y=sqrt(x^2+1)" },
  {
    label: "Parametric Circle",
    collegeboard: ["\\mathbf{r}(t)=\\langle\\cos(t),\\sin(t)\\rangle", "graph the vector-valued curve"],
    desmos: "(\\cos(t),\\sin(t))",
    answer: "(cos(t),sin(t))",
    answerVariants: [["X(t)=cos(t)", "Y(t)=sin(t)", "(X(t),Y(t))"]]
  },
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
    label: "Accumulation Function",
    collegeboard: ["f(x)=6x^2-4", { type: "mixed", parts: ["define ", { math: "A(x)=\\int_0^x f(t)dt" }] }],
    desmos: ["f(x)=6x^2-4", "A(x)=\\int_0^x f(t)dt"],
    answer: ["f(x)=6x^2-4", "A(x)=\\int_0^x f(t)dt"]
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

function signedTerm(value, body = "") {
  if (value === 0) return "";
  const magnitude = Math.abs(value);
  const text = body ? `${magnitude === 1 ? "" : magnitude}${body}` : String(magnitude);
  return `${value < 0 ? "-" : "+"}${text}`;
}

function leadingTerm(value, body = "") {
  if (value === 0) return "";
  const magnitude = Math.abs(value);
  const text = body ? `${magnitude === 1 ? "" : magnitude}${body}` : String(magnitude);
  return `${value < 0 ? "-" : ""}${text}`;
}

function cleanExpression(value) {
  return String(value || "")
    .replace(/^\+/, "")
    .replace(/\+\-/g, "-")
    .replace(/\-\-/g, "+")
    .replace(/\s+/g, "");
}

const unityCoefficientPattern = /(^|[=+\-({\[,])1(?=(?:[a-zA-Z]|\\(?:sin|cos|tan|sec|csc|cot|ln|log|sqrt|abs|pi|theta|operatorname|mathrm|left)))/g;

function omitUnityCoefficients(value) {
  return String(value || "").replace(unityCoefficientPattern, "$1");
}

function normalizeDesmosPromptPart(part) {
  if (Array.isArray(part)) return part.map(normalizeDesmosPromptPart);
  if (part && typeof part === "object") {
    if (part.type === "mixed") {
      return { ...part, parts: (part.parts || []).map(normalizeDesmosPromptPart) };
    }
    if (Object.prototype.hasOwnProperty.call(part, "math")) {
      return { ...part, math: omitUnityCoefficients(part.math) };
    }
    if (part.type === "math" && Object.prototype.hasOwnProperty.call(part, "value")) {
      return { ...part, value: omitUnityCoefficients(part.value) };
    }
    return part;
  }
  return part;
}

function normalizeDesmosPromptContent(value) {
  if (Array.isArray(value)) return value.map(normalizeDesmosPromptContent);
  if (value && typeof value === "object") return normalizeDesmosPromptPart(value);
  return omitUnityCoefficients(value);
}

function randomNonZero(min, max) {
  let value = 0;
  while (value === 0) value = randInt(min, max);
  return value;
}

function randomFunctionName() {
  return pick(["f", "g", "h", "p", "q"]);
}

function makePolynomial(variable = "x", degree = 3) {
  if (degree === 2) {
    return cleanExpression(`${leadingTerm(randomNonZero(-4, 4), `${variable}^2`)}${signedTerm(randInt(-6, 6), variable)}${signedTerm(randInt(-8, 8))}`);
  }
  return cleanExpression(`${leadingTerm(randomNonZero(-3, 3), `${variable}^3`)}${signedTerm(randInt(-5, 5), `${variable}^2`)}${signedTerm(randInt(-6, 6), variable)}${signedTerm(randInt(-8, 8))}`);
}

function generatedSimplePrompt() {
  const kind = randInt(1, 12);
  if (kind === 1) {
    const expr = makePolynomial("x", 2);
    return { label: "Generated Quadratic", latex: `y=${expr}`, answer: `y=${expr}`, signature: `quad:${expr}` };
  }
  if (kind === 2) {
    const a = randomNonZero(-4, 4);
    const b = randInt(-8, 8);
    const c = randomNonZero(-5, 5);
    const numerator = cleanExpression(`${leadingTerm(a, "x")}${signedTerm(b)}`);
    return {
      label: "Generated Rational",
      latex: `y=\\frac{${numerator}}{x${signedTerm(-c)}}`,
      answer: `y=(${numerator})/(x${signedTerm(-c)})`,
      signature: `rat:${numerator}:${c}`
    };
  }
  if (kind === 3) {
    const a = randomNonZero(1, 5);
    const b = randInt(-8, 8);
    const inside = cleanExpression(`${leadingTerm(a, "x")}${signedTerm(b)}`);
    return { label: "Generated Square Root", latex: `y=\\sqrt{${inside}}`, answer: `y=sqrt(${inside})`, signature: `sqrt:${inside}` };
  }
  if (kind === 4) {
    const a = randomNonZero(-4, 4);
    const b = randInt(-8, 8);
    const inside = cleanExpression(`${leadingTerm(a, "x")}${signedTerm(b)}`);
    return { label: "Generated Absolute Value", latex: `y=|${inside}|`, answer: `y=abs(${inside})`, signature: `abs:${inside}` };
  }
  if (kind === 5) {
    const a = randomNonZero(1, 4);
    const b = randomNonZero(1, 4);
    return { label: "Generated Trig", latex: `y=${a}\\sin(${b}x)`, answer: `y=${a}sin(${b}x)`, signature: `trig:${a}:${b}` };
  }
  if (kind === 6) {
    const h = randInt(-4, 4);
    const k = randInt(-4, 4);
    const r = randInt(2, 7);
    return {
      label: "Generated Circle",
      latex: `(x${signedTerm(-h)})^2+(y${signedTerm(-k)})^2=${r * r}`,
      answer: `(x${signedTerm(-h)})^2+(y${signedTerm(-k)})^2=${r * r}`,
      signature: `circle:${h}:${k}:${r}`
    };
  }
  if (kind === 7) {
    const h = randInt(-3, 3);
    const k = randInt(-3, 3);
    const a = pick([4, 9, 16]);
    const b = pick([4, 9, 16].filter((value) => value !== a));
    return {
      label: "Generated Ellipse",
      latex: `\\frac{(x${signedTerm(-h)})^2}{${a}}+\\frac{(y${signedTerm(-k)})^2}{${b}}=1`,
      answer: `((x${signedTerm(-h)})^2)/${a}+((y${signedTerm(-k)})^2)/${b}=1`,
      signature: `ellipse:${h}:${k}:${a}:${b}`
    };
  }
  if (kind === 8) {
    const expr = makePolynomial("x", 2);
    const low = randInt(-4, 0);
    const high = randInt(1, 5);
    return {
      label: "Generated Restriction",
      latex: `y=${expr}\\{${low}\\le x\\le${high}\\}`,
      answer: `y=${expr}{${low}<=x<=${high}}`,
      signature: `restriction:${expr}:${low}:${high}`
    };
  }
  if (kind === 9) {
    const a = randomNonZero(1, 4);
    const b = randInt(-5, 5);
    const inside = cleanExpression(`${leadingTerm(a, "x")}${signedTerm(b)}`);
    return { label: "Generated Log", latex: `y=\\ln(${inside})`, answer: `y=ln(${inside})`, signature: `ln:${inside}` };
  }
  if (kind === 10) {
    const a = randomNonZero(1, 4);
    const b = randInt(-5, 5);
    return { label: "Generated Exponential", latex: `y=${a}e^x${signedTerm(b)}`, answer: `y=${a}e^x${signedTerm(b)}`, signature: `exp:${a}:${b}` };
  }
  if (kind === 11) {
    const a = randomNonZero(1, 4);
    const b = randomNonZero(1, 5);
    return { label: "Generated Polar", latex: `r=${a}\\sin(${b}\\theta)`, answer: `r=${a}sin(${b}\\theta)`, signature: `polar:${a}:${b}` };
  }
  const slopeTop = randomNonZero(-5, 5);
  const slopeBottom = randInt(2, 6);
  const b = randInt(-8, 8);
  return {
    label: "Generated Line",
    latex: `y=\\frac{${slopeTop}}{${slopeBottom}}x${signedTerm(b)}`,
    answer: `y=(${slopeTop}/${slopeBottom})x${signedTerm(b)}`,
    signature: `line:${slopeTop}:${slopeBottom}:${b}`
  };
}

const desmosCalculusKindTiers = Object.freeze({
  1: [1, 2, 3, 4, 5, 7],
  2: [6, 8, 10, 11, 12, 13, 16],
  3: [9, 14, 15]
});

function desmosCalculusKindsForDifficulty(maxDifficulty) {
  const cappedDifficulty = clamp(Math.trunc(maxDifficulty) || 1, 1, 3);
  return Object.entries(desmosCalculusKindTiers)
    .filter(([difficulty]) => Number(difficulty) <= cappedDifficulty)
    .flatMap(([, kinds]) => kinds);
}

function generatedCalculusPrompt(maxDifficulty = 3) {
  const kind = pick(desmosCalculusKindsForDifficulty(maxDifficulty));
  const fn = randomFunctionName();
  if (kind === 1) {
    const expr = makePolynomial("x", 3);
    return {
      label: "Generated Derivative",
      collegeboard: [`${fn}(x)=${expr}`, { type: "mixed", parts: ["derivative of ", { math: `${fn}(x)` }] }],
      desmos: [`${fn}(x)=${expr}`, `${fn}'(x)`],
      answer: [`${fn}(x)=${expr}`, `${fn}'(x)`],
      signature: `deriv:${fn}:${expr}`
    };
  }
  if (kind === 2) {
    const expr = makePolynomial("x", 3);
    const at = randInt(-3, 4);
    return {
      label: "Generated Rate of Change",
      collegeboard: [`${fn}(x)=${expr}`, { type: "mixed", parts: ["rate of change of ", { math: fn }, " at ", { math: `x=${at}` }] }],
      desmos: [`${fn}(x)=${expr}`, `${fn}'(${at})`],
      answer: [`${fn}(x)=${expr}`, `${fn}'(${at})`],
      signature: `rate:${fn}:${expr}:${at}`
    };
  }
  if (kind === 3) {
    const expr = makePolynomial("t", 2);
    const upper = randInt(2, 7);
    return {
      label: "Generated Net Change",
      collegeboard: [`v(t)=${expr}`, { type: "mixed", parts: ["net change on ", { math: `[0,${upper}]` }] }],
      desmos: [`v(t)=${expr}`, `\\int_0^${upper} v(t)dt`],
      answer: [`v(t)=${expr}`, `\\int_0^${upper} v(t)dt`],
      signature: `net:${expr}:${upper}`
    };
  }
  if (kind === 4) {
    const coefficient = randInt(1, 4);
    const horizontalShift = randInt(-3, 3);
    const verticalShift = randInt(1, 5);
    const expr = `${leadingTerm(coefficient, `(x${signedTerm(-horizontalShift)})^2`)}${signedTerm(verticalShift)}`;
    const upper = randInt(2, 6);
    return {
      label: "Generated Area Under a Curve",
      collegeboard: [`${fn}(x)=${expr}`, { type: "mixed", parts: ["area bounded by ", { math: `y=${fn}(x)` }, ", the x-axis, and ", { math: `x=0` }, ", ", { math: `x=${upper}` }] }],
      desmos: [`${fn}(x)=${expr}`, `\\int_0^${upper} ${fn}(x)dx`],
      answer: [`${fn}(x)=${expr}`, `\\int_0^${upper} ${fn}(x)dx`],
      signature: `area:${fn}:${expr}:${upper}`
    };
  }
  if (kind === 5) {
    const expr = makePolynomial("x", 2);
    const lower = randInt(0, 2);
    const upper = randInt(lower + 2, lower + 6);
    return {
      label: "Generated Average Value",
      collegeboard: [`${fn}(x)=${expr}`, { type: "mixed", parts: ["average value on ", { math: `[${lower},${upper}]` }] }],
      desmos: [`${fn}(x)=${expr}`, `\\frac{1}{${upper - lower}}\\int_${lower}^${upper} ${fn}(x)dx`],
      answer: [`${fn}(x)=${expr}`, `\\frac{1}{${upper - lower}}\\int_${lower}^${upper} ${fn}(x)dx`],
      signature: `avg:${fn}:${expr}:${lower}:${upper}`
    };
  }
  if (kind === 6) {
    const a = randomNonZero(1, 4);
    const b = randomNonZero(1, 4);
    const upper = b === 1 ? "\\pi" : `\\frac{\\pi}{${b}}`;
    return {
      label: "Generated Polar Petal Area",
      collegeboard: [`r(\\theta)=${a}\\sin(${b}\\theta)`, { type: "mixed", parts: ["area of one petal traced for ", { math: `0\\le\\theta\\le${upper}` }] }],
      desmos: [`r(\\theta)=${a}\\sin(${b}\\theta)`, `\\frac{1}{2}\\int_0^{${upper}} r(\\theta)^2d\\theta`],
      answer: [`r(\\theta)=${a}sin(${b}\\theta)`, `\\frac{1}{2}\\int_0^{${upper}} r(\\theta)^2d\\theta`],
      signature: `polar-area:${a}:${b}`
    };
  }
  if (kind === 7) {
    const a = randomNonZero(1, 4);
    const b = randomNonZero(1, 4);
    const xComponent = leadingTerm(a, "\\cos(t)");
    const yComponent = leadingTerm(b, "\\sin(t)");
    const xAnswer = leadingTerm(a, "cos(t)");
    const yAnswer = leadingTerm(b, "sin(t)");
    return {
      label: "Generated Vector-Valued Curve",
      collegeboard: [`\\mathbf{r}(t)=\\langle${xComponent},${yComponent}\\rangle`, "graph the vector-valued curve"],
      desmos: `( ${xComponent}, ${yComponent} )`,
      answer: `(${xAnswer},${yAnswer})`,
      answerVariants: [[`X(t)=${xAnswer}`, `Y(t)=${yAnswer}`, "(X(t),Y(t))"]],
      signature: `param:${a}:${b}`
    };
  }
  if (kind === 8) {
    const expr = makePolynomial("x", 2);
    const lower = randInt(-2, 2);
    return {
      label: "Generated Accumulation Function",
      collegeboard: [`${fn}(x)=${expr}`, { type: "mixed", parts: ["define the accumulation function ", { math: `A(x)=\\int_{${lower}}^x ${fn}(t)dt` }] }],
      desmos: [`${fn}(x)=${expr}`, `A(x)=\\int_{${lower}}^x ${fn}(t)dt`],
      answer: [`${fn}(x)=${expr}`, `A(x)=\\int_{${lower}}^x ${fn}(t)dt`],
      signature: `accumulation:${fn}:${expr}:${lower}`
    };
  }
  if (kind === 9) {
    const lower = randInt(-2, 1);
    const upper = randInt(lower + 2, lower + 5);
    const slope = randomNonZero(-3, 3);
    const intercept = randInt(-4, 4);
    const gapScale = randInt(1, 3);
    const lowerExpr = cleanExpression(`${leadingTerm(slope, "x")}${signedTerm(intercept)}`);
    const gapExpr = `${leadingTerm(gapScale, `(x${signedTerm(-lower)})(${upper}-x)`)}`;
    return {
      label: "Generated Area Between Curves",
      collegeboard: [`g(x)=${lowerExpr}`, `f(x)=g(x)+${gapExpr}`, { type: "mixed", parts: ["area between ", { math: "f" }, " and ", { math: "g" }, " on ", { math: `[${lower},${upper}]` }] }],
      desmos: [`g(x)=${lowerExpr}`, `f(x)=g(x)+${gapExpr}`, `\\int_{${lower}}^{${upper}}(f(x)-g(x))dx`],
      answer: [`g(x)=${lowerExpr}`, `f(x)=g(x)+${gapExpr}`, `\\int_{${lower}}^{${upper}}(f(x)-g(x))dx`],
      signature: `between:${lowerExpr}:${gapExpr}:${lower}:${upper}`
    };
  }
  if (kind === 10) {
    const slope = randInt(1, 4);
    const intercept = randInt(1, 5);
    const upper = randInt(2, 6);
    const expr = cleanExpression(`${leadingTerm(slope, "x")}${signedTerm(intercept)}`);
    return {
      label: "Generated Disk Volume",
      collegeboard: [`${fn}(x)=${expr}`, { type: "mixed", parts: ["volume formed by rotating the region under ", { math: fn }, " on ", { math: `[0,${upper}]` }, " about the x-axis"] }],
      desmos: [`${fn}(x)=${expr}`, `\\pi\\int_0^${upper} ${fn}(x)^2dx`],
      answer: [`${fn}(x)=${expr}`, `\\pi\\int_0^${upper} ${fn}(x)^2dx`],
      signature: `disk:${fn}:${expr}:${upper}`
    };
  }
  if (kind === 11) {
    const xSlope = randomNonZero(-4, 4);
    const xIntercept = randInt(-4, 4);
    const yCoefficient = randomNonZero(-3, 3);
    const ySlope = randInt(-4, 4);
    const at = randInt(-2, 3);
    const xExpr = cleanExpression(`${leadingTerm(xSlope, "t")}${signedTerm(xIntercept)}`);
    const yExpr = cleanExpression(`${leadingTerm(yCoefficient, "t^2")}${signedTerm(ySlope, "t")}`);
    return {
      label: "Generated Parametric Slope",
      collegeboard: [`x(t)=${xExpr}`, `y(t)=${yExpr}`, { type: "mixed", parts: ["find ", { math: "\\frac{dy}{dx}" }, " at ", { math: `t=${at}` }] }],
      desmos: [`X(t)=${xExpr}`, `Y(t)=${yExpr}`, `\\frac{Y'(${at})}{X'(${at})}`],
      answer: [`X(t)=${xExpr}`, `Y(t)=${yExpr}`, `Y'(${at})/X'(${at})`],
      answerVariants: [[`f(t)=${xExpr}`, `g(t)=${yExpr}`, `g'(${at})/f'(${at})`]],
      signature: `param-slope:${xExpr}:${yExpr}:${at}`
    };
  }
  if (kind === 12) {
    const xCoefficient = randInt(1, 3);
    const xSlope = randInt(1, 4);
    const yCoefficient = randInt(1, 3);
    const ySlope = randInt(1, 4);
    const at = randInt(1, 3);
    const xExpr = cleanExpression(`${leadingTerm(xCoefficient, "t^2")}${signedTerm(xSlope, "t")}`);
    const yExpr = cleanExpression(`${leadingTerm(yCoefficient, "t^2")}${signedTerm(ySlope, "t")}`);
    return {
      label: "Generated Parametric Speed",
      collegeboard: [`\\mathbf{r}(t)=\\langle${xExpr},${yExpr}\\rangle`, { type: "mixed", parts: ["speed at ", { math: `t=${at}` }] }],
      desmos: [`X(t)=${xExpr}`, `Y(t)=${yExpr}`, `\\sqrt{X'(${at})^2+Y'(${at})^2}`],
      answer: [`X(t)=${xExpr}`, `Y(t)=${yExpr}`, `sqrt(X'(${at})^2+Y'(${at})^2)`],
      answerVariants: [[`f(t)=${xExpr}`, `g(t)=${yExpr}`, `sqrt(f'(${at})^2+g'(${at})^2)`]],
      signature: `param-speed:${xExpr}:${yExpr}:${at}`
    };
  }
  if (kind === 13) {
    const expr = makePolynomial("x", 3);
    const at = randInt(-3, 3);
    return {
      label: "Generated Tangent Line",
      collegeboard: [`${fn}(x)=${expr}`, { type: "mixed", parts: ["tangent line to ", { math: fn }, " at ", { math: `x=${at}` }] }],
      desmos: [`${fn}(x)=${expr}`, `y=${fn}(${at})+${fn}'(${at})(x${signedTerm(-at)})`],
      answer: [`${fn}(x)=${expr}`, `y=${fn}(${at})+${fn}'(${at})(x${signedTerm(-at)})`],
      signature: `tangent:${fn}:${expr}:${at}`
    };
  }
  if (kind === 14) {
    const xCoefficient = randInt(1, 4);
    const yCoefficient = randInt(1, 3);
    const upper = randInt(2, 5);
    const xExpr = `${xCoefficient}t`;
    const yExpr = `${yCoefficient}t^2`;
    return {
      label: "Generated Parametric Arc Length",
      collegeboard: [`x(t)=${xExpr}`, `y(t)=${yExpr}`, { type: "mixed", parts: ["arc length for ", { math: `0\\le t\\le${upper}` }] }],
      desmos: [`X(t)=${xExpr}`, `Y(t)=${yExpr}`, `\\int_0^${upper}\\sqrt{X'(t)^2+Y'(t)^2}dt`],
      answer: [`X(t)=${xExpr}`, `Y(t)=${yExpr}`, `\\int_0^${upper}sqrt(X'(t)^2+Y'(t)^2)dt`],
      answerVariants: [[`f(t)=${xExpr}`, `g(t)=${yExpr}`, `\\int_0^${upper}sqrt(f'(t)^2+g'(t)^2)dt`]],
      signature: `param-arc:${xCoefficient}:${yCoefficient}:${upper}`
    };
  }
  if (kind === 15) {
    const series = pick([
      { fn: "e^x", degree: 4, latexPolynomial: "1+x+\\frac{x^2}{2}+\\frac{x^3}{6}+\\frac{x^4}{24}", answerPolynomial: "1+x+x^2/2+x^3/6+x^4/24" },
      { fn: "\\sin(x)", degree: 5, latexPolynomial: "x-\\frac{x^3}{6}+\\frac{x^5}{120}", answerPolynomial: "x-x^3/6+x^5/120" },
      { fn: "\\cos(x)", degree: 4, latexPolynomial: "1-\\frac{x^2}{2}+\\frac{x^4}{24}", answerPolynomial: "1-x^2/2+x^4/24" },
      { fn: "\\ln(1+x)", degree: 4, latexPolynomial: "x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\frac{x^4}{4}", answerPolynomial: "x-x^2/2+x^3/3-x^4/4" }
    ]);
    return {
      label: "Generated Taylor Polynomial",
      collegeboard: [`f(x)=${series.fn}`, { type: "mixed", parts: [`degree ${series.degree} Maclaurin polynomial for `, { math: "f" }] }],
      desmos: [`f(x)=${series.fn}`, `P(x)=${series.latexPolynomial}`],
      answer: [`f(x)=${series.fn}`, `P(x)=${series.answerPolynomial}`],
      signature: `taylor:${series.fn}:${series.degree}`
    };
  }
  const xCoefficient = randomNonZero(-3, 3);
  const xSlope = randomNonZero(-4, 4);
  const yCoefficient = randomNonZero(-3, 3);
  const ySlope = randomNonZero(-4, 4);
  const at = randInt(-2, 3);
  const derivativeOrder = pick([1, 2]);
  const quantity = derivativeOrder === 1 ? "velocity" : "acceleration";
  const prime = derivativeOrder === 1 ? "'" : "''";
  const xExpr = cleanExpression(`${leadingTerm(xCoefficient, "t^2")}${signedTerm(xSlope, "t")}`);
  const yExpr = cleanExpression(`${leadingTerm(yCoefficient, "t^2")}${signedTerm(ySlope, "t")}`);
  return {
    label: `Generated Vector ${derivativeOrder === 1 ? "Velocity" : "Acceleration"}`,
    collegeboard: [`\\mathbf{r}(t)=\\langle${xExpr},${yExpr}\\rangle`, { type: "mixed", parts: [`${quantity} vector at `, { math: `t=${at}` }] }],
    desmos: [`X(t)=${xExpr}`, `Y(t)=${yExpr}`, `(X${prime}(${at}),Y${prime}(${at}))`],
    answer: [`X(t)=${xExpr}`, `Y(t)=${yExpr}`, `(X${prime}(${at}),Y${prime}(${at}))`],
    answerVariants: [[`f(t)=${xExpr}`, `g(t)=${yExpr}`, `(f${prime}(${at}),g${prime}(${at}))`]],
    signature: `vector-${quantity}:${xExpr}:${yExpr}:${at}`
  };
}

function generateDesmosPrompt(maxDifficulty = 3) {
  return Math.random() < 0.75 ? generatedCalculusPrompt(maxDifficulty) : generatedSimplePrompt();
}

const mathTypingTerms = [
  "y=x^2+3x-4",
  "y=sqrtx+5→",
  "y=(x+1)/(x-2)",
  "y=abs(x-3)",
  "y=2sin(x)",
  "y=cos(2x)",
  "y=ln(x)+1",
  "y=e^x-4",
  "x^2+y^2=25",
  "y=(2/3)x-5",
  "y=tan(x)",
  "y=pi*x",
  "y=x^2{x>0}",
  "sqrtx^2+1→",
  "sqrtx→",
  "x^2",
  "x^3",
  "x^4-3x^2+2",
  "f(x)",
  "g(x)",
  "f(x)=x^3-4x",
  "g(x)=sqrtx+1→",
  "f'(x)",
  "g'(x)",
  "f''(x)",
  "g''(x)",
  "f'(2)",
  "int→0↑x→f(t)dt",
  "int→0↑4→v(t)dt",
  "int→0↑3→f(x)dx",
  "int→1↑e→f(x)dx",
  "int→0↑pi→.5r(theta)^2dtheta",
  "d/dx(x^3-4x)",
  "dy/dx",
  "dx/dt",
  "dy/dt",
  "dr/dtheta",
  "d^2y/dx^2",
  "sin(x)",
  "cos(x)",
  "tan(x)",
  "1/cos(x)^2",
  "sin(theta)",
  "cos(theta)",
  "ln(x)",
  "e^x",
  "abs(x)",
  "pi*x",
  "2theta",
  "r(theta)",
  "r'(theta)",
  "r(theta)=2sin(theta)",
  "x(t)=cos(t)",
  "y(t)=sin(t)",
  "sqrtx+5→+2",
  "(x+1)/(x-2)→^2",
  "x^3→-4x",
  "int→0↑x→f(t)dt",
  "sin(theta)→+cos(theta)",
  "↵"
];

const macLetterKey = (key) => ({ key, label: key.toUpperCase(), kind: "letter" });
const macSymbolKey = (key, label, alternate, options = {}) => ({
  key,
  label,
  alternate,
  kind: "symbol",
  ...options
});
const macModifierKey = (key, label, options = {}) => ({ key, label, kind: "modifier", ...options });

const mathTypingKeyboardRows = [
  [
    macSymbolKey("`", "`", "~"),
    macSymbolKey("1", "1", "!"),
    macSymbolKey("2", "2", "@"),
    macSymbolKey("3", "3", "#"),
    macSymbolKey("4", "4", "$"),
    macSymbolKey("5", "5", "%"),
    macSymbolKey("6", "6", "^"),
    macSymbolKey("7", "7", "&"),
    macSymbolKey("8", "8", "*"),
    macSymbolKey("9", "9", "("),
    macSymbolKey("0", "0", ")"),
    macSymbolKey("-", "-", "_"),
    macSymbolKey("=", "=", "+"),
    macModifierKey("backspace", "delete", { units: 1.5, align: "right" })
  ],
  [
    macModifierKey("tab", "tab", { units: 1.5 }),
    ..."qwertyuiop".split("").map(macLetterKey),
    macSymbolKey("[", "[", "{"),
    macSymbolKey("]", "]", "}"),
    macSymbolKey("\\", "\\", "|", { units: 1.5 })
  ],
  [
    macModifierKey("caps", "caps lock", { units: 1.75 }),
    ..."asdfghjkl".split("").map(macLetterKey),
    macSymbolKey(";", ";", ":"),
    macSymbolKey("'", "'", "\""),
    macModifierKey("enter", "return", { units: 2.25, align: "right" })
  ],
  [
    macModifierKey("shift", "shift", { units: 2.25 }),
    ..."zxcvbnm".split("").map(macLetterKey),
    macSymbolKey(",", ",", "<"),
    macSymbolKey(".", ".", ">"),
    macSymbolKey("/", "/", "?"),
    macModifierKey("shift", "shift", { units: 2.75, align: "right" })
  ],
  [
    macModifierKey("fn", "fn", { symbol: "◎" }),
    macModifierKey("control", "control", { symbol: "⌃" }),
    macModifierKey("option", "option", { symbol: "⌥" }),
    macModifierKey("command", "command", { units: 1.25, symbol: "⌘" }),
    { key: "space", label: "", units: 5.25, kind: "space" },
    macModifierKey("command", "command", { units: 1.25, symbol: "⌘" }),
    macModifierKey("option", "option", { symbol: "⌥" }),
    {
      units: 3,
      arrowCluster: [
        { key: "arrowup", label: "↑", kind: "arrow" },
        { key: "arrowleft", label: "←", kind: "arrow" },
        { key: "arrowdown", label: "↓", kind: "arrow" },
        { key: "arrowright", label: "→", kind: "arrow" }
      ]
    }
  ]
];

const mathTypingArrowKeyChars = {
  ArrowLeft: "←",
  ArrowRight: "→",
  ArrowUp: "↑",
  ArrowDown: "↓"
};

function studyVideoEmbedUrl(videoId, autoplay = false) {
  const params = new URLSearchParams({
    rel: "0",
    playsinline: "1",
    enablejsapi: "1"
  });
  if (autoplay) params.set("autoplay", "1");
  if (window.location.protocol !== "file:") params.set("origin", window.location.origin);
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function setStudyVideo(index, options = {}) {
  if (!elements.studyVideoPlayer || !elements.studyVideoWatch || !studyVideos.length) return;
  const nextIndex = clamp(Math.trunc(index) || 0, 0, studyVideos.length - 1);
  const video = studyVideos[nextIndex];
  const autoplay = Boolean(options.autoplay);
  studyVideoState.selectedIndex = nextIndex;
  elements.studyVideoWatch.hidden = false;

  const currentSource = elements.studyVideoPlayer.getAttribute("src") || "";
  if (autoplay || !currentSource.includes(`/embed/${video.id}`)) {
    elements.studyVideoPlayer.src = studyVideoEmbedUrl(video.id, autoplay);
  }
  elements.studyVideoPlayer.dataset.videoId = video.id;
  elements.studyVideoPlayer.title = `${video.title} by 3Blue1Brown`;

  if (elements.studyVideoChapter) elements.studyVideoChapter.textContent = `Chapter ${nextIndex + 1} of ${studyVideos.length}`;
  if (elements.studyVideoTitle) elements.studyVideoTitle.textContent = video.title;

  const videoButtons = elements.studyVideoGrid
    ? [...elements.studyVideoGrid.querySelectorAll("[data-study-video-index]")]
    : [];
  videoButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === nextIndex;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    if (active) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  if (options.scroll) {
    elements.studyVideoWatch.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function pauseStudyVideoPlayback() {
  if (!elements.studyVideoPlayer || !elements.studyVideoPlayer.contentWindow) return;
  elements.studyVideoPlayer.contentWindow.postMessage(
    JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
    "https://www.youtube-nocookie.com"
  );
}

function closeStudyVideo(options = {}) {
  if (!elements.studyVideoPlayer || !elements.studyVideoWatch) return;
  const previousIndex = studyVideoState.selectedIndex;
  pauseStudyVideoPlayback();
  elements.studyVideoPlayer.removeAttribute("src");
  delete elements.studyVideoPlayer.dataset.videoId;
  elements.studyVideoWatch.hidden = true;
  studyVideoState.selectedIndex = null;

  const videoButtons = elements.studyVideoGrid
    ? [...elements.studyVideoGrid.querySelectorAll("[data-study-video-index]")]
    : [];
  videoButtons.forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
    button.removeAttribute("aria-current");
  });

  if (options.focus && previousIndex !== null && videoButtons[previousIndex]) {
    videoButtons[previousIndex].focus();
  }
}

function initStudyVideoGrid() {
  if (!elements.studyVideoGrid || !elements.studyVideoPlayer) return;
  elements.studyVideoGrid.replaceChildren();

  studyVideos.forEach((video, index) => {
    const button = document.createElement("button");
    const thumbnail = document.createElement("span");
    const image = document.createElement("img");
    const playIcon = document.createElement("span");
    const details = document.createElement("span");
    const copy = document.createElement("span");
    const chapter = document.createElement("small");
    const title = document.createElement("strong");

    button.type = "button";
    button.className = "study-video-card";
    button.dataset.studyVideoIndex = String(index);
    button.setAttribute("aria-label", `Play chapter ${index + 1}: ${video.title}`);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => setStudyVideo(index, { autoplay: true, scroll: true }));

    thumbnail.className = "study-video-thumbnail";
    image.src = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
    image.alt = "";
    image.loading = index === 0 ? "eager" : "lazy";
    image.decoding = "async";
    playIcon.className = "study-video-play-icon";
    playIcon.setAttribute("aria-hidden", "true");
    playIcon.textContent = "▶";
    thumbnail.append(image, playIcon);

    details.className = "study-video-card-details";
    copy.className = "study-video-card-copy";
    title.textContent = video.title;
    chapter.textContent = `Essence of Calculus | Chapter ${index + 1}`;
    copy.append(title, chapter);
    details.appendChild(copy);

    button.append(thumbnail, details);
    elements.studyVideoGrid.appendChild(button);
  });

  if (elements.studyVideoClose) {
    elements.studyVideoClose.addEventListener("click", () => closeStudyVideo({ focus: true }));
  }
}

const mathTypingSpecialKeyChars = {
  ...mathTypingArrowKeyChars,
  Enter: "↵"
};

const mathTypingArrowCharKeys = {
  "←": "arrowleft",
  "→": "arrowright",
  "↑": "arrowup",
  "↓": "arrowdown",
  "↵": "enter"
};

const mathTypingShiftKeyMap = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  "$": "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  "_": "-",
  "+": "=",
  "{": "[",
  "}": "]",
  "|": "\\",
  ":": ";",
  "\"": "'",
  "<": ",",
  ">": ".",
  "?": "/"
};

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

function createFloatingIntegralBody() {
  return pick([
    " f(x) dx",
    " x dx",
    " x^2 dx",
    " 1/x dx",
    "_0^1 f(x) dx",
    "_a^b f(x) dx",
    "_0^x f(t) dt",
    " e^x dx",
    " sin x dx",
    " v(t) dt",
    " r^2 dθ"
  ]);
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
  return `\\lim_{${condition}}${expression}`;
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

  node.dataset.rawLatex = latex;
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

function repairBlankMathNode(node) {
  if (!node || node.classList.contains("math-fallback")) return;
  const rawLatex = node.dataset.rawLatex || "";
  const visibleText = (node.textContent || "").replace(/\s+/g, "");
  const root = node.querySelector(".mq-root-block");
  const hasVisibleMath = visibleText.length > 0 || (root && root.getBoundingClientRect().width > 2);
  if (hasVisibleMath) return;
  node.textContent = rawLatex;
  node.classList.add("math-fallback");
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
    if (node.dataset.mathRendered === "true") return;
    const rendered = renderStaticMath(node, node.dataset.latex, true);
    rendered.dataset.mathRendered = "true";
  });
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
    .replace(/\\leq?|≤/g, "<=")
    .replace(/\\geq?|≥/g, ">=")
    .replace(/\\neq?|≠/g, "!=")
    .replace(/\\operatorname\{([^{}]+)\}/g, "$1")
    .replace(/\\mathrm\{([^{}]+)\}/g, "$1")
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
  let text = omitUnityCoefficients(desmosLatexToText(value)
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
    .replace(/\*/g, ""));

  text = text.replace(/\|([^|]+)\|/g, "abs($1)");

  let previous = "";
  while (text !== previous) {
    previous = text;
    text = text
      .replace(/(?<![a-z])\(([a-z](?:'+)?\([^()]+\))\)/g, "$1")
      .replace(/(?<![a-z])\(([-+]?\d+(?:\.\d+)?|[a-z][a-z0-9_]*(?:\^-?\d+(?:\.\d+)?)?)\)/g, "$1");
  }

  return canonicalizeSimpleFractions(text);
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
  const remaining = [...typedLines];
  return expectedLines.every((line) => {
    const matchIndex = remaining.indexOf(line);
    if (matchIndex < 0) return false;
    remaining.splice(matchIndex, 1);
    return true;
  });
}

function desmosAnswerVariants(prompt) {
  return [prompt.answer, ...(prompt.answerVariants || [])];
}

const intermediateStaticDesmosLabels = new Set([
  "Antiderivative",
  "Accumulation Function",
  "Net Change",
  "Function Area",
  "Polar Area",
  "Average Value"
]);

function desmosDifficultyForScore(score) {
  if (score >= 10) return 3;
  if (score >= 5) return 2;
  return 1;
}

function staticDesmosPromptDifficulty(prompt) {
  return intermediateStaticDesmosLabels.has(prompt.label) ? 2 : 1;
}

function pickDesmosPrompt() {
  const maxDifficulty = desmosDifficultyForScore(desmosState.score);
  const staticCandidates = desmosPrompts.filter((prompt) => staticDesmosPromptDifficulty(prompt) <= maxDifficulty);
  const createPrompt = () => Math.random() < 0.9
    ? generateDesmosPrompt(maxDifficulty)
    : pick(staticCandidates);
  let prompt = createPrompt();
  if (staticCandidates.length > 1) {
    let guard = 0;
    while ((prompt === desmosState.current || (desmosState.current && prompt.signature === desmosState.current.signature)) && guard < 12) {
      guard += 1;
      prompt = createPrompt();
    }
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

function clearDesmosFeedbackEffect() {
  if (desmosState.feedbackEffectTimer) {
    window.clearTimeout(desmosState.feedbackEffectTimer);
    desmosState.feedbackEffectTimer = 0;
  }

  if (elements.desmosCalculatorStage) {
    elements.desmosCalculatorStage.classList.remove("feedback-good");
  }
  if (elements.desmosScore) elements.desmosScore.classList.remove("score-bump");
  if (elements.desmosFeedbackEffect) {
    elements.desmosFeedbackEffect.className = "desmos-feedback-effect";
    elements.desmosFeedbackEffect.replaceChildren();
  }
}

function clearPendingDesmosTimers() {
  clearPendingDesmosAdvance();
  clearPendingDesmosReady();
  clearDesmosFeedbackEffect();
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

function scheduleNextDesmosPrompt() {
  clearPendingDesmosAdvance();
  const token = desmosState.advanceToken + 1;
  desmosState.advanceToken = token;
  desmosState.advanceTimer = window.setTimeout(() => {
    desmosState.advanceTimer = 0;
    if (!desmosState.running || desmosState.mode !== "speedrun" || desmosState.advanceToken !== token) return;
    nextDesmosPrompt();
  }, 650);
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
  updateDesmosScoreView();
}

function updateDesmosScoreView() {
  if (!elements.desmosScore) return;
  const visible = desmosSettings.timebar && desmosState.mode === "speedrun";
  elements.desmosScore.hidden = !visible;
  if (elements.desmosScoreValue) elements.desmosScoreValue.textContent = String(desmosState.score);
  elements.desmosScore.setAttribute("aria-label", `Score ${desmosState.score}`);
}

function flashDesmosTime() {
  flashTime();
  updateDesmosTimerView();
}

function getPromptCardContent(prompt, target) {
  let content = null;
  if (target.closest(".prompt-mathquill")) {
    content = prompt.desmos || prompt.desmosLatex || prompt.latex;
  } else {
    content = prompt.collegeboard || prompt.latex;
  }
  return normalizeDesmosPromptContent(content);
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
  [0, 90, 220, 520].forEach((delay) => {
    window.setTimeout(() => {
      if (desmosState.current === prompt) ensureDesmosPromptCardsFilled(prompt);
    }, delay);
  });
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
  const source = String(latex || "");
  const displaySource = desmosPromptLatexForMathQuill(source);
  const fallback = desmosPromptDisplayText(displaySource) || displaySource || source;
  node.innerHTML = "";
  node.dataset.source = displaySource;
  node.dataset.fallback = fallback;
  node.classList.remove("math-fallback", "prompt-plain-math", "desmos-prompt-raw-latex");

  const mq = getMathQuill();
  if (!mq) {
    node.textContent = displaySource;
    node.classList.add("desmos-prompt-raw-latex");
    return node;
  }

  try {
    node.textContent = displaySource;
    mq.StaticMath(node);
    if (!node.querySelector(".mq-root-block")) {
      node.textContent = displaySource;
      node.classList.add("desmos-prompt-raw-latex");
    }
  } catch {
    node.textContent = displaySource;
    node.classList.add("desmos-prompt-raw-latex");
  }

  return node;
}

function desmosPromptLatexForMathQuill(value) {
  return String(value || "")
    .replace(/\\\{/g, "\\left\\{")
    .replace(/\\\}/g, "\\right\\}");
}

function replaceFirstLatexGroup(text, command, formatter) {
  const start = text.indexOf(command + "{");
  if (start < 0) return null;
  let depth = 0;
  const groupStart = start + command.length + 1;
  for (let index = groupStart; index < text.length; index += 1) {
    if (text[index] === "{") depth += 1;
    if (text[index] === "}") {
      if (depth === 0) {
        const inner = text.slice(groupStart, index);
        return text.slice(0, start) + formatter(inner) + text.slice(index + 1);
      }
      depth -= 1;
    }
  }
  return null;
}

function replaceFirstLatexFraction(text) {
  const start = text.indexOf("\\frac{");
  if (start < 0) return null;
  let depth = 0;
  const topStart = start + 6;
  let topEnd = -1;
  for (let index = topStart; index < text.length; index += 1) {
    if (text[index] === "{") depth += 1;
    if (text[index] === "}") {
      if (depth === 0) {
        topEnd = index;
        break;
      }
      depth -= 1;
    }
  }
  if (topEnd < 0 || text[topEnd + 1] !== "{") return null;
  depth = 0;
  const bottomStart = topEnd + 2;
  for (let index = bottomStart; index < text.length; index += 1) {
    if (text[index] === "{") depth += 1;
    if (text[index] === "}") {
      if (depth === 0) {
        const top = desmosPromptDisplayText(text.slice(topStart, topEnd));
        const bottom = desmosPromptDisplayText(text.slice(bottomStart, index));
        return text.slice(0, start) + `(${top})/(${bottom})` + text.slice(index + 1);
      }
      depth -= 1;
    }
  }
  return null;
}

function desmosPromptDisplayText(value) {
  let text = String(value || "");
  let next = "";
  while ((next = replaceFirstLatexFraction(text)) !== null) text = next;
  while ((next = replaceFirstLatexGroup(text, "\\sqrt", (inner) => `√(${desmosPromptDisplayText(inner)})`)) !== null) text = next;
  return text
    .replace(/\\left|\\right/g, "")
    .replace(/\\,/g, "")
    .replace(/\\leq?|≤/g, "≤")
    .replace(/\\geq?|≥/g, "≥")
    .replace(/\\neq?|≠/g, "≠")
    .replace(/\\pi/g, "π")
    .replace(/\\theta/g, "θ")
    .replace(/\\int/g, "∫")
    .replace(/\\sin/g, "sin")
    .replace(/\\cos/g, "cos")
    .replace(/\\tan/g, "tan")
    .replace(/\\ln/g, "ln")
    .replace(/\\log/g, "log")
    .replace(/\\\{/g, "{")
    .replace(/\\\}/g, "}")
    .replace(/\^\{([^{}]+)\}/g, "^$1")
    .replace(/_\{([^{}]+)\}/g, "_$1")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function desmosPromptPlainText(value) {
  if (Array.isArray(value)) return value.map(desmosPromptPlainText).filter(Boolean).join("\n");
  if (value && typeof value === "object") {
    if (value.type === "text") return String(value.value || "");
    if (value.type === "mixed") return (value.parts || []).map(desmosPromptPlainText).join("");
    if (value.math) return desmosPromptDisplayText(value.math);
  }
  return desmosPromptDisplayText(value);
}

function hasDesmosPromptContent(node) {
  if (!node) return false;
  const text = String(node.textContent || "").replace(/\u200b/g, "").replace(/\s+/g, "");
  if (text.length > 0) return true;
  if (!node.querySelector) return false;
  if (node.querySelector(".desmos-prompt-text-line, .math-fallback")) return true;
  const root = node.classList && node.classList.contains("mq-root-block") ? node : node.querySelector(".mq-root-block");
  if (!root) return false;
  const html = String(root.innerHTML || "").replace(/\s+/g, "");
  return html.length > 0 && !(html.startsWith("<span") && html.endsWith("></span>"));
}

function isDesmosPromptNodeVisible(node) {
  if (!node) return false;
  if (node.classList.contains("math-fallback") || node.classList.contains("desmos-prompt-raw-latex")) return hasDesmosPromptContent(node);
  if (node.classList.contains("prompt-multiline") || node.classList.contains("desmos-prompt-mixed-line")) {
    const children = [...node.children];
    return children.length > 0 && children.every(isDesmosPromptNodeVisible);
  }

  const mathRoot = node.querySelector && node.querySelector(".mq-root-block");
  if (!mathRoot) {
    if (node.children && node.children.length) return [...node.children].some(isDesmosPromptNodeVisible);
    return hasDesmosPromptContent(node);
  }
  if (typeof mathRoot.getBoundingClientRect !== "function") return false;

  const rect = mathRoot.getBoundingClientRect();
  return rect.width > 1 && rect.height > 1 && hasDesmosPromptContent(mathRoot);
}

function isDesmosPromptCardVisible(card) {
  if (!card) return false;
  const node = card.querySelector("[data-desmos-prompt-font]") || card;
  return isDesmosPromptNodeVisible(node);
}

function ensureDesmosPromptVisible(node, source, prompt) {
  if (isDesmosPromptNodeVisible(node)) return node;
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
  const fallbackSource = source || normalizeDesmosPromptContent((prompt && (prompt.collegeboard || prompt.latex || prompt.answer)) || "");
  const fallback = desmosPromptLatexForMathQuill(fallbackSource);
  target.className = "math-render desmos-prompt-font desmos-prompt-raw-latex";
  target.setAttribute("data-desmos-prompt-font", "");
  target.dataset.fallback = fallback || "new problem";
  target.textContent = fallback || "new problem";
  return target;
}

function ensureDesmosPromptCardsFilled(prompt = desmosState.current) {
  if (!prompt) return false;
  const cards = getDesmosPromptCards();
  if (!cards.length) return false;

  const visibleCards = cards.filter((card) => !(window.getComputedStyle && window.getComputedStyle(card).display === "none"));
  visibleCards.forEach((card) => {
    if (window.getComputedStyle && window.getComputedStyle(card).display === "none") return;
    if (!isDesmosPromptCardVisible(card)) renderDesmosPromptCard(card, prompt);
    if (!isDesmosPromptCardVisible(card)) renderDesmosPromptCard(card, prompt);
  });

  return visibleCards.every(isDesmosPromptCardVisible);
}

function renderDesmosIntroPrompt() {
  const labels = ["Problem Here", "desmos text"];
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

function setDesmosFeedback(message, tone = "", detail = "") {
  const feedback = elements.desmosFeedback;
  const visible = Boolean(message);
  feedback.hidden = !visible;
  feedback.className = `desmos-result-mark ${tone}`.trim();

  if (!visible) {
    feedback.replaceChildren();
    return;
  }

  const icon = document.createElement("span");
  icon.className = "desmos-result-icon";
  icon.setAttribute("aria-hidden", "true");
  if (tone === "good") icon.textContent = "✓";
  if (tone === "bad") icon.textContent = "×";

  const copy = document.createElement("span");
  copy.className = "desmos-result-copy";

  const title = document.createElement("strong");
  title.textContent = message;
  copy.appendChild(title);

  if (detail) {
    const description = document.createElement("span");
    description.textContent = detail;
    copy.appendChild(description);
  }

  feedback.replaceChildren(icon, copy);
}

function triggerDesmosCorrectEffect(message, detail = "") {
  const effect = elements.desmosFeedbackEffect;
  const stage = elements.desmosCalculatorStage;
  if (!effect || !stage) return;

  clearDesmosFeedbackEffect();

  const card = document.createElement("div");
  card.className = "desmos-effect-card";

  const icon = document.createElement("span");
  icon.className = "desmos-effect-icon";
  icon.textContent = "✓";

  const copy = document.createElement("span");
  copy.className = "desmos-effect-copy";

  const title = document.createElement("strong");
  title.textContent = message;
  copy.appendChild(title);

  if (detail) {
    const description = document.createElement("span");
    description.textContent = detail;
    copy.appendChild(description);
  }

  card.append(icon, copy);
  effect.replaceChildren(card);
  effect.classList.add("good", "active");
  void stage.offsetWidth;
  stage.classList.add("feedback-good");

  desmosState.feedbackEffectTimer = window.setTimeout(() => {
    desmosState.feedbackEffectTimer = 0;
    stage.classList.remove("feedback-good");
    effect.className = "desmos-feedback-effect";
    effect.replaceChildren();
  }, 780);
}

function bumpDesmosScore() {
  if (!elements.desmosScore) return;
  elements.desmosScore.classList.remove("score-bump");
  void elements.desmosScore.offsetWidth;
  elements.desmosScore.classList.add("score-bump");
}

function checkDesmosLiveAnswer() {
  if (!desmosState.running || !desmosState.current || !desmosState.inputEnabled || desmosState.locked || desmosState.transitioning) return;
  const typed = normalizeDesmosLines(desmosState.userLatex);
  if (!typed.length) {
    clearDesmosFeedbackEffect();
    setDesmosFeedback("");
    return;
  }

  const matchesExpected = desmosAnswerVariants(desmosState.current)
    .some((answer) => desmosLinesMatch(typed, normalizeDesmosLines(answer)));
  if (matchesExpected) {
    desmosState.locked = true;
    desmosState.score += 1;
    if (desmosSettings.timebar) desmosState.time = clamp(desmosState.time + desmosSpeedrunTiming.bonus, 0, desmosState.maxTime);
    updateDesmosScoreView();
    const reward = desmosSettings.timebar ? `+${desmosSpeedrunTiming.bonus}s` : "+1 point";
    setDesmosFeedback("Correct", "good", reward);
    triggerDesmosCorrectEffect("Correct", reward);
    bumpDesmosScore();
    if (desmosSettings.timebar) flashDesmosTime();
    spawnFormulaBurst(18, true);
    scheduleNextDesmosPrompt();
    return;
  }

  clearDesmosFeedbackEffect();
  setDesmosFeedback("");
}

function startDesmosSpeedrun() {
  if (!initEmbeddedDesmos()) {
    setDesmosFeedback("Desmos calculator did not load yet.", "bad");
    return;
  }
  clearPendingDesmosTimers();
  desmosState.running = true;
  desmosState.score = 0;
  desmosState.time = desmosSpeedrunTiming.start;
  desmosState.maxTime = desmosSpeedrunTiming.max;
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
  desmosState.current = null;
  desmosState.userLatex = [];
  elements.desmosStart.textContent = "Start";
  setDesmosAnswerEnabled(false);
  desmosState.locked = true;
  elements.desmosLabel.textContent = "";
  renderDesmosIntroPrompt();
  if (!options.preserveFeedback) setDesmosFeedback("");
  updateDesmosTimerView();
}

function setDesmosMode(mode) {
  const nextMode = ["speedrun", "typing", "tutorial", "settings"].includes(mode) ? mode : "speedrun";
  const previousMode = desmosState.mode;
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
  if (previousMode === "typing" && nextMode !== "typing" && mathTypingState.startedAt) resetMathTypingGame();

  if (nextMode === "typing") {
    window.requestAnimationFrame(() => {
      if (elements.mathTypingInput) elements.mathTypingInput.focus();
      updateMathTypingKeyboard();
      updateMathTypingViewport();
      updateMathTypingCaret();
    });
    return;
  }

  if (nextMode === "tutorial") {
    window.requestAnimationFrame(() => renderDesmosGuideMath(elements.desmosGuide));
    return;
  }

  if (nextMode === "speedrun") window.setTimeout(initEmbeddedDesmos, 0);
}

function getMathTypingInitialWordCount() {
  if (mathTypingSettings.mode === "words") return mathTypingSettings.amount;
  return Math.max(mathTypingTimedBufferSize, mathTypingSettings.amount * 2);
}

function syncMathTypingConfig() {
  elements.mathTypingModeButtons.forEach((button) => {
    const active = button.dataset.mathTypingMode === mathTypingSettings.mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  elements.mathTypingAmountButtons.forEach((button) => {
    const amount = Number(button.dataset.mathTypingAmount);
    const active = amount === mathTypingSettings.amount;
    const unit = mathTypingSettings.mode === "time" ? "seconds" : "words";
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", `${amount} ${unit}`);
  });

  const amountGroup = elements.mathTypingConfig
    ? elements.mathTypingConfig.querySelector(".math-typing-amounts")
    : null;
  if (amountGroup) {
    amountGroup.setAttribute("aria-label", mathTypingSettings.mode === "time" ? "Time in seconds" : "Number of words");
  }
}

function setMathTypingConfig(nextSettings) {
  const nextMode = ["time", "words"].includes(nextSettings.mode) ? nextSettings.mode : mathTypingSettings.mode;
  const requestedAmount = Number(nextSettings.amount);
  const nextAmount = mathTypingAmounts.includes(requestedAmount) ? requestedAmount : mathTypingSettings.amount;
  if (nextMode === mathTypingSettings.mode && nextAmount === mathTypingSettings.amount) return;

  mathTypingSettings.mode = nextMode;
  mathTypingSettings.amount = nextAmount;
  localStorage.setItem("bc-blitz-math-typing-mode", nextMode);
  localStorage.setItem("bc-blitz-math-typing-amount", String(nextAmount));
  syncMathTypingConfig();
  restartMathTypingGame();
}

function buildMathTypingWords(count = null) {
  const targetCount = count === null ? getMathTypingInitialWordCount() : count;
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

  if (targetCount > 0 && !words.some((term) => /[←→↑↓]/.test(term))) {
    const arrowTerms = mathTypingTerms.filter((term) => /[←→↑↓]/.test(term));
    words[Math.min(5, targetCount - 1)] = pick(arrowTerms);
  }

  if (targetCount > 1 && !words.includes("↵")) {
    words[Math.min(8, targetCount - 1)] = "↵";
  }

  return words;
}

function appendMathTypingWords(count = 48) {
  const nextWords = buildMathTypingWords(count);
  const previous = mathTypingState.words[mathTypingState.words.length - 1];
  if (nextWords[0] === previous) {
    const replacement = mathTypingTerms.find((term) => term !== previous);
    if (replacement) nextWords[0] = replacement;
  }
  mathTypingState.words.push(...nextWords);
}

function ensureMathTypingWordBuffer() {
  if (mathTypingSettings.mode !== "time") return;
  if (mathTypingState.words.length - mathTypingState.index < 24) appendMathTypingWords();
}

function stopMathTypingTimer() {
  if (!mathTypingState.timerId) return;
  window.clearInterval(mathTypingState.timerId);
  mathTypingState.timerId = 0;
}

function getMathTypingRemainingMs() {
  if (mathTypingSettings.mode !== "time") return 0;
  if (!mathTypingState.startedAt) return mathTypingSettings.amount * 1000;
  const now = mathTypingState.completedAt || performance.now();
  return Math.max(0, mathTypingState.deadline - now);
}

function finishMathTypingGame(completedAt = performance.now()) {
  if (mathTypingState.finished) return;

  if (mathTypingState.typed) {
    mathTypingState.typedTerms[mathTypingState.index] = mathTypingState.typed;
  }
  mathTypingState.finished = true;
  mathTypingState.completedAt = completedAt;
  stopMathTypingTimer();
  renderMathTypingGame();
  showMathTypingResult();
}

function updateMathTypingTimer() {
  if (mathTypingState.finished || mathTypingSettings.mode !== "time") {
    stopMathTypingTimer();
    return;
  }
  if (getMathTypingRemainingMs() <= 0) {
    finishMathTypingGame(mathTypingState.deadline);
    return;
  }
  updateMathTypingStats();
}

function ensureMathTypingStarted() {
  if (mathTypingState.startedAt || mathTypingState.finished) return;
  mathTypingState.startedAt = performance.now();
  if (mathTypingSettings.mode === "time") {
    mathTypingState.deadline = mathTypingState.startedAt + mathTypingSettings.amount * 1000;
    mathTypingState.timerId = window.setInterval(updateMathTypingTimer, 100);
  }
  updateMathTypingStats();
}

function resetMathTypingGame() {
  stopMathTypingTimer();
  if (elements.mathTypingTest) elements.mathTypingTest.classList.remove("result-visible");
  if (elements.mathTypingResult) elements.mathTypingResult.hidden = true;
  mathTypingState.words = buildMathTypingWords(getMathTypingInitialWordCount());
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
  mathTypingState.deadline = 0;
  mathTypingState.timerId = 0;
  mathTypingState.viewportLine = 0;
  mathTypingState.viewportOffset = 0;
  mathTypingState.caretX = 0;
  mathTypingState.caretY = 0;
  mathTypingState.caretHeight = 22;
  mathTypingState.caretReady = false;
  if (elements.mathTypingInput) {
    elements.mathTypingInput.disabled = false;
    elements.mathTypingInput.value = "";
  }
  if (elements.mathTypingWords) elements.mathTypingWords.style.transform = "translate3d(0, 0, 0)";
  if (elements.mathTypingWordsWrapper) elements.mathTypingWordsWrapper.style.height = "";
  syncMathTypingConfig();
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
  const boundedEnd = mathTypingState.deadline ? Math.min(endTime, mathTypingState.deadline) : endTime;
  return Math.max(1, boundedEnd - mathTypingState.startedAt);
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

function updateMathTypingStats() {
  const result = getMathTypingResult();
  const progress = mathTypingSettings.mode === "time"
    ? `${Math.ceil(getMathTypingRemainingMs() / 1000)}s`
    : `${Math.min(mathTypingState.index, mathTypingSettings.amount)}/${mathTypingSettings.amount}`;

  if (elements.mathTypingWpm) elements.mathTypingWpm.textContent = String(result.wpm);
  if (elements.mathTypingAccuracy) elements.mathTypingAccuracy.textContent = String(result.accuracy);
  if (elements.mathTypingProgress) elements.mathTypingProgress.textContent = progress;
  if (elements.mathTypingTest) {
    elements.mathTypingTest.setAttribute(
      "aria-label",
      `Math typing practice, ${result.wpm} words per minute, ${result.accuracy} percent accuracy, ${progress}`
    );
  }
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

  if (mathTypingSettings.mode === "words" && mathTypingState.index >= mathTypingSettings.amount) {
    finishMathTypingGame();
    return;
  }

  ensureMathTypingWordBuffer();
  renderMathTypingGame();
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
  if (term === "↵") word.classList.add("enter-token");

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
  const hasPartialWord = Boolean(mathTypingState.typedTerms[mathTypingState.index] || mathTypingState.typed);
  const resultWordCount = mathTypingSettings.mode === "words"
    ? Math.min(mathTypingState.index, mathTypingSettings.amount)
    : Math.min(mathTypingState.words.length, mathTypingState.index + (hasPartialWord ? 1 : 0));

  mathTypingState.words.slice(0, resultWordCount).forEach((term, index) => {
    elements.mathTypingResultWords.appendChild(renderMathTypingWord(term, index));
  });
}

function ensureMathTypingKeyboard() {
  if (!elements.mathTypingKeyboard || elements.mathTypingKeyboard.dataset.ready === "true") return;

  elements.mathTypingKeyboard.innerHTML = "";

  const createKeyNode = (keyItem) => {
    const keyNode = document.createElement("span");
    keyNode.className = "math-key";
    keyNode.dataset.key = keyItem.key;
    keyNode.style.setProperty("--key-units", String(keyItem.units || 1));
    if (keyItem.kind) keyNode.classList.add(`${keyItem.kind}-key`);
    if (keyItem.alternate) keyNode.classList.add("has-alternate");
    if (keyItem.align) keyNode.classList.add(`label-${keyItem.align}`);

    const label = document.createElement("span");
    label.className = "math-key-label";
    label.textContent = keyItem.label;

    if (keyItem.alternate) {
      const alternate = document.createElement("span");
      alternate.className = "math-key-alternate";
      alternate.textContent = keyItem.alternate;
      keyNode.appendChild(alternate);
    }

    if (keyItem.symbol) {
      const symbol = document.createElement("span");
      symbol.className = "math-key-symbol";
      symbol.textContent = keyItem.symbol;
      keyNode.appendChild(symbol);
    }

    const hint = document.createElement("span");
    hint.className = "math-key-hint";

    keyNode.append(label, hint);
    return keyNode;
  };

  mathTypingKeyboardRows.forEach((row) => {
    const rowNode = document.createElement("div");
    rowNode.className = "math-keyboard-row";

    row.forEach((keyItem) => {
      if (keyItem.arrowCluster) {
        const clusterNode = document.createElement("span");
        clusterNode.className = "math-arrow-cluster";
        clusterNode.style.setProperty("--key-units", String(keyItem.units || 3));
        keyItem.arrowCluster.forEach((arrowKey) => clusterNode.appendChild(createKeyNode(arrowKey)));
        rowNode.appendChild(clusterNode);
        return;
      }

      if (keyItem.stack) {
        const stackNode = document.createElement("span");
        stackNode.className = "math-key-stack";
        stackNode.style.setProperty("--key-units", String(keyItem.units || 1));
        keyItem.stack.forEach((stackedKey) => stackNode.appendChild(createKeyNode(stackedKey)));
        rowNode.appendChild(stackNode);
        return;
      }

      rowNode.appendChild(createKeyNode(keyItem));
    });

    elements.mathTypingKeyboard.appendChild(rowNode);
  });

  elements.mathTypingKeyboard.dataset.ready = "true";
}

function getMathTypingNextChar() {
  if (mathTypingState.finished) return "";
  const expected = mathTypingState.words[mathTypingState.index] || "";
  if (!expected) return "";

  const typed = mathTypingState.typed || "";
  if (typed.length < expected.length) return expected[typed.length];
  return " ";
}

function getMathTypingKeyboardTarget(char) {
  if (!char) return { keys: new Set(), primaryKey: "", display: "", shifted: false };
  if (/\s/.test(char)) return { keys: new Set(["space"]), primaryKey: "space", display: "space", shifted: false };

  const arrowKey = mathTypingArrowCharKeys[char];
  if (arrowKey) {
    return {
      keys: new Set([arrowKey]),
      primaryKey: arrowKey,
      display: char,
      shifted: false
    };
  }

  const shiftedBase = mathTypingShiftKeyMap[char];
  if (shiftedBase) {
    return {
      keys: new Set([shiftedBase, "shift"]),
      primaryKey: shiftedBase,
      display: char,
      shifted: true
    };
  }

  const lower = char.toLowerCase();
  if (char !== lower) {
    return {
      keys: new Set([lower, "shift"]),
      primaryKey: lower,
      display: char,
      shifted: true
    };
  }

  return { keys: new Set([lower]), primaryKey: lower, display: char, shifted: false };
}

function updateMathTypingKeyboard() {
  if (!elements.mathTypingKeyboard) return;
  ensureMathTypingKeyboard();

  const target = getMathTypingKeyboardTarget(getMathTypingNextChar());
  const keyNodes = elements.mathTypingKeyboard.querySelectorAll(".math-key");
  keyNodes.forEach((keyNode) => {
    const keyId = keyNode.dataset.key || "";
    const isActive = target.keys.has(keyId);
    const isPrimary = isActive && keyId === target.primaryKey;
    const hint = keyNode.querySelector(".math-key-hint");

    keyNode.classList.toggle("active", isActive);
    keyNode.classList.toggle("primary-active", isPrimary);
    keyNode.classList.toggle("shifted-active", isPrimary && target.shifted);
    if (hint) hint.textContent = isPrimary && target.shifted ? target.display : "";
  });

  const nextLabel = target.display || "";
  elements.mathTypingKeyboard.setAttribute("aria-label", nextLabel ? `Next key: ${nextLabel}` : "Next key guide");
  if (elements.mathTypingKeyHint) {
    if (!nextLabel) {
      elements.mathTypingKeyHint.textContent = "next key:";
    } else if (target.shifted) {
      elements.mathTypingKeyHint.textContent = `next key: shift + ${target.primaryKey} (${nextLabel})`;
    } else {
      elements.mathTypingKeyHint.textContent = `next key: ${nextLabel}`;
    }
  }
}

function handleMathTypingSpecialKey(event) {
  const specialChar = mathTypingSpecialKeyChars[event.key];
  if (!specialChar || !isMathTypingActive() || mathTypingState.finished) return false;

  event.preventDefault();
  event.stopPropagation();

  const expected = mathTypingState.words[mathTypingState.index] || "";
  const nextChar = expected[mathTypingState.typed.length] || "";
  ensureMathTypingStarted();

  if (nextChar !== specialChar) {
    mathTypingState.incorrectKeys += 1;
    updateMathTypingKeyboard();
    return true;
  }

  mathTypingState.correctKeys += 1;
  mathTypingState.typed += specialChar;
  if (elements.mathTypingInput) elements.mathTypingInput.value = mathTypingState.typed;

  if (mathTypingState.typed === expected) {
    completeMathTypingTerm(mathTypingState.typed);
  } else {
    renderMathTypingGame();
  }

  return true;
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

function updateMathTypingViewport() {
  const words = elements.mathTypingWords;
  const wrapper = elements.mathTypingWordsWrapper;
  if (!words || !wrapper || mathTypingState.resultVisible) return;

  const wordNodes = [...words.querySelectorAll(".math-type-word")];
  const activeWord = words.querySelector(".math-type-word.active");
  if (!wordNodes.length || !activeWord) return;

  const rowTolerance = 5;
  const lineTops = [];
  wordNodes.forEach((word) => {
    const top = word.offsetTop;
    if (!lineTops.some((lineTop) => Math.abs(lineTop - top) <= rowTolerance)) lineTops.push(top);
  });
  lineTops.sort((a, b) => a - b);

  const activeLine = Math.max(0, lineTops.findIndex((lineTop) => Math.abs(lineTop - activeWord.offsetTop) <= rowTolerance));
  const viewportLine = Math.max(0, activeLine - 1);
  const firstLineTop = lineTops[0] || 0;
  const targetLineTop = lineTops[viewportLine] === undefined ? firstLineTop : lineTops[viewportLine];
  const activeStyle = window.getComputedStyle(activeWord);
  const fallbackLineHeight = activeWord.offsetHeight
    + (Number.parseFloat(activeStyle.marginTop) || 0)
    + (Number.parseFloat(activeStyle.marginBottom) || 0);
  const measuredLineHeight = lineTops.length > 1 ? lineTops[1] - lineTops[0] : fallbackLineHeight;
  const lineHeight = Math.max(1, measuredLineHeight || fallbackLineHeight);
  const viewportOffset = Math.max(0, targetLineTop - firstLineTop);

  wrapper.style.height = `${Math.ceil(lineHeight * 3)}px`;
  words.style.transform = `translate3d(0, ${-Math.round(viewportOffset)}px, 0)`;
  mathTypingState.viewportLine = viewportLine;
  mathTypingState.viewportOffset = viewportOffset;
}

function renderMathTypingGame() {
  if (!elements.mathTypingWords) return;

  elements.mathTypingWords.innerHTML = "";
  for (let index = 0; index < mathTypingState.words.length; index += 1) {
    elements.mathTypingWords.appendChild(renderMathTypingWord(mathTypingState.words[index], index));
  }

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

  updateMathTypingStats();
  updateMathTypingKeyboard();
  window.requestAnimationFrame(() => {
    updateMathTypingViewport();
    updateMathTypingCaret();
  });
}

function handleMathTypingInput() {
  if (!elements.mathTypingInput || mathTypingState.finished) return;

  const value = elements.mathTypingInput.value;
  if (value) ensureMathTypingStarted();
  recordMathTypingKeys(value);
  if (/\s/.test(value)) {
    completeMathTypingTerm(value.split(/\s+/)[0], { countSubmitKey: true });
    return;
  }

  const expected = mathTypingState.words[mathTypingState.index] || "";
  const isLastTerm = mathTypingSettings.mode === "words" && mathTypingState.index === mathTypingSettings.amount - 1;
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
  window.requestAnimationFrame(() => {
    target.querySelectorAll(".question-math").forEach(repairBlankMathNode);
  });
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
    category: "unit2",
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
    category: "unit2",
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
    category: "unit6",
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
    category: "unit6",
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
    category: "unit3",
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
    category: "unit10",
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
    category: "unit3",
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
    category: "unit10",
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
    category: "unit10",
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
    category: "unit10",
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
    category: "unit9",
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
    category: "unit1",
    min: 5,
    max: 9,
    build() {
      const a = Math.floor(rand(2, 6));
      const b = Math.floor(rand(2, 7));
      const correct = fraction(a, b);
      return makeQuestion(
        "Trig Limits",
        5,
        [textPart("Evaluate "), mathPart(limitExpression("x\\to0", `\\frac{\\sin(${a}x)}{\\sin(${b}x)}`)), textPart(".")],
        correct,
        [fraction(b, a), `${a * b}`, "1", "0"]
      );
    }
  },
  {
    category: "unit10",
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
    category: "unit9",
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
    category: "unit5",
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
    category: "unit3",
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
    category: "unit6",
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
    category: "unit6",
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
    category: "unit6",
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
    category: "unit10",
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
    category: "unit10",
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
  },
  {
    category: "unit1",
    min: 1,
    max: 4,
    build() {
      const a = Math.floor(rand(2, 8));
      return makeQuestion(
        "Limits",
        2,
        [textPart("Evaluate "), mathPart(limitExpression("x\\to0", `\\frac{\\sin(${a}x)}{x}`)), textPart(".")],
        `${a}`,
        ["0", "1", `${a * a}`, fraction(1, a)]
      );
    }
  },
  {
    category: "unit4",
    min: 1,
    max: 4,
    build() {
      const a = Math.floor(rand(2, 7));
      const b = Math.floor(rand(1, 8));
      const t = Math.floor(rand(1, 5));
      const correct = 2 * a * t + b;
      return makeQuestion(
        "Contextual Rates",
        2,
        [textPart("A particle has position "), mathPart(`s(t)=${a}t^2+${b}t`), textPart(". What is its velocity at "), mathPart(`t=${t}`), textPart("?")],
        `${correct}`,
        [`${a * t * t + b * t}`, `${2 * a + b}`, `${correct + a}`, `${correct - b}`]
      );
    }
  },
  {
    category: "unit4",
    min: 3,
    max: 6,
    build() {
      const r = Math.floor(rand(2, 8));
      const rate = Math.floor(rand(1, 5));
      const correct = `${2 * r * rate}\\pi`;
      return makeQuestion(
        "Related Rates",
        3,
        [textPart("For a circle, "), mathPart("A=\\pi r^2"), textPart(". If "), mathPart(`r=${r}`), textPart(" and "), mathPart(`\\frac{dr}{dt}=${rate}`), textPart(", find "), mathPart("\\frac{dA}{dt}"), textPart(".")],
        correct,
        [`${r * rate}\\pi`, `${2 * r}\\pi`, `${r * r * rate}\\pi`, `${rate}\\pi`]
      );
    }
  },
  {
    category: "unit5",
    min: 2,
    max: 6,
    build() {
      const a = Math.floor(rand(-5, -1));
      const b = Math.floor(rand(1, 6));
      const leftFactor = `(x+${Math.abs(a)})`;
      const rightFactor = `(x-${b})`;
      return makeQuestion(
        "Extrema",
        3,
        [textPart("If "), mathPart(`f'(x)=${leftFactor}${rightFactor}`), textPart(" with "), mathPart(`${a}<${b}`), textPart(", where does "), mathPart("f"), textPart(" have a local maximum?")],
        `${a}`,
        [`${b}`, "0", textChoice("no local maximum"), `${a + b}`]
      );
    }
  },
  {
    category: "unit7",
    min: 1,
    max: 5,
    build() {
      const k = Math.floor(rand(2, 5));
      const y0 = Math.floor(rand(1, 5));
      return makeQuestion(
        "Differential Equations",
        3,
        [textPart("Solve "), mathPart(`\\frac{dy}{dx}=${k}y`), textPart(" with "), mathPart(`y(0)=${y0}`), textPart(". What is "), mathPart("y(1)"), textPart("?")],
        `${y0}e^${k}`,
        [`${k}e^${y0}`, `${y0 + k}e`, `${y0}e`, `${k * y0}`]
      );
    }
  },
  {
    category: "unit7",
    min: 3,
    max: 7,
    build() {
      const k = Math.floor(rand(2, 6));
      return makeQuestion(
        "Separable Equations",
        4,
        [textPart("A solution to "), mathPart(`\\frac{dy}{dx}=${k}x y`), textPart(" has what general form?")],
        `Ce^{${fraction(k, 2)}x^2}`,
        [`Ce^{${k}x}`, `C+${fraction(k, 2)}x^2`, `${k}xy+C`, `Ce^{${k}x^2}`]
      );
    }
  },
  {
    category: "unit8",
    min: 1,
    max: 5,
    build() {
      return makeQuestion(
        "Area Between Curves",
        3,
        [textPart("Find the area between "), mathPart("y=x"), textPart(" and "), mathPart("y=x^2"), textPart(" on "), mathPart("[0,1]"), textPart(".")],
        fraction(1, 6),
        [fraction(1, 2), fraction(1, 3), fraction(2, 3), "1"]
      );
    }
  },
  {
    category: "unit8",
    min: 4,
    max: 8,
    build() {
      const a = Math.floor(rand(2, 6));
      return makeQuestion(
        "Volumes",
        4,
        [textPart("Using disks, the volume from rotating "), mathPart(`y=${a}x`), textPart(" on "), mathPart("[0,1]"), textPart(" about the x-axis is what?")],
        piMultiple(a * a, 3),
        [piMultiple(a, 3), piMultiple(a * a, 2), piMultiple(a, 2), piMultiple(a * a, 1)]
      );
    }
  }
];

generators.push(...[
  {
    category: "unit1",
    min: 1,
    max: 4,
    build() {
      const a = Math.floor(rand(2, 7));
      return makeQuestion(
        "Limits",
        2,
        [textPart("Evaluate "), mathPart(limitExpression(`x\\to${a}`, `\\frac{x^2-${a * a}}{x-${a}}`)), textPart(".")],
        `${2 * a}`,
        [`${a}`, `${a * a}`, "0", textChoice("does not exist")]
      );
    }
  },
  {
    category: "unit1",
    min: 2,
    max: 5,
    build() {
      const a = Math.floor(rand(2, 7));
      const b = Math.floor(rand(1, 8));
      const c = Math.floor(rand(2, 7));
      return makeQuestion(
        "Limits at Infinity",
        3,
        [textPart("Evaluate "), mathPart(limitExpression("x\\to\\infty", `\\frac{${a}x+${b}}{${c}x-${b}}`)), textPart(".")],
        fraction(a, c),
        [fraction(c, a), "0", textChoice("does not exist"), `${a - c}`]
      );
    }
  },
  {
    category: "unit1",
    min: 2,
    max: 5,
    build() {
      return makeQuestion(
        "Continuity",
        3,
        [textPart("For "), mathPart("f(x)=\\frac{x^2-9}{x-3}"), textPart(", what value should "), mathPart("f(3)"), textPart(" have to make "), mathPart("f"), textPart(" continuous?")],
        "6",
        ["3", "9", "0", textChoice("impossible")]
      );
    }
  },
  {
    category: "unit2",
    min: 1,
    max: 4,
    build() {
      const a = Math.floor(rand(2, 7));
      const x = Math.floor(rand(1, 5));
      const correct = 3 * a * x * x;
      return makeQuestion(
        "Derivative Values",
        2,
        [textPart("If "), mathPart(`f(x)=${a}x^3`), textPart(", find "), mathPart(`f'(${x})`), textPart(".")],
        `${correct}`,
        [`${a * x * x}`, `${3 * a * x}`, `${correct + a}`, `${correct - x}`]
      );
    }
  },
  {
    category: "unit2",
    min: 2,
    max: 5,
    build() {
      const n = Math.floor(rand(2, 6));
      return makeQuestion(
        "Derivative Definition",
        3,
        [textPart("Simplify "), mathPart(limitExpression("h\\to0", `\\frac{(x+h)^${n}-x^${n}}{h}`)), textPart(" for "), mathPart(`n=${n}`), textPart(".")],
        `${n}x^${n - 1}`,
        [`x^${n - 1}`, `${n}x^${n}`, `${n - 1}x^${n}`, textChoice("0")]
      );
    }
  },
  {
    category: "unit2",
    min: 2,
    max: 5,
    build() {
      const k = Math.floor(rand(2, 8));
      return makeQuestion(
        "Tangent Lines",
        3,
        [textPart("What is the slope of the tangent to "), mathPart(`y=${k}\\ln(x)`), textPart(" at "), mathPart("x=1"), textPart("?")],
        `${k}`,
        ["1", "0", `${2 * k}`, fraction(1, k)]
      );
    }
  },
  {
    category: "unit3",
    min: 2,
    max: 6,
    build() {
      const a = Math.floor(rand(2, 7));
      return makeQuestion(
        "Quotient Rule",
        3,
        [textPart("Differentiate "), mathPart(`\\frac{x^2+${a}}{x}`), textPart(".")],
        `1-\\frac{${a}}{x^2}`,
        [`1+\\frac{${a}}{x^2}`, `2x-${a}`, `\\frac{x^2-${a}}{x^2}`, `x+${a}`]
      );
    }
  },
  {
    category: "unit3",
    min: 3,
    max: 7,
    build() {
      const a = Math.floor(rand(2, 7));
      return makeQuestion(
        "Log Differentiation",
        4,
        [textPart("Differentiate "), mathPart(`\\ln(${a}x^2+1)`), textPart(".")],
        `\\frac{${2 * a}x}{${a}x^2+1}`,
        [`\\frac{${a}}{${a}x^2+1}`, `\\frac{2x}{${a}x^2+1}`, `${2 * a}x`, `\\frac{${2 * a}x}{${a}x+1}`]
      );
    }
  },
  {
    category: "unit3",
    min: 4,
    max: 8,
    build() {
      const m = Math.floor(rand(2, 8));
      return makeQuestion(
        "Inverse Functions",
        4,
        [textPart("If "), mathPart("f(a)=b"), textPart(" and "), mathPart(`f'(a)=${m}`), textPart(", find "), mathPart("(f^{-1})'(b)"), textPart(".")],
        fraction(1, m),
        [`${m}`, `-${m}`, "1", "0"]
      );
    }
  },
  {
    category: "unit4",
    min: 1,
    max: 5,
    build() {
      const a = Math.floor(rand(2, 7));
      const b = Math.floor(rand(1, 8));
      const t = Math.floor(rand(1, 5));
      const correct = 2 * a;
      return makeQuestion(
        "Particle Motion",
        3,
        [textPart("A particle has velocity "), mathPart(`v(t)=${a}t^2+${b}`), textPart(". What is its acceleration at "), mathPart(`t=${t}`), textPart("?")],
        `${2 * a * t}`,
        [`${correct}`, `${a * t * t + b}`, `${2 * a * t + b}`, `${b}`]
      );
    }
  },
  {
    category: "unit4",
    min: 2,
    max: 6,
    build() {
      const gallons = Math.floor(rand(2, 8));
      return makeQuestion(
        "Derivative Units",
        2,
        [textPart("If "), mathPart(`W'(t)=${gallons}`), textPart(" gallons per minute, what does "), mathPart("W'(t)"), textPart(" represent?")],
        textChoice("rate of change of water"),
        [textChoice("total water"), textChoice("average water amount"), textChoice("time elapsed"), textChoice("maximum water")]
      );
    }
  },
  {
    category: "unit5",
    min: 2,
    max: 6,
    build() {
      const c = Math.floor(rand(1, 6));
      return makeQuestion(
        "Concavity",
        3,
        [textPart("If "), mathPart(`f''(x)=x-${c}`), textPart(", on what interval is "), mathPart("f"), textPart(" concave up?")],
        textChoice(`x>${c}`),
        [textChoice(`x<${c}`), textChoice(`x=${c}`), textChoice("all real x"), textChoice("no interval")]
      );
    }
  },
  {
    category: "unit5",
    min: 3,
    max: 7,
    build() {
      const a = Math.floor(rand(2, 8));
      return makeQuestion(
        "Mean Value Theorem",
        3,
        [textPart("For "), mathPart(`f(x)=x^2`), textPart(" on "), mathPart(`[0,${a}]`), textPart(", the MVT guarantees "), mathPart(`f'(c)`), textPart(" equals what?")],
        `${a}`,
        [`${2 * a}`, fraction(a, 2), "0", `${a * a}`]
      );
    }
  },
  {
    category: "unit6",
    min: 2,
    max: 6,
    build() {
      const a = Math.floor(rand(1, 8));
      return makeQuestion(
        "FTC",
        3,
        [textPart("Find "), mathPart(`\\frac{d}{dx}\\int_0^x(t^2+${a})dt`), textPart(".")],
        `x^2+${a}`,
        [`2x+${a}`, `\\frac{x^3}{3}+${a}x`, `t^2+${a}`, `${a}`]
      );
    }
  },
  {
    category: "unit6",
    min: 2,
    max: 6,
    build() {
      const a = Math.floor(rand(2, 9));
      return makeQuestion(
        "Average Value",
        3,
        [textPart("Find the average value of "), mathPart("f(x)=x"), textPart(" on "), mathPart(`[0,${a}]`), textPart(".")],
        fraction(a, 2),
        [`${a}`, fraction(1, a), fraction(a * a, 2), "0"]
      );
    }
  },
  {
    category: "unit7",
    min: 1,
    max: 5,
    build() {
      const y0 = Math.floor(rand(1, 6));
      return makeQuestion(
        "Initial Value Problems",
        3,
        [textPart("Solve "), mathPart("\\frac{dy}{dx}=x"), textPart(" with "), mathPart(`y(0)=${y0}`), textPart(". What is "), mathPart("y(2)"), textPart("?")],
        `${y0 + 2}`,
        [`${y0}`, `${y0 + 4}`, "2", `${2 * y0}`]
      );
    }
  },
  {
    category: "unit7",
    min: 3,
    max: 7,
    build() {
      const y0 = Math.floor(rand(1, 5));
      const h = fraction(1, 2);
      return makeQuestion(
        "Euler's Method",
        4,
        [textPart("Use one Euler step with "), mathPart("h=\\frac12"), textPart(" for "), mathPart("\\frac{dy}{dx}=x+y"), textPart(" from "), mathPart(`(0,${y0})`), textPart(". What is the next "), mathPart("y"), textPart("?")],
        fraction(3 * y0, 2),
        [`${y0}`, `${y0 + 1}`, fraction(y0, 2), `${2 * y0}`]
      );
    }
  },
  {
    category: "unit8",
    min: 2,
    max: 6,
    build() {
      const a = Math.floor(rand(2, 7));
      return makeQuestion(
        "Net Change",
        3,
        [textPart("If "), mathPart(`v(t)=${a}t`), textPart(", find total displacement on "), mathPart("[0,2]"), textPart(".")],
        `${2 * a}`,
        [`${a}`, `${4 * a}`, `${a + 2}`, fraction(a, 2)]
      );
    }
  },
  {
    category: "unit8",
    min: 4,
    max: 8,
    build() {
      return makeQuestion(
        "Disk Method",
        4,
        [textPart("Rotate "), mathPart("y=\\sqrt{x}"), textPart(" on "), mathPart("[0,1]"), textPart(" about the x-axis. What is the volume?")],
        "\\frac{\\pi}{2}",
        ["\\pi", "\\frac{\\pi}{3}", "2\\pi", "1"]
      );
    }
  },
  {
    category: "unit9",
    min: 2,
    max: 6,
    build() {
      return makeQuestion(
        "Parametric Slope",
        3,
        [textPart("For "), mathPart("x=t^2"), textPart(" and "), mathPart("y=t^3"), textPart(", find "), mathPart("\\frac{dy}{dx}"), textPart(".")],
        "\\frac{3t}{2}",
        ["3t^2", "2t", "\\frac{2}{3t}", "\\frac{2t}{3}"]
      );
    }
  },
  {
    category: "unit9",
    min: 3,
    max: 7,
    build() {
      const a = Math.floor(rand(2, 7));
      const b = Math.floor(rand(2, 7));
      return makeQuestion(
        "Vector Speed",
        3,
        [textPart("If "), mathPart(`\\frac{dx}{dt}=${a}`), textPart(" and "), mathPart(`\\frac{dy}{dt}=${b}`), textPart(", what is speed?")],
        `\\sqrt{${a * a + b * b}}`,
        [`${a + b}`, `\\sqrt{${a + b}}`, `${a * b}`, `${a * a + b * b}`]
      );
    }
  },
  {
    category: "unit10",
    min: 2,
    max: 6,
    build() {
      return makeQuestion(
        "Divergence Test",
        3,
        [textPart("Does "), mathPart("\\sum_{n=1}^{\\infty}\\frac{n}{n+1}"), textPart(" converge or diverge?")],
        textChoice("diverges"),
        [textChoice("converges"), textChoice("equals 1"), textChoice("absolutely converges"), textChoice("alternates")]
      );
    }
  },
  {
    category: "unit10",
    min: 4,
    max: 8,
    build() {
      const n = Math.floor(rand(3, 8));
      return makeQuestion(
        "Alternating Error",
        4,
        [textPart("For an alternating series with decreasing terms "), mathPart("b_n=\\frac1n"), textPart(", after "), mathPart(`${n}`), textPart(" terms, the error is less than what?")],
        fraction(1, n + 1),
        [fraction(1, n), fraction(1, n - 1), `${n + 1}`, "0"]
      );
    }
  }
]);

const frqGenerators = [
  {
    category: "unit2",
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
    category: "unit6",
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
    category: "unit10",
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
    category: "unit3",
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
    category: "unit1",
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
    category: "unit9",
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

generators.push(...[
  {
    category: "unit1",
    min: 2,
    max: 6,
    build() {
      const a = randInt(2, 8);
      return makeQuestion(
        "Limit Algebra",
        3,
        [textPart("Evaluate "), mathPart(limitExpression(`x\\to${a}`, `\\frac{x^2-${a * a}}{x-${a}}`)), textPart(".")],
        `${2 * a}`,
        [`${a}`, `${a * a}`, "0", textChoice("does not exist")]
      );
    }
  },
  {
    category: "unit1",
    min: 3,
    max: 7,
    build() {
      const a = randInt(2, 7);
      return makeQuestion(
        "Continuity",
        4,
        [textPart("Find "), mathPart("c"), textPart(" so "), mathPart(`f(x)=\\frac{x^2-${a * a}}{x-${a}}`), textPart(" with "), mathPart(`f(${a})=c`), textPart(" is continuous.")],
        `${2 * a}`,
        [`${a}`, `${a * a}`, "0", textChoice("no such c")]
      );
    }
  },
  {
    category: "unit1",
    min: 4,
    max: 8,
    build() {
      const a = randInt(2, 6);
      const b = randInt(1, 5);
      return makeQuestion(
        "Trig Limits",
        5,
        [textPart("Evaluate "), mathPart(limitExpression("x\\to0", `\\frac{\\sin(${a}x)}{${b}x}`)), textPart(".")],
        fraction(a, b),
        [fraction(b, a), `${a * b}`, "0", "1"]
      );
    }
  },
  {
    category: "unit2",
    min: 2,
    max: 5,
    build() {
      const a = randInt(2, 7);
      const x = randInt(1, 5);
      return makeQuestion(
        "Tangent Line",
        3,
        [textPart("For "), mathPart(`f(x)=${a}x^2`), textPart(", the tangent slope at "), mathPart(`x=${x}`), textPart(" is what?")],
        `${2 * a * x}`,
        [`${a * x}`, `${a * x * x}`, `${2 * a}`, `${2 * x}`]
      );
    }
  },
  {
    category: "unit2",
    min: 3,
    max: 6,
    build() {
      const a = randInt(2, 7);
      return makeQuestion(
        "Derivative Definition",
        4,
        [textPart("The limit "), mathPart(`\\lim_{h\\to0}\\frac{(${a}+h)^3-${a}^3}{h}`), textPart(" equals what?")],
        `${3 * a * a}`,
        [`${a * a}`, `${3 * a}`, `${a * a * a}`, "0"]
      );
    }
  },
  {
    category: "unit3",
    min: 2,
    max: 6,
    build() {
      const a = randInt(2, 6);
      const b = randInt(2, 5);
      return makeQuestion(
        "Product Rule",
        3,
        [textPart("Differentiate "), mathPart(`x^${a}\\sin(${b}x)`), textPart(".")],
        `${a}x^${a - 1}\\sin(${b}x)+${b}x^${a}\\cos(${b}x)`,
        [`${a}x^${a - 1}\\cos(${b}x)`, `${b}x^${a}\\sin(${b}x)`, `${a * b}x^${a - 1}\\cos(${b}x)`, `x^${a}\\cos(${b}x)`]
      );
    }
  },
  {
    category: "unit3",
    min: 3,
    max: 7,
    build() {
      const a = randInt(2, 7);
      return makeQuestion(
        "Implicit Differentiation",
        4,
        [textPart("For "), mathPart(`x^2+y^2=${a * a}`), textPart(", find "), mathPart("\\frac{dy}{dx}"), textPart(".")],
        "-\\frac{x}{y}",
        ["\\frac{x}{y}", "-\\frac{y}{x}", "\\frac{y}{x}", "-1"]
      );
    }
  },
  {
    category: "unit3",
    min: 4,
    max: 8,
    build() {
      const a = randInt(2, 6);
      return makeQuestion(
        "Inverse Derivatives",
        5,
        [textPart("If "), mathPart(`f(${a})=${a + 1}`), textPart(" and "), mathPart(`f'(${a})=${a + 2}`), textPart(", find "), mathPart(`(f^{-1})'(${a + 1})`), textPart(".")],
        fraction(1, a + 2),
        [`${a + 2}`, fraction(1, a), `${a + 1}`, "0"]
      );
    }
  },
  {
    category: "unit4",
    min: 2,
    max: 6,
    build() {
      const a = randInt(2, 7);
      const b = randInt(1, 6);
      const t = randInt(1, 4);
      return makeQuestion(
        "Particle Motion",
        3,
        [textPart("For "), mathPart(`s(t)=${a}t^3-${b}t`), textPart(", acceleration at "), mathPart(`t=${t}`), textPart(" is what?")],
        `${6 * a * t}`,
        [`${3 * a * t * t - b}`, `${6 * a}`, `${a * t * t * t - b * t}`, `${3 * a * t}`]
      );
    }
  },
  {
    category: "unit4",
    min: 3,
    max: 7,
    build() {
      const r = randInt(2, 8);
      const dr = randInt(1, 5);
      return makeQuestion(
        "Related Rates",
        4,
        [textPart("For "), mathPart("V=\\frac{4}{3}\\pi r^3"), textPart(", if "), mathPart(`r=${r}`), textPart(" and "), mathPart(`\\frac{dr}{dt}=${dr}`), textPart(", find "), mathPart("\\frac{dV}{dt}"), textPart(".")],
        `${4 * r * r * dr}\\pi`,
        [`${2 * r * dr}\\pi`, `${4 * r * dr}\\pi`, `${r * r * dr}\\pi`, `${4 * r * r}\\pi`]
      );
    }
  },
  {
    category: "unit4",
    min: 4,
    max: 8,
    build() {
      const x = randInt(2, 6);
      const dx = randInt(1, 4);
      const y = randInt(2, 6);
      const dy = randInt(1, 4);
      return makeQuestion(
        "Vector Speed",
        4,
        [textPart("If "), mathPart(`\\frac{dx}{dt}=${dx}`), textPart(" and "), mathPart(`\\frac{dy}{dt}=${dy}`), textPart(", speed at "), mathPart(`(${x},${y})`), textPart(" is what?")],
        `\\sqrt{${dx * dx + dy * dy}}`,
        [`${dx + dy}`, `\\sqrt{${x * x + y * y}}`, `${dx * dx + dy * dy}`, `${dx * dy}`]
      );
    }
  },
  {
    category: "unit5",
    min: 2,
    max: 6,
    build() {
      const a = randInt(1, 5);
      const b = randInt(a + 2, a + 7);
      return makeQuestion(
        "Increasing Intervals",
        3,
        [textPart("If "), mathPart(`f'(x)=(x-${a})(x-${b})`), textPart(", where is "), mathPart("f"), textPart(" increasing?")],
        textChoice(`x<${a} or x>${b}`),
        [textChoice(`${a}<x<${b}`), textChoice(`x>${a}`), textChoice(`x<${b}`), textChoice("all real x")]
      );
    }
  },
  {
    category: "unit5",
    min: 3,
    max: 7,
    build() {
      const c = randInt(1, 6);
      return makeQuestion(
        "Inflection Points",
        4,
        [textPart("If "), mathPart(`f''(x)=2(x-${c})`), textPart(", the possible inflection point is at what "), mathPart("x"), textPart("?")],
        `${c}`,
        [`${-c}`, "0", `${2 * c}`, textChoice("none")]
      );
    }
  },
  {
    category: "unit5",
    min: 4,
    max: 8,
    build() {
      const a = randInt(2, 7);
      return makeQuestion(
        "Linearization",
        4,
        [textPart("Using "), mathPart("f(x)=\\sqrt{x}"), textPart(" at "), mathPart(`x=${a * a}`), textPart(", approximate "), mathPart(`\\sqrt{${a * a + 1}}`), textPart(".")],
        `${a}+\\frac{1}{${2 * a}}`,
        [`${a}+\\frac{1}{${a}}`, `${a + 1}`, `${a}-\\frac{1}{${2 * a}}`, fraction(1, 2 * a)]
      );
    }
  },
  {
    category: "unit6",
    min: 2,
    max: 6,
    build() {
      const a = randInt(2, 7);
      return makeQuestion(
        "FTC",
        3,
        [textPart("Find "), mathPart(`\\frac{d}{dx}\\int_{${a}}^x \\cos(t^2)dt`), textPart(".")],
        "\\cos(x^2)",
        [`2x\\cos(x^2)`, `\\cos(${a}^2)`, `x\\cos(x^2)`, "\\sin(x^2)"]
      );
    }
  },
  {
    category: "unit6",
    min: 3,
    max: 7,
    build() {
      const a = randInt(2, 7);
      const b = randInt(1, 5);
      return makeQuestion(
        "Integration By Parts",
        5,
        [textPart("An antiderivative of "), mathPart(`${a}x e^x`), textPart(" is what?")],
        `${a}e^x(x-1)`,
        [`${a}xe^x`, `${a}e^x`, `${a}e^x(x+1)`, `${b}e^x(x-1)`]
      );
    }
  },
  {
    category: "unit6",
    min: 4,
    max: 8,
    build() {
      const a = randInt(2, 6);
      return makeQuestion(
        "Average Value",
        5,
        [textPart("Find the average value of "), mathPart("f(x)=x^2"), textPart(" on "), mathPart(`[0,${a}]`), textPart(".")],
        fraction(a * a, 3),
        [fraction(a, 2), fraction(a * a, 2), `${a * a}`, fraction(a, 3)]
      );
    }
  },
  {
    category: "unit7",
    min: 2,
    max: 6,
    build() {
      const k = randInt(2, 5);
      const y0 = randInt(1, 5);
      return makeQuestion(
        "Separable Equations",
        4,
        [textPart("Solve "), mathPart(`\\frac{dy}{dx}=${k}x`), textPart(" with "), mathPart(`y(0)=${y0}`), textPart(". Find "), mathPart("y(2)"), textPart(".")],
        `${2 * k + y0}`,
        [`${k + y0}`, `${4 * k + y0}`, `${y0}`, `${2 + y0}`]
      );
    }
  },
  {
    category: "unit7",
    min: 3,
    max: 7,
    build() {
      const y0 = randInt(1, 4);
      return makeQuestion(
        "Euler's Method",
        5,
        [textPart("Use Euler with "), mathPart("h=1"), textPart(" for "), mathPart("\\frac{dy}{dx}=x+y"), textPart(" from "), mathPart(`(0,${y0})`), textPart(". What is next "), mathPart("y"), textPart("?")],
        `${2 * y0}`,
        [`${y0 + 1}`, `${y0}`, `${2 * y0 + 1}`, `${y0 * y0}`]
      );
    }
  },
  {
    category: "unit7",
    min: 5,
    max: 9,
    build() {
      const k = randInt(2, 6);
      return makeQuestion(
        "Slope Fields",
        6,
        [textPart("For "), mathPart("\\frac{dy}{dx}=x-y"), textPart(", the slope at "), mathPart(`(${k},1)`), textPart(" is what?")],
        `${k - 1}`,
        [`${k + 1}`, `${1 - k}`, `${k}`, "1"]
      );
    }
  },
  {
    category: "unit8",
    min: 2,
    max: 6,
    build() {
      const a = randInt(2, 6);
      return makeQuestion(
        "Area Between Curves",
        4,
        [textPart("Area between "), mathPart(`y=${a}x`), textPart(" and "), mathPart("y=x^2"), textPart(" from "), mathPart("0"), textPart(" to "), mathPart(`${a}`), textPart(" is what?")],
        fraction(a * a * a, 6),
        [fraction(a * a, 2), fraction(a * a * a, 3), `${a}`, fraction(a * a * a, 2)]
      );
    }
  },
  {
    category: "unit8",
    min: 4,
    max: 8,
    build() {
      const a = randInt(2, 5);
      return makeQuestion(
        "Washer Method",
        5,
        [textPart("Rotate region between "), mathPart(`y=${a}`), textPart(" and "), mathPart("y=x"), textPart(" on "), mathPart(`[0,${a}]`), textPart(" about x-axis. Volume?")],
        piMultiple(2 * a * a * a, 3),
        [piMultiple(a * a * a, 3), piMultiple(a * a, 2), piMultiple(a * a * a, 1), piMultiple(a, 1)]
      );
    }
  },
  {
    category: "unit8",
    min: 5,
    max: 9,
    build() {
      const a = randInt(2, 6);
      return makeQuestion(
        "Cross Sections",
        6,
        [textPart("Square cross sections have side "), mathPart(`${a}x`), textPart(" on "), mathPart("[0,1]"), textPart(". Volume is what?")],
        fraction(a * a, 3),
        [fraction(a, 2), fraction(a * a, 2), `${a * a}`, `\\pi\\frac{${a * a}}{3}`]
      );
    }
  },
  {
    category: "unit9",
    min: 2,
    max: 6,
    build() {
      const a = randInt(2, 7);
      return makeQuestion(
        "Parametric Derivatives",
        4,
        [textPart("For "), mathPart(`x=t^2+1`), textPart(" and "), mathPart(`y=${a}t^3`), textPart(", find "), mathPart("\\frac{dy}{dx}"), textPart(".")],
        `${fraction(3 * a, 2)}t`,
        [`${3 * a}t^2`, `${2}t`, `${fraction(2, 3 * a)}t`, `${3 * a}t`]
      );
    }
  },
  {
    category: "unit9",
    min: 4,
    max: 8,
    build() {
      const a = randInt(1, 5);
      return makeQuestion(
        "Polar Slope",
        6,
        [textPart("For "), mathPart(`r=${a}`), textPart(", at "), mathPart("\\theta=\\frac{\\pi}{4}"), textPart(", "), mathPart("\\frac{dy}{dx}"), textPart(" equals what?")],
        "1",
        ["0", "-1", textChoice("undefined"), `${a}`]
      );
    }
  },
  {
    category: "unit9",
    min: 5,
    max: 10,
    build() {
      const a = randInt(2, 6);
      return makeQuestion(
        "Polar Area",
        6,
        [textPart("Area inside "), mathPart(`r=${a}\\cos(\\theta)`), textPart(" is what?")],
        piMultiple(a * a, 4),
        [piMultiple(a * a, 2), piMultiple(a, 2), piMultiple(a * a, 1), fraction(a * a, 4)]
      );
    }
  },
  {
    category: "unit10",
    min: 2,
    max: 6,
    build() {
      const r = randInt(2, 6);
      return makeQuestion(
        "Ratio Test",
        4,
        [textPart("For "), mathPart(`\\sum_{n=1}^{\\infty}\\frac{x^n}{n${r}^n}`), textPart(", radius of convergence is what?")],
        `${r}`,
        [fraction(1, r), `${r * r}`, "1", textChoice("infinite")]
      );
    }
  },
  {
    category: "unit10",
    min: 3,
    max: 7,
    build() {
      const a = randInt(2, 6);
      return makeQuestion(
        "Alternating Series Error",
        4,
        [textPart("For alternating terms with "), mathPart(`b_{${a}}=\\frac{1}{${a}}`), textPart(", error after "), mathPart(`${a - 1}`), textPart(" terms is at most what?")],
        fraction(1, a),
        [fraction(1, a - 1), fraction(1, a + 1), `${a}`, textChoice("0")]
      );
    }
  },
  {
    category: "unit10",
    min: 4,
    max: 8,
    build() {
      const n = randInt(2, 5);
      return makeQuestion(
        "Taylor Polynomials",
        5,
        [textPart("In the Maclaurin series for "), mathPart("e^x"), textPart(", coefficient of "), mathPart(`x^${n}`), textPart(" is what?")],
        fraction(1, factorial(n)),
        [`${n}`, fraction(1, n), `${factorial(n)}`, "0"]
      );
    }
  },
  {
    category: "unit10",
    min: 5,
    max: 10,
    build() {
      const a = randInt(2, 6);
      return makeQuestion(
        "Interval Of Convergence",
        7,
        [textPart("The series "), mathPart(`\\sum_{n=1}^{\\infty}\\frac{(x-${a})^n}{n}`), textPart(" has radius what?")],
        "1",
        [`${a}`, `${a + 1}`, textChoice("infinite"), fraction(1, a)]
      );
    }
  }
]);

frqGenerators.push(...[
  {
    category: "unit3",
    min: 4,
    max: 8,
    build() {
      const a = randInt(2, 6);
      return makeFRQ(
        "FRQ Implicit",
        5,
        [textPart("For "), mathPart("x^2+y^2=25"), textPart(", type "), mathPart("\\frac{dy}{dx}"), textPart(".")],
        "-\\frac{x}{y}",
        ["-x/y"]
      );
    }
  },
  {
    category: "unit4",
    min: 3,
    max: 7,
    build() {
      const r = randInt(2, 6);
      const dr = randInt(1, 4);
      const correct = 2 * r * dr;
      return makeFRQ(
        "FRQ Related Rates",
        4,
        [textPart("For "), mathPart("A=\\pi r^2"), textPart(", "), mathPart(`r=${r}`), textPart(" and "), mathPart(`\\frac{dr}{dt}=${dr}`), textPart(". Type the coefficient of "), mathPart("\\pi"), textPart(" in "), mathPart("\\frac{dA}{dt}"), textPart(".")],
        `${correct}`,
        [`${correct}.0`]
      );
    }
  },
  {
    category: "unit6",
    min: 3,
    max: 7,
    build() {
      const a = randInt(2, 7);
      return makeFRQ(
        "FRQ FTC",
        4,
        [textPart("Type "), mathPart(`\\frac{d}{dx}\\int_0^x(t^2+${a})dt`), textPart(".")],
        `x^2+${a}`,
        []
      );
    }
  },
  {
    category: "unit7",
    min: 3,
    max: 7,
    build() {
      const y0 = randInt(1, 5);
      return makeFRQ(
        "FRQ Euler",
        5,
        [textPart("Euler step: "), mathPart("h=1"), textPart(", "), mathPart("\\frac{dy}{dx}=x+y"), textPart(", start "), mathPart(`(0,${y0})`), textPart(". Type next "), mathPart("y"), textPart(".")],
        `${2 * y0}`,
        [`${2 * y0}.0`]
      );
    }
  },
  {
    category: "unit8",
    min: 4,
    max: 8,
    build() {
      const a = randInt(2, 6);
      return makeFRQ(
        "FRQ Area",
        5,
        [textPart("Type the area between "), mathPart(`y=${a}x`), textPart(" and "), mathPart("y=x^2"), textPart(" on "), mathPart(`[0,${a}]`), textPart(".")],
        fraction(a * a * a, 6),
        []
      );
    }
  },
  {
    category: "unit9",
    min: 4,
    max: 8,
    build() {
      const a = randInt(2, 6);
      return makeFRQ(
        "FRQ Parametric",
        5,
        [textPart("For "), mathPart("x=t^2"), textPart(" and "), mathPart(`y=${a}t^3`), textPart(", type "), mathPart("\\frac{dy}{dx}"), textPart(".")],
        `${fraction(3 * a, 2)}t`,
        []
      );
    }
  },
  {
    category: "unit10",
    min: 4,
    max: 8,
    build() {
      const n = randInt(2, 5);
      return makeFRQ(
        "FRQ Taylor",
        5,
        [textPart("For "), mathPart("e^x"), textPart(", type the coefficient of "), mathPart(`x^${n}`), textPart(" in the Maclaurin series.")],
        fraction(1, factorial(n)),
        []
      );
    }
  }
]);

function factorial(n) {
  let product = 1;
  for (let value = 2; value <= n; value += 1) product *= value;
  return product;
}

function getSelectedModes() {
  const selected = Array.isArray(state.modes)
    ? state.modes.filter((mode) => modeLabels[mode])
    : [];

  if (!selected.length) {
    const fallback = modeLabels[state.mode] ? state.mode : "unit1";
    state.modes = [fallback];
    state.mode = fallback;
    return state.modes;
  }

  state.modes = modeOrder.filter((mode) => selected.includes(mode));
  state.mode = state.modes[0];
  return state.modes;
}

function formatSelectedModes(modes = getSelectedModes()) {
  const unitNumbers = modes.map((mode) => mode.replace("unit", ""));
  if (unitNumbers.length === 1) return modeLabels[modes[0]] || "Unit 1";
  if (unitNumbers.length === modeOrder.length) return "Units 1-10";
  return `Units ${unitNumbers.join(", ")}`;
}

function generatorsForMode(source) {
  const selectedModes = new Set(getSelectedModes());
  return source.filter((generator) => selectedModes.has(generator.category));
}

function availableGenerators(source = generators) {
  const difficulty = Math.min(10, 1 + Math.floor(state.problemIndex / 3));
  const modePool = generatorsForMode(source);
  const currentBand = modePool.filter((generator) => difficulty >= generator.min && difficulty <= generator.max);
  if (currentBand.length) return currentBand;
  const unlocked = modePool.filter((generator) => difficulty >= generator.min);
  return unlocked.length ? unlocked : (modePool.length ? modePool : source);
}

function nextQuestion() {
  const generator = pick(availableGenerators(generators));
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
  elements.modeLabel.textContent = formatSelectedModes();
  elements.timeBar.style.transform = `scaleX(${clamp(state.time / state.maxTime, 0, 1)})`;
}

function getModeDisplayName(mode) {
  const selectedButton = elements.modeButtons.find((button) => button.dataset.mode === mode);
  const labelNode = selectedButton ? selectedButton.querySelector("strong") : null;
  const label = labelNode && labelNode.textContent ? labelNode.textContent.trim() : "";
  return label || modeLabels[mode] || modeLabels.unit1;
}

function syncModeControls() {
  const selectedModes = getSelectedModes();
  elements.modeButtons.forEach((button) => {
    const active = selectedModes.includes(button.dataset.mode);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (elements.selectedModeLabel) {
    elements.selectedModeLabel.textContent = `Mode: ${formatSelectedModes(selectedModes)}`;
  }
}

function setSelectedMode(mode) {
  if (!modeLabels[mode]) return;
  const selected = new Set(getSelectedModes());
  if (selected.has(mode)) {
    if (selected.size > 1) selected.delete(mode);
  } else {
    selected.add(mode);
  }
  state.modes = modeOrder.filter((modeKey) => selected.has(modeKey));
  state.mode = state.modes[0] || "unit1";
  syncModeControls();
  renderStats();
}

function setModePanelOpen(open) {
  if (!elements.modeGrid || !elements.modeSettings) return;
  elements.modeGrid.hidden = !open;
  elements.modeSettings.classList.toggle("active", open);
  elements.modeSettings.setAttribute("aria-expanded", String(open));
}

function initLandingOrbitMenu() {
  const menu = elements.landingOrbitMenu;
  const wheel = elements.landingOrbitWheel;
  const items = elements.landingOrbitItems;
  if (!menu || !wheel || !items.length) return;

  const cards = items.map((item) => item.querySelector(".landing-orbit-card"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0, y: 0 };
  const smoothPointer = { x: 0, y: 0 };
  const mouseDrag = { active: false, dragging: false, startX: 0, lastX: 0 };
  const touchDrag = {
    active: false,
    dragging: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastClientX: 0,
    lastClientY: 0,
    lastTime: 0,
    lastDelta: 0,
    lockedDirection: null
  };
  let mobile = window.innerWidth < 716;
  let angle = 0;
  let velocity = 0;
  let suppressClick = false;
  let lastFrame = performance.now();
  let animationFrame = 0;

  const settings = {
    radius: 530,
    baseTiltAngle: 0,
    mouseTiltIntensity: 10,
    touchSpeed: 0.22,
    dragSpeed: 0.18,
    itemBaseScale: 1,
    mobileRadiusScale: 0.85,
    mobileItemScale: 0.82,
    idleSpeed: 0.05,
    dragThreshold: 5,
    touchLockThreshold: 14
  };

  function getRadius() {
    if (window.innerWidth <= 480) return Math.min(window.innerWidth * 0.31, 136);
    if (window.innerWidth <= 820) return Math.min(window.innerWidth * 0.38, 226);
    return clamp(window.innerWidth * 0.27, 240, 455);
  }

  function updateMobileState() {
    mobile = window.innerWidth < 716;
  }

  function startMouseDrag(event) {
    event.preventDefault();
    mouseDrag.active = true;
    mouseDrag.dragging = false;
    mouseDrag.startX = event.clientX;
    mouseDrag.lastX = event.clientX;
  }

  function moveMouseDrag(event) {
    if (!mouseDrag.active) return;
    const delta = event.clientX - mouseDrag.lastX;
    const distance = Math.abs(event.clientX - mouseDrag.startX);
    mouseDrag.lastX = event.clientX;
    if (!mouseDrag.dragging && distance > settings.dragThreshold) {
      mouseDrag.dragging = true;
      velocity = 0;
    }
    if (mouseDrag.dragging) angle += delta * settings.dragSpeed;
  }

  function endMouseDrag() {
    if (mouseDrag.dragging) {
      suppressClick = true;
      window.setTimeout(() => {
        suppressClick = false;
      }, 0);
    }
    mouseDrag.active = false;
    mouseDrag.dragging = false;
  }

  function startTouchDrag(event) {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchDrag.active = true;
    touchDrag.dragging = false;
    touchDrag.lockedDirection = null;
    touchDrag.startX = touch.clientX;
    touchDrag.startY = touch.clientY;
    touchDrag.lastX = touch.clientX;
    touchDrag.lastClientX = touch.clientX;
    touchDrag.lastClientY = touch.clientY;
    touchDrag.lastTime = performance.now();
    touchDrag.lastDelta = 0;
  }

  function moveTouchDrag(event) {
    if (!touchDrag.active) return;
    const touch = event.touches[0];
    const now = performance.now();
    touchDrag.lastClientX = touch.clientX;
    touchDrag.lastClientY = touch.clientY;
    const totalX = touch.clientX - touchDrag.startX;
    const totalY = touch.clientY - touchDrag.startY;
    const absX = Math.abs(totalX);
    const absY = Math.abs(totalY);

    if (touchDrag.lockedDirection === null && (absX > settings.touchLockThreshold || absY > settings.touchLockThreshold)) {
      touchDrag.lockedDirection = absX > absY ? "horizontal" : "vertical";
      if (touchDrag.lockedDirection === "vertical") {
        touchDrag.active = false;
        return;
      }
      touchDrag.dragging = true;
      velocity = 0;
    }

    if (!touchDrag.dragging) return;
    event.preventDefault();
    const delta = touch.clientX - touchDrag.lastX;
    const elapsed = now - touchDrag.lastTime;
    touchDrag.lastX = touch.clientX;
    touchDrag.lastTime = now;
    touchDrag.lastDelta = delta;
    angle += delta * settings.touchSpeed;
    if (elapsed > 0) {
      const frameVelocity = (delta / elapsed) * 16.6667 * settings.touchSpeed;
      velocity = velocity * 0.3 + frameVelocity * 0.7;
    }
  }

  function endTouchDrag() {
    touchDrag.active = false;
    touchDrag.dragging = false;
    touchDrag.lockedDirection = null;
  }

  function cancelTouchDrag() {
    touchDrag.active = false;
    touchDrag.dragging = false;
    touchDrag.lockedDirection = null;
  }

  function trackMouseTilt(event) {
    if (mobile) return;
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
  }

  function blockDraggedClick(event) {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  function renderOrbit(now) {
    const delta = Math.min((now - lastFrame) / 16.6667, 2);
    lastFrame = now;
    const dragging = mouseDrag.dragging || touchDrag.dragging;
    if (!dragging && Math.abs(velocity) > 0.01) {
      angle += velocity;
      velocity *= 0.94 ** delta;
    } else if (!dragging) {
      velocity = 0;
      if (!reducedMotion.matches) angle += settings.idleSpeed * delta;
    }

    if (mobile) {
      smoothPointer.x = 0;
      smoothPointer.y = 0;
    } else {
      const smoothing = 1 - 0.93 ** delta;
      smoothPointer.x += (pointer.x - smoothPointer.x) * smoothing;
      smoothPointer.y += (pointer.y - smoothPointer.y) * smoothing;
    }

    const tiltX = settings.baseTiltAngle + smoothPointer.y * settings.mouseTiltIntensity;
    const tiltY = smoothPointer.x * settings.mouseTiltIntensity;
    wheel.style.transform = mobile ? `rotateX(${settings.baseTiltAngle}deg)` : `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    const radius = getRadius() * (mobile ? settings.mobileRadiusScale : 1);
    const itemScale = settings.itemBaseScale * (mobile ? settings.mobileItemScale : 1);
    const step = 360 / items.length;
    const degreesToRadians = Math.PI / 180;

    items.forEach((item, index) => {
      const rotation = angle + index * step;
      const depth = (Math.cos(rotation * degreesToRadians) + 1) * 0.5;
      const scale = (0.6 + depth * 0.4) * itemScale;
      item.style.transform = `translate(-50%, -50%) rotateY(${rotation}deg) translateZ(${radius}px)`;
      item.style.zIndex = String(Math.round(depth * 1000));
      if (cards[index]) cards[index].style.transform = `scale(${scale})`;
    });

    animationFrame = window.requestAnimationFrame(renderOrbit);
  }

  window.addEventListener("resize", updateMobileState);
  window.addEventListener("mousemove", trackMouseTilt, { passive: true });
  menu.addEventListener("mousedown", startMouseDrag);
  window.addEventListener("mousemove", moveMouseDrag);
  window.addEventListener("mouseup", endMouseDrag);
  menu.addEventListener("touchstart", startTouchDrag, { passive: true });
  menu.addEventListener("touchmove", moveTouchDrag, { passive: false });
  menu.addEventListener("touchend", endTouchDrag, { passive: true });
  menu.addEventListener("touchcancel", cancelTouchDrag, { passive: true });
  menu.addEventListener("click", blockDraggedClick, true);
  animationFrame = window.requestAnimationFrame(renderOrbit);
  return () => window.cancelAnimationFrame(animationFrame);
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
  if (elements.floatingToggle) {
    elements.floatingToggle.classList.toggle("active", false);
    elements.floatingToggle.setAttribute("aria-pressed", "false");
  }
  if (!appSettings.floatingNumbers) {
    formulae.forEach((formula) => {
      if (formula.node) formula.node.style.opacity = "0";
    });
  }
}

function shouldGenerateFloatingNumbers() {
  return state.page === "landing" || (state.page === "home" && !state.running);
}

function isFloatingNumbersRenderable() {
  if (!appSettings.floatingNumbers) return false;
  if (shouldGenerateFloatingNumbers()) return true;
  if (state.formulaDrain) return !state.formulaDrainComplete;
  return false;
}

function beginFormulaDrain() {
  if (state.formulaDrain) return;

  state.formulaDrain = true;
  state.formulaDrainComplete = false;
  state.formulaDrainTarget = Math.min(formulaTargetCount(), formulae.length);

  formulae.forEach((formula, index) => {
    if (index >= state.formulaDrainTarget || !formula.node) {
      formula.drained = true;
      if (formula.node) formula.node.style.opacity = "0";
      return;
    }

    const offset = getFormulaFlowOffset(formula, index, state.formulaDrainTarget);
    const rawProgress = state.formulaTime + offset;
    if (rawProgress < 0) {
      formula.drained = true;
      if (formula.node) formula.node.style.opacity = "0";
      return;
    }

    formula.drainOffset = offset;
    formula.drainEndCycle = Math.floor(rawProgress) + 1;
    formula.drained = false;
  });
}

function endFormulaDrain() {
  state.formulaDrain = false;
  state.formulaDrainComplete = false;
  state.formulaDrainTarget = 0;
  resetFormulaFlowFromCenter();
}

function getFormulaFlowOffset(formula, index, target) {
  return Number.isFinite(formula.flowOffset) ? formula.flowOffset : index / Math.max(1, target);
}

function resetFormulaFlowFromCenter() {
  const target = Math.max(1, formulaTargetCount());
  const spawnWindow = 0.92;
  state.formulaTime = 0;
  state.formulaPulse = 0;

  formulae.forEach((formula, index) => {
    formula.drained = false;
    formula.drainOffset = null;
    formula.drainEndCycle = null;
    formula.flowOffset = -(index * spawnWindow) / target;
    formula.cycle = -1;
    if (formula.node) formula.node.style.opacity = "0";
  });
}

function setFloatingNumbersPagePaused(paused) {
  const wasPaused = document.body.classList.contains("floating-page-paused");
  if (paused === wasPaused) return;

  document.body.classList.toggle("floating-page-paused", paused);
  if (paused) beginFormulaDrain();
  else endFormulaDrain();
}

function applyDesmosSettings() {
  document.body.classList.toggle("desmos-answer-box-hidden", desmosSettings.hideAnswerBox);
  document.body.classList.toggle("desmos-timebar-off", !desmosSettings.timebar);

  if (elements.desmosAnswerToggle) {
    const answerVisible = !desmosSettings.hideAnswerBox;
    const label = answerVisible ? "Hide Desmos text" : "Show Desmos text";
    elements.desmosAnswerToggle.setAttribute("aria-pressed", String(answerVisible));
    elements.desmosAnswerToggle.setAttribute("aria-label", label);
    elements.desmosAnswerToggle.title = label;
  }
  if (elements.desmosTimebarToggle) {
    elements.desmosTimebarToggle.classList.toggle("active", desmosSettings.timebar);
    elements.desmosTimebarToggle.setAttribute("aria-pressed", String(desmosSettings.timebar));
  }

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
  if (appSettings.floatingNumbers && shouldGenerateFloatingNumbers()) resetFormulaFlowFromCenter();
}

function toggleDesmosAnswerBox() {
  desmosSettings.hideAnswerBox = !desmosSettings.hideAnswerBox;
  applyDesmosSettings();
}

function toggleDesmosTimebar() {
  desmosSettings.timebar = !desmosSettings.timebar;
  localStorage.setItem("bc-blitz-desmos-timebar", desmosSettings.timebar ? "on" : "off");
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
  return document.fullscreenElement === elements.calcPage;
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

function setTi84GuideOpen(open, options = {}) {
  if (!elements.ti84Guide || !elements.ti84GuideToggle || !elements.calcPage) return;
  elements.ti84Guide.hidden = !open;
  elements.ti84GuideToggle.setAttribute("aria-expanded", String(open));
  elements.ti84GuideToggle.setAttribute("aria-label", open ? "Close TI84 AP guide" : "Open TI84 AP guide");
  elements.calcPage.classList.toggle("ti84-guide-open", open);
  if (options.focus !== false) elements.ti84GuideToggle.focus();
}

function toggleTi84Guide() {
  if (!elements.ti84Guide) return;
  setTi84GuideOpen(elements.ti84Guide.hidden);
}

async function toggleTi84Fullscreen() {
  if (!elements.calcPage || !elements.ti84Fullscreen) return;
  if (!document.fullscreenEnabled || !elements.calcPage.requestFullscreen) {
    elements.ti84Fullscreen.disabled = true;
    elements.ti84Fullscreen.title = "Fullscreen is not supported";
    return;
  }

  try {
    if (isTi84Fullscreen()) {
      await document.exitFullscreen();
    } else {
      await elements.calcPage.requestFullscreen();
    }
  } catch {
    elements.ti84Fullscreen.blur();
  }

  updateTi84FullscreenButton();
}

function showPage(page) {
  const previousPage = state.page;
  const showingLanding = page === "landing";
  const showingHome = page === "home";
  const showingDeveloper = page === "developer";
  const showingDesmos = page === "desmos";
  const showingAP = page === "ap";
  const showingStudy = page === "study" || showingAP;
  const showingCalc = page === "calc";
  const showingGame = page === "game";
  state.page = page;

  if (["study", "ap"].includes(previousPage) && !showingStudy) pauseStudyVideoPlayback();

  elements.landingPage.classList.toggle("active", showingLanding);
  elements.landingPage.setAttribute("aria-hidden", String(!showingLanding));
  elements.homePage.classList.toggle("active", showingHome);
  elements.homePage.setAttribute("aria-hidden", String(!showingHome));
  elements.developerPage.classList.toggle("active", showingDeveloper);
  elements.developerPage.setAttribute("aria-hidden", String(!showingDeveloper));
  elements.desmosPage.classList.toggle("active", showingDesmos);
  elements.desmosPage.setAttribute("aria-hidden", String(!showingDesmos));
  elements.studyPage.classList.toggle("active", showingStudy);
  elements.studyPage.setAttribute("aria-hidden", String(!showingStudy));
  elements.calcPage.classList.toggle("active", showingCalc);
  elements.calcPage.setAttribute("aria-hidden", String(!showingCalc));
  elements.gamePage.hidden = !showingGame;
  document.body.classList.toggle("game-view", showingGame);
  document.body.classList.toggle("frq-view", showingGame && state.current && state.current.kind === "frq");
  if (!showingCalc) setTi84GuideOpen(false, { focus: false });
  elements.frqPanel.classList.toggle("active", showingGame && state.current && state.current.kind === "frq");
  elements.frqPanel.setAttribute("aria-hidden", String(!(showingGame && state.current && state.current.kind === "frq")));

  elements.navPlay.classList.toggle("active", showingHome);
  elements.navDesmos.classList.toggle("active", showingDesmos);
  elements.navCalc.classList.toggle("active", showingCalc);
  elements.navAP.classList.toggle("active", false);
  elements.navStudy.classList.toggle("active", showingStudy);
  elements.navDeveloper.classList.toggle("active", showingDeveloper);

  setFloatingNumbersPagePaused(!shouldGenerateFloatingNumbers());

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

function startGame(mode = null) {
  if (modeLabels[mode]) {
    state.modes = [mode];
    state.mode = mode;
  } else {
    const selectedModes = getSelectedModes();
    state.mode = selectedModes[0];
  }
  syncModeControls();
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
  state.formulaPulse = clamp(state.formulaPulse + count / (calm ? 480 : 620), 0, 1.05);

  const target = formulaTargetCount();
  const refreshCount = Math.min(Math.max(3, Math.round(count / 12)), Math.floor(target * 0.12));
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
  token.node = node;
  renderFloatingFormulaNode(token);
  return token;
}

function renderFloatingFormulaNode(token) {
  const node = token.node;
  if (!node) return;

  if (token.integralLane) {
    node.textContent = "";
    node.classList.remove("mq-math-mode", "math-fallback");

    const symbol = document.createElement("span");
    symbol.className = "floating-integral-symbol";
    symbol.textContent = "∫";

    const body = document.createElement("span");
    body.className = "floating-integral-body";
    body.textContent = token.integralBody || " f(x) dx";

    node.appendChild(symbol);
    node.appendChild(body);
    return;
  }

  renderStaticMath(node, token.text);
}

function removeFormulaNode(token) {
  if (token.node && token.node.parentNode) {
    token.node.parentNode.removeChild(token.node);
  }
  token.node = null;
}

function formulaTargetCount() {
  if (window.innerWidth < 560) return state.running ? 54 : 42;
  if (window.innerWidth < 900) return state.running ? 76 : 56;
  return state.running ? 94 : 68;
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
    "identity",
    "series",
    "vector",
    "derivative",
    "limit",
    "integral",
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
  token.integralBody = integralLane ? createFloatingIntegralBody() : "";
  token.angle = angle;
  token.dirX = dirX;
  token.dirY = dirY;
  token.startRadius = rand(
    Math.max(22, Math.min(width, height) * 0.028),
    Math.max(34, Math.min(width, height) * 0.064)
  );
  token.endRadius = diagonal * rand(0.56, 0.72);
  token.depthStart = rand(-980, -720);
  token.depthEnd = rand(170, 285);
  token.baseSize = integralLane ? rand(44, 64) : rand(22, 36);
  token.startScale = integralLane ? rand(0.045, 0.07) : rand(0.042, 0.072);
  token.endScale = integralLane ? rand(1.28, 1.62) : rand(1.1, 1.5);
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
    renderFloatingFormulaNode(token);
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
  const renderFloatingNumbers = isFloatingNumbersRenderable();
  if (renderFloatingNumbers) replenishFormulae(dt);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawAmbient(now);
  drawParticles(dt);
  if (renderFloatingNumbers) drawFormulae(dt);
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
  if (!desmosState.transitioning && desmosState.promptHealthTime >= 0.25) {
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
    setDesmosFeedback("Time's up", "complete");
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
  const draining = state.formulaDrain;
  const target = draining ? Math.min(state.formulaDrainTarget || formulaTargetCount(), formulae.length) : Math.min(formulaTargetCount(), formulae.length);
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const edgePadding = Math.max(220, Math.min(window.innerWidth, window.innerHeight) * 0.24);
  let drainingCount = 0;

  for (let i = 0; i < formulae.length; i += 1) {
    const f = formulae[i];

    if (i >= target) {
      if (f.node) f.node.style.opacity = "0";
      continue;
    }

    if (draining && f.drained) {
      if (f.node) f.node.style.opacity = "0";
      continue;
    }

    if (draining && !f.node) {
      f.drained = true;
      continue;
    }

    if (!f.node) attachFormulaNode(f);
    const offset = draining ? f.drainOffset : getFormulaFlowOffset(f, i, target);
    const rawProgress = state.formulaTime + offset;
    if (rawProgress < 0) {
      f.node.style.opacity = "0";
      continue;
    }

    const cycle = Math.floor(rawProgress);
    const progress = rawProgress - cycle;

    if (draining && cycle >= f.drainEndCycle) {
      f.drained = true;
      f.node.style.opacity = "0";
      continue;
    }

    if (!draining && cycle !== f.cycle) {
      f.cycle = cycle;
      if ((cycle + f.index) % 3 === 0) refreshFormulaToken(f, true);
    }

    if (draining) drainingCount += 1;

    const depthEase = smoothstep(0, 1, progress);
    const tunnelTravel = Math.pow(progress, 1.82);
    const distanceToVerticalEdge = f.dirX === 0 ? 0 : (f.dirX > 0 ? window.innerWidth - centerX : centerX) / Math.abs(f.dirX);
    const distanceToHorizontalEdge = f.dirY === 0 ? 0 : (f.dirY > 0 ? window.innerHeight - centerY : centerY) / Math.abs(f.dirY);
    const distanceToScreenEdge = Math.min(
      distanceToVerticalEdge || Number.POSITIVE_INFINITY,
      distanceToHorizontalEdge || Number.POSITIVE_INFINITY
    );
    const endRadius = Math.max(f.endRadius, distanceToScreenEdge + edgePadding);
    const radius = lerp(f.startRadius, endRadius, tunnelTravel);
    const x = centerX + f.dirX * radius;
    const y = centerY + f.dirY * radius;
    const depth = lerp(f.depthStart, f.depthEnd, depthEase);
    const scale = lerp(f.startScale, f.endScale, depthEase);
    const stretch = lerp(f.stretch, 1, depthEase);
    const rotateX = lerp(f.tiltX * 0.12, f.tiltX, depthEase);
    const rotateY = lerp(f.tiltY * 0.12, f.tiltY, depthEase);
    const rotateZ = f.roll + f.rollDrift * progress;
    const pulseScale = 1 + state.formulaPulse * 0.06 * (1 - progress);
    const alpha = smoothstep(0, 0.1, progress) * f.opacity * (1 - smoothstep(0.94, 1, progress) * 0.08);

    f.x = x;
    f.y = y;
    f.node.style.opacity = `${alpha}`;
    f.node.style.transform = `translate3d(${x}px, ${y}px, ${depth}px) translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale3d(${scale * stretch * pulseScale}, ${scale * pulseScale}, 1)`;
  }

  if (draining && drainingCount === 0) state.formulaDrainComplete = true;
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
  button.addEventListener("click", () => {
    setSelectedMode(button.dataset.mode);
  });
});
elements.modeStart.addEventListener("click", () => startGame());
elements.modeSettings.addEventListener("click", () => {
  setModePanelOpen(elements.modeGrid.hidden);
});
elements.navHome.addEventListener("click", () => leaveGame("landing"));
elements.navPlay.addEventListener("click", () => leaveGame("home"));
elements.navDesmos.addEventListener("click", () => leaveGame("desmos"));
elements.navCalc.addEventListener("click", () => leaveGame("calc"));
elements.navAP.addEventListener("click", () => leaveGame("ap"));
elements.navStudy.addEventListener("click", () => leaveGame("study"));
elements.navDeveloper.addEventListener("click", () => leaveGame("developer"));
elements.homeTargetButtons.forEach((button) => {
  button.addEventListener("click", () => leaveGame(button.dataset.homeTarget || "landing"));
});
elements.start.addEventListener("click", () => startGame());
elements.restart.addEventListener("click", () => startGame());
elements.skip.addEventListener("click", skipQuestion);
elements.frqForm.addEventListener("submit", answerFRQ);
elements.desmosStart.addEventListener("click", startDesmosSpeedrun);
elements.desmosModeButtons.forEach((button) => {
  button.addEventListener("click", () => setDesmosMode(button.dataset.desmosMode));
});
elements.mathTypingModeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    setMathTypingConfig({ mode: button.dataset.mathTypingMode });
  });
});
elements.mathTypingAmountButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    setMathTypingConfig({ amount: Number(button.dataset.mathTypingAmount) });
  });
});
elements.mathTypingInput.addEventListener("input", handleMathTypingInput);
elements.mathTypingInput.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    event.stopPropagation();
    restartMathTypingGame();
    return;
  }
  if (handleMathTypingSpecialKey(event)) return;
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
if (elements.floatingToggle) elements.floatingToggle.addEventListener("click", toggleFloatingNumbers);
if (elements.desmosAnswerToggle) elements.desmosAnswerToggle.addEventListener("click", toggleDesmosAnswerBox);
if (elements.desmosTimebarToggle) elements.desmosTimebarToggle.addEventListener("click", toggleDesmosTimebar);
if (elements.ti84GuideToggle) elements.ti84GuideToggle.addEventListener("click", toggleTi84Guide);
elements.ti84Fullscreen.addEventListener("click", toggleTi84Fullscreen);
document.addEventListener("fullscreenchange", updateTi84FullscreenButton);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.settingsOverlay.hidden) {
    setSettingsOpen(false);
    return;
  }
  if (event.key === "Escape" && state.page === "study" && elements.studyVideoWatch && !elements.studyVideoWatch.hidden) {
    closeStudyVideo({ focus: true });
    return;
  }
  if (event.key === "Escape" && elements.ti84Guide && !elements.ti84Guide.hidden) {
    setTi84GuideOpen(false);
    return;
  }
  if (event.key === "Tab" && isMathTypingActive() && elements.settingsOverlay.hidden && elements.desmosGuide.hidden) {
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
  window.requestAnimationFrame(() => {
    updateMathTypingViewport();
    updateMathTypingCaret();
  });
});

resizeCanvas();
syncModeControls();
setModePanelOpen(false);
renderStats();
applyAppSettings();
applyDesmosSettings();
initDesmosPromptTooltips();
initLandingOrbitMenu();
initStudyVideoGrid();
resetMathTypingGame();
setDesmosMode("speedrun");
showPage("landing");
setDesmosAnswerEnabled(false);
window.requestAnimationFrame(drawVfx);
