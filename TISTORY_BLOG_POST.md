# [AI Studio x 웹 게임] 2:1 아이소메트릭 마을 건설 스튜디오 개발 & GitHub Pages 배포기 (256 타일, 캔버스 렌더링, i18n)

> **"고전 명작 심시티와 에이지 오브 엠파이어의 감성을 웹 브라우저 위에 그대로 구현하다!"**  
> Google AI Studio를 활용하여 2:1 디메트릭(Dimetric) 등각 투영 엔진, 256개 픽셀 아트 타일, 실시간 애니메이션, 한글/영문 다국어 지원, 그리고 GitHub Pages 자동 배포까지 완성한 전체 개발 과정을 코드 예시와 함께 상세히 공유합니다.

---

## 📌 목차
1. [프로젝트 소개 & 완성 데모 미리보기](#1-프로젝트-소개--완성-데모-미리보기)
2. [Google AI Studio를 활용한 개발 워크플로우](#2-google-ai-studio를-활용한-개발-워크플로우)
3. [2:1 디메트릭(Isometric) 등각 투영 수학 원리 & 핵심 코드](#3-21-디메트릭isometric-등각-투영-수학-원리--핵심-코드)
4. [살아 숨쉬는 생태계 애니메이션 파이프라인](#4-살아-숨쉬는-생태계-애니메이션-파이프라인)
5. [256개 픽셀 아트 타일셋과 5대 테마 바이옴](#5-256개-픽셀-아트-타일셋과-5대-테마-바이옴)
6. [한국어/영어 완벽 다국어(i18n) 아키텍처](#6-한국어영어-완벽-다국어i18n-아키텍처)
7. [Vite 빌드 최적화 및 GitHub Pages 배포 자동화](#7-vite-빌드-최적화-및-github-pages-배포-자동화)
8. [마무리 & 향후 확장 계획](#8-마무리--향후-확장-계획)

---

## 1. 프로젝트 소개 & 완성 데모 미리보기

- **배포 URL (GitHub Pages)**: [https://djai32521.github.io/Isometric_Town_Builder/](https://djai32521.github.io/Isometric_Town_Builder/)
- **GitHub 저장소**: [https://github.com/djai32521/Isometric_Town_Builder](https://github.com/djai32521/Isometric_Town_Builder)
- **사용 기술 스택**: `React 19`, `TypeScript`, `Vite`, `HTML5 Canvas 2D`, `Tailwind CSS / Pure CSS Modern Tokens`, `GitHub Actions`

### 🎮 주요 특징 한눈에 보기
- **2:1 디메트릭 등각 투영 (Isometric Projection)**: 128×64 픽셀 비율의 정밀 다이아몬드 그리드 렌더링.
- **256종의 정교한 픽셀 아트 타일**: 중세 주택, 상점, 풍차, 성채부터 사막 오아시스, 설산 빙하, 고대 유적 랜드마크까지 완비.
- **살아 숨쉬는 애니메이션 월드**: 날개가 회전하는 곡물 풍차, 출렁이는 수로 물결, 굴뚝에서 피어오르는 연기 파티클, 하늘을 활공하는 황금 독수리.
- **무한 팬(Pan) & 줌(Zoom) & 반응형 뷰포트**: 마우스 휠 확대/축소(25%~300%), 스페이스바 드래그 및 우클릭 팬, 모바일 핀치 줌 완벽 지원.
- **한국어 / 영어 완벽 다국어 지원**: 기본 한국어 환경 제공 및 상단 토글로 실시간 전환, 256개 타일 명칭과 설명까지 번역.
- **1:1 원본 해상도 무손실 PNG 스냅샷**: 2,176 × 1,216 고해상도로 나만의 왕국을 즉시 다운로드하거나 클립보드에 복사.
- **실행 취소(Undo) & 스포이드(Eyedropper)**: 최대 40단계의 히스토리 스택과 `Alt + 클릭`으로 필드의 타일을 복사하는 스포이드 지원.

---

## 2. Google AI Studio를 활용한 개발 워크플로우

이번 프로젝트는 **Google AI Studio**의 차세대 LLM 코딩 에이전트 기능을 활용해 기획부터 아키텍처 설계, 타일 그래픽 파이프라인 수립, 다국어 처리, GitHub 배포까지 유기적으로 개발되었습니다.

### 💡 AI Studio와의 협업 핵심 포인트
1. **정밀한 요구사항 정의**:
   - 단순한 "마을 짓기 게임 만들어줘"가 아닌, *"2:1 비율의 디메트릭 그리드(폭 128px, 높이 64px)를 사용하고 마우스 스크린 좌표와 타일 그리드 좌표 변환 공식을 정수 연산으로 유도해 줘"* 처럼 구체적인 수학 모델을 제시했습니다.
2. **단일 캔버스 기반 60FPS 렌더링**:
   - DOM 요소 수천 개를 생성하는 방식은 성능 저하가 극심하므로, 단일 `<canvas>`에 `requestAnimationFrame`과 `ImageCache`를 조합하여 모바일 기기에서도 부드러운 60FPS를 유지하도록 지시했습니다.
3. **점진적 기능 확장 (Iterative Engineering)**:
   - 정적 타일 배치 구현 → 레이어 z-ordering(깊이 정렬) → 4프레임 타일 애니메이션 추가 → 언어 스위처(i18n) 탑재 → GitHub Actions Pages 배포 파이프라인 구성의 단계적 접근을 취했습니다.

---

## 3. 2:1 디메트릭(Isometric) 등각 투영 수학 원리 & 핵심 코드

게임 개발에서 2:1 등각 투영(Dimetric Isometric)은 x축으로 2픽셀 이동할 때 y축으로 1픽셀 이동하는 타일 형태를 말합니다. 이는 픽셀 아트에서 계단 현상(Aliasing)을 방지하는 가장 이상적인 비율입니다.

```
       ▲ (x, y - 32)
      / \
     /   \
(x-64,y)  (x+64, y)
     \   /
      \ /
       ▼ (x, y + 32)
```

### 🧮 1) 월드 좌표 ↔ 그리드 행/열(Row, Col) 변환 공식
화면에서 마우스를 클릭했을 때 사용자가 몇 행(Row), 몇 열(Col)의 타일을 선택했는지 판별하는 역산 공식이 핵심입니다.

```javascript
// Screen to World (카메라 줌 및 위치 역보정)
function screenToWorld(sx, sy, camera) {
  return {
    x: (sx - camera.x) / camera.zoom,
    y: (sy - camera.y) / camera.zoom
  };
}

// World to Cell (다이아몬드 타일 행/열 산출)
function worldToCell(wx, wy, originX, originY, rows, cols) {
  const HALF_W = 64;
  const QUARTER_W = 32;

  const dx = wx - (originX + HALF_W);
  const dy = wy - (originY + 3 * QUARTER_W);

  // 2:1 디메트릭 투영 행렬 역산
  const col = Math.round((dy / 64.0) + (dx / 128.0));
  const row = Math.round((dy / 64.0) - (dx / 128.0));

  if (row >= 0 && row < rows && col >= 0 && col < cols) {
    return { row, col };
  }
  return null;
}
```

### 📐 2) 깊이 정렬(Z-Sorting / Depth Buffer)
타일이 겹쳐서 그려질 때 뒤쪽 타일이 앞쪽 타일을 가리면 안 됩니다. 다이아몬드 그리드에서는 `depth = row + col` 순서대로 타일을 순회하며 렌더링하면 완벽한 차폐 순서가 보장됩니다:

```javascript
// 대각선 깊이 순서대로 그리기 (Back to Front)
for (let depth = 0; depth <= (ROWS + COLS - 2); depth++) {
  for (let i = 0; i < ROWS; i++) {
    const j = depth - i;
    if (j >= 0 && j < COLS) {
      const tileId = currentGrid[i][j];
      const ox = ORIGIN_X + (j - i) * HALF_W;
      const oy = ORIGIN_Y + (i + j) * QUARTER_W;
      
      const img = getTileFrame(tileId, animFrame, i, j);
      if (img && img.complete) {
        ctx.drawImage(img, ox, oy);
      }
    }
  }
}
```

---

## 4. 살아 숨쉬는 생태계 애니메이션 파이프라인

단순한 정적 맵 빌더를 넘어, 맵에 생명력을 불어넣기 위해 4가지 레이어의 동적 효과를 결합했습니다.

### 💨 1) 굴뚝 연기 물리 파티클 (Chimney Smoke)
각 건물 타일의 굴뚝 좌표(`dx, dy`)를 기반으로 시간에 따라 서서히 위로 피어오르고 흩어지는 반투명 원형 파티클 시스템:

```javascript
const ch = CHIMNEYS[tileId];
if (ch) {
  const cx = ox + ch.dx;
  const cy = oy + ch.dy;
  const pCount = ch.count || 3;
  for (let p = 0; p < pCount; p++) {
    const prog = ((animTime * 0.7 + (i * 3 + j * 7) * 0.2 + p / pCount) % 1.0);
    const px = cx + Math.sin(prog * 6.28) * 3 - prog * 4;
    const py = cy - prog * ch.maxH;
    const rad = 1.3 + prog * 3.0;
    const alpha = (1.0 - prog) * 0.40;

    ctx.fillStyle = `rgba(240, 235, 230, ${alpha})`;
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.fill();
  }
}
```

### 🦅 2) 왕국 상공을 선회하는 황금 독수리
월드 중심축(`WORLD_CENTER`)을 기준으로 삼각함수 궤적을 그리며 날갯짓하는 공중 스프라이트:

```javascript
const eagleProg = animTime * 0.16;
const ex = WORLD_CENTER_X + Math.cos(eagleProg) * 260;
const ey = WORLD_CENTER_Y - 150 + Math.sin(eagleProg) * 125;
const isFlap = Math.sin(animTime * 4.0) > 0;
const eSpr = isFlap ? eagleDownSprite : eagleUpSprite;

ctx.drawImage(eSpr.img, ex - eSpr.w / 2, ey - eSpr.h / 2);
```

### 🌾 3) 풍차 날개의 위상차(Phase-Offset) 회전
모든 풍차가 로봇처럼 동일한 각도로 회전하면 부자연스럽습니다. 타일의 그리드 좌표(`i, j`)를 해시값으로 활용해 서로 다른 타이밍으로 회전하도록 구현했습니다:

```javascript
const isWindmill = tid.includes('windmill');
const phaseOffset = isWindmill ? Math.floor((j * 13 + i * 17) / 3) : 0;
const frameIndex = (animFrame + phaseOffset) % animCache[tid].length;
```

---

## 5. 256개 픽셀 아트 타일셋과 5대 테마 바이옴

게임에는 총 256개의 타일이 6개 카테고리로 체계적으로 분류되어 있습니다:

| 카테고리 | 타일 수 | 주요 타일 구성 |
|---|:---:|---|
| **건물 및 시설 (Buildings)** | 56개 | 아늑한 오두막, 튜더 선술집, 대장간, 제과점, 도서관, 온실, 시청, 사막 카스바, 베네치아 유리공방 등 |
| **도로 및 수로 (Roads & Waterways)** | 36개 | 남북/동서 직선길, 사거리, 삼거리, 곡선 모퉁이, 아치형 돌다리, 목조 교량, 직교 수로 |
| **마을 장식 (Village Decor)** | 12개 | 중앙 분수대, 마을 우물, 시장 가판대, 참나무/소나무 숲, 벚꽃 정원, 가로등, 기념 석상 |
| **지형 및 경사 (Terrain & Slopes)** | 44개 | 경사로 램프, 돌계단, 고원 평지, 폭포/시냇물 경사지, 돌 징검다리 초원 |
| **생태계 및 해안 (Biomes & Coasts)** | 58개 | 모래사장 해변, 항구 부두, 등대 섬, 야자수 섬, 사막 사구/오아시스, 빙하 설원, 이글루 |
| **랜드마크 및 야생동물 (Landmarks)** | 50개 | 고딕 대성당, 거대 피라미드, 스핑크스, 스톤헨지, 공중 부유섬, 혹등고래, 티베트 야크 |

### 🗺️ 스타터 프리셋 5종
1. **활기찬 마을 (Living village)**: 수로와 풍차, 광장과 상점이 어우러진 평화로운 중세 왕국
2. **강변 계곡 (Riverside valley)**: 굽이치는 강물을 따라 돌다리와 수차 방앗간이 늘어선 계곡 마을
3. **수도 시장 (Market capital)**: 번화한 시장통과 도서관, 시청, 관문이 위용을 자랑하는 대도시
4. **다양한 생태계 (Multi-biome world)**: 설산 빙하부터 온대 평야, 모래 해변, 작열하는 사막까지 하나로 이어진 대륙
5. **초원으로 비우기 (Clear to meadow)**: 자유로운 나만의 창작을 위한 깨끗한 캔버스

---

## 6. 한국어/영어 완벽 다국어(i18n) 아키텍처

사용자 편의를 위해 **기본 언어를 한국어로 설정**하고, 상단 바의 언어 스위처를 통해 언제든 영어로 전환할 수 있는 반응형 i18n 시스템을 구축했습니다:

```typescript
// src/i18n.js
export const UI_STRINGS = {
  ko: {
    appTitle: '아이소메트릭 마을 건설 스튜디오',
    appSubtitle: '16×16 스튜디오 • 256 타일',
    animate: '애니메이션',
    paused: '일시정지',
    undo: '실행 취소',
    centerView: '화면 중앙 정렬',
    snapshot: '스냅샷 저장 (PNG)',
    starterPresets: '추천 프리셋',
    paletteFilters: '팔레트 분류',
    sidebarFooter: '클릭: 타일 배치 • 스페이스/드래그: 화면 이동 • 휠: 확대/축소 • Alt+클릭: 스포이드',
    ...
  },
  en: {
    appTitle: 'Isometric town builder',
    appSubtitle: '16×16 studio • 256 tiles',
    animate: 'Animate',
    paused: 'Paused',
    undo: 'Undo',
    ...
  }
};
```

선택된 언어 설정은 브라우저의 `localStorage`에 자동 저장되어 새로고침 시에도 유지됩니다.

---

## 7. Vite 빌드 최적화 및 GitHub Pages 배포 자동화

GitHub Pages는 저장소의 서브패스(`https://<user>.github.io/<repo>/`)로 서비스되기 때문에, 번들링 시 정적 자산 경로를 상대 경로로 지정해야 리소스 404 에러를 방지할 수 있습니다.

### ⚙️ 1) `vite.config.ts` 상대 경로 설정
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // GitHub Pages 서브디렉토리 지원의 핵심!
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
```

### 🚀 2) GitHub Actions CI/CD 파이프라인 (`.github/workflows/deploy.yml`)
`main` 브랜치에 코드를 푸시하면 자동으로 빌드 및 배포가 수행되도록 GitHub Actions 워크플로우를 설정했습니다:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci || npm install

      - name: Build project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 8. 마무리 & 향후 확장 계획

Google AI Studio를 통해 과거에는 수주일이 걸렸을 등각 투영 캔버스 엔진과 256개 타일셋 통합, 애니메이션 렌더링, i18n 시스템을 단시간에 고품질로 완성할 수 있었습니다.

### 🔮 향후 업데이트 로드맵
- [ ] **22×22 및 32×32 대형 맵 확장 지원**
- [ ] **배경 음악(BGM) 및 타일 배치/물소리 효과음(SFX) 탑재**
- [ ] **JSON 형태의 맵 저장 및 불러오기 / 공유 링크 생성**
- [ ] **낮/밤 주기(Day/Night cycle) 및 가로등 불빛 셰이더 효과**

직접 브라우저에서 나만의 디오라마 마을을 만들고 고해상도 스냅샷을 저장해 보세요!
궁금한 점이나 추가하고 싶은 기능 아이디어가 있다면 댓글로 자유롭게 남겨주세요. 감사합니다! 😊
