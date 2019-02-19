module.exports = {
    getNotifications: (req, res) => {
        const db = req.app.get('db');

        console.log(req.params)
        db.get_notifications([req.params.id])
          .then(response => res.status(200).json(response))
          .catch(err => {
            res.status(500).send({ errorMessage: "Something went wrong" });
            console.log(err);
          });
      }
    }