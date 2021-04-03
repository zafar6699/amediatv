exports.Profile = (req, res) => {
    res.render("./main/profile", { title: "Profile", layout: "layout" })
}