import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. On enlève l'affichage des cartes automatique après l'image
ancien_img = """      div.classList.remove('visible');
      ajouterImage(src);
      if (indexCarte === 0) {
        setTimeout(afficherCarte, 1000);
      }
      resolve();"""
nouveau_img = """      div.classList.remove('visible');
      ajouterImage(src);
      resolve();"""
js = js.replace(ancien_img, nouveau_img)

# 2. On ajoute une variable globale pour gérer l'attente
js = js.replace("let accueilAffiche = false;", "let cartesFaites = false;\nlet resolveCartes = null;")

# 3. On nettoie swipeCarte (on enlève l'ancien déclencheur d'accueil)
ancien_swipe = """function swipeCarte(reponse) {
  indexCarte++;
  carteSwipe.classList.add("cachee");
  setTimeout(afficherCarte, 400);
  
  // Si c'était la dernière carte, on affiche le message d'accueil de 3
  if (indexCarte >= phrasesCartes.length && !accueilAffiche) {
    accueilAffiche = true;
    setTimeout(function() {
      ajouterBulle("Bonjour, je suis 3.\\n\\n\\"Sur une montre, ce ne sont pas les aiguilles qui indiquent le temps qui passe, mais l'usure du bracelet.\\"\\n\\nEs-tu prêt(e) à commencer ?", 'lia');
      historique.push({ role: 'assistant', content: "Bonjour, je suis 3. Es-tu prêt(e) à commencer ?" });
    }, 1000);
  }
}"""

nouveau_swipe = """function swipeCarte(reponse) {
  indexCarte++;
  carteSwipe.classList.add("cachee");
  setTimeout(afficherCarte, 400);
  
  // Si c'était la dernière carte, on débloque la conversation
  if (indexCarte >= phrasesCartes.length && !cartesFaites) {
    cartesFaites = true;
    if (resolveCartes) resolveCartes(); // On signale qu'on a fini de swiper
  }
}

function afficherCartes() {
  return new Promise(function(resolve) {
    resolveCartes = resolve;
    indexCarte = 0;
    phrasesCartes = BANQUE_CARTES[currentTheme];
    afficherCarte();
  });
}"""
js = js.replace(ancien_swipe, nouveau_swipe)

# 4. Dans envoyer(), on force l'attente des cartes si c'est le premier message
ancien_envoyer = """  historique.push({ role: 'user', content: texte });
  
  var images = imagesThemes[currentTheme];"""
nouveau_envoyer = """  historique.push({ role: 'user', content: texte });
  
  // Si c'est le premier message de l'utilisateur, on affiche les cartes et on attend qu'il ait fini
  if (!cartesFaites) {
    await afficherCartes();
  }

  var images = imagesThemes[currentTheme];"""
js = js.replace(ancien_envoyer, nouveau_envoyer)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("✅ L'accueil passe en premier, les cartes apparaissent après le 'Oui'.")
