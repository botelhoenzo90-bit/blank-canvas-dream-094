import { createFileRoute } from "@tanstack/react-router";

// Aceita webhooks da Kiwify e da Cakto. Protegido pelo token ?token=SEU_TOKEN (secret WEBHOOK_TOKEN).
type Any = Record<string, any>;

function pick(body: Any) {
  const email: string | undefined =
    body?.Customer?.email ?? body?.customer?.email ?? body?.data?.customer?.email ?? body?.data?.email ?? body?.email;
  const name: string | undefined =
    body?.Customer?.full_name ?? body?.customer?.name ?? body?.data?.customer?.name ?? body?.name;
  const status = String(body?.order_status ?? body?.webhook_event_type ?? body?.event ?? body?.data?.status ?? body?.status ?? "").toLowerCase();
  const platform = body?.Customer || body?.order_status ? "kiwify" : "cakto";
  return { email: email?.trim().toLowerCase(), name, status, platform };
}

const GRANT = ["paid", "approved", "order_approved", "purchase_approved", "compra_aprovada", "subscription_renewed", "completed"];
const REVOKE = ["refunded", "chargedback", "chargeback", "refund", "order_refunded", "purchase_refunded", "subscription_canceled", "canceled", "cancelled"];

export const Route = createFileRoute("/api/public/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env["WEBHOOK_TOKEN"];
        if (!expected) return new Response("Not configured", { status: 500 });
        let body: Any;
        try { body = await request.json(); } catch { return new Response("Invalid JSON", { status: 400 }); }
        const url = new URL(request.url);
        const token = url.searchParams.get("token") ?? body?.secret ?? body?.token;
        if (token !== expected) return new Response("Unauthorized", { status: 401 });

        const { email, name, status, platform } = pick(body);
        if (!email || email.length > 254 || !email.includes("@")) return Response.json({ ok: true, ignored: "no email" });
        const grant = GRANT.some((s) => status.includes(s));
        const revoke = REVOKE.some((s) => status.includes(s));
        if (!grant && !revoke) return Response.json({ ok: true, ignored: status || "unknown event" });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("buyers").upsert(
          { email, name: name?.slice(0, 200) ?? null, active: grant && !revoke, platform, last_event: status.slice(0, 100), updated_at: new Date().toISOString() },
          { onConflict: "email" },
        );
        if (error) { console.error("webhook upsert", error); return new Response("DB error", { status: 500 }); }
        return Response.json({ ok: true, email, active: grant && !revoke });
      },
    },
  },
});
