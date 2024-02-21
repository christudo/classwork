const genres = [
    {"id": 1, "name": "Fiction"},
    {"id": 2, "name": "Science Fiction"},
    {"id": 3, "name": "Documentary"},
]

exports.add = (newGenre) => {
    genres.push(newGenre);
  }

  exports.get = (idx) => {
    return genres[idx];
  }  

  exports.update = (updatedGenre) => {
    genres[updatedGenre.id - 1] = updatedGenre;
  }  
  
  exports.upsert = (genre) => {
    if (genre.id) {
      exports.update(genre);
    } else {
      exports.add(genre);
    }
  }
  
  exports.all = genres;