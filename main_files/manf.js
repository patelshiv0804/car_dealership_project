const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


// Search Routes
// carmanufacturers
app.get('/search/carmanufacturers', function (req, res) {
  const id = req.query.id;
  const query = 'SELECT * FROM carmanufacturers where manufacturer_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json({ message: "success", data: results });
  });
});
// carmodel
app.get('/search/carmodel', function (req, res) {
  const id = req.query.id;
  const query = 'SELECT * FROM carmodel where model_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json({ message: "success", data: results });
  });
});
//carparts

app.get('/search/carparts', function (req, res) {
  const id = req.query.id;
  const query = 'SELECT * FROM carparts where part_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json({ message: "success", data: results });
  });
});
//car_price
app.get('/search/car_price', function (req, res) {
  const id = req.query.id;
  const query = 'SELECT * FROM car_price where price_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json({ message: "success", data: results });
  });
});

//customer
app.get('/search/customer', function (req, res) {
  const id = req.query.id;
  const query = 'SELECT * FROM customer where customer_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json({ message: "success", data: results });
  });
});

//supplier
app.get('/search/supplier', function (req, res) {
  const id = req.query.id;
  const query = 'SELECT * FROM supplier where Supplier_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json({ message: "success", data: results });
  });
});

//orders
app.get('/search/orders', function (req, res) {
  const id = req.query.id;
  const query = 'SELECT * FROM orders where order_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json({ message: "success", data: results });
  });
});

//quality-control
app.get('/search/quality-control', function (req, res) {
  const id = req.query.id;
  const query = 'SELECT * FROM quality-control where quality_control_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json({ message: "success", data: results });
  });
});

//variant
app.get('/search/variant', function (req, res) {
  const id = req.query.id;
  const query = 'SELECT * FROM variant where variant_id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.status(200).json({ message: "success", data: results });
  });
});


// Handle form submission
app.post('/carmodel', function (req, res) {
  var modelName = req.body.modelName;
  var modelId = req.body.modelId;
  var manufacturerId = req.body.manufacturerId;
  var productionYear = req.body.productionYear;
  var engineType = req.body.engineType;
  var fuelType = req.body.fuelType;
  var colorOptions = req.body.colorOptions;
  var seatingCapacity = req.body.seatingCapacity;

  var sql = "INSERT INTO carmodel (model_name, model_id, manufacturer_id, production_year, engine_type, fuel_type, color_options, seating_capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  var values = [modelName, modelId, manufacturerId, productionYear, engineType, fuelType, colorOptions, seatingCapacity];

  connection.query(sql, values, function (error, result) {
    if (error) {
      console.error('Error inserting data into database: ' + error.stack);
      res.status(500).send('Error inserting data into database');
      return;
    }
    res.send('Car Model data inserted successfully');
  });
});
app.post('/manu', function (req, res) {
  var manId = req.body.manid;
  var manName = req.body.man_name;
  var manLoc = req.body.man_loc;
  var proCap = req.body.pro_cap;
  var establishedYear = req.body.year;

  var sql = "INSERT INTO carmanufacturers (manufacturer_ID, manufacturer_name, manufacturer_location, production_capacity, established_year) VALUES (?, ?, ?, ?, ?)";
  var values = [manId, manName, manLoc, proCap, establishedYear];

  connection.query(sql, values, function (error, result) {
    if (error) {
      console.error('Error inserting data into database: ' + error.stack);
      res.status(500).send('Error inserting data into database');
      return;
    }
    res.send('Manufacturer data inserted successfully');
  });
});
app.post('/customer', function (req, res) {
  var customerId = req.body.customerId;
  var customerName = req.body.customerName;
  var modelId = req.body.modelId;
  var variantId = req.body.variantId;
  var priceId = req.body.priceId;
  var finalPrice = req.body.finalPrice;
  var paymentMode = req.body.paymentMode;

  var sql = "INSERT INTO customer (customer_id, customer_name, model_id, variant_id, price_id, final_price, payment_mode) VALUES (?, ?, ?, ?, ?, ?, ?)";
  var values = [customerId, customerName, modelId, variantId, priceId, finalPrice, paymentMode];

  connection.query(sql, values, function (error, result) {
    if (error) {
      console.error('Error inserting data into database: ' + error.stack);
      res.status(500).send('Error inserting data into database');
      return;
    }
    res.send('Customer data inserted successfully');
  });
});


