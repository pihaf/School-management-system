function routes(app) {
	// app.use("/api", apiRoutes);
	app.use("/", (req, res) => res.render("home"));

	app.use("/login", (req, res) => {
		res.render("studentViews/login");
	});

	app.use("/search", (req, res) => {
		res.render("search");
	});
}

module.exports = routes;
