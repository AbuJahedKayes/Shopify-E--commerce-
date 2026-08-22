import React, { useState } from 'react';
import { X, Save, RotateCcw, Image, Video, Type, Grid, Tag, Check, Plus, Trash2 } from 'lucide-react';
import { ThemeConfig, Product } from '../types';
import { DEFAULT_THEME_CONFIG } from '../data/products';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ThemeConfig;
  onSaveConfig: (newConfig: ThemeConfig) => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  products,
  onUpdateProducts,
}) => {
  const [activeTab, setActiveTab] = useState<'branding' | 'video' | 'categories' | 'metrics' | 'products'>('branding');
  const [tempConfig, setTempConfig] = useState<ThemeConfig>(config);
  const [tempProducts, setTempProducts] = useState<Product[]>(products);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig(tempConfig);
    onUpdateProducts(tempProducts);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (confirm('Reset theme customization to original AK-27 default values?')) {
      setTempConfig(DEFAULT_THEME_CONFIG);
    }
  };

  const updateCategory = (index: number, field: string, val: string) => {
    const updated = [...tempConfig.categories];
    updated[index] = { ...updated[index], [field]: val };
    setTempConfig({ ...tempConfig, categories: updated });
  };

  const updateMetric = (index: number, field: string, val: string) => {
    const updated = [...tempConfig.consciousMetrics];
    updated[index] = { ...updated[index], [field]: val };
    setTempConfig({ ...tempConfig, consciousMetrics: updated });
  };

  const toggleNewArrival = (productId: string) => {
    const updated = tempProducts.map((p) =>
      p.id === productId ? { ...p, isNewArrival: !p.isNewArrival } : p
    );
    setTempProducts(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4a3129]/60 backdrop-blur-sm font-['Satoshi',sans-serif]">
      <div className="relative w-full max-w-4xl bg-[#f4f1eb] border-2 border-[#4a3129] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#4a3129] text-[#f4f1eb] p-4 px-6 flex justify-between items-center border-b border-[#4a3129]">
          <div className="flex items-center gap-3">
            <span className="bg-[#f4f1eb] text-[#4a3129] text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
              Theme Admin
            </span>
            <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-[#f4f1eb]">
              Shopify Theme Customizer
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 text-[#f4f1eb] hover:bg-[#f4f1eb]/20 transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#e3dbcf] border-b border-[#4a3129] flex overflow-x-auto text-xs md:text-sm font-bold text-[#4a3129]">
          <button
            onClick={() => setActiveTab('branding')}
            className={`px-5 py-3 flex items-center gap-2 border-r border-[#4a3129] whitespace-nowrap transition-colors ${
              activeTab === 'branding' ? 'bg-[#f4f1eb] border-b-2 border-b-[#4a3129]' : 'hover:bg-[#f4f1eb]/50'
            }`}
          >
            <Type className="w-4 h-4" />
            Branding &amp; Text
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-5 py-3 flex items-center gap-2 border-r border-[#4a3129] whitespace-nowrap transition-colors ${
              activeTab === 'video' ? 'bg-[#f4f1eb] border-b-2 border-b-[#4a3129]' : 'hover:bg-[#f4f1eb]/50'
            }`}
          >
            <Video className="w-4 h-4" />
            Videos &amp; Media
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-5 py-3 flex items-center gap-2 border-r border-[#4a3129] whitespace-nowrap transition-colors ${
              activeTab === 'categories' ? 'bg-[#f4f1eb] border-b-2 border-b-[#4a3129]' : 'hover:bg-[#f4f1eb]/50'
            }`}
          >
            <Grid className="w-4 h-4" />
            Category Pictures
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-5 py-3 flex items-center gap-2 border-r border-[#4a3129] whitespace-nowrap transition-colors ${
              activeTab === 'metrics' ? 'bg-[#f4f1eb] border-b-2 border-b-[#4a3129]' : 'hover:bg-[#f4f1eb]/50'
            }`}
          >
            <Tag className="w-4 h-4" />
            Conscious Metrics
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-3 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'products' ? 'bg-[#f4f1eb] border-b-2 border-b-[#4a3129]' : 'hover:bg-[#f4f1eb]/50'
            }`}
          >
            <Image className="w-4 h-4" />
            New Arrivals Auto-Scroll
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: BRANDING */}
          {activeTab === 'branding' && (
            <div className="space-y-4">
              <h3 className="font-['DM_Serif_Display',serif] text-lg text-[#5d4037]">
                Store Branding &amp; Copyright Notice
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={tempConfig.companyName}
                    onChange={(e) => setTempConfig({ ...tempConfig, companyName: e.target.value })}
                    className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                    Short Brand Badge (Header Logo)
                  </label>
                  <input
                    type="text"
                    value={tempConfig.shortName}
                    onChange={(e) => setTempConfig({ ...tempConfig, shortName: e.target.value })}
                    className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                  Footer Copyright Line
                </label>
                <input
                  type="text"
                  value={tempConfig.copyrightText}
                  onChange={(e) => setTempConfig({ ...tempConfig, copyrightText: e.target.value })}
                  className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                />
              </div>

              <div className="pt-4 border-t border-[#4a3129]/20 space-y-4">
                <h4 className="font-['DM_Serif_Display',serif] text-base text-[#5d4037]">
                  Hero Banner Headlines
                </h4>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={tempConfig.heroHeadline}
                    onChange={(e) => setTempConfig({ ...tempConfig, heroHeadline: e.target.value })}
                    className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                    Hero Subheadline
                  </label>
                  <textarea
                    rows={2}
                    value={tempConfig.heroSubheadline}
                    onChange={(e) => setTempConfig({ ...tempConfig, heroSubheadline: e.target.value })}
                    className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEOS & MEDIA */}
          {activeTab === 'video' && (
            <div className="space-y-6">
              <div className="bg-[#e3dbcf] p-4 border border-[#4a3129] space-y-3">
                <h3 className="font-['DM_Serif_Display',serif] text-lg text-[#5d4037]">
                  1. "Soft as Moss. Durable as Stone." Video Section
                </h3>
                <p className="text-xs text-[#4a3129]/80">
                  Provide a direct video link (.mp4) or fallback image URL for this section.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                      Video MP4 URL
                    </label>
                    <input
                      type="text"
                      value={tempConfig.ethosVideoUrl}
                      onChange={(e) => setTempConfig({ ...tempConfig, ethosVideoUrl: e.target.value })}
                      className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                      placeholder="https://.../video.mp4"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                      Poster Image Fallback URL
                    </label>
                    <input
                      type="text"
                      value={tempConfig.ethosPosterUrl}
                      onChange={(e) => setTempConfig({ ...tempConfig, ethosPosterUrl: e.target.value })}
                      className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                      Ethos Description Text
                    </label>
                    <textarea
                      rows={3}
                      value={tempConfig.ethosDescription}
                      onChange={(e) => setTempConfig({ ...tempConfig, ethosDescription: e.target.value })}
                      className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#e3dbcf] p-4 border border-[#4a3129] space-y-3">
                <h3 className="font-['DM_Serif_Display',serif] text-lg text-[#5d4037]">
                  2. "Built for the Journey" Video Section
                </h3>
                <p className="text-xs text-[#4a3129]/80">
                  Full-bleed video background section with overlay text.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                      Background Video MP4 URL
                    </label>
                    <input
                      type="text"
                      value={tempConfig.journeyVideoUrl}
                      onChange={(e) => setTempConfig({ ...tempConfig, journeyVideoUrl: e.target.value })}
                      className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                      placeholder="https://.../journey.mp4"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                      Video Poster Image URL
                    </label>
                    <input
                      type="text"
                      value={tempConfig.journeyPosterUrl}
                      onChange={(e) => setTempConfig({ ...tempConfig, journeyPosterUrl: e.target.value })}
                      className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                      Journey Section Title
                    </label>
                    <input
                      type="text"
                      value={tempConfig.journeyTitle}
                      onChange={(e) => setTempConfig({ ...tempConfig, journeyTitle: e.target.value })}
                      className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                      Journey Subtitle
                    </label>
                    <input
                      type="text"
                      value={tempConfig.journeySubtitle}
                      onChange={(e) => setTempConfig({ ...tempConfig, journeySubtitle: e.target.value })}
                      className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2.5 text-sm text-[#4a3129] focus:outline-none focus:ring-1 focus:ring-[#4a3129]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <h3 className="font-['DM_Serif_Display',serif] text-lg text-[#5d4037]">
                Shop Category Front Pictures &amp; Titles
              </h3>
              <p className="text-xs text-[#4a3129]/80">
                Modify any category picture, title, or description displayed on the main home grid.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tempConfig.categories.map((cat, idx) => (
                  <div key={cat.id} className="bg-[#e3dbcf] p-4 border border-[#4a3129] space-y-3">
                    <div className="flex justify-between items-center border-b border-[#4a3129]/20 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4a3129]">
                        Category: {cat.id}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4a3129] mb-1">
                        Category Title
                      </label>
                      <input
                        type="text"
                        value={cat.title}
                        onChange={(e) => updateCategory(idx, 'title', e.target.value)}
                        className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2 text-xs text-[#4a3129]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4a3129] mb-1">
                        Front Picture URL
                      </label>
                      <input
                        type="text"
                        value={cat.image}
                        onChange={(e) => updateCategory(idx, 'image', e.target.value)}
                        className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2 text-xs text-[#4a3129]"
                      />
                    </div>

                    {cat.image && (
                      <div className="w-full h-24 overflow-hidden border border-[#4a3129]/30">
                        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <h3 className="font-['DM_Serif_Display',serif] text-lg text-[#5d4037]">
                CONSCIOUS CALCULATIONS (3 Sustainability Cards)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tempConfig.consciousMetrics.map((metric, idx) => (
                  <div key={metric.id} className="bg-[#e3dbcf] p-4 border border-[#4a3129] space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4a3129] mb-1">
                        Metric Badge (e.g. 0g, 100%, 1 yr)
                      </label>
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) => updateMetric(idx, 'value', e.target.value)}
                        className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2 text-xs text-[#4a3129]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4a3129] mb-1">
                        Card Title
                      </label>
                      <input
                        type="text"
                        value={metric.title}
                        onChange={(e) => updateMetric(idx, 'title', e.target.value)}
                        className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2 text-xs text-[#4a3129]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4a3129] mb-1">
                        Subtitle Tagline
                      </label>
                      <input
                        type="text"
                        value={metric.subtitle}
                        onChange={(e) => updateMetric(idx, 'subtitle', e.target.value)}
                        className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2 text-xs text-[#4a3129]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4a3129] mb-1">
                        Description Text
                      </label>
                      <textarea
                        rows={3}
                        value={metric.description}
                        onChange={(e) => updateMetric(idx, 'description', e.target.value)}
                        className="w-full bg-[#f4f1eb] border border-[#4a3129] p-2 text-xs text-[#4a3129]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCTS / NEW ARRIVALS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-['DM_Serif_Display',serif] text-lg text-[#5d4037]">
                    New Arrival Carousel Products (Minimum 5 required)
                  </h3>
                  <p className="text-xs text-[#4a3129]/80">
                    Toggle which products appear in the Hero auto-scrolling gallery. Currently{' '}
                    <strong>{tempProducts.filter((p) => p.isNewArrival).length}</strong> selected as New Arrival.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tempProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className={`p-3 border flex items-center gap-3 transition-colors ${
                      prod.isNewArrival
                        ? 'bg-[#4a3129] text-[#f4f1eb] border-[#4a3129]'
                        : 'bg-[#e3dbcf] text-[#4a3129] border-[#4a3129]/40'
                    }`}
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-14 h-14 object-cover border border-[#4a3129]/20"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{prod.name}</p>
                      <p className="text-[11px] opacity-80">${prod.price} &bull; {prod.category}</p>
                    </div>

                    <button
                      onClick={() => toggleNewArrival(prod.id)}
                      className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
                        prod.isNewArrival
                          ? 'bg-[#f4f1eb] text-[#4a3129] border-[#f4f1eb]'
                          : 'bg-[#4a3129] text-[#f4f1eb] border-[#4a3129]'
                      }`}
                    >
                      {prod.isNewArrival ? 'In Scroll' : '+ Add to Scroll'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-[#e3dbcf] p-4 px-6 border-t border-[#4a3129] flex justify-between items-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-xs font-bold text-[#4a3129] hover:underline"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#4a3129] text-xs font-bold text-[#4a3129] hover:bg-[#f4f1eb] transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#4a3129] text-[#f4f1eb] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#3b261f] transition-colors shadow-md"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Apply Theme Changes
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
