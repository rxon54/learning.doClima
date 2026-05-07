# doClima Learning Roadmap — Climate, GIS & Municipal Intelligence

> Structured self-study guide for Ericson. Prioritized by product relevance, not academic completeness.
> Created: 2026-05-05 by Spider 🕷️

---

## How to Use This

- **Learn by building.** Don't read textbooks cover to cover. Read enough to understand the next feature you're implementing.
- **Official docs > textbooks > courses.** You're building on Brazilian government data — the primary sources ARE the documentation.
- **15-30 min/day beats binge sessions.** Consistency > intensity.
- Each topic has: **why it matters for doClima**, **core concepts**, **specific resources**, and **a practical exercise** to solidify understanding.

---

## TIER 1: Core Knowledge (Weeks 1-4)

---

### 1.1 IPCC Risk Framework

**Why:** This is doClima's DNA. Every indicator, every petal, every data source maps back to this. AdaptaBrasil is an IPCC implementation.

**Core Concepts:**
- Risk = Hazard × Exposure × Vulnerability (AR5 definition)
- Vulnerability = Sensitivity × (lack of) Adaptive Capacity
- AR6 update: risk now includes "response" as a fourth element (possibility of maladaptation)
- SSP-RCP scenario matrix: SSPs are socioeconomic pathways, RCPs are radiative forcing levels. CMIP6 combines them.
- Key scenarios for Brazil: SSP2-4.5 (middle road, moderate mitigation) and SSP5-8.5 (fossil-fueled development)
- Adaptation vs mitigation vs loss & damage — three pillars of climate action

**Resources:**
1. **IPCC AR6 WGII — Summary for Policymakers** (2022)
   - Freely available at: https://www.ipcc.ch/report/ar6/wg2/
   - Read: Sections A (observed impacts), B (future risks), C (adaptation)
   - Focus on: Figures SPM.2 (key risks by region), SPM.3 (adaptation options)
   - Time: ~2 hours. This is the single most important document.

2. **IPCC AR6 WGII — Chapter 12: Central and South America**
   - Specific to our region. Covers projected risks for Brazil.
   - Focus on: Table 12.3 (key risks), Figure 12.3 (observed impacts)
   - Time: ~1.5 hours

3. **IPCC AR6 WGII — Chapter 16: Key Risks Across Sectors and Regions**
   - Explains how risk assessment works across the framework
   - Focus on: Section 16.2 (risk assessment methods)
   - Time: ~1 hour

4. **Concept: Exposure vs Sensitivity vs Adaptive Capacity**
   - Read the IPCC AR6 Glossary entries for each term
   - Cross-reference with AdaptaBrasil's petal structure (ameaça → hazard, exposição → exposure, sensibilidade → sensitivity, capacidade_adaptativa → adaptive capacity)
   - Practical: open the AdaptaBrasil indicator tree for a municipality and map each L2 area to the IPCC framework

**Practical Exercise:**
Pick a municipality you know (e.g., Curitiba). Pull its panorama data from the local API. Map every L2 risk area to the IPCC risk triad. Write down which petal is hazard, which is exposure, which is sensitivity, and which is adaptive capacity. You'll see the framework in action.

---

### 1.2 Brazilian Climate Adaptation Policy Stack

**Why:** doClima translates official Brazilian climate policy into usable intelligence. Understanding the policy stack makes you credible with government partners and helps you design features that align with what municipalities actually need.

**Core Concepts:**
- PNACC (Plano Nacional de Adaptação à Mudança do Clima) — the master plan
- The 9 national adaptation objectives (eixo temático + objetivo)
- AdaptaBrasil/MCTI — the official risk assessment platform
- Guia de Adaptação (MMA/GIZ, 3ª ed. 2025) — the methodology for municipal plans
- The 8-step municipal adaptation cycle
- Brazil's NDC (Nationally Determined Contribution) under the Paris Agreement
- Política Nacional sobre Mudança do Clima (Lei 12.187/2009, updated by Lei 12.965/2014 and the new climate law framework)

