import './App.css'
import { useState, useEffect, useRef } from 'react'

const sections = [
  {
    id: 'o-que-e',
    icon: '◈',
    title: 'O que é Violência Contra a Mulher?',
    color: '#c0392b',
    text: `A violência contra a mulher é uma realidade que ainda afeta milhões de vidas todos os dias, atravessando culturas, classes sociais e gerações. Ela não se limita apenas à agressão física — também se manifesta de forma psicológica, moral, sexual e patrimonial, muitas vezes de maneira silenciosa e difícil de identificar.

Comentários humilhantes, controle excessivo, ameaças, isolamento social e manipulação emocional também são formas de violência e deixam marcas profundas. Reconhecer os sinais é um passo fundamental para interromper ciclos de abuso.`,
    video: {
      id: 'ZoqDTkT5wms',
      title: 'O que é violência doméstica? — Canal do Direito',
    },
    stat: '1 em cada 3 mulheres',
    statLabel: 'sofre violência no mundo (ONU)',
  },
  {
    id: 'estatisticas',
    icon: '◉',
    title: 'Estatísticas no Brasil',
    color: '#922b21',
    text: `De acordo com a ONU, 1 em cada 3 mulheres no mundo sofre violência física ou sexual. No Brasil, dados do Ministério da Mulher mostram que em 2022 houve mais de 1 milhão de denúncias registradas — um aumento de 20% no último trimestre.

Apenas uma fração dos casos é denunciada. O medo, a dependência financeira e o estigma social são barreiras que impedem as vítimas de buscar ajuda. Conhecer os números é essencial para combater a normalização.`,
    video: {
      id: 'e6oKpNV0XD4',
      title: 'Dados sobre violência doméstica no Brasil',
    },
    stat: '+1 milhão',
    statLabel: 'denúncias registradas em 2022',
  },
  {
    id: 'como-ajudar',
    icon: '◎',
    title: 'Como Ajudar',
    color: '#d35400',
    text: `Se você ou alguém que conhece está sofrendo violência, procure ajuda imediatamente. Ligue para o 180 (Central de Atendimento à Mulher) disponível 24 horas, ou acesse a delegacia virtual para registrar sua denúncia com segurança.

Você também pode ajudar sendo uma rede de apoio para quem está em situação de risco: ouça sem julgamentos, ofereça suporte prático e ajude a pessoa a conhecer seus direitos e os recursos disponíveis.`,
    video: {
      id: 'IIiZqu_JWXY',
      title: 'Como denunciar violência doméstica — Passo a passo',
    },
    stat: '180',
    statLabel: 'Ligue agora — disponível 24h',
  },
  {
    id: 'lei-maria-da-penha',
    icon: '◐',
    title: 'Lei Maria da Penha',
    color: '#7b241c',
    text: `A Lei 11.340/2006, conhecida como Lei Maria da Penha, é um marco histórico na proteção das mulheres brasileiras. Criada após décadas de luta da ativista Maria da Penha Maia Fernandes, que sobreviveu a duas tentativas de homicídio praticadas pelo marido.

A lei define os tipos de violência doméstica, cria mecanismos de proteção como medidas cautelares, proíbe a aplicação de penas alternativas, e estabelece os Juizados de Violência Doméstica como instâncias especializadas.`,
    video: {
      id: 'nOFdkXKL2C0',
      title: 'Lei Maria da Penha explicada — Conheça seus direitos',
    },
    stat: '2006',
    statLabel: 'Lei Maria da Penha — 18 anos de proteção',
  },
]

