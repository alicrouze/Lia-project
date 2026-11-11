import re

# On lit le fichier script.js
with open('script.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Remplacer le message d'accueil
ancien_accueil = re.search(r'ajouterBulle\("Bonjour, je suis 3\..*?", \'lia\'\);', code)
if ancien_accueil:
    nouveau_accueil = """  ajouterBulle("Bonjour, je suis 3. Sur une montre, ce ne sont pas les aiguilles qui indiquent le temps qui passe, mais l'usure du bracelet. Ici, pas de nom, pas de photo, aucun jugement. Je ne regarde pas ce que vous montrez. Je cherche ce qui vous a usé. Pour commencer : quel est votre âge approximatif ?", 'lia');"""
    code = code.replace(ancien_accueil.group(0), nouveau_accueil)
    print("✅ Message d'accueil remplacé avec succès.")
else:
    print("❌ Impossible de trouver l'ancien message d'accueil.")

# 2. Corriger le bug des images en double
ancien_img = "var imgIndex = Math.floor(compteurQuestions / 3) - 1;"
nouveau_img = "var imgIndex = Math.floor(compteurQuestions / 3);"
if ancien_img in code:
    code = code.replace(ancien_img, nouveau_img)
    print("✅ Bug des images en double corrigé.")
else:
    print("ℹ️ La ligne des images n'a pas été trouvée (peut-être déjà corrigée).")

# 3. Sauvegarder les modifications
with open('script.js', 'w', encoding='utf-8') as f:
    f.write(code)
print("🎉 Fichier script.js mis à jour !")
