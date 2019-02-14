select * from users join preferences on
 users.id = preferences.user_id where users.id = $1;


-- select * from users in (select smoke,pets,profession,bio FROM preferences)
-- where users.id = preferences.user_id