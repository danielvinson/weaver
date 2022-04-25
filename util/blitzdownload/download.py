import requests
import json
import time
import os

data_dir = "../../data/temp/"

base_url = "https://valorant.iesdev.com/match/"
act_ids = {
    "episode3": {
        "act1": "2a27e5d2-4d30-c9e2-b15a-93b8909a442c",
        "act2": "4cb622e1-4244-6da3-7276-8daaf1c01be2",
        "act3": "a16955a5-4ad0-f761-5e9e-389df1c892fb",
    },
    "episode4": {
        "act1": "573f53ac-41a5-3a7d-d9ce-d6a6298e5704",
        "act2": "d929bc38-4ab6-7da4-94f0-ee84f8ac141e",
    },
}

boomer_match_filename = "boomer3champions.txt"


def download_match(match_id, act_id, type):
    url = f"{base_url}{match_id}/?type={type}&actId={act_id}"
    res = requests.get(url)
    return res


def download_matches():
    acts = [
        # act_ids["episode3"]["act1"],
        # act_ids["episode3"]["act2"],
        # act_ids["episode3"]["act3"],
        # act_ids["episode4"]["act1"],
        act_ids["episode4"]["act2"],
    ]
    match_types = [
        "subject",
        # "puuid"
    ]

    with open(boomer_match_filename, "r") as infile:
        for line in infile:
            match_id = line.strip()
            if os.path.exists(os.path.join(data_dir, match_id + ".json")):
                continue
            with open(f"{data_dir}{match_id}.json", "w") as outfile:
                print(f"downloading {match_id}")

                for act in acts:
                    res = download_match(match_id, act, "subject")
                    if len(res.content) > 0:
                        break
                    time.sleep(2)

                if len(res.content) == 0:
                    print(f"Couldn't find match {match_id}")
                else:
                    json.dump({"match_type": "subject", "data": res.json()}, outfile)

                time.sleep(2)


download_matches()