app.post('/supplier', function (req, res) {
  var supplierId = req.body.Supplier_ID;
  var supplierName = req.body.Supplier_Name;
  var supplierLocation = req.body.Supplier_Location;
  var maid = req.body.maid;
  var contactEmail = req.body.Contact_email;
  var contactPhone = req.body.Contact_phone;
  var productsSupplied = req.body.Products_Supplied;

  var sql = "INSERT INTO supplier (Supplier_ID, Supplier_Name, Supplier_Location, model_id, Contact_email, Contact_phone, Products_Supplied) VALUES (?, ?, ?, ?, ?, ?, ?)";
  var values = [supplierId, supplierName, supplierLocation, maid, contactEmail, contactPhone, productsSupplied];

  connection.query(sql, values, function (error, result) {
    if (error) {
      console.error('Error inserting data into database: ' + error.stack);
      res.status(500).send('Error inserting data into database');
      return;
    }

    res.send('Supplier data inserted successfully');

  });

});

app.post('/variant', function (req, res) {
  var variantId = req.body.variant_id;
  var modelId = req.body.model_id;
  var variantName = req.body.variant_name;
  var variantDescription = req.body.variant_description;
  var additionalFeatures = req.body.additional_features;
  var variantPrice = req.body.variant_price;

  var sql = "INSERT INTO variant (variant_id, model_id, variant_name, variant_description, additional_features, variant_price) VALUES (?, ?, ?, ?, ?, ?)";
  var values = [variantId, modelId, variantName, variantDescription, additionalFeatures, variantPrice];

  connection.query(sql, values, function (error, result) {
    if (error) {
      console.error('Error inserting data into database: ' + error.stack);
      res.status(500).send('Error inserting data into database');
      return;
    }
    res.send('Variant data inserted successfully');
  });
});

app.post('/quality_control', function (req, res) {
  var qualityControlId = req.body.quality_control_id;
  var modelId = req.body.model_id;
  var inspectionDate = req.body.inspection_date;
  var inspectorId = req.body.inspector_id;
  var result = req.body.result;
  var comments = req.body.comments;
  var testingCriteria = req.body.testing_criteria;
  var crashTestPercentage = req.body.crash_test_percentage;

  var sql = "INSERT INTO qualitycontrol (quality_control_id, model_id, inspection_date, inspector_id, result, comments, testing_criteria, crash_test_percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  var values = [qualityControlId, modelId, inspectionDate, inspectorId, result, comments, testingCriteria, crashTestPercentage];

  connection.query(sql, values, function (error, result) {
    if (error) {
      console.error('Error inserting data into database: ' + error.stack);
      res.status(500).send('Error inserting data into database');
      return;
    }
    res.send('Quality Control data inserted successfully');
  });
});

app.post('/order', function (req, res) {
  var orderId = req.body.order_id;
  var customerId = req.body.customer_id;
  var orderDate = req.body.order_date;
  var deliveryAddress = req.body.delivery_address;

  var deliveryDate = req.body.delivery_date;
  var paymentMethod = req.body.payment_method;
  var orderStatus = req.body.order_status;
  var totalAmount = req.body.total_amount;

  var sql = "INSERT INTO orders (order_id, customer_id, order_date, delivery_address, delivery_date, payment_method, order_status, total_amount) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)";
  var values = [orderId, customerId, orderDate, deliveryAddress, deliveryDate, paymentMethod, orderStatus, totalAmount];

  connection.query(sql, values, function (error, result) {
    if (error) {
      console.error('Error inserting data into database: ' + error.stack);
      res.status(500).send('Error inserting data into database');
      return;
    }
    res.send('Order data inserted successfully');
  });
});

