const knex = require('knex')

const connectedKnex = knex({
    client : "sqlite3",
    connection: {
        filename: "radiobaseDB.sqlite3"
    },
    useNullAsDefault: true
})

module.exports = connectedKnex