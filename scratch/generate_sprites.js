const fs = require('fs');

const spritesPath = 'C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js';
let code = fs.readFileSync(spritesPath, 'utf8');

// 1. Router replacement
const oldRouter = `    switch (cid) {
      case 'asta':
      case 'black_asta':
        this.drawAsta(ctx, p, tick);
        break;
      case 'zenon':
        this.drawZenon(ctx, p, tick);
        break;
      case 'vanica':
        this.drawVanica(ctx, p, tick);
        break;
      case 'dante':
        this.drawDante(ctx, p, tick);
        break;
      case 'fana':
        this.drawFana(ctx, p, tick);
        break;
      case 'rhya':
        this.drawRhya(ctx, p, tick);
        break;
      case 'vetto':
        this.drawVetto(ctx, p, tick);
        break;
      case 'yuno':
      case 'finral':
      case 'langris':
      case 'klaus':
        this.drawYuno(ctx, p, tick);
        break;
      case 'noelle':
      case 'charlotte':
      case 'secre':
      case 'dorothy':
      case 'grey':
      case 'mimosa':
        this.drawNoelle(ctx, p, tick);
        break;
      case 'yami':
      case 'nacht':
      case 'zora':
      case 'jack':
      case 'gordon':
      case 'henry':
        this.drawYami(ctx, p, tick);
        break;
      case 'luck':
      case 'magna':
      case 'rill':
      case 'sol':
        this.drawLuck(ctx, p, tick);
        break;
      case 'sylph':
        this.drawSylph(ctx, p, tick);
        break;
      case 'julius':
      case 'lumiere':
      case 'licht':
      case 'patry':
      case 'william':
      case 'fuegoleon':
      case 'mereoleona':
      case 'leopold':
      case 'mars':
      case 'charmy':
      case 'nozel':
      default:
        this.drawJulius ? this.drawJulius(ctx, p, tick) : this.drawAsta(ctx, p, tick);
        break;
    }`;

const newRouter = `    switch (cid) {
      case 'asta':
      case 'black_asta':
        this.drawAsta(ctx, p, tick);
        break;
      case 'mereoleona':
        this.drawMereoleona ? this.drawMereoleona(ctx, p, tick) : this.drawAsta(ctx, p, tick);
        break;
      case 'fuegoleon':
      case 'leopold':
        this.drawFuegoleon ? this.drawFuegoleon(ctx, p, tick) : this.drawAsta(ctx, p, tick);
        break;
      case 'lumiere':
        this.drawLumiere ? this.drawLumiere(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'licht':
        this.drawLicht ? this.drawLicht(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'nacht':
        this.drawNacht ? this.drawNacht(ctx, p, tick) : this.drawYami(ctx, p, tick);
        break;
      case 'secre':
        this.drawSecre ? this.drawSecre(ctx, p, tick) : this.drawNoelle(ctx, p, tick);
        break;
      case 'charlotte':
        this.drawCharlotte ? this.drawCharlotte(ctx, p, tick) : this.drawNoelle(ctx, p, tick);
        break;
      case 'william':
        this.drawWilliam ? this.drawWilliam(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'nozel':
        this.drawNozel ? this.drawNozel(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'jack':
        this.drawJack ? this.drawJack(ctx, p, tick) : this.drawYami(ctx, p, tick);
        break;
      case 'magna':
        this.drawMagna ? this.drawMagna(ctx, p, tick) : this.drawLuck(ctx, p, tick);
        break;
      case 'charmy':
        this.drawCharmy ? this.drawCharmy(ctx, p, tick) : this.drawAsta(ctx, p, tick);
        break;
      case 'zora':
        this.drawZora ? this.drawZora(ctx, p, tick) : this.drawYami(ctx, p, tick);
        break;
      case 'finral':
      case 'langris':
        this.drawFinral ? this.drawFinral(ctx, p, tick) : this.drawYuno(ctx, p, tick);
        break;
      case 'dorothy':
        this.drawDorothy ? this.drawDorothy(ctx, p, tick) : this.drawNoelle(ctx, p, tick);
        break;
      case 'rill':
        this.drawRill ? this.drawRill(ctx, p, tick) : this.drawLuck(ctx, p, tick);
        break;
      case 'patry':
        this.drawPatry ? this.drawPatry(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'zenon':
        this.drawZenon(ctx, p, tick);
        break;
      case 'vanica':
        this.drawVanica(ctx, p, tick);
        break;
      case 'dante':
        this.drawDante(ctx, p, tick);
        break;
      case 'fana':
        this.drawFana(ctx, p, tick);
        break;
      case 'rhya':
        this.drawRhya(ctx, p, tick);
        break;
      case 'vetto':
        this.drawVetto(ctx, p, tick);
        break;
      case 'yuno':
      case 'klaus':
        this.drawYuno(ctx, p, tick);
        break;
      case 'noelle':
      case 'grey':
      case 'mimosa':
        this.drawNoelle(ctx, p, tick);
        break;
      case 'yami':
      case 'gordon':
      case 'henry':
        this.drawYami(ctx, p, tick);
        break;
      case 'luck':
      case 'sol':
        this.drawLuck(ctx, p, tick);
        break;
      case 'sylph':
        this.drawSylph(ctx, p, tick);
        break;
      case 'julius':
      case 'mars':
      default:
        this.drawJulius ? this.drawJulius(ctx, p, tick) : this.drawAsta(ctx, p, tick);
        break;
    }`;

code = code.replace(oldRouter, newRouter);

console.log('Router replaced successfully. Now preparing new hero drawing methods...');
fs.writeFileSync(spritesPath, code, 'utf8');
