import type { Knex } from 'knex';

const tableName = 'users';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, table => {
    table.increments('id').primary();
    
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
