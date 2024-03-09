process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDB");
// const Test = require("supertest/lib/test");

let btc = { name: "Bitcoin", price: 68163.20 };

beforeEach(function () {
    items.push(btc);
});

afterEach(function () {
    // this *mutates*, not redefines, `items`
    items.length = 0;
});

describe("GET /items", function () {
    test("GET all the items in the shopping list", async function () {
        const res = await request(app).get("/items");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([btc])
    });

    test("GET one item by name", async function () {
        const res = await request(app).get("/items/Bitcoin");

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual("Bitcoin");
        expect(res.body.price).toEqual(68163.20);
    });

    test("Item not in shopping list", async function () {
        const res = await request(app).get("/items/Cash");

        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", function () {
    test("ADD an item to the shopping list", async function () {
        const res = await request(app)
            .post("/items")
            .send({name: "popsicle", price: 23});

        expect(res.statusCode).toBe(201);
        expect(items.length).toEqual(2)
    });

    test("Missing value", async function () {
        const res = await request(app)
            .post("/items")
            .send({ name: "cheerios"});

        expect(res.statusCode).toBe(400);
    });
});

describe("PATCH /items/:name", function () {
    test("Update an item in the list", async function () {
        const res = await request(app)
            .patch("/items/Bitcoin")
            .send({ name: "BTC", price: 68163.20 });
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "BTC", price: 68163.20 } });
    });

    test("Missing value", async function () {
        const res = await request(app)
            .patch("/items/Bitcoin")
            .send({ name: "cheerios" });

        expect(res.statusCode).toBe(400);
    });

    test("Item not in the list", async function () {
        const res = await request(app)
            .patch("/items/Cash")
            .send({ name: "BTC", price: 68163.20 });

        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function () {
    test("Remove an item from the list", async function () {
        const res = await request(app)
            .delete("/items/Bitcoin");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Item Deleted." });
    });

    test("Item not in the list", async function () {
        const res = await request(app)
            .delete("/items/Cash");

        expect(res.statusCode).toBe(404);
    });
});