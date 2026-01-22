import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.203.0/http/file_server.ts";

const PORT = 8080;

console.log(`Server running on http://localhost:${PORT}`);

await serve(async (req) => {
  const url = new URL(req.url);
  let path = url.pathname === "/" ? "./index.html" : `./${url.pathname}`;

  try {
    return await serveFile(req, path);
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}, { port: PORT });
