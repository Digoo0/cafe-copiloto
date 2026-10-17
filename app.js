const CONFIG = {
  ratios: { doce: 16.5, brilhante: 17, equilibrado: 16 },
  retention: { papel: 2.1, aco: 2.3, prensa: 3 },
  temperature: {
    clara: { papel: 95, aco: 95, prensa: 94 },
    media: { papel: 93, aco: 93, prensa: 93 },
    escura: { papel: 90, aco: 90, prensa: 91 },
    nao_sei: { papel: 93, aco: 93, prensa: 93 }
  },
  grind: {
    papel: { doce: 'média-fina', brilhante: 'média a média-fina', equilibrado: 'média-fina' },
    aco: { doce: 'média', brilhante: 'média', equilibrado: 'média' },
    prensa: { doce: 'média-grossa', brilhante: 'média-grossa', equilibrado: 'média-grossa' }
  },
  grindHelp: {
    'média-fina': 'semelhante a areia fina',
    'média a média-fina': 'entre areia e areia fina',
    'média': 'semelhante a areia',
    'média-grossa': 'mais grossa que areia comum'
  },
  labels: {
    doce: 'Doce e redondo', brilhante: 'Frutado e brilhante', equilibrado: 'Equilibrado',
    papel: 'Papel', aco: 'Aço', prensa: 'Prensa francesa',
    clara: 'Clara', media: 'Média', escura: 'Escura', nao_sei: 'Não sei'
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const storageKey = 'cafe-copiloto-history-v1';
let currentRecipe = null;
let timerId = null;
let elapsed = 0;
let timerRunning = false;

function roundHalf(value) { return Math.round(value * 2) / 2; }
function formatDose(value) { return Number.isInteger(value) ? String(value) : value.toFixed(1).replace('.', ','); }
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function calculateRecipe({ profile, volume, method, roast }) {
  const ratio = CONFIG.ratios[profile];
  const retention = CONFIG.retention[method];
  const dose = roundHalf(volume / (ratio - retention));
  const water = Math.round(dose * ratio);
  const bloom = Math.round(dose * 3);
  const temperature = CONFIG.temperature[roast][method];
  const grind = CONFIG.grind[method][profile];
  const firstTarget = method === 'papel' ? Math.round(water * .60) : method === 'aco' ? Math.round(water * .65) : water;
  const totalSeconds = method === 'prensa' ? 480 : 195;
  const steps = buildSteps(method, water, bloom, firstTarget);
  return { id: Date.now(), profile, volume, method, roast, ratio, retention, dose, water, bloom, temperature, grind, firstTarget, totalSeconds, steps };
}

function buildSteps(method, water, bloom, firstTarget) {
  if (method === 'prensa') return [
    { at: 0, time: '00:00', title: `Adicione os ${water} g de água`, detail: 'Coloque toda a água de uma vez e garanta que todo o café fique molhado.' },
    { at: 240, time: '04:00', title: 'Quebre a crosta com delicadeza', detail: 'Mexa só a superfície. Se quiser uma bebida mais limpa, retire a espuma.' },
    { at: 420, time: '07:00–09:00', title: 'Baixe o êmbolo devagar e sirva', detail: 'Não comprima o café no fundo. Sirva assim que terminar.' }
  ];
  if (method === 'aco') return [
    { at: 0, time: '00:00', title: `Faça a pré-infusão com ${bloom} g`, detail: 'Molhe todo o café por igual com um despejo suave.' },
    { at: 45, time: '00:45', title: `Continue até ${firstTarget} g`, detail: 'Mantenha um fluxo calmo e circular, sem agitar demais.' },
    { at: 90, time: '≈ 01:20–01:40', title: `Complete até ${water} g`, detail: 'Espere o nível baixar parcialmente antes do despejo final.' },
    { at: 165, time: '02:45–03:30', title: 'Observe o fim do escoamento', detail: 'O tempo é uma referência para ajustar a próxima receita.' }
  ];
  return [
    { at: 0, time: '00:00', title: `Faça a pré-infusão com ${bloom} g`, detail: 'Molhe todo o café por igual com um despejo suave.' },
    { at: 45, time: '00:45', title: `Continue até ${firstTarget} g`, detail: 'Despeje devagar, mantendo o nível de água estável.' },
    { at: 80, time: '≈ 01:20', title: `Complete até ${water} g`, detail: 'Finalize sem encostar a água diretamente no papel.' },
    { at: 165, time: '02:45–03:30', title: 'Observe o fim do escoamento', detail: 'Use o tempo como pista, não como obrigação.' }
  ];
}

function observationsFor(recipe) {
  const notes = [];
  if (recipe.method === 'aco') notes.push('Filtros de aço variam bastante. Anote o tempo real: ele ajuda a calibrar a moagem.');
  else if (recipe.method === 'prensa') notes.push('Não há pré-infusão separada neste método; toda a água entra no início.');
  else notes.push('O leito deve ficar molhado por igual, sem despejos agressivos.');
  if (recipe.profile === 'brilhante') notes.push('Busque clareza e vivacidade, não um sabor azedo ou agressivo.');
  else if (recipe.profile === 'doce') notes.push('Use movimentos suaves e consistentes para favorecer uniformidade e maciez.');
  else notes.push('Mantenha a técnica simples e consistente para equilibrar corpo, doçura e clareza.');
  notes.push(`Moagem ${recipe.grind}: ${CONFIG.grindHelp[recipe.grind]}.`);
  return notes;
}

function renderRecipe(recipe) {
  currentRecipe = recipe;
  $('#recipeTitle').textContent = `${CONFIG.labels[recipe.profile]} no ${recipe.method === 'papel' ? 'filtro de papel' : CONFIG.labels[recipe.method].toLowerCase()}`;
  $('#recipeSubtitle').textContent = `${recipe.volume} ml na xícara · torra ${CONFIG.labels[recipe.roast].toLowerCase()}`;
  $('#methodBadge').textContent = CONFIG.labels[recipe.method];
  $('#recipeStats').innerHTML = [
    ['Café', `${formatDose(recipe.dose)} g`, ''],
    ['Água', `${recipe.water} g`, ''],
    ['Proporção', `1:${String(recipe.ratio).replace('.', ',')}`, ''],
    ['Temperatura', `${recipe.temperature} °C`, ''],
    ['Moagem', recipe.grind, 'wide']
  ].map(([label, value, cls]) => `<div class="stat ${cls}"><small>${label}</small><strong>${value}</strong></div>`).join('');
  $('#timeline').innerHTML = recipe.steps.map((step, i) => `<li data-step="${i}"><time>${step.time}</time><div><strong>${step.title}</strong><p>${step.detail}</p></div></li>`).join('');
  $('#observations').innerHTML = observationsFor(recipe).slice(0, 3).map(note => `<div class="observe-item"><span>✓</span><div>${note}</div></div>`).join('');
  $('#adjustment').classList.add('hidden');
  $$('#feedbackGrid button').forEach(btn => btn.disabled = false);
  $('#recipeView').classList.remove('hidden');
  $('.planner').classList.add('hidden');
  $('#historyPanel').classList.add('hidden');
  resetTimer();
  $('#recipeView').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function startOrResumeTimer() {
  $('#timerPanel').classList.remove('hidden');
  if (timerRunning) return;
  timerRunning = true;
  $('#pauseTimer').textContent = 'Pausar';
  updateTimerUI();
  timerId = setInterval(() => { elapsed += 1; updateTimerUI(); }, 1000);
}

function updateTimerUI() {
  $('#timerDisplay').textContent = formatTime(elapsed);
  const currentIndex = currentRecipe.steps.reduce((found, step, index) => elapsed >= step.at ? index : found, 0);
  const current = currentRecipe.steps[currentIndex];
  $('#timerInstruction').textContent = current.title;
  $$('#timeline li').forEach((li, index) => li.classList.toggle('active', index === currentIndex));
  if (elapsed > currentRecipe.totalSeconds + 45) pauseTimer();
}

function pauseTimer() {
  clearInterval(timerId);
  timerRunning = false;
  $('#pauseTimer').textContent = 'Continuar';
}

function resetTimer() {
  clearInterval(timerId);
  timerRunning = false;
  elapsed = 0;
  $('#timerDisplay').textContent = '00:00';
  $('#timerInstruction').textContent = 'Prepare tudo e toque em começar.';
  $('#timerPanel').classList.add('hidden');
  $$('#timeline li').forEach(li => li.classList.remove('active'));
}

function adjustmentFor(feedback, recipe) {
  const map = {
    perfeito: ['Receita salva como referência', 'Ótimo. Repita estes parâmetros neste café, método e perfil.'],
    azedo: ['Próximo ajuste: moa um pouco mais fino', 'Isso tende a aumentar a extração. Mantenha proporção, temperatura e técnica iguais para entender o efeito.'],
    amargo: ['Próximo ajuste: moa um pouco mais grosso', 'Mantenha as outras variáveis iguais. Se continuar amargo depois, avalie reduzir a temperatura.'],
    seco: ['Próximo ajuste: reduza a agitação', 'Faça despejos mais suaves. Se já usa pouca agitação, engrosse levemente a moagem.'],
    fraco: ['Próximo ajuste: use mais café', `O sabor está bom, mas falta concentração. Tente aproximar a proporção de 1:${Math.max(14, recipe.ratio - 1).toString().replace('.', ',')}.`],
    forte: ['Próximo ajuste: use mais água', `O sabor está bom, mas está concentrado. Tente aproximar a proporção de 1:${Math.min(18, recipe.ratio + 1).toString().replace('.', ',')}.`]
  };
  return map[feedback];
}

function saveFeedback(feedback) {
  if (!currentRecipe) return;
  const [title, detail] = adjustmentFor(feedback, currentRecipe);
  $('#adjustment').innerHTML = `<strong>${title}</strong>${detail}`;
  $('#adjustment').classList.remove('hidden');
  $$('#feedbackGrid button').forEach(btn => btn.disabled = true);
  const history = getHistory();
  history.unshift({ ...currentRecipe, feedback, date: new Date().toISOString(), adjustment: title });
  localStorage.setItem(storageKey, JSON.stringify(history.slice(0, 30)));
  updateHistoryCount();
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || []; } catch { return []; }
}

function updateHistoryCount() { $('#historyCount').textContent = getHistory().length; }

function showHistory() {
  const history = getHistory();
  $('.planner').classList.add('hidden');
  $('#recipeView').classList.add('hidden');
  $('#historyPanel').classList.remove('hidden');
  $('#historyList').innerHTML = history.length ? history.map(item => {
    const date = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(item.date));
    return `<article class="history-item"><div><h3>${CONFIG.labels[item.profile]} · ${CONFIG.labels[item.method]}</h3><p>${formatDose(item.dose)} g de café · ${item.water} g de água · ${date}</p></div><span class="result-pill">${item.feedback}</span></article>`;
  }).join('') : '<div class="empty-state">Seu primeiro preparo avaliado vai aparecer aqui.</div>';
  $('#historyPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

$('#recipeForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const volume = Math.min(1000, Math.max(100, Number(data.get('volume'))));
  renderRecipe(calculateRecipe({ profile: data.get('profile'), volume, method: data.get('method'), roast: data.get('roast') }));
});

$$('[data-volume-step]').forEach(button => button.addEventListener('click', () => {
  const input = $('#volume');
  input.value = Math.min(1000, Math.max(100, Number(input.value || 300) + Number(button.dataset.volumeStep)));
}));

$('#backButton').addEventListener('click', () => { resetTimer(); $('#recipeView').classList.add('hidden'); $('.planner').classList.remove('hidden'); $('.planner').scrollIntoView({ behavior: 'smooth' }); });
$('#startTimer').addEventListener('click', startOrResumeTimer);
$('#pauseTimer').addEventListener('click', () => timerRunning ? pauseTimer() : startOrResumeTimer());
$('#resetTimer').addEventListener('click', () => { resetTimer(); startOrResumeTimer(); });
$('#feedbackGrid').addEventListener('click', (event) => { const btn = event.target.closest('[data-feedback]'); if (btn && !btn.disabled) saveFeedback(btn.dataset.feedback); });
$('#historyButton').addEventListener('click', showHistory);
$('#closeHistory').addEventListener('click', () => { $('#historyPanel').classList.add('hidden'); $('.planner').classList.remove('hidden'); });

updateHistoryCount();
