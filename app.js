const express = require('express');
const items = require('./fakeDb');
const { patchItem, deleteItem } = require('./helpers')

const app = express();

app.use(express.json());

app.get('/items', (req, res) => {
  return res.json(items);
});

app.post('/items', (req, res) => {
  let item = req.body;

  items.push(item);

  return res.json({
    "added": item
  });
});

app.get('/items/:name', (req, res) => {
  let itemReq = req.params.name;

  let item = items.find(i => i.name === itemReq)

  return item ? res.json(item) : res.json({ 'error': 'item not found' });
});

app.patch('/items/:name', (req, res) => {
  let itemReq = req.params.name;
  let itemPatch = req.body;
  let found = false;
  let i = 0;

  while (i < items.length) {
    if (items[i].name === itemReq) {
      found = true;
      patchItem(items[i], itemPatch);
      break;
    }

    i++;
  }

  return (found ?
    res.json({ updated: items[i] }) :
    res.json({ 'error': 'item not found' }));
});

app.delete('/items/:name', (req, res) => {
  let itemReq = req.params.name;
  let found = false;

  for(let i = 0; i < items.length; i++) {
    if (items[i].name === itemReq) {
      found = true;
      deleteItem(i, items);
      break;
    }
  }

  return (found ?
    res.json({ message: "deleted" }) :
    res.json({ 'error': 'item not found' }));
});

app.listen(5000, () => {
  console.log('App is listening on port 5000');
})