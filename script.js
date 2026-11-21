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
RÈGLE ABSOLUE SUR LES BALISES : Tu ne dois JAMAIS afficher de balises comme [T1_Q1] ou [THEME:...] dans ton texte.
STYLE : Tu n'es pas un questionnaire médical. Tu es une confidente intelligente. Parle un français impeccable, soutenu mais naturel. 
TROUVE TON INSPIRATION DANS LA SUBTILITÉ DE CETTE PHRASE : "Sur une montre ce ne sont pas les aiguilles qui indiquent le temps qui passe, mais l'usure du bracelet". 
Cherche l'usure, les failles, les détails invisibles derrière les apparences. Ne pose pas tes questions de façon brutale : à chaque fois que tu enchaînes sur une nouvelle question, fais un petit commentaire pour rebondir sur ce que la personne vient de dire, puis guide-la doucement vers la suite. Formule TOUJOURS des questions complètes et polies.
RÈGLE SUPPLÉMENTAIRE : Tu connais déjà le sexe de l'utilisateur et ce qu'il cherche. Ne lui pose JAMAIS cette question.

RÈGLES STRICTES :
1. L'utilisateur a dit "Oui" pour commencer. Lance la question 1 du Thème 1.
2. Ne pose qu'UNE SEULE question à la fois.
3. TU NE DOIS JAMAIS REPETER UNE QUESTION. Dès que l'utilisateur répond, tu DOIS passer à la question suivante.
4. Dès que tu as posé 3 questions d'un thème, change de thème et ajoute le code [THEME:LeNouveauThème] à la fin de ton message.

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

