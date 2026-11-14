# Beyond Earth 🚀
### NASA Space Apps Challenge — Interactive Solar System Museum

**Beyond Earth** is an immersive, scientifically authentic educational web platform that chronicles the human-made spacecraft, rovers, landers, and scientific instruments deployed across our solar system since the 1960s.

Designed for students, educators, and space enthusiasts, this digital museum connects real-time telemetry concepts, scientific discoveries, and historical milestones into an interactive space experience.

---

## 🌟 Key Features

1. **Solar System Explorer**: Interactive 3D & 2D orbital exploration of planets, moons, and deep space destinations hosting NASA hardware.
2. **Hardware Explorer**: Deep-dive profiles of iconic missions (Voyager 1 & 2, Curiosity, Perseverance, Cassini, New Horizons, Apollo 11, and more) with scientific payloads, launch stats, and verified sources.
3. **Mission Timeline**: Interactive chronological scrubber detailing pivotal moments from the 1960s to present day.
4. **Science Behind the Machine**: Student-friendly breakdowns explaining *how* deep-space technologies work (RTG nuclear batteries, the Deep Space Network, gravity assists, spectrometers).
5. **Mission Status Tracker**: Telemetry radar categorizing hardware into strict, verified operational states (`OPERATIONAL`, `INACTIVE_SURFACE`, `LOST_CONTACT`, `DEEP_SPACE_TRAVELLING`, `ATMOSPHERIC_ENTRY_DESTROYED`).
6. **Space Academy**: Gamified learning quizzes with difficulty tiers, immediate scientific feedback, and unlockable achievement badges.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Three.js / React Three Fiber, Lucide Icons.
- **Backend**: Node.js, Express.js REST API.
- **Data & Storage**: Supabase (PostgreSQL) with rich local NASA-verified seed archives.
- **External Data**: NASA NSSDCA, JPL Solar System Dynamics, NASA Open APIs.

---

## 📂 Project Structure

```text
beyond-earth/
├── client/          # React + Vite frontend application
├── server/          # Node.js + Express backend REST API
│   └── data/        # Verified NASA mission catalog & quiz seeds
├── docs/            # Architecture specifications & scientific references
└── README.md        # Getting started guide
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Backend Server Setup
```bash
cd server
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev
```
The client will start on `http://localhost:5173`.

---

## 📜 Scientific Sources & Accuracy
All spacecraft locations, launch dates, instrument specifications, and operational statuses are compiled and cross-verified against official NASA archives:
- NASA Space Science Data Coordinated Archive (NSSDCA)
- NASA Jet Propulsion Laboratory (JPL) Mission Archives
- NASA Planetary Data System (PDS)
