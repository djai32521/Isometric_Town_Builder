import React, { useEffect } from 'react';
import { initIsometricStudio } from './studioEngine.js';
import './styles.css';

const STUDIO_MARKUP = `  <!-- Top utility bar -->
  <header class="top-bar">
    <div class="top-bar-left">
      <span class="top-bar-title" id="app-title">아이소메트릭 마을 건설 스튜디오</span>
      <span class="top-bar-subtitle" id="app-subtitle">16&times;16 스튜디오 &bull; 256 타일</span>
    </div>

    <div class="top-bar-center">
      <div class="top-bar-status" id="builder-coord-status">행 0, 열 0 &bull; 준비 완료</div>
    </div>

    <div class="top-bar-right">
      <div class="lang-switcher">
        <button type="button" class="lang-btn active" id="lang-ko-btn" title="한국어 (기본)">한국어</button>
        <button type="button" class="lang-btn" id="lang-en-btn" title="English">English</button>
      </div>
      <button type="button" class="builder-text-btn active" id="builder-animate-toggle" title="애니메이션 켜기/끄기">애니메이션</button>
      <button type="button" class="builder-text-btn" id="builder-undo-btn">실행 취소</button>
      <div class="zoom-group">
        <button type="button" class="zoom-btn" id="builder-zoom-out" title="축소">&minus;</button>
        <span id="builder-zoom-readout" class="zoom-readout" title="100% 배율로 초기화">100%</span>
        <button type="button" class="zoom-btn" id="builder-zoom-in" title="확대">&plus;</button>
      </div>
      <button type="button" class="builder-text-btn" id="builder-reset-view-btn">화면 중앙 정렬</button>
      <button type="button" class="builder-action-btn primary" id="builder-export-btn">스냅샷 저장 (PNG)</button>
    </div>
  </header>

  <!-- Left Fixed Control Panel / Sidebar -->
  <aside class="builder-sidebar" id="builder-sidebar">
    <!-- Presets Section -->
    <div class="sidebar-section-presets">
      <div class="sidebar-header">
        <span id="sidebar-presets-title">추천 프리셋</span>
      </div>
      <div class="preset-pill-grid">
        <button type="button" class="preset-pill active" data-preset="village" id="preset-btn-village">활기찬 마을</button>
        <button type="button" class="preset-pill" data-preset="riverside" id="preset-btn-riverside">강변 계곡</button>
        <button type="button" class="preset-pill" data-preset="market" id="preset-btn-market">수도 시장</button>
        <button type="button" class="preset-pill" data-preset="spacious" id="preset-btn-spacious">다양한 생태계</button>
        <button type="button" class="preset-pill span-2" data-preset="meadow" id="preset-btn-meadow">초원으로 비우기</button>
      </div>
    </div>

    <!-- Active Brush Card -->
    <div class="sidebar-brush-card" id="sidebar-brush-card">
      <div class="brush-thumb-wrap">
        <img id="sidebar-brush-img" class="brush-thumb pixelated" src="" alt="선택된 브러시" />
      </div>
      <div class="brush-info">
        <div class="brush-title" id="sidebar-brush-name">아늑한 붉은 오두막</div>
        <div class="brush-meta" id="sidebar-brush-meta">B01 &bull; 건물</div>
        <div class="brush-doc" id="sidebar-brush-doc">초가지붕과 붉은 벽돌의 아담하고 따뜻한 시골 주택입니다.</div>
      </div>
    </div>

    <!-- Palette Categories -->
    <div class="sidebar-section-categories">
      <div class="sidebar-header">
        <span id="sidebar-categories-title">팔레트 분류</span>
      </div>
      <div class="category-pills-wrap">
        <button type="button" class="builder-text-btn category-pill active" data-tray-cat="all" id="cat-btn-all">전체 (256)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="building" id="cat-btn-building">건물 (56)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="road" id="cat-btn-road">도로 및 수로 (36)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="decoration" id="cat-btn-decoration">마을 장식 (12)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="terrain" id="cat-btn-terrain">지형 및 경사 (44)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="biome" id="cat-btn-biome">생태계 및 해안 (58)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="landmark" id="cat-btn-landmark">랜드마크 및 야생동물 (50)</button>
      </div>
    </div>

    <!-- Tile Palette Grid -->
    <div class="sidebar-tray-grid" id="builder-tray">
      <!-- Populated via JavaScript -->
    </div>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer" id="sidebar-footer">
      <span>클릭: 타일 배치 &bull; 스페이스/드래그: 화면 이동 &bull; 휠: 확대/축소 &bull; Alt+클릭: 스포이드</span>
    </div>
  </aside>

  <!-- Canvas Container -->
  <div id="canvas-container">
    <canvas id="builder-canvas"></canvas>
  </div>

  <!-- Snapshot Modal Dialog -->
  <div class="snapshot-modal-backdrop" id="snapshot-modal" role="dialog" aria-modal="true" aria-labelledby="snapshot-modal-title">
    <div class="snapshot-modal-card">
      <div class="snapshot-modal-header">
        <div>
          <h2 class="snapshot-modal-title" id="snapshot-modal-title">스냅샷 내보내기 완료</h2>
          <p class="snapshot-modal-subtitle" id="snapshot-modal-subtitle">2,176 &times; 1,216 픽셀 &bull; 16&times;16 전체 왕국 &bull; 1:1 픽셀 해상도</p>
        </div>
        <button type="button" class="snapshot-modal-close" id="snapshot-modal-close" title="닫기">&times;</button>
      </div>

      <div class="snapshot-modal-body">
        <img id="snapshot-modal-img" class="snapshot-preview-img pixelated" alt="16x16 왕국 스냅샷" />
      </div>

      <div class="snapshot-modal-footer">
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <a id="snapshot-modal-download-link" class="snapshot-action-btn primary" download="isometric-kingdom-16x16.png">PNG 다운로드</a>
          <button type="button" id="snapshot-modal-copy-btn" class="snapshot-action-btn">이미지 복사</button>
          <a id="snapshot-modal-open-link" class="snapshot-action-link" target="_blank" rel="noopener">전체 크기로 열기 &rarr;</a>
        </div>
        <button type="button" class="snapshot-action-link" id="snapshot-modal-dismiss-btn">완료</button>
      </div>
    </div>
  </div>
`;

export default function App() {
  useEffect(() => {
    initIsometricStudio();
  }, []);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      dangerouslySetInnerHTML={{ __html: STUDIO_MARKUP }}
    />
  );
}
