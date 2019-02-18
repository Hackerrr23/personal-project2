SELECT * FROM users join preferences on users.id = preferences.user_id
where preferences.gender = $1 
and preferences.pets = $2;