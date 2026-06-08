"use client";

import { useAppStore } from '@/store/useAppStore';
import { UploadCloud, Link as LinkIcon, Database, Video, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export function AdminMedia() {
  const { mediaLibrary } = useAppStore();
  const [activeTab, setActiveTab] = useState<'library' | 'device' | 'url'>('library');

  // Helper classes for standard UI
  const tabClass = (tab: string) => `flex items-center gap-2 px-6 py-4 font-bold text-sm uppercase tracking-widest border-b-2 transition-colors ${activeTab === tab ? 'border-[#d4af37] text-[#d4af37]' : 'border-transparent text-[#A3A3A3] hover:text-white'}`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
         <div>
           <h1 className="text-3xl font-black text-white uppercase tracking-tight">The Media Manager</h1>
           <p className="text-[#A3A3A3] text-sm mt-1">Control visual assets across all participants and posts.</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl overflow-hidden">
        {/* The 3 Choices Tabs */}
        <div className="flex border-b border-[#262626]">
          <button onClick={() => setActiveTab('library')} className={tabClass('library')}>
            <Database size={16} /> Internal Library
          </button>
          <button onClick={() => setActiveTab('device')} className={tabClass('device')}>
            <UploadCloud size={16} /> Device Upload
          </button>
          <button onClick={() => setActiveTab('url')} className={tabClass('url')}>
            <LinkIcon size={16} /> External URL
          </button>
        </div>

        <div className="p-8 min-h-[400px]">
          {/* Choice 1: Library */}
          {activeTab === 'library' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {mediaLibrary.map(media => (
                 <div key={media.id} className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden group cursor-pointer hover:border-[#d4af37] transition-colors">
                    <div className="h-40 relative bg-black flex items-center justify-center overflow-hidden">
                       {media.type === 'image' ? (
                          <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                       ) : (
                          <div className="flex flex-col items-center text-[#A3A3A3]">
                             <Video size={48} className="mb-2" />
                             <span className="text-xs uppercase tracking-widest">Video Asset</span>
                          </div>
                       )}
                    </div>
                    <div className="p-4 flex justify-between items-center">
                       <div>
                         <h4 className="text-white font-bold text-sm truncate">{media.name}</h4>
                         <span className="text-[#A3A3A3] text-[10px] uppercase tracking-widest">{media.type}</span>
                       </div>
                       <button className="text-xs text-[#d4af37] font-bold uppercase hover:text-white">Select</button>
                    </div>
                 </div>
               ))}
            </div>
          )}

          {/* Choice 2: Device Upload (Cloudinary Mock) */}
          {activeTab === 'device' && (
            <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#333] rounded-xl bg-black/50 hover:border-[#d4af37] transition-colors cursor-pointer group">
               <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#d4af37] transition-colors">
                  <UploadCloud size={32} className="text-[#A3A3A3] group-hover:text-black" />
               </div>
               <h3 className="text-white font-bold text-xl mb-2">Upload to Cloudinary</h3>
               <p className="text-[#A3A3A3] text-sm text-center max-w-sm mb-6">Select a file from your device. Supported formats: JPG, PNG, MP4. (Requires Cloudinary Secret).</p>
               <button className="bg-[#0A101D] border border-[#d4af37] text-[#d4af37] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#d4af37] hover:text-black transition-colors">
                 Choose File
               </button>
            </div>
          )}

          {/* Choice 3: External URL */}
          {activeTab === 'url' && (
            <div className="max-w-2xl mx-auto py-12">
               <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3"><LinkIcon className="text-[#d4af37]"/> Paste External Link</h3>
               <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#A3A3A3] uppercase tracking-widest block mb-2">Asset URL</label>
                    <input type="text" placeholder="https://..." className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#A3A3A3] uppercase tracking-widest block mb-2">Internal Reference Name</label>
                    <input type="text" placeholder="e.g. YouTube Pitch #4" className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] outline-none transition-colors" />
                  </div>
                  <div className="pt-4">
                    <button className="bg-[#d4af37] text-black px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors w-full">
                      Link Asset
                    </button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
