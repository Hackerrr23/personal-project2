module.exports = {
  createComment: (req, res) => {
    const db = req.app.get("db");
    const { postOwner, comment, personCommenting } = req.body;
    console.log(req.body);
    db.insert_comment([postOwner, comment, personCommenting])
      .then(response => res.status(200).json(response))
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
};
