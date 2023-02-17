import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, 'src') },
			{
				find: '@images',
				replacement: path.resolve(__dirname, 'src/static/images'),
			},
			{
				find: '@icons',
				replacement: path.resolve(__dirname, 'src/static/icons'),
			},
			{
				find: 'crypto',
				replacement: path.resolve(__dirname, 'node_modules/crypto-js'),
			},
		],
	},
})
