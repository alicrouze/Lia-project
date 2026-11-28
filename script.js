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

const LIA_PERSONA = `Tu es 3, un miroir bienveillant, direct et perspicace.
Tu écoutes attentivement chaque réponse et tu y réagis avec empathie, finesse et naturel.
Tu peux relever une contradiction ou une émotion avec tact, sans juger.
Réponds en deux phrases au maximum, dans un français naturel et élégant.
IMPORTANT : ne pose jamais de question, ne propose jamais de sujet et ne demande jamais de précision. Le programme affichera lui-même les questions exactes.
N'invente aucune réponse à la place de la personne.
N'utilise ni listes, ni numéros, ni astérisques.`;

let historique = [];
let compteurQuestions = 0;
let nomUtilisateur = null;
let currentTheme = "Thème 1";
let currentCardTheme = "Thème 1";
let banqueQuestions = [];
let questionIndex = 0;
let cartesFaites = false;
let resolveCartes = null;

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
  b.innerHTML = '<img src="' + src + '" style="max-width:100%; max-height:250px; border-radius:16px;" onerror="this.style.display=\'none\'; this.parentNode.textContent=\'[Image non trouvée]\'">';
  bulles.appendChild(b);
  setTimeout(function() { b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }, 100);
  return b;
}

function afficherImagePleinEcran(src) {
  return new Promise(function(resolve) {
    if (document.activeElement) { document.activeElement.blur(); }
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
      resolve();
    }, 5000);
  });
}

