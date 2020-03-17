const express = require('express');
const app = express();
const data = require('../data/data.json');
const port = process.env.PORT || 3000;

app.use(express.json())

const paginateRecords = (records, skip, limit) => records.slice(skip, limit + skip);

const sortRecords = (records, sortOrder, sortBy) => records.sort((a, b) => {
  if (sortOrder === 'desc') {
    if (a[sortBy] < b[sortBy]) return 1;
    if (a[sortBy] > b[sortBy]) return -1;
  } else {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
  }

  return 0;
});

const filterRecords = (records, filters) => {
  if (!filters.length) return records;
  const nextRecords = [];
  const filterCategories = new Set(filters.map(f => f.category));

  records.forEach(record => {
    const matchedCategories = [];
    //
    filters.forEach(filter => {
      if (record[filter.category] === filter.name) {
        matchedCategories.push(filter.category);
      }
    });

    if (filterCategories.size === matchedCategories.length) {
      nextRecords.push(record);
    }
  })

  return nextRecords;
}

app.get('/api/transactions', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const sortOrder = req.query.sortOrder || 'desc';
  const sortBy = req.query.sortBy || 'account';
  const skip = req.query.skip ? Number.parseInt(req.query.skip) : 0;
  const limit = req.query.limit ? Number.parseInt(req.query.limit) : 60;
  const filters = req.query.filters ? JSON.parse(req.query.filters) : [];

  let nextData = [...data.transactions] || [];
  const totalRecords = nextData.length;
  nextData = filterRecords(nextData, filters)
  nextData = sortRecords(nextData, sortOrder, sortBy);
  nextData = paginateRecords(nextData, skip, limit);

  res.send({
    transactions: nextData,
    total: totalRecords,
  });
});

app.get('/api/transactions/:iban', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const currentTransaction = data.transactions.find(item => item.iban === req.params.iban)
  res.send(currentTransaction);
});


app.listen(port, () => {
  console.log(`listeneing on port ${port}`)
});