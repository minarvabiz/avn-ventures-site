import React, { useState, useRef } from 'react';
import { useContent } from '../contexts/ContentContext';
import { storage, isConfigured } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Trash2, Plus, RotateCcw, Lock, Image as ImageIcon, Layout, Settings, Save, Upload, Cloud, Loader2 } from 'lucide-react';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const { heroImages, galleryImages, updateHeroImages, updateGalleryImages, resetToDefaults, isFirebaseActive } = useContent();
  const [activeTab, setActiveTab] = useState<'hero' | 'gallery' | 'settings'>('hero');

  // Input States
  const [newHeroUrl, setNewHeroUrl] = useState('');
  const [newHeroLabel, setNewHeroLabel] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  
  // Upload States
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<'hero' | 'gallery' | null>(null);

  // Password Change State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('avn_admin_password') || 'admin123';
    if (password === storedPass) setIsLoggedIn(true);
    else alert('Invalid Password');
  };

  const handleChangePassword = () => {
    const storedPass = localStorage.getItem('avn_admin_password') || 'admin123';
    if (currentPassInput !== storedPass) { alert("Current password is incorrect!"); return; }
    if (newPassInput.length < 4) { alert("New password must be at least 4 characters long."); return; }
    if (newPassInput !== confirmPassInput) { alert("New passwords do not match!"); return; }
    localStorage.setItem('avn_admin_password', newPassInput);
    alert("Password updated successfully!");
    setCurrentPassInput(''); setNewPassInput(''); setConfirmPassInput('');
  };

  // Upload Logic
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!isFirebaseActive || !storage) {
      alert("Firebase is not configured! Please add API keys in firebaseConfig.ts to enable uploads.");
      return;
    }

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      if (uploadTarget === 'hero') {
        setNewHeroUrl(downloadURL);
      } else if (uploadTarget === 'gallery') {
        setNewGalleryUrl(downloadURL);
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Image upload failed. Check your internet or Firebase rules.");
    } finally {
      setIsUploading(false);
      setUploadTarget(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerUpload = (target: 'hero' | 'gallery') => {
    setUploadTarget(target);
    fileInputRef.current?.click();
  };

  // Content Helpers
  const addHeroImage = () => {
    if (newHeroUrl && newHeroLabel) {
      updateHeroImages([...heroImages, { src: newHeroUrl, label: newHeroLabel }]);
      setNewHeroUrl(''); setNewHeroLabel('');
    }
  };

  const removeHeroImage = (index: number) => {
    const newImages = [...heroImages];
    newImages.splice(index, 1);
    updateHeroImages(newImages);
  };

  const addGalleryImage = () => {
    if (newGalleryUrl) {
      updateGalleryImages([...galleryImages, newGalleryUrl]);
      setNewGalleryUrl('');
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = [...galleryImages];
    newImages.splice(index, 1);
    updateGalleryImages(newImages);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Access</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none" placeholder="Password" />
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Connection Status */}
        <div className={`mb-6 p-3 rounded-lg flex items-center justify-between text-sm ${isFirebaseActive ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
           <div className="flex items-center">
             <Cloud className="w-4 h-4 mr-2" />
             {isFirebaseActive ? <strong>Firebase Connected (Changes are Permanent)</strong> : <span>Local Mode (Changes are Temporary). Add Firebase keys to fix.</span>}
           </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-900">Content Manager</h1>
          <button onClick={() => { if(window.confirm('Reset defaults?')) resetToDefaults(); }} className="flex items-center space-x-2 text-slate-500 hover:text-red-500">
            <RotateCcw className="w-4 h-4" /> <span>Reset</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {['hero', 'gallery', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-4 px-6 font-bold capitalize ${activeTab === tab ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />

            {activeTab === 'hero' && (
              <div className="space-y-8">
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                  <h3 className="font-bold text-indigo-900 mb-4">Add New Slide</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="flex gap-2">
                        <input type="text" value={newHeroUrl} onChange={(e) => setNewHeroUrl(e.target.value)} placeholder="Image URL" className="flex-1 px-4 py-2 rounded-lg border outline-none" />
                        <button onClick={() => triggerUpload('hero')} className="bg-slate-200 p-2 rounded-lg hover:bg-slate-300" title="Upload Image">
                           {isUploading && uploadTarget === 'hero' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                        </button>
                    </div>
                    <input type="text" value={newHeroLabel} onChange={(e) => setNewHeroLabel(e.target.value)} placeholder="Label" className="px-4 py-2 rounded-lg border outline-none" />
                    <button onClick={addHeroImage} className="bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
                      <Plus className="w-5 h-5 mr-1" /> Add Slide
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {heroImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden shadow-md">
                      <img src={img.src} className="w-full h-48 object-cover" />
                      <button onClick={() => removeHeroImage(idx)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                         <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 w-full bg-black/60 text-white p-2 text-center text-sm">{img.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-8">
                 <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                  <h3 className="font-bold text-indigo-900 mb-4">Add Work Photo</h3>
                  <div className="flex gap-4">
                    <div className="flex-1 flex gap-2">
                        <input type="text" value={newGalleryUrl} onChange={(e) => setNewGalleryUrl(e.target.value)} placeholder="Image URL" className="flex-1 px-4 py-2 rounded-lg border outline-none" />
                        <button onClick={() => triggerUpload('gallery')} className="bg-slate-200 p-2 rounded-lg hover:bg-slate-300" title="Upload Image">
                            {isUploading && uploadTarget === 'gallery' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                        </button>
                    </div>
                    <button onClick={addGalleryImage} className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700">Add</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryImages.map((url, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden aspect-video">
                      <img src={url} className="w-full h-full object-cover" />
                      <button onClick={() => removeGalleryImage(idx)} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white transition-opacity">
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
                <div className="max-w-md mx-auto bg-white p-6 rounded-xl border border-slate-200">
                   <h3 className="font-bold text-lg mb-4">Change Password</h3>
                   <div className="space-y-3">
                      <input type="password" value={currentPassInput} onChange={e=>setCurrentPassInput(e.target.value)} placeholder="Current Password" className="w-full border p-2 rounded"/>
                      <input type="password" value={newPassInput} onChange={e=>setNewPassInput(e.target.value)} placeholder="New Password" className="w-full border p-2 rounded"/>
                      <input type="password" value={confirmPassInput} onChange={e=>setConfirmPassInput(e.target.value)} placeholder="Confirm New" className="w-full border p-2 rounded"/>
                      <button onClick={handleChangePassword} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Update</button>
                   </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;