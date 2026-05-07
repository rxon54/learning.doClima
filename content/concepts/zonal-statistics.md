# Zonal Statistics — Aggregating Raster Data to Polygons

The spatial operation that turns gridded (raster) data into municipal indicators. For each municipal polygon, it computes aggregate statistics (mean, sum, max, percentile) of all raster pixels falling within the boundary.

**Example:** average CHIRPS precipitation per municipality = mean of all 0.05° pixels whose center falls within the municipal boundary.

**Edge cases that matter:**
- Very small municipalities may contain only 1-2 pixels → high uncertainty
- Very large municipalities (Amazonian giants) average over highly heterogeneous terrain
- Pixel-boundary overlap: partial pixels are handled differently by different tools

**Used in:** [[1.3-gis-fundamentals]] · [[2.1-data-sources]]

→ Back to [[00-index]]
