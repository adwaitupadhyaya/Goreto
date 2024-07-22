import { Knex } from "knex";

const TABLE_NAME = "itinerary_locations";

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
      .bigInteger("location_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("locations");
    table
      .bigInteger("itinerary_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("itineraries");
    table.integer("day").notNullable;
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