app.post('/car_price', function (req, res) {
  var priceId = req.body.price_id;
  var modelId = req.body.model_id;
  var onRoadPrice = req.body.on_road_price;
  var discountPercentage = req.body.discount_percentage;
  var finalPrice = req.body.final_price;
  var paymentMode = req.body.payment_mode;

  var sql = "INSERT INTO car_price (price_id, model_id, on_road_price, discount_percentage, final_price, payment_mode) VALUES (?, ?, ?, ?, ?, ?)";
  var values = [priceId, modelId, onRoadPrice, discountPercentage, finalPrice, paymentMode];

  connection.query(sql, values, function (error, result) {
    if (error) {
      console.error('Error inserting data into database: ' + error.stack);
      res.status(500).send('Error inserting data into database');
      return;
    }
    res.send('Car Price data inserted successfully');
  });
});

app.post('/car_parts', function (req, res) {
  var partId = req.body.part_id;
  var partName = req.body.part_name;
  var partDescription = req.body.part_description;
  var partCategory = req.body.part_category;
  var supplierId = req.body.Supplier_ID;
  var partPrice = req.body.part_price;
  var quantityInStock = req.body.quantity_in_stock;
  var reorderLevel = req.body.reorder_level;

  var sql = "INSERT INTO carparts (part_id, part_name, part_description, part_category, Supplier_ID, part_price, quantity_in_stock, reorder_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  var values = [partId, partName, partDescription, partCategory, supplierId, partPrice, quantityInStock, reorderLevel];

  connection.query(sql, values, function (error, result) {
    if (error) {
      console.error('Error inserting data into database: ' + error.stack);
      res.status(500).send('Error inserting data into database');
      return;
    }
    res.send('Car Parts data inserted successfully');
  });
});