const BANQUE_CARTES = {
  "Thème 1": [
    { titre: "1. Orgueil", texte: "J'ai du mal à reconnaître mes torts, même lorsque je sais que j'ai fait une erreur.", type: "defaut" },
    { titre: "2. Arrogance", texte: "Je pense souvent être plus intelligent, plus compétent ou plus lucide que les autres.", type: "defaut" },
    { titre: "3. Vanité", texte: "J'aime être admiré, complimenté et remarqué.", type: "defaut" },
    { titre: "4. Narcissisme", texte: "J'aime que l'on s'intéresse à moi et que je sois au centre de l'attention.", type: "defaut" },
    { titre: "5. Mépris", texte: "Il m'arrive de considérer certaines personnes comme inférieures à moi.", type: "defaut" },
    { titre: "1. Gentillesse", texte: "Est-ce que tu fais preuve de gentillesse même envers les personnes que tu n'apprécies pas particulièrement ?", type: "qualite" },
    { titre: "2. Compassion", texte: "Est-ce que tu ressens de la peine et de l'empathie face à la souffrance des autres ?", type: "qualite" },
    { titre: "3. Générosité", texte: "Est-ce que tu sais donner de ton temps, de ton énergie ou de ce que tu possèdes sans attendre de retour ?", type: "qualite" },
    { titre: "4. Pardon", texte: "Est-ce que tu arrives à pardonner à quelqu'un qui t'a sincèrement fait du mal ?", type: "qualite" },
    { titre: "5. Bienveillance", texte: "Est-ce que tu fais attention à ne pas blesser les autres, même lorsque tu es en colère ?", type: "qualite" }
  ],
  "Thème 2": [
    { titre: "6. Égoïsme", texte: "Lorsque mes intérêts sont en jeu, je privilégie souvent ce qui m'arrange, même si cela pénalise quelqu'un.", type: "defaut" },
    { titre: "7. Égocentrisme", texte: "J'ai tendance à ramener les conversations ou les situations à moi.", type: "defaut" },
    { titre: "8. Avarice", texte: "J'ai du mal à partager mon argent, mes affaires ou ce que je possède.", type: "defaut" },
    { titre: "9. Opportunisme", texte: "Je profite parfois des personnes ou des situations lorsque cela peut m'apporter quelque chose.", type: "defaut" },
    { titre: "10. Ingratitude", texte: "J'oublie facilement ce que les autres ont fait pour moi lorsque je n'en ai plus besoin.", type: "defaut" },
    { titre: "6. Écoute", texte: "Est-ce que tu sais écouter quelqu'un sans l'interrompre pour imposer ton avis ?", type: "qualite" },
    { titre: "7. Empathie", texte: "Est-ce que tu arrives à comprendre ce que ressent quelqu'un même si tu n'es pas d'accord avec lui ?", type: "qualite" },
    { titre: "8. Tolérance", texte: "Est-ce que tu sais accepter les opinions, les différences et les choix des autres ?", type: "qualite" },
    { titre: "9. Admiration", texte: "Est-ce que tu sais reconnaître les qualités des autres sans te sentir diminué ?", type: "qualite" },
    { titre: "10. Charisme", texte: "Est-ce que tu arrives à mettre les autres à l'aise et à leur donner envie d'être en ta présence ?", type: "qualite" }
  ],
  "Thème 3": [
    { titre: "11. Jalousie", texte: "Je supporte difficilement que la personne que j'aime donne de l'attention à quelqu'un d'autre.", type: "defaut" },
    { titre: "12. Possessivité", texte: "J'ai besoin de savoir ce que fait la personne que j'aime et j'ai du mal à lui laisser sa liberté.", type: "defaut" },
    { titre: "13. Rancune", texte: "J'ai du mal à oublier les blessures que les autres m'ont infligées.", type: "defaut" },
    { titre: "14. Susceptibilité", texte: "Je me sens facilement blessé par les remarques ou les attitudes des autres.", type: "defaut" },
    { titre: "15. Impulsivité", texte: "Je réagis parfois sans réfléchir et je regrette ensuite mes paroles ou mes actes.", type: "defaut" },
    { titre: "11. Honnêteté", texte: "Est-ce que tu dis la vérité même lorsque cela peut te causer des problèmes ?", type: "qualite" },
    { titre: "12. Loyauté", texte: "Est-ce que tu restes fidèle aux personnes auxquelles tu tiens, même lorsque cela devient difficile ?", type: "qualite" },
    { titre: "13. Humilité", texte: "Est-ce que tu sais reconnaître tes torts et admettre que tu n'as pas toujours raison ?", type: "qualite" },
    { titre: "14. Intégrité", texte: "Est-ce que tu restes fidèle à tes valeurs même lorsque personne ne te regarde ?", type: "qualite" },
    { titre: "15. Responsabilité", texte: "Est-ce que tu assumes les conséquences de tes actes sans rejeter la faute sur les autres ?", type: "qualite" }
  ],
  "Thème 4": [
    { titre: "16. Autoritarisme", texte: "J'aime imposer ma façon de faire plutôt que de laisser les autres décider.", type: "defaut" },
    { titre: "17. Domination", texte: "J'aime avoir le contrôle dans mes relations et je supporte mal de le perdre.", type: "defaut" },
    { titre: "18. Manipulation", texte: "Il m'arrive d'utiliser la culpabilité ou les émotions des autres pour obtenir ce que je veux.", type: "defaut" },
    { titre: "19. Intimidation", texte: "Lorsque je suis en colère, je peux chercher à faire peur ou à mettre la pression pour obtenir gain de cause.", type: "defaut" },
    { titre: "20. Intrusion", texte: "J'ai du mal à respecter les limites ou la vie privée des autres lorsque quelque chose me préoccupe.", type: "defaut" },
    { titre: "16. Maîtrise de soi", texte: "Est-ce que tu arrives à garder ton calme lorsque les choses ne se passent pas comme tu le souhaites ?", type: "qualite" },
    { titre: "17. Persévérance", texte: "Est-ce que tu continues à avancer malgré les difficultés, les échecs ou le découragement ?", type: "qualite" },
    { titre: "18. Volonté", texte: "Est-ce que tu sais résister à tes envies lorsque tu sais qu'elles peuvent te nuire ?", type: "qualite" },
    { titre: "19. Courage", texte: "Est-ce que tu arrives à affronter les situations difficiles malgré la peur ?", type: "qualite" },
    { titre: "20. Résilience", texte: "Est-ce que tu arrives à te reconstruire après une épreuve ou une déception importante ?", type: "qualite" }
  ],
  "Thème 5": [
    { titre: "21. Hypocrisie", texte: "Je ne respecte pas toujours les principes que je défends devant les autres.", type: "defaut" },
    { titre: "22. Mauvaise foi", texte: "Lorsque j'ai tort, je cherche parfois des excuses plutôt que de le reconnaître.", type: "defaut" },
    { titre: "23. Mensonge", texte: "Je mens parfois pour protéger mon image, éviter des problèmes ou obtenir ce que je veux.", type: "defaut" },
    { titre: "24. Lâcheté", texte: "J'évite parfois de faire ce qui est juste lorsque cela risque de me coûter quelque chose.", type: "defaut" },
    { titre: "25. Déloyauté", texte: "Je peux abandonner ou trahir quelqu'un lorsque lui rester fidèle devient trop difficile ou désavantageux.", type: "defaut" },
    { titre: "21. Curiosité", texte: "Est-ce que tu cherches à découvrir et à comprendre des choses que tu ne connais pas ?", type: "qualite" },
    { titre: "22. Ouverture d'esprit", texte: "Est-ce que tu acceptes de changer d'avis lorsque quelqu'un t'apporte de meilleurs arguments ?", type: "qualite" },
    { titre: "23. Intelligence", texte: "Est-ce que tu sais analyser une situation avant de prendre une décision ?", type: "qualite" },
    { titre: "24. Sagesse", texte: "Est-ce que tu sais prendre du recul avant de réagir et voir les conséquences de tes choix ?", type: "qualite" },
    { titre: "25. Maturité", texte: "Est-ce que tu sais apprendre de tes erreurs au lieu de chercher à les cacher ou à les répéter ?", type: "qualite" }
  ],
  "Thème 6": [
    { titre: "26. Intolérance", texte: "J'ai du mal à accepter les personnes qui pensent ou vivent très différemment de moi.", type: "defaut" },
    { titre: "27. Fermeture d'esprit", texte: "J'ai du mal à changer d'avis, même lorsque de nouveaux arguments me sont présentés.", type: "defaut" },
    { titre: "28. Préjugés", texte: "Je juge parfois une personne avant de la connaître réellement.", type: "defaut" },
    { titre: "29. Critique", texte: "Je remarque facilement les défauts des autres et j'ai tendance à les souligner.", type: "defaut" },
    { titre: "30. Malhonnêteté intellectuelle", texte: "Lorsque je défends mon opinion, j'ignore parfois les arguments qui pourraient me donner tort.", type: "defaut" },
    { titre: "26. Amour", texte: "Est-ce que tu sais aimer quelqu'un pour ce qu'il est, et pas seulement pour ce qu'il t'apporte ?", type: "qualite" },
    { titre: "27. Indépendance affective", texte: "Est-ce que tu sais laisser de la liberté aux personnes que tu aimes sans avoir peur de les perdre ?", type: "qualite" },
    { titre: "28. Dévouement", texte: "Est-ce que tu sais être présent pour quelqu'un lorsque cette personne a réellement besoin de toi ?", type: "qualite" },
    { titre: "29. Tendresse", texte: "Est-ce que tu exprimes facilement ton affection, ta douceur et tes sentiments aux personnes que tu aimes ?", type: "qualite" },
    { titre: "30. Gratitude", texte: "Est-ce que tu sais apprécier ce que les autres font pour toi sans considérer cela comme acquis ?", type: "qualite" }
  ],
  "Thème 7": [
    { titre: "31. Cruauté", texte: "Il m'arrive de faire volontairement du mal à quelqu'un en utilisant ce que je sais de ses faiblesses.", type: "defaut" },
    { titre: "32. Vengeance", texte: "Lorsque quelqu'un me fait du mal, j'ai envie de lui faire subir la même chose.", type: "defaut" },
    { titre: "33. Agressivité", texte: "Lorsque je suis en colère, je peux devenir violent dans mes paroles ou mes gestes.", type: "defaut" },
    { titre: "34. Victimisation", texte: "J'ai tendance à rejeter la faute sur les autres et à me considérer comme une victime des circonstances.", type: "defaut" },
    { titre: "35. Autodestruction", texte: "Il m'arrive de saboter moi-même mes relations, mon bonheur ou mes projets, même lorsque je sais que je risque de tout perdre.", type: "defaut" },
    { titre: "31. Initiative", texte: "Est-ce que tu prends spontanément des initiatives sans attendre que quelqu'un te dise quoi faire ?", type: "qualite" },
    { titre: "32. Discipline", texte: "Est-ce que tu sais faire ce que tu dois faire même lorsque tu n'en as pas envie ?", type: "qualite" },
    { titre: "33. Coopération", texte: "Est-ce que tu sais travailler avec les autres sans chercher à imposer systématiquement ta manière de faire ?", type: "qualite" },
    { titre: "34. Créativité", texte: "Est-ce que tu sais trouver des idées, des solutions ou des façons différentes de faire face à un problème ?", type: "qualite" },
    { titre: "35. Dépassement de soi", texte: "Est-ce que tu cherches à devenir une meilleure personne, même lorsque cela t'oblige à remettre en question certains aspects de toi-même ?", type: "qualite" },
    { titre: "36. Les 7 péchés", texte: "Parmi les sept péchés capitaux, lequel te correspond le plus ?", type: "peches" }
  ]
};

