import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../api/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {

        const params = useParams();
        const [post, setPost] = useState({});
        const [comments, setComments] = useState([]);

        const [fetchPostId, isLoadingId, idError] = useFetching(async id => {
            const response = await PostService.getById(id);
            setPost(response.data)
        })

        const [fetchComments, isCommentsLoading, commentsError] = useFetching(async id => {
            const response = await PostService.getCommentsByPostId(id);
            setComments(response.data)
        })

        useEffect(() => {
            fetchPostId(params.id)
            fetchComments(params.id)
        }, [])

        return (
            <div>
                <h1>You opened post page c ID = {params.id}</h1>
                {isLoadingId
                    ? <Loader/>
                    : <div>{post.id}. {post.title}</div>
                }
                <hr style={{margin: '15px 0'}}/>
                <h2>Comments</h2>
                {isCommentsLoading
                    ? <Loader/>
                    : <div>
                        {comments.map(comm =>
                            <div key={comm.id} style={{marginTop: 15}}>
                                <h5>{comm.email}</h5>
                                <div>{comm.body}</div>
                            </div>
                        )}
                    </div>
                }
            </div>
        );
    }
;

export default PostIdPage;