// Handle form submission for deleting data
app.post('/delete', function (req, res) {
  var deleteModelId = req.body.deleteModelId;

  // First, delete rows from the car_price table
  var deleteCarPriceSql = "DELETE FROM car_price WHERE model_id = ?";
  var carPriceValues = [deleteModelId];

  connection.query(deleteCarPriceSql, carPriceValues, function (error, result) {
    if (error) {
      console.error('Error deleting data from car_price table: ' + error.stack);
      res.status(500).send('Error deleting data from car_price table');
      return;
    }

    // After deleting from car_price table, delete from carmodel table
    var deleteCarModelSql = "DELETE FROM carmodel WHERE model_id = ?";
    var carModelValues = [deleteModelId];

    connection.query(deleteCarModelSql, carModelValues, function (error, result) {
      if (error) {
        console.error('Error deleting data from carmodel table: ' + error.stack);
        res.status(500).send('Error deleting data from carmodel table');
        return;
      }
      res.send('Car Model data deleted successfully');
    });
  });
});
app.post('/smo', function (req, res) {
  var mid = req.body.mid;
  var searchManufacturerSql = "SELECT * FROM carmodel WHERE model_id = ?";
  var manufacturerValues = [mid];
  connection.query(searchManufacturerSql, manufacturerValues, function (error, results) {
    if (error) {
      console.error('Error searching for data: ' + error.stack);
      res.status(500).send('Error searching for data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('ID not found');
      return;
    }
    const searchDataMessage = `The search data for ID ${mid}:`;
    res.json({ message: searchDataMessage, data: results });
  });
});
app.post('/delman', function (req, res) {
  var delmanid = req.body.delmanid;

  // After deleting from car_price table, delete from carmodel table
  var deleteCarModelSql = "DELETE FROM carmanufacturers WHERE manufacturer_id = ?";
  var carModelValues = [delmanid];

  connection.query(deleteCarModelSql, carModelValues, function (error, result) {
    if (error) {
      console.error('Error deleting data from table: ' + error.stack);
      res.status(500).send('Error deleting data from table');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('Manufacturer ID not found');
      return;
    }

    console.log(result)
    res.send('Car Model data deleted successfully');
  });
});
app.post('/delprice', function (req, res) {
  var pid = req.body.pid;

  // After deleting from car_price table, delete from carmodel table
  var deleteCarModelSql = "DELETE FROM car_price WHERE price_id = ?";
  var carModelValues = [pid];

  connection.query(deleteCarModelSql, carModelValues, function (error, result) {
    if (error) {
      console.error('Error deleting data from table: ' + error.stack);
      res.status(500).send('Error deleting data from table');
      return;
    }

    // added by shiv
    if (result.affectedRows === 0) {
      res.status(404).send('carmodel ID not found');
      return;
    }

    console.log(result)

    // -- //
    res.send('Car Model data deleted successfully');
  });
});
app.post('/cp', function (req, res) {
  var piid = req.body.piid;
  var searchManufacturerSql = "SELECT * FROM car_price WHERE price_id = ?";
  var manufacturerValues = [piid];
  connection.query(searchManufacturerSql, manufacturerValues, function (error, results) {
    if (error) {
      console.error('Error searching for data: ' + error.stack);
      res.status(500).send('Error searching for data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('ID not found');
      return;
    }
    const searchDataMessage = `The search data for ID ${piid}:`;
    res.json({ message: searchDataMessage, data: results });
  });
});
app.post('/delcust', function (req, res) {
  var cid = req.body.cid;

  // After deleting from car_price table, delete from carmodel table
  var deleteCarModelSql = "DELETE FROM customer WHERE customer_id = ?";
  var carModelValues = [cid];

  connection.query(deleteCarModelSql, carModelValues, function (error, result) {
    if (error) {
      console.error('Error deleting data from table: ' + error.stack);
      res.status(500).send('Error deleting data from table');
      return;
    }

    // added by shiv 
    if (result.affectedRows === 0) {
      res.status(404).send('customer ID not found');
      return;
    }

    console.log(result)

    //--//

    res.send('Car Model data deleted successfully');
  });
});

app.post('/delsup', function (req, res) {
  var sid = req.body.sid;

  // After deleting from car_price table, delete from carmodel table
  var deleteCarModelSql = "DELETE FROM supplier WHERE Supplier_ID = ?";
  var carModelValues = [sid];

  connection.query(deleteCarModelSql, carModelValues, function (error, result) {
    if (error) {
      console.error('Error deleting data from table: ' + error.stack);
      res.status(500).send('Error deleting data from table');
      return;
    }

    // added by shiv 
    if (result.affectedRows === 0) {
      res.status(404).send('supplier ID not found');
      return;
    }

    console.log(result)

    //--//

    res.send('Car Model data deleted successfully');
  });
});
app.post('/delord', function (req, res) {
  var oid = req.body.oid;

  // After deleting from car_price table, delete from carmodel table
  var deleteCarModelSql = "DELETE FROM orders WHERE order_id = ?";
  var carModelValues = [oid];

  connection.query(deleteCarModelSql, carModelValues, function (error, result) {
    if (error) {
      console.error('Error deleting data from table: ' + error.stack);
      res.status(500).send('Error deleting data from table');
      return;
    }

    // added by shiv 
    if (result.affectedRows === 0) {
      res.status(404).send('order ID not found');
      return;
    }

    console.log(result)

    //--//

    res.send('Car Model data deleted successfully');
  });
});
app.post('/ord1', function (req, res) {
  var oid = req.body.oid;
  var searchManufacturerSql = "SELECT * FROM orders WHERE order_id = ?";
  var manufacturerValues = [oid];
  connection.query(searchManufacturerSql, manufacturerValues, function (error, results) {
    if (error) {
      console.error('Error searching for data: ' + error.stack);
      res.status(500).send('Error searching for data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('ID not found');
      return;
    }
    const searchDataMessage = `The search data for  ID ${oid}:`;
    res.json({ message: searchDataMessage, data: results });
  });
});

app.post('/delcon', function (req, res) {
  var qid = req.body.qid;

  // After deleting from car_price table, delete from carmodel table
  var deleteCarModelSql = "DELETE FROM qualitycontrol WHERE quality_control_id = ?";
  var carModelValues = [qid];

  connection.query(deleteCarModelSql, carModelValues, function (error, result) {
    if (error) {
      console.error('Error deleting data from table: ' + error.stack);
      res.status(500).send('Error deleting data from table');
      return;
    }

    // added by shiv 
    if (result.affectedRows === 0) {
      res.status(404).send('ID not found');
      return;
    }

    console.log(result)

    //--//
    res.send('Car Model data deleted successfully');
  });
});
app.post('/delvar', function (req, res) {
  var Vid = req.body.Vid;

  // After deleting from car_price table, delete from carmodel table
  var deleteCarModelSql = "DELETE FROM variant WHERE variant_id = ?";
  var carModelValues = [Vid];

  connection.query(deleteCarModelSql, carModelValues, function (error, result) {
    if (error) {
      console.error('Error deleting data from table: ' + error.stack);
      res.status(500).send('Error deleting data from table');
      return;
    }

    // added by shiv 
    if (result.affectedRows === 0) {
      res.status(404).send('ID not found');
      return;
    }

    console.log(result)

    //--//


    res.send('Car Model data deleted successfully');
  });
});
app.post('/vart', function (req, res) {
  var varid = req.body.varid;
  var searchManufacturerSql = "SELECT * FROM variant WHERE variant_id = ?";
  var manufacturerValues = [varid];
  connection.query(searchManufacturerSql, manufacturerValues, function (error, results) {
    if (error) {
      console.error('Error searching for data: ' + error.stack);
      res.status(500).send('Error searching for data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('ID not found');
      return;
    }
    const searchDataMessage = `The search data for  ID ${varid}:`;
    res.json({ message: searchDataMessage, data: results });
  });
});
app.post('/delpart', function (req, res) {
  var paid = req.body.paid;

  // After deleting from car_price table, delete from carmodel table
  var deleteCarModelSql = "DELETE FROM carparts WHERE part_id = ?";
  var carModelValues = [paid];

  connection.query(deleteCarModelSql, carModelValues, function (error, result) {
    if (error) {
      console.error('Error deleting data from table: ' + error.stack);
      res.status(500).send('Error deleting data from table');
      return;
    }
    // added by shiv 
    if (result.affectedRows === 0) {
      res.status(404).send('ID not found');
      return;
    }

    console.log(result)

    //--//

    res.send('Car Model data deleted successfully');
  });
});

app.post('/sman', function (req, res) {
  var manid = req.body.manid;

  var searchManufacturerSql = "SELECT * FROM carmanufacturers WHERE manufacturer_id = ?";
  var manufacturerValues = [manid];

  connection.query(searchManufacturerSql, manufacturerValues, function (error, results) {
    if (error) {
      console.error('Error searching for data: ' + error.stack);
      res.status(500).send('Error searching for data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Manufacturer not found');
      return;
    }
    const searchDataMessage = `The search data for Manufacturer ID ${manid}:`;
    const messageLines = searchDataMessage.split('\n');
    const responseData = {
      message: messageLines,
      data: results
    };

    res.json(responseData);
  });
});
app.post('/sp', function (req, res) {
  var sid = req.body.sid;
  var searchManufacturerSql = "SELECT * FROM supplier WHERE Supplier_ID = ?";
  var manufacturerValues = [sid];
  connection.query(searchManufacturerSql, manufacturerValues, function (error, results) {
    if (error) {
      console.error('Error searching for data: ' + error.stack);
      res.status(500).send('Error searching for data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('ID not found');
      return;
    }
    const searchDataMessage = `The search data for Supplier ID ${sid}:`;
    res.json({ message: searchDataMessage, data: results });
  });
});

app.post('/cust', function (req, res) {
  var ciid = req.body.ciid;

  var searchManufacturerSql = "SELECT * FROM customer WHERE customer_id = ?";
  var manufacturerValues = [ciid];

  connection.query(searchManufacturerSql, manufacturerValues, function (error, results) {
    if (error) {
      console.error('Error searching for data: ' + error.stack);
      res.status(500).send('Error searching for data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('ID not found');
      return;
    }
    const searchDataMessage = `The search data for ID ${ciid}:`;
    res.json({ message: searchDataMessage, data: results });
  });
});
app.post('/part', function (req, res) {
  var parid = req.body.parid;

  var searchManufacturerSql = "SELECT * FROM carparts WHERE part_id= ?";
  var manufacturerValues = [parid];

  connection.query(searchManufacturerSql, manufacturerValues, function (error, results) {
    if (error) {
      console.error('Error searching for data: ' + error.stack);
      res.status(500).send('Error searching for data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('ID not found');
      return;
    }
    const searchDataMessage = `The search data for ID ${parid}:`;
    res.json({ message: searchDataMessage, data: results });
  });
});
app.post('/qua', function (req, res) {
  var quid = req.body.quid;

  var searchManufacturerSql = "SELECT * FROM qualitycontrol WHERE quality_control_id = ?";
  var manufacturerValues = [quid];

  connection.query(searchManufacturerSql, manufacturerValues, function (error, results) {
    if (error) {
      console.error('Error searching for data: ' + error.stack);
      res.status(500).send('Error searching for data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('ID not found');
      return;
    }
    const searchDataMessage = `The search data for ID ${quid}:`;
    res.json({ message: searchDataMessage, data: results });
  });
});
app.post('/car1model', function (req, res) {
  // Retrieve data from request body
  var model_name = req.body.model_name;
  var manufacturer_id = req.body.manufacturer_id;
  var production_year = req.body.production_year;
  var engine_type = req.body.engine_type;
  var fuel_type = req.body.fuel_type;
  var color_options = req.body.color_options;
  var seating_capacity = req.body.seating_capacity;
  var model_id = req.body.model_id;

  // SQL query for updating car model record
  var sql = "UPDATE carmodel SET model_name = ?, manufacturer_id = ?, production_year = ?, engine_type = ?, fuel_type = ?, color_options = ?, seating_capacity = ? WHERE model_id = ?";

  // Execute the SQL query
  connection.query(sql, [model_name, manufacturer_id, production_year, engine_type, fuel_type, color_options, seating_capacity, model_id], function (error, result) {
    if (error) {
      console.error('Error in updating  data into database: ' + error.stack);
      res.status(500).send('Error update data into database');
      return;
    }
    res.send('updated successfully');
  });
});

// Route to handle clicks on Manufacturing Unit button
app.get('/manufacturing-unit', (req, res) => {
  const query = 'SELECT * FROM carmanufacturers';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});
app.get('/car_model', (req, res) => {
  const query = 'SELECT * FROM carmodel';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});

app.get('/prices', (req, res) => {
  const query = 'SELECT * FROM car_price';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});
app.get('/car_supplier', (req, res) => {
  const query = 'SELECT * FROM supplier';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});
app.get('/custom', (req, res) => {
  const query = 'SELECT * FROM Customer';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});
app.get('/Order', (req, res) => {
  const query = 'SELECT * FROM Orders';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});
app.get('/Variant', (req, res) => {
  const query = 'SELECT * FROM Variant';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});
app.get('/control', (req, res) => {
  const query = 'SELECT * FROM QualityControl';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});
app.get('/part', (req, res) => {
  const query = 'SELECT * FROM CarParts';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});
app.get('/invent', (req, res) => {
  const query = 'SELECT * FROM Inventory';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});
app.post('/update-variant', function (req, res) {
  // Retrieve data from request body
  var variant_id = req.body.variant_id;
  var model_id = req.body.model_id;
  var variant_name = req.body.variant_name;
  var variant_description = req.body.variant_description;
  var additional_features = req.body.additional_features;
  var variant_price = req.body.variant_price;

  // SQL query for updating variant record
  var sql = "UPDATE variant SET model_id = ?, variant_name = ?, variant_description = ?, additional_features = ?, variant_price = ? WHERE variant_id = ?";

  // Execute the SQL query
  connection.query(sql, [model_id, variant_name, variant_description, additional_features, variant_price, variant_id], function (error, result) {
    if (error) {
      console.error('Error in updating data into database: ' + error.stack);
      res.status(500).send('Error updating data into database');
      return;
    }
    res.send('Updated successfully');
  });
});

// Update endpoint for carmanufacturers table
app.post('/update-carmanufacturers', function (req, res) {
  // Retrieve data from request body
  var manufacturer_id = req.body.manufacturer_id;
  var manufacturer_name = req.body.manufacturer_name;
  var manufacturer_location = req.body.manufacturer_location;
  var production_capacity = req.body.production_capacity;
  var established_year = req.body.established_year;

  // SQL query for updating carmanufacturers record
  var sql = "UPDATE carmanufacturers SET manufacturer_name = ?, manufacturer_location = ?, production_capacity = ?, established_year = ? WHERE manufacturer_id = ?";

  // Execute the SQL query
  connection.query(sql, [manufacturer_name, manufacturer_location, production_capacity, established_year, manufacturer_id], function (error, result) {
    if (error) {
      console.error('Error in updating data into database: ' + error.stack);
      res.status(500).send('Error updating data into database');
      return;
    }
    res.send('Updated successfully');
  });
});
app.post('/update-supplier', function (req, res) {
  // Retrieve data from request body
  var Supplier_ID = req.body.Supplier_ID;
  var Supplier_Name = req.body.Supplier_Name;
  var Supplier_Location = req.body.Supplier_Location;
  var model_id = req.body.model_id;
  var Contact_email = req.body.Contact_email;
  var Contact_phone = req.body.Contact_phone;
  var Products_Supplied = req.body.Products_Supplied;

  // SQL query for updating supplier record
  var sql = "UPDATE supplier SET Supplier_Name = ?, Supplier_Location = ?, model_id = ?, Contact_email = ?, Contact_phone = ?, Products_Supplied = ? WHERE Supplier_ID = ?";

  // Execute the SQL query
  connection.query(sql, [Supplier_Name, Supplier_Location, model_id, Contact_email, Contact_phone, Products_Supplied, Supplier_ID], function (error, result) {
    if (error) {
      console.error('Error in updating data into database: ' + error.stack);
      res.status(500).send('Error updating data into database');
      return;
    }
    res.send('Updated successfully');
  });
});

// Update endpoint for orders table
app.post('/update-orders', function (req, res) {
  // Retrieve data from request body
  var order_id = req.body.order_id;
  var customer_id = req.body.customer_id;
  var order_date = req.body.order_date;
  var delivery_address = req.body.delivery_address;
  var delivery_date = req.body.delivery_date;
  var payment_method = req.body.payment_method;
  var order_status = req.body.order_status;
  var total_amount = req.body.total_amount;

  // SQL query for updating orders record
  var sql = "UPDATE orders SET customer_id = ?, order_date = ?, delivery_address = ?, delivery_date = ?, payment_method = ?, order_status = ?, total_amount = ? WHERE order_id = ?";

  // Execute the SQL query
  connection.query(sql, [customer_id, order_date, delivery_address, delivery_date, payment_method, order_status, total_amount, order_id], function (error, result) {
    if (error) {
      console.error('Error in updating data into database: ' + error.stack);
      res.status(500).send('Error updating data into database');
      return;
    }
    res.send('Updated successfully');
  });
});

// Update endpoint for quality_control table
app.post('/update-quality-control', function (req, res) {
  // Retrieve data from request body
  var quality_control_id = req.body.quality_control_id;
  var model_id = req.body.model_id;
  var inspection_date = req.body.inspection_date;
  var inspector_id = req.body.inspector_id;
  var result = req.body.result;
  var comments = req.body.comments;
  var testing_criteria = req.body.testing_criteria;
  var crash_test_percentage = req.body.crash_test_percentage;

  // SQL query for updating quality_control record
  var sql = "UPDATE qualitycontrol SET model_id = ?, inspection_date = ?, inspector_id = ?, result = ?, comments = ?, testing_criteria = ?, crash_test_percentage = ? WHERE quality_control_id = ?";

  // Execute the SQL query
  connection.query(sql, [model_id, inspection_date, inspector_id, result, comments, testing_criteria, crash_test_percentage, quality_control_id], function (error, result) {
    if (error) {
      console.error('Error in updating data into database: ' + error.stack);
      res.status(500).send('Error updating data into database');
      return;
    }
    res.send('Updated successfully');
  });
});

// Update endpoint for customer table
app.post('/update-customer', function (req, res) {
  // Retrieve data from request body
  var customer_id = req.body.customer_id;
  var customer_name = req.body.customer_name;
  var model_id = req.body.model_id;
  var variant_id = req.body.variant_id;
  var price_id = req.body.price_id;
  var final_price = req.body.final_price;
  var payment_mode = req.body.payment_mode;

  // SQL query for updating customer record
  var sql = "UPDATE customer SET customer_name = ?, model_id = ?, variant_id = ?, price_id = ?, final_price = ?, payment_mode = ? WHERE customer_id = ?";

  // Execute the SQL query
  connection.query(sql, [customer_name, model_id, variant_id, price_id, final_price, payment_mode, customer_id], function (error, result) {
    if (error) {
      console.error('Error in updating data into database: ' + error.stack);
      res.status(500).send('Error updating data into database');
      return;
    }
    res.send('Updated successfully');
  });
});
app.post('/update-car-price', function (req, res) {
  // Retrieve data from request body
  var price_id = req.body.price_id;
  var model_id = req.body.model_id;
  var on_road_price = req.body.on_road_price;
  var discount_percentage = req.body.discount_percentage;
  var final_price = req.body.final_price;
  var payment_mode = req.body.payment_mode;

  // SQL query for updating car_price record
  var sql = "UPDATE car_price SET model_id = ?, on_road_price = ?, discount_percentage = ?, final_price = ?, payment_mode = ? WHERE price_id = ?";

  // Execute the SQL query
  connection.query(sql, [model_id, on_road_price, discount_percentage, final_price, payment_mode, price_id], function (error, result) {
    if (error) {
      console.error('Error in updating data into database: ' + error.stack);
      res.status(500).send('Error updating data into database');
      return;
    }
    res.send('Updated successfully');
  });
});
app.post('/update-carparts', function (req, res) {
  // Retrieve data from request body
  var part_id = req.body.part_id;
  var part_name = req.body.part_name;
  var part_description = req.body.part_description;
  var part_category = req.body.part_category;
  var Supplier_ID = req.body.Supplier_ID;
  var part_price = req.body.part_price;
  var quantity_in_stock = req.body.quantity_in_stock;
  var reorder_level = req.body.reorder_level;

  // SQL query for updating carparts record
  var sql = "UPDATE carparts SET part_name = ?, part_description = ?, part_category = ?, Supplier_ID = ?, part_price = ?, quantity_in_stock = ?, reorder_level = ? WHERE part_id = ?";

  // Execute the SQL query
  connection.query(sql, [part_name, part_description, part_category, Supplier_ID, part_price, quantity_in_stock, reorder_level, part_id], function (error, result) {
    if (error) {
      console.error('Error in updating data into database: ' + error.stack);
      res.status(500).send('Error updating data into database');
      return;
    }
    res.send('Updated successfully');
  });
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/insert.html');
});

// Start the server
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
