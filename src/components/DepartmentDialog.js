/* eslint no-use-before-define: 0 */

import React, { useCallback } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Dialog,
    Slide,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    TextField,
    Button,
    MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";

import { useBoolean, useInput } from "react-hanger";
import client from "../util/client";
import { useDepartmentManager } from "../util/hooks";
import { DEPARTMENTS } from "../util/constants";
import { act, useDispatch, useMappedState } from "../store";

// -----

const useStyles = makeStyles((theme) => ({
    eventForm: {
        padding: "1rem",
        paddingTop: "0.5rem",
    },

    submitContainer: {
        padding: "16px",
        display: "flex",
        justifyContent: "flex-end",
    },

    submitButton: {
        position: "absolute",
        right: "1rem",
        bottom: "0",
    },
}));

const Transition = (props) => <Slide direction='up' {...props} />;

// -----

const DepartmentItem = ({ dept, onDelete }) => (
    <ListItem>
        <ListItemText
            primary={`Start at ${dept.department}`}
        />
        <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);

function DepartmentDialog({ event }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { eventAddStep } = useMappedState(
        useCallback((state) => ({
            eventAddStep: state.eventAddStep,
        }), [])
    );

    const { depts, deptsWithEvent, addDepartment, deleteDept } = useDepartmentManager();
    const departmentInput = useInput('OTHER');

    const newDepartment = useBoolean(false);

    // -----

    const closeDialog = useCallback(() => 
        dispatch(act.CLOSE_ADD_EVENT_DIALOG())
    , []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = deptsWithEvent(event.id);

        client
            .postMultipleDepts(formData)
            .then(closeDialog)
            .catch(console.error);
    };

    // -----

    const NewDept = () => (
        <Dialog open={newDepartment.value}>
            <div style={{ padding: '16px' }}>
                <TextField
                    {...departmentInput}
                    label='Department'
                    select
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText="Choose 'Other' if not organized by a specific department"
                    margin='normal'>
                    {DEPARTMENTS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div className={classes.submitContainer}>
                <Button
                    color='warn'
                    variant='contained'
                    style={{
                        marginRight: '8px'
                    }}
                    onClick={() => newDepartment.toggle()}>
                    Cancel
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    onClick={() => {
                        addDepartment(departmentInput.value);
                        newDepartment.setFalse();
                        departmentInput.setValue('OTHER');;
                    }}>
                    Add
                </Button>
            </div>
        </Dialog>
    );

    return (
        <Dialog TransitionComponent={Transition} open={!!event && eventAddStep === 2}>
            <AppBar color='primary' position='sticky'>
                <Toolbar variant='dense' disableGutters>
                    <Typography variant='subtitle1' color='inherit' style={{ marginLeft: "16px" }}>
                        Add Departments
                    </Typography>
                </Toolbar>
            </AppBar>

            <div>
                <List dense>
                    {depts.map((e, i) => <DepartmentItem key={i} dept={e} onDelete={() => deleteDept(i)} />)}
                </List>
            </div>

            <div className={classes.submitContainer}>
                <Button
                    color='secondary'
                    variant='contained'
                    style={{
                        marginRight: '8px'
                    }}
                    onClick={() => newDepartment.toggle()}>
                    <AddIcon />
                    Add Department
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </div>

            <NewDept />
        </Dialog>
    );
}

export default DepartmentDialog;
