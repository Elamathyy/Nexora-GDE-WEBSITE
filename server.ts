import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://elamathyeelan_db_user:mathyELAMATHY2006@cluster0.x8jpcat.mongodb.net/?appName=Cluster0";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Connect to MongoDB
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }

  app.use(express.json());

  // --- API ROUTES ---
  
  // Dummy Leaderboard Data
  app.get("/api/leaderboard", (req, res) => {
    res.json([
      { id: 1, name: "X-Cyber_01", points: 2450, skills: ["AI", "PenTesting"], rank: 1, country: "USA", accuracy: "98.2%" },
      { id: 2, name: "Neural_Ghost", points: 2100, skills: ["LLM", "Encryption"], rank: 2, country: "JPN", accuracy: "95.5%" },
      { id: 3, name: "Void_Walker", points: 1850, skills: ["ReverseEng", "ML"], rank: 3, country: "GER", accuracy: "92.1%" },
      { id: 4, name: "Nexora_Admin", points: 1500, skills: ["DevOps", "AI"], rank: 4, country: "IND", accuracy: "89.4%" },
      { id: 5, name: "Root_Access", points: 1200, skills: ["Web3", "Sec"], rank: 5, country: "UK", accuracy: "87.8%" },
      { id: 6, name: "Binary_Beast", points: 1150, skills: ["Kernel", "C++"], rank: 6, country: "CAN", accuracy: "86.5%" },
      { id: 7, name: "Logic_Bomb", points: 980, skills: ["SQLi", "XSS"], rank: 7, country: "FRA", accuracy: "84.2%" },
    ]);
  });

  // Dummy Events Data
  app.get("/api/events", (req, res) => {
    res.json([
      { 
        id: 1, 
        title: "CYBER-STRIKE 2026: GLOBAL CTF", 
        date: new Date().toISOString(), 
        status: "LIVE", 
        description: "The main event is currently active. 4,200 nodes connected. Real-time AI-driven CTF challenge with a $50k prize pool.",
        image: "https://picsum.photos/seed/cyber/800/400",
        location: "VIRTUAL_GRID_01",
        participants: "4.2K"
      },
      { 
        id: 4, 
        title: "NEURAL DEFENSE WORKSHOP", 
        date: new Date().toISOString(), 
        status: "LIVE", 
        description: "Live coding session: Building autonomous firewall agents with Gemini Pro. Join the live stream now.",
        image: "https://picsum.photos/seed/workshop/800/400",
        location: "STREAM_ALPHA",
        participants: "1.8K"
      },
      { 
        id: 2, 
        title: "LLM VULNERABILITY SCAN", 
        date: "2026-05-20", 
        status: "UPCOMING", 
        description: "Exploiting LLM vulnerabilities workshop. Learn prompt injection defense and model alignment hacking.",
        image: "https://picsum.photos/seed/ai/800/400",
        location: "VIRTUAL_GRID_02",
        participants: "0.5K"
      },
      { 
        id: 3, 
        title: "GDE SUMMIT: NEXORA", 
        date: "2026-06-10", 
        status: "UPCOMING", 
        description: "Annual gathering of Nexora-GDE elite. Keynote by AI Security leads and networking sessions.",
        image: "https://picsum.photos/seed/summit/800/400",
        location: "SINGAPORE_HUB",
        participants: "2.5K"
      },
      { 
        id: 5, 
        title: "PAST_BREACH_ANALYSIS", 
        date: "2026-01-15", 
        status: "PAST", 
        description: "Post-mortem of the 2025 Neural Grid breach. Analysis of the attack vectors used.",
        image: "https://picsum.photos/seed/past1/800/400",
        location: "ARCHIVE_01",
        participants: "3.1K"
      },
    ]);
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nexora-GDE Server running on http://localhost:${PORT}`);
  });
}

startServer();