// NOUVELLE BANQUE DE CARTES (40 questions Jungiennes)
const BANQUE_CARTES = {
  "Thème 1": [
    { texte: "1. Après une soirée animée, je me sens plein·e d'énergie.", type: "jung" },
    { texte: "2. Je pense mieux en parlant qu'en restant silencieux·se.", type: "jung" },
    { texte: "3. Après une journée avec du monde, j'ai envie de me retirer dans ma grotte.", type: "jung" },
    { texte: "4. Je vis beaucoup dans ma tête : j'y ai tout un théâtre d'images et de pensées.", type: "jung" },
    { texte: "5. Quand un ami a un problème, je cherche d'abord la solution la plus logique.", type: "jung" },
    { texte: "6. Je préfère avoir raison que faire plaisir.", type: "jung" },
    { texte: "7. Je suis un détective : j'adore trouver l'erreur dans un raisonnement.", type: "jung" },
    { texte: "8. En entrant dans une pièce, je sens tout de suite si l'ambiance est chaude ou tendue.", type: "jung" },
    { texte: "9. Avant de choisir, je me demande ce que mon cœur et ceux que j'aime en pensent.", type: "jung" },
    { texte: "10. Je préfère céder plutôt que blesser quelqu'un.", type: "jung" },
    { texte: "11. Je remarque l'odeur du café, la lumière du matin, le grain d'un tissu.", type: "jung" },
    { texte: "12. Je crois ce que je vois et touche plus que les grandes théories.", type: "jung" },
    { texte: "13. J'aime plonger dans l'instant : manger, danser, bouger.", type: "jung" },
    { texte: "14. Devant un nuage ou un tableau, j'imagine tout de suite une histoire ou un sens caché.", type: "jung" },
    { texte: "15. J'ai souvent l'impression de savoir ce qui va arriver, sans pouvoir l'expliquer.", type: "jung" },
    { texte: "16. La routine m'étouffe : j'ai envie d'ouvrir des chemins neufs.", type: "jung" },
    { texte: "17. Je porte un costume différent au travail, en famille, entre amis, comme au théâtre.", type: "jung" },
    { texte: "18. J'ai peur qu'on voie ce qu'il y a derrière mon masque.", type: "jung" },
    { texte: "19. Je soigne mon image : ce que les autres pensent de moi compte beaucoup.", type: "jung" },
    { texte: "20. Sans mon métier ou mon rôle, je ne saurais plus qui je suis.", type: "jung" },
    { texte: "21. Ce qui m'agace chez quelqu'un, je le retrouve parfois en moi, comme dans un miroir.", type: "jung" },
    { texte: "22. Il y a en moi une part sombre (colère, jalousie, envie de vengeance) que je cache.", type: "jung" },
    { texte: "23. Il m'arrive de dire ou faire quelque chose que je regrette, comme si quelqu'un d'autre l'avait fait à ma place.", type: "jung" },
    { texte: "24. J'admire ou j'envie ceux qui osent ce que je m'interdis.", type: "jung" },
    { texte: "25. Je suis tombé·e amoureux·se d'une personne « parfaite », puis elle m'a paru ordinaire.", type: "jung" },
    { texte: "26. Une silhouette mystérieuse revient dans mes rêves ou mes pensées et me fascine.", type: "jung" },
    { texte: "27. J'ai en moi une part très tendre ou très forte que je laisse rarement voir.", type: "jung" },
    { texte: "28. Une voix intérieure me dicte ce que je dois penser, ou m'envahit d'humeurs sans raison.", type: "jung" },
    { texte: "29. Un mot ou un sujet précis, et je m'enflamme ou me ferme, comme si on appuyait sur un bouton.", type: "jung" },
    { texte: "30. Dans certaines situations, je redeviens un enfant ou je deviens quelqu'un d'autre.", type: "jung" },
    { texte: "31. Je retombe toujours dans les mêmes histoires (même type de partenaire, même dispute).", type: "jung" },
    { texte: "32. Quand on touche mon point sensible, je bégaie ou j'ai un trou de mémoire.", type: "jung" },
    { texte: "33. Parfois je sens que tout est relié, comme une vague dans l'océan.", type: "jung" },
    { texte: "34. Je garde mes rêves : ils semblent venir d'un sage intérieur.", type: "jung" },
    { texte: "35. Le cercle, l'arbre, le feu ou l'eau me touchent profondément.", type: "jung" },
    { texte: "36. Une coïncidence troublante m'a déjà marqué·e, comme un clin d'œil du destin.", type: "jung" },
    { texte: "37. Je me demande souvent : que veut devenir ma vie ?", type: "jung" },
    { texte: "38. J'apprends à accepter mes contradictions : fort·e et fragile à la fois.", type: "jung" },
    { texte: "39. J'ai traversé une épreuve qui a fait mourir une ancienne version de moi.", type: "jung" },
    { texte: "40. J'ai déjà quitté le chemin que tout le monde attendait, pour suivre le mien.", type: "jung" },
    { texte: "41. Lorsque quelqu'un me fait du mal, j'ai envie de lui faire ressentir la même souffrance, voire davantage.", type: "jung" },
    { texte: "42. Lorsque je suis contrarié ou en colère, je peux devenir verbalement ou physiquement agressif.", type: "jung" },
    { texte: "43. J'ai tendance à me considérer comme victime des autres ou des circonstances, et à minimiser ma part de responsabilité dans les problèmes.", type: "jung" },
    { texte: "44. Il m'arrive de prendre des décisions qui me font du mal, même lorsque je sais qu'elles risquent de détruire ce que j'ai construit ou ce qui compte pour moi.", type: "jung" }
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
  // Reset de la carte
  carteSwipe.style.transform = "translate(-50%, -50%)";
  carteSwipe.style.opacity = "1";
  carteSwipe.style.background = "rgba(20, 30, 50, 0.95)";
  carteTexte.textContent = phrasesCartes[indexCarte].texte;
  carteSwipe.classList.remove("cachee");
}

function afficherCartes() {
  return new Promise(function(resolve) {
    resolveCartes = resolve;
    indexCarte = 0;
    phrasesCartes = BANQUE_CARTES[currentTheme];
    afficherCarte();
  });
}

function swipeCarte(note) {
  if (indexCarte >= phrasesCartes.length) return;

  // Animation selon la note
  if (note >= 4) {
    carteSwipe.style.background = "rgba(80, 255, 120, 0.4)";
    carteSwipe.style.transform = "translate(-50%, -150%)";
    carteSwipe.style.opacity = "0";
  } else if (note <= 2) {
    carteSwipe.style.background = "rgba(255, 80, 80, 0.4)";
    carteSwipe.style.transform = "translate(-50%, 150%)";
    carteSwipe.style.opacity = "0";
  } else {
    // Note 3 : fond orange, on ne bouge pas la carte
    carteSwipe.style.background = "rgba(255, 165, 0, 0.6)";
    // On attend un petit peu avant de passer à la suivante
    setTimeout(function() {
      indexCarte++;
      carteSwipe.classList.add("cachee");
      setTimeout(afficherCarte, 400);
      if (indexCarte >= phrasesCartes.length && !cartesFaites) {
        cartesFaites = true;
        if (resolveCartes) resolveCartes();
      }
    }, 600);
    return; // On arrête là pour le 3
  }

  // Pour 1,2,4,5 on attend la fin de l'animation
  setTimeout(function() {
    indexCarte++;
    carteSwipe.classList.add("cachee");
    setTimeout(afficherCarte, 400);
    if (indexCarte >= phrasesCartes.length && !cartesFaites) {
      cartesFaites = true;
      if (resolveCartes) resolveCartes();
    }
  }, 400);
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
  
  if (!cartesFaites) {
    await afficherCartes();
  }

  var images = imagesThemes[currentTheme];
  if (images && compteurQuestions > 0 && compteurQuestions % 3 === 0) {
    var imgIndex = Math.floor(compteurQuestions / 3);
    if (imgIndex < images.length) {
      await afficherImagePleinEcran(images[imgIndex]);
    }
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
  } catch (e) {
    console.error(e);
    bulleLia.textContent = "Erreur Puter : " + (e.message || e || "Connexion perdue. Vérifie ton réseau.");
  }
  sendBtn.disabled = false;
  input.focus();
}

async function demarrer() {
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

async function demarrerApp() {
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
