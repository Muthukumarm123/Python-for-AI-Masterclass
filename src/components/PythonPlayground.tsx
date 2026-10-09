import React, { useState } from 'react';
import { runPythonCode, RunResult } from '../utils/pythonRunner';
import { Play, RotateCcw, Copy, Check, Trash2, Terminal, Code2, Sparkles } from 'lucide-react';

interface PresetScript {
  id: string;
  title: string;
  description: string;
  code: string;
}

const PRESET_SCRIPTS: PresetScript[] = [
  {
    id: 'preset-prompt-formatter',
    title: 'LLM Prompt Formatter',
    description: 'Dynamic f-string prompt formatting with role tags and variable interpolation.',
    code: `# Dynamic LLM Prompt Builder
def build_agent_prompt(role: str, user_query: str, context: list[str]) -> str:
    formatted_context = "\\n".join(f"- {c}" for c in context)
    return f"""[SYSTEM: {role.upper()}]
CONTEXT:
{formatted_context}

USER REQUEST:
{user_query.strip()}

RESPONSE GUIDELINE:
Provide a concise, direct answer based strictly on the context."""

context_docs = [
    "Modern AI Engineering requires solid Python foundations.",
    "Astral uv manages packages 10x-100x faster than pip.",
    "Pydantic validates structured JSON outputs from models."
]

prompt = build_agent_prompt(
    role="senior ai engineer",
    user_query="Why should I use uv instead of pip for AI projects?",
    context=context_docs
)

print(prompt)`,
  },
  {
    id: 'preset-token-calculator',
    title: 'Token & Cost Calculator',
    description: 'Calculate token counts and dollar cost estimates for multiple frontier models.',
    code: `# Token & Cost Calculator for AI Workflows
MODEL_PRICING = {
    "gpt-4o": {"input_per_m": 2.50, "output_per_m": 10.00},
    "gpt-4o-mini": {"input_per_m": 0.15, "output_per_m": 0.60},
    "claude-3-5-sonnet": {"input_per_m": 3.00, "output_per_m": 15.00},
    "gemini-2-flash": {"input_per_m": 0.10, "output_per_m": 0.40},
}

def estimate_cost(model: str, input_tokens: int, output_tokens: int) -> float:
    rates = MODEL_PRICING.get(model)
    if not rates:
        raise ValueError(f"Unknown model: {model}")
    input_cost = (input_tokens / 1_000_000) * rates["input_per_m"]
    output_cost = (output_tokens / 1_000_000) * rates["output_per_m"]
    return input_cost + output_cost

prompt_tokens = 4_500
completion_tokens = 850

print(f"{'Model':<20} | {'Input Cost':<12} | {'Output Cost':<12} | {'Total'}")
print("-" * 55)

for model_name, rates in MODEL_PRICING.items():
    in_cost = (prompt_tokens / 1_000_000) * rates["input_per_m"]
    out_cost = (completion_tokens / 1_000_000) * rates["output_per_m"]
    total = in_cost + out_cost
    print(f"{model_name:<20} | \${in_cost:<11.5f} | \${out_cost:<11.5f} | \${total:.5f}")`,
  },
  {
    id: 'preset-chat-memory',
    title: 'Chatbot State & Context Window',
    description: 'Sliding window conversation memory manager to avoid context overflow.',
    code: `# Stateful Chat Memory with Window Truncation
class ChatBufferMemory:
    def __init__(self, system_persona: str, max_turns: int = 3):
        self.system_message = {"role": "system", "content": system_persona}
        self.messages = []
        self.max_turns = max_turns

    def add_exchange(self, user_msg: str, assistant_msg: str):
        self.messages.append({"role": "user", "content": user_msg})
        self.messages.append({"role": "assistant", "content": assistant_msg})
        
        # Enforce sliding window (keep last max_turns exchanges)
        if len(self.messages) > (self.max_turns * 2):
            self.messages = self.messages[-(self.max_turns * 2):]

    def get_full_payload(self):
        return [self.system_message] + self.messages

memory = ChatBufferMemory("You are a technical mentor.", max_turns=2)
memory.add_exchange("What is Python?", "An interpreted high-level language.")
memory.add_exchange("What is an API?", "An application programming interface.")
memory.add_exchange("What is RAG?", "Retrieval-Augmented Generation.")

payload = memory.get_full_payload()
print(f"Total messages in payload: {len(payload)}")
for msg in payload:
    print(f"[{msg['role'].upper()}]: {msg['content']}")`,
  },
  {
    id: 'preset-retry-logic',
    title: 'Exponential Backoff Retry Loop',
    description: 'Defensive retry loop simulating rate limit recovery for API connections.',
    code: `# Resilient Retry Pattern for AI Endpoints
import time

class RateLimitError(Exception):
    pass

def query_ai_service(attempt: int):
    # Fails twice, succeeds on third attempt
    if attempt < 3:
        raise RateLimitError("HTTP 429: Rate limit quota exceeded")
    return {"status": 200, "data": "Generated summary from LLM"}

def resilient_call(max_attempts=4, base_backoff_sec=0.1):
    for i in range(1, max_attempts + 1):
        try:
            print(f"[Attempt {i}] Contacting AI API...")
            response = query_ai_service(i)
            print("✓ Connection successful!")
            return response
        except RateLimitError as err:
            wait_time = base_backoff_sec * (2 ** (i - 1))
            print(f"  ⚠ {err}. Backing off {wait_time:.2f}s...")
            time.sleep(wait_time)
            
    raise RuntimeError("Failed after maximum retries")

result = resilient_call()
print("Final Received Payload:", result)`,
  },
  {
    id: 'preset-json-parsing',
    title: 'JSON LLM Response Sanitizer',
    description: 'Clean markdown backticks and deserialize structured JSON outputs.',
    code: `import json

raw_ai_output = """\`\`\`json
{
  "project": "AI Customer Support Agent",
  "recommended_stack": {
    "language": "Python 3.12",
    "package_manager": "uv",
    "framework": "FastAPI",
    "validation": "Pydantic"
  },
  "estimated_latency_ms": 280
}
\`\`\`"""

def extract_and_parse_json(text: str) -> dict:
    cleaned = text.strip()
    if cleaned.startswith("\`\`\`json"):
        cleaned = cleaned[7:]
    elif cleaned.startswith("\`\`\`"):
        cleaned = cleaned[3:]
    if cleaned.endswith("\`\`\`"):
        cleaned = cleaned[:-3]
    return json.loads(cleaned.strip())

data = extract_and_parse_json(raw_ai_output)
print("Parsed Project:", data["project"])
print("Stack Components:")
for k, v in data["recommended_stack"].items():
    print(f"  • {k}: {v}")
print(f"Estimated Latency: {data['estimated_latency_ms']}ms")`,
  },
];

