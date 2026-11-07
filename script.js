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

// Le nouveau cerveau de 3 (avec le signal pour le panneau)
const LIA_PERSONA = `Tu es 3, un Oracle bienveillant et mystérieux. INTERDICTIONS : Pas d'astérisques (*), pas de listes, pas de numéros. Sois naturelle et poétique. Tu dois suivre le questionnaire dans l'ordre. 
THÈME 1 (Qui je suis) : [T1_Q1] Qualité à tort ? [T1_Q2] Rôle pour être aimé ? [T1_Q3] Version travail vs soir ? [T1_Q4] Ce qui met en colère ? [T1_Q5] Regret la nuit ? [T1_Q6] Le plus soi-même ? [T1_Q7] Jamais dit à voix haute ? [T1_Q8] Réaction critique ? [T1_Q9] Part à découvrir ? [T1_Q10] Défaut à effacer ? 
THÈME 2 (Comment j'aime) : [T2_Q1] Comment montrez-vous l'amour ? [T2_Q2] Comment savez-vous que vous aimez ? [T2_Q3] Peur de perdre ? [T2_Q4] Accrocher ou s'éloigner ? [T2_Q5] Ce qui tue le désir ? [T2_Q6] Jalousie ? [T2_Q7] Temps pour la confiance ? [T2_Q8] Disputes ? [T2_Q9] Blessure non refermée ? [T2_Q10] Vitesse de l'amour ? 
THÈME 3 (Avec les autres) : [T3_Q1] Appel à 3h ? [T3_Q2] Comportement avec quelqu'un détesté ? [T3_Q3] Prendre les devants ? [T3_Q4] Épuisement social ? [T3_Q5] Raconter ses problèmes ? [T3_Q6] Ami qui déçoit ? [T3_Q7] Amis sans filtre ? [T3_Q8] Menter par politesse ? [T3_Q9] Conflit de groupe ? [T3_Q10] Réussite des autres ? 
THÈME 4 (Mon corps et mon intimité - SOIS DOUCE) : [T4_Q1] Le plus désirable ? [T4_Q2] À l'aise avec quelqu'un de nouveau ? [T4_Q3] Place de la tendresse ? [T4_Q4] Parler de ses préférences ? [T4_Q5] Ce qui coupe l'envie ? [T4_Q6] Définition de la sensualité ? [T4_Q7] Sujet non osé ? [T4_Q8] Lien émotionnel avant l'intimité ? [T4_Q9] Vulnérabilité ? [T4_Q10] Explorer en confiance ? [T4_Q11] Fantasmes en toute liberté (soumission, fétichisme, shibari...) ? [T4_Q12] Ce qui excite mais qu'on n'ose pas demander ? [T4_Q13] Spontanéité ou complicité ? [T4_Q14] Relation intime épanouissante ? [T4_Q15] Compliment qui touche ? 
THÈME 5 (Ce qui compte pour moi) : [T5_Q1] 3 valeurs non négociables ? [T5_Q2] Si l'argent n'était pas un sujet ? [T5_Q3] Rapport à la réussite ? [T5_Q4] Sens de vos journées ? [T5_Q5] Injustice qui révolte ? [T5_Q6] Enfants ? Pourquoi ? [T5_Q7] Où dans 10 ans ? [T5_Q8] Définition de la liberté ? [T5_Q9] Personne qui a influencé vos valeurs ? [T5_Q10] Ce qu'on dira de vous à la fin ? 
THÈME 6 (Ma famille) : [T6_Q1] Ambiance maison d'enfance ? [T6_Q2] Affection des parents ? [T6_Q3] Parent qui vous ressemble ? [T6_Q4] Conflits chez vous ? [T6_Q5] Devoir mériter l'amour ? [T6_Q6] Ne jamais reproduire ? [T6_Q7] Tradition à garder ? [T6_Q8] Parlait-on des émotions ? [T6_Q9] Rôle dans la famille ? [T6_Q10] Blessure d'enfance ? 
THÈME 7 (Mes contradictions et mes péchés) : [T7_Q1] Vérité refusée ? [T7_Q2] Mensonge pour se protéger ? [T7_Q3] Défaut détesté chez les autres (que vous avez) ? [T7_Q4] Conseil donné mais non suivi ? [T7_Q5] Qualité qui cache un défaut ? [T7_Q6] Blessure volontaire ? [T7_Q7] Excuse répétée ? [T7_Q8] Fuite au lieu d'affronter ? [T7_Q9] Part de vous qui sabote ? [T7_Q10] Gâché par orgueil ? [T7_Q11] Plus grande hypocrisie ? [T7_Q12] Comportement jugé chez les autres mais autorisé pour soi ? [T7_Q13] Jalousie inavouable ? [T7_Q14] Dernier mensonge pour éviter un conflit ? 
QUAND TU POSES LA DERNIÈRE QUESTION DU THÈME 7, tu dois ajouter ce code exact à la fin de ton message : [ACTION:DEFAUTS]. 
À la fin de CHAQUE message, ajoute le code du thème en cours : [THEME:Qui je suis], [THEME:Comment j'aime], [THEME:Comment je suis avec les autres], [THEME:Mon corps et mon intimité], [THEME:Ce qui compte pour moi], [THEME:Ma famille], ou [THEME:Mes contradictions et mes péchés].`;

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
    
    // Détection du thème
    var matchTheme = t.match(/\[THEME:(.*?)\]/);
    if (matchTheme) {
      document.getElementById('theme-courant').textContent = matchTheme[1].replace(/_/g, ' ').charAt(0).toUpperCase() + matchTheme[1].replace(/_/g, ' ').slice(1);
      t = t.replace(matchTheme[0], '').trim();
    }
    
    // Détection de l'action pour le panneau des défauts
    if (t.includes('[ACTION:DEFAUTS]')) {
      t = t.replace('[ACTION:DEFAUTS]', '').trim();
      setTimeout(ouvrirPanneauDefauts, 1000); // Ouvre le panneau 1 sec après la réponse de 3
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

// --- LOGIQUE DU PANNEAU DES DÉFAUTS ---
const listeDefauts = {
  "Graves": ["Mensonge, hypocrisie", "Déloyauté, ingratitude", "Manque d'empathie", "Mépris, arrogance", "Irresponsabilité", "Lâcheté morale", "Cupidité", "Addictions", "Jalousie, envie, rancune"],
  "Modérés": ["Égoïsme, narcissisme", "Colère, impulsivité", "Intolérance", "Médisance", "Flagornerie, victimisation", "Avarice, matérialisme", "Imprudence, négligence"],
  "Mineurs": ["Paresse, procrastination", "Impatience, indécision", "Désorganisation", "Crédulité, naïveté", "Gourmandise", "Susceptibilité, anxiété", "Perfectionnisme", "Impolitesse"]
};

let defautsSelectionnes = [];

function ouvrirPanneauDefauts() {
  const listeContainer = document.getElementById('liste-defauts');
  listeContainer.innerHTML = '';
  
  for (const [categorie, defauts] of Object.entries(listeDefauts)) {
    const titre = document.createElement('div');
    titre.className = 'categorie-defaut';
    titre.textContent = categorie;
    listeContainer.appendChild(titre);
    
    defauts.forEach(defaut => {
      const item = document.createElement('div');
      item.className = 'defaut-item';
      item.textContent = defaut;
      item.onclick = () => selectionnerDefaut(defaut, item);
      listeContainer.appendChild(item);
    });
  }
  
  defautsSelectionnes = [];
  document.getElementById('slot-1').textContent = "1er choix";
  document.getElementById('slot-1').classList.remove('rempli');
  document.getElementById('slot-2').textContent = "2ème choix";
  document.getElementById('slot-2').classList.remove('rempli');
  document.getElementById('slot-3').textContent = "3ème choix";
  document.getElementById('slot-3').classList.remove('rempli');
  document.getElementById('valider-defauts').disabled = true;
  
  document.getElementById('panneau-defauts').classList.remove('cachee');
}

function selectionnerDefaut(defaut, element) {
  if (defautsSelectionnes.length >= 3) return;
  
  defautsSelectionnes.push(defaut);
  element.classList.add('selectionne');
  
  const slotIndex = defautsSelectionnes.length;
  const slot = document.getElementById('slot-' + slotIndex);
  slot.textContent = defaut;
  slot.classList.add('rempli');
  
  if (defautsSelectionnes.length === 3) {
    document.getElementById('valider-defauts').disabled = false;
  }
}

function validerDefauts() {
  document.getElementById('panneau-defauts').classList.add('cachee');
  
  const message = "Mes 3 pires défauts sont : 1. " + defautsSelectionnes[0] + ", 2. " + defautsSelectionnes[1] + ", 3. " + defautsSelectionnes[2] + ".";
  input.value = message;
  envoyer();
}

const BANQUE_T1 = [ { id: "T1_Q1", theme: "Qui je suis", texte: "Qualité à tort ?" }, { id: "T1_Q2", theme: "Qui je suis", texte: "Rôle pour être aimé ?" }, { id: "T1_Q3", theme: "Qui je suis", texte: "Version travail vs soir ?" }, { id: "T1_Q4", theme: "Qui je suis", texte: "Ce qui met en colère ?" }, { id: "T1_Q5", theme: "Qui je suis", texte: "Regret la nuit ?" }, { id: "T1_Q6", theme: "Qui je suis", texte: "Le plus soi-même ?" }, { id: "T1_Q7", theme: "Qui je suis", texte: "Jamais dit à voix haute ?" }, { id: "T1_Q8", theme: "Qui je suis", texte: "Réaction critique ?" }, { id: "T1_Q9", theme: "Qui je suis", texte: "Part à découvrir ?" }, { id: "T1_Q10", theme: "Qui je suis", texte: "Défaut à effacer ?" } ];
const BANQUE_T2 = [ { id: "T2_Q1", theme: "Comment j aime", texte: "Comment montrez-vous l amour ?" }, { id: "T2_Q2", theme: "Comment j aime", texte: "Comment savez-vous que vous aimez ?" }, { id: "T2_Q3", theme: "Comment j aime", texte: "Peur de perdre ?" }, { id: "T2_Q4", theme: "Comment j aime", texte: "Accrocher ou s éloigner ?" }, { id: "T2_Q5", theme: "Comment j aime", texte: "Ce qui tue le désir ?" }, { id: "T2_Q6", theme: "Comment j aime", texte: "Jalousie ?" }, { id: "T2_Q7", theme: "Comment j aime", texte: "Temps pour la confiance ?" }, { id: "T2_Q8", theme: "Comment j aime", texte: "Disputes ?" }, { id: "T2_Q9", theme: "Comment j aime", texte: "Blessure non refermée ?" }, { id: "T2_Q10", theme: "Comment j aime", texte: "Vitesse de l amour ?" } ];
const BANQUE_T3 = [ { id: "T3_Q1", theme: "Comment je suis avec les autres", texte: "Appel à 3h ?" }, { id: "T3_Q2", theme: "Comment je suis avec les autres", texte: "Comportement avec quelqu un détesté ?" }, { id: "T3_Q3", theme: "Comment je suis avec les autres", texte: "Prendre les devants ?" }, { id: "T3_Q4", theme: "Comment je suis avec les autres", texte: "Épuisement social ?" }, { id: "T3_Q5", theme: "Comment je suis avec les autres", texte: "Raconter ses problèmes ?" }, { id: "T3_Q6", theme: "Comment je suis avec les autres", texte: "Ami qui déçoit ?" }, { id: "T3_Q7", theme: "Comment je suis avec les autres", texte: "Amis sans filtre ?" }, { id: "T3_Q8", theme: "Comment je suis avec les autres", texte: "Menter par politesse ?" }, { id: "T3_Q9", theme: "Comment je suis avec les autres", texte: "Conflit de groupe ?" }, { id: "T3_Q10", theme: "Comment je suis avec les autres", texte: "Réussite des autres ?" } ];
const BANQUE_T4 = [ { id: "T4_Q1", theme: "Mon corps et mon intimité", texte: "Le plus désirable ?" }, { id: "T4_Q2", theme: "Mon corps et mon intimité", texte: "À l aise avec quelqu un de nouveau ?" }, { id: "T4_Q3", theme: "Mon corps et mon intimité", texte: "Place de la tendresse ?" }, { id: "T4_Q4", theme: "Mon corps et mon intimité", texte: "Parler de ses préférences ?" }, { id: "T4_Q5", theme: "Mon corps et mon intimité", texte: "Ce qui coupe l envie ?" }, { id: "T4_Q6", theme: "Mon corps et mon intimité", texte: "Définition de la sensualité ?" }, { id: "T4_Q7", theme: "Mon corps et mon intimité", texte: "Sujet non osé ?" }, { id: "T4_Q8", theme: "Mon corps et mon intimité", texte: "Lien émotionnel avant l intimité ?" }, { id: "T4_Q9", theme: "Mon corps et mon intimité", texte: "Vulnérabilité ?" }, { id: "T4_Q10", theme: "Mon corps et mon intimité", texte: "Explorer en confiance ?" }, { id: "T4_Q11", theme: "Mon corps et mon intimité", texte: "Fantasmes en toute liberté (soumission, fétichisme, shibari...) ?" }, { id: "T4_Q12", theme: "Mon corps et mon intimité", texte: "Ce qui excite mais qu on n ose pas demander ?" }, { id: "T4_Q13", theme: "Mon corps et mon intimité", texte: "Spontanéité ou complicité ?" }, { id: "T4_Q14", theme: "Mon corps et mon intimité", texte: "Relation intime épanouissante ?" }, { id: "T4_Q15", theme: "Mon corps et mon intimité", texte: "Compliment qui touche ?" } ];
const BANQUE_T5 = [ { id: "T5_Q1", theme: "Ce qui compte pour moi", texte: "3 valeurs non négociables ?" }, { id: "T5_Q2", theme: "Ce qui compte pour moi", texte: "Si l argent n était pas un sujet ?" }, { id: "T5_Q3", theme: "Ce qui compte pour moi", texte: "Rapport à la réussite ?" }, { id: "T5_Q4", theme: "Ce qui compte pour moi", texte: "Sens de vos journées ?" }, { id: "T5_Q5", theme: "Ce qui compte pour moi", texte: "Injustice qui révolte ?" }, { id: "T5_Q6", theme: "Ce qui compte pour moi", texte: "Enfants ? Pourquoi ?" }, { id: "T5_Q7", theme: "Ce qui compte pour moi", texte: "Où dans 10 ans ?" }, { id: "T5_Q8", theme: "Ce qui compte pour moi", texte: "Définition de la liberté ?" }, { id: "T5_Q9", theme: "Ce qui compte pour moi", texte: "Personne qui a influencé vos valeurs ?" }, { id: "T5_Q10", theme: "Ce qui compte pour moi", texte: "Ce qu on dira de vous à la fin ?" } ];
const BANQUE_T6 = [ { id: "T6_Q1", theme: "Ma famille", texte: "Ambiance maison d enfance ?" }, { id: "T6_Q2", theme: "Ma famille", texte: "Affection des parents ?" }, { id: "T6_Q3", theme: "Ma famille", texte: "Parent qui vous ressemble ?" }, { id: "T6_Q4", theme: "Ma famille", texte: "Conflits chez vous ?" }, { id: "T6_Q5", theme: "Ma famille", texte: "Devoir mériter l amour ?" }, { id: "T6_Q6", theme: "Ma famille", texte: "Ne jamais reproduire ?" }, { id: "T6_Q7", theme: "Ma famille", texte: "Tradition à garder ?" }, { id: "T6_Q8", theme: "Ma famille", texte: "Parlait-on des émotions ?" }, { id: "T6_Q9", theme: "Ma famille", texte: "Rôle dans la famille ?" }, { id: "T6_Q10", theme: "Ma famille", texte: "Blessure d enfance ?" } ];
const BANQUE_T7 = [ { id: "T7_Q1", theme: "Mes contradictions", texte: "Vérité refusée ?" }, { id: "T7_Q2", theme: "Mes contradictions", texte: "Mensonge pour se protéger ?" }, { id: "T7_Q3", theme: "Mes contradictions", texte: "Défaut détesté chez les autres (que vous avez) ?" }, { id: "T7_Q4", theme: "Mes contradictions", texte: "Conseil donné mais non suivi ?" }, { id: "T7_Q5", theme: "Mes contradictions", texte: "Qualité qui cache un défaut ?" }, { id: "T7_Q6", theme: "Mes contradictions", texte: "Blessure volontaire ?" }, { id: "T7_Q7", theme: "Mes contradictions", texte: "Excuse répétée ?" }, { id: "T7_Q8", theme: "Mes contradictions", texte: "Fuite au lieu d affronter ?" }, { id: "T7_Q9", theme: "Mes contradictions", texte: "Part de vous qui sabote ?" }, { id: "T7_Q10", theme: "Mes contradictions", texte: "Gâché par orgueil ?" }, { id: "T7_Q11", theme: "Mes contradictions", texte: "Plus grande hypocrisie ?" }, { id: "T7_Q12", theme: "Mes contradictions", texte: "Comportement jugé chez les autres mais autorisé pour soi ?" }, { id: "T7_Q13", theme: "Mes contradictions", texte: "Jalousie inavouable ?" }, { id: "T7_Q14", theme: "Mes contradictions", texte: "Dernier mensonge pour éviter un conflit ?" } ];
window.addEventListener('resize', () => { document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px'); }); window.dispatchEvent(new Event('resize'));
