import pandas as pd
import json
from datetime import datetime
from collections import defaultdict

# Percorsi file
EXCEL_FILE = "cards.xlsx"
OUTPUT_JSON = "data/cards.json"

# Legge l'Excel
df = pd.read_excel(EXCEL_FILE)
df = df.fillna("")

# Converte la data da DD/MM/YYYY a YYYY-MM-DD
df["Data_Pubblicazione"] = pd.to_datetime(
    df["Data_Pubblicazione"],
    format="%d/%m/%Y"
)

# Dizionario dei set
sets = {}

for _, row in df.iterrows():
    nome_set = row["Nome_Set"]

    if nome_set not in sets:
        sets[nome_set] = {
            "nome_set": nome_set,
            "data_pubblicazione": row["Data_Pubblicazione"].strftime("%Y-%m-%d"),
            "nome_logo": row["Nome_Logo"],
            "logo_disegnato": row["Logo_Disegnato"],
            "carte": []
        }

    sets[nome_set]["carte"].append({
        "numero": int(row["Numero_Carta"]),
        "nome": row["Nome_Carta"],
        "rarita": row["Rarita"],
        "lingua": row["Lingua"]
    })

# Ordina le carte di ogni set per Numero_Carta
for s in sets.values():
    s["carte"].sort(key=lambda c: c["numero"])

# Ordina i set per data (dal più vecchio al più recente)
sets_ordinati = sorted(
    sets.values(),
    key=lambda s: datetime.strptime(s["data_pubblicazione"], "%Y-%m-%d")
)

# Struttura finale
output = {
    "sets": sets_ordinati
}

# Scrive il JSON
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("✔ cards.json generato correttamente")