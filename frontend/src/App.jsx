import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!name || !message) return alert("Please fill out both fields.");
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/api/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      
      setName('');
      setMessage('');
      fetchMessages();
    } catch (err) {
      alert('Error sending message');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API}/api/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setAllMessages(data);
    } catch {
      alert("Error fetching messages.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl w-full max-w-2xl shadow-2xl transition-all duration-500 hover:shadow-purple-500/25">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 shadow-lg">
              <span className="text-2xl">💬</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Message Board
            </h1>
            <p className="text-white/70 text-sm">Share your thoughts with the world</p>
          </div>

          {/* Input Form */}
          <div className="space-y-6 mb-8">
            <div className="relative group">
              <input
                className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="✨ Your Name"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <div className="relative group">
              <textarea
                rows={4}
                className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 resize-none group-hover:bg-white/15"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="💭 Share your thoughts..."
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    🚀 Send Message
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Messages Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-sm">📝</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Messages</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
              <span className="text-white/50 text-sm">{allMessages.length} messages</span>
            </div>
            
            <div className="max-h-80 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {allMessages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💫</span>
                  </div>
                  <p className="text-white/60 text-lg mb-2">No messages yet</p>
                  <p className="text-white/40 text-sm">Be the first to share something amazing!</p>
                </div>
              ) : (
                allMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.01] group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center font-bold text-white text-sm">
                          {msg.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <strong className="text-purple-300 font-semibold">{msg.name}</strong>
                          {msg.timestamp && (
                            <p className="text-white/40 text-xs">{formatTime(msg.timestamp)}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-white/30 group-hover:text-white/50 transition-colors">💬</span>
                    </div>
                    <p className="text-white/90 leading-relaxed pl-13">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-white\\/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </div>
  );
}