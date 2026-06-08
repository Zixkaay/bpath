"use client";

import { X, Play, Trophy, ShieldAlert, ArrowRight } from 'lucide-react';
import { DatabaseParticipant } from '@/types/database';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

interface ParticipantModalProps {
  participant: DatabaseParticipant;
  onClose: () => void;
}

export function ParticipantModal({ participant, onClose }: ParticipantModalProps) {
  const { showNotification, addVote } = useAppStore();
  const [isVoting, setIsVoting] = useState(false);
  const [voteAmount, setVoteAmount] = useState(10);
  const isEvicted = participant.status === 'Evicted';

  const handleVote = () => {
    // Paystack Webhook Simulation
    showNotification(`Processing secure transaction: Redirecting to Paystack Checkout for ${voteAmount} votes...`, 'info');
    
    setTimeout(() => {
      addVote(participant.id, voteAmount);
      showNotification(`Successfully verified payment! ${voteAmount} votes added for ${participant.full_name}.`, 'success');
    }, 1200);
    
    setIsVoting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-4xl bg-[#0a0a0a] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh] md:max-h-[800px]">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-[#d4af37] text-white hover:text-black rounded-full flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <X size={18} />
        </button>

        {isEvicted && (
           <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 bg-[#ef4444] text-white font-black text-xs sm:text-sm uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded shadow-lg flex items-center gap-1 sm:gap-2">
             <ShieldAlert size={14} className="sm:w-4 sm:h-4" /> Eliminated
           </div>
        )}

        {/* Top/Left: Image */}
        <div className="w-full md:w-[40%] h-[30vh] sm:h-64 md:h-auto relative bg-[#1a1a1a] shrink-0">
          <img 
            src={participant.media_urls.images[0]} 
            alt={participant.full_name} 
            className={`w-full h-full object-cover ${isEvicted ? 'grayscale opacity-60' : ''}`} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent block md:hidden"></div>
        </div>

        {/* Bottom/Right: Details & Voting */}
        <div className="w-full md:w-[60%] p-5 sm:p-6 md:p-10 overflow-y-auto flex flex-col">
           <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-1 sm:mb-2">{participant.full_name}</h2>
           <span className="text-[#d4af37] font-serif italic text-lg sm:text-xl mb-4 sm:mb-6 block">"{participant.nickname}"</span>
           
           <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black border border-[#262626] p-4 rounded-xl">
                 <span className="text-[#A3A3A3] text-[10px] uppercase tracking-widest font-bold block mb-1">Total Votes</span>
                 <span className="text-2xl font-black text-white">{participant.vote_count.toLocaleString()}</span>
              </div>
              <div className="bg-black border border-[#262626] p-4 rounded-xl">
                 <span className="text-[#A3A3A3] text-[10px] uppercase tracking-widest font-bold block mb-1">Gallery Rank</span>
                 <span className="text-2xl font-black text-white">{participant.ranking ? `#${participant.ranking}` : 'Unranked'}</span>
              </div>
           </div>

           <p className="text-[#A3A3A3] leading-relaxed mb-8">{participant.bio}</p>

           <div className="grid grid-cols-2 gap-4 mb-8">
              {Object.entries(participant.metadata).map(([key, val]) => (
                 <div key={key}>
                    <span className="text-white font-bold block text-sm">{key}</span>
                    <span className="text-[#A3A3A3] text-sm">{String(val)}</span>
                 </div>
              ))}
           </div>

           {/* Performance Videos Section */}
           <div className="mb-8">
             <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4 border-b border-[#262626] pb-2">Performance Archive</h3>
             <div className="grid grid-cols-2 gap-4">
                {/* Mock Video Library assigned by admin */}
                <div className="bg-[#1a1a1a] aspect-video rounded-lg flex items-center justify-center border border-[#333] hover:border-[#d4af37] cursor-pointer group transition-colors">
                   <div className="w-10 h-10 rounded-full bg-black/50 group-hover:bg-[#d4af37] flex items-center justify-center text-white group-hover:text-black">
                     <Play size={16} className="ml-1" />
                   </div>
                </div>
                <div className="bg-[#1a1a1a] aspect-video rounded-lg flex items-center justify-center border border-[#333] hover:border-[#d4af37] cursor-pointer group transition-colors">
                   <div className="w-10 h-10 rounded-full bg-black/50 group-hover:bg-[#d4af37] flex items-center justify-center text-white group-hover:text-black">
                     <Play size={16} className="ml-1" />
                   </div>
                </div>
             </div>
           </div>

           {/* Vote Logic Context block */}
           <div className="mt-auto">
             {!isEvicted ? (
               isVoting ? (
                  <div className="bg-[#1a1a1a] border border-[#d4af37] p-6 rounded-xl animate-in slide-in-from-bottom-4">
                    <h4 className="text-white font-bold uppercase mb-4 text-sm tracking-widest">Cast Power Votes</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[10, 50, 100, 500].map(v => (
                        <button key={v} onClick={() => setVoteAmount(v)} className={`flex-1 min-w-[60px] py-2 sm:py-3 text-xs sm:text-sm font-bold rounded ${voteAmount === v ? 'bg-[#d4af37] text-black' : 'bg-black text-white border border-[#333]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    <button onClick={handleVote} className="w-full bg-[#d4af37] text-black font-black uppercase tracking-widest py-4 rounded hover:bg-white transition-colors flex justify-center items-center gap-2">
                       Pay GHC {voteAmount * 5} <ArrowRight size={16}/>
                    </button>
                    <button onClick={() => setIsVoting(false)} className="w-full text-[#A3A3A3] text-xs font-bold uppercase py-3 mt-2 hover:text-white">Cancel</button>
                  </div>
               ) : (
                  <button onClick={() => setIsVoting(true)} className="w-full bg-gradient-to-r from-[#D4AF37] to-[#A67C00] text-black font-black uppercase tracking-widest py-5 rounded-xl hover:opacity-90 transition-opacity flex justify-center items-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <Trophy size={20} /> Support Participant
                  </button>
               )
             ) : (
               <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] p-4 rounded-xl text-center font-bold uppercase tracking-widest text-sm">
                 Voting Disabled - Eliminated
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
