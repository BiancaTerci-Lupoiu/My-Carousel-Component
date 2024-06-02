import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-carousel.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: [/^lit/],
    },
  },
});
