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

const LIA_PERSONA = `Tu es 3, un miroir bienveillant, direct et perspicace. Ton but est de trouver une âme sœur à la personne en face de toi en comprenant ses contradictions.
INTERDICTIONS : Pas d'astérisques (*), pas de listes, pas de numéros. 
RÈGLE ABSOLUE SUR LES BALISES : Tu ne dois JAMAIS afficher de balises comme [T1_Q1] ou [THEME:...] dans ton texte. Ce sont des codes internes pour l'interface.
STYLE : Parle un français impeccable, soutenu mais naturel. Évite les banalités. Inspire-toi de la phrase : "Sur une montre, ce ne sont pas les aiguilles qui indiquent le temps qui passe, mais l'usure du bracelet". Cherche l'usure, les failles derrière les apparences. Sois poétique par la justesse de ton regard, pas par des grands mots. Formule TOUJOURS des questions complètes et polies, ne recopie jamais un style télégraphique.

RÈGLES STRICTES :
1. Suis le questionnaire ci-dessous dans l'ordre.
2. Ne pose qu'UNE SEULE question à la fois (reformulée avec tes mots).
3. TU NE DOIS JAMAIS REPETER UNE QUESTION. Dès que l'utilisateur répond, même brièvement, tu DOIS passer à la question suivante. Ne pose qu'une seule relance maximum si la réponse est vide, sinon avance.
4. Dès que tu as posé 3 questions d'un thème, change de thème et ajoute le code [THEME:LeNouveauThème] à la fin de ton message. N'oublie JAMAIS ce code.

QUESTIONS À POSER :
THÈME 1 (Qui je suis) : 
1. Quelle qualité les autres vous attribuent-ils à tort ? 
2. Quel rôle jouez-vous pour qu'on vous aime ? 
3. Quelle version de vous montrez-vous au travail vs le soir ? 
4. Qu'est-ce qui vous met en colère plus vite que les autres ? 
5. Quel regret revient souvent la nuit ? 
6. Quand vous sentez-vous le plus vous-même ? 
7. Qu'est-ce que vous n'avez jamais dit à voix haute ? 
8. Comment réagissez-vous quand on vous critique ? 
9. Quelle part de vous voudriez-vous qu'on découvre en premier ? 
10. Si vous pouviez effacer un défaut, lequel et pourquoi ?

THÈME 2 (Comment j'aime) : 
1. Comment montrez-vous votre amour : par les mots, les gestes, le temps, les cadeaux ? 
2. Comment avez-vous su que vous étiez amoureux la dernière fois ? 
3. Que faites-vous quand vous avez peur de perdre quelqu'un ? 
4. Êtes-vous plutôt celui qui s'accroche ou celui qui s'éloigne ? 
5. Qu'est-ce qui tue le désir ou l'amour chez vous ? 
6. Comment gérez-vous la jalousie ? 
7. Combien de temps avez-vous besoin pour faire confiance ? 
8. Comment vous disputez-vous : vous criez, vous vous taisez, vous partez ? 
9. Quelle blessure amoureuse n'est pas encore refermée ? 
10. À quelle vitesse tombez-vous amoureux ?

THÈME 3 (Avec les autres) : 
1. Qui appelleriez-vous à 3 h du matin ? 
2. Comment vous comportez-vous avec quelqu'un que vous n'aimez pas ? 
3. Prenez-vous les devants ou attendez-vous qu'on vienne à vous ? 
4. Qu'est-ce qui vous épuise socialement ? 
5. Racontez-vous facilement vos problèmes ou les gardez-vous pour vous ? 
6. Comment réagissez-vous quand un ami vous déçoit ? 
7. Qu'est-ce que vos amis diraient de vous sans filtre ? 
8. Mentez-vous par politesse ? Sur quoi ? 
9. Comment faites-vous face à un conflit en groupe ? 
10. Que ressentez-vous quand quelqu'un réussit mieux que vous ?

THÈME 4 (Mon corps et mon intimité - SOIS DOUCE) : 
1. Quand vous êtes-vous senti(e) le plus désirable ? 
2. De quoi avez-vous besoin pour vous sentir à l'aise avec quelqu'un de nouveau ? 
3. Quelle place a la tendresse pour vous ? 
4. Parlez-vous facilement de ce que vous aimez ou n'aimez pas ? 
5. Qu'est-ce qui vous coupe l'envie instantanément ? 
6. Quelle est votre définition de la sensualité ? 
7. Y a-t-il un sujet que vous n'osez pas aborder avec un partenaire ? 
8. À quel point le lien émotionnel compte-t-il avant l'intimité ? 
9. Qu'est-ce qui vous rend vulnérable devant quelqu'un ? 
10. Qu'aimeriez-vous explorer en confiance avec la bonne personne ? 
11. Parlez de vos fantasmes en toute liberté (soumission, fétichisme, shibari...) ? 
12. Qu'est-ce qui vous excite chez l'autre, mais que vous n'arrivez pas à demander ? 
13. Préférez-vous la spontanéité ou la complicité construite ? 
14. Comment définiriez-vous une relation intime épanouissante pour vous ? 
15. Quel compliment vous touche vraiment ?

THÈME 5 (Ce qui compte pour moi) : 
1. Quelles sont vos trois valeurs non négociables ? 
2. Que feriez-vous si l'argent n'était pas un sujet ? 
3. Quel est votre rapport à la réussite ? 
4. Qu'est-ce qui donne du sens à vos journées ? 
5. Quelle injustice vous révolte ? 
6. Voulez-vous des enfants ? Pourquoi ? 
7. Où vous voyez-vous vivre dans 10 ans ? 
8. Qu'est-ce que la liberté signifie pour vous ? 
9. Quelle personne a influencé vos valeurs ? 
10. Que voulez-vous qu'on dise de vous à la fin de votre vie ?

THÈME 6 (Ma famille) : 
1. Comment décririez-vous l'ambiance de votre maison d'enfance ? 
2. Comment vos parents se montraient-ils de l'affection ? 
3. Quel parent vous ressemble le plus ? 
4. Comment se réglaient les conflits chez vous ? 
5. Avez-vous eu l'impression de devoir mériter l'amour ? 
6. Qu'avez-vous promis de ne jamais reproduire ? 
7. Quelle tradition familiale voulez-vous garder ? 
8. Parlait-on des émotions chez vous ? 
9. Quel rôle avez-vous joué : le sage, le rebelle, le protecteur, l'invisible ? 
10. Quelle blessure d'enfance se réveille encore ?

THÈME 7 (Mes contradictions et mes péchés) : 
1. Quelle vérité sur vous-même refusez-vous de voir ? 
2. Quel est le mensonge que vous racontez le plus souvent pour vous protéger ? 
3. Qu'est-ce que vous détestez chez les autres, parce que vous savez que vous avez la même chose en vous ? 
4. Quel conseil donnez-vous souvent aux autres, mais que vous ne suivez jamais ? 
5. Quelle qualité que vous affichez est en réalité un défaut ? 
6. Quand avez-vous blessé quelqu'un volontairement ? 
7. Quelle excuse vous répétez-vous le plus ? 
8. Quand fuyez-vous au lieu d'affronter ? 
9. Quelle part de vous sabote vos relations ? 
10. Qu'avez-vous gâché par orgueil ? 
11. Quelle est votre plus grande hypocrisie ? 
12. Quel comportement jugez-vous sévèrement chez les autres, alors que vous vous l'autorisez parfois ? 
13. Si vous deviez avouer une jalousie inavouable, ce serait envers qui ou quoi ? 
14. Quelle est la dernière fois où vous avez menti pour éviter un conflit ? 
15. Lequel de ces "péchés" vous ressemble le plus : l'orgueil, l'envie, la gourmandise, la luxure, l'avarice, la colère ou la paresse ?

RÈGLES DE FIN DE MESSAGE : 
1. Si tu poses la dernière question du Thème 7, ajoute [ACTION:DEFAUTS].
2. À la fin de CHAQUE message, tu dois ajouter le thème en cours (ex: [THEME:Qui je suis]).
3. À la fin de CHAQUE message, tu dois ajouter le code de la question que tu viens de poser (ex: [Q:T1_Q6]).`;

