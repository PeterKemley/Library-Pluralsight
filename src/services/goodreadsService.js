function goodreadsService() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      resolve({ desvription: 'our description' });
    });
  }
  return { getBookById };
}

module.exports = goodreadsService;
