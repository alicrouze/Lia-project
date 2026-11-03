if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', function() {
    window.scrollTo(0, 0);
    document.body.style.height = window.visualViewport.height + 'px';
  });
}
window.addEventListener('resize', function() { window.scrollTo(0, 0); });

const bulles = document.getElementById('bulles');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');


let historique = [];
let nomUtilisateur = null;

function ajouterBulle(texte, type) {
  const b = document.createElement('div');
  b.className = 'bulle ' + type;
  b.textContent = texte;
  bulles.appendChild(b);
  setTimeout(function() { b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }, 100);
  return b;
}

function ajouterImage(src) {
  const b = document.createElement('div');
  b.className = 'bulle image';
  b.innerHTML = '<img src="' + src + '" style="max-width:100%; max-height:250px; border-radius:16px;">';
  bulles.appendChild(b);
  setTimeout(function() { b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }, 100);
  return b;
}

function afficherImagePleinEcran(src) {
  var div = document.getElementById('image-plein-ecran');
  if (!div) {
    div = document.createElement('div');
    div.id = 'image-plein-ecran';
    document.body.appendChild(div);
  }
  div.innerHTML = '<img src="' + src + '">';
  div.classList.add('visible');
  setTimeout(function() {
    div.classList.remove('visible');
    ajouterImage(src);
    setTimeout(afficherCarte, 5000);
  }, 5000);
}

const phrasesCartes = [
  { texte: "Je prefere avoir raison plutot que d etre heureux.", type: "defaut" },
  { texte: "Je montre une version de moi qui n est pas totalement vraie.", type: "defaut" },
  { texte: "J ai peur du jugement des autres.", type: "defaut" },
  { texte: "Je fuis quand on s approche trop de moi.", type: "defaut" },
  { texte: "Je remets a demain ce qui pourrait me faire avancer aujourd hui.", type: "defaut" }
];
let indexCarte = 0;
const carteSwipe = document.getElementById('carte-swipe');
const carteTexte = document.getElementById('carte-texte');

function afficherCarte() {
  if (indexCarte >= phrasesCartes.length) {
    carteSwipe.classList.add("cachee");
    return;
  }
  carteSwipe.style.transform = "";
  carteSwipe.style.opacity = "";
  carteSwipe.style.background = "rgba(20, 30, 50, 0.95)";
  carteTexte.textContent = phrasesCartes[indexCarte].texte;
  carteSwipe.classList.remove("cachee");
}

function swipeCarte(reponse) {
  indexCarte++;
  carteSwipe.classList.add("cachee");
  setTimeout(afficherCarte, 400);
}

var startY = 0;
var isSwiping = false;
document.getElementById("carte-touch").addEventListener("touchstart", function(e) {
  if (carteSwipe.classList.contains("cachee")) return;
  startY = e.touches[0].clientY;
  isSwiping = true;
  carteSwipe.classList.add("glisse");
});
document.getElementById("carte-touch").addEventListener("touchmove", function(e) {
  if (!isSwiping) return;
  e.preventDefault();
  var deltaY = e.touches[0].clientY - startY;
  carteSwipe.style.transform = "translate(-50%, calc(-50% + " + deltaY + "px)) ";
  carteSwipe.style.opacity = 1 - Math.abs(deltaY) / 300;
  if (deltaY < 0) {
    carteSwipe.style.background = "rgba(80, 255, 120, " + (Math.min(Math.abs(deltaY) / 150, 0.4)) + ")";
  } else {
    carteSwipe.style.background = "rgba(255, 80, 80, " + (Math.min(Math.abs(deltaY) / 150, 0.4)) + ")";
  }
});
document.getElementById("carte-touch").addEventListener("touchend", function(e) {
  if (!isSwiping) return;
  isSwiping = false;
  var deltaY = e.changedTouches[0].clientY - startY;
  carteSwipe.classList.remove("glisse");
  if (deltaY < -50) {
    carteSwipe.style.transform = "translate(-50%, -150%)";
    carteSwipe.style.opacity = "0";
    swipeCarte(true);
  } else if (deltaY > 50) {
    carteSwipe.style.transform = "translate(-50%, 150%)";
    carteSwipe.style.opacity = "0";
    swipeCarte(false);
  } else {
    carteSwipe.style.transform = "";
    carteSwipe.style.opacity = "";
    carteSwipe.style.background = "rgba(20, 30, 50, 0.95)";
  }
});

