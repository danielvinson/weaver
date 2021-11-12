# Weaver.gg

Weaver is a VALORANT webapp which can:

- Analyze player perfomance in individual games
- Track key statistics for any player across ranges of time
- Analyze stats for leagues or tournaments

## Architecture and project layout

### Frontend

The frontend handles all of the data analysis and displays it in in a way that is customizable. It is build using React (create-react-app) and is built using webpack.

### Util

There are a number of utils which help download data -

- blitzdownload is a tool to download match data from blitz.gg in bulk
- LLparser is a tool to parse LeagueLobster pages to get a JSON match schedule

## Contributing

I am always looking for help on this project. Feel free to reach out or open a PR with any changes, even something small like fixing a typo. If you want to help, but don't know what to work on, send me a message and I'll give you some ideas.
