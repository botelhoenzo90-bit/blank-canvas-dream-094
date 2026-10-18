import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ateliê 3D — Área de Membros" },
      { name: "description", content: "Sua biblioteca de arquivos e conteúdos do Ateliê 3D." },
    ],
  }),
  component: MemberArea,
});

const categories = [
  { title: "Natal", detail: "Enfeites, decoração e presentes", icon: "🎄", color: "from-rose-500/30 to-orange-400/10" },
  { title: "Chaveiros", detail: "Modelos para personalizar", icon: "🔑", color: "from-amber-400/30 to-yellow-200/10" },
  { title: "Articulados", detail: "Peças flexíveis e divertidas", icon: "🦎", color: "from-emerald-400/30 to-teal-200/10" },
  { title: "Brinquedos sensoriais", detail: "Peças para explorar e brincar", icon: "🧩", color: "from-violet-400/30 to-fuchsia-200/10" },
  { title: "Decoração", detail: "Detalhes que transformam ambientes", icon: "🏡", color: "from-sky-400/30 to-blue-200/10" },
  { title: "Pack completo", detail: "Explore a coleção completa", icon: "📦", color: "from-orange-400/30 to-rose-200/10" },
  { title: "Esculturas", detail: "Modelos para exibir e colecionar", icon: "🗿", color: "from-slate-300/20 to-slate-100/5" },
  { title: "Religião", detail: "Modelos de inspiração religiosa", icon: "✨", color: "from-yellow-300/25 to-amber-100/5" },
  { title: "Pets e animais", detail: "Modelos inspirados no mundo animal", icon: "🐾", color: "from-lime-300/25 to-green-100/5" },
  { title: "Veículos", detail: "Carros e outros veículos", icon: "🚗", color: "from-blue-400/30 to-cyan-200/10" },
  { title: "Animes e games", detail: "Personagens e universos favoritos", icon: "🎮", color: "from-fuchsia-400/30 to-purple-200/10" },
  { title: "Vasos e plantas", detail: "Peças para sua casa", icon: "🪴", color: "from-green-400/30 to-lime-200/10" },
];

