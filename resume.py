import requests

def resumer(messages, url, headers):
    a_resumer = messages[1:-6]
    if len(a_resumer) < 6:
        return messages

    texte = "Résume en 5 phrases maximum les informations essentielles sur l'utilisateur :\n"
    for m in a_resumer:
        texte += m["role"] + " : " + m["content"] + "\n"

    payload = {
        "model": "openai/gpt-oss-20b",
        "messages": [{"role": "user", "content": texte}]
    }

    try:
        r = requests.post(url, headers=headers, json=payload)
        resume = r.json()["choices"][0]["message"]["content"]
        return [messages[0], {"role": "system", "content": "[RESUME] " + resume}] + messages[-6:]
    except Exception as e:
        print("Erreur resume :", e)
        return messages
