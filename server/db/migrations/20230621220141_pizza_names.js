exports.up = function(knex) {
    return knex.schema.createTable('pizza_names',(table) => {
      table.increments('id').primary();
      table.string('pizza_name');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pizza_names');
  };