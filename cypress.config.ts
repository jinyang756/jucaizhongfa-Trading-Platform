import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'msff7p',
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
      // _on and _config are intentionally unused
      void _on;
      void _config;
    },
  },
});
