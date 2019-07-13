const {connection } = require('./../main.js');



let deleteFromCart = async (req, res) => {
  let itemId = req.params.id;
  let response;
  await connection.connect();


  try {
    response = await connection.query(`DELETE FROM carts WHERE item_id=${itemId}`);
  } catch (e) {
    res.status(400).send(e);
  }

  if(response)
    res.send({response: 'sucess'});

  await connection.end();
};


module.exports = {
  deleteFromCart
}