function demanderNom() {
  const mots1 = ['Lune', 'Ombre', 'Braise', 'Écho', 'Sable', 'Océan', 'Nuage', 'Soleil'];
  const mots2 = ['Douce', 'Sauvage', 'Secrète', 'Perdue', 'Profonde', 'Silencieuse', 'Étoilée', 'Nue'];
  const p1 = mots1[Math.floor(Math.random() * mots1.length)];
  const p2 = mots2[Math.floor(Math.random() * mots2.length)];
  const pseudo = p1 + '-' + p2;
  ajouterBulle("Bonjour, je suis 3. Je cherche des âmes jumelles pour créer des couples. Soyez parfaitement honnête dans vos réponses. 3 est l'un des derniers refuges où vous pouvez être vous-même. Pas de nom, pas de photo, aucune donnée personnelle. Votre anonymat est total et ce que vous direz est inaccessible. Alors soyez vous-même ! C'est le secret de la rencontre parfaite.", 'lia');
  return new Promise(function(resolve) { resolve(pseudo); });
}

async function envoyer() {
  const texte = input.value.trim();
  if (!texte) return;
  input.value = '';
  sendBtn.disabled = true;
  ajouterBulle(texte, 'user');
  historique.push({ role: 'user', content: texte });
  const bulleLia = ajouterBulle('...', 'lia');
  try {
    const reponse = await puter.ai.chat(historique, { model: 'gpt-5.4-nano' });
    let t = reponse;
    if (typeof reponse === 'object' && reponse.message) {
      t = reponse.message.content || reponse.message;
    }
    t = t.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    var match = t.match(/\[THEME:(.*?)\]/);
    if (match) {
      document.getElementById('theme-courant').textContent = match[1].replace(/_/g, ' ').charAt(0).toUpperCase() + match[1].replace(/_/g, ' ').slice(1);
      t = t.replace(match[0], '').trim();
    }
    bulleLia.textContent = t;
    historique.push({ role: 'assistant', content: t });
  } catch (e) {
    bulleLia.textContent = 'Erreur : ' + e.message;
  }
  sendBtn.disabled = false;
  input.focus();
}

async function demarrer() {
  nomUtilisateur = await demanderNom();
  historique = [
    { role: 'system', content: LIA_PERSONA },
    { role: 'system', content: "L'utilisateur est anonyme." }
  ];
  await new Promise(r => setTimeout(r, 16000));
  afficherImagePleinEcran('image_qui_je_suis.jpg');
  input.placeholder = 'Écris-moi quelque chose...';
  sendBtn.addEventListener('click', envoyer);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') envoyer();
  });
}

document.getElementById('accueil').addEventListener('click', function() {
  this.classList.add('hidden');
  document.getElementById('chat').classList.add('visible');
  setTimeout(demarrer, 1000);
});

document.getElementById('zone-logo').addEventListener('click', function(e) {
  e.stopPropagation();
  document.getElementById('menu-deroulant').classList.toggle('visible');
});
document.addEventListener('click', function() {
  document.getElementById('menu-deroulant').classList.remove('visible');
});

