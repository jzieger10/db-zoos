const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const server = express();

server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);
// endpoints here

server.get("/", (req, res) => {
	res.status(200).send("API working");
});

// ZOO ENDPOINTS

server.get("/api/zoos", (req, res) => {
	db("zoos")
		.then(zoos => {
			res.status(201).json(zoos);
		})
		.catch(err => res.status(500).json({
      error: "There has been a server error on the GET route",
      err,
    }));
});

server.get("/api/zoos/:id", (req, res) => {
	db("zoos")
		.where({ id: req.params.id })
		.then(zoo => {
			res.status(201).json(zoo);
		})
		.catch(err => res.status(500).json({
      error: "There has been a server error on the GET route",
      err,
    }));
});

server.post("/api/zoos", (req, res) => {
	if (req.body.name) {
		db("zoos")
			.insert(req.body)
			.then(ids => {
				res.status(201).json(ids);
			})
			.catch(err => {
				res.status(500).json({
					error: "There has been a server error on the POST route",
					err,
				});
			});
	} else {
		res.status(400).json({ error: "You must include a name" });
	}
});

server.delete("/api/zoos/:id", (req, res) => {
	db("zoos")
		.where({ id: req.params.id })
		.del()
		.then(count => {
			if (count > 0) {
				res.status(201).json({
					message: `${count} record has been deleted.`,
				});
			} else {
				res.status(404).json({
					error: `The requested ID does not exist`,
				});
			}
		})
		.catch(err => {
			res.status(500).json({
        error: "There has been a server error on the DELETE route",
        err,
      });
		});
});

server.put("/api/zoos/:id", (req, res) => {
	db("zoos")
		.where({ id: req.params.id })
		.update(req.body)
		.then(count => {
			if (count > 0) {
				res.status(201).json({
					message: `${count} record has been updated.`,
				});
			} else {
				res.status(404).json({
					error: `The requested ID does not exist`,
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				error: "There has been a server error on the PUT route",
				err,
			});
		});
});

// THERE BE BEARS BELOW

server.get("/api/bears", (req, res) => {
	db("bears")
		.then(bears => {
			res.status(200).json(bears);
		})
		.catch(err =>
			res
				.status(500)
				.json({
					error: "There has been a server error on the PUT route",
					err,
				})
		);
});

server.post("/api/bears", (req, res) => {
	if (req.body.name) {
		db("bears")
			.insert(req.body)
			.then(ids => {
				res.status(201).json(ids);
			})
			.catch(err => {
				res.status(500).json({
					error: "There has been a server error on the PUT route",
					err,
				});
			});
	} else {
		res.status(400).json({ error: "You must include a name" });
	}
});

server.delete("/api/bears/:id", (req, res) => {
	db("bears")
		.where({ id: req.params.id })
		.del()
		.then(count => {
			res.status(201).json(count);
		})
		.catch(err => {
			res.status(500).json({
        error: "There has been a server error on the DELETE route",
        err,
      });
		});
});

server.put("/api/bears/:id", (req, res) => {
	db("bears")
		.where({ id: req.params.id })
		.update(req.body)
		.then(count => {
			res.status(201).json(count);
		})
		.catch(err => {
			res.status(500).json({
        error: "There has been a server error on the PUT route",
        err,
      });
		});
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
