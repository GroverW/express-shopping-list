process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");

describe("GET /items", () => {
	// beforeEach(()=>{

	// });
	// afterEach(()=>{

	// })

	it("should get all items", async function() {
		const resp = await request(app).get("/items");
		expect(resp.statusCode).toBe(200);

		expect(resp.body).toEqual([ { name: "popsicle", price: 1.45 }, { name: "cheerios", price: 3.4 } ]);
	});
});
