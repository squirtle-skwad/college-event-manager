import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import {Redirect} from "react-router-dom"

export default class SignUp extends React.Component {
  state = {
    redirect: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  handleSignUp = () => {
    let obj = {};
    obj = this.state;
    // this.setState({ open: false });
    axios.post("http://127.0.0.1:8000/signup/", obj).then(res => {
      console.log(res.data);  
      this.setState({redirect: true});
    });
    console.log(obj);
  };

  render() {
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/verify'/>;
     }
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          style={{ border: "none" }}
        >
          SIGN UP
        </Button>
        <Dialog
          open="true"
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign Up Here!</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              label="Email"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
              label="Username"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="pass"
              label="Password"
              type="password"
              fullWidth
            />
            <InputLabel htmlFor="department" style={{ marginRight: "3px" }}>
              Department:{" "}
            </InputLabel>
            <Select
              id="department"
              value={this.state.department}
              onChange={this.handleChange}
              displayEmpty
              name="department"
            >
              <MenuItem value="EXTC">Electronics & Communication</MenuItem>
              <MenuItem value="MECH">Mechanical</MenuItem>
              <MenuItem value="COMPS">Computers</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="ETRX">Electronics</MenuItem>
              <MenuItem value="CHEM">Chemical</MenuItem>
              <MenuItem value="BIOMED">Bio-medical</MenuItem>
              <MenuItem value="PROD">Production</MenuItem>
              <MenuItem value="OTHER">Other/ No department</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button> */}
            <Button onClick={this.handleSignUp} color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
