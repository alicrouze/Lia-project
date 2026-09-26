from analyse import mesurer_rythme, ajuster_rythme
from resume import resumer
import requests
import json
import os

with open("id.txt") as f:
    API_KEY = f.read().strip()

with open("lia_personality.md") as f:
    LIA_PERSONA = f.read()

URL = "https://api.groq.com/openai/v1/chat/completions"
HEADERS = {"Content-Type": "application/json", "Authorization": "Bearer " + API_KEY}

NOM = input("Qui es-tu ? ").strip().lower()
FICHIER = "historique_" + NOM + ".json"

if os.path.exists(FICHIER):
    with open(FICHIER, "r", encoding="utf-8") as f:
        messages = json.load(f)
        messages.insert(1, {"role": "system", "content": "Tu te souviens de TOUT ce qui suit. C est ta memoire. Utilise-la."})
    rythme_sauve = None
    print("Historique charge :", len(messages), "messages")
else:
    messages = [{"role": "system", "content": LIA_PERSONA}]
    rythme_sauve = None

print("LIA prete. Tape quit pour sortir.")

while True:
    u = input("Toi : ")
    if u.lower() in ["quit", "exit", "q"]:
        break
    messages.append({"role": "user", "content": u})
    rythme_calcule = mesurer_rythme(messages)
    rythme = ajuster_rythme(rythme_calcule, rythme_sauve)
    rythme_sauve = rythme
    print("[Rythme detecte :", rythme + "]")
    messages_avec_rythme = messages + [{"role": "system", "content": "RYTHME ACTUEL DE L UTILISATEUR : " + rythme + ". Adapte ton style a ce rythme."}]
    payload = {"model": "openai/gpt-oss-120b", "messages": messages_avec_rythme}
    try:
        r = requests.post(URL, headers=HEADERS, json=payload)
        data = r.json()
        response = data["choices"][0]["message"]["content"]
        print("LIA :", response)
        messages.append({"role": "assistant", "content": response})
        with open(FICHIER, "w", encoding="utf-8") as f:
            json.dump(messages, f, ensure_ascii=False, indent=2)
        if len(messages) > 30:
            messages = resumer(messages, URL, HEADERS)
            with open(FICHIER, "w", encoding="utf-8") as f:
                json.dump(messages, f, ensure_ascii=False, indent=2)
            print("[Memoire optimisee]")
    except Exception as e:
        print("Erreur :", e)
