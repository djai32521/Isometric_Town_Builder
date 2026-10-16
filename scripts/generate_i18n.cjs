const fs = require('fs');

const tiles = JSON.parse(fs.readFileSync('tiles_dump.json', 'utf8'));

// Common dictionary for terms
const DICT = {
  // Common orientations
  'SW': '남서향',
  'SE': '남동향',
  'NE': '북동향',
  'NW': '북서향',
  'EW': '동서',
  'NS': '남북',
  '(SW)': '(남서)',
  '(SE)': '(남동)',
  '(NE)': '(북동)',
  '(NW)': '(북서)',
  '(EW)': '(동서)',
  '(NS)': '(남북)',
};

// Hand-crafted rich Korean mappings for all categories, presets, and specific tile patterns
function translateLabel(t) {
  const id = t.id;
  const label = t.label;

  // Specific buildings
  if (id === 'b01_cottage_red') return '아늑한 붉은 오두막';
  if (id === 'b02_tudor_inn') return '튜더 양식 여관 및 선술집';
  if (id === 'b03_blacksmith_forge') return '대장간 화로와 모루';
  if (id === 'b04_windmill') return '회전하는 곡물 풍차';
  if (id === 'b05_watermill') return '강변 수차 방앗간';
  if (id === 'b06_bakery') return '화덕 빵집';
  if (id === 'b07_apothecary') return '약초상 약방';
  if (id === 'b08_watchtower') return '석조 경비 감시탑';
  if (id === 'b09_chapel') return '스테인드글라스 예배당';
  if (id === 'b10_wizard_tower') return '마법사의 비전 탑';
  if (id === 'b11_carpenter_sawmill') return '목공소 및 제재소';
  if (id === 'b12_general_store') return '마을 잡화점';
  if (id === 'b13_barn_silo') return '농장 헛간과 사일로';
  if (id === 'b14_town_hall') return '마을 시청 및 광장 회관';
  if (id === 'b15_library_scholar') return '학자의 대도서관';
  if (id === 'b16_alchemist_workshop') return '연금술사 작업실';
  if (id === 'b17_twin_gatehouse') return '성벽 쌍둥이 관문';
  if (id === 'b18_greenhouse_orangery') return '아치형 유리 온실';
  if (id === 'b19_lighthouse_dock') return '해안 등대 및 선착장';
  if (id === 'b20_noble_manor') return '귀족 대저택';

  // Decor
  if (id === 'd01_plaza_fountain') return '중앙 광장 분수대';
  if (id === 'd02_village_well') return '마을 돌 우물';
  if (id === 'd03_market_stalls') return '활기찬 시장 가판대';
  if (id === 'd04_oak_tree_park') return '풍성한 참나무 공원';
  if (id === 'd05_pine_grove') return '울창한 소나무 숲';
  if (id === 'd06_cherry_garden') return '벚꽃 정원';
  if (id === 'd07_streetlamps_signpost') return '가로등 및 이정표';
  if (id === 'd08_stone_statue_plaza') return '기념 석상 광장';
  if (id === 'd09_merchant_cart_camp') return '상인 마차 캠프';
  if (id === 'd10_flower_orchard_hedge') return '꽃 과수원 생울타리';
  if (id === 'd11_canal_straight') return '맑은 직선 수로';
  if (id === 'd12_meadow_wildflowers') return '야생화 초원';

  // Roads
  if (id.startsWith('r')) {
    let base = '자갈길';
    if (id.includes('bridge_stone')) return '견고한 돌다리 교량';
    if (id.includes('bridge_wood') || id.includes('bridge')) return '목조 교량';
    if (id.includes('straight_ns')) return '직선 자갈길 (남북)';
    if (id.includes('straight_ew')) return '직선 자갈길 (동서)';
    if (id.includes('cross')) return '사거리 교차로';
    if (id.includes('tee_nes')) return '삼거리 길 (북동남)';
    if (id.includes('tee_esw')) return '삼거리 길 (동남서)';
    if (id.includes('tee_swn')) return '삼거리 길 (남서북)';
    if (id.includes('tee_wne')) return '삼거리 길 (서북동)';
    if (id.includes('corner_ne')) return '곡선 모퉁이 길 (북동)';
    if (id.includes('corner_es')) return '곡선 모퉁이 길 (동남)';
    if (id.includes('corner_sw')) return '곡선 모퉁이 길 (남서)';
    if (id.includes('corner_wn')) return '곡선 모퉁이 길 (서북)';
    if (id.includes('end_n')) return '막다른 길 (북)';
    if (id.includes('end_e')) return '막다른 길 (동)';
    if (id.includes('end_s')) return '막다른 길 (남)';
    if (id.includes('end_w')) return '막다른 길 (서)';
    if (id.includes('plaza')) return '포장된 광장 바닥';
    if (id.includes('canal')) return '수로 교차점';
  }

  // Slopes and terrain
  if (id.startsWith('s')) {
    if (id.includes('ramp')) return label.replace('Slope Ramp', '경사로 램프').replace('(N)', '(북)').replace('(E)', '(동)').replace('(S)', '(남)').replace('(W)', '(서)');
    if (id.includes('stairs')) return label.replace('Slope Stairs', '돌계단 경사지').replace('(N)', '(북)').replace('(E)', '(동)').replace('(S)', '(남)').replace('(W)', '(서)');
    if (id.includes('stream')) return label.replace('Slope Stream', '시냇물 경사 수로').replace('(N)', '(북)').replace('(E)', '(동)').replace('(S)', '(남)').replace('(W)', '(서)');
    if (id.includes('road')) return label.replace('Slope Road', '경사 자갈길').replace('(N)', '(북)').replace('(E)', '(동)').replace('(S)', '(남)').replace('(W)', '(서)');
    if (id.includes('plateau')) return '고원 잔디 평지';
    if (id.includes('stepping_stones')) return '돌 징검다리 초원';
    if (id.includes('rock_outcrop')) return '암석 돌출부 초원';
    if (id.includes('meadow')) return '푸른 야생화 초원';
  }

  // Biomes and coasts
  if (id.startsWith('m')) {
    if (id.includes('sandy_beach')) return label.replace('Sandy Beach', '모래사장 해변').replace('(N)', '(북)').replace('(E)', '(동)').replace('(S)', '(남)').replace('(W)', '(서)');
    if (id.includes('harbor_pier')) return '석조 항구 부두';
    if (id.includes('lighthouse_island')) return '고도 등대 섬';
    if (id.includes('tropical_palm')) return '열대 야자수 섬';
    if (id.includes('sea_stacks')) return '바다 암초 군락';
    if (id.includes('desert_dunes')) return '황금빛 사막 모래언덕';
    if (id.includes('desert_oasis')) return '사막의 오아시스';
    if (id.includes('red_sandstone_mesa')) return '붉은 사암 메사 암벽';
    if (id.includes('desert_adobe')) return '사막 어도비 흙벽돌 주택';
    if (id.includes('desert_bazaar')) return '사막 바자르 천막 시장';
    if (id.includes('glacier_ice')) return '빙하 얼음 설원';
    if (id.includes('frozen_tarn')) return '얼어붙은 산정 호수';
    if (id.includes('nordic_timber')) return '북유럽식 목조 롱홀';
    if (id.includes('igloo_ice')) return '에스키모 이글루 캠프';
  }

  // Landmarks
  if (id.startsWith('l')) {
    if (id.includes('cathedral')) return '웅장한 고딕 대성당';
    if (id.includes('castle_keep')) return '위엄 있는 성채 본관';
    if (id.includes('colosseum')) return '고대 원형 경기장';
    if (id.includes('pyramid')) return '신비의 거대 피라미드';
    if (id.includes('sphinx')) return '모래 속 스핑크스 석상';
    if (id.includes('stonehenge')) return '고대 거석 기념물 스톤헨지';
    if (id.includes('floating_island')) return '공중 부유 섬';
    if (id.includes('dragon_roost')) return '용의 둥지 바위산';
    if (id.includes('giant_oak')) return '신령스러운 세계수 거목';
    if (id.includes('whale')) return '수면 위 혹등고래 무리';
    if (id.includes('yak')) return '티베트 야크와 낙타 행렬';
    if (id.includes('glass_merchant')) return '유리 공예 상인 마차';
    if (id.includes('stupa')) return '히말라야 알파인 사리탑';
    if (id.includes('treasury')) return '나바테아 암벽 보물창고';
  }

  // Generic translation replacement
  let res = label;
  const replacements = [
    [/Half-timbered/gi, '하프팀버식'],
    [/Thatched/gi, '초가지붕'],
    [/Cottage/gi, '오두막'],
    [/Tavern/gi, '선술집'],
    [/Inn/gi, '여관'],
    [/Forge/gi, '대장간'],
    [/Windmill/gi, '풍차'],
    [/Watermill/gi, '물레방아'],
    [/Bakery/gi, '빵집'],
    [/Apothecary/gi, '약방'],
    [/Watchtower/gi, '감시탑'],
    [/Tower/gi, '탑'],
    [/Chapel/gi, '예배당'],
    [/Sawmill/gi, '제재소'],
    [/Carpenter/gi, '목공소'],
    [/Store/gi, '상점'],
    [/Barn/gi, '헛간'],
    [/Silo/gi, '사일로'],
    [/Town Hall/gi, '시청'],
    [/Library/gi, '도서관'],
    [/Workshop/gi, '공방'],
    [/Gatehouse/gi, '관문'],
    [/Greenhouse/gi, '온실'],
    [/Orangery/gi, '온실 화원'],
    [/Lighthouse/gi, '등대'],
    [/Dock/gi, '선착장'],
    [/Manor/gi, '저택'],
    [/Palace/gi, '궁전'],
    [/Fortress/gi, '요새'],
    [/Castle/gi, '성채'],
    [/Bridge/gi, '교량'],
    [/Canal/gi, '수로'],
    [/Fountain/gi, '분수'],
    [/Well/gi, '우물'],
    [/Park/gi, '공원'],
    [/Garden/gi, '정원'],
    [/Grove/gi, '숲'],
    [/Orchard/gi, '과수원'],
    [/Meadow/gi, '초원'],
    [/Wildflowers/gi, '야생화'],
    [/Road/gi, '길'],
    [/Plaza/gi, '광장'],
    [/Statue/gi, '동상'],
    [/Beach/gi, '해변'],
    [/Pier/gi, '부두'],
    [/Island/gi, '섬'],
    [/Dunes/gi, '사구'],
    [/Oasis/gi, '오아시스'],
    [/Glacier/gi, '빙하'],
    [/Tent/gi, '텐트'],
    [/House/gi, '주택'],
    [/Studio/gi, '작업실'],
    [/Furnace/gi, '용광로'],
    [/Kasbah/gi, '카스바'],
    [/Treasury/gi, '보물창고'],
    [/Canyon/gi, '협곡'],
    [/Stupa/gi, '사리탑'],
    [/Cart/gi, '수레 마차'],
    [/Carts/gi, '수레 마차'],
    [/SW/g, '남서'],
    [/SE/g, '남동'],
    [/NE/g, '북동'],
    [/NW/g, '북서']
  ];
  for (const [pattern, koWord] of replacements) {
    res = res.replace(pattern, koWord);
  }
  return res;
}

