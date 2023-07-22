import React, {useState} from "react";
import TableCell from "@material-ui/core/TableCell";
import {Dialog, Input} from "@material-ui/core";
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import Delete from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";
import {useDispatch} from 'react-redux';
import {addNewPassword} from '../../stores/actions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ListPassword = (props) => {
    const [isLock, setIsLock] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [urlEdit, setUrlEdit] = useState(props.data.url);
    const [userNameEdit, setUserNameEdit] = useState(props.data.userName);
    const [passwordEdit, setPasswordEdit] = useState(props.data.password);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const updatePass = () => {
        dispatch(
            addNewPassword({
                uuidNo: props.data.id,
                url: urlEdit,
                userName: userNameEdit,
                password: passwordEdit,
                createdDate: props.data.createdDate,
                updatedDate: new Date()
            })
        );
        handleClose();
    };

    const isDeleteStatus = () => {
        setIsDelete(!isDelete)
        handleClickOpen();
    };

    const deleteItem = () => {
        props.actions(props.data.id);
        handleClose();
    };

    const isLockStatus = () => {
        setIsLock(!isLock);
    };

    const isEditStatus = () => {
        if (isEdit) {
            handleClickOpen();
        } else {
            setIsEdit(!isEdit);
        }
    };

    const setUrl = (e) => {
        setUrlEdit(e.target.value)
    };

    const setUserName = (e) => {
        setUserNameEdit(e.target.value)
    };

    const setPassword = (e) => {
        setPasswordEdit(e.target.value)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (isEdit) {
            setIsEdit(!isEdit);
        } else if (isDelete) {
            setIsDelete(!isDelete);
        }
    };

    const okActions = () => {
        if (isEdit) {
            updatePass()
        } else if (isDelete) {
            deleteItem()
        }
    };

    const validateUserName = () => {
        const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmail = regEmail.test(props.data.userName.toLowerCase());
        let userName = null;

        if (isEmail) {
            let email = props.data.userName.split("@");
            let domain = email[1].split(".");
            userName = `${email[0][0]}***${email[0][email[0].length - 1]}@${domain[0][0]}***${domain[0][domain[0].length - 1]}.${domain[1]}`
        } else {
            userName = `${props.data.userName[0]}***${props.data.userName[props.data.userName.length - 1]}`
        }

        return userName
    };

    return (
        <>
            <TableCell>
                <IconButton onClick={isLockStatus}>
                    {
                        isLock
                            ? <Lock style={{color: "Green"}}/>
                            : <LockOpen style={{color: "#f5da07"}}/>
                    }
                </IconButton>
            </TableCell>
            <TableCell>
                {
                    isEdit
                        ? <Input type="text"
                                 value={urlEdit}
                                 onChange={setUrl}
                                 required
                                 style={{fontSize: "14px"}}/>
                        : props.data.url
                }
            </TableCell>
            <TableCell>
                {
                    isEdit
                        ? <Input type="text"
                                 value={userNameEdit}
                                 onChange={setUserName}
                                 required
                                 style={{fontSize: "14px"}}/>
                        : isLock ? validateUserName() : props.data.userName
                }
            </TableCell>
            <TableCell>
                <Input type={isLock ? "password" : "text"}
                       value={passwordEdit}
                       onChange={setPassword}
                       style={{fontSize: "14px"}}
                       required
                       minLength={5}
                       disabled={!isEdit}/>
            </TableCell>
            <TableCell>
                <IconButton color={"primary"} onClick={isEditStatus}>
                    {isEdit ? <Save/> : <Edit/>}
                </IconButton>
                <IconButton color={"secondary"}
                            onClick={isDeleteStatus}>
                    <Delete/>
                </IconButton>
            </TableCell>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEdit ? "Update" : isDelete ? "Delete" : ""}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Continue to {isEdit ? "update" : isDelete ? "delete" : ""} this password ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={okActions} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default ListPassword;