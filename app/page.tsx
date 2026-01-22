"use client";

import { useState, ChangeEvent, useRef } from "react";
import axios from "axios";
import { 
  Upload, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Scan, 
  AlertTriangle, 
  ChevronRight,
  RefreshCw,
  ImageIcon
} from "lucide-react";

interface Breakdown {
  svm_confidence: number;
  rf_confidence: number;
  cnn_confidence: number;
}

interface AnalysisResult {
  final_prediction: string;
  confidence_score: number;
  breakdown: Breakdown;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Connection Error: Neural Network Offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-indigo-500/30">
      
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #404040 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <nav className="relative z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <Scan className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">InfraGuard <span className="text-indigo-500">AI</span></span>
          </div>
          <div className="text-xs font-mono text-neutral-500 hidden sm:block">
            SYSTEM STATUS: ONLINE
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/20 border border-indigo-500/30 text-indigo-400 text-xs font-medium uppercase tracking-wider">
              <Zap size={14} /> 
              Next-Gen Forensics
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Autonomous Road <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Damage Detection
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Leveraging ensemble deep learning to analyze structural integrity. 
              Upload inspection imagery to detect cracks, potholes, and surface fatigue instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
            <FeatureCard 
              icon={<Cpu size={20} />} 
              title="Multi-Model Core" 
              desc="Combines CNN, SVM, and Random Forest for 99% accuracy." 
            />
            <FeatureCard 
              icon={<Activity size={20} />} 
              title="Real-time Analysis" 
              desc="Instant processing via optimized FastAPI backend pipelines." 
            />
            <FeatureCard 
              icon={<ShieldCheck size={20} />} 
              title="Grade-A Reliability" 
              desc="Enterprise-grade damage classification standards." 
            />
          </div>
        </div>

        <div className="flex-1 w-full max-w-md mx-auto lg:max-w-full">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-2 shadow-2xl backdrop-blur-sm">
            
            <div className="h-8 bg-neutral-900 rounded-t-xl border-b border-neutral-800 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              
              <div className="relative group">
                <div 
                  onClick={handleTriggerUpload}
                  className={`
                  relative w-full h-56 sm:h-64 rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden flex flex-col items-center justify-center cursor-pointer
                  ${preview ? 'border-indigo-500/50 bg-neutral-900' : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-500 hover:bg-neutral-800'}
                `}>
                  {preview ? (
                    <>
                      <img src={preview} alt="Analysis Target" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
                    </>
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto text-neutral-400 group-hover:text-indigo-400 transition-colors">
                        <Upload size={24} />
                      </div>
                      <p className="text-sm font-medium text-neutral-300">Upload Inspection Image</p>
                      <p className="text-xs text-neutral-500">Supports JPG, PNG, WEBP</p>
                    </div>
                  )}
                  
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    onChange={handleFileChange} 
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {selectedFile ? (
                  <>
                    <button
                      onClick={handleTriggerUpload}
                      className="w-full sm:flex-1 py-3 sm:py-4 px-4 rounded-lg font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
                    >
                      <RefreshCw size={16} /> Change
                    </button>
                    
                    <button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="w-full sm:flex-[2] py-3 sm:py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>Processing <Activity className="animate-pulse" size={16} /></>
                      ) : (
                        <>Run Diagnostics <ChevronRight size={16} /></>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleTriggerUpload}
                    className="w-full py-3 sm:py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700"
                  >
                    <ImageIcon size={16} /> Select File to Begin
                  </button>
                )}
              </div>

              {error && (
                <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                  <AlertTriangle size={18} />
                  {error}
                </div>
              )}

              {result && (
                <div className="mt-6 pt-6 border-t border-neutral-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-mono mb-1">Primary Detection</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white capitalize">{result.final_prediction}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-400">
                        {(result.confidence_score * 100).toFixed(1)}%
                      </div>
                      <p className="text-xs text-neutral-500 uppercase font-mono">Confidence</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Ensemble Breakdown</p>
                    <TechProgressBar label="CNN (Deep Learning)" score={result.breakdown.cnn_confidence} color="bg-cyan-500" />
                    <TechProgressBar label="Random Forest (Texture)" score={result.breakdown.rf_confidence} color="bg-emerald-500" />
                    <TechProgressBar label="SVM (Structure)" score={result.breakdown.svm_confidence} color="bg-amber-500" />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-neutral-900 mt-12 sm:mt-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
            <Scan className="w-6 h-6" />
            <span className="font-bold">InfraGuard AI</span>
          </div>
          
          <div className="text-center md:text-right">
             <p className="text-neutral-500 text-sm font-medium">
               Modern App <span className="text-neutral-300">InfraGuard AI</span> was designed by <span className="text-indigo-400">Suresh Maheshwari</span>
             </p>
             <p className="text-neutral-600 text-xs mt-1">© {new Date().getFullYear()} All Systems Operational.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700 transition-colors">
      <div className="text-indigo-500 mb-3">{icon}</div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-neutral-400 leading-snug">{desc}</p>
    </div>
  );
}

function TechProgressBar({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="group">
      <div className="flex justify-between text-xs mb-1.5 font-mono text-neutral-400">
        <span>{label}</span>
        <span className="text-white">{(score * 100).toFixed(1)}%</span>
      </div>
      <div className="w-full bg-neutral-800 rounded-sm h-1.5 overflow-hidden">
        <div
          className={`${color} h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
          style={{ width: `${score * 100}%` }}
        ></div>
      </div>
    </div>
  );
}