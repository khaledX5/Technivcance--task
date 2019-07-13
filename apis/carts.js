const {connection } = require('./../main.js');



let deleteCartItem = async (req, res) => {
  let cartId = req.params.id;
  let result;


  await connection.connect();

  let cart = await connection.query('SELECT * FROM carts WHERE id=$1', [cartId]);

  if(!cart.rows.length)
    return res.status(400).send({error: 'Item not found in cart'});

  try {
    result = await connection.query('DELETE FROM carts WHERE id=$1', [cartId]);
  } catch (e) {
    res.status(400).send(e);
  }

  if(result)
    res.send({result: 'Item removed from cart successfully'});

  await connection.end();
};


module.exports = {
  deleteCartItem
}
