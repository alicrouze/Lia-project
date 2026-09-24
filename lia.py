from resume import resumer
import requests

with open("id.txt") as f:
    API_KEY = f.read().strip()

with open("lia_personality.md") as f:
    LIA_PERSONA = f.read()

URL = "https://api.groq.com/openai/v1/chat/completions"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + API_KEY
}

print("LIA prete. Tape quit pour sortir.")

messages = [{"role": "system", "content": LIA_PERSONA}]

while True:
    u = input("Toi : ")
    if u.lower() in ["quit", "exit", "q"]:
        break
    messages.append({"role": "user", "content": u})
    payload = {"model": "openai/gpt-oss-20b", "messages": messages}
    try:
        r = requests.post(URL, headers=HEADERS, json=payload)
        data = r.json()
        response = data["choices"][0]["message"]["content"]
        print("LIA :", response)
        messages.append({"role": "assistant", "content": response})
    except Exception as e:
        print("Erreur :", e)
