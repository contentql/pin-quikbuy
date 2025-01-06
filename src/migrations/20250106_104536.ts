import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`products\` ADD \`snipcart_id\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_snipcart_id\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`products\` DROP COLUMN \`snipcart_id\`;`)
  await db.run(sql`ALTER TABLE \`_products_v\` DROP COLUMN \`version_snipcart_id\`;`)
}
