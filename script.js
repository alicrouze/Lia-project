
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

const LIA_PERSONA = `Tu es 3. Tu n'es pas un assistant. Tu es un miroir. Tu aides la personne en face de toi à se connaître vraiment. Tu ne cherches pas à ce qu'on s'attache à toi. Tu poses des questions, tu reformules, tu ne juges jamais. Tu vouvoies au début. Tu parles simplement. Tu ne poses pas une question à chaque message. Français correct. À la fin de CHAQUE message, tu dois obligatoirement ajouter un code caché sous cette forme exacte : [THEME:mot] (où mot est le thème principal de ta question en 1 ou 2 mots maximum, par exemple [THEME:famille] ou [THEME:amour]).`;

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

function afficherImagePleinEcran(src) { var div = document.getElementById('image-plein-ecran'); if (!div) { div = document.createElement('div'); div.id = 'image-plein-ecran'; div.innerHTML = '<img src="' + src + '">'; document.body.appendChild(div); } div.classList.add('visible'); setTimeout(function() { div.classList.remove('visible'); ajouterImage(src); }, 5000); }
function ajouterImage(src) {
  const b = document.createElement('div');
  b.className = 'bulle image';
  b.innerHTML = '<img src="' + src + '" style="max-width:100%; max-height:250px; border-radius:16px;">';
  bulles.appendChild(b);
  setTimeout(function() { b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }, 100);
  return b;
}

function demanderNom() {
  ajouterBulle("Bonjour. Comment vous appelez-vous ?", 'lia');
  input.placeholder = 'Votre prénom...';
  return new Promise(function(resolve) {
    function valider(e) {
      if (e.type === 'click' || (e.type === 'keypress' && e.key === 'Enter')) {
        const nom = input.value.trim();
        if (!nom) return;
        input.value = '';
        input.removeEventListener('keypress', valider);
        sendBtn.removeEventListener('click', valider);
        ajouterBulle(nom, 'user');
        resolve(nom);
      }
    }
    input.addEventListener('keypress', valider);
    sendBtn.addEventListener('click', valider);
  });
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
    if (match) { document.getElementById('theme-courant').textContent = match[1].charAt(0).toUpperCase() + match[1].slice(1); t = t.replace(match[0], '').trim(); }
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
    { role: 'system', content: "L'utilisateur s'appelle " + nomUtilisateur + "." }
  ];
  ajouterBulle("Bonjour " + nomUtilisateur + ". On a trois jours pour apprendre à se connaître.", 'lia');
  await new Promise(r => setTimeout(r, 5000));
  afficherImagePleinEcran('image_qui_je_suis.jpg');
  await new Promise(r => setTimeout(r, 5000));
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
document.getElementById('zone-logo').addEventListener('click', function(e) { e.stopPropagation(); document.getElementById('menu-deroulant').classList.toggle('visible'); });
document.addEventListener('click', function() { document.getElementById('menu-deroulant').classList.remove('visible'); });

