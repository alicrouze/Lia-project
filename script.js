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
    { titre: "30. Malhonnêteté intellectuelle", texte: "Lorsque je