'use strict';
// Transparent heuristic intervals, not a claim of a universal optimal schedule.
(() => {
  const DAY = 86400000;
  const INTERVALS = [1,3,7,14,30,60];
  function grade(old = {}, rating, now = Date.now()) {
    const r = {...old, introduced:true, reviews:(old.reviews||0)+1,lastAt:now,lastRating:rating};
    if(rating === 'again') return {...r,level:0,due:now+10*60000,lapses:(old.lapses||0)+1};
    if(rating === 'hint') return {...r,level:Math.max(0,(old.level||0)-1),due:now+DAY};
    // Extra same-day practice does not falsely advance a long-term interval.
    const sameDay = old.lastGood && new Date(old.lastGood).toDateString() === new Date(now).toDateString();
    if(old.lastGood && (sameDay || now-old.lastGood<20*3600000) && old.lastRating!=='again') return {...r,due:Math.max(now+60000,old.due||now+DAY)};
    const level=Math.min(5,old.level||0);
    return {...r,level:Math.min(6,level+1),due:now+INTERVALS[level]*DAY,lastGood:now};
  }
  function plan(cards, records, limit=8, now=Date.now(), newLimit=3) {
    const due=cards.filter(c=>records[c.id]?.introduced && records[c.id].due<=now).sort((a,b)=>records[a.id].due-records[b.id].due).slice(0,limit);
    const news=cards.filter(c=>!records[c.id]?.introduced).slice(0,Math.min(newLimit,Math.max(0,limit-due.length)));
    // Introduce new material first; return after intervening cards where possible.
    return [...news.map(c=>({id:c.id,phase:'learn'})),...due.map(c=>({id:c.id,phase:'recall'})),...news.map(c=>({id:c.id,phase:'recall'}))];
  }
  globalThis.PhrasalEngine={grade,plan,INTERVALS,DAY};
})();
