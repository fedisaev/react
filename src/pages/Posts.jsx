import React, {useEffect, useRef, useState} from 'react';
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../api/PostService";
import {getPageCount} from "../components/utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data]);
        const totalCount = (response.headers['x-total-count']);
        setTotalPages(getPageCount(totalCount, limit))
    })

    const createPost = newPost => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit])

    const removePost = post => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = page => {
        setPage(page);
    }

    return (
        <div className={'App'}>
            <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect value={limit}
                      onChange={value => setLimit(value)}
                      defaultValue={'Amount of elements on the page'}
                      options={[
                          {value: 5, name: '5'},
                          {value: 10, name: '10'},
                          {value: 15, name: '15'},
                          {value: -1, name: 'Show all'},
                      ]}
            />
            {postError && <h1>An error has occurred {postError}</h1>}
            <PostList remove={removePost}
                      posts={sortedAndSearchedPosts}
                      title={'Posts list 1'}
            />
            <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
            {isPostsLoading && <Loader/>}
            <Pagination page={page}
                        changePage={changePage}
                        totalPages={totalPages}
            />
        </div>
    );
};

export default Posts;