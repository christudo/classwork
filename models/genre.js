const genres = [
  {name: "Fiction", genreId: "1"},
  {name: "Science Fiction", genreId: "2"},
  {name: "Documentary", genreId: "3"},
];

exports.add = (genre) => {
    genres.push(genre);
  }

  exports.get = (idx) => {
    return genres[idx];
  }  

  exports.update = (genre) => {
    const index = genres.findIndex(g => g.genreId === genre.genreId);
    if (index !== -1) {
        genres[index] = genre;
    }
}

  exports.upsert = (genre) => {
    if (genre.genreId) {
      exports.update(genre);
    } else {
      exports.add(genre);
    }
  }

 exports.all = genres;