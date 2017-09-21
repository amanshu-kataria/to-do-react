import React, { Component } from "react";
import "./App.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col } from "react-bootstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import ToDoList from "./toDoList";
import Snackbar from "material-ui/Snackbar";
import DetailsPanel from "./detailsPanel.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      currentOpenTask: -1,
      editMode: false,
      editIndex: -1
    };

    //creates a new key if it's not present in local storage
    if (!localStorage.taskList) {
      localStorage.setItem("taskList", "[]");
    }

    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.openSnackbar = this.openSnackbar.bind(this);
    this.changeCurrentTask = this.changeCurrentTask.bind(this);
    this.turnOnEditMode = this.turnOnEditMode.bind(this);
    this.turnOffEditMode = this.turnOffEditMode.bind(this);
  }

  componentWillMount() {
    if (localStorage.taskList) {
      var list = JSON.parse(localStorage.getItem("taskList"));
      if (list.length >= 1) {
        this.setState({ currentOpenTask: 0 });
      }
    }
  }

  turnOnEditMode(index) {
    this.setState({ editMode: true, editIndex: index });
  }

  turnOffEditMode() {
    this.setState({ editMode: false, currentOpenTask: this.state.editIndex });
  }

  changeCurrentTask(index) {
    this.setState({ currentOpenTask: index });
  }

  closeSnackbar() {
    this.setState({ snackbarOpen: false });
  }

  openSnackbar() {
    this.setState({ snackbarOpen: true });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Grid fluid className="noPadding">
          <Row className="noMargin">
            <Col xs={12} md={12} className="noPadding">
              <AppBar
                style={{
                  backgroundColor: "#03A9F4"
                }}
                title="To-Do"
                showMenuIconButton={false}
              />
            </Col>
          </Row>
          <Row className="noMargin">
            <Col xs={4} md={4} className="noPadding">
              <ToDoList
                onAddTask={this.openSnackbar}
                onTaskSelected={this.changeCurrentTask}
                onEdit={this.turnOnEditMode}
              />
            </Col>
            <Col xs={8} md={8} className="noPadding">
              <DetailsPanel
                task={this.state.currentOpenTask}
                editMode={this.state.editMode}
                editIndex={this.state.editIndex}
                onEditModeClose={this.turnOffEditMode}
              />
            </Col>
          </Row>
          <Snackbar
            open={this.state.snackbarOpen}
            message="Task Added Successfully."
            autoHideDuration={3000}
            onRequestClose={this.closeSnackbar}
          />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
