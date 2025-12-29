import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [partidos, setPartidos] = useState([])
  const [noticias, setNoticias] = useState([])
  const [mensajeBackend, setMensajeBackend] = useState('')
  const [cargando, setCargando] = useState(true)
  const [deporteSeleccionado, setDeporteSeleccionado] = useState('Todos')

  const deportes = ['Todos', 'Futbol', 'Baloncesto', 'Tenis']

  useEffect(() => {
    const fetchData = async () => {
      try {
        // En desarrollo usa localhost, en producción usa la URL del backend desplegado
        const baseURL = import.meta.env.PROD 
          ? 'https://tu-backend-desplegado.com' 
          : 'http://localhost:4000'
        
        const [partidosRes, noticiasRes, saludoRes] = await Promise.all([
          axios.get(`${baseURL}/api/partidos`),
          axios.get(`${baseURL}/api/noticias`),
          axios.get(`${baseURL}/api/saludo`)
        ])
        
        setPartidos(partidosRes.data)
        setNoticias(noticiasRes.data)
        setMensajeBackend(saludoRes.data.mensaje)
      } catch (error) {
        console.error('Error conectando con el backend:', error)
        setMensajeBackend('Usando datos de demostración (backend no disponible)')
        // Datos de demostración
        setPartidos([
          { id: 1, partido: "Nets vs Suns", deporte: "baloncesto", liga: "NBA", fechaHora: "14/02/2024 21:30", resultado: "-", estado: "Programado" },
          { id: 2, partido: "PSG vs Marseille", deporte: "futbol", liga: "Ligue 1", fechaHora: "15/02/2024 20:00", resultado: "-", estado: "Programado" },
          { id: 3, partido: "Federer vs Murray", deporte: "tenis", liga: "Exhibición", fechaHora: "16/02/2024 18:00", resultado: "-", estado: "Programado" }
        ])
        setNoticias([
          { id: 1, titulo: "Nueva generación domina el tenis femenino", contenido: "Jugadoras como Coco Gauff y Emma Raducanu están revolucionando el tenis femenino mundial...", fecha: "27/12/2025" },
          { id: 2, titulo: "Curry anota 62 puntos en un partido", contenido: "Stephen Curry establece su récord personal de anotación con 62 puntos contra Portland Trail Blazers...", fecha: "28/12/2025" }
        ])
      } finally {
        setCargando(false)
      }
    }

    fetchData()
  }, [])

  const partidosFiltrados = deporteSeleccionado === 'Todos' 
    ? partidos 
    : partidos.filter(p => p.deporte.toLowerCase() === deporteSeleccionado.toLowerCase())

  if (cargando) {
    return <div className="cargando">Cargando Online Sports...</div>
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Online Sports</h1>
        <p className="backend-status">{mensajeBackend}</p>
      </header>

      <main className="contenedor">
        <section className="filtros">
          <h2>Deportes</h2>
          <div className="botones-deportes">
            {deportes.map(deporte => (
              <button
                key={deporte}
                className={`boton-deporte ${deporteSeleccionado === deporte ? 'activo' : ''}`}
                onClick={() => setDeporteSeleccionado(deporte)}
              >
                {deporte}
              </button>
            ))}
          </div>
        </section>

        <section className="partidos">
          <h2>Partidos</h2>
          <div className="tabla-contenedor">
            <table className="tabla-partidos">
              <thead>
                <tr>
                  <th>Partido</th>
                  <th>Deporte</th>
                  <th>Liga</th>
                  <th>Fecha/Hora</th>
                  <th>Resultado</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {partidosFiltrados.map(partido => (
                  <tr key={partido.id}>
                    <td>{partido.partido}</td>
                    <td className={`deporte ${partido.deporte}`}>{partido.deporte}</td>
                    <td>{partido.liga}</td>
                    <td>{partido.fechaHora}</td>
                    <td>{partido.resultado}</td>
                    <td className={`estado ${partido.estado.toLowerCase()}`}>
                      {partido.estado}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="noticias">
          <h2>Noticias</h2>
          <div className="tarjetas-noticias">
            {noticias.map(noticia => (
              <div key={noticia.id} className="tarjeta-noticia">
                <h3>{noticia.titulo}</h3>
                <p>{noticia.contenido}</p>
                <span className="fecha-noticia">{noticia.fecha}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <p>Online Sports &copy; 2025 - Desarrollado por Jeanp18</p>
          <p>CI/CD con GitHub Actions | Backend: Express | Frontend: React + Vite</p>
        </footer>
      </main>
    </div>
  )
}

export default App