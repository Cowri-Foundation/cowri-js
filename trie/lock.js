export default function createLock() {
    const lock = { isFree: true, queue: [] }
    const close = () => closeLock(lock);
    const open = () => openLock(lock);
    return { close, open }
  }
  
  
  function closeLock(lock) {
    if (lock.isFree) {
      lock.isFree = false;
      return Promise.resolve(true);
    }
    return new Promise(resolve => lock.queue.push(resolve));
  }
  
  
  function openLock(lock) {
    lock.isFree = true;
    if (lock.queue.length) {
      const resolve = lock.queue.shift();
      resolve(true);
    }
  }