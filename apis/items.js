const { connection } = require('./../main.js');


let listItems = async (req, res) => {
  let reqHeaders = req.headers;
  let queryString = 'SELECT * FROM items';

  let page = reqHeaders.page, items_per_page = reqHeaders.items_per_page;

  await   connection.connect();

  if (page) {
    let offset = (page - 1) * items_per_page;
    queryString = `SELECT * FROM items ORDER BY id LIMIT ${items_per_page} OFFSET ${offset}`;
  }

  try {
   await connection.query('SELECT * from items', function (err, items) {
                    if (err) throw err
                    res.send(items);
                  })
    await connection.end();

  } catch (e) {
    res.status(400).send(e);
  }
};



module.exports = {
  listItems
}
