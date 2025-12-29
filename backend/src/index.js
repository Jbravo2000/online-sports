const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint para obtener datos de partidos
app.get("/api/partidos", (req, res) => {
  const partidos = [
    {
      id: 1,
      partido: "Nets vs Suns",
      deporte: "baloncesto",
      liga: "NBA",
      fechaHora: "14/02/2024 21:30",
      resultado: "-",
      estado: "Programado"
    },
    {
      id: 2,
      partido: "PSG vs Marseille",
      deporte: "futbol",
      liga: "Ligue 1",
      fechaHora: "15/02/2024 20:00",
      resultado: "-",
      estado: "Programado"
    },
    {
      id: 3,
      partido: "Federer vs Murray",
      deporte: "tenis",
      liga: "Exhibición",
      fechaHora: "16/02/2024 18:00",
      resultado: "-",
      estado: "Programado"
    }
  ];
  res.json(partidos);
});

// Endpoint para obtener noticias
app.get("/api/noticias", (req, res) => {
  const noticias = [
    {
      id: 1,
      titulo: "Nueva generación domina el tenis femenino",
      contenido: "Jugadoras como Coco Gauff y Emma Raducanu están revolucionando el tenis femenino mundial...",
      fecha: "27/12/2025"
    },
    {
      id: 2,
      titulo: "Curry anota 62 puntos en un partido",
      contenido: "Stephen Curry establece su récord personal de anotación con 62 puntos contra Portland Trail Blazers...",
      fecha: "28/12/2025"
    }
  ];
  res.json(noticias);
});

// Endpoint de salud
app.get("/api/saludo", (req, res) => {
  res.json({ 
    mensaje: "Bienvenido a Online Sports API 🏀⚽🎾",
    version: "1.0.0",
    desarrollador: "Jeanp18"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Online Sports escuchando en http://localhost:${PORT}`);
});