import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import useStyles from "../Auth/styles";
import signUpService from "../Auth/signUpService";
import loginService from "../Auth/loginService";
import calendarService from "../CalendarComponent/service";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Style"
import countDownService from "../CountDownComponent/service";
import {ADMIN, TRAVELGUIDE, TRAVELLER} from "../../constants/userConst"

const initialState = {
    firstName: '',
    lastName: '',
    userName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const Login = () => {

    // save all input changes in setProfile, not setUser
    // setUser changes are unstable, all the setUser changes can be lost when user register/login reloads aka. it puts {} for user.
    const userNameChangeHandler = (event) => {
        const userName = event.target.value;
        const newUser = {
            ...user,
            userName: userName
        };
        setUser(newUser);

        const newProfile = {
            ...profile,
            userName: userName
        };
        setProfile(newProfile);
    }

    const passwordChangeHandler = (event) => {
        const password = event.target.value;
        const newUser = {
            ...user,
            password: password
        };
        setUser(newUser);

        const newProfile = {
            ...profile,
            password: password
        };
        setProfile(newProfile);
    }

    const firstNameChangeHandler = (event) => {
        const firstName = event.target.value;
        const newProfile = {
            ...profile,
            firstName: firstName
        };
        setProfile(newProfile);
    }

    const lastNameChangeHandler = (event) => {
        const lastName = event.target.value;
        const newProfile = {
            ...profile,
            lastName: lastName
        };
        setProfile(newProfile);
    }

    const emailChangeHandler = (event) => {
        const email = event.target.value;
        const newProfile = {
            ...profile,
            email: email
        };
        setProfile(newProfile);
    }

    const dobChangeHandler = (event) => {
        const dateOfBirth = event.target.value;
        const newProfile = {
            ...profile,
            dateOfBirth: dateOfBirth
        };
        setProfile(newProfile);
    }


    const [user, setUser] = useState({});
    const history = useHistory();
    const login = () => {
        const newUser = {userName: profile.userName, password: profile.password}
        alert(`Brave user trying to login ${JSON.stringify(newUser)}`)
        fetch(`http://localhost:4000/api/login`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 403) {
                    alert("Cannot find username. Please register.")
                    history.push("/login")
                } else {
                    history.push("/home")
                    window.location.reload()
                }

            })
        // alert(`this is promise ${promise}`)
        // history.push('/home');
        // window.location.reload();

    }

    const processRegister = () => {
        console.log("Inside process register");
        const role = getUserType()
        console.log("role", role);

        const newProfile = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            userName: profile.userName,
            dateOfBirth: profile.date,
            email: profile.email,
            password: profile.password,
            type: role,
            comments: [],
            scrapPosts: [],
            likes: [],
            bio: "",
            website: "",
            profilePicture: "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1-705x705.jpg",
            bannerPicture: "https://atiinc.org/wp-content/uploads/2017/01/cover-default.jpg",
            location: "",
        }
        alert(JSON.stringify(newProfile))
        register(newProfile)
    }

    const register = (newProfile) => {
        {
            console.log("API user for registered: ", `http://localhost:4000/api/register`);
            console.log("API user:", newProfile);
            alert(`API user: ${JSON.stringify(newProfile)}`)
            fetch(`http://localhost:4000/api/register`, {
                method: 'POST',
                body: JSON.stringify(newProfile),
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 404)
                        alert("username already exists! Pick a different username")
                    else {
                        alert("signup success!")
                    }

                }).then(() => getProfilePrivacy()).then(() => window.location.reload()).catch(error => console.log("Signup failed", error))
        }
    };

    const getProfile = async () => {
        await fetch(`http://localhost:4000/api/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(user => {
                setUser(user);
                history.push(`/home`)
            })
        // .catch(() => history.push('/login'));
    }

    const getProfilePrivacy = async () => {
        await fetch(`http://localhost:4000/api/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(user => {
                setUser(user);
                history.push(`/privacy`)
            }).catch((error) => console.log("testing if get profile privacy fails", error));
    }

    useEffect(getProfile, [history]);

    const [profile, setProfile] = useState(initialState);

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const getUserType = () => {
        console.log("Getting user type");
        const radios = document.getElementsByName('user-role');
        console.log("radios", radios)
        for (const radio of radios) {
            console.log("Radio", radio.checked);
            if (radio.checked) {
                console.log("checked", radio.value)
                return radio.value;
            }
        }
    }

    const handleSubmit = () => {
        console.log("Trying to sign up");
        if (isSignup) {
            console.log("Sign up true", isSignup);
            processRegister()
            history.push("/privacy");
            //window.location.reload();
        } else {
            login()
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up'
                    : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>

                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name"
                                       handleChange={firstNameChangeHandler} autoFocus half/>
                                <Input name="lastName" label="Last Name"
                                       handleChange={lastNameChangeHandler}
                                       half/>
                                <Input name="email" label="Email Address"
                                       handleChange={emailChangeHandler}
                                       type="email"/>
                                <Input name="dateOfBirth" type="date"
                                       handleChange={dobChangeHandler}/>
                                <br/>
                                <div className={"row ms-3"}>
                                    <label>User Role</label>
                                </div>
                                <div className={"row ms-3"}>
                                    <div className={"col-4"}>
                                        <input className={"ms-3"} type="radio" value={TRAVELLER}
                                               name="user-role" id="radio-traveler"/><br/>
                                        <label className={"ms-1"}>Traveler</label>
                                    </div>
                                    <div className="col-4">
                                        <input className={"ms-4"} type="radio" value= {TRAVELGUIDE}
                                               name="user-role" id="radio-guide"/><br/>
                                        <label className={"ms-1"}>Travel guide</label><br/>
                                    </div>
                                    <div className="col-4">
                                        <input className={"ms-4"} type="radio" value= {ADMIN}
                                               name="user-role" id="radio-admin"/><br/>
                                        <label className={"ms-1"}>Admin</label><br/>
                                    </div>
                                </div>
                            </>
                        )}
                        <Input
                            name="username" label="Username"
                            type="username"
                            value={user.userName}
                            handleChange={userNameChangeHandler}
                            onChange={(e) => setUser({...user, userName: e.target.value})}/>
                        <Input
                            name="password" label="Password"
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                            value={user.password}
                            handleChange={passwordChangeHandler}
                            onChange={(e) => setUser({...user, password: e.target.value})}/>
                        {isSignup && <Input name="confirmPassword" label="Confirm Password" type="password"/>}

                    </Grid>

                    <Grid>
                        {isSignup ? <Button
                                type="signUp" fullWidth variant="contained" color="primary"
                                className={classes.signUp}>
                                <Typography component={Link} to="/home" className={"text-white"}
                                            style={{textDecoration: 'none'}}
                                            align="center">Sign Up</Typography>
                            </Button>
                            :
                            <Button
                                type="signUp" fullWidth variant="contained" color="primary"
                                className={classes.signUp}>
                                <Typography component={Link} to="/home" className={"text-white"}
                                            style={{textDecoration: 'none'}}
                                            align="center">Login</Typography>
                            </Button>}
                    </Grid>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in'
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    );
};
export default Login;