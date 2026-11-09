if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', function() {
    window.scrollTo(0, 0);
    document.body.style.height = window.visualViewport.height + 'px';
  });
}
window.addEventListener('resize', function() { window.scrollTo(0, 0); });

const bulles = document.getElementById('bulles');
const imagesThemes = {
  "Thème 1": ["images/image_qui_je_suis.jpg", "images/image_qui_je_suis_2.jpg", "images/image_qui_je_suis3.jpg"],
  "Thème 2": ["images/image_comment_j_aime_1.jpg", "images/image_comment_j_aime_2.jpg", "images/image_comment_j_aime_3.jpg"],
  "Thème 3": ["images/image_avec_les_autres_1.jpg", "images/image_avec_les_autres_2.jpg", "images/image_avec_les_autres_3.jpg"],
  "Thème 4": ["images/image_intimite_1.jpg", "images/image_intimite_2.jpg", "images/image_intimite_3.jpg"],
  "Thème 5": ["images/image_valeurs_1.jpg", "images/image_valeurs_2.jpg", "images/image_valeurs_3.jpg"],
  "Thème 6": ["images/image_famille_1.jpg", "images/image_famille_2.jpg", "images/image_famille_3.jpg"],
  "Thème 7": ["images/image_contradictions_1.jpg", "images/image_contradictions_2.jpg", "images/image_contradictions_3.jpg"]
};
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

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
let compteurQuestions = 0;
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

const BANQUE_CARTES = {
  "Thème 1": [
    { texte: "Je prefere avoir raison plutot que d etre heureux.", type: "defaut" },
    { texte: "Je montre une version de moi qui n est pas totalement vraie.", type: "defaut" },
    { texte: "J ai peur du jugement des autres.", type: "defaut" },
    { texte: "Je fuis quand on s approche trop de moi.", type: "defaut" },
    { texte: "Je remets a demain ce qui pourrait me faire avancer aujourd hui.", type: "defaut" }
  ],
  "Thème 2": [
    { texte: "Je deviens possessif(ve) quand j ai peur de perdre l autre.", type: "defaut" },
    { texte: "Je fuis quand on s approche trop de moi.", type: "defaut" },
    { texte: "Je peux etre jaloux(se) maladif(ve).", type: "defaut" },
    { texte: "Je suis incapable de rester seul(e) longtemps.", type: "defaut" },
    { texte: "Je prefere etre seul(e) plutot que mal accompagne(e).", type: "defaut" }
  ],
  "Thème 3": [
    { texte: "J ai du mal a dire non, meme quand je devrais.", type: "defaut" },
    { texte: "Je change de personnalite selon les personnes avec qui je suis.", type: "defaut" },
    { texte: "Je me sens souvent seul(e), meme quand je suis entoure(e).", type: "defaut" },
    { texte: "Je me victimise pour attirer l attention.", type: "defaut" },
    { texte: "J ai du mal a etre heureux(se) quand quelqu un reussit mieux que moi.", type: "defaut" }
  ],
  "Thème 4": [
    { texte: "J ai besoin d etre rassure(e) avant l intimite.", type: "defaut" },
    { texte: "J ai envie d etre domine(e), mais je n ose pas le dire.", type: "defaut" },
    { texte: "J ai peur que mon corps ne plaise pas.", type: "defaut" },
    { texte: "J ai des fantasmes que je n ai jamais avoues a personne.", type: "defaut" },
    { texte: "Le sexe est pour moi un besoin vital, pas un bonus.", type: "defaut" }
  ],
  "Thème 5": [
    { texte: "Je sacrifie tout pour ma reussite professionnelle.", type: "defaut" },
    { texte: "L argent est plus important que l amour pour vivre.", type: "defaut" },
    { texte: "Je n ai pas de reve precis, je vis au jour le jour.", type: "defaut" },
    { texte: "Je veux des enfants, c est non negociable.", type: "defaut" },
    { texte: "Je prefere la securite a l aventure.", type: "defaut" }
  ],
  "Thème 6": [
    { texte: "J ai peur de repeter les erreurs de mes parents.", type: "defaut" },
    { texte: "J ai une rancune tenace envers un membre de ma famille.", type: "defaut" },
    { texte: "Je coupe facilement les ponts avec les gens qui me blessent.", type: "defaut" },
    { texte: "Ma famille passe avant tout, meme si elle est toxique.", type: "defaut" },
    { texte: "Je me sens coupable de ne pas etre assez present(e) pour eux.", type: "defaut" }
  ],
  "Thème 7": [
    { texte: "Je critique les autres pour des defauts que j ai moi-meme.", type: "defaut" },
    { texte: "Je suis obsede(e) par le regard des autres.", type: "defaut" },
    { texte: "Je remets tout au lendemain.", type: "defaut" },
    { texte: "Je peux etre cruel(le) avec les gens quand je suis blesse(e).", type: "defaut" },
    { texte: "Je ne suis pas toujours honnete sur mes intentions.", type: "defaut" }
  ]
};

let phrasesCartes = BANQUE_CARTES["Thème 1"];
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
    var matchTheme = t.match(/\[THEME:(.*?)\]/);
    if (matchTheme) {
      document.getElementById('theme-courant').textContent = matchTheme[1].replace(/_/g, ' ').charAt(0).toUpperCase() + matchTheme[1].replace(/_/g, ' ').slice(1);
      t = t.replace(matchTheme[0], '').trim();
      var themeActuel = matchTheme[1];
      if (BANQUE_CARTES[themeActuel]) {
        phrasesCartes = BANQUE_CARTES[themeActuel];
        indexCarte = 0;
      }
    }
    if (t.includes('[ACTION:DEFAUTS]')) {
      t = t.replace('[ACTION:DEFAUTS]', '').trim();
      setTimeout(ouvrirPanneauDefauts, 1000);
    }
    bulleLia.textContent = t;
    historique.push({ role: 'assistant', content: t });

    compteurQuestions++;
    if (compteurQuestions % 3 === 0) {
      var themeActuel = document.getElementById('theme-courant').textContent;
      var images = imagesThemes[themeActuel];
      if (images) {
        var imgIndex = Math.floor(compteurQuestions / 3) - 1;
        if (imgIndex < images.length) {
          setTimeout(function() { afficherImagePleinEcran(images[imgIndex]); }, 2000);
        }
      }
    }
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
  afficherImagePleinEcran(imagesThemes["Thème 1"][0]);
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
