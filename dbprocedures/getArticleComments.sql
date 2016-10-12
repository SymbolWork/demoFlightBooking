SELECT user.first_name AS fn, user.id AS uid, user.last_name AS ln, user.profile_pic AS pc, cmt.id AS cid, cmt.comments AS cmt, cmt.comment_time AS ctme, rpl.id AS rid, rpl.reply AS rpl, rpl.reply_time AS rtme, rpl.user_id AS ruid, ruser.first_name AS rfn, ruser.last_name AS rln, ruser.profile_pic AS rpc
FROM af_users.user_details user
INNER JOIN af_articles.article_comment cmt ON user.id = cmt.user_id && cmt.article_id = iArticleId
LEFT JOIN af_articles.article_comment_reply rpl ON cmt.id = rpl.comment_id
LEFT JOIN af_users.user_details ruser ON ruser.id = rpl.user_id
ORDER BY cmt.comment_time DESC