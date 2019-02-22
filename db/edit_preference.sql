UPDATE preferences set rooms = $1,gender = $2,smoke = $3,pets = $4,profession = $5, bio = $6
WHERE  user_id = $7;
SELECT * FROM preferences WHERE user_id = $7; 