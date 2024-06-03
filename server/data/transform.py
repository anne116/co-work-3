import json


with open('movies_data.json', 'r') as infile:
    data = infile.readlines()


with open('bulk_movies_data.json', 'w') as outfile:
    for line in data:
        movie = json.loads(line)
        index_line = json.dumps({ "index": { "_index": "movies", "_id": movie["_id"] } })
        source_line = json.dumps(movie["_source"])
        outfile.write(f"{index_line}\n{source_line}\n")
