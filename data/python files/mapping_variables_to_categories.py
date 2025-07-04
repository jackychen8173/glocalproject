import json
from collections import defaultdict

# Load the variable label map from file
with open(r"data\variable_label_map.json", "r", encoding="utf-8") as f:
    label_map = json.load(f)

# Define categories based on keywords or variable prefixes
category_definitions = {
    "Demographics": [
        "citizenship", "genderid", "trans", "province", "education", "bornin", "vismin", "language",
        "employment", "income", "marital", "household", "children", "religion", "sexuality", "union",
        "two_spirit", "rural_urban", "parents_born", "occ_cat", "lived"
    ],
    "Political Interest": [
        "interest", "follow_pol", "talkpolitics", "govt_say", "govt_confusing", "news_cons",
        "duty_choice", "debate"
    ],
    "Voting Behavior": [
        "v_likely", "votechoice", "howvote", "v_advance", "vote_2019", "turnout", "vote_lean",
        "spoil", "notvotereason", "pr_votechoice"
    ],
    "Party Ratings": [
        "party_rating", "lead_rating", "cand_rating", "fed_gov_sat", "prov_gov_sat"
    ],
    "Policy Opinions": [
        "pos_", "econ_", "issue_handle", "envirojob", "carbon", "energy", "subsid", "trade", "fptp",
        "life", "cannabis", "lib_promises", "famvalues", "bilingualism", "equalrights", "fitin",
        "immigjobs", "ab_", "govtprograms", "tie", "hostile", "abort", "conversion", "stdofliving",
        "privjobs", "blame", "inequal", "gap", "prov_treatment", "provfed"
    ],
    "COVID-19": ["covid", "vaccine", "maileasy", "maildifficult", "votingsafe"],
    "Party ID": ["fed_id", "prov_id", "pidtrad"],
    "Vote Confidence & Process": ["conf_inst", "emb", "register", "internetvote", "foreign"],
    "Candidate Preference": ["candidateref", "candidate_imag", "outcome", "minority_gov"],
    "Leader Traits": ["lead_int", "lead_strong", "lead_trust", "lead_cares"],
    "Campaign Contact": ["campatt", "contact"],
    "Political Participation": ["partic", "partymember", "volunteer"],
    "Spending Priorities": ["spend_"],
    "Group Feelings": ["groups_therm", "groups1"],
    "Discrimination": ["groupdiscrim"],
    "Quebec/Identity": ["quebec", "langQC", "cultureQC", "qclang", "qcsol", "ethid", "can_id"],
    "Personality & Values": [
        "big5", "feminine", "masculine", "cognition", "trust", "newerlife", "populism"
    ],
    "Health": ["health", "phealth", "mhealth"],
    "Friends & Social Circles": ["friendswho", "discfam"],
}

# Helper to assign variables to categories
categorized_map = defaultdict(dict)
uncategorized = {}

for var, label in label_map.items():
    assigned = False
    for cat, keywords in category_definitions.items():
        if any(k in var for k in keywords):
            categorized_map[cat][var] = label
            assigned = True
            break
    if not assigned:
        uncategorized[var] = label

# Add uncategorized if any remain
if uncategorized:
    categorized_map["Other / Uncategorized"] = uncategorized

# Save result to a new file
with open("react-d3\public\categorized_variable_label_map.json", "w", encoding="utf-8") as f:
    json.dump(dict(categorized_map), f, indent=2, ensure_ascii=False)
