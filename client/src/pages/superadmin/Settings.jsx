import React, { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  ShieldCheck, 
  Globe, 
  CreditCard, 
  Smartphone,
  Save
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("General");

  const tabs = [
    { id: "General", icon: Globe, label: "Platform Info" },
    { id: "Security", icon: ShieldCheck, label: "Access & Keys" },
    { id: "Notifications", icon: Bell, label: "Alert Config" },
    { id: "Profile", icon: User, label: "Admin Profile" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            System <span className="text-orange-600">Preferences</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            Configure ThinkNOrder Environment
          </p>
        </div>
        <button className="flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all active:scale-95 shadow-xl shadow-orange-600/20">
          <Save size={18} />
          Save Global Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR TABS */}
        <div className="lg:w-72 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all
                ${activeTab === tab.id 
                  ? "bg-black text-white shadow-xl shadow-orange-950/20 translate-x-2" 
                  : "bg-white text-gray-400 hover:bg-orange-50 hover:text-orange-600"}
              `}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* SETTINGS CONTENT */}
        <div className="flex-1 bg-white rounded-[2.5rem] border border-orange-100 p-8 lg:p-12 shadow-sm">
          <div className="max-w-2xl space-y-8">
            
            {/* Conditional Rendering based on activeTab */}
            {activeTab === "General" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="pb-4 border-b border-orange-50">
                  <h3 className="text-xl font-black text-black uppercase italic italic">Global Branding</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase mt-1">Manage public-facing enterprise identity</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Display Name</label>
                    <input 
                      type="text" 
                      defaultValue="ThinkNOrder Restaurant OS"
                      className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-5 py-3 outline-none font-bold text-orange-950 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Support Contact Email</label>
                    <input 
                      type="email" 
                      defaultValue="support@thinknorder.io"
                      className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-5 py-3 outline-none font-bold text-orange-950 transition-all"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between p-6 bg-orange-950 rounded-3xl text-white">
                    <div className="flex items-center gap-4">
                       <Smartphone className="text-orange-500" />
                       <div>
                         <p className="text-xs font-black uppercase tracking-widest">Mobile App Access</p>
                         <p className="text-[10px] font-bold text-orange-200/50 uppercase">Allow staff to login via Android/iOS</p>
                       </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Security" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="pb-4 border-b border-orange-50">
                  <h3 className="text-xl font-black text-black uppercase italic italic">Authentication</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase mt-1">Manage system protocols and password policies</p>
                </div>
                
                <button className="w-full flex items-center justify-between p-6 border-2 border-orange-100 rounded-3xl hover:border-orange-600 transition-all group">
                   <div className="flex items-center gap-4">
                     <div className="bg-orange-50 p-3 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                       <ShieldCheck size={20} />
                     </div>
                     <p className="text-xs font-black uppercase tracking-widest text-black text-left">Enable Two-Factor (2FA)</p>
                   </div>
                   <span className="text-[10px] font-black uppercase text-gray-400">Configure →</span>
                </button>
              </div>
            )}

            {/* Empty states for other tabs for now */}
            {activeTab !== "General" && activeTab !== "Security" && (
              <div className="py-20 text-center opacity-20">
                 <SettingsIcon size={48} className="mx-auto mb-4" />
                 <p className="font-black uppercase tracking-[0.2em] text-xs">Module Under Maintenance</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;