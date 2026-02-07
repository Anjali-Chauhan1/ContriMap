# 🗺️ ContriMap

![ContriMap Banner](https://img.shields.io/badge/ContriMap-AI%20Powered-blue?style=for-the-badge) [![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE) [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/) [![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)

AI-assisted guide that analyzes any public GitHub repo, surfaces beginner-friendly entry points, and presents the structure through interactive visualizations.

**Links:** [Features](#features) • [Installation](#installation) • [Usage](#usage) • [Tech Stack](#tech-stack) • [API](#api-endpoints) • [Contributing](#contributing)

---

## Features

- **AI repo analysis:** Groq-powered parsing of code structure, tech stack, data flow, and risks.
- **Interactive mind map:** ReactFlow graph colored by beginner friendliness with zoom and export.
- **Contribution guide:** Personalized setup steps, patterns, and PR checklist.
- **Issue scouting:** Surfaced `good first issue` tasks with metadata and quick GitHub deep links.
- **Guided UI:** Typewriter intro, 3D hero, liquid background, and responsive layout tuned for dark mode.
- **Explore mode:** Trending repos by topic with single-click analysis kickoff.

---

## Installation

### Prerequisites

- Node.js 18+
- MongoDB 6+
- Redis (for BullMQ workers)
- GitHub Personal Access Token (fine-grained repo read)
- Groq API key

### Quick Start

```bash
git clone https://github.com/yourusername/ContriMap.git
cd ContriMap

# Backend
cd backend
npm install
cp .env.example .env # or create manually
npm run dev

# Frontend (new terminal at repo root)
npm install
cp .env.example .env
npm run dev
```

`backend` listens on http://localhost:5000, `frontend` on http://localhost:5173.

### Environment Variables

**Backend**

| Key | Purpose | Example |
| --- | --- | --- |
| NODE_ENV | runtime mode | development |
| PORT | API port | 5000 |
| MONGODB_URI | Mongo connection | mongodb://localhost:27017/contrimap |
| GITHUB_TOKEN | GitHub PAT | ghp_xxx |
| GROQ_API_KEY | AI access | gsk_xxx |
| FRONTEND_URL | CORS origin | http://localhost:5173 |

**Frontend**

| Key | Purpose | Example |
| --- | --- | --- |
| VITE_API_URL | Backend base URL | http://localhost:5000/api |

---

## Usage

1. **Analyze**: paste a GitHub repo URL on the Analyze page and wait 10–30 seconds for inference.
2. **Mind Map**: inspect structure via drag, zoom, and node details. Green nodes highlight easier areas.
3. **AI Insights**: review overview, stack summary, key modules, and architecture callouts.
4. **Guide & Issues**: follow recommended onboarding steps, then claim surfaced beginner issues.
5. **Explore**: browse trending repos, filter by topic, and trigger new analyses quickly.

Tips: keep MongoDB and Redis running, and monitor worker logs under `backend/src/workers` for queue health.

---

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, Vite 7, Tailwind CSS, Framer Motion, React Router DOM, ReactFlow, Radix UI, React Three Fiber, Axios |
| Backend | Node.js, Express, MongoDB, Mongoose, BullMQ, ioredis, Helmet, Morgan |
| AI & APIs | Groq API, GitHub GraphQL + REST, Mermaid |
| DX | npm, nodemon, ESLint, Prettier |

Key dependencies and scripts live inside [`package.json`](package.json) and [`backend/package.json`](backend/package.json).

---

## Project Structure

```
ContriMap/
├── src/                # React app (components, pages, hooks, services)
├── public/             # Static assets
├── backend/
│   ├── src/
│   │   ├── analysis/   # structure + mind map builders
│   │   ├── ai/         # Groq integration
│   │   ├── controllers/routes/services
│   │   ├── queues/workers
│   │   └── server.js   # Express bootstrap
│   └── package.json
├── API.md | SETUP.md | DEPLOYMENT.md
└── README.md
```

---

## API Endpoints

**Repository (`/api/repos`)**

| Method | Path | Description |
| --- | --- | --- |
| POST | /api/repos/analyze | Queue a new analysis job |
| GET | /api/repos/analysis/:id/status | Check job status |
| GET | /api/repos/:owner/:name | Fetch analysis summary |
| GET | /api/repos/:owner/:name/issues/beginner | List curated issues |
| GET | /api/repos/search | Search repos by topic |

**Analysis (`/api/analysis`)**

| Method | Path | Description |
| --- | --- | --- |
| GET | /api/analysis/:owner/:name/mindmap | Graph data for ReactFlow |
| GET | /api/analysis/:owner/:name/insights | AI insight payload |
| GET | /api/analysis/:owner/:name/guide | Contribution guide text |
| POST | /api/analysis/:owner/:name/pr-checklist | Generate checklist |

Detailed payload schemas live in [API.md](API.md).

---

## Contributing

1. Fork + clone the repo.
2. Create a branch via `git checkout -b feature/name`.
3. Run lint + tests, update docs if behavior changes.
4. Push and open a Pull Request describing the change and linked issues.

Guidelines:

- Match existing code style and folder conventions.
- Prefer atomic commits with descriptive messages.
- Add comments where logic is non-obvious (state machines, parsers, queue orchestration).
- Ensure responsive UX and basic accessibility before submitting UI changes.

Issue ideas include bug fixes, feature enhancements, documentation polish, performance tuning, and better test coverage.

---

## License & Support

- Licensed under MIT. See [LICENSE](LICENSE).
- Questions or proposals? [Open an issue](https://github.com/yourusername/ContriMap/issues) or start a discussion.
- Extra references: [SETUP.md](SETUP.md) for deeper installation notes, [DEPLOYMENT.md](DEPLOYMENT.md) for hosting tips.

---

### Made with ❤️ for the open-source community.
