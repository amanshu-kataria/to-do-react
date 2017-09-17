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
      snackbarOpen: false
    };
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.openSnackbar = this.openSnackbar.bind(this);
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
              <ToDoList onAddTask={this.openSnackbar} />
            </Col>
            <Col xs={8} md={8} className="noPadding">
              <DetailsPanel />
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