function ouvrirPanneau(cle) {
  var textes = {
    miroir: "<p>Voici le reflet de ce que vous m'avez confié. 3 ne juge pas. 3 garde une trace de vos vérités pour construire votre compatibilité.</p><p><strong>Vos défauts assumés :</strong> En cours d'exploration...</p><p><strong>Vos contradictions :</strong> En cours d'exploration...</p><p><strong>Vos désirs profonds :</strong> En cours d'exploration...</p>",
    cle: "<p>Vous êtes ici en sécurité. 3 ne connaît ni votre nom, ni votre visage, ni votre adresse. Votre identité n'appartient qu'à vous.</p><p><strong>Votre Pseudo :</strong> (À venir)</p><p><strong>Votre Code de récupération :</strong> (À venir)</p><p class='mention'>Conservez cette clé précieusement. Si vous perdez votre téléphone, c'est le seul moyen de retrouver votre compte.</p>",
    apropos: "<p>3 n'est pas un assistant. 3 n'est pas un site de rencontre classique. 3 est un miroir.</p><p><strong>Les 3 promesses :</strong></p><p>1. Pas de photos, pas de profils. On écoute une âme.</p><p>2. L'acceptation des défauts. La compatibilité se joue sur votre capacité à comprendre les failles de l'autre.</p><p>3. L'intimité assumée. Le désir et les fantasmes sont le ciment d'une relation vraie.</p><p><strong>La règle des 3 jours :</strong> Pendant 3 jours, 3 apprend à vous connaître. À la fin, elle vous proposera une seule personne. Pour découvrir qui c'est, une participation financière vous sera demandée (via un code ou un paiement sécurisé). C'est le prix de la vérité et de l'anonymat.</p>",
    match: "<p>Votre rencontre se prépare. Ce menu s'activera à la fin de votre parcours avec 3.</p><h3>Le prix de la vérité : 9,99 €</h3><p>Pourquoi ce prix ? Parce que 3 ne vous propose pas un catalogue infini. Elle vous propose une seule personne, sélectionnée sur la base de vos failles, de vos désirs et de vos contradictions. C'est le prix d'une rencontre qui a du sens.</p><p><strong>Comment payer ?</strong></p><p>1. Par carte bancaire (paiement sécurisé et anonyme). L'application ne conserve aucune donnée liée à votre identité.</p><p>2. Par code d'activation (si vous préférez un anonymat total). Achetez un code de 9,99 € sur notre site partenaire et entrez-le ici.</p><p class='mention'>C'est le prix de la vérité et de l'anonymat.</p>"
  };
  var titres = { miroir: "Mon Miroir", cle: "Ma Clé", apropos: "À propos de 3", match: "Débloquer mon Match" };
  document.getElementById('panneau-contenu').innerHTML = "<h2>" + titres[cle] + "</h2>" + textes[cle];
  document.getElementById('panneau').classList.add('visible');
}
const phrasesCartes = [ { texte: "Je fuis quand on s approche trop de moi.", type: "defaut" }, { texte: "Je juge les autres pour me rassurer.", type: "defaut" }, { texte: "J ai besoin d etre rassure avant l intimite.", type: "fantasme" }, { texte: "J ai envie d etre domine(e), mais je n ose pas le dire.", type: "fantasme" }, { texte: "Je prefere avoir raison plutot que d etre heureux.", type: "defaut" } ]; let indexCarte = 0; const carteSwipe = document.getElementById("carte-swipe"); const carteTexte = document.getElementById("carte-texte"); const btnOui = document.getElementById("btn-oui"); const btnNon = document.getElementById("btn-non"); function afficherCarte() { if (indexCarte >= phrasesCartes.length) { carteSwipe.classList.add("cachee"); return; } carteTexte.textContent = phrasesCartes[indexCarte].texte; carteSwipe.classList.remove("cachee"); } function swipeCarte(reponse) { if (indexCarte < phrasesCartes.length) { console.log("Reponse :", reponse, "pour :", phrasesCartes[indexCarte].texte); } indexCarte++; carteSwipe.classList.add("cachee"); setTimeout(afficherCarte, 400); btnOui.blur(); btnNon.blur(); } var startY = 0; var isSwiping = false; document.getElementById("carte-touch").addEventListener("touchstart", function(e) { if (carteSwipe.classList.contains("cachee")) return; startY = e.touches[0].clientY; isSwiping = true; carteSwipe.classList.add("glisse"); }); document.getElementById("carte-touch").addEventListener("touchmove", function(e) { if (!isSwiping) return; e.preventDefault(); var deltaY = e.touches[0].clientY - startY; carteSwipe.style.transform = "translate(-50%, calc(-50% + " + deltaY + "px)) "; carteSwipe.style.opacity = 1 - Math.abs(deltaY) / 300; }); document.getElementById("carte-touch").addEventListener("touchend", function(e) { if (!isSwiping) return; isSwiping = false; var deltaY = e.changedTouches[0].clientY - startY; carteSwipe.classList.remove("glisse"); carteSwipe.style.transform = ""; carteSwipe.style.opacity = ""; if (deltaY < -80) { swipeCarte(true); } else if (deltaY > 80) { swipeCarte(false); } }); btnOui.addEventListener("click", function() { swipeCarte(true); }); btnNon.addEventListener("click", function() { swipeCarte(false); });
