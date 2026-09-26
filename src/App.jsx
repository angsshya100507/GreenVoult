import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "./App.css";

/* =========================================================
   CITY DATA
   ========================================================= */

const cities = {
  Tiruchirappalli: {
    short: "Trichy",
    state: "Tamil Nadu",
    center: [10.7905, 78.7047],
    zoom: 13,
    visual: "trichy",
    landmark: "🏛️",
    trees: [
      {
        id: "trichy-1",
        name: "Tree - 1",
        location: "Rockfort",
        coords: [10.8261, 78.6956],
        solar: 5.2,
        wind: 3.6,
        status: "Online",
        weakMotor: 2,
      },
      {
        id: "trichy-2",
        name: "Tree - 2",
        location: "Srirangam",
        coords: [10.8624, 78.691],
        solar: 4.7,
        wind: 3.1,
        status: "Online",
        weakMotor: 4,
      },
      {
        id: "trichy-3",
        name: "Tree - 3",
        location: "Central Bus Stand",
        coords: [10.8155, 78.6856],
        solar: 4.1,
        wind: 2.8,
        status: "Maintenance",
        weakMotor: 3,
      },
    ],
  },

  Chennai: {
    short: "Chennai",
    state: "Tamil Nadu",
    center: [13.0827, 80.2707],
    zoom: 12,
    visual: "chennai",
    landmark: "🌊",
    trees: [
      {
        id: "chennai-1",
        name: "Tree - 1",
        location: "Marina Beach",
        coords: [13.05, 80.2824],
        solar: 5.8,
        wind: 4.2,
        status: "Online",
        weakMotor: 1,
      },
      {
        id: "chennai-2",
        name: "Tree - 2",
        location: "Guindy",
        coords: [13.0067, 80.2206],
        solar: 5.1,
        wind: 3.8,
        status: "Online",
        weakMotor: 3,
      },
      {
        id: "chennai-3",
        name: "Tree - 3",
        location: "Anna Nagar",
        coords: [13.085, 80.2101],
        solar: 4.6,
        wind: 3.4,
        status: "Online",
        weakMotor: 4,
      },
    ],
  },

  Coimbatore: {
    short: "Coimbatore",
    state: "Tamil Nadu",
    center: [11.0168, 76.9558],
    zoom: 12,
    visual: "coimbatore",
    landmark: "⛰️",
    trees: [
      {
        id: "coimbatore-1",
        name: "Tree - 1",
        location: "Gandhipuram",
        coords: [11.0168, 76.967],
        solar: 5.4,
        wind: 4.5,
        status: "Online",
        weakMotor: 2,
      },
      {
        id: "coimbatore-2",
        name: "Tree - 2",
        location: "RS Puram",
        coords: [11.005, 76.95],
        solar: 4.9,
        wind: 4.0,
        status: "Online",
        weakMotor: 1,
      },
      {
        id: "coimbatore-3",
        name: "Tree - 3",
        location: "Ukkadam",
        coords: [10.9885, 76.961],
        solar: 4.3,
        wind: 3.6,
        status: "Online",
        weakMotor: 4,
      },
    ],
  },

  Madurai: {
    short: "Madurai",
    state: "Tamil Nadu",
    center: [9.9252, 78.1198],
    zoom: 13,
    visual: "madurai",
    landmark: "🛕",
    trees: [
      {
        id: "madurai-1",
        name: "Tree - 1",
        location: "Mattuthavani",
        coords: [9.947, 78.128],
        solar: 5.5,
        wind: 3.5,
        status: "Online",
        weakMotor: 3,
      },
      {
        id: "madurai-2",
        name: "Tree - 2",
        location: "Anna Nagar",
        coords: [9.936, 78.145],
        solar: 4.8,
        wind: 3.2,
        status: "Online",
        weakMotor: 2,
      },
      {
        id: "madurai-3",
        name: "Tree - 3",
        location: "Periyar Bus Stand",
        coords: [9.917, 78.119],
        solar: 4.4,
        wind: 2.9,
        status: "Maintenance",
        weakMotor: 1,
      },
    ],
  },

  Salem: {
    short: "Salem",
    state: "Tamil Nadu",
    center: [11.6643, 78.146],
    zoom: 13,
    visual: "salem",
    landmark: "🌄",
    trees: [
      {
        id: "salem-1",
        name: "Tree - 1",
        location: "Salem Junction",
        coords: [11.656, 78.155],
        solar: 5.1,
        wind: 3.7,
        status: "Online",
        weakMotor: 2,
      },
      {
        id: "salem-2",
        name: "Tree - 2",
        location: "Hasthampatti",
        coords: [11.675, 78.14],
        solar: 4.7,
        wind: 3.3,
        status: "Online",
        weakMotor: 4,
      },
      {
        id: "salem-3",
        name: "Tree - 3",
        location: "Fairlands",
        coords: [11.673, 78.135],
        solar: 4.2,
        wind: 3.0,
        status: "Online",
        weakMotor: 1,
      },
    ],
  },

  Tirunelveli: {
    short: "Tirunelveli",
    state: "Tamil Nadu",
    center: [8.7139, 77.7567],
    zoom: 13,
    visual: "tirunelveli",
    landmark: "🌴",
    trees: [
      {
        id: "tirunelveli-1",
        name: "Tree - 1",
        location: "Palayamkottai",
        coords: [8.713, 77.756],
        solar: 5.7,
        wind: 4.1,
        status: "Online",
        weakMotor: 3,
      },
      {
        id: "tirunelveli-2",
        name: "Tree - 2",
        location: "Junction",
        coords: [8.735, 77.71],
        solar: 4.9,
        wind: 3.8,
        status: "Online",
        weakMotor: 1,
      },
      {
        id: "tirunelveli-3",
        name: "Tree - 3",
        location: "Melapalayam",
        coords: [8.705, 77.735],
        solar: 4.5,
        wind: 3.4,
        status: "Online",
        weakMotor: 4,
      },
    ],
  },

  Erode: {
    short: "Erode",
    state: "Tamil Nadu",
    center: [11.341, 77.7172],
    zoom: 13,
    visual: "erode",
    landmark: "🌾",
    trees: [
      {
        id: "erode-1",
        name: "Tree - 1",
        location: "Erode Junction",
        coords: [11.342, 77.727],
        solar: 5.2,
        wind: 4.0,
        status: "Online",
        weakMotor: 2,
      },
      {
        id: "erode-2",
        name: "Tree - 2",
        location: "Perundurai Road",
        coords: [11.315, 77.69],
        solar: 4.8,
        wind: 3.6,
        status: "Online",
        weakMotor: 3,
      },
      {
        id: "erode-3",
        name: "Tree - 3",
        location: "Bus Stand",
        coords: [11.34, 77.72],
        solar: 4.3,
        wind: 3.2,
        status: "Online",
        weakMotor: 4,
      },
    ],
  },

  Thanjavur: {
    short: "Thanjavur",
    state: "Tamil Nadu",
    center: [10.7867, 79.1378],
    zoom: 13,
    visual: "thanjavur",
    landmark: "🏯",
    trees: [
      {
        id: "thanjavur-1",
        name: "Tree - 1",
        location: "Big Temple",
        coords: [10.7828, 79.1318],
        solar: 5.3,
        wind: 3.5,
        status: "Online",
        weakMotor: 1,
      },
      {
        id: "thanjavur-2",
        name: "Tree - 2",
        location: "New Bus Stand",
        coords: [10.77, 79.14],
        solar: 4.7,
        wind: 3.2,
        status: "Online",
        weakMotor: 3,
      },
      {
        id: "thanjavur-3",
        name: "Tree - 3",
        location: "Medical College",
        coords: [10.76, 79.11],
        solar: 4.2,
        wind: 2.9,
        status: "Online",
        weakMotor: 4,
      },
    ],
  },
};

