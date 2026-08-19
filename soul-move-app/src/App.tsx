export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 sm:p-10">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20">
              Tailwind v4
            </span>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Tailwind Lab
            </h1>

            <p className="mt-2 max-w-xl text-slate-400">
              Uma página para testar cores, espaçamento, grid,
              responsividade, hover, focus, sombras e muito mais.
            </p>
          </div>

          <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/40">
            Testar botão
          </button>
        </header>

        {/* Cards */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition hover:-translate-y-1 hover:border-blue-500">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              🚀
            </div>

            <h2 className="text-xl font-bold">
              Performance
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Testando padding, margin, border, shadow e hover.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition hover:-translate-y-1 hover:border-purple-500">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
              🎨
            </div>

            <h2 className="text-xl font-bold">
              Cores
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Testando background, texto, opacity e bordas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition hover:-translate-y-1 hover:border-pink-500">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-2xl">
              📱
            </div>

            <h2 className="text-xl font-bold">
              Responsivo
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Redimensione a janela e veja o grid mudar.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition hover:-translate-y-1 hover:border-emerald-500">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
              ⚡
            </div>

            <h2 className="text-xl font-bold">
              Tailwind v4
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Utilitários modernos funcionando diretamente no projeto.
            </p>
          </div>

        </section>

        {/* Gradient */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
          <div className="rounded-[calc(1.5rem-4px)] bg-slate-950 p-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

              <div>
                <p className="font-semibold text-blue-400">
                  GRADIENT TEST
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Testando Gradients
                </h2>

                <p className="mt-3 text-slate-400">
                  Se você consegue ver o degradê azul → roxo → rosa,
                  essa parte do Tailwind também está funcionando.
                </p>
              </div>

              <div className="h-32 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shadow-blue-500/30" />

            </div>
          </div>
        </section>

        {/* Form */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Formulário
          </h2>

          <p className="mt-1 text-slate-400">
            Teste também os estados de focus.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Nome
              </label>

              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-600 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
              />
            </div>

          </div>

          <button className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/30">
            Enviar formulário
          </button>
        </section>

        {/* Responsive test */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">
            Teste responsivo
          </h2>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 rounded-xl bg-red-500 p-5 font-bold">
              Mobile → 1 coluna
            </div>

            <div className="flex-1 rounded-xl bg-yellow-500 p-5 font-bold text-slate-950">
              Tablet → horizontal
            </div>

            <div className="flex-1 rounded-xl bg-green-500 p-5 font-bold text-slate-950">
              Desktop → horizontal
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          Tailwind CSS v4 • Teste concluído 🚀
        </footer>

      </div>
    </main>
  );
}