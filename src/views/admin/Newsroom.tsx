"use client";

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { FileText, Save, ShieldAlert, Plus } from 'lucide-react';
import { DatabaseBlogPost as BlogPost } from '@/types/database';

export function AdminNewsroom() {
  const { blogPosts, updateBlogPost, removeBlogPost, addBlogPost } = useAppStore();
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  const handleSave = () => {
    if (!editingPost) return;
    
    if (editingPost.id) {
      updateBlogPost(editingPost.id, editingPost);
    } else {
      addBlogPost({
        ...editingPost,
        id: 'b' + Date.now(),
        created_at: new Date().toISOString()
      } as BlogPost);
    }
    setEditingPost(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <p className="text-[#A3A3A3] text-xs sm:text-sm mb-1 font-medium tracking-wide uppercase">Content Management</p>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Newsroom Admin</h1>
        </div>
        <button 
          onClick={() => setEditingPost({ title: '', excerpt: '', content: '', image_url: '', is_featured: false })}
          className="bg-accent text-black font-bold uppercase text-xs px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 w-full sm:w-auto"
        >
          <Plus size={16} /> Add Article
        </button>
      </header>

      {editingPost !== null && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-xl mb-8">
          <h2 className="text-white font-bold text-xl mb-4">{editingPost.id ? 'Edit Article' : 'New Article'}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-sub uppercase mb-1">Title</label>
              <input type="text" value={editingPost.title || ''} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full bg-bg border border-border px-4 py-2 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-sub uppercase mb-1">Excerpt</label>
              <input type="text" value={editingPost.excerpt || ''} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} className="w-full bg-bg border border-border px-4 py-2 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-sub uppercase mb-1">Content (Full Text)</label>
              <textarea rows={6} value={editingPost.content || ''} onChange={e => setEditingPost({...editingPost, content: e.target.value})} className="w-full bg-bg border border-border px-4 py-2 rounded-lg text-white"></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-sub uppercase mb-1">Image URL</label>
              <input type="text" value={editingPost.image_url || ''} onChange={e => setEditingPost({...editingPost, image_url: e.target.value})} className="w-full bg-bg border border-border px-4 py-2 rounded-lg text-white" />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="feature" checked={!!editingPost.is_featured} onChange={e => setEditingPost({...editingPost, is_featured: e.target.checked})} className="w-4 h-4" />
              <label htmlFor="feature" className="text-white text-sm">Feature on Homepage</label>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="flex-1 bg-accent text-black font-bold uppercase text-xs py-3 rounded-lg flex justify-center items-center gap-2 hover:opacity-90">
                <Save size={16} /> Save Article
              </button>
              <button onClick={() => setEditingPost(null)} className="flex-1 bg-bg text-white border border-border font-bold uppercase text-xs py-3 rounded-lg hover:border-text-sub transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col group">
             <div className="h-48 overflow-hidden relative">
               <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               {post.is_featured && <div className="absolute top-2 left-2 bg-accent text-black text-[10px] uppercase font-bold px-2 py-1 rounded">Featured</div>}
             </div>
             <div className="p-5 flex flex-col flex-1">
               <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
               <p className="text-text-sub text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
               
               <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                 <button onClick={() => setEditingPost(post)} className="flex-1 bg-bg border border-border text-white text-xs font-bold uppercase py-2 rounded hover:border-accent transition-colors">
                   Edit
                 </button>
                 <button onClick={() => removeBlogPost(post.id)} className="bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/30 px-3 py-2 rounded hover:bg-[#ef4444]/20 transition-colors">
                   <ShieldAlert size={16} />
                 </button>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
