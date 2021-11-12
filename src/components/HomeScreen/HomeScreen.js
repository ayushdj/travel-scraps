import React from "react";
import NavigationSidebar from "../NavigationSidebar/NavigationSidebar";
import HomeComponent from "./HomeComponent";
import WhoToFollowList from "../WhoToFollow/WhoToFollowList";
import who from "../WhoToFollow/who.json"
import CountDown from "../CountDownComponent/CountDown";

const HomeScreen = () => {
    return (
        <div className={"row mt-2"}>
            <div className={"col-2 col-md-2 col-lg-1 col-xl-2"}>
                <NavigationSidebar active="home"/>
            </div>
            <div className={"col-xxl-6 col-xl-6 col-lg-7 col-md-10 col-sm-10 mt-2 border-1 border-dark"}
                 style={{"position": "relative"}}>
                <HomeComponent/>
            </div>
            <div className={"d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4"}>
                <div className="row mb-4">
                    <WhoToFollowList who={who}/>
                </div>
                <div className="row mt-4">
                    <CountDown/>
                </div>
            </div>
        </div>
    );
};
export default HomeScreen;