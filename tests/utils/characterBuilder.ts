import * as fs from 'fs';
import * as path from 'path';

const fixturePath = path.join(__dirname, '../fixtures/character.gcs');
const fixtureContent = fs.readFileSync(fixturePath, 'utf-8');
const characterData = JSON.parse(fixtureContent);

export default characterData;