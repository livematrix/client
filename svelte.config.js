import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import sveltePreprocess from 'svelte-preprocess'
import preprocess from 'svelte-preprocess'

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  // preprocess: sveltePreprocess()
  preprocess: [
    sveltePreprocess(),
    preprocess({
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    }),
  ],
}
