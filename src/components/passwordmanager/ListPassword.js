import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchListPassword, deleteListPassword} from '../../stores/actions';
import ItemListPassword from './ItemListPassword'
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SearchListPassword from "./SearchListPassword";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const ListPassword = () => {
    const [keyFind, setKeyFind] = useState("");
    const listPassword = useSelector(state => state.passReducers);
    const dispatch = useDispatch();
    const classes = useStyles();

    const findPassword = (url) => {
        setKeyFind(url)
    };

    const deleteItem = (id) => {
        dispatch(deleteListPassword(id));
    };

    useEffect(() => {
        dispatch(fetchListPassword());
    }, [dispatch]);

    return (
        <>
            {
                (listPassword.loading === false && listPassword.data.length > 0) ?
                    <SearchListPassword actions={findPassword}/>
                    : <></>
            }
            <TableContainer className={classes.table}>
                {
                    listPassword.loading === false ?
                        listPassword.data.length > 0 ?
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead style={{backgroundColor: "#3289a8"}}>
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell style={{color:"#fff"}}>Url</TableCell>
                                        <TableCell style={{color:"#fff"}}>User Name</TableCell>
                                        <TableCell style={{color:"#fff"}}>Password</TableCell>
                                        <TableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listPassword.data.map(row => {
                                        return (
                                            keyFind !== "" ?
                                                new RegExp(keyFind).test(row.url) ?
                                                    <TableRow key={row.id}>
                                                        <ItemListPassword data={row} actions={deleteItem}/>
                                                    </TableRow>
                                                    : <TableRow key={row.id}/>
                                                : <TableRow key={row.id} style={{backgroundColor:"#f7f7f7"}}>
                                                    <ItemListPassword data={row} actions={deleteItem}/>
                                                </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                            : "No Data"
                        : <CircularProgress/>

                }
            </TableContainer>
        </>
    )
};

export default ListPassword;