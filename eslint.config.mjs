import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const finalConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**", "coverage/**"] },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default finalConfig;
