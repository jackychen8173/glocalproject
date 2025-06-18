import csv
import json
import os
import tempfile
import subprocess
import sys

# Paths
input_csv = r'C:\Users\jchen\YouthEmploymentEducationProject\data\variable_names.csv'
output_json = 'data/variable_label_map.json'
unfilled_output = 'data/unlabeled_variables.json'

# Load variable names from CSV
variable_names = []
with open(input_csv, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        variable_names.append(row['variable'])

# Load existing label map, or start empty
if os.path.exists(output_json):
    with open(output_json, 'r', encoding='utf-8') as f:
        label_map = json.load(f)
else:
    label_map = {}

# Add missing variables with empty labels
for var in variable_names:
    if var not in label_map:
        label_map[var] = ""

# Save label map to a temporary file for editing
with tempfile.NamedTemporaryFile('w+', suffix='.json', delete=False, encoding='utf-8') as tf:
    temp_path = tf.name
    json.dump(label_map, tf, indent=2, ensure_ascii=False)
print(f"Opening labels file for editing: {temp_path}")

# Open the temp file in default editor
def open_file_in_editor(filepath):
    if sys.platform.startswith('win'):
        os.startfile(filepath)
    elif sys.platform.startswith('darwin'):
        subprocess.call(['open', filepath])
    else:
        subprocess.call(['xdg-open', filepath])

open_file_in_editor(temp_path)

input("Edit the labels in the opened file. Save and close it, then press Enter here to continue...")

# Load the edited label map
with open(temp_path, 'r', encoding='utf-8') as f:
    edited_map = json.load(f)

# Keep only keys from current dataset
edited_map = {k: v for k, v in edited_map.items() if k in variable_names}

# Separate filled and unfilled labels
filled_labels = {k: v for k, v in edited_map.items() if v.strip() != ""}
unfilled_labels = {k: v for k, v in edited_map.items() if v.strip() == ""}

# Save filled labels
os.makedirs(os.path.dirname(output_json), exist_ok=True)
with open(output_json, 'w', encoding='utf-8') as f:
    json.dump(filled_labels, f, indent=2, ensure_ascii=False)

# Save unfilled labels to separate file
with open(unfilled_output, 'w', encoding='utf-8') as f:
    json.dump(unfilled_labels, f, indent=2, ensure_ascii=False)

print(f"\nDone! Saved {len(filled_labels)} labels to '{output_json}'")
print(f"Saved {len(unfilled_labels)} unfilled variables to '{unfilled_output}'")

# Optionally clean up the temp file
# os.remove(temp_path)
