module.exports = {
    preferences: (req, res) => {
        const db = req.app.get('db');
        const {rooms,gender,smoke,pets,profession,bio,user_id} = req.body
        console.log(req.body)
        db.insert_pref([rooms,gender,smoke,pets,profession,bio,user_id])
          .then(response => res.status(200).json(response))
          .catch(err => {
            res.status(500).send({ errorMessage: "Something went wrong" });
            console.log(err);
          });
      },
      currentUserPref: (req, res) => {
        const db = req.app.get('db');
     
        console.log(req.params)
        db.getCurrent_pref([req.params.id])
          .then(response => res.status(200).json(response))
          .catch(err => {
            res.status(500).send({ errorMessage: "Something went wrong" });
            console.log(err);
          });
      },
      me : (req,res) => {
        if(req.session.user){
            // console.log(req.session)
            res.json(req.session.user)
        } else {
            res.status(401).json({error: "please login"})
        }        
    }
}