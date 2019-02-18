DELETE FROM preferences where user_id = $1
returning *;