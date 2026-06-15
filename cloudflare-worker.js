// 환율 대시보드 전용 뉴스 프록시 (Cloudflare Workers · 무료)
// 사용법: 아래 코드를 Cloudflare Worker에 붙여넣고 배포 → 생긴 주소(https://xxx.workers.dev)를
// index.html 의 const NEWS_PROXY_CUSTOM = "https://xxx.workers.dev/?url=" 에 넣으면 끝.
export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const target = new URL(request.url).searchParams.get("url");
    if (!target) return new Response("missing url", { status: 400, headers: cors });

    let t;
    try { t = new URL(target); } catch { return new Response("bad url", { status: 400, headers: cors }); }

    // 보안: 구글 뉴스만 허용 (오픈 프록시 남용 방지)
    if (!/(^|\.)google\.com$/.test(t.hostname)) {
      return new Response("forbidden host", { status: 403, headers: cors });
    }

    try {
      const resp = await fetch(target, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; KRWDashboard/1.0)" },
        cf: { cacheTtl: 120, cacheEverything: true }, // 2분 캐시로 더 안정적
      });
      const body = await resp.text();
      return new Response(body, {
        status: resp.status,
        headers: { ...cors, "Content-Type": "text/xml; charset=utf-8" },
      });
    } catch (e) {
      return new Response("fetch error", { status: 502, headers: cors });
    }
  },
};
