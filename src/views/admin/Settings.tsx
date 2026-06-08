"use client";

import { Save, ShieldAlert } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useState } from 'react';

export function AdminSettings() {
  const { settings, updateSettings, showNotification } = useAppStore();
  
  // Format the date for the HTML datetime-local input
  const defaultDate = new Date(settings.countdown_target);
  defaultDate.setMinutes(defaultDate.getMinutes() - defaultDate.getTimezoneOffset());
  const formattedDate = defaultDate.toISOString().slice(0, 16);

  const [date, setDate] = useState(formattedDate);
  const [prize, setPrize] = useState(settings.prize_pool_ghc);

  const handleSave = () => {
    updateSettings({
       countdown_target: new Date(date).toISOString(),
       prize_pool_ghc: prize
    });
    showNotification('System Settings saved successfully', 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <header>
        <p className="text-text-sub text-sm font-bold uppercase tracking-wider mb-1">Globals</p>
        <h1 className="text-3xl font-black text-text-main tracking-tight">Platform Settings</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
               <h2 className="text-xl font-bold text-text-main">General Details</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-text-sub uppercase tracking-wider block mb-2">Countdown Target Date</label>
                <input 
                  type="datetime-local" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm outline-none focus:border-accent" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-text-sub uppercase tracking-wider block mb-2">Total Prize Pool (GHC)</label>
                <input 
                  type="text" 
                  value={prize}
                  onChange={(e) => setPrize(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm outline-none focus:border-accent" 
                  placeholder="e.g. 1,000,000+"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Project Name</label>
                <input type="text" className="w-full mt-1.5 px-4 py-3 bg-bg border border-border rounded-xl text-sm" defaultValue="Next Billionaire Path" />
              </div>
              <div>
                <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Support Email</label>
                <input type="text" className="w-full mt-1.5 px-4 py-3 bg-bg border border-border rounded-xl text-sm" defaultValue="directors@nextbillionaire.io" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Vote Pricing ($)</label>
                  <input type="number" className="w-full mt-1.5 px-4 py-3 bg-bg border border-border rounded-xl text-sm" defaultValue="0.50" />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Currency Base</label>
                  <select className="w-full mt-1.5 px-4 py-3 bg-bg border border-border rounded-xl text-sm outline-none">
                    <option>USD</option>
                    <option>NGN</option>
                    <option>GHC</option>
                    <option>GBP</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 border-t border-border space-y-4">
                 <div>
                    <label className="text-xs font-bold text-text-sub uppercase tracking-wider block mb-2">About Mission Text</label>
                    <textarea 
                      value={settings.about_mission || ''}
                      onChange={(e) => updateSettings({ about_mission: e.target.value })}
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm outline-none focus:border-accent min-h-[100px]" 
                      placeholder="Enter mission statements..."
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-text-sub uppercase tracking-wider block mb-2">About Vision Text</label>
                    <textarea 
                      value={settings.about_vision || ''}
                      onChange={(e) => updateSettings({ about_vision: e.target.value })}
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm outline-none focus:border-accent min-h-[100px]" 
                      placeholder="Enter vision statements..."
                    />
                 </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                <Save size={18} /> Save Settings
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-bold text-text-main border-b border-border pb-3 mb-4">Manage Sponsors</h2>
            <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
              {useAppStore(s => s.sponsors).map(sponsor => (
                <div key={sponsor.id} className="flex items-center justify-between bg-bg border border-border p-3 rounded-lg group">
                   <div className="flex flex-col">
                     <span className="text-white font-bold text-sm tracking-wide">{sponsor.name}</span>
                     <span className="text-[#A3A3A3] text-[10px] uppercase tracking-widest">{sponsor.logo_type}</span>
                   </div>
                   <button 
                     onClick={() => useAppStore.getState().removeSponsor(sponsor.id)}
                     className="text-red-500 hover:text-red-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-red-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                     Remove
                   </button>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-border">
              <label className="text-[10px] font-bold text-text-sub uppercase tracking-wider block mb-2">Quick Add Sponsor (Name)</label>
              <div className="flex gap-2">
                <input id="new-sponsor-name" type="text" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-sm outline-none focus:border-accent" placeholder="e.g. Acme Corp" />
                <button 
                  onClick={() => {
                    const nameInput = document.getElementById('new-sponsor-name') as HTMLInputElement;
                    if (nameInput.value.trim()) {
                      useAppStore.getState().addSponsor({
                        id: 's' + Date.now(),
                        name: nameInput.value.trim(),
                        logo_type: 'text',
                        logo_content: nameInput.value.trim().charAt(0).toUpperCase()
                      });
                      nameInput.value = '';
                    }
                  }}
                  className="px-4 bg-accent text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:opacity-90 flex-shrink-0"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-orange-800 font-bold mb-4">
              <ShieldAlert size={20} />
              Danger Zone
            </div>
            <p className="text-sm text-orange-700 leading-relaxed mb-6">
              Executing logic here will irreversibly destroy or modify core structures of the Next Billionaire Path.
            </p>
            <div className="space-y-3">
               <button className="w-full px-4 py-3 bg-white border border-orange-300 text-orange-800 font-bold text-sm rounded-xl text-center hover:bg-orange-100 transition-colors">
                 Reset All Votes to Zero
               </button>
               <button className="w-full px-4 py-3 bg-red-600 text-white font-bold text-sm rounded-xl text-center shadow-md hover:bg-red-700 transition-colors">
                 Erase Participant Database
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
