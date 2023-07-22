import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {addNewPassword} from '../../stores/actions';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/CheckCircle';
import Button from "@material-ui/core/Button";
import uuid from 'uuid/v1'
import {Dialog, TextField} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    textInput: {
        margin: theme.spacing(1),
    },
}));

const InputPassword = () => {
    const [url, setUrl] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [isStrongPassword, setIsStrongPassword] = useState(false);
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})");
    const [open, setOpen] = useState(false);

    const addNewPass = (payload) => {
        dispatch(addNewPassword(payload))
    };

    const urlOnChange = (e) => {
        setUrl(e.target.value)
    };

    const usernameOnChange = (e) => {
        setUserName(e.target.value)
    };

    const passwordOnChange = (e) => {
        setPassword(e.target.value);
        setIsStrongPassword(strongRegex.test(e.target.value));
    };

    const inputOnFormSubmit = (event) => {
        event.preventDefault();
        handleClickOpen();
    };

    const saveNewPassword = () => {
        addNewPass({
            uuidNo: uuid(),
            url: url,
            userName: userName,
            password: password,
            createdDate: new Date(),
            updatedDate: new Date()
        });
        setUrl("");
        setUserName("");
        setPassword("");
        handleClose()
    };

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <form onSubmit={inputOnFormSubmit}>
                <TextField
                    autoComplete={"url"}
                    inputProps={{
                        style:{
                            fontSize: "14px",
                            backgroundColor:"#fff"
                        }
                    }}
                    label="Url"
                    className={classes.textInput}
                    id="url"
                    onChange={urlOnChange}
                    value={url}
                    margin="dense"
                    helperText={"e.g: http://www.admin.com"}
                    variant={"outlined"}
                    required/>

                <TextField
                    label="userName"
                    inputProps={{
                        style:{
                            fontSize: "14px",
                            backgroundColor:"#fff"
                        }
                    }}
                    className={classes.textInput}
                    id="username"
                    onChange={usernameOnChange}
                    value={userName}
                    margin="dense"
                    helperText={"e.g: admin@admin.com"}
                    variant={"outlined"}
                    required/>

                <TextField
                    inputProps={{
                        style:{
                            fontSize: "14px",
                            backgroundColor:"#fff"
                        },
                        minLength:"5"
                    }}
                    className={classes.textInput}
                    type="password"
                    id="password"
                    onChange={passwordOnChange}
                    value={password}
                    margin="dense"
                    label="password"
                    helperText={"e.g.: p@ssw0rd"}
                    variant={"outlined"}
                    required/>

                <Typography>
                    {
                        password ?
                            <IconButton style={{
                                color: isStrongPassword ? "green" : "#f5da07"
                            }} type="submit">
                                <SaveIcon style={{fontSize: "50px"}}/>
                            </IconButton> : ""
                    }
                    <br/>
                    {
                        password !== ""
                            ? isStrongPassword
                            ? "Strong Password"
                            : "Weak Password"
                            : ""
                    }
                </Typography>
            </form>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Continue to save this password ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={saveNewPassword} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default InputPassword;