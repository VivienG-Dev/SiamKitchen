import fs from 'fs/promises';
import path from 'path';

const PROJECT_ROOT = path.join(process.cwd(), '..');
const PROD_FOLDER = path.join(PROJECT_ROOT, 'nuxt-production');

async function prepareProd() {
    try {
        // Create production folder if it doesn't exist
        await fs.mkdir(PROD_FOLDER, { recursive: true });
        console.log('Created nuxt-production directory');

        // Define source and destination paths
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

        // Copy individual files
        for (const file of prodFiles) {
            await fs.copyFile(file.from, file.to);
            console.log(`Copied ${file.from} to ${file.to}`);
        }

        // Copy .output directory
        const outputSource = path.join(process.cwd(), '.output');
        const outputDest = path.join(PROD_FOLDER, '.output');
        await fs.cp(outputSource, outputDest, { recursive: true });
        console.log('Copied .output directory');

        console.log('Production files prepared successfully!');
    } catch (error) {
        console.error('Error preparing production files:', error);
        process.exit(1);
    }
}

prepareProd();