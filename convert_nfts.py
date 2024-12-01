import csv
import json

# File paths
csv_file = 'nft_data.csv'
json_file = 'nft_bulk.json'

# Open CSV and read data
with open(csv_file, 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    with open(json_file, 'w') as jsonfile:
        for i, row in enumerate(reader):
            # Add the bulk index header
            jsonfile.write(json.dumps({ "index": { "_index": "nfts", "_id": i } }) + "\n")
            # Write the actual data
            jsonfile.write(json.dumps(row) + "\n")

print(f"Data converted to {json_file}")
