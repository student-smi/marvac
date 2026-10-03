const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', '.data', 'db.json');
const dbData = fs.readFileSync(dbPath, 'utf8');

// Escape single quotes for SQL string literal
const escapedData = dbData.split("'").join("''");

const sql = `INSERT INTO store_kv (key, value) VALUES ('store_data', '${escapedData}') ON CONFLICT(key) DO UPDATE SET value = excluded.value;\n`;

const outPath = path.join(__dirname, '..', 'src', 'db', 'seed.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log('Successfully generated seed.sql with bytes:', sql.length);
