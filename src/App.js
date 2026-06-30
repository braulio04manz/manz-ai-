import { useState } from "react";

const BLUE = "#1a7fd4";
const GREEN = "#12b76a";
const BLACK = "#0a0a0a";

const LogoMark = ({ size = 38 }) => (
  <div style={{ width: size, height: size, borderRadius: 10, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width={size * 0.68} height={size * 0.68} viewBox="0 0 26 26" fill="none">
      <path d="M4 20 L4 6 L9 14 L13 8 L17 14 L22 6" stroke={BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20 L22 20" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  </div>
);

const IconSeguro = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? BLUE : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L4 6 L4 13 Q4 18 12 22 Q20 18 20 13 L20 6 Z"/>
  </svg>
);
const IconTarjeta = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? BLUE : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="3"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);
const IconHipoteca = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? BLUE : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12 L12 3 L21 12"/>
    <path d="M5 10 L5 20 L19 20 L19 10"/>
    <rect x="9" y="14" width="6" height="6"/>
  </svg>
);
const IconInternet = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? BLUE : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5 Q12 6 19 12.5"/>
    <path d="M8 16 Q12 12 16 16"/>
    <path d="M2 9 Q12 1 22 9"/>
    <circle cx="12" cy="19" r="1.5" fill={active ? BLUE : "#999"} stroke="none"/>
  </svg>
);
const IconInversion = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? BLUE : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,17 8,12 13,14 21,6"/>
    <polyline points="17,6 21,6 21,10"/>
  </svg>
);
const IconUniversidad = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? BLUE : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 L22 8 L12 13 L2 8 Z"/>
    <path d="M6 10.5 L6 17 Q12 20 18 17 L18 10.5"/>
    <line x1="22" y1="8" x2="22" y2="15"/>
  </svg>
);

const categories = [
  { id: "seguro", Icon: IconSeguro, label: "Seguros", first: "Hola, soy tu asesor de seguros. ¿Qué tipo de seguro estás buscando? Puedo ayudarte con auto, gastos médicos o vida.", qr: ["Seguro de auto", "Gastos médicos", "Seguro de vida"] },
  { id: "tarjeta", Icon: IconTarjeta, label: "Tarjetas", first: "Hola, te ayudo a encontrar la tarjeta ideal para ti. Para darte la mejor opción, ¿cuál es tu ingreso mensual aproximado?", qr: ["Sin anualidad", "Puntos y millas", "Meses sin intereses"] },
  { id: "hipoteca", Icon: IconHipoteca, label: "Hipoteca", first: "Hola, te ayudo a encontrar el mejor crédito hipotecario. ¿Cuánto vale aproximadamente la propiedad que te interesa?", qr: ["Primera vivienda", "Tengo INFONAVIT", "Comparar opciones"] },
  { id: "internet", Icon: IconInternet, label: "Internet", first: "Hola, te ayudo a elegir el mejor plan de internet. ¿En qué ciudad vives y cuántas personas lo usarían?", qr: ["Solo internet", "Internet y TV", "Plan de celular"] },
  { id: "inversion", Icon: IconInversion, label: "Inversión", first: "Hola, te ayudo a invertir mejor tu dinero. ¿Cuánto tienes disponible para invertir y en qué plazo necesitas resultados?", qr: ["Corto plazo", "Largo plazo", "No sé por dónde empezar"] },
  { id: "universidad", Icon: IconUniversidad, label: "Universidad", first: "Hola, te ayudo a elegir la universidad ideal. ¿Qué carrera te interesa estudiar?", qr: ["Pública vs privada", "Buscar por ciudad", "Comparar por precio"] },
];

