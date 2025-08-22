import json
from collections import Counter, defaultdict

# 1. Load your full survey JSON
with open(r"C:\Users\jchen\Downloads\dc2024_u30data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 2. Prepare a dict to store counts per question
aggregated_counts = defaultdict(Counter)

# 3. Count answers for every question
for response in data:
    for question, answer in response.items():
        aggregated_counts[question][answer] += 1

# 4. Convert defaultdict(Counter) to normal dicts for JSON
aggregated_counts_dict = {q: dict(c) for q, c in aggregated_counts.items()}

# 5. Save aggregated JSON
with open("aggregated_survey_dc2024u30.json", "w", encoding="utf-8") as f:
    json.dump(aggregated_counts_dict, f, indent=2, ensure_ascii=False)

print("Aggregated JSON saved to aggregated_survey.json")