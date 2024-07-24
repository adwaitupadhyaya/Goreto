import { Knex } from "knex";

const TABLE_NAME = "photos";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string("photo_url", 500).notNullable();
    table
      .bigInteger("itinerary_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("itineraries");
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
