UPDATE products
SET name=$1,
    description=$2,
    unitprice=$3,
    imageurl=$4
WHERE
  products.id=$5
