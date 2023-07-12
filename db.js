const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './web.db',
    },
    pool: { min: 0, max: 7 },
    useNullAsDefault: true,
});

(async function() {
    try {

        // Create a table
        await knex.schema
            // .createTable('users', table => {
            //     table.increments('id');
            //     table.string('username');
            //     table.string('email');
            //     table.string('password');
            // })
            // // ...and another
            // .createTable('products', table => {
            //     table.increments('id');
            //     table.string('brand');
            //     table.string('name');
            //     table.string('image');
            //     table.decimal('price', 8, 2)
            // }).createTable('carts', table => {

            //     table.integer('product_id')
            //         .unsigned()
            //         .references('products.id');
            //     table
            //         .integer('user_id')
            //         .unsigned()
            //         .references('users.id');
            //     table.integer('count');
            // })
            // .createTable('orders', table => {
            //     table.increments('id');
            //     table
            //         .integer('user_id')
            //         .unsigned()
            //         .references('users.id');
            //     table.json('items');
            //     table.decimal('total', 8, 2)
            // })
            // .createTable('comments', table => {
            //     table.increments('id');
            //     table
            //         .integer('product_id')
            //         .unsigned()
            //         .references('products.id');
            //     table.string('username');
            //     table.string('content');
            //     table.timestamp("created_at").defaultTo(knex.fn.now());
            // })
    } catch (e) {
        console.error(e);
    };
})()


module.exports = knex
