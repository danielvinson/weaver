import requests
import json
import time
import os

data_dir = "../../data/"

base_url = "https://valorant.iesdev.com/match/"
act_ids = {
    "episode3": {
        "act1": "2a27e5d2-4d30-c9e2-b15a-93b8909a442c",
        "act2": "4cb622e1-4244-6da3-7276-8daaf1c01be2",
        "act3": "a16955a5-4ad0-f761-5e9e-389df1c892fb",
    }
}

boomer_match_filename = "noober_match_ids.txt"


def download_match(match_id, act_id, type):
    url = f"{base_url}{match_id}/?type={type}&actId={act_id}"
    res = requests.get(url)
    return res


def download_boomer_matches():
    act1 = act_ids["episode3"]["act1"]
    act2 = act_ids["episode3"]["act2"]
    act3 = act_ids["episode3"]["act3"]
    with open(boomer_match_filename, "r") as infile:
        for line in infile:
            match_id = line.strip()
            if os.path.exists(os.path.join(data_dir, match_id + ".json")):
                continue
            with open(f"{data_dir}{match_id}.json", "w") as outfile:
                print(f"downloading {match_id}")
                match_type = "subject"
                res = download_match(match_id, act1, "subject")

                if len(res.content) == 0:
                    time.sleep(2)
                    res = download_match(match_id, act2, "subject")

                if len(res.content) == 0:
                    time.sleep(2)
                    res = download_match(match_id, act3, "subject")

                if len(res.content) == 0:
                    time.sleep(2)
                    match_type = "puuid"
                    res = download_match(match_id, act1, "puuid")

                if len(res.content) == 0:
                    time.sleep(2)
                    res = download_match(match_id, act2, "puuid")

                if len(res.content) == 0:
                    time.sleep(2)
                    res = download_match(match_id, act3, "puuid")

                if len(res.content) == 0:
                    print(f"Couldn't find match {match_id}")
                else:
                    json.dump({"match_type": match_type, "data": res.json()}, outfile)

                time.sleep(5)


download_boomer_matches()