const sysP = {
  seguro: "Eres el asesor de seguros de MANZ AI para México. Haz máximo 2 preguntas cortas y recomienda el mejor seguro. Usa aseguradoras reales: GNP, AXA, Qualitas, Metlife, HDI, MAPFRE. Formato con 🥇🥈🥉. IMPORTANTE: responde en texto limpio y natural, sin asteriscos, sin guiones como viñetas, sin markdown. Usa frases cortas y directas.",
  tarjeta: "Eres el asesor de tarjetas de MANZ AI para México. Haz máximo 2 preguntas y recomienda tarjetas reales: BBVA, Citibanamex, Santander, Amex, Banorte. Formato con 🥇🥈🥉. IMPORTANTE: responde en texto limpio y natural, sin asteriscos, sin guiones como viñetas, sin markdown.",
  hipoteca: "Eres el asesor hipotecario de MANZ AI para México. Haz máximo 2 preguntas y recomienda opciones reales: INFONAVIT, FOVISSSTE, bancos, menciona tasas. Formato con 🥇🥈🥉. IMPORTANTE: responde en texto limpio y natural, sin asteriscos, sin guiones como viñetas, sin markdown.",
  internet: "Eres el asesor de telecomunicaciones de MANZ AI para México. Haz máximo 2 preguntas y recomienda proveedores reales: Telmex, Megacable, Izzi, Total Play. Formato con 🥇🥈🥉. IMPORTANTE: responde en texto limpio y natural, sin asteriscos, sin guiones como viñetas, sin markdown.",
  inversion: "Eres el asesor de inversiones de MANZ AI para México. Haz máximo 2 preguntas sobre perfil y monto. Opciones reales: CETES, GBM, Nu, Fideicomisos. Formato con 🥇🥈🥉. IMPORTANTE: responde en texto limpio y natural, sin asteriscos, sin guiones como viñetas, sin markdown.",
  universidad: "Eres el asesor educativo de MANZ AI para México. Haz máximo 2 preguntas sobre carrera y ciudad. Universidades reales. Formato con 🥇🥈🥉. IMPORTANTE: responde en texto limpio y natural, sin asteriscos, sin guiones como viñetas, sin markdown.",
};

export default function App() {
  const [cat, setCat] = useState("seguro");
  const [messages, setMessages] = useState([{ role: "ai", text: categories[0].first }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [qrs, setQrs] = useState(categories[0].qr);

  const selectCat = (c) => {
    setCat(c.id);
    setMessages([{ role: "ai", text: c.first }]);
    setHistory([]);
    setInput("");
    setQrs(c.qr);
  };

  const sendMsg = async (override) => {
    const text = override || input.trim();
    if (!text || loading) return;
    setInput("");
    setQrs([]);
    const newMsgs = [...messages, { role: "user", text }];
    setMessages(newMsgs);
    setLoading(true);
    const newHist = [...history, { role: "user", content: text }];
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: sysP[cat], messages: newHist }),
      });
      const data = await res.json();
      const reply = data.content[0].text;
      setMessages([...newMsgs, { role: "ai", text: reply }]);
      setHistory([...newHist, { role: "assistant", content: reply }]);
      setQrs(reply.includes("🥇") ? ["¿Cómo contrato?", "¿Cuánto cuesta?", "Ver más"] : ["Cuéntame más", "Dame la recomendación"]);
