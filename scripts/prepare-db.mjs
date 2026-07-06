// Rewrites the Prisma datasource `provider` to match DATABASE_URL.
//
// Prisma does not allow the provider to be set via an env var, so we detect
// it here and patch prisma/schema.prisma in place (idempotently) before
// `prisma generate` / `prisma db push` run. This lets the same codebase use
// SQLite locally and PostgreSQL on Render with zero manual edits.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'prisma', 'schema.prisma');

const url = process.env.DATABASE_URL || 'file:./dev.db';

let provider = 'sqlite';
if (/^postgres(ql)?:\/\//i.test(url)) provider = 'postgresql';
else if (/^mysql:\/\//i.test(url)) provider = 'mysql';
else if (/^file:/i.test(url)) provider = 'sqlite';

const schema = readFileSync(schemaPath, 'utf8');
const patched = schema.replace(
  /(datasource\s+db\s*\{[^}]*?provider\s*=\s*)"[^"]+"/s,
  `$1"${provider}"`,
);

if (patched !== schema) {
  writeFileSync(schemaPath, patched);
  console.log(`[prepare-db] set Prisma provider -> ${provider} (DATABASE_URL detected)`);
} else {
  console.log(`[prepare-db] Prisma provider already ${provider}`);
}
