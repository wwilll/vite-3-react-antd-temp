import common from './common';

const allDatas = {
  ...common,
};

const zh_CN = {};
const en_US = {};

for (const [k, v] of Object.entries(allDatas)) {
  const newV = Array.isArray(v) ? v : [v];
  zh_CN[k] = newV[0];
  en_US[k] = newV[1] === undefined ? newV[0] : newV[1];
}

export { zh_CN, en_US };