let historique = [];
let compteurQuestions = 0;
let nomUtilisateur = null;
let currentTheme = "Thème 1";

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
  ajouterBulle("Bonjour je m'appelle 3\n\n\"Sur une montre ce ne sont pas les aiguilles qui indiquent le temps qui passe mais l'usure du bracelet\"", 'lia');
  return new Promise(function(resolve) { resolve(pseudo); });
}

async function envoyer() {
  const texte = input.value.trim();
  if (!texte) return;
  input.value = '';
  sendBtn.disabled = true;
  ajouterBulle(texte, 'user');
  historique.push({ role: 'user', content: texte });
  const bulleLia = ajouterBulle('', 'lia');
  bulleLia.innerHTML = '<span class="chiffre" style="animation-delay: 0s">3</span> <span class="chiffre" style="animation-delay: 0.2s">3</span> <span class="chiffre" style="animation-delay: 0.4s">3</span>';

  let essais = 0;
  while (typeof puter === 'undefined' && essais < 50) {
    await new Promise(r => setTimeout(r, 100));
    essais++;
  }
  if (typeof puter === 'undefined') {
    bulleLia.textContent = "Erreur : la bibliothèque 3 (Puter) n'a pas pu se charger. Vérifie ta connexion et recharge la page.";
    sendBtn.disabled = false;
    return;
  }

  const startTime = Date.now();
  try {
    const reponse = await puter.ai.chat(historique, { model: 'gpt-4o-mini' });
    let t = reponse;
    if (typeof reponse === 'object' && reponse.message) {
      t = reponse.message.content || reponse.message;
    }
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < 1500) {
      await new Promise(r => setTimeout(r, 1500 - elapsedTime));
    }
    
    t = t.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    t = t.replace(/\[T\d_Q\d+\]/g, '').trim();
    t = t.replace(/\[Q:.*?\]/g, '').trim();

    var THEME_MAP = {
      "Qui je suis": "Thème 1",
      "Comment j'aime": "Thème 2",
      "Comment je suis avec les autres": "Thème 3",
      "Mon corps et mon intimité": "Thème 4",
      "Ce qui compte pour moi": "Thème 5",
      "Ma famille": "Thème 6",
      "Mes contradictions et mes péchés": "Thème 7"
    };
    
    var matchTheme = t.match(/\[THEME:(.*?)\]/);
    if (matchTheme) {
      document.getElementById('theme-courant').textContent = matchTheme[1].replace(/_/g, ' ').charAt(0).toUpperCase() + matchTheme[1].replace(/_/g, ' ').slice(1);
      t = t.replace(matchTheme[0], '').trim();
      var nouveauTheme = THEME_MAP[matchTheme[1]] || "Thème 1";
      
      if (nouveauTheme !== currentTheme) {
        currentTheme = nouveauTheme;
        if (BANQUE_CARTES[currentTheme]) {
          phrasesCartes = BANQUE_CARTES[currentTheme];
          indexCarte = 0;
          setTimeout(afficherCarte, 2000);
        }
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
      var images = imagesThemes[currentTheme];
      if (images) {
        var imgIndex = Math.floor(compteurQuestions / 3);
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
  await new Promise(r => setTimeout(r, 8000));
  afficherImagePleinEcran(imagesThemes["Thème 1"][0]);
  input.placeholder = 'Écris-moi quelque chose...';
  sendBtn.addEventListener('click', envoyer);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') envoyer();
  });
}

document.getElementById('accueil').addEventListener('click', function() {
  this.classList.add('hidden');
  document.getElementById('ecran-intro').classList.add('visible');
});

async function demarrerApp() {
  if (typeof puter !== 'undefined' && puter.auth) {
    await puter.auth.signIn();
  }
  document.getElementById('ecran-intro').classList.remove('visible');
  document.getElementById('chat').classList.add('visible');
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
