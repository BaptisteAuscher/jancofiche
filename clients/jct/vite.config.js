import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        icons: [
          {
            src : "logo-512.png",
            sizes : "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src : "logo-192.png",
            sizes : "192x192",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        runtimeCaching: [{
          urlPattern: "https://janco-fiche-server.onrender.com/fiche",
          handler: "NetworkFirst",
          options: {
            cacheName: "fiche",
            cacheableResponse: {
              statuses: [0,200]
            }
          }
        }]
      }
    })
  ],
})


