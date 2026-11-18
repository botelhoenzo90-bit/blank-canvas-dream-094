import { useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { checkAccess } from "@/lib/access.functions";

const KEY = "prime-access-email";

export function AccessGate({ logo, children }: { logo: string; children: ReactNode }) {
  const check = useServerFn(checkAccess);
  const [state, setState] = useState<"loading" | "out" | "in">("loading");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (!saved) { setState("out"); return; }
    check({ data: { email: saved } }).then(r => setState(r.allowed ? "in" : "out")).catch(() => setState("out"));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const r = await check({ data: { email } });
      if (r.allowed) { localStorage.setItem(KEY, email.trim().toLowerCase()); setState("in"); }
      else setError("Não encontramos uma compra aprovada com este e-mail. Use o mesmo e-mail da compra.");
    } catch { setError("Digite um e-mail válido."); }
    setBusy(false);
  }

  if (state === "in") return <>{children}<button onClick={() => { localStorage.removeItem(KEY); setState("out"); }} className="fixed bottom-4 left-4 z-50 rounded-lg border border-[#D7E8FF] bg-white px-3 py-2 text-xs font-bold text-[#536D87] shadow">Sair</button></>;
  if (state === "loading") return <div className="min-h-screen bg-[#F3F8FF]" />;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1F3A] px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <img src={logo} alt="Prime 3D Biblioteca" className="mx-auto mb-5 h-16 w-auto object-contain" />
        <h1 className="text-center text-xl font-black text-[#173B63]">Área de Membros</h1>
        <p className="mt-1 text-center text-sm text-[#607C98]">Entre com o e-mail usado na compra.</p>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com"
          className="mt-5 w-full rounded-xl border border-[#D7E8FF] bg-[#F3F8FF] px-3 py-3 text-sm outline-none focus:border-[#FF7A00]" />
        {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
        <button disabled={busy} className="mt-4 w-full rounded-xl bg-[#FF7A00] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-60">{busy ? "Verificando..." : "ACESSAR"}</button>
      </form>
    </main>
  );
}
