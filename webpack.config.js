import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [],
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.mjs'],
      },
    mode: isProduction ? 'production' : 'development',
};

export default config;
