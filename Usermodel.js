const client=require("./databaseconfig")
const cassandra = require("cassandra-driver");
const Mapper = cassandra.mapping.Mapper;
const mapper = new Mapper(client, {
  models: { disaterUser: { tables: ["disateruser"] } },
});
const userMapper = mapper.forModel("disaterUser");
module.exports = userMapper;
