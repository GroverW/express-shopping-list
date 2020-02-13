const items = require("./fakeDb");
const { patchItem, deleteItem } = require("./helpers");
const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
	return res.json(items);
});

router.post("/", (req, res) => {
	let item = req.body;

	items.push(item);

	return res.json({
		added : item
	});
});

router.get("/:name", (req, res) => {
	let itemReq = req.params.name;
	let item = items.find((i) => i.name === itemReq);

	return item ? res.json(item) : res.json({ error: "item not found" });
});

router.patch("/:name", (req, res) => {
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

	return found ? res.json({ updated: items[i] }) : res.json({ error: "item not found" });
});

router.delete("/:name", (req, res) => {
	let itemReq = req.params.name;
	let found = false;

	for (let i = 0; i < items.length; i++) {
		if (items[i].name === itemReq) {
			found = true;
			deleteItem(i, items);
			break;
		}
	}

	// return (found ?
	//   res.json({ message: "deleted" }) :
	//   res.json({ 'error': 'item not found' }));
	return res.json(found ? { message: "deleted" } : { error: "item not found" });
});

module.exports = router;
