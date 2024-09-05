
export function addReport(store, report) {
  store.status = 'valid';
  store.reports.set(report.hash, report);
}
export function hasReport(store, hash) {
  return store.reports.has(hash) || store.temp.has(hash);
}
export function getReport(store, hash) {
  return store.reports.get(hash);
}
export function forEachReport(store, cb) {
  return store.reports.forEach(cb);
}
