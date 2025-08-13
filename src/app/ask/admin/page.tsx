"use client";
import { useEffect, useState } from 'react';

type Config = {
  systemInstructions: string;
  hiddenKnowledge: string[];
  blockedPhrases: string[];
  apiKeys: { openai: string };
};

type LogEntry = {
  ts: string;
  user: { name: string; email: string };
  goal: string;
  category: string;
};

export default function AskAdminPage() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [config, setConfig] = useState<Config | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'logs'>('config');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    if (authed) {
      fetch('/api/ask/config').then(async (r) => setConfig(await r.json()));
      fetch('/api/ask/logs').then(async (r) => setLogs(await r.json()));
    }
  }, [authed]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'mahmoud' && password === 'AdminI$King') {
      setAuthed(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const save = async () => {
    if (!config) return;
    setSaving(true);
    await fetch('/api/ask/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    setSaving(false);
    alert('Saved');
  };

  if (!authed) {
    return (
      <div className="max-w-md mx-auto py-10 space-y-4">
        <h1 className="text-2xl font-bold">Ask Admin</h1>
        <form onSubmit={login} className="space-y-3">
          <input className="w-full p-3 rounded border" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="w-full p-3 rounded border" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="px-5 py-2 rounded bg-olive text-white" type="submit">Login</button>
        </form>
      </div>
    );
  }

  if (!config) return <div className="max-w-3xl mx-auto py-10">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Ask Mahmoud – Admin</h1>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 border-b">
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'config'
              ? 'bg-olive text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Configuration
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'logs'
              ? 'bg-olive text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Question Logs ({logs.length})
        </button>
      </div>

      {/* Configuration Tab */}
      {activeTab === 'config' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-medium">System instructions</label>
            <textarea 
              className="w-full p-3 rounded border" 
              rows={5} 
              value={config.systemInstructions} 
              onChange={(e) => setConfig({ ...config, systemInstructions: e.target.value })} 
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Hidden knowledge (one per line)</label>
            <textarea 
              className="w-full p-3 rounded border" 
              rows={6} 
              value={config.hiddenKnowledge.join('\n')} 
              onChange={(e) => setConfig({ ...config, hiddenKnowledge: e.target.value.split('\n') })} 
            />
            <p className="text-sm text-gray-600">This is the knowledge base that Ask Mahmoud will use to answer questions.</p>
          </div>
          <div className="space-y-2">
            <label className="font-medium">Blocked phrases (one per line)</label>
            <textarea 
              className="w-full p-3 rounded border" 
              rows={3} 
              value={config.blockedPhrases.join('\n')} 
              onChange={(e) => setConfig({ ...config, blockedPhrases: e.target.value.split('\n') })} 
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium">OpenAI API Key</label>
            <input 
              className="w-full p-3 rounded border" 
              placeholder="sk-..." 
              value={config.apiKeys.openai} 
              onChange={(e) => setConfig({ ...config, apiKeys: { openai: e.target.value } })} 
            />
          </div>
          <button 
            onClick={save} 
            disabled={saving} 
            className="px-6 py-3 rounded bg-keffiyeh-red text-white hover:bg-keffiyeh-red/80 transition"
          >
            {saving ? 'Saving…' : 'Save Configuration'}
          </button>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Asked Questions</h2>
            <button 
              onClick={() => fetch('/api/ask/logs').then(async (r) => setLogs(await r.json()))}
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition"
            >
              Refresh
            </button>
          </div>
          
          {logs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No questions asked yet.</p>
          ) : (
            <div className="overflow-auto rounded border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Time</th>
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Email</th>
                    <th className="px-4 py-3 text-left font-medium">Category</th>
                    <th className="px-4 py-3 text-left font-medium">Question</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.map((log, idx) => (
                    <tr key={idx} className={idx % 2 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {new Date(log.ts).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                        {log.user?.name || 'N/A'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {log.user?.email || 'N/A'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full bg-olive/20 text-olive text-xs">
                          {log.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-800 max-w-md">
                        <div className="truncate" title={log.goal}>
                          {log.goal}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


