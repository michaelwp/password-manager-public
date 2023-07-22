import React, {useState} from "react";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Search from '@material-ui/icons/Search';

const SearchListPassword = (props) => {
    const [key, setKey] = useState("");

    const searchPassword = (e) => {
        e.preventDefault();
        props.actions(e.target.value);
        setKey(e.target.value);
    };

    return (
        <>
            <form onSubmit={searchPassword}>
                <Grid container
                      justify="flex-end"
                      alignItems="center"
                      direction={"row"}
                      style={{margin: "10px 0px"}}>
                    <Grid item>
                        <Search style={{fontSize: "25px"}}/>
                    </Grid>
                    <Grid item>
                        <Input type="text"
                               placeholder={"Search..."}
                               value={key}
                               onChange={searchPassword}
                               style={{fontSize: "14px", width: "250px"}}/>
                    </Grid>
                </Grid>
            </form>
        </>
    )
};

export default SearchListPassword;
