with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Ajouter une variable pour éviter que l'accueil s'affiche deux fois
js = js.replace("let currentTheme = \"Thème 1\";", "let currentTheme = \"Thème 1\";\nlet accueilAffiche = false;")

# 2. Modifier swipeCarte pour afficher l'accueil à la fin des cartes
ancien_swipe = """function swipeCarte(reponse) {
  indexCarte++;
  carteSwipe.classList.add("cachee");
  setTimeout(afficherCarte, 400);
}"""

nouveau_swipe = """function swipeCarte(reponse) {
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
js = js.replace(ancien_swipe, nouveau_swipe)

# 3. Enlever l'affichage de l'accueil dans demarrer() pour éviter le doublon
ancien_demarrer = """  // Message d'accueil statique (fiable et instantané)
  ajouterBulle("Bonjour, je suis 3.\\n\\n\\"Sur une montre, ce ne sont pas les aiguilles qui indiquent le temps qui passe, mais l'usure du bracelet.\\"\\n\\nEs-tu prêt(e) à commencer ?", 'lia');
  
  // On prévient l'IA en arrière-plan que l'utilisateur a vu l'accueil
  historique.push({ role: 'assistant', content: "Bonjour, je suis 3. Es-tu prêt(e) à commencer ?" });"""
js = js.replace(ancien_demarrer, "  // Le message d'accueil s'affichera à la fin des cartes (voir swipeCarte).")

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("✅ L'accueil de 3 apparaîtra uniquement après la dernière carte.")