const newsItems = [
  {
    tag: 'CAMPANHA',
    title: 'Campanha Nacional Contra Violência Doméstica Lançada',
    date: '15 de Abril de 2026',
    summary: 'O governo federal lança nova campanha nacional para conscientizar sobre violência doméstica, com foco em prevenção, identificação dos sinais e apoio às vítimas em situação de risco.',
    link: 'https://www.gov.br/mdh/pt-br',
  },
  {
    tag: 'DADOS',
    title: 'Denúncias Aumentam 20% no Último Trimestre',
    date: '10 de Abril de 2026',
    summary: 'Dados recentes do Ministério da Mulher indicam crescimento nas denúncias, resultado direto das campanhas de conscientização e maior confiança no sistema de proteção.',
    link: 'https://www.onumulheres.org.br/',
  },
  {
    tag: 'INAUGURAÇÃO',
    title: 'Novo Centro de Apoio Inaugurado em São Paulo',
    date: '5 de Abril de 2026',
    summary: 'Inauguração de centro especializado em atendimento integral a vítimas de violência doméstica, com psicólogos, advogados e assistentes sociais disponíveis gratuitamente.',
    link: 'https://www.gov.br/mdh/pt-br',
  },
  {
    tag: 'LEGISLAÇÃO',
    title: 'Projeto de Lei Amplia Proteção a Mulheres em Situação de Risco',
    date: '28 de Março de 2026',
    summary: 'Câmara dos Deputados aprova em primeira votação projeto que amplia o acesso das vítimas a medidas protetivas e cria banco de dados nacional de agressores.',
    link: 'https://www.camara.leg.br/',
  },
]

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="video-card">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <div className="video-thumb" onClick={() => setPlaying(true)}>
          <img
            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
          />
          <div className="play-overlay">
            <div className="play-btn-circle">
              <span>▶</span>
            </div>
            <p className="video-label">{video.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionBlock({ section, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`section-block ${visible ? 'visible' : ''} ${isEven ? 'from-left' : 'from-right'}`}
      style={{ '--delay': `${index * 0.08}s`, '--accent': section.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`section-inner ${isEven ? '' : 'reverse'}`}>
        <div className="section-text-col">
          <div className="section-tag">
            <span className="section-icon">{section.icon}</span>
            <span className="section-num">0{index + 1}</span>
          </div>
          <h2>{section.title}</h2>
          {section.text.split('\n\n').map((p, i) => (
            <p key={i} className="section-p">{p}</p>
          ))}
          <div className="stat-pill" style={{ borderColor: section.color }}>
            <span className="stat-number" style={{ color: section.color }}>{section.stat}</span>
            <span className="stat-label">{section.statLabel}</span>
          </div>
        </div>
        <div className="section-media-col">
          <VideoCard video={section.video} />
        </div>
      </div>
      <div className="section-line" style={{ background: section.color, transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
    </div>
  )
}

function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.35 + 0.05,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192,57,43,${p.o})`
        ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > w) p.dx *= -1
        if (p.y < 0 || p.y > h) p.dy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={canvasRef} className="particle-canvas" />
}

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [cursorActive, setCursorActive] = useState(false)
  const noticiasRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY })
    }
    const onDown = () => setCursorActive(true)
    const onUp = () => setCursorActive(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const scrollToNoticias = () => {
    noticiasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const navOpacity = Math.min(scrollY / 120, 1)

  return (
    <div className="app">
      {/* Custom cursor */}
      <div
        className={`custom-cursor ${cursorActive ? 'active' : ''}`}
        style={{ left: cursor.x, top: cursor.y }}
      />

      {/* NAVBAR */}
      <nav className="navbar" style={{ '--nav-opacity': navOpacity }}>
        <div className="nav-brand">
          <span className="nav-icon">♀</span>
          <span className="nav-title">Violência Contra a Mulher</span>
        </div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#hero" className="nav-link" onClick={() => setMenuOpen(false)}>Início</a>
          <div className="dropdown">
            <span className="nav-link dropbtn">Recursos ▾</span>
            <div className="dropdown-content">
              <a href="https://www.onumulheres.org.br/" target="_blank" rel="noopener noreferrer">🌐 ONU Mulheres</a>
              <a href="https://www.gov.br/mdh/pt-br" target="_blank" rel="noopener noreferrer">🏛 Ministério da Mulher</a>
              <a href="https://pc.sc.gov.br/?page_id=51" target="_blank" rel="noopener noreferrer">📞 Disque 181</a>
            </div>
          </div>
          <button className="nav-link nav-news-btn" onClick={scrollToNoticias}>Notícias</button>
          <a
            href="https://delegaciavirtual.sc.gov.br/?19="
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            Denunciar Agora
          </a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <ParticleCanvas />
        <div className="hero-image-wrap">
          <img className="hero-img" src="image.01.png" alt="Empoderamento feminino" />
          <div className="hero-gradient" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Informação salva vidas
          </div>
          <h1 className="hero-title">
            <span className="hero-line">Toda mulher</span>
            <span className="hero-line hero-accent">merece viver</span>
            <span className="hero-line">sem violência.</span>
          </h1>
          <p className="hero-sub">
            Informação, denúncia e apoio — tudo em um lugar só.
          </p>
          <div className="hero-actions">
            <a
              href="https://delegaciavirtual.sc.gov.br/?19="
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span className="btn-icon">⚑</span>
              Denunciar Violência
            </a>
            <a href="tel:180" className="btn-secondary">
              <span className="btn-icon">☎</span>
              Ligue 180 — Agora
            </a>
          </div>
          <div className="hero-scroll-hint" onClick={() => document.getElementById('conteudo')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Role para descobrir</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* COUNTER BAR */}
      <div className="counter-bar">
        {[
          { n: '1M+', label: 'Denúncias em 2022' },
          { n: '33%', label: 'Das mulheres no mundo' },
          { n: '180', label: 'Central de Atendimento' },
          { n: '24h', label: 'Disponível sempre' },
        ].map((item, i) => (
          <div key={i} className="counter-item">
            <span className="counter-n">{item.n}</span>
            <span className="counter-l">{item.label}</span>
          </div>
        ))}
      </div>

      {/* MAIN SECTIONS */}
      <main id="conteudo">
        {sections.map((section, i) => (
          <SectionBlock key={section.id} section={section} index={i} />
        ))}
      </main>

      {/* NOTICIAS */}
      <section ref={noticiasRef} id="noticias" className="noticias-section">
        <div className="noticias-header">
          <span className="section-eyebrow">Últimas</span>
          <h2 className="noticias-title">Notícias & Atualizações</h2>
          <p className="noticias-sub">Fique por dentro das ações, campanhas e legislação sobre violência contra a mulher no Brasil.</p>
        </div>
        <div className="news-grid">
          {newsItems.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card"
              style={{ '--card-delay': `${i * 0.1}s` }}
            >
              <span className="news-tag">{item.tag}</span>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-date">{item.date}</p>
              <p className="news-summary">{item.summary}</p>
              <span className="news-read">Leia mais →</span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="cta-content">
          <h3>Precisa de ajuda agora?</h3>
          <p>Você não está sozinha. Ligue grátis para o 180, disponível 24 horas por dia.</p>
        </div>
        <div className="cta-actions">
          <a href="tel:180" className="cta-btn-primary">☎ Ligue 180</a>
          <a href="https://delegaciavirtual.sc.gov.br/?19=" target="_blank" rel="noopener noreferrer" className="cta-btn-secondary">Delegacia Virtual →</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-icon">♀</span>
            <p className="footer-desc">Um espaço de informação, apoio e denúncia para combater a violência contra a mulher no Brasil.</p>
            <div className="social-row">
              <a href="#" aria-label="Facebook" className="social-btn"><i className="fab fa-facebook-f" /></a>
              <a href="#" aria-label="Instagram" className="social-btn"><i className="fab fa-instagram" /></a>
              <a href="#" aria-label="YouTube" className="social-btn"><i className="fab fa-youtube" /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>A Lei</h4>
            <a href="#">Tipos de violência</a>
            <a href="#">Lei na íntegra</a>
            <a href="#">Resumo da lei</a>
          </div>

          <div className="footer-col">
            <h4>Maria da Penha</h4>
            <a href="#">História</a>
            <a href="#">Conquistas</a>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <a href="tel:180">Central: 180</a>
            <a href="tel:181">Denúncia: 181</a>
            <a href="mailto:apoio@site.com">apoio@site.com</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Todos os direitos reservados</p>
          <p>Feito com ♥ para proteger vidas</p>
        </div>
      </footer>
    </div>
  )
}