const cityNames = Object.keys(cities);

/* =========================================================
   HELPERS
   ========================================================= */

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, value));

const randomAround = (base, range) =>
  base + (Math.random() - 0.5) * range;

const makeHistory = (base, length = 30, range = 1) =>
  Array.from({ length }, () =>
    Number(
      clamp(randomAround(base, range), 0, 100).toFixed(2)
    )
  );

const treeIcon = L.divIcon({
  className: "custom-tree-marker",
  html: "🌳",
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

/* =========================================================
   NAVBAR
   ========================================================= */

function Navbar({
  page,
  goHome,
  goLocations,
  goAbout,
  goTechnology,
}) {
  return (
    <header className="navbar">
      <button className="logo" onClick={goHome}>
        <span>🌿</span> Green<span>Volt</span>
      </button>

      <nav>
        <button
          className={page === "home" ? "nav-active" : ""}
          onClick={goHome}
        >
          Home
        </button>

        <button
          className={
            ["locations", "city", "trees", "dashboard"].includes(
              page
            )
              ? "nav-active"
              : ""
          }
          onClick={goLocations}
        >
          Locations
        </button>

        <button
          className={page === "about" ? "nav-active" : ""}
          onClick={goAbout}
        >
          About
        </button>

        <button
          className={page === "technology" ? "nav-active" : ""}
          onClick={goTechnology}
        >
          Technology
        </button>
      </nav>

      <button
        className="view-location"
        onClick={goLocations}
      >
        📍 View Locations
      </button>
    </header>
  );
}

/* =========================================================
   HOME
   ========================================================= */

function Home({
  goHome,
  goLocations,
  goAbout,
  goTechnology,
}) {
  return (
    <div className="home-page">
      <Navbar
        page="home"
        goHome={goHome}
        goLocations={goLocations}
        goAbout={goAbout}
        goTechnology={goTechnology}
      />

      <section className="home-hero">
        <div className="home-overlay" />

        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="home-content">
          <div className="hero-badge">
            🌿 SMART RENEWABLE ENERGY
          </div>

          <h1>
            Green<span>Volt</span>
          </h1>

          <h2>
            Dual Mode
            <br />
            Solar-Wind Energy System
          </h2>

          <p className="home-tagline">
            Innovative <b>|</b> Sustainable <b>|</b>{" "}
            Smarter Communities
          </p>

          <p className="home-description">
            A compact solar-wind tree with smart monitoring,
            energy storage and intelligent performance
            tracking for cleaner communities.
          </p>

          <div className="hero-buttons">
            <button
              className="hero-primary"
              onClick={goLocations}
            >
              Explore Locations →
            </button>

            <button
              className="hero-secondary"
              onClick={goTechnology}
            >
              ⚙ View Technology
            </button>
          
        </div>

        
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   LOCATION CARD
   ========================================================= */

function CityVisual({ city }) {
  const cityImages = {
    Trichy: `${import.meta.env.BASE_URL}trichy.jpg`,
    Tiruchirappalli: `${import.meta.env.BASE_URL}trichy.jpg`,
    Chennai: `${import.meta.env.BASE_URL}chennai.jpg`,
    Coimbatore: `${import.meta.env.BASE_URL}coimbatore.jpg`,
    Madurai: `${import.meta.env.BASE_URL}madurai.jpg`,
    Salem: `${import.meta.env.BASE_URL}salem.jpg`,
    Tirunelveli: `${import.meta.env.BASE_URL}tirunelveli.jpg`,
    Erode: `${import.meta.env.BASE_URL}erode.jpg`,
    Thanjavur: `${import.meta.env.BASE_URL}thanjavur.jpg`,
  };

  return (
    <div className="city-visual">
      <img
        src={cityImages[city.short]}
        alt={city.short}
        className="city-location-image"
      />

      <div className="visual-label">
        {city.short}
      </div>
    </div>
  );
}

/* =========================================================
   LOCATIONS
   ========================================================= */

function LocationPage({
  selectCity,
  goHome,
  goAbout,
  goTechnology,
}) {
  const [search, setSearch] = useState("");

  const filteredCities = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return cityNames;

    return cityNames.filter((cityName) => {
      const city = cities[cityName];

      return (
        cityName.toLowerCase().includes(query) ||
        city.short.toLowerCase().includes(query) ||
        city.state.toLowerCase().includes(query)
      );
    });
  }, [search]);

  return (
    <div className="light-page">
      <Navbar
        page="locations"
        goHome={goHome}
        goLocations={() => {}}
        goAbout={goAbout}
        goTechnology={goTechnology}
      />

      <section className="location-page">
        <div className="page-top">
          <div>
            <span className="section-kicker">
              GREENVOLT NETWORK
            </span>

            <h1>Select Your Location</h1>

            <p>
              Explore GreenVolt trees, energy generation and
              live system information.
            </p>
          </div>

          <div className="network-count">
            <strong>{cityNames.length}</strong>
            <span>Active Cities</span>
          </div>
        </div>

        <div className="search-box">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Chennai, Madurai, Trichy..."
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        <div className="location-title-row">
          <div>
            <h2>Available Locations</h2>
            <span>
              Choose a city to view its GreenVolt network
            </span>
          </div>

          <b>{filteredCities.length} cities</b>
        </div>

        <div className="city-grid">
          {filteredCities.map((cityName) => {
            const city = cities[cityName];

            return (
              <button
                className="city-card"
                key={cityName}
                onClick={() => selectCity(cityName)}
              >
                <CityVisual city={city} />

                <div className="city-card-body">
                  <div className="city-card-title">
                    <div>
                      <h3>{cityName}</h3>
                      <span>
                        {city.short}, {city.state}
                      </span>
                    </div>

                    <div className="city-arrow">→</div>
                  </div>

                  <div className="city-card-stats">
                    <span>
                      🌳 {city.trees.length} Trees
                    </span>

                    <span>
                      ⚡{" "}
                      {city.trees
                        .reduce(
                          (sum, tree) =>
                            sum + tree.solar + tree.wind,
                          0
                        )
                        .toFixed(1)}{" "}
                      kW
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredCities.length === 0 && (
          <div className="no-results">
            <div>🔎</div>
            <h3>No city found</h3>
            <p>
              Try searching Chennai, Madurai, Trichy or
              Coimbatore.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

/* =========================================================
   MAP
   ========================================================= */

function MapResize() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

function CityMap({ city, onTree }) {
  return (
    <div className="real-map">
      <MapContainer
        center={city.center}
        zoom={city.zoom}
        scrollWheelZoom
        className="leaflet-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapResize />

        {city.trees.map((tree) => (
          <Marker
            key={tree.id}
            position={tree.coords}
            icon={treeIcon}
          >
            <Popup>
              <div className="map-popup">
                <strong>{tree.name}</strong>
                <span>📍 {tree.location}</span>
                <span>
                  ☀️ {tree.solar.toFixed(1)} kW
                </span>
                <span>
                  💨 {tree.wind.toFixed(1)} kW
                </span>

                <button onClick={() => onTree(tree)}>
                  Open Tree Dashboard →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

/* =========================================================
   CITY PAGE
   ========================================================= */

function CityPage({
  cityName,
  goHome,
  goLocations,
  goAbout,
  goTechnology,
  goTrees,
  openTree,
}) {
  const city = cities[cityName];

  const baseSolar = city.trees.reduce(
    (sum, tree) => sum + tree.solar,
    0
  );

  const baseWind = city.trees.reduce(
    (sum, tree) => sum + tree.wind,
    0
  );

  const [solarPower, setSolarPower] =
    useState(baseSolar);

  const [windPower, setWindPower] =
    useState(baseWind);

  useEffect(() => {
    const timer = setInterval(() => {
      setSolarPower(
        clamp(randomAround(baseSolar, 0.7), 0, 30)
      );

      setWindPower(
        clamp(randomAround(baseWind, 0.7), 0, 30)
      );
    }, 1800);

    return () => clearInterval(timer);
  }, [baseSolar, baseWind]);

  const activeTrees = city.trees.filter(
    (tree) => tree.status === "Online"
  ).length;

  return (
    <div className="light-page">
      <Navbar
        page="city"
        goHome={goHome}
        goLocations={goLocations}
        goAbout={goAbout}
        goTechnology={goTechnology}
      />

      <section className="city-page">
        <div className="city-heading">
          <div>
            <span className="section-kicker">
              CITY ENERGY NETWORK
            </span>

            <h1>
              📍 {cityName}
              {city.short !== cityName
                ? ` (${city.short})`
                : ""}
            </h1>

            <p>
              Live simulated GreenVolt generation and tree
              locations.
            </p>
          </div>

          <button onClick={goLocations}>
            ← Change Location
          </button>
        </div>

        <div className="stats">
          <div className="stat-card solar-stat">
            <div className="stat-icon">☀️</div>

            <div>
              <p>Total Solar Power</p>
              <strong>
                {solarPower.toFixed(1)} kW
              </strong>

              <small>● Live simulated</small>
            </div>
          </div>

          <div className="stat-card wind-stat">
            <div className="stat-icon">💨</div>

            <div>
              <p>Total Wind Power</p>
              <strong>
                {windPower.toFixed(1)} kW
              </strong>

              <small>● Live simulated</small>
            </div>
          </div>

          <div className="stat-card tree-stat">
            <div className="stat-icon">🌳</div>

            <div>
              <p>Active Trees</p>
              <strong>{activeTrees} Trees</strong>

              <small>
                {city.trees.length} deployed
              </small>
            </div>
          </div>
        </div>

        <div className="city-layout">
          <div className="panel power-panel">
            <div className="panel-heading">
              <div>
                <span className="mini-kicker">
                  LIVE SIMULATOR
                </span>

                <h2>Power Generation</h2>

                <p>
                  Current output from all GreenVolt trees
                </p>
              </div>

              <span className="live-pill">
                ● LIVE
              </span>
            </div>

            <div className="power-chart">
              <div className="power-y">
                <span>20</span>
                <span>15</span>
                <span>10</span>
                <span>5</span>
                <span>0</span>
              </div>

              <div className="power-bars">
                <div className="power-column">
                  <strong>
                    {solarPower.toFixed(1)} kW
                  </strong>

                  <div className="bar-track">
                    <div
                      className="power-bar solar-bar"
                      style={{
                        height: `${Math.min(
                          100,
                          (solarPower / 20) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <span>☀️ Solar</span>
                </div>

                <div className="power-column">
                  <strong>
                    {windPower.toFixed(1)} kW
                  </strong>

                  <div className="bar-track">
                    <div
                      className="power-bar wind-bar"
                      style={{
                        height: `${Math.min(
                          100,
                          (windPower / 20) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <span>💨 Wind</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel map-panel">
            <div className="panel-heading">
              <div>
                <span className="mini-kicker">
                  LOCATION TRACKING
                </span>

                <h2>Map View</h2>

                <p>
                  GreenVolt trees around {city.short}
                </p>
              </div>

              <span className="live-pill">
                ● MAP LIVE
              </span>
            </div>

            <CityMap
              city={city}
              onTree={openTree}
            />
          </div>
        </div>

        <div className="tree-locations">
          <div className="panel-heading">
            <div>
              <span className="mini-kicker">
                DEPLOYED SYSTEMS
              </span>

              <h2>Tree Locations</h2>

              <p>
                Select any GreenVolt tree to open its
                monitoring dashboard.
              </p>
            </div>
          </div>

          <div className="tree-location-list">
            {city.trees.map((tree) => (
              <button
                key={tree.id}
                onClick={() => openTree(tree)}
              >
                <div className="tree-location-icon">
                  🌳
                </div>

                <div className="tree-location-text">
                  <strong>{tree.name}</strong>
                  <span>📍 {tree.location}</span>
                </div>

                <div className="tree-energy">
                  <span>
                    ☀️ {tree.solar.toFixed(1)}
                  </span>

                  <span>
                    💨 {tree.wind.toFixed(1)}
                  </span>
                </div>

                <small
                  className={
                    tree.status === "Online"
                      ? "online"
                      : "maintenance"
                  }
                >
                  ● {tree.status}
                </small>

                <b>→</b>
              </button>
            ))}
          </div>
        </div>

        <button
          className="city-tree-button"
          onClick={goTrees}
        >
          View All Trees →
        </button>
      </section>
    </div>
  );
}

/* =========================================================
   TREES PAGE
   ========================================================= */

function TreesPage({
  cityName,
  selectedTree,
  setSelectedTree,
  openTree,
  goHome,
  goLocations,
  goCity,
  goAbout,
  goTechnology,
}) {
  const city = cities[cityName];

  return (
    <div className="light-page">
      <Navbar
        page="trees"
        goHome={goHome}
        goLocations={goLocations}
        goAbout={goAbout}
        goTechnology={goTechnology}
      />

      <section className="trees-page">
        <div className="trees-heading">
          <div>
            <span className="section-kicker">
              GREENVOLT TREE NETWORK
            </span>

            <h1>
              {cityName} GreenVolt Trees
            </h1>

            <p>
              {city.trees.length} deployed GreenVolt
              systems.
            </p>
          </div>

          <button onClick={goCity}>
            ← Back to Map
          </button>
        </div>

        <div className="trees-layout">
          <div className="tree-list">
            {city.trees.map((tree) => (
              <button
                key={tree.id}
                className={`tree-item ${
                  selectedTree?.id === tree.id
                    ? "tree-selected"
                    : ""
                }`}
                onClick={() => setSelectedTree(tree)}
              >
                <div className="mini-tree">
                  🌳
                </div>

                <div className="tree-item-text">
                  <strong>{tree.name}</strong>

                  <span>
                    📍 {tree.location}
                  </span>

                  <div className="tree-item-power">
                    <span>
                      ☀️ {tree.solar.toFixed(1)} kW
                    </span>

                    <span>
                      💨 {tree.wind.toFixed(1)} kW
                    </span>
                  </div>

                  <small
                    className={
                      tree.status === "Online"
                        ? "online"
                        : "maintenance"
                    }
                  >
                    ● {tree.status}
                  </small>
                </div>

                <span className="tree-item-arrow">
                  ›
                </span>
              </button>
            ))}
          </div>

          <div className="selected-tree-image">
            <img
              src={`${import.meta.env.BASE_URL}city2.jpg`}
              alt="GreenVolt Tree"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback =
                  e.currentTarget.parentElement.querySelector(
                    ".tree-photo-fallback"
                  );

                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />

            <div className="tree-photo-fallback">
              <div>🌳</div>
              <strong>GreenVolt</strong>
              <span>Smart Solar-Wind Tree</span>
            </div>

            <div className="tree-label">
              <div>
                <span className="tree-label-kicker">
                  SELECTED SYSTEM
                </span>

                <strong>
                  {selectedTree?.name}
                </strong>

                <span>
                  📍 {selectedTree?.location},{" "}
                  {cityName}
                </span>
              </div>

              <button
                onClick={() =>
                  openTree(selectedTree)
                }
              >
                Open Live Dashboard →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   SVG LIVE CHART
   ========================================================= */

function getPoints(values, width = 800, height = 220) {
  if (!values?.length) return "";

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x =
        (index / Math.max(values.length - 1, 1)) *
        width;

      const y =
        height -
        ((value - min) / range) *
          (height - 25) -
        12;

      return { x, y };
    });
}

function getSmoothPath(
  values,
  width = 800,
  height = 220
) {
  const points = getPoints(values, width, height);

  if (!points.length) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const previous = points[i - 1];
    const current = points[i];

    const midX =
      (previous.x + current.x) / 2;

    path +=
      ` C ${midX} ${previous.y},` +
      ` ${midX} ${current.y},` +
      ` ${current.x} ${current.y}`;
  }

  return path;
}
function LiveChart({
  title,
  values,
  secondValues,
  thirdValues,
  primaryLabel = "Value",
  secondLabel = "Second",
  thirdLabel = "Total",
  unit = "",
}) {
  return (
    <div className="live-chart-card">
      <div className="chart-header">
        <div>
          <h3>{title}</h3>
          <span>
            Live simulated sensor history
          </span>
        </div>

        <div className="chart-legend">
          <span>
            <i className="legend-primary" />
            {primaryLabel}
          </span>

          {secondValues && (
            <span>
              <i className="legend-secondary" />
              {secondLabel}
            </span>
          )}

          {thirdValues && (
            <span>
              <i className="legend-third" />
              {thirdLabel}
            </span>
          )}
        </div>
      </div>

      <div className="svg-chart">
        <svg
          viewBox="0 0 800 220"
          preserveAspectRatio="none"
        >
          {[30, 75, 120, 165, 210].map(
            (y) => (
              <line
                key={y}
                x1="0"
                x2="800"
                y1={y}
                y2={y}
                stroke="#dce9e5"
                strokeDasharray="4 6"
              />
            )
          )}

         {secondValues && (
  <path
    d={getSmoothPath(secondValues)}
    fill="none"
    stroke="#1687ed"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
)}

{thirdValues && (
  <path
    d={getSmoothPath(thirdValues)}
    fill="none"
    stroke="#13b968"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
)}

<path
  d={getSmoothPath(values)}
  fill="none"
  stroke="#e6a800"
  strokeWidth="4"
  strokeLinecap="round"
  strokeLinejoin="round"
/>
        </svg>
      </div>

      <div className="chart-footer">
        <span>40 min ago</span>
        <span>30 min</span>
        <span>20 min</span>
        <span>10 min</span>
        <span>Now</span>
      </div>
    </div>
  );
}

/* =========================================================
   MOTOR DATA
   ========================================================= */

function createMotors(tree) {
  return [1, 2, 3, 4].map((number) => {
    const weak = number === tree.weakMotor;

    return {
      id: number,
      rpm: weak ? 1280 : 1480 + number * 12,
      temperature: weak
        ? 43.5
        : 31 + number * 0.7,
      vibration: weak
        ? 4.1
        : 1.4 + number * 0.2,
      runtime: weak
        ? 2860
        : 1120 + number * 190,
      health: weak ? "Needs Maintenance" : "Healthy",
    };
  });
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard({
  tree,
  cityName,
  goTrees,
  goHome,
  goLocations,
}) {
  const [activeTab, setActiveTab] =
    useState("overview");

  const [solar, setSolar] =
    useState(tree.solar);

  const [wind, setWind] =
    useState(tree.wind);

  const [battery, setBattery] =
    useState(78);

  const [supercap, setSupercap] =
    useState(82);

  const [temperature, setTemperature] =
    useState(31.8);

  const [windSpeed, setWindSpeed] =
    useState(5.4);

  const [solarVoltage, setSolarVoltage] =
    useState(22.6);

  const [windVoltage, setWindVoltage] =
    useState(19.8);

  const [current, setCurrent] =
    useState(2.4);

  const [motors, setMotors] = useState(
    () => createMotors(tree)
  );

  const [solarHistory, setSolarHistory] =
    useState(() =>
      makeHistory(tree.solar, 32, 0.7)
    );

  const [windHistory, setWindHistory] =
    useState(() =>
      makeHistory(tree.wind, 32, 0.6)
    );

  const [windSpeedHistory, setWindSpeedHistory] =
    useState(() =>
      makeHistory(5.4, 32, 1.2)
    );

  const [batteryHistory, setBatteryHistory] =
    useState(() =>
      makeHistory(78, 32, 2)
    );

  const [solarVoltageHistory, setSolarVoltageHistory] =
    useState(() =>
      makeHistory(22.6, 32, 1)
    );

  const [windVoltageHistory, setWindVoltageHistory] =
    useState(() =>
      makeHistory(19.8, 32, 1)
    );

  const [currentHistory, setCurrentHistory] =
    useState(() =>
      makeHistory(2.4, 32, 0.5)
    );

  const [temperatureHistory, setTemperatureHistory] =
    useState(() =>
      makeHistory(31.8, 32, 1.2)
    );

  const [motorTempHistory, setMotorTempHistory] =
    useState(() =>
      makeHistory(
        motors.find(
          (motor) => motor.id === tree.weakMotor
        )?.temperature || 35,
        32,
        2
      )
    );

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSolar = clamp(
        randomAround(tree.solar, 0.8),
        0,
        8
      );

      const nextWind = clamp(
        randomAround(tree.wind, 0.7),
        0,
        8
      );

      const nextWindSpeed = clamp(
        randomAround(5.4, 1.0),
        1,
        12
      );

      const nextSolarVoltage = clamp(
        randomAround(22.6, 1.2),
        18,
        25
      );

      const nextWindVoltage = clamp(
        randomAround(19.8, 1.1),
        15,
        24
      );

      const nextCurrent = clamp(
        (nextSolar + nextWind) / 3 +
          randomAround(0, 0.2),
        0.5,
        6
      );

      const nextTemperature = clamp(
        randomAround(31.8, 1.2),
        25,
        40
      );

      const nextBattery = clamp(
  battery +
    (
      nextSolar + nextWind > 5
        ? 0.10 + Math.random() * 0.10
        : -0.06 - Math.random() * 0.06
    ),
  40,
  100
);

      setSolar(nextSolar);
      setWind(nextWind);
      setWindSpeed(nextWindSpeed);
      setSolarVoltage(nextSolarVoltage);
      setWindVoltage(nextWindVoltage);
      setCurrent(nextCurrent);
      setTemperature(nextTemperature);
      setBattery(nextBattery);

      setSupercap((old) =>
        clamp(
          old +
            (Math.random() > 0.5 ? 0.2 : -0.12),
          50,
          100
        )
      );

      setSolarHistory((old) => [
        ...old.slice(-31),
        Number(nextSolar.toFixed(2)),
      ]);

      setWindHistory((old) => [
        ...old.slice(-31),
        Number(nextWind.toFixed(2)),
      ]);

      setWindSpeedHistory((old) => [
        ...old.slice(-31),
        Number(nextWindSpeed.toFixed(2)),
      ]);

      setBatteryHistory((old) => [
        ...old.slice(-31),
        Number(nextBattery.toFixed(2)),
      ]);

      setSolarVoltageHistory((old) => [
        ...old.slice(-31),
        Number(nextSolarVoltage.toFixed(2)),
      ]);

      setWindVoltageHistory((old) => [
        ...old.slice(-31),
        Number(nextWindVoltage.toFixed(2)),
      ]);

      setCurrentHistory((old) => [
        ...old.slice(-31),
        Number(nextCurrent.toFixed(2)),
      ]);

      setTemperatureHistory((old) => [
        ...old.slice(-31),
        Number(nextTemperature.toFixed(2)),
      ]);

      setMotors((oldMotors) =>
        oldMotors.map((motor) => {
          const weak =
            motor.id === tree.weakMotor;

          const nextRPM = clamp(
            randomAround(
              weak ? 1280 : 1500,
              weak ? 80 : 35
            ),
            1000,
            1800
          );

          const nextTemp = clamp(
            randomAround(
              weak ? 43 : 33,
              weak ? 2 : 1
            ),
            25,
            55
          );

          const nextVibration = clamp(
            randomAround(
              weak ? 4 : 1.8,
              weak ? 0.5 : 0.25
            ),
            0.5,
            7
          );

          return {
            ...motor,
            rpm: nextRPM,
            temperature: nextTemp,
            vibration: nextVibration,
          };
        })
      );

      setMotorTempHistory((old) => {
        const weakMotor = motors.find(
          (motor) =>
            motor.id === tree.weakMotor
        );

        return [
          ...old.slice(-31),
          Number(
            (
              weakMotor?.temperature || 35
            ).toFixed(2)
          ),
        ];
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [tree.id, tree.solar, tree.wind]);

  const totalPower = solar + wind;

  const weakMotor = motors.find(
    (motor) => motor.id === tree.weakMotor
  );

  const navItems = [
    ["overview", "◉", "Overview"],
    ["solar", "☀️", "Solar Data"],
    ["wind", "💨", "Wind Data"],
    ["battery", "🔋", "Battery"],
    ["motors", "⚙️", "Motor Details"],
    ["graphs", "📈", "Live Graphs"],
    ["status", "✓", "System Status"],
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <button
          className="dashboard-logo"
          onClick={goHome}
        >
          🌿 Green<span>Volt</span>
        </button>

        <div className="dashboard-header-right">
          <span className="dashboard-location">
            📍 {cityName}
          </span>

          <button onClick={goLocations}>
            Locations
          </button>

          <button onClick={goTrees}>
            ← Back to Trees
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside>
          <div className="side-brand">
            <span>GREENVOLT</span>
            <strong>Tree Dashboard</strong>
          </div>

          {navItems.map(
            ([id, icon, label]) => (
              <button
                key={id}
                className={
                  activeTab === id
                    ? "side-active"
                    : ""
                }
                onClick={() =>
                  setActiveTab(id)
                }
              >
                <span>{icon}</span>
                {label}
              </button>
            )
          )}

          <div className="side-status">
            <span>●</span>
            System Online
          </div>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-title">
            <div>
              <span className="section-kicker">
                LIVE TREE MONITORING
              </span>

              <h1>
                {tree.name}
                <span>
                  {" "}
                  ({tree.location},{" "}
                  {cityName})
                </span>
              </h1>

              <p>
                GreenVolt Smart Tree Monitoring
                System
              </p>
            </div>

            <span
              className={
                tree.status === "Online"
                  ? "online-badge"
                  : "maintenance-badge"
              }
            >
              ● {tree.status}
            </span>
          </div>

          {weakMotor && (
            <div className="maintenance-alert">
              <div className="alert-icon">
                ⚠
              </div>

              <div>
                <strong>
                  Motor {weakMotor.id} needs
                  maintenance
                </strong>

                <p>
                  Abnormal vibration and higher
                  temperature detected. Please
                  inspect the motor.
                </p>
              </div>

              <span>
                Vibration{" "}
                {weakMotor.vibration.toFixed(1)}{" "}
                mm/s
              </span>
            </div>
          )}

          {activeTab === "overview" && (
            <>
              <DashboardCards
                solar={solar}
                wind={wind}
                battery={battery}
                supercap={supercap}
                temperature={temperature}
                windSpeed={windSpeed}
                solarVoltage={solarVoltage}
                current={current}
                motors={motors}
              />

              <div className="dashboard-graphs">
                <LiveChart
                  title="Power Generation"
                  values={solarHistory}
                  secondValues={windHistory}
                  thirdValues={solarHistory.map(
                    (value, index) =>
                      value +
                      windHistory[index]
                  )}
                  primaryLabel="Solar"
                  secondLabel="Wind"
                  thirdLabel="Total"
                  unit="kW"
                />

                <LiveChart
                  title="Wind Speed"
                  values={windSpeedHistory}
                  primaryLabel="Wind Speed"
                  unit="m/s"
                />
              </div>

              <div className="small-graphs">
                <MiniGraph
                  title="Battery"
                  values={batteryHistory}
                  suffix="%"
                  type="battery"
                />

                <MiniGraph
                  title="Solar Voltage"
                  values={
                    solarVoltageHistory
                  }
                  suffix=" V"
                  type="solar"
                />

                <MiniGraph
                  title="Wind Voltage"
                  values={
                    windVoltageHistory
                  }
                  suffix=" V"
                  type="wind"
                />

                <MiniGraph
                  title="Current"
                  values={currentHistory}
                  suffix=" A"
                  type="current"
                />

                <MiniGraph
                  title="Temperature"
                  values={
                    temperatureHistory
                  }
                  suffix=" °C"
                  type="temperature"
                />
              </div>

              <MotorDetails
  motors={motors}
  showHeader={false}
/>
            </>
          )}

          {activeTab === "solar" && (
            <section className="dashboard-section">
              <SectionTitle
                icon="☀️"
                title="Solar Data"
                text="Live solar generation and electrical parameters"
              />

              <div className="metric-highlight solar-highlight">
                <span>Current Solar Power</span>
                <strong>
                  {solar.toFixed(2)} kW
                </strong>
                <small>
                  ● Live simulated value
                </small>
              </div>

              <div className="metric-grid">
                <Metric
                  title="Solar Voltage"
                  value={`${solarVoltage.toFixed(
                    1
                  )} V`}
                />

                <Metric
                  title="Solar Current"
                  value={`${current.toFixed(
                    2
                  )} A`}
                />

                <Metric
                  title="Solar Power"
                  value={`${solar.toFixed(
                    2
                  )} kW`}
                />

                <Metric
                  title="Temperature"
                  value={`${temperature.toFixed(
                    1
                  )} °C`}
                />
              </div>

              <LiveChart
                title="Solar Power History"
                values={solarHistory}
                primaryLabel="Solar"
              />
            </section>
          )}

          {activeTab === "wind" && (
            <section className="dashboard-section">
              <SectionTitle
                icon="💨"
                title="Wind Data"
                text="Live wind turbine performance"
              />

              <div className="metric-highlight wind-highlight">
                <span>Current Wind Power</span>
                <strong>
                  {wind.toFixed(2)} kW
                </strong>
                <small>
                  ● Live simulated value
                </small>
              </div>

              <div className="metric-grid">
                <Metric
                  title="Wind Speed"
                  value={`${windSpeed.toFixed(
                    1
                  )} m/s`}
                />

                <Metric
                  title="Rotor RPM"
                  value={`${Math.round(
                    windSpeed * 29
                  )}`}
                />

                <Metric
                  title="Wind Voltage"
                  value={`${windVoltage.toFixed(
                    1
                  )} V`}
                />

                <Metric
                  title="Current"
                  value={`${current.toFixed(
                    2
                  )} A`}
                />
              </div>

              <LiveChart
                title="Wind Speed History"
                values={
                  windSpeedHistory
                }
                primaryLabel="Wind Speed"
              />

              <LiveChart
                title="Wind Power History"
                values={windHistory}
                primaryLabel="Wind"
              />
            </section>
          )}

          {activeTab === "battery" && (
            <section className="dashboard-section">
              <SectionTitle
                icon="🔋"
                title="Battery"
                text="Battery and energy storage monitoring"
              />

              <div className="battery-big">
                <div
                  className="battery-circle"
                  style={{
                    "--battery":
                      `${battery}%`,
                  }}
                >
                  <strong>
                    {battery.toFixed(0)}%
                  </strong>
                </div>

                <div className="battery-info">
                  <span>
                    ENERGY STORAGE
                  </span>

                  <h2>
                    Battery Status
                  </h2>

                  <p>
                    Battery is operating within
                    the normal simulated range.
                  </p>

                  <div className="battery-progress">
                    <div
                      style={{
                        width:
                          `${battery}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="metric-grid">
                <Metric
                  title="Battery Voltage"
                  value="25.1 V"
                />

                <Metric
                  title="Charging Current"
                  value={`${current.toFixed(
                    1
                  )} A`}
                />

                <Metric
                  title="Temperature"
                  value={`${temperature.toFixed(
                    1
                  )} °C`}
                />

                <Metric
                  title="Supercapacitor"
                  value={`${supercap.toFixed(
                    0
                  )}%`}
                />
              </div>

              <LiveChart
                title="Battery Percentage"
                values={batteryHistory}
                primaryLabel="Battery"
              />
            </section>
          )}

          {activeTab === "motors" && (
            <section className="dashboard-section">
              <SectionTitle
                icon="⚙️"
                title="Motor Details"
                text="Live motor health, RPM, temperature and vibration"
              />

              <div className="motor-summary">
                <div>
                  <span>Total Motors</span>
                  <strong>4</strong>
                </div>

                <div>
                  <span>Running</span>
                  <strong>4</strong>
                </div>

                <div>
                  <span>Healthy</span>
                  <strong>
                    {
                      motors.filter(
                        (motor) =>
                          motor.health ===
                          "Healthy"
                      ).length
                    }
                  </strong>
                </div>

                <div className="summary-warning">
                  <span>Maintenance</span>
                  <strong>
                    {
                      motors.filter(
                        (motor) =>
                          motor.health !==
                          "Healthy"
                      ).length
                    }
                  </strong>
                </div>
              </div>

              <MotorDetails
                motors={motors}
                large
              />

              <LiveChart
                title="Weak Motor Temperature"
                values={motorTempHistory}
                primaryLabel="Motor Temperature"
              />
            </section>
          )}

          {activeTab === "graphs" && (
            <section className="dashboard-section">
              <SectionTitle
                icon="📈"
                title="Live Graphs"
                text="Different sensor parameters with independent simulation behaviour"
              />

              <div className="graph-grid-full">
                <LiveChart
                  title="Solar Power"
                  values={solarHistory}
                  primaryLabel="Solar"
                />

                <LiveChart
                  title="Wind Power"
                  values={windHistory}
                  primaryLabel="Wind"
                />

                <LiveChart
                  title="Wind Speed"
                  values={
                    windSpeedHistory
                  }
                  primaryLabel="Speed"
                />

                <LiveChart
                  title="Battery"
                  values={batteryHistory}
                  primaryLabel="Battery"
                />

                <LiveChart
                  title="Solar Voltage"
                  values={
                    solarVoltageHistory
                  }
                  primaryLabel="Voltage"
                />

                <LiveChart
                  title="Wind Voltage"
                  values={
                    windVoltageHistory
                  }
                  primaryLabel="Voltage"
                />

                <LiveChart
                  title="Current"
                  values={
                    currentHistory
                  }
                  primaryLabel="Current"
                />

                <LiveChart
                  title="Temperature"
                  values={
                    temperatureHistory
                  }
                  primaryLabel="Temperature"
                />
              </div>
            </section>
          )}

          {activeTab === "status" && (
            <section className="dashboard-section">
              <SectionTitle
                icon="✓"
                title="System Status"
                text="Current GreenVolt tree health"
              />

              <div className="status-grid">
                <StatusRow
                  name="Solar Generation"
                  value="Normal"
                  ok
                />

                <StatusRow
                  name="Wind Generation"
                  value="Normal"
                  ok
                />

                <StatusRow
                  name="Battery"
                  value={`${battery.toFixed(
                    0
                  )}%`}
                  ok
                />

                <StatusRow
                  name="Supercapacitor"
                  value={`${supercap.toFixed(
                    0
                  )}%`}
                  ok
                />

                <StatusRow
                  name="24V DC Bus"
                  value="24.3 V"
                  ok
                />

                <StatusRow
                  name="Communication"
                  value="Connected"
                  ok
                />

                <StatusRow
                  name="Controller"
                  value="ESP32 Online"
                  ok
                />

                <StatusRow
                  name={`Motor ${tree.weakMotor}`}
                  value="Maintenance Required"
                  ok={false}
                />
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD CARDS
   ========================================================= */

function DashboardCards({
  solar,
  wind,
  battery,
  supercap,
  temperature,
  windSpeed,
  solarVoltage,
  current,
  motors,
}) {
  const healthyMotors = motors.filter(
    (motor) => motor.health === "Healthy"
  ).length;

  return (
    <div className="dashboard-cards">
      <div className="data-card solar-card">
        <span>☀️ Solar Power</span>

        <strong>
          {solar.toFixed(2)} kW
        </strong>

        <small>
          Voltage: {solarVoltage.toFixed(1)} V
        </small>

        <small>
          Current: {current.toFixed(2)} A
        </small>
      </div>

      <div className="data-card wind-card">
        <span>💨 Wind Power</span>

        <strong>
          {wind.toFixed(2)} kW
        </strong>

        <small>
          Wind Speed: {windSpeed.toFixed(1)} m/s
        </small>

        <small>
          Rotor RPM:{" "}
          {Math.round(windSpeed * 29)}
        </small>
      </div>

      <div className="data-card battery-card">
        <span>🔋 Battery</span>

        <strong className="green-text">
          {battery.toFixed(0)}%
        </strong>

        <small>Voltage: 25.1 V</small>

        <small>
          Charging: {current.toFixed(1)} A
        </small>
      </div>

      <div className="data-card super-card">
        <span>🔮 Supercapacitor</span>

        <strong className="purple-text">
          {supercap.toFixed(0)}%
        </strong>

        <small>Voltage: 24.6 V</small>

        <small>Current: 1.5 A</small>
      </div>

      <div className="data-card bus-card">
        <span>⚡ 24V DC Bus</span>

        <strong className="red-text">
          24.3 V
        </strong>

        <small>
          Total Load:{" "}
          {(solar + wind).toFixed(1)} kW
        </small>

        <small>
          Temperature:{" "}
          {temperature.toFixed(1)}°C
        </small>
      </div>

      <div className="data-card motor-card">
        <span>⚙️ Motor System</span>

        <strong className="motor-text">
          4 Motors
        </strong>

        <small>
          Healthy: {healthyMotors}/4
        </small>

        <small>
          {4 - healthyMotors > 0
            ? "⚠ Maintenance alert"
            : "✓ All motors healthy"}
        </small>
      </div>
    </div>
  );
}

/* =========================================================
   MINI GRAPH
   ========================================================= */

function MiniGraph({
  title,
  values,
  suffix,
  type,
}) {
  const last =
    values[values.length - 1] || 0;

  const stroke =
    type === "solar"
      ? "#e7a900"
      : type === "wind"
      ? "#1687ed"
      : type === "temperature"
      ? "#e65d2c"
      : "#13b968";

  return (
    <div className="small-graph-card">
      <div className="small-graph-title">
        <strong>{title}</strong>

        <span>
          {last.toFixed(1)}
          {suffix}
        </span>
      </div>

      <svg viewBox="0 0 300 90">
        <path
  d={getSmoothPath(values, 300, 90)}
  fill="none"
  stroke={stroke}
  strokeWidth="3"
  strokeLinecap="round"
  strokeLinejoin="round"
/>
      </svg>

      <small>
        Live history
      </small>
    </div>
  );
}

/* =========================================================
   MOTOR DETAILS
   ========================================================= */

function MotorDetails({
  motors,
  large = false,
  showHeader = true,
}) {
  const [selectedMotor, setSelectedMotor] =
    useState(null);

  return (
    <div
      className={`motor-details-panel ${
        large ? "motor-details-large" : ""
      }`}
    >
      {showHeader && (
  <div className="motor-panel-header">
    <div>
      <span className="mini-kicker">
        SMART DIAGNOSTICS
      </span>

      <h2>⚙️ Motor Details</h2>

      <p>
        Monitor motor performance and
        maintenance condition.
      </p>
    </div>

    <div className="motor-count-badge">
      {motors.length} Motors
    </div>
  </div>
)}

      <div className="motor-grid">
        {motors.map((motor) => {
          const healthy =
            motor.health === "Healthy";
            const isProblemMotor =
  !healthy && motor.id === 2;

          return (
            <div
  className={`motor-detail-card ${
    healthy
      ? ""
      : "motor-warning"
  } ${
    isProblemMotor
      ? "motor-problem-clickable"
      : ""
  }`}
  key={motor.id}
  onClick={
    isProblemMotor
      ? () => setSelectedMotor(motor)
      : undefined
  }
>
              <div className="motor-top">
                <div className="motor-icon">
                  ⚙️
                </div>

                <div>
                  <h3>
                    Motor {motor.id}
                  </h3>

                  <span
                    className={
                      healthy
                        ? "motor-online"
                        : "motor-maintenance"
                    }
                  >
                    ●{" "}
                    {healthy
                      ? "Running"
                      : "Check Required"}
                  </span>
                </div>
              </div>

              <div className="motor-values">
                <div>
                  <span>RPM</span>

                  <strong>
                    {Math.round(
                      motor.rpm
                    )}
                  </strong>
                </div>

                <div>
                  <span>Temperature</span>

                  <strong>
                    {motor.temperature.toFixed(
                      1
                    )}{" "}
                    °C
                  </strong>
                </div>

                <div>
                  <span>Vibration</span>

                  <strong>
                    {motor.vibration.toFixed(
                      2
                    )}{" "}
                    mm/s
                  </strong>
                </div>
              </div>

              <div className="motor-extra">
                <span>
                  Runtime{" "}
                  {Math.round(
                    motor.runtime
                  )} h
                </span>

                <b
                  className={
                    healthy
                      ? "health-good"
                      : "health-warning"
                  }
                >
                  {healthy
                    ? "✓ Healthy"
                    : "⚠ Maintenance"}
                </b>
              </div>
            </div>
          );
        })}
              
      </div>

      {selectedMotor && (
        <div
          className="motor-popup-overlay"
          onClick={() => setSelectedMotor(null)}
        >
          <div
            className="motor-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="motor-popup-close"
              onClick={() => setSelectedMotor(null)}
            >
              ×
            </button>

            <div className="motor-popup-icon">
              ⚠️
            </div>

            <span className="mini-kicker">
              MOTOR ALERT
            </span>

            <h3>
              Motor {selectedMotor.id} Maintenance
            </h3>

            <p className="motor-popup-status">
              ⚠ Check Required
            </p>

            <div className="motor-popup-grid">
              <div>
                <span>Temperature</span>
                <strong>
                  {selectedMotor.temperature.toFixed(1)} °C
                </strong>
              </div>

              <div>
                <span>Vibration</span>
                <strong>
                  {selectedMotor.vibration.toFixed(2)} mm/s
                </strong>
              </div>

              <div>
                <span>RPM</span>
                <strong>
                  {Math.round(selectedMotor.rpm)}
                </strong>
              </div>

              <div>
                <span>Runtime</span>
                <strong>
                  {Math.round(selectedMotor.runtime)} h
                </strong>
              </div>
            </div>

            <div className="motor-popup-reason">
              <strong>Why is there a problem?</strong>

              <p>
                High vibration and temperature are above
                the normal operating range. Maintenance
                inspection is recommended.
              </p>
            </div>

            <div className="motor-popup-duration">
              🔧 Maintenance inspection required
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   OTHER COMPONENTS
   ========================================================= */

function SectionTitle({
  icon,
  title,
  text,
}) {
  return (
    <div className="section-title">
      <div className="section-icon">
        {icon}
      </div>

      <div>
        <span className="mini-kicker">
          GREENVOLT MONITORING
        </span>

        <h2>{title}</h2>

        <p>{text}</p>
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="metric">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatusRow({
  name,
  value,
  ok,
}) {
  return (
    <div className="status-row">
      <div>
        <span
          className={
            ok
              ? "status-dot"
              : "status-dot warning-dot"
          }
        />

        <strong>{name}</strong>
      </div>

      <span
        className={
          ok
            ? "status-ok"
            : "status-warning"
        }
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   ABOUT
   ========================================================= */

function AboutPage({
  goHome,
  goLocations,
  goAbout,
  goTechnology,
}) {
  return (
    <div className="light-page">
      <Navbar
        page="about"
        goHome={goHome}
        goLocations={goLocations}
        goAbout={goAbout}
        goTechnology={goTechnology}
      />

      <section className="info-page">

        <div className="info-hero">
          <span>🌿 GreenVolt</span>

          <h1>
            Smart Energy for
            <br />
            Smarter Communities
          </h1>

          <p>
            GreenVolt combines solar and wind
            generation with smart monitoring,
            energy storage and city-level
            visualization.
          </p>
        </div>

        <div className="info-grid">

          <div className="info-card green-info">
            <span>☀️</span>

            <h2>Hybrid Generation</h2>

            <p>
              Solar and wind sources work together
              to provide renewable power.
            </p>
          </div>

          <div className="info-card blue-info">
            <span>📡</span>

            <h2>Smart Monitoring</h2>

            <p>
              Live simulated sensor information
              helps monitor system performance.
            </p>
          </div>

          <div className="info-card purple-info">
            <span>⚙️</span>

            <h2>Predictive Maintenance</h2>

            <p>
              Motor health indicators can identify
              systems that need inspection.
            </p>
          </div>

        </div>

        {/* ENVIRONMENTAL IMPACT */}

        <div className="environment-impact">

          <div className="environment-heading">
            <span>🌱 GREEN IMPACT</span>

            <h2>Environmental Impact</h2>

            <p>
              GreenVolt supports cleaner energy generation
              and smarter sustainable communities.
            </p>
          </div>

          <div className="impact-grid">

            <div className="impact-card impact-green">
              <div className="impact-icon">
                🍃
              </div>

              <div>
                <strong>248 kg</strong>
                <span>CO₂ Saved</span>
              </div>
            </div>

            <div className="impact-card impact-yellow">
              <div className="impact-icon">
                ⚡
              </div>

              <div>
                <strong>1,284 kWh</strong>
                <span>Clean Energy Generated</span>
              </div>
            </div>

            <div className="impact-card impact-tree">
              <div className="impact-icon">
                🌳
              </div>

              <div>
                <strong>58</strong>
                <span>Trees Equivalent</span>
              </div>
            </div>

            <div className="impact-card impact-blue">
              <div className="impact-icon">
                📊
              </div>

              <div>
                <strong>98.7%</strong>
                <span>System Uptime</span>
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}

/* =========================================================
   TECHNOLOGY
   ========================================================= */

function TechnologyPage({
  goHome,
  goLocations,
  goAbout,
  goTechnology,
}) {
  return (
    <div className="light-page">

      <Navbar
        page="technology"
        goHome={goHome}
        goLocations={goLocations}
        goAbout={goAbout}
        goTechnology={goTechnology}
      />

      <section className="info-page technology-page">

        <div className="info-hero">
          <span>⚙️ SMART TECHNOLOGY</span>

          <h1>
            GreenVolt Technology
          </h1>

          <p>
            Solar, wind, monitoring, storage,
            diagnostics and mapping brought
            together in one system.
          </p>
        </div>

        {/* TECHNOLOGY FLOW */}

        <div className="technology-flow">

          {/* LEFT SIDE */}

          <div className="tech-inputs">

            <div className="tech-flow-card solar-flow">
              <div className="flow-icon">
                ☀️
              </div>

              <div>
                <h3>Solar Panels</h3>

                <p>
                  Capture solar energy
                </p>
              </div>

              <span className="flow-arrow">
                →
              </span>
            </div>

            <div className="tech-flow-card wind-flow">
              <div className="flow-icon">
                💨
              </div>

              <div>
                <h3>Wind Turbines</h3>

                <p>
                  Generate wind energy
                </p>
              </div>

              <span className="flow-arrow">
                →
              </span>
            </div>

          </div>

          {/* CENTER */}

          <div className="tech-controller">

            <div className="controller-icon">
              ⚡
            </div>

            <h3>Smart Controller</h3>

            <p>
              Manages power flow
            </p>

          </div>

          {/* RIGHT SIDE */}

          <div className="tech-outputs">

            <div className="tech-output-card">
              <div className="output-icon battery-output">
                🔋
              </div>

              <div>
                <h3>Battery Storage</h3>

                <p>
                  Stores excess energy
                </p>
              </div>
            </div>

            <div className="tech-output-card">
              <div className="output-icon iot-output">
                📡
              </div>

              <div>
                <h3>IoT Monitoring</h3>

                <p>
                  Real-time data to cloud
                </p>
              </div>
            </div>

            <div className="tech-output-card">
              <div className="output-icon ai-output">
                🤖
              </div>

              <div>
                <h3>AI Analytics</h3>

                <p>
                  Predictive maintenance
                </p>
              </div>
            </div>

            <div className="tech-output-card">
              <div className="output-icon load-output">
                🏠
              </div>

              <div>
                <h3>Smart Load</h3>

                <p>
                  Powers lights and devices
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* TECHNOLOGY DESCRIPTION */}

        <div className="technology-bottom">

          <div className="tech-bottom-card">
            <span>🔋</span>

            <div>
              <h3>Energy Storage</h3>
              <p>
                Battery storage keeps renewable
                energy available when required.
              </p>
            </div>
          </div>

          <div className="tech-bottom-card">
            <span>📊</span>

            <div>
              <h3>Intelligent Monitoring</h3>
              <p>
                Sensors continuously monitor
                system performance and conditions.
              </p>
            </div>
          </div>

          <div className="tech-bottom-card">
            <span>⚙️</span>

            <div>
              <h3>Motor Diagnostics</h3>
              <p>
                RPM, temperature and vibration
                are monitored for maintenance.
              </p>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const [page, setPage] =
    useState("home");

  const [selectedCity, setSelectedCity] =
    useState("Tiruchirappalli");

  const [selectedTree, setSelectedTree] =
    useState(
      cities.Tiruchirappalli.trees[0]
    );

  const selectCity = (cityName) => {
    const city = cities[cityName];

    if (!city) return;

    setSelectedCity(cityName);
    setSelectedTree(city.trees[0]);
    setPage("city");
  };

  const openTree = (tree) => {
    setSelectedTree(tree);
    setPage("dashboard");
  };

  const goHome = () => setPage("home");

  const goLocations = () =>
    setPage("locations");

  const goCity = () =>
    setPage("city");

  const goTrees = () =>
    setPage("trees");

  const goAbout = () =>
    setPage("about");

  const goTechnology = () =>
    setPage("technology");

  return (
    <>
      {page === "home" && (
        <Home
          goHome={goHome}
          goLocations={goLocations}
          goAbout={goAbout}
          goTechnology={goTechnology}
        />
      )}

      {page === "locations" && (
        <LocationPage
          selectCity={selectCity}
          goHome={goHome}
          goAbout={goAbout}
          goTechnology={goTechnology}
        />
      )}

      {page === "city" && (
        <CityPage
          cityName={selectedCity}
          goHome={goHome}
          goLocations={goLocations}
          goAbout={goAbout}
          goTechnology={goTechnology}
          goTrees={goTrees}
          openTree={openTree}
        />
      )}

      {page === "trees" && (
        <TreesPage
          cityName={selectedCity}
          selectedTree={selectedTree}
          setSelectedTree={setSelectedTree}
          openTree={openTree}
          goHome={goHome}
          goLocations={goLocations}
          goCity={goCity}
          goAbout={goAbout}
          goTechnology={goTechnology}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          key={selectedTree.id}
          tree={selectedTree}
          cityName={selectedCity}
          goTrees={goTrees}
          goHome={goHome}
          goLocations={goLocations}
        />
      )}

      {page === "about" && (
        <AboutPage
          goHome={goHome}
          goLocations={goLocations}
          goAbout={goAbout}
          goTechnology={goTechnology}
        />
      )}

      {page === "technology" && (
        <TechnologyPage
          goHome={goHome}
          goLocations={goLocations}
          goAbout={goAbout}
          goTechnology={goTechnology}
        />
      )}
    </>
  );
}

export default App;