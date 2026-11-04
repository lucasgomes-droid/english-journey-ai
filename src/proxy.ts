import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/env";

const PUBLIC_PATHS = ["/login", "/cadastro", "/auth", "/configuracao", "/offline"];

export async function proxy(request: NextRequest) {
  const url = SUPABASE_URL;
  const key = SUPABASE_ANON_KEY;
  const { pathname } = request.nextUrl;

  // Sem Supabase configurado, mostra a tela de configuração em vez de quebrar.
  if (!url || !key) {
    if (pathname.startsWith("/configuracao") || pathname.startsWith("/api")) return NextResponse.next();
    return NextResponse.redirect(new URL("/configuracao", request.url));
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Renova a sessão (não remover).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  if (!user && !isPublic && !pathname.startsWith("/api")) {
    const to = new URL("/login", request.url);
    return NextResponse.redirect(to);
  }
  if (user && (pathname === "/login" || pathname === "/cadastro")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/|sw.js|manifest.webmanifest|.*\\.(?:png|svg|jpg|ico|webp)$).*)"],
};
