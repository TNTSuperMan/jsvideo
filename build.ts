import { build } from "bun";

build({
    entrypoints: ["./src/index.ts"],
    outdir: "dist",
    minify: true
})
build({
    entrypoints: ["./src/index.ts"],
    outdir: "dist",
    minify: true,
    format: "cjs",
    naming: "index.cjs"
})