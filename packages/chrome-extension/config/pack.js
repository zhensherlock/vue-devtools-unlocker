import AdmZip from 'adm-zip';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const { version, name } = JSON.parse(readFileSync(resolve(__dirname, '../build', 'manifest.json'), 'utf8'));

  const outdir = 'release';
  const filename = `${name}-chrome-v${version}.zip`;
  const zip = new AdmZip();
  zip.addLocalFolder('build');
  if (!existsSync(outdir)) {
    mkdirSync(outdir);
  }
  zip.writeZip(`${outdir}/${filename}`);

  console.log(`Success! Created a ${filename} file under ${outdir} directory. You can upload this file to web store.`);
} catch (e) {
  console.error('Error! Failed to generate a zip file.', e);
}
