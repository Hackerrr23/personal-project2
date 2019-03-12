select u.id,username,profile_pic,gender,profession from users u join 
preferences p on u.id = p.user_id order by id desc;