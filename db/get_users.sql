select u.id,username,gender,profession from users u join 
preferences p on u.id = p.user_id;