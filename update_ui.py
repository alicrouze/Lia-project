import re

# --- 1. MODIFICATION DU CSS (descendre le thème) ---
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('top: 135px;', 'top: 155px;')

# Ajout du style pour l'écran interstitiel à la fin du CSS
css += """
#ecran-intro {
  position: fixed; inset: 0; background: rgba(10, 15, 30, 0.95); backdrop-filter: blur(20px);
  z-index: 9998; display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 30px; color: #fff; text-align: center; opacity: 0; pointer-events: none; transition: opacity 1s ease;
}
#ecran-intro.visible { opacity: 1; pointer-events: auto; }
#ecran-intro h2 { color: #d4a960; font-family: Baskerville, serif; margin-bottom: 20px; font-size: 26px; }
#ecran-intro p { font-size: 16px; line-height: 1.6; margin-bottom: 15px; color: rgba(255,255,255,0.85); max-width: 500px; }
.btn-commencer { margin-top: 30px; padding: 12px 30px; border-radius: 25px; background: linear-gradient(135deg, #6a7bff 0%, #5a6bef 100%); color: white; border: none; font-size: 16px; font-weight: bold; cursor: pointer; }
"""
with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("✅ CSS mis à jour (thème plus bas et écran interstitiel).")


# --- 2. MODIFICATION DU HTML (ajout de l'écran) ---
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

ecran_html = """
<div id="ecran-intro">
  <h2>Avant d'entrer</h2>
  <p>3 n'est pas un site de rencontre classique. Pas de photos, pas de profils à swiper. Juste une conversation.</p>
  <p><strong>Votre anonymat est total.</strong> Nous ne demandons ni nom, ni email. Vos réponses sont chiffrées et ne seront jamais partagées. Seule la personne que 3 vous proposera saura que vous existez.</p>
  <p>Pendant 3 jours, 3 va apprendre à vous connaître en profondeur. À la fin, elle vous proposera <strong>une seule personne</strong>.</p>
  <button class="btn-commencer" onclick="demarrerApp()">Commencer</button>
</div>
"""
# On l'insère juste avant la fermeture du body
html = html.replace('<script src="script.js"></script>', ecran_html + '\n<script src="script.js"></script>')
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ HTML mis à jour (ajout de l'écran interstitiel).")


# --- 3. MODIFICATION DU JS (Message d'accueil et Prompt) ---
with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Message d'accueil
ancien_accueil = re.search(r'ajouterBulle\("Bonjour.*?", \'lia\'\);', js)
if ancien_accueil:
    nouveau_accueil = """ajouterBulle("Bonjour je m'appelle 3.\\n\\nSur une montre ce ne sont pas les aiguilles qui indiquent le temps qui passe mais l'usure du bracelet.", 'lia');"""
    js = js.replace(ancien_accueil.group(0), nouveau_accueil)

# Nettoyage du prompt (retirer l'âge et le département du début)
js = js.replace("""AU TOUT DÉBUT, pose ces 3 questions d'introduction :
- Quel est ton âge approximatif ?
- Dans quel département vis-tu ?
- Accepterais-tu de rencontrer quelqu'un qui habite dans une autre région ?""", 
"""L'utilisateur vient de lire ton message d'accueil. Ne le répète pas. S'il te dit bonjour, enchaîne directement sur la première question du Thème 1.""")

# Gestion de l'écran interstitiel
ancien_demarrage = re.search(r"document\.getElementById\('accueil'\)\.addEventListener.*?\}\);", js, re.DOTALL)
if ancien_demarrage:
    nouveau_demarrage = """document.getElementById('accueil').addEventListener('click', function() {
  this.classList.add('hidden');
  document.getElementById('ecran-intro').classList.add('visible');
});

function demarrerApp() {
  document.getElementById('ecran-intro').classList.remove('visible');
  document.getElementById('chat').classList.add('visible');
  setTimeout(demarrer, 1000);
}"""
    js = js.replace(ancien_demarrage.group(0), nouveau_demarrage)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("✅ JS mis à jour (nouveau message et écran interstitiel).")
