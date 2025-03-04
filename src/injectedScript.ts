import { getVueInstanceWithRetry, unlock } from '@/utils';

if (!window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
  console.log('未安装Vue DevTools');
}

const version = window.__VUE__ ? 3 : 2

getVueInstanceWithRetry(version).then(res => {
  console.log(res);
  unlock(version, res);
})
