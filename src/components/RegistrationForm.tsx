"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, UploadCloud, CheckCircle, ChevronDown } from 'lucide-react';

export function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Form State Handlers
  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 1500);
  };

  const inputClass = "w-full bg-gradient-to-b from-[#F5EFE1] to-[#FAF6EE] border-[1.5px] border-[#C59B46] rounded-full px-5 py-3.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/60 outline-none focus:border-[#A67C00] focus:ring-1 focus:ring-[#A67C00] transition-all shadow-[inset_0_0_12px_rgba(212,175,55,0.25),0_2px_4px_rgba(0,0,0,0.05)]";
  const selectClass = "w-full bg-gradient-to-b from-[#F5EFE1] to-[#FAF6EE] border-[1.5px] border-[#C59B46] rounded-full px-5 py-3.5 text-sm text-[#1a1a1a] appearance-none outline-none focus:border-[#A67C00] focus:ring-1 focus:ring-[#A67C00] transition-all shadow-[inset_0_0_12px_rgba(212,175,55,0.25),0_2px_4px_rgba(0,0,0,0.05)]";
  const labelClass = "text-[10px] font-black text-[#1a1a1a] uppercase tracking-widest block mb-1.5 opacity-80 pl-2";

  if (isDone) {
    return (
      <div className="text-center py-12 flex flex-col items-center">
        <CheckCircle className="text-[#22c55e] w-16 h-16 mb-6" />
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 uppercase">Registration Complete</h2>
        <p className="text-[#1a1a1a]/60 mb-6 font-medium">Your application is under review by the judging panel.</p>
        <button onClick={() => { setIsDone(false); setStep(1); }} className="px-8 py-4 bg-[#050B14] text-white font-bold uppercase text-xs tracking-widest rounded-full transition-colors shadow-lg shadow-black/20 hover:scale-105 active:scale-95 border border-[#050B14]">Start Fresh</button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-start mb-8 gap-2 border-b-2 border-transparent pb-4 relative z-10">
        <div className="absolute inset-x-0 inset-y-[-10px] bg-[#F8F1E1] blur-xl -z-10 opacity-90 rounded-full w-48" />
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-[10px] md:text-xs font-black transition-all shadow-sm relative z-10 ${step >= s ? 'bg-[#1a1a1a] text-[#d4af37] border border-[#d4af37]' : 'bg-white/40 text-[#1a1a1a]/40 border border-[#1a1a1a]/20'} ${step === s ? 'scale-110 shadow-md ring-2 ring-[#d4af37]/30 ring-offset-2 ring-offset-[#fbf8f1]' : ''}`}>
            {s === 1 ? '01' : s === 2 ? '02' : s === 3 ? '03' : '04'}
          </div>
        ))}
      </div>

      <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
        
        {/* Step 1: Identity */}
        {step === 1 && (
          <div className="space-y-4">
             <h3 className="text-xl font-black text-[#1a1a1a] mb-6 uppercase tracking-tight text-center">Section 1: Identity</h3>
             <div>
                <label className={labelClass}>Full Name</label>
                <input required type="text" className={inputClass} placeholder="Enter your full name" />
             </div>
             <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
               <div>
                  <label className={labelClass}>Sex</label>
                  <div className="relative">
                    <select required className={selectClass}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#C59B46] pointer-events-none" size={16} />
                  </div>
               </div>
               <div>
                  <label className={labelClass}>Age</label>
                  <input required type="number" min="18" className={inputClass} placeholder="Age" />
               </div>
             </div>
             <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
               <div>
                 <label className={labelClass}>Date of Birth</label>
                 <input required type="date" className={inputClass} />
               </div>
               <div>
                 <label className={labelClass}>Hometown</label>
                 <input required type="text" className={inputClass} placeholder="e.g. Kumasi" />
               </div>
             </div>
             <div>
                <label className={labelClass}>Current Location</label>
                <input required type="text" className={inputClass} placeholder="Where do you live now?" />
             </div>
             <div>
                <label className={labelClass}>Languages Spoken</label>
                <input required type="text" className={inputClass} placeholder="e.g. English, Twi, Ga" />
             </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-[#1a1a1a] mb-6 uppercase tracking-tight text-center">Section 2: Experience</h3>
            <div>
               <label className={labelClass}>Student Status</label>
               <div className="relative">
                 <select required className={selectClass}>
                   <option value="">Select Status</option>
                   <option value="Current">Current Student</option>
                   <option value="Graduate">Graduate</option>
                   <option value="Not a student">Not a student</option>
                 </select>
                 <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#C59B46] pointer-events-none" size={16} />
               </div>
            </div>
            <div>
               <label className={labelClass}>Business Experience (Years & Type)</label>
               {/* Textarea gets 3xl instead of full to avoid looking like an oval */}
               <textarea required rows={4} className="w-full bg-gradient-to-b from-[#F5EFE1] to-[#FAF6EE] border-[1.5px] border-[#C59B46] rounded-[2rem] px-5 py-4 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/60 outline-none focus:border-[#A67C00] focus:ring-1 focus:ring-[#A67C00] transition-all shadow-[inset_0_0_12px_rgba(212,175,55,0.25),0_2px_4px_rgba(0,0,0,0.05)]" placeholder="Detail your entrepreneurial journey..."></textarea>
            </div>
          </div>
        )}

        {/* Step 3: Emergency */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-[#1a1a1a] mb-6 uppercase tracking-tight text-center">Section 3: Contact</h3>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Telephone</label>
                <input required type="tel" className={inputClass} placeholder="Phone number" />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input required type="email" className={inputClass} placeholder="Email address" />
              </div>
            </div>
            <div>
               <label className={labelClass}>Mother's Name & Phone</label>
               <input type="text" className={inputClass} placeholder="Name - Phone" />
            </div>
            <div>
               <label className={labelClass}>Father's Name & Phone</label>
               <input type="text" className={inputClass} placeholder="Name - Phone" />
            </div>
            <div>
               <label className={labelClass}>Emergency Contact Person</label>
               <input required type="text" className={inputClass} placeholder="Name, Relationship, Phone" />
            </div>
          </div>
        )}

        {/* Step 4: Media */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-[#1a1a1a] mb-6 uppercase tracking-tight text-center">Section 4: Media</h3>
            <div className="border border-dashed border-[#d4af37] rounded-md p-8 flex flex-col items-center justify-center text-center bg-white/50 hover:bg-white cursor-pointer transition-colors shadow-sm group">
              <div className="w-16 h-16 rounded-md bg-[#1a1a1a] flex items-center justify-center text-[#d4af37] mb-4 group-hover:scale-105 transition-transform shadow-lg">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm text-[#1a1a1a] font-bold mb-1">Click to sync with Cloudinary</p>
              <p className="text-xs text-[#1a1a1a]/60">Upload your pitch video (Max 50MB)</p>
            </div>
          </div>
        )}

        {/* Form Controls */}
        <div className="pt-6 flex gap-4 mt-8">
           {step > 1 && (
             <button type="button" onClick={handleBack} className="flex-1 py-3.5 bg-transparent border-2 border-[#1a1a1a]/20 text-[#1a1a1a] font-bold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2 hover:bg-[#1a1a1a]/5 transition-colors">
                <ArrowLeft size={16} /> Back
             </button>
           )}
           {step < 4 ? (
             <button type="submit" className="flex-1 py-3.5 bg-[#050B14] text-white font-bold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-all shadow-lg active:scale-[0.98]">
                Next Step <ArrowRight size={16} />
             </button>
           ) : (
             <button type="submit" disabled={isSubmitting} className="flex-1 py-3.5 bg-[#050B14] text-[#FDE08B] font-black text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50">
                {isSubmitting ? 'Processing...' : 'Register Now'}
             </button>
           )}
        </div>
      </form>
    </div>
  );
}
