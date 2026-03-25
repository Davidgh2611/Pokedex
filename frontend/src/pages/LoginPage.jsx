import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, ChevronRight, Zap } from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isRegister ? '/auth/register' : '/auth/login';
            const response = await axios.post(`http://localhost:3001${endpoint}`, formData);
            
            if (isRegister) {
                alert('Registro completado con éxito. Ya puedes iniciar sesión.');
                setIsRegister(false);
            } else {
                login(response.data.user, response.data.token);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error en la autenticación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="glass rounded-[40px] p-8 md:p-12 max-w-lg w-full border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-scale-in relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pokemon-red/10 blur-3xl -z-10"></div>
                
                <header className="text-center mb-10">
                    <div className="inline-flex w-16 h-16 bg-pokemon-red rounded-2xl items-center justify-center mb-6 shadow-[0_10px_20px_rgba(239,68,68,0.3)]">
                        <Zap className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-cyber font-bold text-gray-900 dark:text-white uppercase tracking-tighter">
                        {isRegister ? 'New' : 'Nexus'}<span className="text-pokemon-red ml-2">{isRegister ? 'Trainer' : 'Login'}</span>
                    </h1>
                    <p className="mt-2 text-xs font-cyber text-gray-500 uppercase tracking-widest">
                        Access the PokéNexus 2026 Core
                    </p>
                </header>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-xs font-cyber mb-6 uppercase tracking-wider animate-shake">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pokemon-red transition-colors w-5 h-5" />
                            <input 
                                type="text" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-cyber text-sm focus:border-pokemon-red outline-none transition-all placeholder:text-gray-600"
                                placeholder="USERNAME"
                                value={formData.username}
                                onChange={e => setFormData({...formData, username: e.target.value})}
                            />
                        </div>

                        {isRegister && (
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pokemon-red transition-colors w-5 h-5" />
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-cyber text-sm focus:border-pokemon-red outline-none transition-all placeholder:text-gray-600"
                                    placeholder="EMAIL ADDRESS"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        )}

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pokemon-red transition-colors w-5 h-5" />
                            <input 
                                type="password" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-cyber text-sm focus:border-pokemon-red outline-none transition-all placeholder:text-gray-600"
                                placeholder="PASSWORD"
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 rounded-2xl bg-pokemon-red text-white font-cyber font-bold text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_15px_30px_rgba(239,68,68,0.25)] flex items-center justify-center gap-2 group"
                    >
                        {loading ? 'Processing...' : isRegister ? 'Register Now' : 'Sync Interface'}
                        {!loading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <footer className="mt-10 text-center">
                    <button 
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-[10px] font-cyber font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
                    >
                        {isRegister ? 'Already have a signal? Login' : 'Need new credentials? Register'}
                    </button>
                </footer>
            </div>
        </main>
    );
}