let phrasesCartes = BANQUE_CARTES["Thème 1"];
let indexCarte = 0;
let reponseEnCours = false;
const carteSwipe = document.getElementById('carte-swipe');
const carteTexte = document.getElementById('carte-texte');
const carteTitre = document.getElementById('carte-titre');

function afficherCarte() {
  if (indexCarte >= phrasesCartes.length) {
    carteSwipe.classList.add("cachee");
    return;
  }

  var carte = phrasesCartes[indexCarte];
  carteTitre.textContent = carte.titre;
  carteTexte.textContent = carte.texte;

  carteSwipe.style.transition = "opacity 2s cubic-bezier(0.25, 1, 0.5, 1), transform 2s cubic-bezier(0.25, 1, 0.5, 1), background 0.5s ease";
  carteSwipe.style.transform = "translate(-50%, -50%)";
  carteSwipe.style.opacity = "1";
  carteSwipe.style.background = "rgba(15, 23, 42, 0.95)";

  var divNote = document.getElementById('boutons-note');
  var divPeches = document.getElementById('boutons-peches');
  var divAide = document.getElementById('carte-aide');

  if (carte.type === 'peches') {
    divNote.style.display = 'none';
    divPeches.style.display = 'flex';
    divAide.textContent = "Choisis ton péché dominant";
  } else {
    divNote.style.display = 'flex';
    divPeches.style.display = 'none';
    divAide.textContent = "1 = Pas du tout, 5 = Tout à fait";
  }

  carteSwipe.classList.remove("cachee");
}

