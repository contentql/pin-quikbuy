import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`orders_items\` ADD \`item_id\` text;`)
  await db.run(sql`ALTER TABLE \`_orders_v_version_items\` ADD \`item_id\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`orders_items\` DROP COLUMN \`item_id\`;`)
  await db.run(sql`ALTER TABLE \`_orders_v_version_items\` DROP COLUMN \`item_id\`;`)
}