function translateDoc(t) {
  const labelKo = translateLabel(t);
  const catKo = {
    building: '건물 및 시설 타일',
    road: '도로 및 수로 타일',
    decoration: '마을 장식 조경 타일',
    terrain: '지형 및 경사지 타일',
    biome: '생태계 및 해안 타일',
    landmark: '랜드마크 및 야생동물 타일'
  }[t.category] || '타일';

  return `${labelKo}. 2:1 디메트릭 등각 투영 픽셀 아트로 정교하게 제작된 ${catKo}입니다.`;
}

const KOREAN_TILES = {};
tiles.forEach(t => {
  KOREAN_TILES[t.id] = {
    label: translateLabel(t),
    doc: translateDoc(t)
  };
});

const KOREAN_CATEGORIES = {
  all: '전체 (256)',
  building: '건물 (56)',
  road: '도로 및 수로 (36)',
  decoration: '마을 장식 (12)',
  terrain: '지형 및 경사 (44)',
  biome: '생태계 및 해안 (58)',
  landmark: '랜드마크 및 야생동물 (50)'
};

const ENGLISH_CATEGORIES = {
  all: 'All (256)',
  building: 'Buildings (56)',
  road: 'Roads and waterways (36)',
  decoration: 'Village decor (12)',
  terrain: 'Terrain and slopes (44)',
  biome: 'Biomes and coasts (58)',
  landmark: 'Landmarks and wildlife (50)'
};

