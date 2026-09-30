import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 100,
  duration: '30s',
};

const BASE_URL = __ENV.TARGET_URL || 'https://app.vedantborse.dev';

export default function () {
  const url = `${BASE_URL}`;
  let resp = http.get(url);

  check(resp, {
    'endpoint returned 200': (r) => {
      if (r.status === 200) {
        return true;
      } else {
        console.error(`Status code: ${r.status}`);
        return false;
      }
    },
  });
}
