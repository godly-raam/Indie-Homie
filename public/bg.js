const SCENES = [
  'alpine-dawn','amer-fort','aurora-fjord','black-prism','cloud-sea','command-city',
  'deep-reef','desert-night','earthrise','edge-orbit','gangaur-ghat','green-storm',
  'jal-mahal','jungle-falls','kite-festival','kyoto-dusk','lake-pichola','lantern-lake',
  'lava-wall','marine-drive','misty-forest','night-coast','night-highway','ocean-sunset',
  'planet-scale','prism-city','salt-flat','saturn-rise','snow-train','storm-plains',
  'taj-dawn','tokyo-rain','varanasi-ghats','volcano-night'
];

let last = null;
try { last = localStorage.getItem('bg-last'); } catch (e) {}

let pick;
do { pick = SCENES[Math.floor(Math.random() * SCENES.length)]; }
while (pick === last && SCENES.length > 1);

try { localStorage.setItem('bg-last', pick); } catch (e) {}

const el = document.createElement('ascii-art');
el.setAttribute('piece', pick);
document.getElementById('bg').appendChild(el);
