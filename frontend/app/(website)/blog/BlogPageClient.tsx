'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

const allPosts = [
  {
    id: 1,
    title: 'The Future of LED Panel Repair: Class 100K Clean Rooms',
    category: 'Technology',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    desc: 'Discover how advanced clean room environments are revolutionizing the way we bond and repair large-scale LED panels.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnmY8lAF9lm-C11DN3wBmqIoumv-si2Oor7XStvn7R_Q&s=10',

    featured: true
  },
  {
    id: 2,
    title: 'Why DOA Management is Crucial for Electronics Brands',
    category: 'Business',
    date: 'Nov 05, 2023',
    readTime: '4 min read',
    desc: 'Dead on Arrival (DOA) stock can bleed revenue. Learn how proper refurbishment and master checking can save millions.',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    featured: false
  },
  {
    id: 3,
    title: 'Sustainable E-Waste: Recycling Beyond Economic Repair',
    category: 'Sustainability',
    date: 'Nov 28, 2023',
    readTime: '6 min read',
    desc: 'E-waste is a growing concern. Explore our eco-friendly recycling processes for units that are beyond economic repair.',
    img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
    featured: false
  },
  {
    id: 4,
    title: 'A Deep Dive into OGS Mobile Repair Techniques',
    category: 'Technology',
    date: 'Dec 10, 2023',
    readTime: '8 min read',
    desc: 'Understand the precision required for One Glass Solution (OGS) repairs, polarizers, and touch panel replacements.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6dy1KoXrOVNiTmQzUzNnvVSaiUf4chsEseNoOxXdgMg&s=10',
    featured: false
  },
  {
    id: 5,
    title: 'The Rise of Smart Tower Speakers in India',
    category: 'Manufacturing',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    desc: 'As audio experiences become central to home entertainment, smart tower speakers are seeing unprecedented demand.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkix3fwZXIykJzSZyrvKU3_KSMCKwPsZWLwOJOpc0ow&s=10',
    featured: false
  },
  {
    id: 6,
    title: 'How We Achieve 90% Yield in Line Rejections',
    category: 'Business',
    date: 'Feb 02, 2024',
    readTime: '7 min read',
    desc: 'Quality assurance at scale is challenging. Read our case study on how we improved the repair yield for an OEM partner.',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    featured: false
  }
];

const categories = ['All', 'Technology', 'Business', 'Sustainability', 'Manufacturing'];

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = allPosts.find((p) => p.featured);

  const filteredPosts = allPosts.filter((p) => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch && p.id !== featuredPost?.id;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── Hero / Featured Post ── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/40 via-slate-950 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Insights & <span className="text-white bg-clip-text bg-gradient-to-r from-primary-400 to-orange-300">Perspectives</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Dive into the latest industry trends, technical deep-dives, and company news from Longwell Electronics.
            </p>
          </div>

          {featuredPost && (
            <div data-aos="fade-up" data-aos-delay="100" className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-md">
              <div className="grid lg:grid-cols-2 gap-0 items-stretch">
                <div className="relative h-64 lg:h-full min-h-[300px] lg:min-h-[400px] overflow-hidden">
                  <img
                    src={featuredPost.img}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent lg:hidden" />
                </div>
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-bold uppercase tracking-wider border border-primary-500/30">
                      Featured
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-primary-300 transition-colors">
                    <Link href={`/blog/${featuredPost.id}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {featuredPost.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-6">
                    <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {featuredPost.date}</span>
                      <span className="hidden sm:flex items-center gap-1.5"><Clock className="h-4 w-4" /> {featuredPost.readTime}</span>
                    </div>
                    <Link href={`/blog/${featuredPost.id}`} className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-600 text-white hover:bg-primary-500 transition-colors hover:scale-110">
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Main Blog Section ── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16" data-aos="fade-up">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-primary-600/30 shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-auto min-w-[280px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white border border-slate-200 rounded-full py-3 pl-11 pr-5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div key={post.id} data-aos="fade-up" data-aos-delay={index * 50} className="group flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-5 left-5">
                      <span className="bg-white/90 backdrop-blur-md text-primary-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4">
                      <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary-400" /> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary-400" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-primary-600 transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                      {post.desc}
                    </p>
                    <div className="mt-auto">
                      <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 px-6 py-3 rounded-full transition-colors group-hover:pr-4">
                        Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200" data-aos="fade-in">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-500">We couldn't find any articles matching your search criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-6 text-primary-600 font-bold hover:text-primary-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
