import { getVueInstanceWithRetry } from '@/utils';

// if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
//
// }

getVueInstanceWithRetry(2).then(res => {
  console.log(res);
})
