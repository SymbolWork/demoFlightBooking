BEGIN
  IF inUserID=0 THEN
    SELECT user.first_name as fn,
             user.last_name as ln,
             user.profile_pic as pc,
             article.id as aid,
             article.user_id as uid,
             article.title as titl,
             article.description as des,
             article.short_description as SD,
             article.article_type as atyp,
             article.created_at as crt,
             article.updated_at as upd,
             article.primary_image as pi,
             COUNT(distinct view.id) as cview,
             COUNT(distinct clieks.id) as clike,
             COUNT(distinct cmt.id) as ccomment
        FROM af_users.user_details user
        INNER JOIN af_articles.article_details article on user.id = article.user_id and article.isApproved = 1 and article.title = inTitle and article.id = inId
        LEFT JOIN af_articles.article_views view on article.id = view.article_id
        LEFT JOIN af_articles.article_likes clieks on article.id = clieks.article_id
        LEFT JOIN af_articles.article_comment cmt on article.id = cmt.article_id
        GROUP BY article.id ORDER BY article.updated_at DESC;
    ELSE
      SELECT user.first_name as fn,
             user.last_name as ln,
             user.profile_pic as pc,
             article.id as aid,
             article.user_id as uid,
             article.title as titl,
             article.description as des,
             article.short_description as SD,
             article.article_type as atyp,
             article.created_at as crt,
             article.updated_at as upd,
             bookmark.id as bid,
             alike.id as lid,
             article.primary_image as pi,
             COUNT(distinct view.id) as cview,
             COUNT(distinct clieks.id) as clike,
             COUNT(distinct cmt.id) as ccomment
        FROM af_users.user_details user
        INNER JOIN af_articles.article_details article on user.id = article.user_id 
        and article.isApproved = 1 and article.title = inTitle and article.id = inId
        LEFT JOIN af_articles.article_bookmark bookmark on article.id = bookmark.article_id && bookmark.user_id = inUserID
        LEFT JOIN af_articles.article_likes alike on article.id = alike.article_id && alike.user_id = inUserID
        LEFT JOIN af_articles.article_views view on article.id = view.article_id
        LEFT JOIN af_articles.article_likes clieks on article.id = clieks.article_id
        LEFT JOIN af_articles.article_comment cmt on article.id = cmt.article_id GROUP BY article.id ORDER BY article.updated_at DESC;
    END IF;
END