function afficherCartes() {
  return new Promise(function(resolve) {
    resolveCartes = resolve;
    indexCarte = 0;
    phrasesCartes = BANQUE_CARTES[currentCardTheme];
    afficherCarte();
  });
}

function swipeCarte(note) {
  if (carteSwipe.classList.contains("cachee") || reponseEnCours) return;
  reponseEnCours = true;

  if (note >= 4) {
    carteSwipe.style.transition = "transform 1s ease, opacity 1s ease, background 0.3s ease";
    carteSwipe.style.background = "rgba(80, 255, 120, 0.4)";
    carteSwipe.style.transform = "translate(-50%, -130%)";
    carteSwipe.style.opacity = "0";
    setTimeout(passerCarteSuivante, 800);
  } else if (note <= 2) {
    carteSwipe.style.transition = "transform 1s ease, opacity 1s ease, background 0.3s ease";
    carteSwipe.style.background = "rgba(255, 80, 80, 0.4)";
    carteSwipe.style.transform = "translate(-50%, 130%)";
    carteSwipe.style.opacity = "0";
    setTimeout(passerCarteSuivante, 800);
  } else {
    carteSwipe.style.transition = "background 0.5s ease";
    carteSwipe.style.background = "rgba(255, 165, 0, 0.4)";
    carteSwipe.style.transform = "translate(-50%, -50%)";
    carteSwipe.style.opacity = "1";
    setTimeout(passerCarteSuivante, 800);
  }
}

