module.exports = {
  createPost: (req, res) => {
    const db = req.app.get("db");
    const { title, type, post, user } = req.body;
    console.log(req.body);
    db.insert_post([title, type, post, user])
      .then(response => res.status(200).json(response))
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  getPosts: (req, res) => {
    const db = req.app.get("db");
    console.log(req.body);
    db.get_posts()
      .then(response => res.status(200).json(response))
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
};
