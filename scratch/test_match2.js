const fs = require('fs');
let html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const targetCharModalEnd = `        <button class="btn-start" style="padding: 10px 32px; font-size: 15px;" onclick="closeCharSelectModal()">XÁC NHẬN CHỌN</button>
      </div>
    </div>
  </div>`;

console.log('charModalEnd match:', html.includes(targetCharModalEnd));
