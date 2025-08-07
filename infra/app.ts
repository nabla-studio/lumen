
export const webapp = new sst.aws.StaticSite("WebApp", {
    path: "packages/www",
    build: {
        command: "bun run build",
        output: "dist",
    },
});