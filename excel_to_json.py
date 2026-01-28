import pandas as pd
import json
from datetime import datetime

EXCEL_FILE = "cards.xlsx"
OUTPUT_JSON = "data/cards.json"

df = pd.read_excel(EXCEL_FILE)

# Normalizza NaN → None
df = df.where(pd.notnull(df), None)

# Converte la data
df["Data_Pubblicazione"] = pd.to_datetime(
    df["Data_Pubblicazione"],
    format="%d/%m/%Y",
    errors="coerce"
)

sets = {}

for _, row in df.iterrows():
    nome_set = row["Nome_Set"]
    if not nome_set:
        continue

    if nome_set not in sets:
        sets[nome_set] = {
            "nome_set": nome_set,
            "data_pubblicazione": row["Data_Pubblicazione"].strftime("%Y-%m-%d"),
            "nome_logo": row["Nome_Logo"],
            "logo_disegnato": row["Logo_Disegnato"],
            "carte": []
        }

    carta = {
        "numero": int(row["Numero_Carta"]) if row["Numero_Carta"] is not None else "",
        "nome": row["Nome_Carta"] or "",
        "rarita": row["Rarita"] or "",
        "lingua": row["Lingua"] or ""
    }

    sets[nome_set]["carte"].append(carta)

# Ordina carte
for s in sets.values():
    s["carte"].sort(
        key=lambda c: c["numero"] if isinstance(c["numero"], int) else 9999
    )

# Ordina set per data
sets_ordinati = sorted(
    sets.values(),
    key=lambda s: datetime.strptime(s["data_pubblicazione"], "%Y-%m-%d")
)

output = {"sets": sets_ordinati}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("✔ cards.json generato SENZA NaN")