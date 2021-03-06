import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import service from "./service";
import PostItem from "./PostItem";
import WhatsHappening from "./WhatsHappening";
import {ADMIN, TRAVELLER} from "../../constants/userConst";

const selectAllPosts = (state) => state.scrapPost;


const ScrapPosts = ({user}) => {
    const selectorPosts = useSelector(selectAllPosts);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => service.findAllPosts().then(posts => setPosts(posts)), []);
    const loggedIn = JSON.stringify(user) !== "{}"

    return (
        <>
            {loggedIn && user.type !== ADMIN
                ? <div className={"col-12"}>
                    <WhatsHappening loggedIn={loggedIn} user={user}/>
                </div> : <></>
            }
            <ul className="list-group">
                {
                    posts.map((post, key) =>
                        <PostItem loggedIn={loggedIn} postData={post} user={user} key={key}/>
                    )
                }
            </ul>

        </>
    )
}

export default ScrapPosts;