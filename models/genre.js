/*
const genres = [
  {name: "Fiction", genreId: "1"},
  {name: "Science Fiction", genreId: "2"},
  {name: "Documentary", genreId: "3"},
];
*/
const db = require('../database');

exports.all = async () => {
  const { rows } = await db.getPool().query('select * from genres order by id');
  return db.camelize(rows);
}

exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from genres where id = $1", [id])
  return db.camelize(rows)[0]
 }
 
 exports.create = async (name) => {
  return db.getPool().query("INSERT INTO genres(name) VALUES($1) RETURNING *", [name]);
 }
 
 exports.update = async (id, name) => {
  return db.getPool().query("UPDATE genres SET name = $1 where id = $2 RETURNING *", [name, id]);
 }
 
 exports.upsert = async (genre) => {
  if (genre.id) {
    return exports.update(genre.id, genre.name)
  }
  return exports.create(genre.name)
 } 
 