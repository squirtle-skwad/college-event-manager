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

export default class SignUp extends React.Component {
  state = {
    open: true
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
    axios.post("http://127.0.0.1:8000/signup/", obj);
    console.log(obj);
  };

  render() {
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
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign Up Here!</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="fname"
              value={this.state.name}
              onChange={this.handleChange}
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="lname"
              value={this.state.lname}
              onChange={this.handleChange}
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="sap"
              name="sap"
              value={this.state.sap}
              onChange={this.handleChange}
              label="SAP ID"
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
              <MenuItem value="Computer">Computer</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Mechanical">Mechanical</MenuItem>
              <MenuItem value="EXTC">EXTC</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Biochemical">Biomedical</MenuItem>
              <MenuItem value="Chemical">Chemical</MenuItem>
              <MenuItem value="Production">Production</MenuItem>
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
