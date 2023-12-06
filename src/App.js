import React, {useState} from 'react';
import './styles/App.css';
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";

const App = () => {

    const [posts] = useState([
        {id: 1, title: 'Javascript', body: 'Javascript is programming language'},
        {id: 2, title: 'Javascript1', body: 'Javascript1 is programming language'},
        {id: 3, title: 'Javascript2', body: 'Javascript2 is programming language'}
    ])


    return (
        <div className={'App'}>
            <form>
                <input type="text" placeholder={'Post title'}/>
                <input type="text" placeholder={'Post description'}/>
                <MyButton disabled>Create post</MyButton>
            </form>
            <PostList posts={posts} title={'Posts list 1'}/>
        </div>
    );
};

export default App;
