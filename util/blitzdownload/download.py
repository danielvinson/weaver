import requests
import json
import time

base_url = "https://valorant.iesdev.com/match/"
act_ids = {
    "episode3": {
        "act1": "2a27e5d2-4d30-c9e2-b15a-93b8909a442c",
        "act2": "4cb622e1-4244-6da3-7276-8daaf1c01be2",
    }
}

boomer_match_filename = "boomer_matches.txt"


def download_match(match_id, act_id, type):
    url = f"{base_url}{match_id}/?type={type}&actId={act_id}"
    res = requests.get(url)
    return res


def download_boomer_matches():
    act1 = act_ids["episode3"]["act1"]
    act2 = act_ids["episode3"]["act2"]
    with open("boomer_matches.txt", "r") as infile:
        for line in infile:
            match_id = line.strip()
            with open(f"{match_id}.json", "w") as outfile:
                print(f"downloading {match_id}")
                match_type = "subject"
                res = download_match(match_id, act1, "subject")
                if len(res.content) == 0:
                    time.sleep(2)
                    res = download_match(match_id, act2, "subject")

                if len(res.content) == 0:
                    time.sleep(2)
                    match_type = "puuid"
                    res = download_match(match_id, act1, "puuid")

                if len(res.content) == 0:
                    time.sleep(2)
                    res = download_match(match_id, act2, "puuid")

                if len(res.content) == 0:
                    print(f"Couldn't find match {match_id}")
                else:
                    json.dump({"match_type": match_type, "data": res.json()}, outfile)

                time.sleep(5)


download_boomer_matches()
