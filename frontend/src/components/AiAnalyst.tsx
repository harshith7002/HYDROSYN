import React, { useState } from 'react';
import type { IntelligenceResponse, ChatMessage } from '../types';
import { sendAnalystChat } from '../api/client';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Database, 
  ShieldCheck, 
  Loader2
} from 'lucide-react';

interface AiAnalystProps {
  intelligence: IntelligenceResponse;
}

export const AiAnalyst: React.FC<AiAnalystProps> = ({ intelligence }) => {
  const { station, latest_observation, risk, mode } = intelligence;

  const quickPrompts = [
    "Should irrigation be considered today?",
    "Why is water stress increasing?",
    "What environmental changes happened this week?",
    "What is causing the current risk level?",
    "Summarize the current environmental conditions."
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `👋 Greetings! I am **HYDROSYN Intelligence**, your grounded environmental decision analyst. I am actively synthesizing multi-channel telemetry from **${station.name}** (Water Stress: ${risk.score}/100, Soil Moisture: ${latest_observation.soil_moisture_pct.toFixed(1)}%, ET₀: ${latest_observation.et0_mm_day.toFixed(1)} mm/day). How can I guide your farm or water management decisions today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model_used: "HYDROSYN Grounded Decision Engine"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (queryText?: string) => {
    const query = queryText || inputQuery;
    if (!query.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsSending(true);

    try {
      const res = await sendAnalystChat(query, station.id, mode);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.response || "No response generated.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        grounded_data: res.grounded_data,
        model_used: res.model_used
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errReply: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: `⚠️ Error synthesizing response: ${err.message || 'Could not reach decision engine.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errReply]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="glass-panel glass-panel-glow" style={{ padding: '24px 28px', marginBottom: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #00f2fe 0%, #0072ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={20} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
              HYDROSYN Intelligence
            </h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Grounded AI Decision Analyst • Strict Data Grounding
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: 8, border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <ShieldCheck size={14} />
          <span>Grounded in Live Conduit State</span>
        </div>
      </div>

      {/* Suggested Query Quick Pills */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>
          Suggested Inquiries:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              className="btn-outline"
              onClick={() => handleSend(p)}
              disabled={isSending}
              style={{
                fontSize: '0.75rem',
                padding: '5px 12px',
                borderRadius: 9999,
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <Sparkles size={12} color="var(--accent-cyan)" />
              <span>{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div style={{
        background: 'rgba(11, 20, 38, 0.9)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        maxHeight: 380,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginBottom: 16
      }}>
        {messages.map((m) => {
          const isAi = m.sender === 'ai';
          return (
            <div key={m.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isAi ? 'flex-start' : 'flex-end'
            }}>
              <div style={{
                maxWidth: '85%',
                background: isAi ? 'rgba(15, 26, 48, 0.9)' : 'linear-gradient(135deg, #0072ff 0%, #0052cc 100%)',
                border: isAi ? '1px solid var(--border-subtle)' : 'none',
                borderRadius: isAi ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                padding: '14px 18px',
                color: '#fff',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                <div style={{ whiteSpace: 'pre-line' }}>
                  {m.text}
                </div>

                {/* Grounding Data Citation Badge for AI */}
                {isAi && m.grounded_data && (
                  <div style={{
                    marginTop: 12,
                    paddingTop: 8,
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Database size={11} /> Grounding Evidence:
                    </span>
                    <span className="mono">Temp: {m.grounded_data.temperature_c}°C</span>
                    <span>•</span>
                    <span className="mono">SM: {m.grounded_data.soil_moisture_pct}%</span>
                    <span>•</span>
                    <span className="mono">ET₀: {m.grounded_data.et0_mm_day} mm/d</span>
                    <span>•</span>
                    <span className="mono">Risk: {m.grounded_data.water_stress_score}/100</span>
                  </div>
                )}
              </div>

              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 4, padding: '0 4px' }}>
                {isAi ? `${m.model_used || 'HYDROSYN AI'} • ` : 'You • '} {m.timestamp}
              </div>
            </div>
          );
        })}

        {isSending && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-cyan)', fontSize: '0.8rem', padding: '8px 12px' }}>
            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            <span>HYDROSYN Intelligence is analyzing station telemetry...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: 10 }}>
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask a decision question (e.g. 'Should I irrigate tomorrow?', 'What is causing current risk?')..."
          disabled={isSending}
          style={{
            flex: 1,
            background: 'rgba(15, 26, 48, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 16px',
            color: '#fff',
            fontSize: '0.85rem',
            fontFamily: 'inherit',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={isSending || !inputQuery.trim()}
          style={{ padding: '0 20px' }}
        >
          <Send size={16} />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
};