const KOREAN_PRESETS = {
  village: '활기찬 마을',
  riverside: '강변 계곡',
  market: '수도 시장',
  spacious: '다양한 생태계',
  meadow: '초원으로 비우기'
};

const ENGLISH_PRESETS = {
  village: 'Living village',
  riverside: 'Riverside valley',
  market: 'Market capital',
  spacious: 'Multi-biome world',
  meadow: 'Clear to meadow'
};

const UI_STRINGS = {
  ko: {
    appTitle: '아이소메트릭 마을 건설 스튜디오',
    appSubtitle: '16×16 스튜디오 • 256 타일',
    animate: '애니메이션',
    paused: '일시정지',
    undo: '실행 취소',
    centerView: '화면 중앙 정렬',
    snapshot: '스냅샷 저장 (PNG)',
    savedPng: '✓ PNG 저장 완료',
    rendering: '렌더링 중...',
    starterPresets: '추천 프리셋',
    paletteFilters: '팔레트 분류',
    sidebarFooter: '클릭: 타일 배치 • 스페이스/드래그: 화면 이동 • 휠: 확대/축소 • Alt+클릭: 스포이드',
    zoomInTitle: '확대',
    zoomOutTitle: '축소',
    zoomReadoutTitle: '100% 배율로 초기화',
    snapshotModalTitle: '스냅샷 내보내기 완료',
    snapshotModalSubtitle: '2,176 × 1,216 픽셀 • 16×16 전체 왕국 • 1:1 픽셀 해상도',
    downloadPng: 'PNG 다운로드',
    copyImage: '이미지 복사',
    copyImageSuccess: '✓ 클립보드 복사 완료',
    copyUnsupported: '현재 브라우저에서 이미지 클립보드 복사를 지원하지 않습니다. PNG 다운로드 버튼을 이용해 주세요.',
    openFullSize: '전체 크기로 열기 →',
    done: '닫기',
    activeBrushLabel: '선택된 브러시',
    outsideGrid: '그리드 바깥 영역',
    ready: '준비 완료'
  },
  en: {
    appTitle: 'Isometric town builder',
    appSubtitle: '16×16 studio • 256 tiles',
    animate: 'Animate',
    paused: 'Paused',
    undo: 'Undo',
    centerView: 'Center view',
    snapshot: 'Snapshot PNG',
    savedPng: '✓ Saved PNG',
    rendering: 'Rendering...',
    starterPresets: 'Starter Presets',
    paletteFilters: 'Palette Filters',
    sidebarFooter: 'Click: paint • Space: pan • Scroll: zoom • Alt+click: eyedropper',
    zoomInTitle: 'Zoom in',
    zoomOutTitle: 'Zoom out',
    zoomReadoutTitle: 'Reset zoom to 100%',
    snapshotModalTitle: 'Snapshot exported',
    snapshotModalSubtitle: '2,176 × 1,216 pixels • Full 16×16 kingdom • 1:1 pixel resolution',
    downloadPng: 'Download PNG',
    copyImage: 'Copy image',
    copyImageSuccess: '✓ Copied to clipboard!',
    copyUnsupported: 'Image clipboard copying is not supported in this browser. Please use the Download PNG button.',
    openFullSize: 'Open full size →',
    done: 'Done',
    activeBrushLabel: 'Active brush',
    outsideGrid: 'Outside grid diamonds',
    ready: 'Ready'
  }
};

