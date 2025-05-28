import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
      babel: {
        plugins: [
          [
            'prismjs',
            {
              languages: [
                'javascript',
                 'css',
                 'html',
                 'python',
                 'bash',
                 'csharp',    // C# language support
                 'aspnet',    // ASP.NET specific syntax
                 'markup',    // HTML/XML (dependency for aspnet)
                 'json'     ],
              plugins: [],
              theme: 'twilight',
              css: true,
            },
          ],
        ],
      },
    })
  ],
})
