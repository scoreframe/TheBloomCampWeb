// node kinship.test.js — checks kinship.js against the shared fixtures.
const K = require('./kinship.js');
const fx = require('../The_Bloom_Camp/specs/kinship_fixtures.json');
const G = { f: 'female', m: 'male', x: null };
const g = K.build(fx.people.map(([id, gd, kind]) => ({ id, gender: G[gd], kind: kind || 'person' })),
  fx.parents, fx.spouses);
let fail = 0;
const check = (ok, msg) => { if (!ok) { fail++; console.log('FAIL', msg); } };
for (const [s, x, want] of fx.cases) {
  const r = K.relate(g, s, x);
  const got = r ? r.label : null;
  check(got === want, `${s}→${x}: want ${want}, got ${got}`);
}
for (const [s, x, want] of fx.dna) {
  const r = K.relate(g, s, x);
  check(r && Math.abs(r.sharedDna - want) < 1e-9, `dna ${s}→${x}: want ${want}, got ${r && r.sharedDna}`);
}
for (const [s, x, want] of fx.paths) {
  const r = K.relate(g, s, x);
  check(r && JSON.stringify(r.pathIds) === JSON.stringify(want), `path ${s}→${x}: got ${r && r.pathIds}`);
}
const total = fx.cases.length + fx.dna.length + fx.paths.length;
console.log(`${total - fail}/${total} passed`);
process.exit(fail ? 1 : 0);
