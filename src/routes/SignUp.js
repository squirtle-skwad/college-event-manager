import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import client from "../util/client";
import { Redirect, Link } from "react-router-dom";
import { DEPARTMENTS } from "../util/constants";

// -----

export default class SignUp extends React.Component {
    state = {
        redirect: false,
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        department: "",
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSignUp = () => {
        let obj = this.state;

        if(!obj.email.endsWith("@djsce.ac.in")) {
            alert('Email should be @djsce.ac.in!');
            return;
        }

        client.signup(obj).then((data) => {
            console.log(data);
            this.setState({ redirect: true });
        });
    };

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/verify' />;
        }
        return (
            <div>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={this.handleClickOpen}
                    style={{ border: "none" }}>
                    SIGN UP
                </Button>
                <Dialog
                    open='true'
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>
                        Sign Up Here!
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin='dense'
                            name='first_name'
                            value={this.state.first_name}
                            onChange={this.handleChange}
                            id='firstName'
                            label='First Name'
                            type='text'
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            name='last_name'
                            value={this.state.last_name}
                            onChange={this.handleChange}
                            id='lastName'
                            label='Last Name'
                            type='text'
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin='dense'
                            id='email'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            label='Email'
                            type='email'
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                            id='username'
                            label='Username'
                            type='text'
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            id='pass'
                            label='Password'
                            type='password'
                            fullWidth
                        />
                        <InputLabel
                            htmlFor='department'
                            style={{ marginRight: "3px" }}>
                            Department:{" "}
                        </InputLabel>
                        <Select
                            id='department'
                            value={this.state.department}
                            onChange={this.handleChange}
                            displayEmpty
                            fullWidth
                            name='department'
                            defaultValue="OTHER">
                            {DEPARTMENTS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' component={Link} to='/login'>
                            Log In
                        </Button>
                        <Button onClick={this.handleSignUp} color='primary' variant="contained">
                            Sign Up
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
