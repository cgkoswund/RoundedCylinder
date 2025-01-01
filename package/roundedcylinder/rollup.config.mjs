import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.jsx",
  output: [
    {
      file: "dist/index.esm.js", // Export ESM
      format: "esm", // Ensure ESM output
    },
  ],
  plugins: [
    nodeResolve(), // Resolve node_modules
    commonjs(), // Convert CommonJS to ES Modules
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx"], // Include JSX files
    }),
  ],
  external: ["react", "react-dom", "three"], // Peer dependencies
};
