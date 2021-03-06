const URL = 'http://localhost:4000/db/who/service';

export const findAllWho = (dispatch) =>
    fetch(URL)
        .then(response => response.json())
        .then(who =>
            dispatch({
                type: 'fetch-all-who',
                who
            }));

export default {
    findAllWho
};