import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_home\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_home_order_idx\` ON \`pages_blocks_home\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_parent_id_idx\` ON \`pages_blocks_home\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_path_idx\` ON \`pages_blocks_home\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`collection_slug\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_details_order_idx\` ON \`pages_blocks_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_details_parent_id_idx\` ON \`pages_blocks_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_details_path_idx\` ON \`pages_blocks_details\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`collection_slug\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_order_idx\` ON \`pages_blocks_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_parent_id_idx\` ON \`pages_blocks_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_path_idx\` ON \`pages_blocks_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_newsletter\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	\`form_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_order_idx\` ON \`pages_blocks_newsletter\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_parent_id_idx\` ON \`pages_blocks_newsletter\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_path_idx\` ON \`pages_blocks_newsletter\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_form_idx\` ON \`pages_blocks_newsletter\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_featured_products_featured_products\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_featured_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_products_featured_products_order_idx\` ON \`pages_blocks_featured_products_featured_products\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_products_featured_products_parent_id_idx\` ON \`pages_blocks_featured_products_featured_products\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_featured_products\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_products_order_idx\` ON \`pages_blocks_featured_products\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_products_parent_id_idx\` ON \`pages_blocks_featured_products\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_products_path_idx\` ON \`pages_blocks_featured_products\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_categories_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category_id\` integer,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_categories_categories_order_idx\` ON \`pages_blocks_categories_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_categories_categories_parent_id_idx\` ON \`pages_blocks_categories_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_categories_categories_category_idx\` ON \`pages_blocks_categories_categories\` (\`category_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_categories_order_idx\` ON \`pages_blocks_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_categories_parent_id_idx\` ON \`pages_blocks_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_categories_path_idx\` ON \`pages_blocks_categories\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_disqus_comments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`short_name\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_disqus_comments_order_idx\` ON \`pages_blocks_disqus_comments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_disqus_comments_parent_id_idx\` ON \`pages_blocks_disqus_comments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_disqus_comments_path_idx\` ON \`pages_blocks_disqus_comments\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_order_idx\` ON \`pages_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_parent_id_idx\` ON \`pages_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_doc_idx\` ON \`pages_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`is_home\` integer DEFAULT false,
  	\`is_dynamic\` integer DEFAULT false,
  	\`slug_mode\` text DEFAULT 'generate',
  	\`slug\` text,
  	\`path_mode\` text DEFAULT 'generate',
  	\`path\` text,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_title_idx\` ON \`pages\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_path_idx\` ON \`pages\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`forms_id\` integer,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_forms_id_idx\` ON \`pages_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_products_id_idx\` ON \`pages_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_order_idx\` ON \`_pages_v_blocks_home\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_parent_id_idx\` ON \`_pages_v_blocks_home\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_path_idx\` ON \`_pages_v_blocks_home\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`collection_slug\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_details_order_idx\` ON \`_pages_v_blocks_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_details_parent_id_idx\` ON \`_pages_v_blocks_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_details_path_idx\` ON \`_pages_v_blocks_details\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`collection_slug\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_order_idx\` ON \`_pages_v_blocks_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_parent_id_idx\` ON \`_pages_v_blocks_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_path_idx\` ON \`_pages_v_blocks_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_newsletter\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	\`form_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_newsletter_order_idx\` ON \`_pages_v_blocks_newsletter\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_newsletter_parent_id_idx\` ON \`_pages_v_blocks_newsletter\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_newsletter_path_idx\` ON \`_pages_v_blocks_newsletter\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_newsletter_form_idx\` ON \`_pages_v_blocks_newsletter\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_featured_products_featured_products\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_featured_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_products_featured_products_order_idx\` ON \`_pages_v_blocks_featured_products_featured_products\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_products_featured_products_parent_id_idx\` ON \`_pages_v_blocks_featured_products_featured_products\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_featured_products\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_products_order_idx\` ON \`_pages_v_blocks_featured_products\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_products_parent_id_idx\` ON \`_pages_v_blocks_featured_products\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_products_path_idx\` ON \`_pages_v_blocks_featured_products\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_categories_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_categories_categories_order_idx\` ON \`_pages_v_blocks_categories_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_categories_categories_parent_id_idx\` ON \`_pages_v_blocks_categories_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_categories_categories_category_idx\` ON \`_pages_v_blocks_categories_categories\` (\`category_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_categories_order_idx\` ON \`_pages_v_blocks_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_categories_parent_id_idx\` ON \`_pages_v_blocks_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_categories_path_idx\` ON \`_pages_v_blocks_categories\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_disqus_comments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`short_name\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_disqus_comments_order_idx\` ON \`_pages_v_blocks_disqus_comments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_disqus_comments_parent_id_idx\` ON \`_pages_v_blocks_disqus_comments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_disqus_comments_path_idx\` ON \`_pages_v_blocks_disqus_comments\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_order_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_parent_id_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_doc_idx\` ON \`_pages_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_is_home\` integer DEFAULT false,
  	\`version_is_dynamic\` integer DEFAULT false,
  	\`version_slug_mode\` text DEFAULT 'generate',
  	\`version_slug\` text,
  	\`version_path_mode\` text DEFAULT 'generate',
  	\`version_path\` text,
  	\`version_parent_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_title_idx\` ON \`_pages_v\` (\`version_title\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_path_idx\` ON \`_pages_v\` (\`version_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`forms_id\` integer,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_forms_id_idx\` ON \`_pages_v_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_products_id_idx\` ON \`_pages_v_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_blog_image_size2_url\` text,
  	\`sizes_blog_image_size2_width\` numeric,
  	\`sizes_blog_image_size2_height\` numeric,
  	\`sizes_blog_image_size2_mime_type\` text,
  	\`sizes_blog_image_size2_filesize\` numeric,
  	\`sizes_blog_image_size2_filename\` text,
  	\`sizes_blog_image_size3_url\` text,
  	\`sizes_blog_image_size3_width\` numeric,
  	\`sizes_blog_image_size3_height\` numeric,
  	\`sizes_blog_image_size3_mime_type\` text,
  	\`sizes_blog_image_size3_filesize\` numeric,
  	\`sizes_blog_image_size3_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_blog_image_size2_sizes_blog_image_size2_filename_idx\` ON \`media\` (\`sizes_blog_image_size2_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_blog_image_size3_sizes_blog_image_size3_filename_idx\` ON \`media\` (\`sizes_blog_image_size3_filename\`);`)
  await db.run(sql`CREATE TABLE \`users_role\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_role_order_idx\` ON \`users_role\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_role_parent_idx\` ON \`users_role\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_social_links_order_idx\` ON \`users_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_social_links_parent_id_idx\` ON \`users_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_name\` text,
  	\`username\` text NOT NULL,
  	\`image_url_id\` integer,
  	\`email_verified\` text,
  	\`bio\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`_verified\` integer,
  	\`_verificationtoken\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text,
  	FOREIGN KEY (\`image_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`users_username_idx\` ON \`users\` (\`username\`);`)
  await db.run(sql`CREATE INDEX \`users_image_url_idx\` ON \`users\` (\`image_url_id\`);`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`products_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_tags_order_idx\` ON \`products_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_tags_parent_id_idx\` ON \`products_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_attributes_value_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`option\` text,
  	\`extra_price\` numeric,
  	\`stock\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_attributes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_attributes_value_select_options_order_idx\` ON \`products_attributes_value_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_attributes_value_select_options_parent_id_idx\` ON \`products_attributes_value_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_attributes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value_type\` text,
  	\`value_text_value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_attributes_order_idx\` ON \`products_attributes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_attributes_parent_id_idx\` ON \`products_attributes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`additionalInfo_section_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`attribute_name\` text,
  	\`attribute_value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`additionalInfo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`additionalInfo_section_content_order_idx\` ON \`additionalInfo_section_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`additionalInfo_section_content_parent_id_idx\` ON \`additionalInfo_section_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`additionalInfo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`additionalInfo_order_idx\` ON \`additionalInfo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`additionalInfo_parent_id_idx\` ON \`additionalInfo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`slug\` text,
  	\`description\` text,
  	\`brand\` text,
  	\`stock\` numeric,
  	\`price\` numeric,
  	\`discount_percentage\` numeric,
  	\`discount_start_date\` text,
  	\`discount_end_date\` text,
  	\`final_price\` numeric,
  	\`category_id\` integer,
  	\`is_featured\` integer DEFAULT false,
  	\`is_new_arrival\` integer DEFAULT false,
  	\`is_special_offer\` integer DEFAULT false,
  	\`is_shippable\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_category_idx\` ON \`products\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`products__status_idx\` ON \`products\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_rels_order_idx\` ON \`products_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_parent_idx\` ON \`products_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_path_idx\` ON \`products_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_media_id_idx\` ON \`products_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_tags_order_idx\` ON \`_products_v_version_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_tags_parent_id_idx\` ON \`_products_v_version_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_attributes_value_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`option\` text,
  	\`extra_price\` numeric,
  	\`stock\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v_version_attributes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_attributes_value_select_options_order_idx\` ON \`_products_v_version_attributes_value_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_attributes_value_select_options_parent_id_idx\` ON \`_products_v_version_attributes_value_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_attributes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value_type\` text,
  	\`value_text_value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_attributes_order_idx\` ON \`_products_v_version_attributes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_attributes_parent_id_idx\` ON \`_products_v_version_attributes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_additionalInfo_v_section_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`attribute_name\` text,
  	\`attribute_value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_additionalInfo_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_additionalInfo_v_section_content_order_idx\` ON \`_additionalInfo_v_section_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_additionalInfo_v_section_content_parent_id_idx\` ON \`_additionalInfo_v_section_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_additionalInfo_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_title\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_additionalInfo_v_order_idx\` ON \`_additionalInfo_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_additionalInfo_v_parent_id_idx\` ON \`_additionalInfo_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_slug\` text,
  	\`version_description\` text,
  	\`version_brand\` text,
  	\`version_stock\` numeric,
  	\`version_price\` numeric,
  	\`version_discount_percentage\` numeric,
  	\`version_discount_start_date\` text,
  	\`version_discount_end_date\` text,
  	\`version_final_price\` numeric,
  	\`version_category_id\` integer,
  	\`version_is_featured\` integer DEFAULT false,
  	\`version_is_new_arrival\` integer DEFAULT false,
  	\`version_is_special_offer\` integer DEFAULT false,
  	\`version_is_shippable\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_parent_idx\` ON \`_products_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_slug_idx\` ON \`_products_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_category_idx\` ON \`_products_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_updated_at_idx\` ON \`_products_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_created_at_idx\` ON \`_products_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version__status_idx\` ON \`_products_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_created_at_idx\` ON \`_products_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_updated_at_idx\` ON \`_products_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_latest_idx\` ON \`_products_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_rels_order_idx\` ON \`_products_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_parent_idx\` ON \`_products_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_path_idx\` ON \`_products_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_media_id_idx\` ON \`_products_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`slug\` text,
  	\`description\` text,
  	\`parent_category_id\` integer,
  	\`is_featured\` integer DEFAULT false,
  	\`image_id\` integer,
  	\`product_count\` numeric,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`parent_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_parent_category_idx\` ON \`categories\` (\`parent_category_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_image_idx\` ON \`categories\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_meta_meta_image_idx\` ON \`categories\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`categories__status_idx\` ON \`categories\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`categories_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_rels_order_idx\` ON \`categories_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_parent_idx\` ON \`categories_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_path_idx\` ON \`categories_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_categories_id_idx\` ON \`categories_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_slug\` text,
  	\`version_description\` text,
  	\`version_parent_category_id\` integer,
  	\`version_is_featured\` integer DEFAULT false,
  	\`version_image_id\` integer,
  	\`version_product_count\` numeric,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_parent_idx\` ON \`_categories_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_slug_idx\` ON \`_categories_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_parent_category_idx\` ON \`_categories_v\` (\`version_parent_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_image_idx\` ON \`_categories_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_meta_version_meta_image_idx\` ON \`_categories_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_updated_at_idx\` ON \`_categories_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_created_at_idx\` ON \`_categories_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version__status_idx\` ON \`_categories_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_created_at_idx\` ON \`_categories_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_updated_at_idx\` ON \`_categories_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_latest_idx\` ON \`_categories_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_order_idx\` ON \`_categories_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_parent_idx\` ON \`_categories_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_path_idx\` ON \`_categories_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_categories_id_idx\` ON \`_categories_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`offers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`slug\` text,
  	\`description\` text,
  	\`discount_percentage\` numeric,
  	\`start_date\` text,
  	\`end_date\` text,
  	\`is_active\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_slug_idx\` ON \`offers\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`offers_updated_at_idx\` ON \`offers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`offers_created_at_idx\` ON \`offers\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`offers__status_idx\` ON \`offers\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`offers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_rels_order_idx\` ON \`offers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_parent_idx\` ON \`offers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_path_idx\` ON \`offers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_products_id_idx\` ON \`offers_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_slug\` text,
  	\`version_description\` text,
  	\`version_discount_percentage\` numeric,
  	\`version_start_date\` text,
  	\`version_end_date\` text,
  	\`version_is_active\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_parent_idx\` ON \`_offers_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_version_slug_idx\` ON \`_offers_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_version_updated_at_idx\` ON \`_offers_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_version_created_at_idx\` ON \`_offers_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_version__status_idx\` ON \`_offers_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_created_at_idx\` ON \`_offers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_updated_at_idx\` ON \`_offers_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_latest_idx\` ON \`_offers_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_order_idx\` ON \`_offers_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_parent_idx\` ON \`_offers_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_path_idx\` ON \`_offers_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_products_id_idx\` ON \`_offers_v_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`wishlist_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` integer,
  	\`added_at\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`wishlist\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`wishlist_items_order_idx\` ON \`wishlist_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`wishlist_items_parent_id_idx\` ON \`wishlist_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`wishlist_items_product_idx\` ON \`wishlist_items\` (\`product_id\`);`)
  await db.run(sql`CREATE TABLE \`wishlist\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`wishlist_user_idx\` ON \`wishlist\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`wishlist_updated_at_idx\` ON \`wishlist\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`wishlist_created_at_idx\` ON \`wishlist\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`wishlist__status_idx\` ON \`wishlist\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_wishlist_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`product_id\` integer,
  	\`added_at\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_wishlist_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_wishlist_v_version_items_order_idx\` ON \`_wishlist_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_wishlist_v_version_items_parent_id_idx\` ON \`_wishlist_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_wishlist_v_version_items_product_idx\` ON \`_wishlist_v_version_items\` (\`product_id\`);`)
  await db.run(sql`CREATE TABLE \`_wishlist_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_user_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`wishlist\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_wishlist_v_parent_idx\` ON \`_wishlist_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_wishlist_v_version_version_user_idx\` ON \`_wishlist_v\` (\`version_user_id\`);`)
  await db.run(sql`CREATE INDEX \`_wishlist_v_version_version_updated_at_idx\` ON \`_wishlist_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_wishlist_v_version_version_created_at_idx\` ON \`_wishlist_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_wishlist_v_version_version__status_idx\` ON \`_wishlist_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_wishlist_v_created_at_idx\` ON \`_wishlist_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_wishlist_v_updated_at_idx\` ON \`_wishlist_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_wishlist_v_latest_idx\` ON \`_wishlist_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`cart_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`snipcart_id\` text,
  	\`product_id\` integer,
  	\`quantity\` numeric,
  	\`price\` numeric,
  	\`total\` numeric,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cart\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cart_items_order_idx\` ON \`cart_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cart_items_parent_id_idx\` ON \`cart_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cart_items_product_idx\` ON \`cart_items\` (\`product_id\`);`)
  await db.run(sql`CREATE TABLE \`cart\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer,
  	\`total_price\` numeric,
  	\`snipcart_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`cart_user_idx\` ON \`cart\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`cart_updated_at_idx\` ON \`cart\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cart_created_at_idx\` ON \`cart\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`cart__status_idx\` ON \`cart\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_cart_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`snipcart_id\` text,
  	\`product_id\` integer,
  	\`quantity\` numeric,
  	\`price\` numeric,
  	\`total\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cart_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cart_v_version_items_order_idx\` ON \`_cart_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cart_v_version_items_parent_id_idx\` ON \`_cart_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_cart_v_version_items_product_idx\` ON \`_cart_v_version_items\` (\`product_id\`);`)
  await db.run(sql`CREATE TABLE \`_cart_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_user_id\` integer,
  	\`version_total_price\` numeric,
  	\`version_snipcart_id\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`cart\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_cart_v_parent_idx\` ON \`_cart_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_cart_v_version_version_user_idx\` ON \`_cart_v\` (\`version_user_id\`);`)
  await db.run(sql`CREATE INDEX \`_cart_v_version_version_updated_at_idx\` ON \`_cart_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_cart_v_version_version_created_at_idx\` ON \`_cart_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_cart_v_version_version__status_idx\` ON \`_cart_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_cart_v_created_at_idx\` ON \`_cart_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_cart_v_updated_at_idx\` ON \`_cart_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_cart_v_latest_idx\` ON \`_cart_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`orders_items_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_items_categories_order_idx\` ON \`orders_items_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_items_categories_parent_id_idx\` ON \`orders_items_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders_items_taxes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`rate\` numeric,
  	\`amount\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_items_taxes_order_idx\` ON \`orders_items_taxes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_items_taxes_parent_id_idx\` ON \`orders_items_taxes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders_items_attributes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_items_attributes_order_idx\` ON \`orders_items_attributes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_items_attributes_parent_id_idx\` ON \`orders_items_attributes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`unique_id\` text,
  	\`product_id\` integer,
  	\`name\` text,
  	\`price\` numeric,
  	\`description\` text,
  	\`has_taxes_included\` integer,
  	\`url\` text,
  	\`image\` text,
  	\`quantity\` numeric,
  	\`shippable\` integer,
  	\`taxable\` integer,
  	\`dimensions_width\` numeric,
  	\`dimensions_height\` numeric,
  	\`dimensions_length\` numeric,
  	\`dimensions_weight\` numeric,
  	\`unit_price\` numeric,
  	\`total_price\` numeric,
  	\`total_price_without_taxes\` numeric,
  	\`total_price_without_discounts_and_taxes\` numeric,
  	\`total_price_without_discounts_and_taxes_legacy\` numeric,
  	\`added_on\` text,
  	\`modification_date\` text,
  	\`payment_gateway_id\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_items_order_idx\` ON \`orders_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_items_parent_id_idx\` ON \`orders_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_items_product_idx\` ON \`orders_items\` (\`product_id\`);`)
  await db.run(sql`CREATE TABLE \`orders_shipping_rates_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_shipping_rates_items_order_idx\` ON \`orders_shipping_rates_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_shipping_rates_items_parent_id_idx\` ON \`orders_shipping_rates_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders_discounts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_discounts_order_idx\` ON \`orders_discounts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_discounts_parent_id_idx\` ON \`orders_discounts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders_taxes_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_taxes_items_order_idx\` ON \`orders_taxes_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_taxes_items_parent_id_idx\` ON \`orders_taxes_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer,
  	\`total_count\` numeric,
  	\`total_price\` numeric,
  	\`ship_to_billing_address\` integer,
  	\`billing_address_full_name\` text,
  	\`billing_address_first_name\` text,
  	\`billing_address_name\` text,
  	\`billing_address_company\` text,
  	\`billing_address_address1\` text,
  	\`billing_address_address2\` text,
  	\`billing_address_full_address\` text,
  	\`billing_address_city\` text,
  	\`billing_address_country\` text,
  	\`billing_address_postal_code\` text,
  	\`billing_address_province\` text,
  	\`billing_address_phone\` text,
  	\`billing_address_vat_number\` text,
  	\`shipping_address_full_name\` text,
  	\`shipping_address_first_name\` text,
  	\`shipping_address_name\` text,
  	\`shipping_address_company\` text,
  	\`shipping_address_address1\` text,
  	\`shipping_address_address2\` text,
  	\`shipping_address_full_address\` text,
  	\`shipping_address_city\` text,
  	\`shipping_address_country\` text,
  	\`shipping_address_postal_code\` text,
  	\`shipping_address_province\` text,
  	\`shipping_address_phone\` text,
  	\`shipping_address_vat_number\` text,
  	\`shipping_details_cost\` numeric,
  	\`shipping_details_method\` text,
  	\`shipping_details_status\` numeric,
  	\`shipping_rates_loading\` integer,
  	\`shipping_rates_status\` text,
  	\`status\` numeric,
  	\`token\` text,
  	\`email\` text,
  	\`taxes_loading\` integer,
  	\`taxes_status\` text,
  	\`discount_induced_taxes_variation\` numeric,
  	\`currency\` text,
  	\`subtotal\` numeric,
  	\`total\` numeric,
  	\`invoice_number\` text,
  	\`card_last4\` text,
  	\`card_brand\` text,
  	\`payment_details_method\` text,
  	\`payment_details_status\` text,
  	\`payment_details_details\` text,
  	\`payment_details_icon_url\` text,
  	\`payment_details_instructions\` text,
  	\`payment_details_display\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_user_idx\` ON \`orders\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`orders__status_idx\` ON \`orders\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_version_items_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v_version_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_version_items_categories_order_idx\` ON \`_orders_v_version_items_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_items_categories_parent_id_idx\` ON \`_orders_v_version_items_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_version_items_taxes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`rate\` numeric,
  	\`amount\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v_version_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_version_items_taxes_order_idx\` ON \`_orders_v_version_items_taxes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_items_taxes_parent_id_idx\` ON \`_orders_v_version_items_taxes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_version_items_attributes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v_version_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_version_items_attributes_order_idx\` ON \`_orders_v_version_items_attributes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_items_attributes_parent_id_idx\` ON \`_orders_v_version_items_attributes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`unique_id\` text,
  	\`product_id\` integer,
  	\`_uuid\` text,
  	\`name\` text,
  	\`price\` numeric,
  	\`description\` text,
  	\`has_taxes_included\` integer,
  	\`url\` text,
  	\`image\` text,
  	\`quantity\` numeric,
  	\`shippable\` integer,
  	\`taxable\` integer,
  	\`dimensions_width\` numeric,
  	\`dimensions_height\` numeric,
  	\`dimensions_length\` numeric,
  	\`dimensions_weight\` numeric,
  	\`unit_price\` numeric,
  	\`total_price\` numeric,
  	\`total_price_without_taxes\` numeric,
  	\`total_price_without_discounts_and_taxes\` numeric,
  	\`total_price_without_discounts_and_taxes_legacy\` numeric,
  	\`added_on\` text,
  	\`modification_date\` text,
  	\`payment_gateway_id\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_version_items_order_idx\` ON \`_orders_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_items_parent_id_idx\` ON \`_orders_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_items_product_idx\` ON \`_orders_v_version_items\` (\`product_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_version_shipping_rates_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_version_shipping_rates_items_order_idx\` ON \`_orders_v_version_shipping_rates_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_shipping_rates_items_parent_id_idx\` ON \`_orders_v_version_shipping_rates_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_version_discounts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_version_discounts_order_idx\` ON \`_orders_v_version_discounts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_discounts_parent_id_idx\` ON \`_orders_v_version_discounts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_version_taxes_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_version_taxes_items_order_idx\` ON \`_orders_v_version_taxes_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_taxes_items_parent_id_idx\` ON \`_orders_v_version_taxes_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_user_id\` integer,
  	\`version_total_count\` numeric,
  	\`version_total_price\` numeric,
  	\`version_ship_to_billing_address\` integer,
  	\`version_billing_address_full_name\` text,
  	\`version_billing_address_first_name\` text,
  	\`version_billing_address_name\` text,
  	\`version_billing_address_company\` text,
  	\`version_billing_address_address1\` text,
  	\`version_billing_address_address2\` text,
  	\`version_billing_address_full_address\` text,
  	\`version_billing_address_city\` text,
  	\`version_billing_address_country\` text,
  	\`version_billing_address_postal_code\` text,
  	\`version_billing_address_province\` text,
  	\`version_billing_address_phone\` text,
  	\`version_billing_address_vat_number\` text,
  	\`version_shipping_address_full_name\` text,
  	\`version_shipping_address_first_name\` text,
  	\`version_shipping_address_name\` text,
  	\`version_shipping_address_company\` text,
  	\`version_shipping_address_address1\` text,
  	\`version_shipping_address_address2\` text,
  	\`version_shipping_address_full_address\` text,
  	\`version_shipping_address_city\` text,
  	\`version_shipping_address_country\` text,
  	\`version_shipping_address_postal_code\` text,
  	\`version_shipping_address_province\` text,
  	\`version_shipping_address_phone\` text,
  	\`version_shipping_address_vat_number\` text,
  	\`version_shipping_details_cost\` numeric,
  	\`version_shipping_details_method\` text,
  	\`version_shipping_details_status\` numeric,
  	\`version_shipping_rates_loading\` integer,
  	\`version_shipping_rates_status\` text,
  	\`version_status\` numeric,
  	\`version_token\` text,
  	\`version_email\` text,
  	\`version_taxes_loading\` integer,
  	\`version_taxes_status\` text,
  	\`version_discount_induced_taxes_variation\` numeric,
  	\`version_currency\` text,
  	\`version_subtotal\` numeric,
  	\`version_total\` numeric,
  	\`version_invoice_number\` text,
  	\`version_card_last4\` text,
  	\`version_card_brand\` text,
  	\`version_payment_details_method\` text,
  	\`version_payment_details_status\` text,
  	\`version_payment_details_details\` text,
  	\`version_payment_details_icon_url\` text,
  	\`version_payment_details_instructions\` text,
  	\`version_payment_details_display\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_parent_idx\` ON \`_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_user_idx\` ON \`_orders_v\` (\`version_user_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_updated_at_idx\` ON \`_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_at_idx\` ON \`_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version__status_idx\` ON \`_orders_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_created_at_idx\` ON \`_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_updated_at_idx\` ON \`_orders_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_latest_idx\` ON \`_orders_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''''ve received a new message.' NOT NULL,
  	\`message\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`submit_button_label\` text,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`confirmation_message\` text,
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`priority\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`search_updated_at_idx\` ON \`search\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_users_id_idx\` ON \`search_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	\`products_id\` integer,
  	\`categories_id\` integer,
  	\`offers_id\` integer,
  	\`wishlist_id\` integer,
  	\`cart_id\` integer,
  	\`orders_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`search_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`wishlist_id\`) REFERENCES \`wishlist\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cart_id\`) REFERENCES \`cart\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_offers_id_idx\` ON \`payload_locked_documents_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_wishlist_id_idx\` ON \`payload_locked_documents_rels\` (\`wishlist_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_cart_id_idx\` ON \`payload_locked_documents_rels\` (\`cart_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`navbarLinks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'reference',
  	\`new_tab\` integer,
  	\`icon_id\` integer,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navbarMenu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navbarLinks_order_idx\` ON \`navbarLinks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbarLinks_parent_id_idx\` ON \`navbarLinks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navbarLinks_icon_idx\` ON \`navbarLinks\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`navbarMenu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` integer DEFAULT false,
  	\`menu_link_type\` text DEFAULT 'reference',
  	\`menu_link_new_tab\` integer,
  	\`menu_link_icon_id\` integer,
  	\`menu_link_label\` text,
  	\`menu_link_url\` text,
  	\`menu_link_group_group_title\` text,
  	FOREIGN KEY (\`menu_link_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navbarMenu_order_idx\` ON \`navbarMenu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbarMenu_parent_id_idx\` ON \`navbarMenu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navbarMenu_menu_link_menu_link_icon_idx\` ON \`navbarMenu\` (\`menu_link_icon_id\`);`)
  await db.run(sql`CREATE TABLE \`footerLinks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'reference',
  	\`new_tab\` integer,
  	\`icon_id\` integer,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`FooterMenu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footerLinks_order_idx\` ON \`footerLinks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footerLinks_parent_id_idx\` ON \`footerLinks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footerLinks_icon_idx\` ON \`footerLinks\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`FooterMenu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` integer DEFAULT false,
  	\`menu_link_type\` text DEFAULT 'reference',
  	\`menu_link_new_tab\` integer,
  	\`menu_link_icon_id\` integer,
  	\`menu_link_label\` text,
  	\`menu_link_url\` text,
  	\`menu_link_group_group_title\` text,
  	FOREIGN KEY (\`menu_link_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`FooterMenu_order_idx\` ON \`FooterMenu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`FooterMenu_parent_id_idx\` ON \`FooterMenu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`FooterMenu_menu_link_menu_link_icon_idx\` ON \`FooterMenu\` (\`menu_link_icon_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_social_links_order_idx\` ON \`site_settings_footer_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_social_links_parent_id_idx\` ON \`site_settings_footer_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`general_title\` text NOT NULL,
  	\`general_description\` text NOT NULL,
  	\`general_favicon_url_id\` integer NOT NULL,
  	\`general_og_image_url_id\` integer NOT NULL,
  	\`general_currency\` text DEFAULT 'usd' NOT NULL,
  	\`navbar_logo_image_url_id\` integer NOT NULL,
  	\`navbar_logo_height\` numeric,
  	\`navbar_logo_width\` numeric,
  	\`footer_logo_image_url_id\` integer NOT NULL,
  	\`footer_logo_height\` numeric,
  	\`footer_logo_width\` numeric,
  	\`footer_logo_description\` text,
  	\`footer_copyright\` text,
  	\`monetization_ad_sense_id\` text,
  	\`monetization_measurement_id\` text,
  	\`theme_settings_light_mode_primary\` text DEFAULT '#C084FC' NOT NULL,
  	\`theme_settings_light_mode_background\` text DEFAULT '#F8FAFC' NOT NULL,
  	\`theme_settings_light_mode_text\` text DEFAULT '#0F0F0F' NOT NULL,
  	\`theme_settings_light_mode_foreground\` text DEFAULT '#E2E8F0' NOT NULL,
  	\`theme_settings_light_mode_popover\` text DEFAULT '#000000' NOT NULL,
  	\`theme_settings_light_mode_border\` text DEFAULT '#000000' NOT NULL,
  	\`theme_settings_dark_mode_primary\` text DEFAULT '#60A5FA' NOT NULL,
  	\`theme_settings_dark_mode_background\` text DEFAULT '#0F172A' NOT NULL,
  	\`theme_settings_dark_mode_text\` text DEFAULT '#FFFAFA' NOT NULL,
  	\`theme_settings_dark_mode_foreground\` text DEFAULT '#1E293B' NOT NULL,
  	\`theme_settings_dark_mode_popover\` text DEFAULT '#000000' NOT NULL,
  	\`theme_settings_dark_mode_border\` text DEFAULT '#000000' NOT NULL,
  	\`theme_settings_fonts_display_type\` text DEFAULT 'googleFont' NOT NULL,
  	\`theme_settings_fonts_display_custom_font_id\` integer,
  	\`theme_settings_fonts_display_remote_font\` text DEFAULT 'https://fonts.googleapis.com/css2?family=Chewy&display=swap',
  	\`theme_settings_fonts_display_font_name\` text DEFAULT 'Chewy',
  	\`theme_settings_fonts_body_type\` text DEFAULT 'googleFont' NOT NULL,
  	\`theme_settings_fonts_body_custom_font_id\` integer,
  	\`theme_settings_fonts_body_remote_font\` text DEFAULT 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  	\`theme_settings_fonts_body_font_name\` text DEFAULT 'Roboto',
  	\`theme_settings_radius\` text DEFAULT 'none' NOT NULL,
  	\`product_information_currency\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`general_favicon_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`general_og_image_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`navbar_logo_image_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`footer_logo_image_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`theme_settings_fonts_display_custom_font_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`theme_settings_fonts_body_custom_font_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_general_general_favicon_url_idx\` ON \`site_settings\` (\`general_favicon_url_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_general_general_og_image_url_idx\` ON \`site_settings\` (\`general_og_image_url_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navbar_logo_navbar_logo_image_url_idx\` ON \`site_settings\` (\`navbar_logo_image_url_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_logo_footer_logo_image_url_idx\` ON \`site_settings\` (\`footer_logo_image_url_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_theme_settings_fonts_display_theme_settings_fonts_display_custom_font_idx\` ON \`site_settings\` (\`theme_settings_fonts_display_custom_font_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_theme_settings_fonts_body_theme_settings_fonts_body_custom_font_idx\` ON \`site_settings\` (\`theme_settings_fonts_body_custom_font_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_texts_order_parent_idx\` ON \`site_settings_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_rels_order_idx\` ON \`site_settings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_parent_idx\` ON \`site_settings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_path_idx\` ON \`site_settings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_pages_id_idx\` ON \`site_settings_rels\` (\`pages_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_home\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_details\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_newsletter\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_featured_products_featured_products\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_featured_products\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_categories_categories\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_categories\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_disqus_comments\`;`)
  await db.run(sql`DROP TABLE \`pages_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_details\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_newsletter\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_featured_products_featured_products\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_featured_products\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_categories_categories\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_categories\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_disqus_comments\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_role\`;`)
  await db.run(sql`DROP TABLE \`users_social_links\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`products_tags\`;`)
  await db.run(sql`DROP TABLE \`products_attributes_value_select_options\`;`)
  await db.run(sql`DROP TABLE \`products_attributes\`;`)
  await db.run(sql`DROP TABLE \`additionalInfo_section_content\`;`)
  await db.run(sql`DROP TABLE \`additionalInfo\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_rels\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_attributes_value_select_options\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_attributes\`;`)
  await db.run(sql`DROP TABLE \`_additionalInfo_v_section_content\`;`)
  await db.run(sql`DROP TABLE \`_additionalInfo_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v_rels\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`categories_rels\`;`)
  await db.run(sql`DROP TABLE \`_categories_v\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_rels\`;`)
  await db.run(sql`DROP TABLE \`offers\`;`)
  await db.run(sql`DROP TABLE \`offers_rels\`;`)
  await db.run(sql`DROP TABLE \`_offers_v\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_rels\`;`)
  await db.run(sql`DROP TABLE \`wishlist_items\`;`)
  await db.run(sql`DROP TABLE \`wishlist\`;`)
  await db.run(sql`DROP TABLE \`_wishlist_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`_wishlist_v\`;`)
  await db.run(sql`DROP TABLE \`cart_items\`;`)
  await db.run(sql`DROP TABLE \`cart\`;`)
  await db.run(sql`DROP TABLE \`_cart_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`_cart_v\`;`)
  await db.run(sql`DROP TABLE \`orders_items_categories\`;`)
  await db.run(sql`DROP TABLE \`orders_items_taxes\`;`)
  await db.run(sql`DROP TABLE \`orders_items_attributes\`;`)
  await db.run(sql`DROP TABLE \`orders_items\`;`)
  await db.run(sql`DROP TABLE \`orders_shipping_rates_items\`;`)
  await db.run(sql`DROP TABLE \`orders_discounts\`;`)
  await db.run(sql`DROP TABLE \`orders_taxes_items\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_items_categories\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_items_taxes\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_items_attributes\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_shipping_rates_items\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_discounts\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_taxes_items\`;`)
  await db.run(sql`DROP TABLE \`_orders_v\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`search\`;`)
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`navbarLinks\`;`)
  await db.run(sql`DROP TABLE \`navbarMenu\`;`)
  await db.run(sql`DROP TABLE \`footerLinks\`;`)
  await db.run(sql`DROP TABLE \`FooterMenu\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_social_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings_texts\`;`)
  await db.run(sql`DROP TABLE \`site_settings_rels\`;`)
}
