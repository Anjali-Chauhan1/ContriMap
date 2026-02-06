# 🗺️ ContriMap - AI-Powered Open-Source Contribution Assistant

<div align="center">

![ContriMap Banner](https://img.shields.io/badge/ContriMap-AI%20Powered-blue?style=for-the-badge)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)

**Making open-source contribution accessible to everyone through AI-powered guidance and interactive visualizations**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [API](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 🎯 What ContriMap Does

Open-source contribution can be overwhelming:
- ❌ Complex codebases are hard to understand
- ❌ Unclear where to start contributing
- ❌ Repository structure is confusing
- ❌ No guidance on solving issues

**ContriMap solves this** by providing:
- ✅ AI-powered repository analysis with Groq
- ✅ Interactive visual mind maps of code structure
- ✅ Step-by-step contribution guides
- ✅ Beginner-friendly issue recommendations
- ✅ Beautiful 3D animations and modern UI

---

## 🔥 Features

### 🏠 **Immersive Home Experience**
- Stunning typewriter animation sequence
- 3D animated logo with Three.js
- Liquid ether background effects
- Interactive insight robot
- Smooth page transitions

### 🔍 **Repository Analysis**
- Analyze any public GitHub repository
- AI-powered code structure understanding
- Automatic tech stack detection
- Module and component identification
- Data flow analysis

### 🧠 **Interactive Mind Map**
- Visual representation of repository structure
- ReactFlow-powered interactive nodes
- Color-coded beginner-friendly areas
- Zoom, pan, and explore capabilities
- Export mind maps for reference

### 🤖 **AI-Powered Insights** (Powered by Groq)
- Comprehensive project overview
- Tech stack breakdown
- Main components analysis
- Architecture patterns identification
- Key files and folders highlighting
- Fast AI inference for quick results

### 📖 **Contribution Guide**
- Getting started steps
- Setup instructions
- Development environment setup
- Beginner-friendly areas identification
- Common code patterns
- Best practices

### 🎯 **Beginner-Friendly Issues**
- Automatically finds "good first issue" labels
- Displays issue metadata and labels
- Priority and difficulty indicators
- Direct links to GitHub issues
- Filtered by skill level

### 🚀 **Explore Page**
- Browse popular repositories
- Search repositories by topic
- Trending open-source projects
- Quick access to analysis

### 📚 **Guide Section**
- Learn about open-source contribution
- Best practices and tips
- Step-by-step tutorials
- Community guidelines

### 🎨 **Modern UI/UX**
- Glassmorphism design
- Dark mode optimized
- Smooth animations with Framer Motion
- Responsive on all devices
- Beautiful gradients and effects
- Accessible components with Radix UI

---

## 🚀 Demo

### Home Page
Beautiful landing page with animated hero section and feature showcase.

### Repository Analysis
Enter any GitHub URL and get instant AI-powered analysis.

### Mind Map Visualization
Interactive, zoomable mind map of repository structure.

### AI Insights Dashboard
Comprehensive breakdown of repository architecture.

---

## 📦 Installation

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** v6 or higher
- **npm** or **yarn** package manager
- **GitHub Personal Access Token** ([Create one here](https://github.com/settings/tokens))
- **Groq API Key** ([Get it here](https://console.groq.com/))

### Quick Start

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ContriMap.git
cd ContriMap
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in the `backend` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contrimap
GITHUB_TOKEN=your_github_personal_access_token
GROQ_API_KEY=your_groq_api_key
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

#### 3. Frontend Setup

Open a new terminal in the project root:
```bash
npm install
```

Create `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

#### 4. Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
```

### Environment Variables

#### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Backend server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `GITHUB_TOKEN` | GitHub PAT for API access | Yes |
| `GROQ_API_KEY` | Groq API key for AI features | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

#### Frontend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |

---

## 🎮 Usage

### Getting Started

1. **Home Page**
   - Experience the immersive typewriter animation
   - Interact with the 3D logo and robot
   - Navigate to analysis or explore sections

2. **Analyze a Repository**
   - Click **"Analyze"** in the navigation
   - Enter a GitHub repository URL (e.g., `https://github.com/facebook/react`)
   - Click **"Analyze Repository"**
   - Wait for AI analysis (typically 10-30 seconds)

3. **Explore Mind Map**
   - Navigate to the **"Mind Map"** tab in the repo detail page
   - Interact with the visualization:
     - **Drag** to pan around
     - **Scroll** to zoom in/out
     - **Click nodes** to see details
   - Green nodes indicate beginner-friendly areas
   - Use controls to adjust view

4. **View AI Insights**
   - Go to **"AI Insights"** tab
   - Read comprehensive analysis including:
     - Project overview and purpose
     - Tech stack breakdown
     - Main components and modules
     - Data flow and architecture
     - Key files and directories

5. **Follow Contribution Guide**
   - Visit the **"Contribute"** tab
   - Follow personalized guidance:
     - Setup instructions
     - Getting started steps
     - Beginner-friendly areas
     - Common patterns and practices

6. **Find Issues to Work On**
   - Check the **"Overview"** tab
   - Browse beginner-friendly issues
   - Filter by difficulty and labels
   - Click to view on GitHub
   - Start your first contribution!

7. **Explore Repositories**
   - Visit the **"Explore"** page
   - Browse trending repositories
   - Search by topics or keywords
   - Quick analyze popular projects

---

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 19** - Latest React with modern hooks
- **⚡ Vite 7** - Lightning-fast build tool
- **🎨 Tailwind CSS 4** - Utility-first CSS framework
- **🎭 Framer Motion** - Production-ready animations
- **🔀 React Router DOM 7** - Client-side routing
- **🌊 ReactFlow** - Interactive mind map visualization
- **🎯 Radix UI** - Accessible component primitives
- **🔮 Three.js + React Three Fiber** - 3D graphics and animations
- **📡 Axios** - HTTP client for API calls
- **🎨 Lucide React** - Beautiful icon library

### Backend
- **🟢 Node.js** - JavaScript runtime
- **🚂 Express.js** - Web application framework
- **🍃 MongoDB** - NoSQL database
- **📦 Mongoose** - MongoDB ODM
- **🐂 BullMQ** - Background job processing
- **⚡ IORedis** - Redis client for caching
- **🔒 Helmet** - Security middleware
- **⏱️ Morgan** - HTTP request logger
- **🛡️ Rate Limiting** - API protection

### APIs & Services
- **🐙 GitHub GraphQL API** - Repository data and structure
- **🐙 GitHub REST API** - Issues, files, and metadata
- **🤖 Groq API** - Ultra-fast AI inference
- **📄 Mermaid** - Diagram generation

### Development & DevOps
- **📦 npm** - Package management
- **🔧 nodemon** - Auto-restart development server
- **🔍 ESLint** - Code linting
- **🎨 Prettier** - Code formatting

### Key Dependencies

#### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI library |
| vite | ^7.2.4 | Build tool |
| tailwindcss | ^4.1.18 | Styling |
| framer-motion | ^12.29.2 | Animations |
| reactflow | ^11.11.4 | Mind maps |
| three | ^0.167.1 | 3D graphics |
| axios | ^1.13.4 | HTTP client |

#### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| mongoose | ^8.0.3 | MongoDB ODM |
| groq-sdk | ^0.3.0 | AI service |
| bullmq | ^5.0.0 | Job queue |
| @octokit/graphql | ^7.0.2 | GitHub API |

---

## 📁 Project Structure

```
ContriMap/
│
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   │   └── Footer.jsx          # Footer component
│   │   │   ├── repo/
│   │   │   │   ├── MindMap.jsx         # Interactive mind map
│   │   │   │   ├── AIInsights.jsx      # AI analysis display
│   │   │   │   ├── ContributionGuide.jsx
│   │   │   │   ├── BeginnerIssues.jsx  # Issue listing
│   │   │   │   └── PRChecklist.jsx     # PR checklist generator
│   │   │   └── UI/                     # ✨ All animations & 3D components
│   │   │       ├── ThreeD/
│   │   │       │   ├── Logo3D.jsx          # 3D animated logo
│   │   │       │   └── InsightRobot.jsx    # Interactive 3D robot
│   │   │       ├── LiquidEther/
│   │   │       │   ├── index.jsx           # Liquid background animation
│   │   │       │   └── LiquidEther.css
│   │   │       ├── LaserFlow/
│   │   │       │   ├── index.jsx           # Laser flow effects
│   │   │       │   ├── LaserFlow.jsx
│   │   │       │   └── LaserFlow.css
│   │   │       ├── TypewriterSequence.jsx  # Animated typewriter
│   │   │       └── button.jsx              # Button component
│   │   ├── pages/
│   │   │   ├── Home.jsx                # Landing page
│   │   │   ├── Analyze.jsx             # Repository analysis
│   │   │   ├── RepoDetail.jsx          # Repository details
│   │   │   ├── Explore.jsx             # Browse repositories
│   │   │   └── Guide.jsx               # Contribution guide
│   │   ├── services/
│   │   │   └── api.js                  # API client
│   │   ├── hooks/
│   │   │   └── use-outside-click.jsx   # Custom hooks
│   │   ├── utils/
│   │   │   └── helpers.js              # Utility functions
│   │   ├── assets/                     # Images, fonts, etc.
│   │   ├── App.jsx                     # Main app component
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── repoController.js       # Repository logic
│   │   │   └── analysisController.js   # Analysis logic
│   │   ├── models/
│   │   │   └── RepoAnalysis.js         # MongoDB schema
│   │   ├── routes/
│   │   │   ├── repoRoutes.js           # Repository endpoints
│   │   │   └── analysisRoutes.js       # Analysis endpoints
│   │   ├── services/
│   │   │   └── analysisService.js      # Analysis service
│   │   ├── github/
│   │   │   └── client.js               # GitHub API client
│   │   ├── analysis/
│   │   │   ├── structureParser.js      # Code structure parser
│   │   │   ├── codeParser.js           # Code analysis
│   │   │   └── mindmapBuilder.js       # Mind map generator
│   │   ├── ai/
│   │   │   └── aiService.js            # Groq AI integration
│   │   ├── queues/
│   │   │   └── analysisQueue.js        # Job queue setup
│   │   ├── workers/
│   │   │   └── analysisWorker.js       # Background workers
│   │   ├── config.js                   # Configuration
│   │   ├── db.js                       # Database connection
│   │   └── server.js                   # Express server
│   └── package.json
│
├── .gitignore
├── README.md
├── API.md                      # API documentation
├── SETUP.md                    # Setup guide
├── DEPLOYMENT.md               # Deployment guide
└── components.json             # Shadcn config
```

---

## 🔑 API Endpoints

### Repository Endpoints (`/api/repos`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/repos/analyze` | Analyze a GitHub repository |
| `GET` | `/api/repos/analysis/:id/status` | Get analysis job status |
| `GET` | `/api/repos/:owner/:name` | Get repository analysis data |
| `GET` | `/api/repos/:owner/:name/issues/beginner` | Get beginner-friendly issues |
| `GET` | `/api/repos/search` | Search repositories |

### Analysis Endpoints (`/api/analysis`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/analysis/:owner/:name/mindmap` | Get mind map visualization data |
| `GET` | `/api/analysis/:owner/:name/insights` | Get AI-generated insights |
| `GET` | `/api/analysis/:owner/:name/guide` | Get contribution guide |
| `POST` | `/api/analysis/:owner/:name/pr-checklist` | Generate PR checklist |

### Example Requests

**Analyze a Repository:**
```bash
POST http://localhost:5000/api/repos/analyze
Content-Type: application/json

{
  "repoUrl": "https://github.com/facebook/react"
}
```

**Get Mind Map:**
```bash
GET http://localhost:5000/api/analysis/facebook/react/mindmap
```

**Get AI Insights:**
```bash
GET http://localhost:5000/api/analysis/facebook/react/insights
```

For detailed API documentation, see [API.md](API.md).

---

## 🎨 Design & UI Philosophy

ContriMap features a modern, immersive design built with attention to detail:

### Visual Design
- **🌌 Dark Mode First** - Optimized for comfortable viewing
- **✨ Glassmorphism** - Frosted glass effects for depth and hierarchy
- **🌈 Vibrant Gradients** - Eye-catching color combinations
- **🎭 Micro-animations** - Smooth, purposeful animations with Framer Motion
- **🌊 Liquid Effects** - Dynamic background animations
- **🤖 3D Elements** - Interactive Three.js components

### Technical Excellence
- **📱 Fully Responsive** - Perfect on desktop, tablet, and mobile
- **♿ Accessible** - Built with Radix UI for WCAG 2.1 compliance
- **⚡ Performance Optimized** - Fast loading and smooth interactions
- **🎯 User-Centric** - Intuitive navigation and clear information hierarchy

### Component Library
- Radix UI for accessible primitives
- Custom Tailwind CSS utility classes
- Reusable React components
- Consistent design tokens

---

## 🤝 Contributing

We love contributions! ContriMap is built for the open-source community, by the community.

### How to Contribute

1. **🍴 Fork the repository**
   ```bash
   git clone https://github.com/yourusername/ContriMap.git
   ```

2. **🌿 Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **💻 Make your changes**
   - Follow the existing code style
   - Write meaningful commit messages
   - Add comments for complex logic
   - Test your changes thoroughly

4. **✅ Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. **🚀 Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **🎉 Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Wait for review and feedback

### Development Guidelines

- ✅ Follow existing code patterns and conventions
- ✅ Use meaningful variable and function names
- ✅ Write clear comments for complex logic
- ✅ Test your changes across different scenarios
- ✅ Update documentation when adding features
- ✅ Keep commits atomic and well-described
- ✅ Ensure responsive design on all screen sizes
- ✅ Maintain accessibility standards

### Areas to Contribute

- 🐛 Bug fixes and error handling
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage
- 🌐 Internationalization

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use, modify, and distribute this project freely. Just include the original license and copyright notice.

---

## 🙏 Acknowledgments

Special thanks to these amazing projects and communities:

- **[GitHub](https://github.com)** - For providing excellent APIs
- **[Groq](https://groq.com)** - For lightning-fast AI inference
- **[React Flow](https://reactflow.dev)** - For beautiful mind map visualizations
- **[Three.js](https://threejs.org)** - For stunning 3D graphics
- **[Radix UI](https://radix-ui.com)** - For accessible components
- **[Tailwind CSS](https://tailwindcss.com)** - For utility-first styling
- **[Framer Motion](https://framer.com/motion)** - For smooth animations
- **[MongoDB](https://mongodb.com)** - For flexible database solution
- **Open Source Community** - For inspiration and support ❤️

---

## 📚 Additional Resources

- 📖 [Setup Guide](SETUP.md) - Detailed setup instructions
- 📘 [API Documentation](API.md) - Complete API reference
- 🚀 [Deployment Guide](DEPLOYMENT.md) - How to deploy ContriMap

---

## 📧 Support & Contact

Need help or have questions? We're here for you!

- 💬 **Issues**: [Open an issue](https://github.com/yourusername/ContriMap/issues)
- 🗨️ **Discussions**: [Start a discussion](https://github.com/yourusername/ContriMap/discussions)
- 📧 **Email**: your.email@example.com
- 🐦 **Twitter**: [@yourhandle](https://twitter.com/yourhandle)

---

## 🌟 Show Your Support

If ContriMap helped you contribute to open source, please:

- ⭐ **Star this repository** - It helps others discover the project
- 🐦 **Share on social media** - Spread the word
- 🐛 **Report bugs** - Help us improve
- 💡 **Suggest features** - Share your ideas
- 🤝 **Contribute** - Join the development

---

<div align="center">

### Made with ❤️ for the Open-Source Community

**ContriMap - Helping Developers Contribute with Confidence**

[⬆ Back to Top](#️-contrimap---ai-powered-open-source-contribution-assistant)

</div>
