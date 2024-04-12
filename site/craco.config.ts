import path from "path";

const config = {
  webpack: {
    alias: {
      //名称:路径
      "@": path.resolve(__dirname, "src"),
    },
  },
};

export default config;
