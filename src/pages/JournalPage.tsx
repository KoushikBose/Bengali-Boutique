import React, { useState } from 'react';
import { Clock, ArrowRight, ArrowLeft, Bookmark, Share2, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';

export const JournalPage: React.FC = () => {
  const { navigateTo, products, addToast } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = ['All', 'Styling', 'Behind the Brand', 'Fashion', 'Guides'];

  const filteredArticles = selectedCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleShareArticle = (art: Article) => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Article Link Copied', `"${art.title}" copied to clipboard.`, 'info');
  };

  // If viewing a single article
  if (activeArticle) {
    const relatedProducts = products.filter(p => activeArticle.relatedProductIds.includes(p.id));

    return (
      <article id="journal-article-view" className="min-h-screen bg-[#FAF8F5] pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <button
            onClick={() => setActiveArticle(null)}
            className="text-xs uppercase tracking-wider text-[#8E8279] hover:text-[#1C1B1A] flex items-center mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Return to Editorial Journal</span>
          </button>

          <header className="mb-8 text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
              {activeArticle.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal leading-tight">
              {activeArticle.title}
            </h1>
            <p className="text-sm text-[#7B726B] mt-3 font-light leading-relaxed">
              {activeArticle.subtitle}
            </p>
            <div className="flex items-center justify-center space-x-3 text-xs text-[#8E8279] mt-4 pt-4 border-t border-[#EDE7DF]">
              <span>By {activeArticle.author.name}</span>
              <span>•</span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>
          </header>

          <div className="aspect-[16/9] bg-[#F3EFEA] overflow-hidden mb-12 shadow-sm">
            <img src={activeArticle.heroImage} alt={activeArticle.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-stone max-w-none text-sm text-[#443E3A] leading-relaxed space-y-6 font-light">
            {activeArticle.content.map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-[#1C1B1A]" : ""}>
                {paragraph}
              </p>
            ))}
            
            {activeArticle.quote && (
              <blockquote className="p-6 bg-[#F3EFEA] border-l-2 border-[#1C1B1A] font-serif text-lg italic text-[#1C1B1A] my-6">
                "{activeArticle.quote.text}"
                <footer className="text-xs font-sans not-italic text-[#8E8279] mt-2 block">— {activeArticle.quote.author}</footer>
              </blockquote>
            )}
          </div>

          {/* Shoppable Pieces from this Article */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#EDE7DF]">
              <h3 className="font-serif text-2xl text-[#1C1B1A] mb-6 text-center">
                Shop Garments Featured in this Story
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => navigateTo('product-detail', { productId: p.id })}
                    className="p-4 bg-white border border-[#EDE7DF] flex items-center space-x-4 cursor-pointer hover:border-[#1C1B1A] transition-colors"
                  >
                    <img src={p.images[0]} alt="" className="w-16 h-22 object-cover bg-[#F3EFEA]" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8E8279]">{p.category}</span>
                      <h4 className="font-serif text-sm text-[#1C1B1A]">{p.name}</h4>
                      <span className="text-xs font-semibold text-[#1C1B1A] mt-1 block">
                        ₹{p.salePrice ? p.salePrice.toLocaleString('en-IN') : p.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  // Articles Grid Listing
  return (
    <div id="journal-page-root" className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium block mb-1">
            Editorial Perspectives
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal">
            THE ATELIER JOURNAL
          </h1>
          <p className="text-xs sm:text-sm text-[#7B726B] mt-2 font-light">
            Essays on timeless styling, noble fabric origins, and the craft behind Maison Aura silhouettes.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center space-x-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1C1B1A] text-[#FAF8F5]'
                  : 'bg-white text-[#7B726B] border border-[#DDD5C9] hover:border-[#1C1B1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group cursor-pointer bg-white border border-[#EDE7DF] flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px] text-[#8E8279] mb-2">
                    <span className="uppercase tracking-widest text-[#C5A880] font-semibold">{article.category}</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#1C1B1A] group-hover:text-[#8E8279] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#7B726B] mt-2 line-clamp-3 font-light leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#EDE7DF] flex items-center justify-between text-xs text-[#1C1B1A] font-medium">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
