import React from 'react';
import { ViewMode } from '../types';

interface OtherPagesProps {
  view: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const OtherPages: React.FC<OtherPagesProps> = ({ view, onNavigate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 font-['Satoshi',sans-serif] space-y-8 min-h-[60vh]">
      {view === 'about' && (
        <div className="space-y-6">
          <h1 className="font-['DM_Serif_Display',serif] text-4xl sm:text-5xl text-[#5d4037]">
            Our Story &amp; Ethos
          </h1>
          <p className="text-base text-[#4a3129] leading-relaxed">
            Founded on the rugged coastal ridges where moss clings to ancient granite, AK-27 Clothing Co. was born out of a desire for enduring, slow fashion. We reject disposable trends in favor of garments that grow richer with age.
          </p>
          <div className="my-6 border-l-2 border-[#4a3129] pl-4 italic text-[#4a3129]/90 text-lg font-['DM_Serif_Display',serif]">
            "Soft as Moss. Durable as Stone."
          </div>
          <p className="text-sm text-[#4a3129]/80 leading-relaxed">
            Every garment is constructed from 100% GOTS-certified organic cotton, unbleached flax linen, and recycled technical weaves. Our manufacturing partners adhere strictly to fair-wage labor standards and zero-water-waste dyeing practices.
          </p>
        </div>
      )}

      {view === 'contact' && (
        <div className="space-y-6">
          <h1 className="font-['DM_Serif_Display',serif] text-4xl sm:text-5xl text-[#5d4037]">
            Contact Us
          </h1>
          <p className="text-sm text-[#4a3129]/80">
            Have questions about fit, fabric care, or an existing order? Our team is here to assist.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you! Your message has been sent.');
            }}
            className="space-y-4 max-w-lg bg-[#e3dbcf]/40 p-6 border border-[#4a3129]"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                className="w-full bg-[#f4f1eb] border border-[#4a3129]/40 p-2 text-xs focus:outline-none focus:border-[#4a3129]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="jane@example.com"
                className="w-full bg-[#f4f1eb] border border-[#4a3129]/40 p-2 text-xs focus:outline-none focus:border-[#4a3129]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3129] mb-1">
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="How can we help?"
                className="w-full bg-[#f4f1eb] border border-[#4a3129]/40 p-2 text-xs focus:outline-none focus:border-[#4a3129]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4a3129] text-[#f4f1eb] py-3 text-xs uppercase font-bold tracking-wider hover:bg-[#3b261f]"
            >
              Send Message
            </button>
          </form>
        </div>
      )}

      {view === 'size-guide' && (
        <div className="space-y-6">
          <h1 className="font-['DM_Serif_Display',serif] text-4xl sm:text-5xl text-[#5d4037]">
            Sizing &amp; Fit Guide
          </h1>
          <p className="text-sm text-[#4a3129]/80">
            Our garments feature a relaxed, tailored drape designed for comfortable daily movement.
          </p>

          <div className="overflow-x-auto border border-[#4a3129] bg-[#e3dbcf]/30">
            <table className="w-full text-left text-xs text-[#4a3129]">
              <thead className="bg-[#4a3129] text-[#f4f1eb] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">Chest (in)</th>
                  <th className="p-3">Waist (in)</th>
                  <th className="p-3">Hips (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4a3129]/20 font-medium">
                <tr>
                  <td className="p-3 font-bold">XS</td>
                  <td className="p-3">34 - 36</td>
                  <td className="p-3">28 - 30</td>
                  <td className="p-3">35 - 37</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">S</td>
                  <td className="p-3">36 - 38</td>
                  <td className="p-3">30 - 32</td>
                  <td className="p-3">37 - 39</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">M</td>
                  <td className="p-3">38 - 40</td>
                  <td className="p-3">32 - 34</td>
                  <td className="p-3">39 - 41</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">L</td>
                  <td className="p-3">40 - 42</td>
                  <td className="p-3">34 - 36</td>
                  <td className="p-3">41 - 43</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">XL</td>
                  <td className="p-3">42 - 45</td>
                  <td className="p-3">36 - 39</td>
                  <td className="p-3">43 - 46</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(view === 'privacy' || view === 'terms' || view === 'returns') && (
        <div className="space-y-6">
          <h1 className="font-['DM_Serif_Display',serif] text-4xl text-[#5d4037] capitalize">
            {view.replace('-', ' ')}
          </h1>
          <p className="text-sm text-[#4a3129]/80 leading-relaxed">
            At AK-27, transparency is core to our brand. All customer data is processed using 256-bit SSL encryption. We offer 30-day hassle-free returns on unworn items with original tags intact. Free carbon-neutral shipping is provided on all orders.
          </p>
        </div>
      )}

      <div className="pt-8 border-t border-[#4a3129]/20">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs uppercase font-bold text-[#4a3129] underline hover:opacity-70"
        >
          &larr; Back to Home Page
        </button>
      </div>
    </div>
  );
};
