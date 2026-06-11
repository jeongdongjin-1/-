# 실시간 환율 대시보드 (웹)

브라우저에서 바로 보는 단일 페이지 대시보드입니다. 백엔드 없이 정적 파일 하나(`index.html`)로 동작합니다.

## 기능
- 📊 실시간 환율 + 추이 차트 + 데이터 기반 흐름 코멘트
- 💱 환전 유리한 방법 (계산기·방법 비교·팁)
- 📰 환율 뉴스 (Google 뉴스 RSS)
- 🛂 출국제한국가 (외교부 여행경보 4·3단계 + 지정지역 지도)

## 데이터 출처 (무료·키 없음)
- 현재 환율: open.er-api.com / 추이: frankfurter.dev (ECB)
- 뉴스: Google 뉴스 RSS (CORS 프록시 경유)
- 지도: Leaflet + CARTO 타일

## 배포 (GitHub Pages)
1. GitHub에서 새 저장소 생성
2. `git remote add origin <저장소 URL>` 후 `git push -u origin main`
3. 저장소 **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`** 저장
4. 1~2분 뒤 `https://<사용자명>.github.io/<저장소명>/` 에서 접속

> ⚠️ 환율·뉴스·지도는 외부 공개 API를 호출하므로 인터넷 연결이 필요합니다.