if (reply.toLowerCase().includes("plata")) {
  setTimeout(() => {
    setMessages(prev => [...prev, { role: "ai", text: "👉 Solicita tu Plata Card aquí: bancoplata.mx/amigos/credito/josebr94fd", link: "https://bancoplata.mx/amigos/credito/josebr94fd" }]);
  }, 500);
}
    } catch {
      setMessages([...newMsgs, { role: "ai", text: "Error de conexión. Intenta de nuevo." }]);
    }
    setLoading(false);
  };

  const currentCat = categories.find(c => c.id === cat);

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", backgroundImage: "linear-gradient(#e8e8ec 0.5px, transparent 0.5px), linear-gradient(90deg, #e8e8ec 0.5px, transparent 0.5px)", backgroundSize: "28px 28px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Gradiente que suaviza la textura en el centro */}
      <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0) 100%)" }}>
        
        {/* Línea de acento superior */}
        <div style={{ height: 2, background: `linear-gradient(90deg, ${BLUE}, ${GREEN})`, opacity: 0.7 }} />

        <div style={{ maxWidth: 700, margin: "0 auto", padding: "1.5rem 1.25rem 3rem" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LogoMark size={38} />
              <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.3px", color: BLACK }}>
                MANZ <span style={{ background: `linear-gradient(135deg, ${BLUE}, ${GREEN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
              </span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ fontSize: 12, color: "#888", background: "white", border: "0.5px solid #e0e0e0", borderRadius: 20, padding: "5px 14px", cursor: "pointer" }}>Historial</div>
              <div style={{ fontSize: 12, color: "#888", background: "white", border: "0.5px solid #e0e0e0", borderRadius: 20, padding: "5px 10px", cursor: "pointer" }}>👤</div>
            </div>
          </div>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, color: BLUE, background: "white", border: `0.5px solid ${BLUE}30`, borderRadius: 20, padding: "4px 14px", marginBottom: "1.25rem", letterSpacing: "0.03em" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
              Asesor inteligente · México
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 300, lineHeight: 1.3, letterSpacing: "-0.8px", marginBottom: "0.75rem", color: "#111", margin: "0 0 0.75rem" }}>
              ¿Qué decisión importante<br />tomas hoy?
            </h1>
            <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
              No te damos 50 opciones. Te decimos cuál es la mejor para tu situación específica.
            </p>
          </div>

          {/* Categorías */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: "1.5rem" }}>
            {categories.map((c) => (
              <button key={c.id} onClick={() => selectCat(c)} style={{
                background: cat === c.id ? "#e8f3fc" : "white",
                border: `0.5px solid ${cat === c.id ? BLUE : "#e0e0e0"}`,
                borderRadius: 10, padding: "14px 6px 10px", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
                transition: "all 0.15s", boxShadow: cat === c.id ? "none" : "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <c.Icon active={cat === c.id} />
                <span style={{ fontSize: 11, fontWeight: 500, color: cat === c.id ? BLUE : "#666" }}>{c.label}</span>
              </button>
            ))}
          </div>

          {/* Chat */}
          <div style={{ background: "#0d1117", border: "0.5px solid #1e293b", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>

            {/* Chat header */}
            <div style={{ padding: "14px 18px", borderBottom: "0.5px solid #1e293b", display: "flex", alignItems: "center", gap: 9, background: "#111827" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#e2e8f0" }}>
                Asesor de {currentCat?.label.toLowerCase()}
              </span>
              <span style={{ fontSize: 12, color: "#475569", marginLeft: "auto" }}>En línea</span>
            </div>

            {/* Mensajes */}
            <div style={{ padding: 18, minHeight: 300, maxHeight: 380, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, background: "linear-gradient(180deg, #111827 0%, #0d1117 100%)" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 9, alignItems: "flex-end" }}>
                  {m.role === "ai" && (
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#111827", border: "0.5px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 26 26" fill="none">
                        <path d="M4 20 L4 6 L9 14 L13 8 L17 14 L22 6" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 20 L22 20" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                  <div style={{
                    maxWidth: "78%", padding: "10px 14px", fontSize: 13, lineHeight: 1.65,
                    borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: m.role === "user" ? BLUE : "#1a2744",
                    color: m.role === "user" ? "#fff" : "#cbd5e1",
                    border: m.role === "user" ? "none" : "0.5px solid #1e3a5f",
                  }}>
                    {m.text.split("\n").map((l, j) => <div key={j}>{l}</div>)}
{m.link && <a href={m.link} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 8, padding: "6px 14px", background: "#1a7fd4", color: "white", borderRadius: 8, fontSize: 12, textDecoration: "none" }}>Solicitar Plata Card →</a>}
                  </div>
                  {m.role === "user" && (
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#64748b", flexShrink: 0 }}>👤</div>
                  )}
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: 5, padding: "4px 0", paddingLeft: 35 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#334155", animation: "pulse 1.4s infinite", animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              )}
            </div>

            {/* Quick replies */}
            {qrs.length > 0 && (
              <div style={{ padding: "10px 14px", display: "flex", gap: 7, flexWrap: "wrap", borderTop: "0.5px solid #1e293b", background: "#0d1117" }}>
                {qrs.map(r => (
                  <button key={r} onClick={() => sendMsg(r)} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 20, border: `0.5px solid ${BLUE}60`, background: "#0f1f35", color: BLUE, cursor: "pointer" }}>
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "12px 14px", borderTop: "0.5px solid #1e293b", display: "flex", gap: 8, alignItems: "center", background: "#111827" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMsg()}
                placeholder="Describe tu situación..."
                style={{ flex: 1, padding: "10px 14px", fontSize: 13, border: "0.5px solid #1e293b", borderRadius: 10, outline: "none", fontFamily: "system-ui, sans-serif", color: "#e2e8f0", background: "#0d1117" }}
              />
              <button onClick={() => sendMsg()} disabled={loading} style={{ width: 38, height: 38, borderRadius: 9, background: `linear-gradient(135deg, ${BLUE}, ${GREEN})`, border: "none", color: "#fff", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", opacity: loading ? 0.5 : 1 }}>
                ➤
              </button>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: 11, color: "#aaa", letterSpacing: "0.04em" }}>
            MANZ AI · Tu asesor de confianza · México
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,60%,100%{opacity:.25;transform:scale(1)} 30%{opacity:1;transform:scale(1.2)} }`}</style>
    </div>
  );
}