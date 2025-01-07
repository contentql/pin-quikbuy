import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_home\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_image_idx\` ON \`pages_blocks_home\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_image_idx\` ON \`_pages_v_blocks_home\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`snipcart_id\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_snipcart_id\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_home\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_home\`("_order", "_parent_id", "_path", "id", "title", "description", "block_name") SELECT "_order", "_parent_id", "_path", "id", "title", "description", "block_name" FROM \`pages_blocks_home\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_home\` RENAME TO \`pages_blocks_home\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_order_idx\` ON \`pages_blocks_home\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_parent_id_idx\` ON \`pages_blocks_home\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_path_idx\` ON \`pages_blocks_home\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_home\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_home\`("_order", "_parent_id", "_path", "id", "title", "description", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "title", "description", "_uuid", "block_name" FROM \`_pages_v_blocks_home\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_home\` RENAME TO \`_pages_v_blocks_home\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_order_idx\` ON \`_pages_v_blocks_home\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_parent_id_idx\` ON \`_pages_v_blocks_home\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_path_idx\` ON \`_pages_v_blocks_home\` (\`_path\`);`)
  await db.run(sql`ALTER TABLE \`products\` DROP COLUMN \`snipcart_id\`;`)
  await db.run(sql`ALTER TABLE \`_products_v\` DROP COLUMN \`version_snipcart_id\`;`)
}