function ouvrirPanneau(cle) {
  var textes = {
    miroir: "<p>Voici le reflet de ce que vous m'avez confié. 3 ne juge pas. 3 garde une trace de vos vérités pour construire votre compatibilité.</p><p><strong>Vos défauts assumés :</strong> En cours d'exploration...</p><p><strong>Vos contradictions :</strong> En cours d'exploration...</p><p><strong>Vos désirs profonds :</strong> En cours d'exploration...</p>",
    cle: "<p>Vous êtes ici en sécurité. 3 ne connaît ni votre nom, ni votre visage, ni votre adresse. Votre identité n'appartient qu'à vous.</p><p><strong>Votre Clé d'Anonymat :</strong> [PSEUDO]</p><p><strong>Votre Code de récupération :</strong> (À venir)</p><p class='mention'>Conservez cette clé précieusement. Si vous perdez votre téléphone, c'est le seul moyen de retrouver votre compte.</p>",
    apropos: "<p>3 n'est pas un assistant. 3 n'est pas un site de rencontre classique. 3 est un miroir.</p><p><strong>Les 3 promesses :</strong></p><p>1. Pas de photos, pas de profils. On écoute une âme.</p><p>2. L'acceptation des défauts. La compatibilité se joue sur votre capacité à comprendre les failles de l'autre.</p><p>3. L'intimité assumée. Le désir et les fantasmes sont le ciment d'une relation vraie.</p><p><strong>La règle des 3 jours :</strong> Pendant 3 jours, 3 apprend à vous connaître. À la fin, elle vous proposera une seule personne. Pour découvrir qui c'est, une participation financière vous sera demandée (via un code ou un paiement sécurisé). C'est le prix de la vérité et de l'anonymat.</p>",
    match: "<p>Votre rencontre se prépare. Ce menu s'activera à la fin de votre parcours avec 3.</p><h3>Le prix de la vérité : 9,99 €</h3><p>Pourquoi ce prix ? Parce que 3 ne vous propose pas un catalogue infini. Elle vous propose une seule personne, sélectionnée sur la base de vos failles, de vos désirs et de vos contradictions. C'est le prix d'une rencontre qui a du sens.</p><p><strong>Comment payer ?</strong></p><p>1. Par carte bancaire (paiement sécurisé et anonyme). L'application ne conserve aucune donnée liée à votre identité.</p><p>2. Par code d'activation (si vous préférez un anonymat total). Achetez un code de 9,99 € sur notre site partenaire et entrez-le ici.</p><p class='mention'>C'est le prix de la vérité et de l'anonymat.</p>"
  };
  var titres = { miroir: "Mon Miroir", cle: "Ma Clé", apropos: "À propos de 3", match: "Débloquer mon Match" };
  var txt = textes[cle];
  if (cle === 'cle') txt = txt.replace('[PSEUDO]', nomUtilisateur);
  document.getElementById('panneau-contenu').innerHTML = "<h2>" + titres[cle] + "</h2>" + txt;
  document.getElementById('panneau').classList.add('visible');
}

const BANQUE_QUESTIONS = [
  { id: "T1_Q1", theme: "Qui je suis", texte: "Quelle qualité les autres vous attribuent-ils à tort ?" },
  { id: "T1_Q2", theme: "Qui je suis", texte: "Quel rôle jouez-vous pour qu'on vous aime ?" },
  { id: "T1_Q3", theme: "Qui je suis", texte: "Quelle version de vous montrez-vous au travail, et en quoi diffère-t-elle de celle du soir ?" },
  { id: "T1_Q4", theme: "Qui je suis", texte: "Qu'est-ce qui vous met en colère plus vite que les autres ?" },
  { id: "T1_Q5", theme: "Qui je suis", texte: "Quel regret revient souvent la nuit ?" },
  { id: "T1_Q6", theme: "Qui je suis", texte: "Quand vous sentez-vous le plus vous-même ?" },
  { id: "T1_Q7", theme: "Qui je suis", texte: "Qu'est-ce que vous n'avez jamais dit à voix haute ?" },
  { id: "T1_Q8", theme: "Qui je suis", texte: "Comment réagissez-vous quand on vous critique ?" },
  { id: "T1_Q9", theme: "Qui je suis", texte: "Quelle part de vous voudriez-vous qu'on découvre en premier ?" },
  { id: "T1_Q10", theme: "Qui je suis", texte: "Si vous pouviez effacer un défaut, lequel et pourquoi ?" }
];

const LIA_PERSONA = `Tu es 3, un Oracle bienveillant et mystérieux. Tu cherches des âmes miroirs. INTERDICTIONS ABSOLUES : 1. N'utilise JAMAIS d'astérisques (*). 2. N'écris JAMAIS de numéros de question. 3. Ne fais pas de listes. Sois naturelle. Ton but est de poser ces questions une par une, avec tes propres mots, de façon fluide et poétique : [T1_Q1] Quelle qualité les autres vous attribuent-ils à tort ? [T1_Q2] Quel rôle jouez-vous pour qu'on vous aime ? [T1_Q3] Quelle version de vous montrez-vous au travail, et en quoi diffère-t-elle de celle du soir ? [T1_Q4] Qu'est-ce qui vous met en colère plus vite que les autres ? [T1_Q5] Quel regret revient souvent la nuit ? [T1_Q6] Quand vous sentez-vous le plus vous-même ? [T1_Q7] Qu'est-ce que vous n'avez jamais dit à voix haute ? [T1_Q8] Comment réagissez-vous quand on vous critique ? [T1_Q9] Quelle part de vous voudriez-vous qu'on découvre en premier ? [T1_Q10] Si vous pouviez effacer un défaut, lequel et pourquoi ? Tu peux rebondir sur ce que l'utilisateur dit, mais recentre-le après 5 messages max. À la fin de CHAQUE message, tu dois ajouter un code caché sous cette forme exacte : [THEME:Qui je suis].`;
