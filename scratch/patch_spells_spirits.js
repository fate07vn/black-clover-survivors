const fs = require('fs');

function patchSpellsFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');

  // Check drawSpiritRing
  const ringStart = content.indexOf('drawSpiritRing(ctx, x, y, radius, innerRadius, style = \'base\', tick = 0, rotAngle = 0) {');
  if (ringStart === -1) {
    console.error('drawSpiritRing not found in', filepath);
    return;
  }

  // Look at auraGrad in drawSpiritRing:
  // We want:
  // isFamiliar -> Pink / Rose (#f43f5e)
  // isBlade -> Cyan / Teal (#22d3ee)
  // isMissile -> Pure chalk white (#ffffff)
  const oldAuraGrad = `    if (isFamiliar) {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      auraGrad.addColorStop(0.35, 'rgba(244, 114, 182, 0.45)');
      auraGrad.addColorStop(0.75, 'rgba(192, 132, 252, 0.25)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isBlade) {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      auraGrad.addColorStop(0.4, 'rgba(253, 224, 71, 0.45)');
      auraGrad.addColorStop(0.75, 'rgba(52, 211, 153, 0.25)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isMissile) {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      auraGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.55)');
      auraGrad.addColorStop(0.75, 'rgba(16, 185, 129, 0.2)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
      auraGrad.addColorStop(0.4, 'rgba(110, 231, 183, 0.45)');
      auraGrad.addColorStop(0.8, 'rgba(16, 185, 129, 0.15)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }`;

  const newAuraGrad = `    if (isFamiliar) {
      // HÌNH 3 (FAMILIAR - MAGIC SURVIVAL): Vòng Hồng Tím (Pink Ring)
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      auraGrad.addColorStop(0.35, 'rgba(244, 63, 94, 0.65)');
      auraGrad.addColorStop(0.75, 'rgba(236, 72, 153, 0.35)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isBlade) {
      // HÌNH 2 (MAGIC BLADE - MAGIC SURVIVAL): Vòng Lam Ngọc / Teal (Cyan Ring)
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      auraGrad.addColorStop(0.35, 'rgba(34, 211, 238, 0.7)');
      auraGrad.addColorStop(0.75, 'rgba(6, 182, 212, 0.35)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isMissile) {
      // HÌNH 1 (MAGIC MISSILE - MAGIC SURVIVAL): Vòng Trắng Tinh Khiết (White Ring)
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      auraGrad.addColorStop(0.4, 'rgba(240, 249, 255, 0.7)');
      auraGrad.addColorStop(0.8, 'rgba(186, 230, 253, 0.3)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      auraGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)');
      auraGrad.addColorStop(0.8, 'rgba(186, 230, 253, 0.25)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }`;

  if (content.includes(oldAuraGrad)) {
    content = content.replace(oldAuraGrad, newAuraGrad);
  }

  // Base glowing ring band strokeStyle
  const oldBandStroke = `ctx.strokeStyle = isFamiliar ? '#f472b6' : (isBlade ? '#fef08a' : (isMissile ? '#7dd3fc' : '#a7f3d0'));`;
  const newBandStroke = `ctx.strokeStyle = isFamiliar ? '#f43f5e' : (isBlade ? '#22d3ee' : '#ffffff');`;
  if (content.includes(oldBandStroke)) {
    content = content.replace(oldBandStroke, newBandStroke);
  }

  // In isBlade center sword:
  const oldBladeCenter = `ctx.strokeStyle = '#facc15';`;
  const newBladeCenter = `ctx.strokeStyle = '#22d3ee';`;
  if (content.includes(oldBladeCenter)) {
    content = content.replace(oldBladeCenter, newBladeCenter);
  }

  // In isFamiliar center vortex:
  const oldVortexCenter = `ctx.strokeStyle = '#f472b6';`;
  const newVortexCenter = `ctx.strokeStyle = '#fb7185';`;
  if (content.includes(oldVortexCenter)) {
    content = content.replace(oldVortexCenter, newVortexCenter);
  }

  // In spirit_magic_blade casting slash color:
  const oldSlashColor = `this.applyDamage(e, slashDmg, isCrit, '#fef08a');`;
  const newSlashColor = `this.applyDamage(e, slashDmg, isCrit, '#22d3ee');`;
  if (content.includes(oldSlashColor)) {
    content = content.replace(oldSlashColor, newSlashColor);
  }

  const oldImpactSpark = `this.spawnImpactParticles(tx, ty, '#facc15', 6);`;
  const newImpactSpark = `this.spawnImpactParticles(tx, ty, '#22d3ee', 6);`;
  if (content.includes(oldImpactSpark)) {
    content = content.replace(oldImpactSpark, newImpactSpark);
  }

  fs.writeFileSync(filepath, content, 'utf8');
  console.log('Successfully patched', filepath);
}

patchSpellsFile('src/spells.js');
patchSpellsFile('src/spells_2.js');