export const PythonPlayground: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState(PRESET_SCRIPTS[0].id);
  const [code, setCode] = useState(PRESET_SCRIPTS[0].code);
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (preset: PresetScript) => {
    setSelectedPresetId(preset.id);
    setCode(preset.code);
    setResult(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    const res = await runPythonCode(code);
    setResult(res);
    setIsRunning(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearOutput = () => {
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
          <Terminal className="w-4 h-4" />
          <span>IN-BROWSER RUNTIME</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          Interactive Python Playground for AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Write and execute Python code directly in your browser. Experiment with LLM prompt templates, token pricing formulas, and JSON response handlers.
        </p>
      </div>

      {/* Preset Script Selector */}
      <div className="mb-6">
        <div className="text-xs font-mono text-slate-400 mb-2">PRE-CONFIGURED AI PRESETS</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {PRESET_SCRIPTS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 text-left rounded-lg border text-xs transition-all ${
                selectedPresetId === preset.id
                  ? 'bg-slate-900 border-emerald-500/50 text-slate-100 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="font-semibold text-slate-200 mb-1 line-clamp-1">{preset.title}</div>
              <div className="text-[11px] text-slate-400 line-clamp-2">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between gap-4 p-3 bg-slate-900/80 border border-slate-800 rounded-t-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>script.py</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">Python 3.12 Runtime</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => {
              const currentPreset = PRESET_SCRIPTS.find((p) => p.id === selectedPresetId);
              if (currentPreset) setCode(currentPreset.code);
            }}
            className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleClearOutput}
            className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>{isRunning ? 'Executing...' : 'Run Script'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Terminal 2-Zone Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-x border-b border-slate-800 rounded-b-xl overflow-hidden bg-slate-950">
        {/* Editor Area */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-800 h-[520px] flex flex-col bg-slate-950">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 bg-transparent text-xs sm:text-sm font-mono text-slate-100 resize-none focus:outline-none selection:bg-emerald-500/30 leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Console Stdout Area */}
        <div className="lg:col-span-5 h-[520px] flex flex-col bg-slate-950/90">
          <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>TERMINAL OUTPUT</span>
            {result && (
              <span className="text-emerald-400 text-[11px]">
                {result.executionTimeMs}ms · {result.engineUsed}
              </span>
            )}
          </div>

          <div className="flex-1 p-4 overflow-y-auto text-xs font-mono leading-relaxed">
            {isRunning ? (
              <div className="text-slate-500">Executing script...</div>
            ) : result ? (
              result.success ? (
                <pre className="text-emerald-300 whitespace-pre-wrap">{result.output}</pre>
              ) : (
                <pre className="text-rose-400 whitespace-pre-wrap">{result.error}</pre>
              )
            ) : (
              <div className="text-slate-500 space-y-2">
                <p>Ready to execute.</p>
                <p className="text-slate-600">
                  Click "Run Script" to execute this Python code and view stdout logs in real-time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
