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
git clone https://github.com/Anjali-Chauhan1/ContriMap.git
cd ContriMap

# Backend
cd backend
npm install
cp .env.example .env 
npm run dev

# Frontend (new terminal at repo root)
npm install
npm run dev
```

`backend` listens on http://localhost:5000, `frontend` on http://localhost:5173.

---

## Project Structure

```
ContriMap/
|- src/                      
|  |- components/
|  |  |- layout/              
|  |  |- repo/                
|  |  `- UI/                  
|  |- pages/                  
|  |- services/       
|  |- hooks/
|  |- lib/       
|  `- utils/
|- public/                    
|- backend/
|  |- src/
|  |  |- controllers/        
|  |  |- routes/              
|  |  |- services/            
|  |  |- analysis/            
|  |  |- ai/aiService.js      
|  |  |- github/client.js     
|  |  |- queues/ 
|  |  |- models/RepoAnalysis.js
|  |  |- config.js | db.js    
|  |  `- server.js           
|  `- package.json
`- components.json | vite.config.js | eslint.config.js
```


## Usage

1. **Analyze**: paste a GitHub repo URL on the Analyze page and wait 10–30 seconds for inference.
2. **Mind Map**: inspect structure via drag, zoom, and node details. Green nodes highlight easier areas.
3. **AI Insights**: review overview, stack summary, key modules, and architecture callouts.
4. **Guide & Issues**: follow recommended onboarding steps, then claim surfaced beginner issues.
5. **Explore**: browse trending repos, filter by topic, and trigger new analyses quickly.

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
- Questions or proposals? [Open an issue](https://github.com/AnjaliContriMap/issues) or start a discussion.
- Extra references: [SETUP.md](SETUP.md) for deeper installation notes, [DEPLOYMENT.md](DEPLOYMENT.md) for hosting tips.

---

### Made with ❤️ for the open-source community.
