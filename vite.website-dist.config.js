import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    root: './website',
    assetsInclude: ['**/html/*.html'],
    plugins: [react()],
})
