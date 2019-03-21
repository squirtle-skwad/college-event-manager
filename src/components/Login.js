import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import {Redirect} from "react-router-dom"
export default class Login extends React.Component {
  state = {
    redirect: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  handleLogin = () => {
    let obj = {};
    obj = this.state;
    // this.setState({ open: false });
    axios.post("http://127.0.0.1:8000/login/", obj).then(res => {
      //localStorage.setItem()
      this.setState({redirect: true})
    });
    console.log(obj);
  };

  render() {
    const {redirect} = this.state
    if (redirect) {
      return <Redirect to='/'/>;
    }
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          style={{ border: "none" }}
        >
          LOGIN
        </Button>
        <Dialog
          open="true"
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login Here!</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button> */}
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
