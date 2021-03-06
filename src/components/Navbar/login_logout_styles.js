import {makeStyles} from '@material-ui/core/styles';
import {deepPurple} from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        backgroundColor: "white"
    },
    heading: {
        display: "flex-end",
        alignItems: "center",
        padding: "0 1rem",
        cursor: "pointer",
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
        height: 'auto',
        "&.active": {
            backgroundColor: "yellow",
            color: "red"
        },
        "&.hover": {
            backgroundColor: "yellow",
            color: "red"
        }

    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: '20px'
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    map: {
        color: 'rgba(0,183,255, 1)'
    },
    logoutButton: {

    },
}));
