import React from "react";
import InputPassword from "../components/passwordmanager/InputPassword";
import ListPassword from "../components/passwordmanager/ListPassword";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Key from "@material-ui/icons/VpnKey"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <>
            <Typography style={{
                fontSize: "25px",
                textAlign: "center",
                marginBottom: "25px",
                borderBottom: "1px solid #e0e0e0",
                padding: "25px",
                color: "#3d95d9",
                backgroundColor: "#f7f7f7"
            }}>
                <Key style={{
                    fontSize: "50px",
                    margin: "0 10px",
                    textAlign: "center",
                }}/>
                <br/>
                Password Manager
            </Typography>
            <Grid container
                  justify="center"
                  direction="column"
                  className={classes.root}
                  spacing={2}
                  alignItems="center">
                <Grid item>
                    <Paper data-testid="inputPassword"
                           className={classes.paper}
                           style={{backgroundColor: "#f7f7f7"}}>
                        <InputPassword />
                    </Paper>
                </Grid>
                <Grid item >
                    <Paper data-testid="listPassword"
                           className={classes.paper}>
                        <ListPassword/>
                    </Paper>
                </Grid>
            </Grid>
            <Typography style={{
                fontSize: "12px",
                textAlign: "center",
                marginTop: "50px",
                borderTop: "1px solid #e0e0e0",
                padding: "15px",
                color: "gray"
            }}>
                Copyright 2019 - Password Manager
            </Typography>
        </>
    )
};

export default Home;

