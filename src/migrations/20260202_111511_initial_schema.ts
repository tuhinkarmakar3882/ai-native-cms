import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_hero_links_order_idx\` ON \`pages_hero_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_hero_links_parent_id_idx\` ON \`pages_hero_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`richtext-content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`richtext-content_order_idx\` ON \`richtext-content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`richtext-content_parent_id_idx\` ON \`richtext-content\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`richtext-content_path_idx\` ON \`richtext-content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_form_idx\` ON \`pages_blocks_form_block\` (\`form_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_columns_order_idx\` ON \`pages_blocks_content_columns\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_columns_parent_id_idx\` ON \`pages_blocks_content_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'info',
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_banner_order_idx\` ON \`pages_blocks_banner\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_banner_parent_id_idx\` ON \`pages_blocks_banner\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_banner_path_idx\` ON \`pages_blocks_banner\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`bg_hero_grad_actions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`link\` text,
  	\`type\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bg_hero_grad\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`bg_hero_grad_actions_order_idx\` ON \`bg_hero_grad_actions\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`bg_hero_grad_actions_parent_id_idx\` ON \`bg_hero_grad_actions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`bg_hero_grad\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`pill_text\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_hero_grad_order_idx\` ON \`bg_hero_grad\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`bg_hero_grad_parent_id_idx\` ON \`bg_hero_grad\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`bg_hero_grad_path_idx\` ON \`bg_hero_grad\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`bg_hero_grad_image_idx\` ON \`bg_hero_grad\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`bg_bento_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	\`icon\` text,
  	\`span\` text DEFAULT '1',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bg_bento\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_bento_cards_order_idx\` ON \`bg_bento_cards\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`bg_bento_cards_parent_id_idx\` ON \`bg_bento_cards\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`bg_bento\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_bento_order_idx\` ON \`bg_bento\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bg_bento_parent_id_idx\` ON \`bg_bento\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bg_bento_path_idx\` ON \`bg_bento\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`bg_tabs_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bg_tabs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_tabs_tabs_order_idx\` ON \`bg_tabs_tabs\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`bg_tabs_tabs_parent_id_idx\` ON \`bg_tabs_tabs\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`bg_tabs_tabs_image_idx\` ON \`bg_tabs_tabs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`bg_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_tabs_order_idx\` ON \`bg_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bg_tabs_parent_id_idx\` ON \`bg_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bg_tabs_path_idx\` ON \`bg_tabs\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_actions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`variant\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_actions_order_idx\` ON \`pages_blocks_hero_actions\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_actions_parent_id_idx\` ON \`pages_blocks_hero_actions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
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
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`faq_items_order_idx\` ON \`faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`faq_items_parent_id_idx\` ON \`faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_title\` text,
  	\`title\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`badge\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_feature_grid_features_order_idx\` ON \`pages_blocks_feature_grid_features\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_feature_grid_features_parent_id_idx\` ON \`pages_blocks_feature_grid_features\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`columns\` text DEFAULT '3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_feature_grid_order_idx\` ON \`pages_blocks_feature_grid\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_feature_grid_parent_id_idx\` ON \`pages_blocks_feature_grid\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_feature_grid_path_idx\` ON \`pages_blocks_feature_grid\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_media_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_side\` text DEFAULT 'left',
  	\`image_id\` integer,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`cta_link\` text,
  	\`cta_variant\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_order_idx\` ON \`pages_blocks_media_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_parent_id_idx\` ON \`pages_blocks_media_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_path_idx\` ON \`pages_blocks_media_content\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_image_idx\` ON \`pages_blocks_media_content\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_image_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_image_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_image_gallery_images_order_idx\` ON \`pages_blocks_image_gallery_images\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_image_gallery_images_parent_id_idx\` ON \`pages_blocks_image_gallery_images\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_image_gallery_images_image_idx\` ON \`pages_blocks_image_gallery_images\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_image_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_image_gallery_order_idx\` ON \`pages_blocks_image_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_image_gallery_parent_id_idx\` ON \`pages_blocks_image_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_image_gallery_path_idx\` ON \`pages_blocks_image_gallery\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`avatar_id\` integer,
  	\`rating\` numeric DEFAULT 5,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`testi_car\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`reviews_order_idx\` ON \`reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`reviews_parent_id_idx\` ON \`reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`reviews_avatar_idx\` ON \`reviews\` (\`avatar_id\`);`)
  await db.run(sql`CREATE TABLE \`testi_car\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`testi_car_order_idx\` ON \`testi_car\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`testi_car_parent_id_idx\` ON \`testi_car\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`testi_car_path_idx\` ON \`testi_car\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`prc_tbl_plans_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`prc_tbl_plans\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`prc_tbl_plans_features_order_idx\` ON \`prc_tbl_plans_features\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`prc_tbl_plans_features_parent_id_idx\` ON \`prc_tbl_plans_features\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`prc_tbl_plans\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`price\` text,
  	\`description\` text,
  	\`is_popular\` integer,
  	\`button_text\` text DEFAULT 'Get Started',
  	\`button_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`prc_tbl\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`prc_tbl_plans_order_idx\` ON \`prc_tbl_plans\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`prc_tbl_plans_parent_id_idx\` ON \`prc_tbl_plans\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`prc_tbl\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`prc_tbl_order_idx\` ON \`prc_tbl\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`prc_tbl_parent_id_idx\` ON \`prc_tbl\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`prc_tbl_path_idx\` ON \`prc_tbl\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`bg_logos_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bg_logos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_logos_logos_order_idx\` ON \`bg_logos_logos\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`bg_logos_logos_parent_id_idx\` ON \`bg_logos_logos\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`bg_logos_logos_image_idx\` ON \`bg_logos_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`bg_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_logos_order_idx\` ON \`bg_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bg_logos_parent_id_idx\` ON \`bg_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bg_logos_path_idx\` ON \`bg_logos\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`bg_time_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`year\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bg_time\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_time_events_order_idx\` ON \`bg_time_events\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`bg_time_events_parent_id_idx\` ON \`bg_time_events\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`bg_time\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_time_order_idx\` ON \`bg_time\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bg_time_parent_id_idx\` ON \`bg_time\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bg_time_path_idx\` ON \`bg_time\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`bg_metrics_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bg_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`bg_metrics_stats_order_idx\` ON \`bg_metrics_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`bg_metrics_stats_parent_id_idx\` ON \`bg_metrics_stats\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`bg_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bg_metrics_order_idx\` ON \`bg_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bg_metrics_parent_id_idx\` ON \`bg_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bg_metrics_path_idx\` ON \`bg_metrics\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blk_split_ban_content_actions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`style\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blk_split_ban\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`blk_split_ban_content_actions_order_idx\` ON \`blk_split_ban_content_actions\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blk_split_ban_content_actions_parent_id_idx\` ON \`blk_split_ban_content_actions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`blk_split_ban\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`settings_theme\` text DEFAULT 'dark',
  	\`settings_image_position\` text DEFAULT 'right',
  	\`content_heading\` text,
  	\`content_subtext\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blk_split_ban_order_idx\` ON \`blk_split_ban\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`blk_split_ban_parent_id_idx\` ON \`blk_split_ban\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`blk_split_ban_path_idx\` ON \`blk_split_ban\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`blk_split_ban_image_idx\` ON \`blk_split_ban\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`blk_table_headers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blk_table\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`blk_table_headers_order_idx\` ON \`blk_table_headers\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blk_table_headers_parent_id_idx\` ON \`blk_table_headers\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`blk_table_rows_cells\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blk_table_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`blk_table_rows_cells_order_idx\` ON \`blk_table_rows_cells\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blk_table_rows_cells_parent_id_idx\` ON \`blk_table_rows_cells\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`blk_table_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blk_table\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blk_table_rows_order_idx\` ON \`blk_table_rows\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`blk_table_rows_parent_id_idx\` ON \`blk_table_rows\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`blk_table_column_mapping\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`header\` text,
  	\`data_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blk_table\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`blk_table_column_mapping_order_idx\` ON \`blk_table_column_mapping\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blk_table_column_mapping_parent_id_idx\` ON \`blk_table_column_mapping\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`blk_table\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`source_type\` text DEFAULT 'static',
  	\`api_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blk_table_order_idx\` ON \`blk_table\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blk_table_parent_id_idx\` ON \`blk_table\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blk_table_path_idx\` ON \`blk_table\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_button_atom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`variant\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_button_atom_order_idx\` ON \`pages_blocks_button_atom\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_button_atom_parent_id_idx\` ON \`pages_blocks_button_atom\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_button_atom_path_idx\` ON \`pages_blocks_button_atom\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_text_atom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_text_atom_order_idx\` ON \`pages_blocks_text_atom\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_text_atom_parent_id_idx\` ON \`pages_blocks_text_atom\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_text_atom_path_idx\` ON \`pages_blocks_text_atom\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_badge_atom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_badge_atom_order_idx\` ON \`pages_blocks_badge_atom\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_badge_atom_parent_id_idx\` ON \`pages_blocks_badge_atom\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_badge_atom_path_idx\` ON \`pages_blocks_badge_atom\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`at_alrt\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'default',
  	\`title\` text,
  	\`message\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_alrt_order_idx\` ON \`at_alrt\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_alrt_parent_id_idx\` ON \`at_alrt\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_alrt_path_idx\` ON \`at_alrt\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_sep\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`spacing\` text DEFAULT 'medium',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_sep_order_idx\` ON \`at_sep\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_sep_parent_id_idx\` ON \`at_sep\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_sep_path_idx\` ON \`at_sep\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_prog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` numeric,
  	\`label\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_prog_order_idx\` ON \`at_prog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_prog_parent_id_idx\` ON \`at_prog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_prog_path_idx\` ON \`at_prog\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_img\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`aspect_ratio\` text DEFAULT 'auto',
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_img_order_idx\` ON \`at_img\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_img_parent_id_idx\` ON \`at_img\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_img_path_idx\` ON \`at_img\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`at_img_image_idx\` ON \`at_img\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`at_icn\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`size\` numeric DEFAULT 24,
  	\`color\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_icn_order_idx\` ON \`at_icn\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_icn_parent_id_idx\` ON \`at_icn\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_icn_path_idx\` ON \`at_icn\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_vid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`controls\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_vid_order_idx\` ON \`at_vid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_vid_parent_id_idx\` ON \`at_vid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_vid_path_idx\` ON \`at_vid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_tip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`trigger_text\` text,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_tip_order_idx\` ON \`at_tip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_tip_parent_id_idx\` ON \`at_tip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_tip_path_idx\` ON \`at_tip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_avg_users\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`initials\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`at_avg\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_avg_users_order_idx\` ON \`at_avg_users\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`at_avg_users_parent_id_idx\` ON \`at_avg_users\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`at_avg_users_image_idx\` ON \`at_avg_users\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`at_avg\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_avg_order_idx\` ON \`at_avg\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_avg_parent_id_idx\` ON \`at_avg\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_avg_path_idx\` ON \`at_avg\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_acc_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`trigger\` text,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`at_acc\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_acc_items_order_idx\` ON \`at_acc_items\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`at_acc_items_parent_id_idx\` ON \`at_acc_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`at_acc\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_acc_order_idx\` ON \`at_acc\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_acc_parent_id_idx\` ON \`at_acc\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_acc_path_idx\` ON \`at_acc\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_stk\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`direction\` text DEFAULT 'column',
  	\`gap\` text DEFAULT '4',
  	\`align\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_stk_order_idx\` ON \`at_stk\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_stk_parent_id_idx\` ON \`at_stk\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_stk_path_idx\` ON \`at_stk\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_crd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`padding\` text DEFAULT 'medium',
  	\`glassmorphism\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_crd_order_idx\` ON \`at_crd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_crd_parent_id_idx\` ON \`at_crd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_crd_path_idx\` ON \`at_crd\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`at_tog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`left_label\` text DEFAULT 'Monthly',
  	\`right_label\` text DEFAULT 'Yearly',
  	\`state_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`at_tog_order_idx\` ON \`at_tog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`at_tog_parent_id_idx\` ON \`at_tog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`at_tog_path_idx\` ON \`at_tog\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`b_comp_sec_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'full',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`b_comp_sec\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`b_comp_sec_columns_order_idx\` ON \`b_comp_sec_columns\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`b_comp_sec_columns_parent_id_idx\` ON \`b_comp_sec_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`b_comp_sec\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`container_settings_layout_type\` text DEFAULT 'flex',
  	\`container_settings_gap\` numeric,
  	\`container_settings_padding\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`b_comp_sec_order_idx\` ON \`b_comp_sec\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`b_comp_sec_parent_id_idx\` ON \`b_comp_sec\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`b_comp_sec_path_idx\` ON \`b_comp_sec\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_type\` text DEFAULT 'lowImpact',
  	\`hero_rich_text\` text,
  	\`hero_media_id\` integer,
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages__status_idx\` ON \`pages_locales\` (\`_status\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_hero_links_order_idx\` ON \`_pages_v_version_hero_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_hero_links_parent_id_idx\` ON \`_pages_v_version_hero_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_richtext-content_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_richtext-content_v_order_idx\` ON \`_richtext-content_v\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_richtext-content_v_parent_id_idx\` ON \`_richtext-content_v\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_richtext-content_v_path_idx\` ON \`_richtext-content_v\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_form_idx\` ON \`_pages_v_blocks_form_block\` (\`form_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_columns_order_idx\` ON \`_pages_v_blocks_content_columns\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_columns_parent_id_idx\` ON \`_pages_v_blocks_content_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_order_idx\` ON \`_pages_v_blocks_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_parent_id_idx\` ON \`_pages_v_blocks_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_path_idx\` ON \`_pages_v_blocks_content\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'info',
  	\`content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_banner_order_idx\` ON \`_pages_v_blocks_banner\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_banner_parent_id_idx\` ON \`_pages_v_blocks_banner\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_banner_path_idx\` ON \`_pages_v_blocks_banner\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_bg_hero_grad_v_actions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`link\` text,
  	\`type\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bg_hero_grad_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_bg_hero_grad_v_actions_order_idx\` ON \`_bg_hero_grad_v_actions\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_bg_hero_grad_v_actions_parent_id_idx\` ON \`_bg_hero_grad_v_actions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_bg_hero_grad_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`pill_text\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bg_hero_grad_v_order_idx\` ON \`_bg_hero_grad_v\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`_bg_hero_grad_v_parent_id_idx\` ON \`_bg_hero_grad_v\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`_bg_hero_grad_v_path_idx\` ON \`_bg_hero_grad_v\` (\`_path\`);`)
  await db.run(
    sql`CREATE INDEX \`_bg_hero_grad_v_image_idx\` ON \`_bg_hero_grad_v\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_bg_bento_v_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	\`icon\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bg_bento_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_bg_bento_v_cards_order_idx\` ON \`_bg_bento_v_cards\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_bg_bento_v_cards_parent_id_idx\` ON \`_bg_bento_v_cards\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_bg_bento_v\` (
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
  await db.run(sql`CREATE INDEX \`_bg_bento_v_order_idx\` ON \`_bg_bento_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_bg_bento_v_parent_id_idx\` ON \`_bg_bento_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bg_bento_v_path_idx\` ON \`_bg_bento_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_bg_tabs_v_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bg_tabs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bg_tabs_v_tabs_order_idx\` ON \`_bg_tabs_v_tabs\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`_bg_tabs_v_tabs_parent_id_idx\` ON \`_bg_tabs_v_tabs\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_bg_tabs_v_tabs_image_idx\` ON \`_bg_tabs_v_tabs\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_bg_tabs_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bg_tabs_v_order_idx\` ON \`_bg_tabs_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_bg_tabs_v_parent_id_idx\` ON \`_bg_tabs_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bg_tabs_v_path_idx\` ON \`_bg_tabs_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_actions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`variant\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_actions_order_idx\` ON \`_pages_v_blocks_hero_actions\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_actions_parent_id_idx\` ON \`_pages_v_blocks_hero_actions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero\` (
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
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_faq_items_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_faq_items_v_order_idx\` ON \`_faq_items_v\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`_faq_items_v_parent_id_idx\` ON \`_faq_items_v\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_title\` text,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_faq_order_idx\` ON \`_pages_v_blocks_faq\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_faq_parent_id_idx\` ON \`_pages_v_blocks_faq\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_faq_path_idx\` ON \`_pages_v_blocks_faq\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_grid_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`badge\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_feature_grid_features_order_idx\` ON \`_pages_v_blocks_feature_grid_features\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_feature_grid_features_parent_id_idx\` ON \`_pages_v_blocks_feature_grid_features\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`columns\` text DEFAULT '3',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_feature_grid_order_idx\` ON \`_pages_v_blocks_feature_grid\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_feature_grid_parent_id_idx\` ON \`_pages_v_blocks_feature_grid\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_feature_grid_path_idx\` ON \`_pages_v_blocks_feature_grid\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_media_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_side\` text DEFAULT 'left',
  	\`image_id\` integer,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`cta_link\` text,
  	\`cta_variant\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_order_idx\` ON \`_pages_v_blocks_media_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_parent_id_idx\` ON \`_pages_v_blocks_media_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_path_idx\` ON \`_pages_v_blocks_media_content\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_image_idx\` ON \`_pages_v_blocks_media_content\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_image_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_image_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_image_gallery_images_order_idx\` ON \`_pages_v_blocks_image_gallery_images\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_image_gallery_images_parent_id_idx\` ON \`_pages_v_blocks_image_gallery_images\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_image_gallery_images_image_idx\` ON \`_pages_v_blocks_image_gallery_images\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_image_gallery\` (
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
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_image_gallery_order_idx\` ON \`_pages_v_blocks_image_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_image_gallery_parent_id_idx\` ON \`_pages_v_blocks_image_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_image_gallery_path_idx\` ON \`_pages_v_blocks_image_gallery\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_reviews_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`avatar_id\` integer,
  	\`rating\` numeric DEFAULT 5,
  	\`_uuid\` text,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_testi_car_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_reviews_v_order_idx\` ON \`_reviews_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_reviews_v_parent_id_idx\` ON \`_reviews_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_reviews_v_avatar_idx\` ON \`_reviews_v\` (\`avatar_id\`);`)
  await db.run(sql`CREATE TABLE \`_testi_car_v\` (
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
  await db.run(sql`CREATE INDEX \`_testi_car_v_order_idx\` ON \`_testi_car_v\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`_testi_car_v_parent_id_idx\` ON \`_testi_car_v\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`_testi_car_v_path_idx\` ON \`_testi_car_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_prc_tbl_v_plans_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_prc_tbl_v_plans\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_prc_tbl_v_plans_features_order_idx\` ON \`_prc_tbl_v_plans_features\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_prc_tbl_v_plans_features_parent_id_idx\` ON \`_prc_tbl_v_plans_features\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_prc_tbl_v_plans\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`price\` text,
  	\`description\` text,
  	\`is_popular\` integer,
  	\`button_text\` text DEFAULT 'Get Started',
  	\`button_link\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_prc_tbl_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_prc_tbl_v_plans_order_idx\` ON \`_prc_tbl_v_plans\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_prc_tbl_v_plans_parent_id_idx\` ON \`_prc_tbl_v_plans\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_prc_tbl_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_prc_tbl_v_order_idx\` ON \`_prc_tbl_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_prc_tbl_v_parent_id_idx\` ON \`_prc_tbl_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_prc_tbl_v_path_idx\` ON \`_prc_tbl_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_bg_logos_v_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bg_logos_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_bg_logos_v_logos_order_idx\` ON \`_bg_logos_v_logos\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_bg_logos_v_logos_parent_id_idx\` ON \`_bg_logos_v_logos\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_bg_logos_v_logos_image_idx\` ON \`_bg_logos_v_logos\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_bg_logos_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bg_logos_v_order_idx\` ON \`_bg_logos_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_bg_logos_v_parent_id_idx\` ON \`_bg_logos_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bg_logos_v_path_idx\` ON \`_bg_logos_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_bg_time_v_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`year\` text,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bg_time_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_bg_time_v_events_order_idx\` ON \`_bg_time_v_events\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_bg_time_v_events_parent_id_idx\` ON \`_bg_time_v_events\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_bg_time_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bg_time_v_order_idx\` ON \`_bg_time_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_bg_time_v_parent_id_idx\` ON \`_bg_time_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bg_time_v_path_idx\` ON \`_bg_time_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_bg_metrics_v_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bg_metrics_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_bg_metrics_v_stats_order_idx\` ON \`_bg_metrics_v_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_bg_metrics_v_stats_parent_id_idx\` ON \`_bg_metrics_v_stats\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_bg_metrics_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bg_metrics_v_order_idx\` ON \`_bg_metrics_v\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`_bg_metrics_v_parent_id_idx\` ON \`_bg_metrics_v\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`_bg_metrics_v_path_idx\` ON \`_bg_metrics_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_blk_split_ban_v_content_actions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`style\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blk_split_ban_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_blk_split_ban_v_content_actions_order_idx\` ON \`_blk_split_ban_v_content_actions\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blk_split_ban_v_content_actions_parent_id_idx\` ON \`_blk_split_ban_v_content_actions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_blk_split_ban_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`settings_theme\` text DEFAULT 'dark',
  	\`settings_image_position\` text DEFAULT 'right',
  	\`content_heading\` text,
  	\`content_subtext\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_blk_split_ban_v_order_idx\` ON \`_blk_split_ban_v\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blk_split_ban_v_parent_id_idx\` ON \`_blk_split_ban_v\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`_blk_split_ban_v_path_idx\` ON \`_blk_split_ban_v\` (\`_path\`);`)
  await db.run(
    sql`CREATE INDEX \`_blk_split_ban_v_image_idx\` ON \`_blk_split_ban_v\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_blk_table_v_headers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blk_table_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_blk_table_v_headers_order_idx\` ON \`_blk_table_v_headers\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blk_table_v_headers_parent_id_idx\` ON \`_blk_table_v_headers\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_blk_table_v_rows_cells\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blk_table_v_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_blk_table_v_rows_cells_order_idx\` ON \`_blk_table_v_rows_cells\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blk_table_v_rows_cells_parent_id_idx\` ON \`_blk_table_v_rows_cells\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_blk_table_v_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blk_table_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_blk_table_v_rows_order_idx\` ON \`_blk_table_v_rows\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blk_table_v_rows_parent_id_idx\` ON \`_blk_table_v_rows\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_blk_table_v_column_mapping\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`header\` text,
  	\`data_key\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blk_table_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_blk_table_v_column_mapping_order_idx\` ON \`_blk_table_v_column_mapping\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blk_table_v_column_mapping_parent_id_idx\` ON \`_blk_table_v_column_mapping\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_blk_table_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`source_type\` text DEFAULT 'static',
  	\`api_url\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_blk_table_v_order_idx\` ON \`_blk_table_v\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`_blk_table_v_parent_id_idx\` ON \`_blk_table_v\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`_blk_table_v_path_idx\` ON \`_blk_table_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_button_atom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`variant\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_button_atom_order_idx\` ON \`_pages_v_blocks_button_atom\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_button_atom_parent_id_idx\` ON \`_pages_v_blocks_button_atom\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_button_atom_path_idx\` ON \`_pages_v_blocks_button_atom\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_text_atom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_text_atom_order_idx\` ON \`_pages_v_blocks_text_atom\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_text_atom_parent_id_idx\` ON \`_pages_v_blocks_text_atom\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_text_atom_path_idx\` ON \`_pages_v_blocks_text_atom\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_badge_atom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_badge_atom_order_idx\` ON \`_pages_v_blocks_badge_atom\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_badge_atom_parent_id_idx\` ON \`_pages_v_blocks_badge_atom\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_badge_atom_path_idx\` ON \`_pages_v_blocks_badge_atom\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_at_alrt_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'default',
  	\`title\` text,
  	\`message\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_alrt_v_order_idx\` ON \`_at_alrt_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_alrt_v_parent_id_idx\` ON \`_at_alrt_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_alrt_v_path_idx\` ON \`_at_alrt_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_sep_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`spacing\` text DEFAULT 'medium',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_sep_v_order_idx\` ON \`_at_sep_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_sep_v_parent_id_idx\` ON \`_at_sep_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_sep_v_path_idx\` ON \`_at_sep_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_prog_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` numeric,
  	\`label\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_prog_v_order_idx\` ON \`_at_prog_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_prog_v_parent_id_idx\` ON \`_at_prog_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_prog_v_path_idx\` ON \`_at_prog_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_img_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`aspect_ratio\` text DEFAULT 'auto',
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_img_v_order_idx\` ON \`_at_img_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_img_v_parent_id_idx\` ON \`_at_img_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_img_v_path_idx\` ON \`_at_img_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_at_img_v_image_idx\` ON \`_at_img_v\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_at_icn_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`size\` numeric DEFAULT 24,
  	\`color\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_icn_v_order_idx\` ON \`_at_icn_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_icn_v_parent_id_idx\` ON \`_at_icn_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_icn_v_path_idx\` ON \`_at_icn_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_vid_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`controls\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_vid_v_order_idx\` ON \`_at_vid_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_vid_v_parent_id_idx\` ON \`_at_vid_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_vid_v_path_idx\` ON \`_at_vid_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_tip_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`trigger_text\` text,
  	\`content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_tip_v_order_idx\` ON \`_at_tip_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_tip_v_parent_id_idx\` ON \`_at_tip_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_tip_v_path_idx\` ON \`_at_tip_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_avg_v_users\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`initials\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_at_avg_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_avg_v_users_order_idx\` ON \`_at_avg_v_users\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`_at_avg_v_users_parent_id_idx\` ON \`_at_avg_v_users\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_at_avg_v_users_image_idx\` ON \`_at_avg_v_users\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_at_avg_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_avg_v_order_idx\` ON \`_at_avg_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_avg_v_parent_id_idx\` ON \`_at_avg_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_avg_v_path_idx\` ON \`_at_avg_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_acc_v_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`trigger\` text,
  	\`content\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_at_acc_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_acc_v_items_order_idx\` ON \`_at_acc_v_items\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`_at_acc_v_items_parent_id_idx\` ON \`_at_acc_v_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_at_acc_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_acc_v_order_idx\` ON \`_at_acc_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_acc_v_parent_id_idx\` ON \`_at_acc_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_acc_v_path_idx\` ON \`_at_acc_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_stk_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`direction\` text DEFAULT 'column',
  	\`gap\` text DEFAULT '4',
  	\`align\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_stk_v_order_idx\` ON \`_at_stk_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_stk_v_parent_id_idx\` ON \`_at_stk_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_stk_v_path_idx\` ON \`_at_stk_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_crd_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`padding\` text DEFAULT 'medium',
  	\`glassmorphism\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_crd_v_order_idx\` ON \`_at_crd_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_crd_v_parent_id_idx\` ON \`_at_crd_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_crd_v_path_idx\` ON \`_at_crd_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_at_tog_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`left_label\` text DEFAULT 'Monthly',
  	\`right_label\` text DEFAULT 'Yearly',
  	\`state_key\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_at_tog_v_order_idx\` ON \`_at_tog_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_at_tog_v_parent_id_idx\` ON \`_at_tog_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_at_tog_v_path_idx\` ON \`_at_tog_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_b_comp_sec_v_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'full',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_b_comp_sec_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_b_comp_sec_v_columns_order_idx\` ON \`_b_comp_sec_v_columns\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_b_comp_sec_v_columns_parent_id_idx\` ON \`_b_comp_sec_v_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_b_comp_sec_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`container_settings_layout_type\` text DEFAULT 'flex',
  	\`container_settings_gap\` numeric,
  	\`container_settings_padding\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_b_comp_sec_v_order_idx\` ON \`_b_comp_sec_v\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`_b_comp_sec_v_parent_id_idx\` ON \`_b_comp_sec_v\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`_b_comp_sec_v_path_idx\` ON \`_b_comp_sec_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_hero_type\` text DEFAULT 'lowImpact',
  	\`version_hero_rich_text\` text,
  	\`version_hero_media_id\` integer,
  	\`version_published_at\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_hero_version_hero_media_idx\` ON \`_pages_v\` (\`version_hero_media_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`,
  )
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(
    sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`,
  )
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_locales\` (
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v_locales\` (\`version__status\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`posts_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`posts_populated_authors_order_idx\` ON \`posts_populated_authors\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`posts_populated_authors_parent_id_idx\` ON \`posts_populated_authors\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_image_id\` integer,
  	\`content\` text,
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_hero_image_idx\` ON \`posts\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(
    sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_populated_authors_order_idx\` ON \`_posts_v_version_populated_authors\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_populated_authors_parent_id_idx\` ON \`_posts_v_version_populated_authors\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_hero_image_id\` integer,
  	\`version_content\` text,
  	\`version_published_at\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_hero_image_idx\` ON \`_posts_v\` (\`version_hero_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(
    sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`,
  )
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`_posts_v_rels_posts_id_idx\` ON \`_posts_v_rels\` (\`posts_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_rels_categories_id_idx\` ON \`_posts_v_rels\` (\`categories_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_rels_users_id_idx\` ON \`_posts_v_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`caption\` text,
  	\`folder_id\` integer,
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
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text,
  	FOREIGN KEY (\`folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`media_folder_idx\` ON \`media\` (\`folder_id\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(
    sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`,
  )
  await db.run(sql`CREATE TABLE \`categories_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`categories_breadcrumbs_order_idx\` ON \`categories_breadcrumbs\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`categories_breadcrumbs_parent_id_idx\` ON \`categories_breadcrumbs\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`categories_breadcrumbs_locale_idx\` ON \`categories_breadcrumbs\` (\`_locale\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`categories_breadcrumbs_doc_idx\` ON \`categories_breadcrumbs\` (\`doc_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_parent_idx\` ON \`categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(
    sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`redirects_rels_pages_id_idx\` ON \`redirects_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`redirects_rels_posts_id_idx\` ON \`redirects_rels\` (\`posts_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_checkbox\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_checkbox_locales_locale_parent_id_unique\` ON \`forms_blocks_checkbox_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_country_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_country\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_country_locales_locale_parent_id_unique\` ON \`forms_blocks_country_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_email_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_email\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_email_locales_locale_parent_id_unique\` ON \`forms_blocks_email_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_message_locales\` (
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_message\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_message_locales_locale_parent_id_unique\` ON \`forms_blocks_message_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_number_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_number_locales_locale_parent_id_unique\` ON \`forms_blocks_number_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_select_options_locales_locale_parent_id_unique\` ON \`forms_blocks_select_options_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_select_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_select_locales_locale_parent_id_unique\` ON \`forms_blocks_select_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_state_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_state\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_state_locales_locale_parent_id_unique\` ON \`forms_blocks_state_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_text_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_text_locales_locale_parent_id_unique\` ON \`forms_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_textarea\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_blocks_textarea_locales_locale_parent_id_unique\` ON \`forms_blocks_textarea_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms_emails_locales\` (
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_emails\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_emails_locales_locale_parent_id_unique\` ON \`forms_emails_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_locales\` (
  	\`submit_button_label\` text,
  	\`confirmation_message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`forms_locales_locale_parent_id_unique\` ON \`forms_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`search_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`relation_to\` text,
  	\`category_i_d\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`search_categories_order_idx\` ON \`search_categories\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_categories_parent_id_idx\` ON \`search_categories\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`search\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`priority\` numeric,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`search_slug_idx\` ON \`search\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`search_meta_meta_image_idx\` ON \`search\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`search_updated_at_idx\` ON \`search\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`search_locales_locale_parent_id_unique\` ON \`search_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`search_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_posts_id_idx\` ON \`search_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`,
  )
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(
    sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_folders_folder_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_folders_folder_type_order_idx\` ON \`payload_folders_folder_type\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_folders_folder_type_parent_idx\` ON \`payload_folders_folder_type\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_folders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`folder_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_folders_name_idx\` ON \`payload_folders\` (\`name\`);`)
  await db.run(
    sql`CREATE INDEX \`payload_folders_folder_idx\` ON \`payload_folders\` (\`folder_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_folders_updated_at_idx\` ON \`payload_folders\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_folders_created_at_idx\` ON \`payload_folders\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`media_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	\`redirects_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`search_id\` integer,
  	\`payload_folders_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_folders_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_payload_folders_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_folders_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`,
  )
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
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_posts_id_idx\` ON \`header_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`footer_nav_items_order_idx\` ON \`footer_nav_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`footer_nav_items_parent_id_idx\` ON \`footer_nav_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_posts_id_idx\` ON \`footer_rels\` (\`posts_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_hero_links\`;`)
  await db.run(sql`DROP TABLE \`richtext-content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`bg_hero_grad_actions\`;`)
  await db.run(sql`DROP TABLE \`bg_hero_grad\`;`)
  await db.run(sql`DROP TABLE \`bg_bento_cards\`;`)
  await db.run(sql`DROP TABLE \`bg_bento\`;`)
  await db.run(sql`DROP TABLE \`bg_tabs_tabs\`;`)
  await db.run(sql`DROP TABLE \`bg_tabs\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_actions\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`faq_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_media_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_gallery\`;`)
  await db.run(sql`DROP TABLE \`reviews\`;`)
  await db.run(sql`DROP TABLE \`testi_car\`;`)
  await db.run(sql`DROP TABLE \`prc_tbl_plans_features\`;`)
  await db.run(sql`DROP TABLE \`prc_tbl_plans\`;`)
  await db.run(sql`DROP TABLE \`prc_tbl\`;`)
  await db.run(sql`DROP TABLE \`bg_logos_logos\`;`)
  await db.run(sql`DROP TABLE \`bg_logos\`;`)
  await db.run(sql`DROP TABLE \`bg_time_events\`;`)
  await db.run(sql`DROP TABLE \`bg_time\`;`)
  await db.run(sql`DROP TABLE \`bg_metrics_stats\`;`)
  await db.run(sql`DROP TABLE \`bg_metrics\`;`)
  await db.run(sql`DROP TABLE \`blk_split_ban_content_actions\`;`)
  await db.run(sql`DROP TABLE \`blk_split_ban\`;`)
  await db.run(sql`DROP TABLE \`blk_table_headers\`;`)
  await db.run(sql`DROP TABLE \`blk_table_rows_cells\`;`)
  await db.run(sql`DROP TABLE \`blk_table_rows\`;`)
  await db.run(sql`DROP TABLE \`blk_table_column_mapping\`;`)
  await db.run(sql`DROP TABLE \`blk_table\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_button_atom\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_atom\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_badge_atom\`;`)
  await db.run(sql`DROP TABLE \`at_alrt\`;`)
  await db.run(sql`DROP TABLE \`at_sep\`;`)
  await db.run(sql`DROP TABLE \`at_prog\`;`)
  await db.run(sql`DROP TABLE \`at_img\`;`)
  await db.run(sql`DROP TABLE \`at_icn\`;`)
  await db.run(sql`DROP TABLE \`at_vid\`;`)
  await db.run(sql`DROP TABLE \`at_tip\`;`)
  await db.run(sql`DROP TABLE \`at_avg_users\`;`)
  await db.run(sql`DROP TABLE \`at_avg\`;`)
  await db.run(sql`DROP TABLE \`at_acc_items\`;`)
  await db.run(sql`DROP TABLE \`at_acc\`;`)
  await db.run(sql`DROP TABLE \`at_stk\`;`)
  await db.run(sql`DROP TABLE \`at_crd\`;`)
  await db.run(sql`DROP TABLE \`at_tog\`;`)
  await db.run(sql`DROP TABLE \`b_comp_sec_columns\`;`)
  await db.run(sql`DROP TABLE \`b_comp_sec\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_links\`;`)
  await db.run(sql`DROP TABLE \`_richtext-content_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`_bg_hero_grad_v_actions\`;`)
  await db.run(sql`DROP TABLE \`_bg_hero_grad_v\`;`)
  await db.run(sql`DROP TABLE \`_bg_bento_v_cards\`;`)
  await db.run(sql`DROP TABLE \`_bg_bento_v\`;`)
  await db.run(sql`DROP TABLE \`_bg_tabs_v_tabs\`;`)
  await db.run(sql`DROP TABLE \`_bg_tabs_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_actions\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_faq_items_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_grid_features\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_media_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_image_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_image_gallery\`;`)
  await db.run(sql`DROP TABLE \`_reviews_v\`;`)
  await db.run(sql`DROP TABLE \`_testi_car_v\`;`)
  await db.run(sql`DROP TABLE \`_prc_tbl_v_plans_features\`;`)
  await db.run(sql`DROP TABLE \`_prc_tbl_v_plans\`;`)
  await db.run(sql`DROP TABLE \`_prc_tbl_v\`;`)
  await db.run(sql`DROP TABLE \`_bg_logos_v_logos\`;`)
  await db.run(sql`DROP TABLE \`_bg_logos_v\`;`)
  await db.run(sql`DROP TABLE \`_bg_time_v_events\`;`)
  await db.run(sql`DROP TABLE \`_bg_time_v\`;`)
  await db.run(sql`DROP TABLE \`_bg_metrics_v_stats\`;`)
  await db.run(sql`DROP TABLE \`_bg_metrics_v\`;`)
  await db.run(sql`DROP TABLE \`_blk_split_ban_v_content_actions\`;`)
  await db.run(sql`DROP TABLE \`_blk_split_ban_v\`;`)
  await db.run(sql`DROP TABLE \`_blk_table_v_headers\`;`)
  await db.run(sql`DROP TABLE \`_blk_table_v_rows_cells\`;`)
  await db.run(sql`DROP TABLE \`_blk_table_v_rows\`;`)
  await db.run(sql`DROP TABLE \`_blk_table_v_column_mapping\`;`)
  await db.run(sql`DROP TABLE \`_blk_table_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_button_atom\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_text_atom\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_badge_atom\`;`)
  await db.run(sql`DROP TABLE \`_at_alrt_v\`;`)
  await db.run(sql`DROP TABLE \`_at_sep_v\`;`)
  await db.run(sql`DROP TABLE \`_at_prog_v\`;`)
  await db.run(sql`DROP TABLE \`_at_img_v\`;`)
  await db.run(sql`DROP TABLE \`_at_icn_v\`;`)
  await db.run(sql`DROP TABLE \`_at_vid_v\`;`)
  await db.run(sql`DROP TABLE \`_at_tip_v\`;`)
  await db.run(sql`DROP TABLE \`_at_avg_v_users\`;`)
  await db.run(sql`DROP TABLE \`_at_avg_v\`;`)
  await db.run(sql`DROP TABLE \`_at_acc_v_items\`;`)
  await db.run(sql`DROP TABLE \`_at_acc_v\`;`)
  await db.run(sql`DROP TABLE \`_at_stk_v\`;`)
  await db.run(sql`DROP TABLE \`_at_crd_v\`;`)
  await db.run(sql`DROP TABLE \`_at_tog_v\`;`)
  await db.run(sql`DROP TABLE \`_b_comp_sec_v_columns\`;`)
  await db.run(sql`DROP TABLE \`_b_comp_sec_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`posts_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`categories_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms_emails_locales\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`forms_locales\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`search_categories\`;`)
  await db.run(sql`DROP TABLE \`search\`;`)
  await db.run(sql`DROP TABLE \`search_locales\`;`)
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_folders_folder_type\`;`)
  await db.run(sql`DROP TABLE \`payload_folders\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_nav_items\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
}
