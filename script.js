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
    phrasesCartes = BANQUE_CARTES[currentTheme];
    afficherCarte();
  });
}

function swipeCarte(note) {
  if (carteSwipe.classList.contains("cachee")) return;

  if (note >= 4) {
    carteSwipe.style.background = "rgba(80, 255, 120, 0.4)";
    carteSwipe.style.transform = "translate(-50%, -130%)";
    carteSwipe.style.opacity = "0";
    setTimeout(passerCarteSuivante, 2000);
  } else if (note <= 2) {
    carteSwipe.style.background = "rgba(255, 80, 80, 0.4)";
    carteSwipe.style.transform = "translate(-50%, 130%)";
    carteSwipe.style.opacity = "0";
    setTimeout(passerCarteSuivante, 2000);
  } else {
    carteSwipe.style.transition = "all 0.4s ease"; 
    carteSwipe.style.background = "rgba(255, 165, 0, 0.4)";
    carteSwipe.style.opacity = "0";
    setTimeout(passerCarteSuivante, 400);
  }
}

function choisirPeche(peche) {
  if (carteSwipe.classList.contains("cachee")) return;
  carteSwipe.style.transition = "all 0.4s ease";
  carteSwipe.style.background = "rgba(212, 169, 96, 0.5)";
  carteSwipe.style.transform = "scale(1.05)";
  carteSwipe.style.opacity = "0";
  setTimeout(passerCarteSuivante, 400);
}

function passerCarteSuivante() {
  indexCarte++;
  carteSwipe.classList.add("cachee");
  setTimeout(afficherCarte, 500);
  if (indexCarte >= phrasesCartes.length && !cartesFaites) {
    cartesFaites = true;
    if (resolveCartes) resolveCartes();
  }
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

function demarrerApp() {
  // Affichage du chat immédiat, sans plein écran forcé qui bloque
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
