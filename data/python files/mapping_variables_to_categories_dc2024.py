import json
from collections import defaultdict

# Load Democracy Checkup variable label map
with open(r"data\democracy_checkup_labels.json", "r", encoding="utf-8") as f:
    label_map = json.load(f)

# Define categories from your TOC
category_definitions = {
    "Consent and Quota Demographics": [
        "age", "citizen", "gender", "trans", "province", "education", "born",
        "vismin", "language", "employment", "income", "marital", "household",
        "children", "religion", "sexuality", "union", "two_spirit", "rural",
        "parents", "occ", "lived", "disability", "property", "yob"
    ],
    "Satisfaction and Interest": ["democratic_sat", "pol_interest"],
    "Vote Choice": ["vote_choice", "provvote", "vote_2021", "turnout_2021"],
    "Party Ratings": ["party_ratings"],
    "Leader Ratings": ["leader_ratings"],
    "Political Knowledge": ["polknow"],
    "Institutional Trust": ["confidence_inst", "trust2"],
    "Federal and Provincial Satisfaction": ["fed_gov_satisfa", "prov_gov_sat"],
    "Attitudes Intro": ["pos"],
    "Attitudes - Equal Rights": ["equalrights", "pos_equal"],
    "Attitudes - Environment": ["enviro", "climate", "jobs"],
    "Government Capacity": ["govtprograms", "govtcare", "govtcomp", "govtsay", "govtcapacity"],
    "Attitudes - Identity": ["identity", "pos_group_id", "ethnic"],
    "Attitudes - Immigration 1": ["immfitin"],
    "Attitudes - Immigration 2": ["immigjobs", "pos_take_jobs"],
    "Attitudes - Immigration 3": ["immpriority", "pos_look_after", "imm_level", "refugee_level"],
    "Attitudes - Protest": ["protest", "pos_protest_law", "pos_limit_prote"],
    "Attitudes - Career Politicians & Anti-elite": ["career", "elite", "politicians", "ordinary", "pos_career_pol", "pos_experts", "pos_lose_touch", "pos_pol_lie"],
    "Attitudes - Politician Attitudes": ["politician"],
    "Attitudes - Colonialism & Indigenous Deserve": ["indigenous", "colonial", "pos_ab_colonial", "pos_ab_deserve"],
    "Attitudes - Women Home & Women in Politics": ["womenhome", "womenpolitics", "pos_women_home", "womenparl"],
    "Attitudes - Bilingualism & Religious Symbols": ["bilingualism", "religious", "pos_bilingualis", "pos_relig_sym"],
    "Attitude - System Justice": ["justice", "fair", "soc_fair", "pol_sys"],
    "Attitudes - No Difference": ["nodifference", "pos_no_differen"],
    "Modern Racism": ["racism", "modern_racism"],
    "Foreign Interference": ["foreignconfid", "foreignsafe"],
    "Climate Change": ["cc1", "cc2"],
    "Attention Check": ["attention"],
    "Media and Social Networks": ["news_time", "soc_media_freq", "disc_pol_freq", "disc_pol_disag"],
    "Social Network": ["soc_net_size", "soc_net_types", "network"],
    "Attitudes - Redistribution": ["inequality_gap", "redistribution"],
    "Immigration": ["immigration"],
    "Refugees": ["refugee"],
    "Groups Thermometers": ["groups_therm"],
    "Financial Situation Ladder Questions": ["ladder_current", "ladder_future", "finladder"],
    "Attitudes Intro and Mail Trust": ["mailtrust"],
    "Attitudes - External Efficacy - Government Care": ["pos_govt_care", "govtcare"],
    "Attitudes - External Efficacy - Government Complicated": ["pos_govt_comp", "govtcomplicated"],
    "Attitudes - External Efficacy - Government Say": ["pos_govt_say", "govtsay"],
    "Attitudes - Offensive Speech": ["pos_offensive_s", "offensive"],
    "Attitudes - Social Conservatism 1": ["pos_family_val", "soccon1"],
    "Attitudes - Social Conservatism 2": ["newerlife", "soccon2"],
    "Attitudes - Job creation": ["pos_govt_jobs", "jobcreate"],
    "Civil Rights": ["civilrights"],
    "Government Office: Contact": ["feedback_screen"],
    "Government Office: Benefits (Part 1)": ["feedback_ben_1"],
    "Government Office: Benefits (Part 2)": ["feedback_ben_2", "feedback_ben_3", "feedback_ben_4", "feedback_ben_5", "feedback_ben_6"],
    "Government Office: Documents Follow-Up (Part 1)": ["feedback_doc_1", "feedback_doc_2"],
    "Government Office: Documents Follow-Up (Part 2)": ["feedback_doc_3", "feedback_doc_4"],
    "Government Office: Local Problem": ["feedback_com"],
    "Ties with US": ["ties_us"],
    "Ties with China": ["ties_china"],
    "Party ID": ["party_id"],
    "Party Strength": ["pid_strength", "pid_connection", "pid_insult"],
    "Participation 1": ["participate_pro_1"],
    "Participation 2": ["participate_pro_2", "participate_pro_3", "participate_pro_4", "participate_pro_5"],
    "Participation 3": ["participate_civ_1", "participate_civ_2", "participate_civ_3"],
    "Past vote": ["Q447", "Q448", "vote_2021"],
    "Trust": ["trust", "trust2"],
    "Ideology": ["lr_self_1", "lr_party_1", "lr_party_2", "lr_party_3", "lr_party_4", "lr_party_5", "lr_party_6"],
    "Foreign Policy": ["foreign_pol_protect", "foreign_pol_support", "foreign_pol_provide", "foreign_pol_increase", "foreign_pol_ukr"],
    "Election Satisfaction": ["emb_satif", "electsatis"],
    "Additional Demographics": ["health_physical", "health_mental", "social_iso_1", "social_iso_2", "social_iso_3", "disability", "disabilitytype"],
    "Religion Part 1": ["religion", "religion_import", "language_1", "language_2", "language_3", "canada_born", "country_born", "immig_year", "parent_born"],
    "Religion Part 2": [],
    "Federal Election Districts": ["district"]
}

# Categorize variables
categorized_map = defaultdict(dict)
uncategorized = {}

for var, label in label_map.items():
    assigned = False
    for cat, keywords in category_definitions.items():
        if any(k in var.lower() for k in keywords):
            categorized_map[cat][var] = label
            assigned = True
            break
    if not assigned:
        uncategorized[var] = label

if uncategorized:
    categorized_map["Other / Uncategorized"] = uncategorized

# Save categorized mapping
with open(r"react-d3\public\categorized_democracy_checkup.json", "w", encoding="utf-8") as f:
    json.dump(dict(categorized_map), f, indent=2, ensure_ascii=False)
