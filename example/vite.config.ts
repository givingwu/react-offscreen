import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 判断是否在 GitHub Pages 环境
const isGitHubPages = process.env.DEPLOY_ENV === "gh-pages";

console.log("isGitHubPages: ", isGitHubPages);

export default defineConfig({
	plugins: [react()],
	base: isGitHubPages ? "/react-offscreen/" : "/",
	build: {
		outDir: "dist",
		assetsDir: "assets",
	},
});