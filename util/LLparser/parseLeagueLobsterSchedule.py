from bs4 import BeautifulSoup
import json
import csv

def parse_page():
  res = []
  with open("super.html", "r") as ll_html:
    soup = BeautifulSoup(ll_html, 'html.parser')
    week_schedules = soup.find_all("div", class_="schedule-week")
    for week in week_schedules:
      week_number = week.attrs["data-week"]
      matches = week.find_all("div", class_="schedule-match")
      for match in matches:
        home_team_id, away_team_id = [id.strip() for id in match.attrs["data-teams"].strip("[]").split(",")]
        home_score = match.attrs["data-home_score"]
        away_score = match.attrs["data-away_score"]
        home_team_name = match.find("div", class_="home-team").getText(strip=True)
        away_team_name = match.find("div", class_="away-team").getText(strip=True)
        res.append({
          "week": week_number,
          "home_team_id": home_team_id,
          "away_team_id": away_team_id,
          "home_team_name": home_team_name,
          "away_team_name": away_team_name,
          "home_score": home_score,
          "away_score": away_score,
        })
  return res

def output_csv():
  data = parse_page()
  with open('super.csv', 'w') as csvfile:
    fieldnames = ['week', 'home_team_id', 'away_team_id', 'home_team_name', 'away_team_name', 'home_score', 'away_score']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for match in data:
      writer.writerow(match)

def output_json():
  with open("league.json", "w") as outfile:
    json.dump(parse_page(), outfile)

output_csv()
