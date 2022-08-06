/** @type {import('vite').UserConfig} */
export default {
  build: {
    emptyOutDir: false,
    rollupOptions:{
      output: {
        assetFileNames:"assets/translations/[name].[ext]",
        chunkFileNames:"assets/translations/[name].[ext]",
        entryFileNames:"assets/translations/[name].js",
      },
    },
    write:true
  }
}