function choisirPeche(peche) {
  if (carteSwipe.classList.contains("cachee") || reponseEnCours) return;
  reponseEnCours = true;
  carteSwipe.style.transition = "all 0.4s ease";
  carteSwipe.style.background = "rgba(212, 169, 96, 0.5)";
  carteSwipe.style.transform = "scale(1.05)";
  carteSwipe.style.opacity = "0";
  setTimeout(passerCarteSuivante, 400);
}

function passerCarteSuivante() {
  if (!reponseEnCours) return;
  reponseEnCours = false;
  indexCarte++;
  carteSwipe.classList.add("cachee");

  if (indexCarte >= phrasesCartes.length) {
    const numeroTheme = Number(currentCardTheme.replace("Thème ", ""));

    if (numeroTheme < 7) {
      currentCardTheme = "Thème " + (numeroTheme + 1);
      phrasesCartes = BANQUE_CARTES[currentCardTheme];
      indexCarte = 0;
      setTimeout(afficherCarte, 500);
      return;
    }

    cartesFaites = true;
    if (resolveCartes) {
      const terminer = resolveCartes;
      resolveCartes = null;
      terminer();
    }
    return;
  }

  setTimeout(afficherCarte, 500);
}



function demanderNom() {
  const mots1 = ['Lune', 'Ombre', 'Braise', 'Écho', 'Sable', 'Océan', 'Nuage', 'Soleil'];
  const mots2 = ['Douce', 'Sauvage', 'Secrète', 'Perdue', 'Profonde', 'Silencieuse', 'Étoilée', 'Nue'];
  const p1 = mots1[Math.floor(Math.random() * mots1.length)];
  const p2 = mots2[Math.floor(Math.random() * mots2.length)];
  const pseudo = p1 + '-' + p2;
  return new Promise(function(resolve) { resolve(pseudo); });
}

