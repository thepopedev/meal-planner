import fs from 'fs';

const urls = [
  '1490645935967-10de6ba17061',
  '1512621776951-a57141f2eefd',
  '1467003909585-2f8a72700288',
  '1540420773420-3366772f4999',
  '1504674900247-0877df9cc836',
  '1473093295043-cdd812d0e601',
  '1482049016688-2d3e1b311543',
  '1504754524776-8f4f37790ca0',
  '1493770348161-369560ae357d',
  '1476224203421-9ac39bcb3327',
  '1414235077428-338988692309',
  '1525351484163-7529414344d8',
  '1511690656952-34342bb7c2f2',
  '1547592166-23ac45744acd',
  '1555939594-58d7cb561ad1',
  '1551183053-bf91a1d81141'
];

let content = fs.readFileSync('src/data/recipes.ts', 'utf8');
let idx = 0;
content = content.replace(/img: "https:\/\/images\.unsplash\.com[^"]+"/g, () => {
  const replacement = `img: "https://images.unsplash.com/photo-${urls[idx % urls.length]}?q=80&w=800&auto=format&fit=crop"`;
  idx++;
  return replacement;
});

fs.writeFileSync('src/data/recipes.ts', content);
console.log("Images replaced in recipes.ts");
