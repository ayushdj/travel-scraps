
import React from "react";
import {useDispatch} from "react-redux";
import "./index.css"


const ProfilePage = ({profile}) => {

    const dispatch = useDispatch();
    // const editProfileClickHandler = () => {
    //     dispatch({type: 'edit-profile', profile});
    // }

    const formatDate = (dateString) => {
        switch (dateString.split("/").length) {
            case 2:
                const dateSplit = dateString.split("/")
                const newDateString = dateSplit[0] + "/1/" + dateSplit[1]
                return new Date(newDateString).toLocaleDateString('en-us', {month:"long", year:"numeric"})
            default:
                return new Date(dateString).toLocaleDateString('en-us', {month:"long", day:"numeric", year:"numeric"})

        }
    }

    return(
        <div>
            <div className="row">
                <div className="col-1">
                    <i className="fas fa-arrow-left fa-1x"/>

                </div>
                <div className="col-11">
                    <div className="wd-emphasis">Hearna Won </div>
                    <div className="wd-normal">5196 Tweets</div>
                </div>

            </div>
            <div>
                <div className="position-relative">
                    <img className="pos-absolute w-100" src="../../../images/banner-default.jpg" alt="banner"/>

                    <div className="pos-profile wd-zindex-bring-to-front">
                        <img className="rounded-circle wd-profile border wd-white-ex"
                             src="../../../images/profile-default.png" alt="profile"/>
                    </div>
                </div>

                <div className="mt-2 float-end"><a className="btn btn-outline-dark wd-round" href="#section">Edit Profile</a></div>

                <br/>
                <div className="mt-5">
                    <div>
                        <div className="wd-emphasis">Name</div>
                        <div className="wd-normal">@handle</div>
                        <p className="wd-paragraph pt-2">
                            bio
                        </p>

                        <div className="wd-normal pb-2">
                                    <span className="me-4">
                                        <i className="fas fa-map-marker-alt pe-1"/>
                                        location
                                    </span>

                            <span className="me-4">
                                        <i className="fas fa-birthday-cake pe-1"></i>
                                         Born date
                                    </span>

                            <span className="me-4">
                                        <i className="far fa-calendar pe-1"></i>
                                         Joined date
                                    </span>

                        </div>

                        <div className="wd-normal">
                            <span className="pe-2"><b className="text-white">12</b>  Following</span>
                            <b className="text-white">123</b>  Followers</div>
                    </div>
                </div>
                <br/>

            </div>

        </div>
    );
}
export default ProfilePage;