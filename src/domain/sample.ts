/** Welcome document shown the first time the app opens (no saved docs yet). */
export const WELCOME_TITLE = "Cartão de boas-vindas"

export const WELCOME_HTML = `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><title>Cartão de boas-vindas</title>
<style>
  body{margin:0;font-family:system-ui,sans-serif;background:linear-gradient(135deg,#2f80ed,#1eb28a);min-height:100vh;display:grid;place-items:center}
  .card{background:#fff;padding:48px 52px;border-radius:24px;box-shadow:0 24px 60px rgba(0,0,0,.25);text-align:center;max-width:420px;animation:rise .6s cubic-bezier(.22,1,.36,1)}
  @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  h1{margin:0 0 12px;font-size:34px;color:#0f172a;letter-spacing:-.02em}
  p{margin:0;color:#475569;font-size:17px;line-height:1.6}
  .tag{display:inline-block;margin-top:24px;padding:9px 18px;border-radius:999px;background:#eef6ff;color:#2569c9;font-weight:700;font-size:14px}
</style></head>
<body>
  <div class="card">
    <h1>Olá!</h1>
    <p>Cole qualquer HTML no editor à esquerda e veja o resultado renderizado aqui, em tempo real.</p>
    <span class="tag">pronto para editar</span>
  </div>
</body>
</html>`
