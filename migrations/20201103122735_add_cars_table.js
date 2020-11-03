exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments("id");
    tbl.string("make", 100).notNullable();
    tbl.string("model", 100).notNullable();
    tbl.string("VIN", 100).unique().notNullable();
    tbl.integer("mileage").notNullable();
    tbl.string("transmission", 100);
    tbl.string("title");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
