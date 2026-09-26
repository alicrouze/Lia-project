def mesurer_rythme(messages):
    user_msgs = [m["content"] for m in messages if m["role"] == "user"]
    if len(user_msgs) < 2:
        return "ferme"
    recents = user_msgs[-5:]
    moyenne = sum(len(m.split()) for m in recents) / len(recents)
    if len(recents) >= 3:
        debut = sum(len(m.split()) for m in recents[:2]) / 2
        fin = sum(len(m.split()) for m in recents[-2:]) / 2
        tendance = fin - debut
    else:
        tendance = 0
    signaux = 0
    for m in recents:
        if "?" in m:
            signaux += 1
        mots = ["je", "moi", "mon", "ma", "mes", "pense", "sens", "crois", "peur", "aime", "reve"]
        for mot in mots:
            if mot in m.lower():
                signaux += 1
    score = moyenne + tendance * 2 + signaux * 3
    if score < 10:
        return "ferme"
    elif score < 25:
        return "tiede"
    elif score < 45:
        return "ouvert"
    else:
        return "profond"


def ajuster_rythme(nouveau, ancien):
    # Si pas d'ancien rythme, on prend le nouveau
    if ancien is None:
        return nouveau
    # Ordre des niveaux
    niveaux = ["ferme", "tiede", "ouvert", "profond"]
    i_nouveau = niveaux.index(nouveau)
    i_ancien = niveaux.index(ancien)
    # On ne monte que si le nouveau est plus haut
    # On ne descend que si le nouveau est plus bas
    # (on ne saute pas d'un cran d'un coup vers le bas)
    if i_nouveau > i_ancien:
        return niveaux[i_ancien + 1]
    elif i_nouveau < i_ancien:
        return niveaux[i_ancien - 1]
    else:
        return nouveau
