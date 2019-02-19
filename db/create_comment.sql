insert into comments(comment,personCommenting,ownerOfPost,post_id)
values($1,$2,$3,$4);
select * from comments;