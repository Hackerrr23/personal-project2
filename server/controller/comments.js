module.exports = {
  createComment: (req, res) => {
    const db = req.app.get("db");
    const { comment,personCommenting,poster, id } = req.body;
    console.log(req.body);
    db.create_comment([comment,personCommenting,poster, id])
      .then(response => res.status(200).json(response))
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  getComments: (req, res) => {
    const db = req.app.get("db");
    db.get_comments()
      .then(response => res.status(200).json(response))
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
};
