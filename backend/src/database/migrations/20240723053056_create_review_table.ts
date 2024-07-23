import { Knex } from "knex";

const TABLE_NAME = "reviews";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table
      .bigInteger("itinerary_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("itineraries");

    table
      .bigInteger("reviewed_by")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    table.float("rating").unsigned().notNullable();

    table.string("content", 1000).nullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table.timestamp("updated_at").nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
