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

const categories = [
  { id: "seguro", icon: "ti-shield-check", label: "Seguros", first: "¡Hola! Soy tu asesor de seguros.\n¿Qué tipo buscas?\n• Auto  • Gastos médicos  • Vida", qr: ["Seguro de auto", "Gastos médicos", "Seguro de vida"] },
  { id: "tarjeta", icon: "ti-credit-card", label: "Tarjetas", first: "¡Hola! Te ayudo a elegir la mejor tarjeta.\n¿Cuál es tu ingreso mensual?", qr: ["Sin anualidad", "Puntos y millas", "MSI"] },
  { id: "hipoteca", icon: "ti-home", label: "Hipoteca", first: "¡Hola! Te ayudo con tu crédito hipotecario.\n¿Cuánto vale la propiedad?", qr: ["Primera vivienda", "Tengo INFONAVIT", "Comparar"] },
  { id: "internet", icon: "ti-wifi", label: "Internet", first: "¡Hola! Te ayudo con el mejor plan de internet.\n¿En qué ciudad vives?", qr: ["Solo internet", "Internet + TV", "Plan celular"] },
  { id: "inversion", icon: "ti-trending-up", label: "Inversión", first: "¡Hola! Te ayudo a invertir mejor.\n¿Cuánto quieres invertir?", qr: ["Corto plazo", "Largo plazo", "No sé cómo"] },
  { id: "universidad", icon: "ti-school", label: "Universidad", first: "¡Hola! Te ayudo a elegir universidad.\n¿Qué carrera te interesa?", qr: ["Pública vs privada", "Por ciudad", "Por precio"] },
];

const sysP = {
  seguro: "Eres el asesor de seguros de MANZ AI para México. Haz máximo 2 preguntas cortas y recomienda el mejor seguro. Aseguradoras reales (GNP, AXA, Qualitas, Metlife, HDI, MAPFRE). Formato 🥇🥈🥉. Breve y directo.",
  tarjeta: "Asesor de tarjetas MANZ AI México. 2 preguntas, recomienda tarjetas reales (BBVA, Citibanamex, Santander, Amex, Banorte). Formato 🥇🥈🥉.",
  hipoteca: "Asesor hipotecario MANZ AI México. 2 preguntas, opciones reales (INFONAVIT, FOVISSSTE, bancos), menciona tasas. Formato 🥇🥈🥉.",
  internet: "Asesor telecom MANZ AI México. 2 preguntas, proveedores reales (Telmex, Megacable, Izzi, Total Play). Formato 🥇🥈🥉.",
  inversion: "Asesor inversiones MANZ AI México. 2 preguntas perfil y monto. Opciones reales (CETES, GBM, Nu). Formato 🥇🥈🥉.",
  universidad: "Asesor educativo MANZ AI México. 2 preguntas carrera y ciudad. Universidades reales. Formato 🥇🥈🥉.",
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
    } catch {
      setMessages([...newMsgs, { role: "ai", text: "Error de conexión. Intenta de nuevo." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1.25rem", minHeight: "100vh", fontFamily: "system-ui, sans-serif", background: "#f8f9fa" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoMark size={38} />
          <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.3px" }}>
            MANZ <span style={{ background: `linear-gradient(135deg, ${BLUE}, ${GREEN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ fontSize: 12, color: "#888", background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 20, padding: "4px 12px", cursor: "pointer" }}>Historial</div>
          <div style={{ fontSize: 12, color: "#888", background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 20, padding: "4px 10px", cursor: "pointer" }}>👤</div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ display: "inline-block", fontSize: 11, color: BLUE, background: "#e8f3fc", border: `0.5px solid ${BLUE}40`, borderRadius: 20, padding: "3px 14px", marginBottom: "1rem", letterSpacing: "0.02em" }}>
          Asesor inteligente · México
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.5px", marginBottom: "0.5rem", color: "#111" }}>
          ¿Qué decisión importante<br />tomas hoy?
        </h1>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>
          No te damos 50 opciones. Te decimos cuál es la mejor para tu situación específica.
        </p>
      </div>

      {/* Categories */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6, marginBottom: "1.5rem" }}>
        {categories.map((c) => (
          <button key={c.id} onClick={() => selectCat(c)} style={{
            background: cat === c.id ? "#e8f3fc" : "#fff",
            border: `0.5px solid ${cat === c.id ? BLUE : "#e0e0e0"}`,
            borderRadius: 10, padding: "12px 6px", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
            transition: "all 0.15s",
          }}>
            <i className={`ti ${c.icon}`} style={{ fontSize: 16, color: cat === c.id ? BLUE : "#999" }} aria-hidden="true" />
            <span style={{ fontSize: 11, fontWeight: 500, color: cat === c.id ? BLUE : "#666" }}>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Chat */}
      <div style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 14, overflow: "hidden" }}>
        
        {/* Chat header */}
        <div style={{ padding: "14px 16px", borderBottom: "0.5px solid #f0f0f0", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>
            Asesor de {categories.find(c => c.id === cat)?.label.toLowerCase()}
          </span>
          <span style={{ fontSize: 12, color: "#aaa", marginLeft: "auto" }}>En línea</span>
        </div>

        {/* Messages */}
        <div style={{ padding: 16, minHeight: 280, maxHeight: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
              {m.role === "ai" && (
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 26 26" fill="none">
                    <path d="M4 20 L4 6 L9 14 L13 8 L17 14 L22 6" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 20 L22 20" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
              <div style={{
                maxWidth: "78%", padding: "9px 13px", fontSize: 13, lineHeight: 1.6,
                borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: m.role === "user" ? BLUE : "#f5f5f5",
                color: m.role === "user" ? "#fff" : "#111",
              }}>
                {m.text.split("\n").map((l, j) => <div key={j}>{l}</div>)}
              </div>
              {m.role === "user" && (
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#999", flexShrink: 0 }}>👤</div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 5, padding: "4px 0" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#ccc", animation: "pulse 1.4s infinite", animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          )}
        </div>

        {/* Quick replies */}
        {qrs.length > 0 && (
          <div style={{ padding: "8px 12px", display: "flex", gap: 6, flexWrap: "wrap", borderTop: "0.5px solid #f0f0f0" }}>
            {qrs.map(r => (
              <button key={r} onClick={() => sendMsg(r)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, border: `0.5px solid ${BLUE}`, background: "#e8f3fc", color: BLUE, cursor: "pointer" }}>
                {r}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: 12, borderTop: "0.5px solid #f0f0f0", display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMsg()}
            placeholder="Describe tu situación..."
            style={{ flex: 1, padding: "9px 14px", fontSize: 13, border: "0.5px solid #e0e0e0", borderRadius: 10, outline: "none", fontFamily: "system-ui, sans-serif", color: "#111" }}
          />
          <button onClick={() => sendMsg()} disabled={loading} style={{ width: 34, height: 34, borderRadius: 8, background: BLACK, border: "none", color: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ➤
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: 11, color: "#aaa" }}>
        MANZ AI · Tu asesor de confianza · México
      </div>

      <style>{`@keyframes pulse { 0%,60%,100%{opacity:.3;transform:scale(1)} 30%{opacity:1;transform:scale(1.15)} }`}</style>
    </div>
  );
}