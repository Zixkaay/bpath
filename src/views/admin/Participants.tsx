"use client";

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { ParticipantStatus, RankingTier, DatabaseParticipant } from '@/types/database';
import { cn } from '@/lib/utils';
import { UserCog, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export function AdminParticipants() {
  const { participants, updateParticipantStatus, updateParticipantRanking } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParticipants = participants.filter(p => 
    p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRankingChange = (id: string, newRanking: string) => {
    const val = newRanking === 'none' ? null : parseInt(newRanking, 10) as RankingTier;
    updateParticipantRanking(id, val);
  };

  const StatusIcon = ({ status }: { status: ParticipantStatus }) => {
    switch (status) {
      case 'Approved': return <CheckCircle2 className="text-[#22c55e]" size={16} />;
      case 'Pending': return <Clock className="text-[#eab308]" size={16} />;
      case 'Evicted': return <ShieldAlert className="text-[#ef4444]" size={16} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <p className="text-[#A3A3A3] text-sm mb-1 font-medium tracking-wide uppercase">Lifecycle & Ranking Manager</p>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Participants Library</h1>
      </header>

      <section className="bg-[#0a0a0a] rounded-xl border border-[#262626] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#262626] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1a1a1a]">
          <input 
            type="text" 
            placeholder="Search by name or nickname..." 
            className="w-full sm:max-w-sm px-4 py-2 bg-black border border-[#333] rounded-lg text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="text-sm text-[#A3A3A3] font-bold uppercase tracking-widest shrink-0">
            Total count: {participants.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white min-w-[600px]">
            <thead className="bg-[#1a1a1a] text-xs uppercase tracking-widest font-bold text-[#A3A3A3] border-b border-[#262626]">
              <tr>
                <th className="px-4 md:px-6 py-4">Participant</th>
                <th className="px-4 md:px-6 py-4">Status & Votes</th>
                <th className="px-4 md:px-6 py-4">Ranking Tier</th>
                <th className="px-4 md:px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {filteredParticipants.map((p) => (
                <tr key={p.id} className="hover:bg-[#1a1a1a]/50 transition-colors">
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1a1a1a] overflow-hidden shrink-0 shadow-sm border border-[#333]">
                        {p.media_urls?.images?.[0] ? (
                          <img src={p.media_urls.images[0]} alt={p.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#A3A3A3]"><UserCog size={18} /></div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white mb-0.5 truncate">{p.full_name}</div>
                        <div className="text-[#d4af37] text-xs font-serif italic truncate">@{p.nickname}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-widest whitespace-nowrap">
                        <StatusIcon status={p.status} /> {p.status}
                      </div>
                      <div className="text-xs text-[#A3A3A3] font-bold whitespace-nowrap">{p.vote_count.toLocaleString()} votes</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <select 
                      value={p.ranking || 'none'}
                      onChange={(e) => handleRankingChange(p.id, e.target.value)}
                      className={cn(
                        "px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest focus:outline-none transition-colors border",
                        p.ranking === 1 ? "bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]" :
                        p.ranking === 2 ? "bg-white/20 text-white border-white" :
                        p.ranking === 3 ? "bg-[#A67C00]/20 text-[#A67C00] border-[#A67C00]" :
                        "bg-black text-[#A3A3A3] border-[#333] hover:border-[#d4af37]"
                      )}
                    >
                      <option value="none">Unranked</option>
                      <option value="1">1st Runner</option>
                      <option value="2">2nd Runner</option>
                      <option value="3">3rd Runner</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        value={p.status}
                        onChange={(e) => updateParticipantStatus(p.id, e.target.value as ParticipantStatus)}
                        className="text-xs font-bold uppercase tracking-widest px-4 py-2 border border-[#333] rounded-lg bg-black text-white hover:border-[#d4af37] cursor-pointer focus:outline-none transition-colors"
                      >
                        <option value="Pending">Set Pending</option>
                        <option value="Approved">Set Approved</option>
                        <option value="Evicted">Set Evicted</option>
                      </select>
                      <button 
                        onClick={() => useAppStore.getState().removeParticipant(p.id)}
                        className="p-2 border border-[#ef4444]/30 text-[#ef4444] bg-[#ef4444]/10 rounded-lg hover:bg-[#ef4444]/20 transition-colors"
                        title="Delete Participant"
                      >
                        <ShieldAlert size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredParticipants.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-[#A3A3A3]">
                    No participants found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
