module.exports = {
  getUsers: (req, res) => {
    const db = req.app.get("db");
    db.get_users()
      .then(response => res.status(200).json(response))
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  filteredUsers: (req, res) => {
    const db = req.app.get("db");
    const { gender, pets } = req.query;
    console.log(req.query);
    db.filtered_users([gender, pets])
      .then(response => res.status(200).json(response))
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  userProfile: (req, res) => {
    const db = req.app.get("db");
    console.log(req.params.id);
    db.user_profile([req.params.id])
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })

      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  addImage: (req, res) => {
    const db = req.app.get("db");
    console.log(req.body);
    db.add_image([req.body.image,req.body.id])
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })

      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
};