const outputContent = `// Localization dictionary and helper functions for Isometric Town Builder
export const KOREAN_TILES = ${JSON.stringify(KOREAN_TILES, null, 2)};

export const KOREAN_CATEGORIES = ${JSON.stringify(KOREAN_CATEGORIES, null, 2)};
export const ENGLISH_CATEGORIES = ${JSON.stringify(ENGLISH_CATEGORIES, null, 2)};

export const KOREAN_PRESETS = ${JSON.stringify(KOREAN_PRESETS, null, 2)};
export const ENGLISH_PRESETS = ${JSON.stringify(ENGLISH_PRESETS, null, 2)};

export const UI_STRINGS = ${JSON.stringify(UI_STRINGS, null, 2)};

export function getTileLabel(tile, lang = 'ko') {
  if (!tile) return '';
  if (lang === 'ko' && KOREAN_TILES[tile.id] && KOREAN_TILES[tile.id].label) {
    return KOREAN_TILES[tile.id].label;
  }
  return tile.label || tile.id;
}

export function getTileDoc(tile, lang = 'ko') {
  if (!tile) return '';
  if (lang === 'ko' && KOREAN_TILES[tile.id] && KOREAN_TILES[tile.id].doc) {
    return KOREAN_TILES[tile.id].doc;
  }
  return tile.doc || '';
}

export function getCategoryLabel(catKey, lang = 'ko') {
  if (lang === 'ko') {
    return KOREAN_CATEGORIES[catKey] || catKey;
  }
  return ENGLISH_CATEGORIES[catKey] || catKey;
}

export function getPresetLabel(presetKey, lang = 'ko') {
  if (lang === 'ko') {
    return KOREAN_PRESETS[presetKey] || presetKey;
  }
  return ENGLISH_PRESETS[presetKey] || presetKey;
}
`;

fs.writeFileSync('src/i18n.js', outputContent, 'utf8');
console.log('Successfully generated src/i18n.js with 256 tiles localization!');