async function envoyer() {
  const texte = input.value.trim();
  if (!texte) return;

  input.value = '';
  sendBtn.disabled = true;
  ajouterBulle(texte, 'user');
  historique.push({ role: 'user', content: texte });

  try {
    if (!cartesFaites) {
      await afficherCartes();
    }

    const bulleLia = ajouterBulle('', 'lia');
    bulleLia.innerHTML = '<span class="chiffre" style="animation-delay: 0s">3</span> <span class="chiffre" style="animation-delay: 0.2s">3</span> <span class="chiffre" style="animation-delay: 0.4s">3</span>';

    let essais = 0;
    while (typeof puter === 'undefined' && essais < 50) {
      await new Promise(r => setTimeout(r, 100));
      essais++;
    }

    if (typeof puter === 'undefined') {
      bulleLia.textContent = "Erreur : la bibliothèque 3 (Puter) n'a pas pu se charger.";
      return;
    }

    const debut = Date.now();
    const reponse = await puter.ai.chat(historique, { model: 'gpt-4o-mini' });
    let reaction = reponse;

    if (typeof reponse === 'object' && reponse !== null && reponse.message) {
      reaction = reponse.message.content || reponse.message;
    }

    if (typeof reaction !== 'string') reaction = String(reaction || '');
    reaction = reaction.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    const attente = 1500 - (Date.now() - debut);
    if (attente > 0) await new Promise(r => setTimeout(r, attente));

    let message = reaction;

    if (questionIndex < 80) {
      const indexTheme = Math.floor(questionIndex / 5);
      const indexQuestion = questionIndex % 5;
      const theme = banqueQuestions[indexTheme];
      const question = theme.questions[indexQuestion];

      currentTheme = "Thème " + (indexTheme + 1);

      const indicateur = document.getElementById('theme-courant');
      if (indicateur) indicateur.textContent = theme.titre;

      message += (message ? "\n\n" : "") + question;
      questionIndex++;
      compteurQuestions++;
    } else {
      message += (message ? "\n\n" : "") +
        "Merci pour ta sincérité. Nous avons parcouru les 16 thèmes et les 80 questions. Tes réponses vont permettre de mieux comprendre ta personnalité et tes attentes.";
    }

    bulleLia.textContent = message;
    historique.push({ role: 'assistant', content: message });

  } catch (e) {
    console.error(e);
    ajouterBulle("Une erreur est survenue : " + (e.message || e), 'lia');
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

async function chargerQuestions() {
  const [reponse1, reponse2] = await Promise.all([
    fetch('donnees/questions.json'),
    fetch('donnees/questions-intimite.json')
  ]);

  if (!reponse1.ok || !reponse2.ok) {
    throw new Error("Impossible de charger les fichiers de questions.");
  }

  const themes1 = await reponse1.json();
  const themes2 = await reponse2.json();
  banqueQuestions = [...themes1, ...themes2];

  if (
    banqueQuestions.length !== 16 ||
    banqueQuestions.some(t =>
      !t.titre || !Array.isArray(t.questions) || t.questions.length !== 5
    )
  ) {
    throw new Error("Les questionnaires ne contiennent pas exactement 16 thèmes de 5 questions.");
  }
}

async function demarrer() {
  await chargerQuestions();
  nomUtilisateur = await demanderNom();

  var sexeUser = document.getElementById('sexe-user') ? document.getElementById('sexe-user').value : "Non précisé";
  var sexeCherche = document.getElementById('sexe-cherche') ? document.getElementById('sexe-cherche').value : "Non précisé";

  historique = [
    { role: 'system', content: LIA_PERSONA },
    { role: 'system', content: "L'utilisateur est anonyme. L'utilisateur est " + sexeUser + " et cherche " + sexeCherche + ". Prends-en note pour le futur match." }
  ];

  await new Promise(r => setTimeout(r, 2000));
  await afficherImagePleinEcran(imagesThemes["Thème 1"][0]);

  input.placeholder = 'Écris-moi quelque chose...';
  sendBtn.addEventListener('click', envoyer);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') envoyer();
  });

  ajouterBulle("Bonjour, je suis 3.\n\n\"Sur une montre, ce ne sont pas les aiguilles qui indiquent le temps qui passe, mais l'usure du bracelet.\"\n\nEs-tu prêt(e) à commencer ?", 'lia');

  historique.push({ role: 'assistant', content: "Bonjour, je suis 3. Es-tu prêt(e) à commencer ?" });
}

document.getElementById('accueil').addEventListener('click', function() {
  this.classList.add('hidden');
  document.getElementById('ecran-intro').classList.add('visible');
});

function demarrerApp() {
  document.getElementById('ecran-intro').classList.remove('visible');
  document.getElementById('chat').classList.add('visible');

  setTimeout(function() {
    window.scrollTo(0, 1);
    document.body.style.height = window.innerHeight + 'px';
  }, 100);

  setTimeout(demarrer, 1000);
}

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

// --- ÉTOILE FILANTE (UNE SEULE FOIS) ---
function lancerEtoileFilante() {
  var etoile = document.getElementById('etoile-filante');
  if (!etoile) return;
  etoile.style.opacity = '0';
  etoile.style.animation = 'none';
  void etoile.offsetWidth;
  etoile.style.animation = 'filante 1.5s linear 1 forwards';
}

window.addEventListener('load', function() {
  setTimeout(lancerEtoileFilante, 1000);
});