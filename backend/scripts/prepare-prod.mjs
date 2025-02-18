import fs from 'fs/promises';
import path from 'path';

const PROJECT_ROOT = path.join(process.cwd(), '..');
const PROD_FOLDER = path.join(PROJECT_ROOT, 'strapi-production');

const serverJsContent = `const strapi = require("@strapi/strapi");
const app = strapi.createStrapi({ distDir: "./dist" });
app.start();
`;

async function prepareProd() {
    try {
        await fs.mkdir(PROD_FOLDER, { recursive: true });
        console.log('Created strapi-production directory');

        const prodFiles = [
            {
                from: 'package.prod.json',
                to: path.join(PROD_FOLDER, 'package.json')
            },
            {
                from: '.env.production',
                to: path.join(PROD_FOLDER, '.env')
            }
        ];

        for (const file of prodFiles) {
            await fs.copyFile(file.from, file.to);
            console.log(`Copied ${file.from} to ${file.to}`);
        }

        await fs.writeFile(path.join(PROD_FOLDER, 'server.js'), serverJsContent);
        console.log('Created server.js');

        const strapiDirs = ['config', 'src', 'public', 'database', 'dist'];

        for (const dir of strapiDirs) {
            const source = path.join(process.cwd(), dir);
            const dest = path.join(PROD_FOLDER, dir);
            await fs.cp(source, dest, { recursive: true });
            console.log(`Copied ${dir} directory`);
        }

        console.log('Production files prepared successfully!');
    } catch (error) {
        console.error('Error preparing production files:', error);
        process.exit(1);
    }
}

prepareProd();