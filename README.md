# Jakob-kild.github.io
# Melbourne Nightlife Pedestrian Activity

This project explores Melbourne nightlife through pedestrian sensor data. The goal is to identify where and when weekend night-time pedestrian activity is strongest in the city.

The analysis uses City of Melbourne pedestrian counting data and sensor location metadata. The primary late-night metric is Friday and Saturday nights from 22:00 to 02:59, with after-midnight hours assigned to the previous nightlife date. A broader 18:00 to 05:00 window is used only for context animations that show how the night builds.

The project compares two views of nightlife activity:

- **Total nightlife count:** which sensors record the most weekend night movement.
- **Nightlife share:** which sensors have the highest proportion of their total activity during nightlife hours.

These outputs help test whether there is a clear project story before building the final website or interactive map.

## Data sources

The raw CSV files are not committed to this repository. Download them from:

- [Pedestrian Counting System - Monthly Counts per Hour](https://data.melbourne.vic.gov.au/explore/dataset/pedestrian-counting-system-monthly-counts-per-hour/information/)
- [Pedestrian Counting System - Sensor Locations](https://melbournetestbed.opendatasoft.com/explore/dataset/pedestrian-counting-system-sensor-locations/export/)

Place the downloaded files in `data/raw/` before rerunning the notebook.
