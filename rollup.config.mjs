export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.esm.js", // Export ESM
      format: "esm", // Ensure ESM output
    },
  ],
};
