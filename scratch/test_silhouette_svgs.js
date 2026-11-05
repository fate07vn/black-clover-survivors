const fs = require('fs');

function getSkillSilhouetteSvg(choice) {
  const id = (choice.id || '').toLowerCase();
  const name = (choice.name || '').toLowerCase();
  const desc = (choice.description || '').toLowerCase();

  if (id.includes('thunder') || id.includes('electric') || id.includes('lightning') || id.includes('luck') || name.includes('sấm') || name.includes('sét')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <path d="M 38 4 L 20 28 L 32 30 L 14 58 L 44 26 L 30 24 Z" fill="#ffffff" filter="drop-shadow(0 0 2px #ffffff)"/>
      <path d="M 24 20 L 12 28 L 20 32 L 8 44" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 34 32 L 48 38 L 42 44 L 56 50" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }

  if (id.includes('sea') || id.includes('water') || id.includes('tsunami') || id.includes('noelle') || name.includes('sóng') || name.includes('thủy')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <path d="M 6 56 C 14 56 18 50 22 42 C 28 30 38 12 52 14 C 58 15 58 24 50 26 C 42 28 36 34 34 42 C 32 50 26 56 6 56 Z" fill="#ffffff"/>
      <path d="M 24 56 C 28 50 34 40 44 32 C 48 29 48 25 44 25 C 38 25 32 32 30 40 C 28 48 24 54 18 56 Z" fill="#ffffff"/>
      <circle cx="56" cy="18" r="2" fill="#ffffff"/>
      <circle cx="58" cy="24" r="1.5" fill="#ffffff"/>
    </svg>`;
  }

  if (id.includes('fire') || id.includes('flame') || id.includes('meteor') || id.includes('fuegoleon') || id.includes('calidus') || name.includes('hỏa') || name.includes('lửa')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <path d="M 12 48 C 8 42 12 34 20 28 L 52 6 C 54 8 50 16 44 22 L 32 38 C 26 46 18 52 12 48 Z" fill="#ffffff"/>
      <ellipse cx="20" cy="42" rx="7" ry="5" transform="rotate(-35 20 42)" fill="#ffffff"/>
      <path d="M 46 8 L 36 24 M 52 16 L 42 30 M 56 22 L 48 34" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <circle cx="14" cy="50" r="2" fill="#ffffff"/>
      <circle cx="24" cy="48" r="2.5" fill="#ffffff"/>
    </svg>`;
  }

  if (id.includes('spirit') || id.includes('sylph') || name.includes('tinh linh')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <circle cx="32" cy="32" r="18" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-dasharray="14 3 8 4"/>
      <circle cx="32" cy="32" r="11" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="6 4"/>
      <circle cx="32" cy="14" r="2.5" fill="#ffffff"/>
      <circle cx="48" cy="36" r="2" fill="#ffffff"/>
    </svg>`;
  }

  if (id.includes('slash') || id.includes('sword') || id.includes('blade') || id.includes('anti_magic') || id.includes('asta') || id.includes('licht') || name.includes('kiếm')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <path d="M 10 54 L 50 14 L 54 18 L 14 58 Z" fill="#ffffff"/>
      <path d="M 8 18 C 24 10 46 16 56 36 C 42 26 24 26 8 18 Z" fill="#ffffff"/>
      <rect x="14" y="46" width="6" height="6" transform="rotate(45 17 49)" fill="#ffffff"/>
    </svg>`;
  }

  if (id.includes('dark') || id.includes('black') || id.includes('yami') || id.includes('nacht') || name.includes('hắc') || name.includes('bóng')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <path d="M 16 12 C 34 8 52 24 50 48 C 40 28 26 22 16 12 Z" fill="#ffffff"/>
      <circle cx="34" cy="34" r="6" fill="#ffffff"/>
      <circle cx="34" cy="34" r="2.5" fill="#000000"/>
      <path d="M 28 48 C 36 46 44 40 48 32" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  }

  if (id.includes('armor') || id.includes('mana_skin') || id.includes('vitality') || name.includes('giáp') || name.includes('máu')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <path d="M 32 8 L 52 16 L 46 44 C 42 52 32 58 32 58 C 32 58 22 52 18 44 L 12 16 Z" fill="#ffffff"/>
      <path d="M 32 14 L 46 20 L 41 42 C 38 48 32 52 32 52 C 32 52 26 48 23 42 L 18 20 Z" fill="#000000"/>
      <polygon points="32,22 38,34 32,44 26,34" fill="#ffffff"/>
    </svg>`;
  }

  if (id.includes('wind') || id.includes('tornado') || id.includes('storm') || id.includes('yuno') || name.includes('gió') || name.includes('bão')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <path d="M 12 18 C 24 14 44 14 52 20 C 44 24 28 22 16 26 Z" fill="#ffffff"/>
      <path d="M 18 30 C 28 26 44 26 50 32 C 40 36 28 34 22 38 Z" fill="#ffffff"/>
      <path d="M 24 42 C 30 38 42 38 46 44 C 38 46 28 46 26 50 Z" fill="#ffffff"/>
    </svg>`;
  }

  if (id.includes('stride') || id.includes('speed') || id.includes('glide') || name.includes('tốc')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <path d="M 24 14 L 34 14 L 38 34 L 52 38 L 54 48 L 22 48 L 20 28 Z" fill="#ffffff"/>
      <path d="M 12 18 C 18 20 20 28 14 36 C 22 34 26 26 24 18 Z" fill="#ffffff"/>
    </svg>`;
  }

  if (id.includes('ki') || id.includes('crit') || id.includes('target') || name.includes('chí mạng')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <circle cx="32" cy="32" r="20" fill="none" stroke="#ffffff" stroke-width="3"/>
      <circle cx="32" cy="32" r="8" fill="none" stroke="#ffffff" stroke-width="2"/>
      <line x1="32" y1="6" x2="32" y2="18" stroke="#ffffff" stroke-width="3"/>
      <line x1="32" y1="46" x2="32" y2="58" stroke="#ffffff" stroke-width="3"/>
      <line x1="6" y1="32" x2="18" y2="32" stroke="#ffffff" stroke-width="3"/>
      <line x1="46" y1="32" x2="58" y2="32" stroke="#ffffff" stroke-width="3"/>
    </svg>`;
  }

  if (id.includes('magnet') || name.includes('hút')) {
    return `<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
      <path d="M 16 12 L 26 12 L 26 34 C 26 38 38 38 38 34 L 38 12 L 48 12 L 48 34 C 48 48 16 48 16 34 Z" fill="#ffffff"/>
      <rect x="16" y="12" width="10" height="6" fill="#38bdf8"/>
      <rect x="38" y="12" width="10" height="6" fill="#ef4444"/>
    </svg>`;
  }

  return null;
}

console.log('Testing SVG generation:');
console.log('electric:', !!getSkillSilhouetteSvg({ id: 'thunder_orb', name: 'Sấm Sét' }));
console.log('tsunami:', !!getSkillSilhouetteSvg({ id: 'sea_dragon_roar', name: 'Thủy Long Hống' }));
console.log('meteor:', !!getSkillSilhouetteSvg({ id: 'fireball', name: 'Hỏa Cầu' }));
console.log('spirit:', !!getSkillSilhouetteSvg({ id: 'sylph_spirits', name: 'Sylph Tinh Linh' }));
console.log('sword:', !!getSkillSilhouetteSvg({ id: 'anti_magic_slash', name: 'Trảm Kích' }));
console.log('All SVGs generated successfully!');
