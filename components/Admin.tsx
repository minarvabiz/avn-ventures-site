import React, { useState, useRef } from 'react';
import { useContent } from '../contexts/ContentContext';
import { storage, auth, isConfigured } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';
import { Trash2, Plus, RotateCcw, Lock, Upload, Cloud, Loader2, AlertTriangle, ExternalLink, Palette, Type, Image as ImageIcon, LayoutTemplate, Megaphone } from 'lucide-react';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const { heroImages, galleryImages, appConfig, updateHeroImages, updateGalleryImages, updateAppConfig, resetToDefaults, isFirebaseActive } = useContent();
  const [activeTab, setActiveTab] = useState<'branding' | 'content' | 'media' | 'settings'>('media');

  // Input States for Media
  const [newHeroUrl, setNewHeroUrl] = useState('');
  const [newHeroLabel, setNewHeroLabel] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  
  // Upload States
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<'hero' | 'gallery' | 'logo' | null>(null);

  // Password Change State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');

  // Themes
  const themes = [
    { id: 'indigo', name: 'Classic Indigo', color: 'bg-indigo-600' },
    { id: 'blue', name: 'Ocean Blue', color: 'bg-blue-600' },
    { id: 'emerald', name: 'Nature Green', color: 'bg-emerald-600' },
    { id: 'violet', name: 'Royal Purple', color: 'bg-violet-600' },
    { id: 'rose', name: 'Sunset Rose', color: 'bg-rose-600' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('avn_admin_password') || 'admin123';
    if (password === storedPass) {
        setIsLoggedIn(true);
        // Ensure auth is initialized on login
        if (auth && !auth.currentUser) {
            console.log("Attempting anonymous login...");
            signInAnonymously(auth)
                .then(() => console.log("Logged in anonymously to Firebase"))
                .catch((err) => alert("Firebase Auth Error: " + err.message));
        }
    }
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

    setIsUploading(true);
    let finalUrl = '';

    try {
      if (!isFirebaseActive || !storage) throw new Error("Firebase is not configured or connected.");

      // Double check auth before upload
      if (auth && !auth.currentUser) {
         console.log("Re-authenticating...");
         await signInAnonymously(auth);
      }

      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      console.log("Starting upload to:", storageRef.fullPath);
      
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Upload successful, fetching URL...");
      
      finalUrl = await getDownloadURL(snapshot.ref);
      console.log("File available at:", finalUrl);

      if (finalUrl) {
          if (uploadTarget === 'hero') setNewHeroUrl(finalUrl);
          else if (uploadTarget === 'gallery') setNewGalleryUrl(finalUrl);
          else if (uploadTarget === 'logo') updateAppConfig({ logoUrl: finalUrl });
      }

    } catch (error: any) {
      console.error("Upload Error Full:", error);
      let errorMessage = error.message;
      if (error.code === 'storage/unauthorized') {
          errorMessage = "Permission Denied: Check Firebase Storage Rules.";
      } else if (error.code === 'storage/retry-limit-exceeded') {
          errorMessage = "Upload timed out. Check your internet connection.";
      }
      alert(`Upload Failed: ${errorMessage}`);
    } finally {
      setIsUploading(false);
      setUploadTarget(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerUpload = (target: 'hero' | 'gallery' | 'logo') => {
    setUploadTarget(target);
    fileInputRef.current?.click();
  };

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
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
        
        {/* Status Bar */}
        <div className={`mb-6 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between text-sm ${isFirebaseActive ? 'bg-green-50 border-green-100 text-green-800' : 'bg-orange-50 border-orange-100 text-orange-800'} border`}>
           <div className="flex items-center">
             <Cloud className="w-5 h-5 mr-2" />
             {isFirebaseActive ? <strong>Firebase Connected</strong> : <span>Local Mode (Changes won't be live)</span>}
           </div>
           <button onClick={() => { if(window.confirm('Reset all content to defaults?')) resetToDefaults(); }} className="flex items-center text-red-500 hover:text-red-700 mt-2 md:mt-0 font-bold">
            <RotateCcw className="w-4 h-4 mr-1" /> Reset All
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-white rounded-xl shadow-lg border border-slate-100 h-fit overflow-hidden">
            {[
              { id: 'media', icon: ImageIcon, label: 'Images & Gallery' },
              { id: 'branding', icon: LayoutTemplate, label: 'Branding & Theme' },
              { id: 'content', icon: Type, label: 'Text Content' },
              { id: 'settings', icon: Lock, label: 'Security' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center px-6 py-4 font-bold transition-colors ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8">
            
            {/* --- MEDIA TAB --- */}
            {activeTab === 'media' && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><ImageIcon className="mr-2" /> Hero Slides</h3>
                  <div className="bg-slate-50 p-4 rounded-xl mb-4">
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex gap-2">
                            <input type="text" value={newHeroUrl} onChange={(e) => setNewHeroUrl(e.target.value)} placeholder="Image URL" className="flex-1 p-2 rounded border" />
                            <button onClick={() => triggerUpload('hero')} className="bg-white p-2 border rounded hover:bg-slate-100" disabled={isUploading} title="Upload">
                                {isUploading && uploadTarget === 'hero' ? <Loader2 className="animate-spin w-5 h-5" /> : <Upload className="w-5 h-5" />}
                            </button>
                        </div>
                        <input type="text" value={newHeroLabel} onChange={(e) => setNewHeroLabel(e.target.value)} placeholder="Label text" className="flex-1 p-2 rounded border" />
                        <button onClick={addHeroImage} className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700">Add</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {heroImages.map((img, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden h-32">
                        <img src={img.src} className="w-full h-full object-cover" />
                        <button onClick={() => removeHeroImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                        <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs p-1 text-center truncate">{img.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><ImageIcon className="mr-2" /> Work Gallery</h3>
                  <div className="bg-slate-50 p-4 rounded-xl mb-4 flex gap-2">
                     <div className="flex-1 flex gap-2">
                        <input type="text" value={newGalleryUrl} onChange={(e) => setNewGalleryUrl(e.target.value)} placeholder="Image URL" className="flex-1 p-2 rounded border" />
                        <button onClick={() => triggerUpload('gallery')} className="bg-white p-2 border rounded hover:bg-slate-100" disabled={isUploading}>
                            {isUploading && uploadTarget === 'gallery' ? <Loader2 className="animate-spin w-5 h-5" /> : <Upload className="w-5 h-5" />}
                        </button>
                     </div>
                     <button onClick={addGalleryImage} className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700">Add</button>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {galleryImages.map((url, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden h-24">
                        <img src={url} className="w-full h-full object-cover" />
                        <button onClick={() => removeGalleryImage(idx)} className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- BRANDING & THEME TAB --- */}
            {activeTab === 'branding' && (
              <div className="space-y-8">
                <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><Palette className="mr-2" /> Theme Color</h3>
                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {themes.map(t => (
                        <button 
                          key={t.id}
                          onClick={() => updateAppConfig({ themeColor: t.id })}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${appConfig.themeColor === t.id ? 'border-slate-800 bg-slate-50 scale-105' : 'border-transparent hover:bg-slate-50'}`}
                        >
                           <div className={`w-12 h-12 rounded-full ${t.color} shadow-lg`}></div>
                           <span className="text-xs font-bold">{t.name}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="border-t pt-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Company Identity</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        value={appConfig.companyName} 
                        onChange={(e) => updateAppConfig({ companyName: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">Tagline (Navbar)</label>
                      <input 
                        type="text" 
                        value={appConfig.tagline} 
                        onChange={(e) => updateAppConfig({ tagline: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                      />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-slate-600 mb-2">Logo URL (Optional)</label>
                       <div className="flex gap-2">
                         <input 
                            type="text" 
                            value={appConfig.logoUrl} 
                            onChange={(e) => updateAppConfig({ logoUrl: e.target.value })}
                            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                            placeholder="Leave empty to use default icon"
                         />
                         <button onClick={() => triggerUpload('logo')} className="bg-slate-100 p-3 rounded-lg border hover:bg-slate-200">
                             {isUploading && uploadTarget === 'logo' ? <Loader2 className="animate-spin w-5 h-5" /> : <Upload className="w-5 h-5" />}
                         </button>
                       </div>
                       {appConfig.logoUrl && <img src={appConfig.logoUrl} className="mt-2 h-10 object-contain" alt="Logo Preview" />}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- CONTENT TAB --- */}
            {activeTab === 'content' && (
              <div className="space-y-8">
                 <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><Type className="mr-2" /> Main Website Text</h3>
                 
                 <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Hero Main Title</label>
                    <textarea 
                      rows={2}
                      value={appConfig.heroTitle} 
                      onChange={(e) => updateAppConfig({ heroTitle: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                    />
                    <p className="text-xs text-slate-400 mt-1">Use HTML tags like &lt;br/&gt; for line breaks.</p>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Hero Subtitle</label>
                    <textarea 
                      rows={3}
                      value={appConfig.heroSubtitle} 
                      onChange={(e) => updateAppConfig({ heroSubtitle: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                    />
                 </div>

                 <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mt-8">
                    <h4 className="font-bold text-yellow-900 mb-4 flex items-center"><Megaphone className="w-5 h-5 mr-2" /> Site Notification</h4>
                    <div className="space-y-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                           <div className={`w-12 h-6 rounded-full p-1 transition-colors ${appConfig.notificationEnabled ? 'bg-green-500' : 'bg-slate-300'}`} onClick={() => updateAppConfig({notificationEnabled: !appConfig.notificationEnabled})}>
                              <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${appConfig.notificationEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                           </div>
                           <span className="font-medium text-slate-700">Show Notification Banner</span>
                        </label>
                        
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Notification Message</label>
                           <input 
                              type="text" 
                              value={appConfig.notificationMessage}
                              onChange={(e) => updateAppConfig({notificationMessage: e.target.value})}
                              disabled={!appConfig.notificationEnabled}
                              className={`w-full p-3 border rounded-lg outline-none ${!appConfig.notificationEnabled ? 'bg-slate-100 text-slate-400' : 'bg-white'}`}
                           />
                        </div>
                    </div>
                 </div>
              </div>
            )}

            {/* --- SETTINGS TAB --- */}
            {activeTab === 'settings' && (
                <div className="max-w-md mx-auto">
                   <h3 className="font-bold text-lg mb-4">Admin Security</h3>
                   <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                      <p className="text-sm text-yellow-800 flex items-start"><AlertTriangle className="w-4 h-4 mr-2 mt-0.5" /> Change your admin password regularly to keep the site secure.</p>
                   </div>
                   <div className="space-y-3">
                      <input type="password" value={currentPassInput} onChange={e=>setCurrentPassInput(e.target.value)} placeholder="Current Password" className="w-full border p-3 rounded-lg"/>
                      <input type="password" value={newPassInput} onChange={e=>setNewPassInput(e.target.value)} placeholder="New Password" className="w-full border p-3 rounded-lg"/>
                      <input type="password" value={confirmPassInput} onChange={e=>setConfirmPassInput(e.target.value)} placeholder="Confirm New" className="w-full border p-3 rounded-lg"/>
                      <button onClick={handleChangePassword} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800">Update Password</button>
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