**Resources:**
1. **Guia de Adaptação — MMA/GIZ, 3ª edição (2025)**
   - You already have this: `~/projects/paineldoclima/guia_adaptacao_2025.pdf`
   - Framework synthesis: `~/projects/paineldoclima/context/guia_adaptacao_framework.md`
   - Read: the full 8-step cycle, the risk tables, the action typology
   - This is your operational Bible. Time: ~3 hours (it's dense but essential)

2. **PNACC — Plano Nacional de Adaptação**
   - Available at: https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/transformacaodigital/arquivos/plano-nacional-de-adaptacao
   - Read: the 9 thematic axes and their objectives
   - Time: ~1 hour

3. **AdaptaBrasil Platform**
   - https://adapatabrasil.mcti.gov.br/
   - Explore: the indicator structure, the methodology documents, the risk maps
   - Read the "Metodologia" section — explains how indicators are normalized to 0-1
   - Cross-reference with the data you already have in `data_painel.tar`
   - Time: ~2 hours of exploration

4. **Lei 12.187/2009 and the new Marco Legal do Clima**
   - Brazil's National Climate Change Policy
   - The 2024/2025 update creating a more robust legal framework
   - Search for "marco legal clima Brasil 2025" for current status
   - Time: ~30 min

**Practical Exercise:**
Take the 9 PNACC objectives and map each one to the AdaptaBrasil indicators you already have in `data_painel.tar`. Identify which objectives are well-covered by your data and which have gaps. This exercise directly informs the roadmap.

---

### 1.3 Spatial Data Fundamentals (GIS 101)

**Why:** You're working with gridded climate data, municipal polygons, and land use rasters. You don't need to be a GIS analyst, but you need to understand what your data represents spatially.

**Core Concepts:**
- **Coordinate Reference Systems (CRS):** How the 3D Earth becomes 2D data
  - SIRGAS 2000 (EPSG:4674) — Brazil's official datum, replaced Córrego Alegre
  - WGS84 (EPSG:4326) — what GPS and most international datasets use
  - Why they differ and when it matters (short answer: for municipal-scale work, the difference is small but real at boundaries)
- **Raster vs Vector:**
  - Raster = grid of pixels (CHIRPS precipitation, MapBiomas land use) — each pixel has a value
  - Vector = points, lines, polygons (IBGE municipality boundaries, river networks)
  - Climate data is raster. Administrative boundaries are vector. The intersection (zonal statistics) is how you get "average rainfall for municipality X"
- **Spatial Resolution:**
  - 0.05° ≈ 5.5 km at the equator, varies with latitude
  - 0.25° ≈ 27 km — coarse, good for national overviews
  - What this means: a single CHIRPS pixel may cover an entire small municipality or be a fraction of a large one
- **Spatial Interpolation:**
  - How point observations (weather stations) become continuous grids
  - Methods: nearest neighbor, bilinear, kriging, etc.
  - Why CHIRPS has better coverage than stations: it merges station data with satellite estimates
- **Map Projections:**
  - Why area, distance, shape, and direction can't all be preserved simultaneously
  - For Brazil: South America Albers Equal Area Conic preserves areas (good for calculating municipality sizes from MapBiomas data)

**Resources:**
1. **QGIS Documentation — Gentle GIS Introduction**
   - https://docs.qgis.org/latest/en/docs/gentle_gis_introduction/
   - Read: chapters on coordinate systems, vector data, raster data
   - Free, well-written, not software-specific in concepts
   - Time: ~2 hours

2. **Installing QGIS and exploring your own data**
   - Install QGIS: `sudo apt install qgis` or download from qgis.org
   - Load: IBGE municipality shapefile + CHIRPS GeoTIFF + MapBiomas raster
   - Practice: zonal statistics (average precipitation per municipality)
   - This is the single best way to build spatial intuition. Time: ~2-3 hours

3. **PROJ documentation — understanding datums and projections**
   - https://proj.org/en/stable/
   - Reference, not cover-to-cover reading
   - Useful when you encounter CRS conversion issues

4. **IBGE — Malha Municipal (municipal boundary shapefiles)**
   - https://www.ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais
   - Download and explore in QGIS. Note the SIRGAS 2000 datum.

**Practical Exercise:**
Download a CHIRPS GeoTIFF for a month (any month). Load it in QGIS alongside the IBGE municipal boundaries for one state. Use zonal statistics to compute average precipitation per municipality. Compare with what your CHIRPS skill returns. You'll understand exactly how "gridded data" becomes "municipal indicator."

---

### 1.4 Climate Variables and What They Mean

**Why:** You're deriving indicators from raw climate data. You need to know what a "hot night" vs "extreme heat day" means technically, and why SPI is used for drought instead of "below average rainfall."

**Core Concepts:**
- **Precipitation:**
  - Accumulated mm over a period (daily, monthly, annual, seasonal)
  - Climatological normal: 30-year average (currently 1991-2020)
  - Anomaly: deviation from the normal (positive = wetter, negative = drier)
  - SPI (Standardized Precipitation Index): probabilistic measure of how unusual the rainfall is. Negative = dry. -2.0 or below = extreme drought. It accounts for the fact that 50mm below normal means something very different in the Amazon vs the Sertão.
  - Return period: "a 1-in-100-year rainfall event" means 1% annual probability, NOT that it happens exactly every 100 years.

- **Temperature:**
  - Tmax (daily maximum) and Tmin (daily minimum) — the fundamental units
  - Trend: long-term change, usually measured in °C/decade
  - Extreme heat day: Tmax above a percentile threshold (commonly 90th or 95th percentile of the historical distribution)
  - Hot night: Tmin above a threshold (often 20°C or the 90th percentile). Hot nights matter because they prevent human bodies from recovering from daytime heat.
  - Heat index: "feels like" temperature — combines temperature and humidity
  - WBGT (Wet Bulb Globe Temperature): gold standard for occupational heat stress. Above 28°C = increased risk. Above 32°C = dangerous for manual labor. Above 35°C = lethal for humans regardless of hydration/shade (the "wet bulb" limit).

- **Drought:**
  - Meteorological drought: precipitation deficit (SPI)
  - Agricultural drought: soil moisture deficit (affects crops)
  - Hydrological drought: river/ reservoir deficit (affects water supply)
  - These are sequential — meteorological → agricultural → hydrological — with lags
  - SPEI (Standardized Precipitation-Evapotranspiration Index): like SPI but accounts for temperature-driven evaporation. Better in a warming world.

- **Extreme Events:**
  - Intensity-Duration-Frequency (IDF) curves: how much rain falls in how much time and how rare that is
  - Compound events: heat + drought, rain + wind, consecutive extremes
  - These are what municipalities experience — not gradual averages

**Resources:**
1. **WMO (World Meteorological Organization) — Guidelines on Climate Metadata and Homogenization**
   - Explains how climate variables are measured and standardized
   - https://library.wmo.int/
   - Time: ~1 hour (skim relevant sections)

2. **INMET — Glossário Meteorológico**
   - https://portal.inmet.gov.br/
   - Portuguese-language definitions of all meteorological terms
   - Reference tool, not cover-to-cover

3. **McKee, Doesken & Kleist (1993) — "The Relationship of Drought Frequency and Duration to Time Scales"**
   - The original SPI paper. Short, clear, foundational.
   - Explains why SPI at different timescales (1-month, 3-month, 12-month) captures different types of drought.
   - Available freely via Google Scholar. Time: ~30 min

4. **Sherwood & Huber (2010) — "An adaptability limit to climate change due to heat stress"**
   - The paper that established the 35°C wet-bulb limit
   - PNAS, freely available. Time: ~45 min

5. **ANA — Monitor de Secas (methodology)**
   - https://www.gov.br/ana/pt-br/assuntos/monitoramento-e-eventos-criticos/eventos-criticos/monitor-de-secas
   - Explains the 5-level drought classification used in Brazil
   - Time: ~30 min

**Practical Exercise:**
Take CHIRPS data for a municipality in the Semiárido (e.g., Juazeiro/BA). Calculate SPI-3 (3-month) for the last 20 years. Identify drought periods (SPI < -1.0). Cross-reference with S2ID disaster records if available. You'll see how "below average rainfall" becomes "drought emergency."

---

## TIER 2: Product-Critical Knowledge (Weeks 5-8)

---

### 2.1 Climate Data Sources — Nature, Strengths, Limitations

**Why:** You're making strategic data source decisions. Understanding what each source actually IS (not just its URL) prevents costly mistakes.

**Core Concepts:**
- **Observations** (station data): Ground truth but sparse. INMET, ANA networks. Coverage is uneven — dense in the South/Southeast, sparse in the Amazon.
- **Satellite estimates**: Cover everywhere but with uncertainty. CHIRPS, MERGE. Best for precipitation; temperature from satellite is harder.
- **Reanalysis**: Physics-based model that assimilates observations + satellite data. ERA5 is the gold standard. Not "observations" but very close. Good for variables that are hard to measure from space (temperature, humidity, wind).
- **Gridded observational products**: Blend stations + satellite + interpolation. CHIRPS and CHIRTS are this category. They aim to be "as good as station data, but everywhere."
- **Projections (GCMs/CMIP6)**: Physics-based simulations of future climate under different emission scenarios. Not predictions — conditional scenarios. Resolution is coarse (100+ km), needs downscaling for municipal use.
- **Bias correction**: Raw climate model output has systematic biases (e.g., always too wet in the Amazon). Statistical methods correct this using historical observations. AdaptaBrasil's data has been bias-corrected.
- **Downscaling**: Converting coarse global model output to finer resolution. Two approaches: dynamical (running a regional climate model — expensive, better) and statistical (using historical relationships — cheaper, more common).

**Resources:**
1. **CHIRPS documentation — Climate Hazards Center**
   - https://www.chc.ucsb.edu/data/chirps
   - Read: methodology section. Understand how it blends stations + satellite.
   - Time: ~30 min

2. **ERA5 documentation — Copernicus/ECMWF**
   - https://confluence.ecmwf.int/display/CKB/ERA5
   - Read: "What is ERA5" and "Known issues" sections
   - Time: ~30 min

3. **Funk et al. (2015) — "The climate hazards infrared precipitation with stations"** (CHIRPS paper)
   - Scientific Data, Nature. Open access.
   - Explains the CHIRPS methodology in detail. Time: ~45 min

4. **CMIP6 overview**
   - https://pcmdi.llnl.gov/CMIP6/
   - Read: the experimental design overview
   - Time: ~30 min (just the overview, not the full specs)

5. **Maraun & Widmann (2018) — "Statistical Downscaling and Bias Correction for Climate Research"**
   - Book, Cambridge University Press. If you want to go deep.
   - Alternatively: search for "bias correction climate data tutorial" on YouTube/YouTube for lecture content.
   - Reference as needed.

**Practical Exercise:**
For one municipality, compare CHIRPS annual precipitation with INMET station data (if available). Plot both. Note where they agree and diverge. This builds intuition for why gridded products have uncertainty.

---

### 2.2 The Existing Pillars: SEEG, MapBiomas, AdaptaBrasil

**Why:** These are your three main data sources. Knowing their internals means you can explain limitations, catch errors, and design better compound indicators.

**SEEG — Sistema de Estimativas de Emissões e Remoções de GEE:**
- Published by Observatório do Clima (civil society, not government)
- Covers all 5 sectors: Energy, Industrial Processes, Agriculture, Land Use Change (LULUCF), Waste
- Municipal-level is ESTIMATED for most sectors. Energy and Industry use proxy allocation (population, GDP). Only LULUCF has direct municipal data (via deforestation maps).
- Top municipal emitters are NOT big cities — they're Amazonian deforestation frontiers
- Collection: annual, ~2-year lag (2024 data available around 2026)
- Your DB: `seeg_emissions.db` (~91 MB)

**MapBiomas — Mapa de Cobertura e Uso da Terra:**
- Collection 9 (latest) covers 1985-2023
- 30m resolution, derived from Landsat satellite imagery
- Classification: ~30 land use classes (forest, pasture, agriculture, urban, water, etc.)
- Municipal data is aggregation of pixels within the municipal boundary
- Confidence varies: forest classification is very reliable, secondary vegetation and small-scale agriculture less so
- Deforestation data: gross (total cleared) vs net (cleared minus regrowth)
- Your DB: `mapbiomas.db` (~294 MB)

**AdaptaBrasil — Plataforma Nacional da Adaptação:**
- Published by MCTI
- Covers all 5,570 municipalities
- Risk areas (L2): ~30 thematic areas (floods, drought, heat, landslides, vector-borne diseases, etc.)
- Indicators normalized to 0-1 scale
- Two scenarios: optimistic (RCP 4.5/SSP2-4.5) and pessimistic (RCP 8.5/SSP5-8.5)
- Time horizons: 2030, 2040, 2050
- The `pessimist` flag per indicator handles the counter-intuitive cases (e.g., for adaptive capacity, "high" might be bad if it means high exposure to maladaptive infrastructure)
- Your data: `data_painel.tar` (5,570 × 378 indicators)

**Resources:**
1. **SEEG — Metodologia**
   - https://seeg.eco.br/metodologia
   - Read: the municipal estimation methodology for each sector
   - Time: ~1.5 hours

2. **MapBiomas — Metodologia (Collection 9)**
   - https://brasil.mapbiomas.org/metodologia/
   - Read: classification methodology, accuracy assessment
   - Time: ~1 hour

3. **AdaptaBrasil — Documentação Metodológica**
   - Available within the platform: https://adapatabrasil.mcti.gov.br/
   - Read: the indicator methodology documents
   - Time: ~1.5 hours

4. **Your own framework synthesis**
   - `~/projects/paineldoclima/context/guia_adaptacao_framework.md`
   - Already agent-ready. Re-read it with fresh eyes after studying the IPCC framework.

**Practical Exercise:**
Pick a Contradição Ampliada municipality (e.g., São Félix do Xingu/PA). Pull its data from all three sources. Trace the emissions back to their SEEG sector breakdown. Check which MapBiomas classes dominate the territory. Look at the AdaptaBrasil risk areas. Write a one-paragraph narrative connecting all three. This is what doClima does.

---

### 2.3 Vulnerability and Adaptive Capacity

**Why:** Layers 4 and 6 of the roadmap. This is where doClima becomes an adaptation tool, not just a risk visualization.

**Core Concepts:**
- Sensitivity: how much a system is affected by climate exposure (e.g., elderly population %, disease prevalence, low-income housing in risk areas)
- Adaptive capacity: ability of a system to adjust, moderate potential damage, take advantage of opportunities (e.g., GDP per capita, sanitation coverage, institutional capacity)
- Social Vulnerability Index (IVS): IBGE's composite index combining infrastructure, human capital, and income/work dimensions
- Climate justice: the recognition that vulnerability is not random — it correlates with poverty, race, gender, and historical exclusion
- Maladaptation: actions that reduce risk in the short term but increase it in the long term (e.g., building a seawall that displaces flooding downstream)

**Resources:**
1. **IPCC AR6 WGII — Chapter 8: Health, Wellbeing and the Changing Structure of Communities**
   - Covers vulnerability frameworks in depth
   - Time: ~1 hour (relevant sections)

2. **IBGE — Índice de Vulnerabilidade das Cidades Brasileiras aos Desastres Naturais Relacionados às Mudanças Climáticas**
   - Published by IBGE in collaboration with Cemaden
   - https://www.ibge.gov.br/
   - Directly relevant — municipal vulnerability assessment using Brazilian data
   - Time: ~1.5 hours

3. **Cutter, Boruff & Shirley (2003) — "Social Vulnerability to Environmental Hazards"**
   - Classic paper on social vulnerability indices
   - Explains the methodology behind most SVI approaches
   - Time: ~45 min

4. **AdaptaBrasil — petal 'sensibilidade' and 'capacidade_adaptativa'**
   - Explore the indicators within these two petals for a few municipalities
   - Note: many indicators are proxies (GDP per capita for economic capacity, hospital beds per capita for health system capacity)
   - Time: ~1 hour

**Practical Exercise:**
Compare two municipalities with similar hazard profiles but different development levels (e.g., a wealthy coastal city vs a poor one). Look at the adaptive capacity indicators. Identify which indicators actually capture "ability to respond" vs just "being wealthy." This will inform your Layer 6 design.

---

### 2.4 Disaster Risk Management in Brazil

**Why:** Layer 2 of the roadmap (S2ID/Atlas Digital). Before integrating disaster history, you need to understand what the data represents and its biases.

**Core Concepts:**
- **COBRADE** (Codificação Brasileira de Desastres): Brazilian disaster classification. Categories: natural (climatic, geological, biological) and technological. Relevant ones: 1.1 (drought), 1.2 (flood), 1.3 (flash flood), 1.4 (landslide), 1.5 (storm), 2.1 (epidemic).
- **S2ID/Atlas Digital**: National disaster database since 1991. Records: type, date, affected municipalities, deaths, homeless, displaced, economic losses, DEC/ECP declarations.
- **DEC (Decreto de Emergência)** vs **ECP (Estado de Calamidade Pública)**: DEC = situation can be managed with existing resources. ECP = resources overwhelmed. Both unlock federal aid, but ECP unlocks more.
- **Biases:**
  - Underreporting: municipalities without organized civil defense may not register events
  - Political incentives: declaring emergency unlocks federal funds, creating incentive to declare. Some municipalities are "perennially in emergency."
  - Data quality: death counts and economic loss estimates are notoriously unreliable
  - Temporal bias: reporting improved significantly after 2003 (Civil Defense modernization) and 2012 (S2ID digitalization)
- **Civil defense structure**: CENAD (national) → CEDEC (state) → COMDEC (municipal). Not all 5,570 municipalities have a functional COMDEC.

**Resources:**
1. **Atlas Digital de Desastres no Brasil**
   - https://atlasdigital.mdr.gov.br/
   - Explore: search by municipality, disaster type, year range
   - Time: ~1 hour of exploration

2. **COBRADE — Classificação e Codificação Brasileira de Desastres**
   - Available from Ministério da Integração e do Desenvolvimento Regional
   - Reference document. Time: ~20 min (skim the categories)

3. **UFSC/Ceped — Atlas Brasileiro de Desastres Naturais (1991-2012)**
   - The predecessor to the digital atlas. Good historical context.
   - https://ceroc.secretariadafazenda.sc.gov.br/ or search for "Ceped UFSC atlas desastres"
   - Time: ~1 hour (overview)

4. **Decreto 7.257/2010 — Política Nacional de Defesa Civil (updated)**
   - Legal framework for disaster management in Brazil
   - Time: ~30 min

5. **Cemaden — Centro Nacional de Monitoramento e Alertas de Desastres Naturais**
   - https://www.gov.br/cemaden/
   - Understand: what Cemaden monitors (hydrological and geological risk), coverage (~1,100 municipalities), and how alerts work
   - Time: ~30 min

**Practical Exercise:**
Look up a municipality that you know had a major disaster (e.g., Petrópolis/RJ — floods/landslides 2022, or the RS floods of 2024). Search in the S2ID Atlas. Note what's recorded: type, deaths, economic impact. Then compare with news coverage. The gaps between the database and reality are the data quality lesson.

---

## TIER 3: Strategic Depth (Months 3-4, as needed)

---

### 3.1 Municipal Governance and Climate Action in Brazil

**Why:** Layer 6 (capacidade de ação). If you're assessing whether a municipality can respond, you need to understand how Brazilian municipal governance works.

**Core Concepts:**
- **Estatuto da Cidade** (Lei 10.257/2001): requires municipalities >20,000 inhabitants to have a Plano Diretor
- **Plano Diretor**: master urban plan. Legally required, but quality varies enormously. Some are 20 years old and never updated.
- **Marco do Saneamento** (Lei 14.026/2020): updated sanitation framework. Targets: 99% water supply and 90% sewage collection by 2033. Ambitious, probably won't be met.
- **SNIS/SINISA**: sanitation data system. Coverage is decent for water/sewage but weak for solid waste and drainage.
- **PPA (Plano Plurianual)**, **LDO (Lei de Diretrizes Orçamentárias)**, **LOA (Lei Orçamentária Anual)**: how municipalities budget. PPA is the 4-year strategic plan. If climate adaptation isn't in the PPA, it won't get funded.
- **Municipal climate plans**: voluntary. Maybe 50-100 municipalities have one. Quality varies from "serious planning document" to "PDF written by a consultant that nobody reads."
- **Consórcios públicos**: inter-municipal partnerships. Important for watershed management and shared climate risks.

**Resources:**
1. **Guia de Adaptação — MMA/GIZ** (already listed in 1.2)
   - The 8-step cycle IS the municipal governance process
   - Read specifically about Step 4 (institutional arrangements) and Step 7 (implementation/funding)

2. **Ministério das Cidades — SNIS/SINISA**
   - https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/saneamento/snis
   - Explore the data portal. Note what's available at municipal level.

3. **Frente Nacional de Prefeitos — climate-related publications**
   - https://fnp.org.br/
   - Useful for understanding the municipal perspective on climate action

4. **ICLEI — Local Governments for Sustainability (Brazil office)**
   - https://iclei.org/
   - Publications on municipal climate planning in Brazil

5. **BNDES — Financiamento climático para municípios**
   - Understanding how federal climate finance reaches municipalities
   - https://www.bndes.gov.br/

**Practical Exercise:**
Pick a state capital. Find its Plano Diretor, PPA, and (if it exists) plano de clima/plano de adaptação. Assess: does this city have the institutional infrastructure to implement adaptation? What data would you need to automate this assessment for 5,570 municipalities?

---

### 3.2 Remote Sensing Basics

**Why:** MapBiomas, INPE/TerraBrasilis, and future fire monitoring are all remote sensing products.

**Core Concepts:**
- **Electromagnetic spectrum**: satellites measure reflected/emitted radiation in different bands (visible, infrared, microwave). Different surfaces reflect differently — this is how classification works.
- **Spatial resolution**: Landsat = 30m, Sentinel-2 = 10m, MODIS = 250-500m. Tradeoff: higher resolution = smaller coverage per image = more data.
- **Temporal resolution**: Landsat = every 16 days, Sentinel-2 = every 5 days, MODIS = daily. MapBiomas uses annual composites (best pixel per year) to avoid cloud cover issues.
- **Key missions:**
  - Landsat (NASA/USGS): 30m, since 1972. The backbone of historical land use analysis.
  - Sentinel-2 (ESA): 10m, since 2015. Higher resolution, better for recent analysis.
  - MODIS (NASA): 250m, daily since 2000. Good for fire detection (burned area) and vegetation monitoring (NDVI).
  - CBERS (China-Brazil): Brazil's own satellite program. Free data, moderate resolution.
- **Normalized indices:**
  - NDVI (Normalized Difference Vegetation Index): healthy vegetation vs bare soil. (NIR - Red) / (NIR + Red).
  - NBR (Normalized Burn Ratio): identifies burned areas.
  - NDWI (Normalized Difference Water Index): identifies water bodies.
- **Classification methods:** pixel-based vs object-based. Random forests and deep learning are common. MapBiomas uses a machine learning approach trained on manually classified samples.

**Resources:**
1. **NASA Earthdata — What is Remote Sensing?**
   - https://earthdata.nasa.gov/learn/what-is-remote-sensing
   - Clear, visual introduction. Time: ~30 min

2. **MapBiomas — Metodologia ( revisit from 2.2)**
   - Now read with remote sensing context: understand HOW the classification works, not just what it produces

3. **INPE — TerraBrasilis**
   - http://terrabrasilis.dpi.inpe.br/
   - Explore: PRODES (annual deforestation), DETER (near-real-time alerts), Queimadas (fire)
   - Note the "Sala de Situação Municipal" — municipal-level dashboards
   - Time: ~1 hour

4. **Google Earth Engine — Introduction**
   - https://earthengine.google.com/
   - Free for research. Allows you to query and analyze petabytes of satellite data without downloading.
   - Tutorials: https://developers.google.com/earth-engine/tutorials
   - If you want to prototype new remote sensing indicators, this is the tool. Time: 2-3 hours for basics.

**Practical Exercise:**
Open Google Earth Engine. Load Sentinel-2 imagery for a municipality you know. Compute NDVI. Look at the difference between forest and pasture/agriculture. This is the signal that MapBiomas' classifier uses. Understanding this builds intuition for classification accuracy and limitations.

---

### 3.3 Climate Modeling Fundamentals

**Why:** You're using projected climate data. You need to explain why two scenarios differ and why you can't say "this WILL happen."

**Core Concepts:**
- **GCMs (Global Climate Models):** Physics-based simulations of the atmosphere, ocean, land surface, and ice. Run at ~100-200 km resolution. There are ~40 models from different research centers worldwide.
- **CMIP6 (Coupled Model Intercomparison Project, Phase 6):** The coordinated experiment where all GCM groups run the same scenarios. This is what feeds into IPCC reports and AdaptaBrasil.
- **Ensemble:** Running multiple models on the same scenario. The spread between models = structural uncertainty. AdaptaBrasil likely uses ensemble means or percentiles.
- **Scenarios vs predictions:** Models don't predict the future. They answer "IF emissions follow this path, THEN the climate responds this way." SSP2-4.5 and SSP5-8.5 are two different "IFs."
- **Uncertainty cascade:**
  - Emission scenario uncertainty: we don't know what humanity will do
  - Model uncertainty: different models disagree on sensitivity
  - Natural variability: weather is chaotic, models only capture statistical properties
  - At 2050: model uncertainty and natural variability dominate. At 2100: scenario uncertainty dominates.
  - This is why 2050 projections for the same municipality can look similar across scenarios, while 2100 diverges sharply.
- **Downscaling for Brazil:**
  - Eta model (INPE): Brazil's regional climate model. Used for South America downscaling.
  - CORDEX-SA: coordinated downscaling experiment for South America.
  - AdaptaBrasil uses downscaled data — worth confirming which method.

**Resources:**
1. **IPCC AR6 WGI — Chapter 1: Framing, Context, Methods**
   - Explains how climate models work and what they can/can't do
   - Time: ~1 hour (relevant sections)

2. **NOAA — Climate Model Basics**
   - https://www.climate.gov/maps-data/primer/climate-models
   - Short, clear introduction. Time: ~20 min

3. **Chou et al. (2014) — "Evaluation of the Eta simulations..."** (Eta model for South America)
   - Paper on the Eta regional climate model used for Brazilian projections
   - Time: ~45 min

4. **CORDEX — Coordinated Regional Climate Downscaling Experiment**
   - https://cordex.org/
   - Explore the South America domain
   - Time: ~30 min

**Practical Exercise:**
Pick a municipality. Look at its AdaptaBrasil projections for both scenarios at 2030 and 2050. Note where they agree (high confidence) and where they diverge (low confidence). This is the practical output of the uncertainty cascade.

---

### 3.4 Environmental Economics and Climate Finance

**Why:** This is how you monetize. Grants, government contracts, and municipal subscriptions all require speaking the language of climate finance.

**Core Concepts:**
- **Social Cost of Carbon (SCC):** economic damage per ton of CO2 emitted. Current estimates: $50-200/ton. Used in cost-benefit analysis of adaptation measures.
- **Loss and Damage:** UNFCCC framework for climate impacts that can't be adapted to. Brazil is both a contributor (emissions) and a recipient (impacts). Politically sensitive.
- **Climate finance architecture:**
  - Multilateral: GCF (Green Climate Fund), GEF (Global Environment Facility), Adaptation Fund
  - Bilateral: GIZ (Germany), USAID, JICA (Japan), DFID (UK)
  - National: BNDES, Amazon Fund, National Climate Fund (FNMC)
  - Private: carbon markets, green bonds, ESG-motivated investment
- **TCFD/ISSB frameworks:** climate risk disclosure standards. Growing demand from companies and financial institutions. This is a potential market for doClima data — "municipal climate risk for supply chain assessment."
- **Adaptation economics:** cost of inaction vs cost of adaptation. Global Commission on Adaptation estimates $1.8 trillion investment in adaptation 2020-2030 generates $7.1 trillion in net benefits.
- **Brazil-specific:**
  - BNDES Finem Clima: main federal climate financing instrument
  - Funbio, GIZ Brazil: active bilateral climate programs
  - State-level: São Paulo's PPMA (Environmental Action Plan), Paraná's climate programs
  - Municipal: very few have dedicated climate budgets

**Resources:**
1. **Global Commission on Adaptation — "Adapt Now" (2019)**
   - https://gca.org/reports/adapt-now-a-global-call-for-leadership-on-climate-resilience/
   - The economic case for adaptation. Time: ~1 hour

2. **GCF (Green Climate Fund) — Project database**
   - https://www.greenclimate.fund/projects
   - Search for Brazil projects. Understand what gets funded and how. Time: ~30 min

3. **TCFD — Recommendations of the Task Force on Climate-related Financial Disclosures**
   - https://www.fsb-tcfd.org/
   - Read: the framework overview. This is how the private sector talks about climate risk. Time: ~45 min

4. **BNDES — Financiamento climático**
   - https://www.bndes.gov.br/wps/portal/site/home
   - Search for "clima" and "adaptação" in their programs. Time: ~30 min

5. **Your own grant pipeline**
   - `projects/grant_hunt/GRANTS.md`
   - Re-read with climate finance context. Map which grants align with which doClima layers.

**Practical Exercise:**
Write a one-page value proposition for doClima in TCFD language: "Physical risk assessment for Brazilian operations at municipal level." Imagine you're pitching to a bank or agribusiness company. This reframes the product from "climate data tool" to "financial risk assessment."

---

## TIER 4: Specialized / As Needed

---

### 4.1 Hydrology Basics

**When to study:** When you integrate ANA/HidroWeb data or build flood risk indicators.

**Key concepts:**
- Watershed/basin delineation: water flows downhill, so the basin defines the analysis unit, not the municipality
- Runoff coefficient: how much rainfall becomes surface water (depends on soil, slope, vegetation, urbanization)
- Return period and IDF curves for flood engineering
- Why precipitation ≠ flood risk: 50mm in a forested watershed = gentle rise. 50mm on compacted urban soil = flash flood.
- Reservoir operation curves and water supply reliability

**Resources:**
- ANA — HidroWeb and SNIRH documentation
- Brasileiro (2008) — "Hidrologia para engenheiros e cientistas ambientais" (good PT-BR textbook)

---

### 4.2 Urban Climate

**When to study:** When you build heat vulnerability indicators or work with state capitals.

**Key concepts:**
- Urban Heat Island (UHI): cities can be 3-8°C warmer than surrounding rural areas
- Urban canyon effect: tall buildings trap heat and reduce ventilation
- Evapotranspiration cooling: vegetation cools through water evaporation. Removing vegetation removes cooling.
- Green infrastructure ROI: trees, green roofs, permeable surfaces reduce both heat and flood risk

**Resources:**
- Oke (1987) — "Boundary Layer Climates" (classic urban climate textbook)
- Santamouris (2020) — "Recent progress on urban overheating and heat island research" (review article)

---

### 4.3 Time Series Analysis

**When to study:** When you compute trends from CHIRPS/CHIRTS data.

**Key concepts:**
- Mann-Kendall test: non-parametric trend test. Works for data that's not normally distributed (most climate data).
- Sen's slope: robust trend magnitude estimator. Less sensitive to outliers than linear regression.
- Break point detection: when a station moves, an instrument changes, or the surrounding land use changes, the time series has a discontinuity. Must be detected and corrected (homogenization).
- Baseline period: what "normal" means. Currently 1991-2020. Changes every decade.
- Autocorrelation: climate data has memory (wet years tend to follow wet years). Must account for this in significance testing.

**Resources:**
- Gilbert (1987) — "Statistical Methods for Environmental Pollution Monitoring" (covers Mann-Kendall and Sen's slope)
- INMET/ANA homogenization methodology documents

---

## Recommended Learning Schedule

| Week | Focus | Time/Day | Key Output |
|------|-------|----------|------------|
| 1 | IPCC AR6 WGII SPM + Chapter 12 | 30 min | Understand the framework your product is built on |
| 2 | Guia de Adaptação + AdaptaBrasil exploration | 30 min | Map PNACC objectives to your data |
| 3 | GIS basics (QGIS install + tutorial) | 45 min | Load your own data in QGIS, run zonal stats |
| 4 | Climate variables (SPI, WBGT, extremes) | 30 min | Calculate SPI for one municipality |
| 5 | Data source deep-dive (CHIRPS, ERA5, CMIP6) | 30 min | Compare CHIRPS vs INMET for one location |
| 6 | SEEG + MapBiomas methodology | 30 min | Trace the Contradição Ampliada for one city |
| 7 | Vulnerability + disaster databases | 30 min | Explore S2ID for a disaster-prone municipality |
| 8 | Brazilian municipal governance | 30 min | Assess one capital's institutional capacity |
| 9+ | Tier 3 topics as needed by feature work | ad hoc | Learn-then-build cycle |

**Total estimated time:** ~3-4 hours/week for 8 weeks ≈ 25-30 hours to build solid foundational knowledge.

---

## Quick Reference: Key Terms (PT-BR ↔ EN)

| PT-BR | EN | Context |
|-------|-----|---------|
| Ameaça | Hazard | The climate event (flood, drought, heat) |
| Exposição | Exposure | Who/what is in harm's way |
| Sensibilidade | Sensitivity | How much affected when exposed |
| Capacidade adaptativa | Adaptive capacity | Ability to cope and adjust |
| Vulnerabilidade | Vulnerability | Sensitivity × lack of adaptive capacity |
| Risco | Risk | Hazard × Exposure × Vulnerability |
| Adaptação | Adaptation | Adjusting to actual or expected climate |
| Mitigação | Mitigation | Reducing greenhouse gas emissions |
| Município | Municipality | 5,570 in Brazil |
| Decretação de emergência | Emergency declaration | DEC or ECP |
| Defesa civil | Civil defense | Disaster response system |
| Plano diretor | Master plan | Urban development plan |
| Plano de adaptação | Adaptation plan | Municipal climate adaptation strategy |
| Bacia hidrográfica | Watershed/basin | Hydrological analysis unit |
| Desmatamento | Deforestation | Clearing of native vegetation |
| Queimada | Burned area/fire | Can be natural or human-caused |
| Semiárido | Semi-arid | Northeast Brazil drought region |
| Mudanças climáticas | Climate change | Long-term shift in climate patterns |

---

*This is a living document. Update as you learn and as doClima's roadmap evolves.*
