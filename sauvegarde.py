import requests
import base64

with open("token.txt") as f:
    TOKEN = f.read().strip()

USER = "alicrouze"
REPO = "Lia-project"
BRANCH = "main"

HEADERS = {
    "Authorization": "Bearer " + TOKEN,
    "Accept": "application/vnd.github+json"
}

FICHIERS = ["lia.py", "lia_personality.md", "sauvegarde.py", "lia.html", "ecran-accueil.jpg"]

def upload(nom_fichier):
    try:
        with open(nom_fichier, "rb") as f:
            contenu = f.read()
    except:
        print(nom_fichier, "-> fichier introuvable")
        return
    
    contenu_b64 = base64.b64encode(contenu).decode()
    url = "https://api.github.com/repos/" + USER + "/" + REPO + "/contents/" + nom_fichier
    
    r = requests.get(url, headers=HEADERS)
    sha = r.json().get("sha") if r.status_code == 200 else None
    
    data = {
        "message": "Sauvegarde depuis iPhone",
        "content": contenu_b64,
        "branch": BRANCH
    }
    if sha:
        data["sha"] = sha
    
    r = requests.put(url, headers=HEADERS, json=data)
    print(nom_fichier, "->", r.status_code)

for f in FICHIERS:
    upload(f)

print("Sauvegarde terminee.")