function MemberArea() {
  const [section, setSection] = useState("Início");
  const [query, setQuery] = useState("");
  const filtered = categories.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  const navItems = [
    { label: "Leia antes de começar", icon: "📌" },
    { label: "Guia do Iniciante", icon: "🎓" },
    { label: "Início", icon: "🏠" },
    { label: "Biblioteca de arquivos", icon: "🗂️" },
    { label: "Bônus", icon: "🎁" },
  ];

  return (
    <div className="min-h-screen bg-[#0d1016] text-[#f7f7fb] md:flex">
      <aside className="w-full shrink-0 border-b border-white/10 bg-[#11151d] p-4 md:sticky md:top-0 md:h-screen md:w-[264px] md:border-b-0 md:border-r md:p-5">
        <div className="mb-7 flex items-center gap-2 px-2 pt-1">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-lg font-black text-[#171116]">3D</div>
          <div className="text-lg font-extrabold tracking-wide">ATELIÊ <span className="text-orange-400">3D</span><div className="mt-0.5 text-[10px] font-medium uppercase tracking-[.22em] text-slate-400">Área de membros</div></div>
        </div>
        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => setSection(item.label)} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${section === item.label ? "bg-orange-400/15 font-semibold text-orange-300 ring-1 ring-orange-400/25" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>
              <span>{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-8 hidden rounded-2xl border border-white/10 bg-white/[.03] p-4 md:block">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-300">Dica do Ateliê</div>
          <p className="text-sm leading-6 text-slate-400">Comece pelos guias e organize seus arquivos favoritos para encontrar tudo com facilidade.</p>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div><div className="text-xs font-semibold uppercase tracking-[.2em] text-orange-300">Sua biblioteca criativa</div><h1 className="mt-1 text-xl font-bold sm:text-2xl">{section}</h1></div>
          <label className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 sm:max-w-xs"><span className="text-slate-400">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar na biblioteca..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" /></label>
        </header>

        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9">
          {section === "Leia antes de começar" ? (
            <section className="max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-orange-400/10 to-transparent p-6 sm:p-9">
              <span className="rounded-full bg-orange-300/10 px-3 py-1 text-xs font-semibold text-orange-300">📌 Primeiros passos</span>
              <h2 className="mt-5 text-3xl font-extrabold">Leia antes de começar</h2>
              <p className="mt-4 leading-7 text-slate-300">Boas-vindas ao Ateliê 3D. Use a biblioteca para explorar as coleções, escolha os modelos que combinam com seus projetos e consulte os guias sempre que precisar.</p>
              <button onClick={() => setSection("Guia do Iniciante")} className="mt-6 rounded-xl bg-orange-400 px-5 py-3 font-bold text-[#1a1210] transition hover:bg-orange-300">Ir para o Guia do Iniciante →</button>
            </section>
          ) : section === "Guia do Iniciante" ? (
            <section className="max-w-3xl">
              <h2 className="text-2xl font-extrabold">Seu ponto de partida</h2><p className="mt-3 leading-7 text-slate-400">Consulte os materiais de orientação antes de explorar as coleções de arquivos.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2"><article className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><div className="text-2xl">🧭</div><h3 className="mt-3 font-bold">Organize sua biblioteca</h3><p className="mt-2 text-sm leading-6 text-slate-400">Explore por categoria e mantenha seus projetos organizados.</p></article><article className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><div className="text-2xl">🖨️</div><h3 className="mt-3 font-bold">Prepare sua impressão</h3><p className="mt-2 text-sm leading-6 text-slate-400">Confira o modelo e as configurações recomendadas antes de imprimir.</p></article></div>
            </section>
          ) : section === "Bônus" ? (
            <section><h2 className="text-2xl font-extrabold">Materiais bônus</h2><p className="mt-2 text-slate-400">Guias práticos para ajudar no seu trabalho.</p><div className="mt-6 grid gap-4 lg:grid-cols-2"><a href="/bonus/calendario-natal.html" className="rounded-2xl border border-white/10 bg-white/[.035] p-6 transition hover:border-orange-300/40"><span className="text-3xl">🎄</span><h3 className="mt-3 text-lg font-bold">Calendário de Produção de Natal</h3><p className="mt-2 text-sm text-slate-400">Planeje sua produção semana a semana.</p><span className="mt-5 inline-block text-sm font-bold text-orange-300">Abrir calendário →</span></a><a href="/bonus/guia-fotos.html" className="rounded-2xl border border-white/10 bg-white/[.035] p-6 transition hover:border-orange-300/40"><span className="text-3xl">📸</span><h3 className="mt-3 text-lg font-bold">Guia de Fotos com Celular</h3><p className="mt-2 text-sm text-slate-400">Aprenda a fotografar suas peças em casa.</p><span className="mt-5 inline-block text-sm font-bold text-orange-300">Abrir guia →</span></a></div></section>
          ) : (
            <>
              <section className="relative overflow-hidden rounded-3xl border border-orange-300/15 bg-gradient-to-br from-[#2b1b1b] via-[#1c1a22] to-[#11151d] p-6 sm:p-9">
                <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
                <div className="relative max-w-2xl"><span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1.5 text-xs font-bold text-orange-200">ATELIÊ 3D · BIBLIOTECA</span><h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">Suas próximas ideias <span className="text-orange-300">começam aqui.</span></h2><p className="mt-4 max-w-xl leading-7 text-slate-300">Explore as coleções de modelos 3D, descubra novas possibilidades e encontre inspiração para o seu próximo projeto.</p><button onClick={() => setSection("Biblioteca de arquivos")} className="mt-6 rounded-xl bg-orange-400 px-5 py-3 text-sm font-extrabold text-[#1a1210] transition hover:bg-orange-300">Explorar biblioteca <span className="ml-2">→</span></button></div>
              </section>
              <section className="mt-9" id="biblioteca"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-xl font-extrabold">Explore por categoria</h2><p className="mt-1 text-sm text-slate-400">Encontre rapidamente o tipo de modelo que procura.</p></div><span className="text-xs text-slate-500">{filtered.length} categorias</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <button key={item.title} onClick={() => setSection(item.title)} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#141922] text-left transition duration-200 hover:-translate-y-1 hover:border-orange-300/30 hover:bg-[#191f29]"><div className={`relative grid h-32 place-items-center overflow-hidden bg-gradient-to-br ${item.color}`}><div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 40%), radial-gradient(circle at 80% 90%, rgba(255,155,80,.14), transparent 35%)" }} /><span className="relative text-5xl drop-shadow-lg transition duration-200 group-hover:scale-110">{item.icon}</span></div><div className="p-5"><div className="flex items-center justify-between gap-3"><h3 className="font-bold">{item.title}</h3><span className="text-orange-300 transition group-hover:translate-x-1">→</span></div><p className="mt-2 text-sm text-slate-400">{item.detail}</p></div></button>)}</div></section>
              <section className="mt-8 rounded-2xl border border-white/10 bg-white/[.025] p-5 sm:flex sm:items-center sm:justify-between sm:p-6"><div><h3 className="font-bold">Precisa de uma ideia para começar?</h3><p className="mt-1 text-sm text-slate-400">Veja os guias práticos disponíveis na área de bônus.</p></div><button onClick={() => setSection("Bônus")} className="mt-4 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/5 sm:mt-0">Ver bônus →</button></section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
