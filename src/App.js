import React, { Component } from "react";
import "./App.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col } from "react-bootstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import ToDoList from "./toDoList";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Grid fluid className="noPadding">
          <Row>
            <Col xs={12} md={12}>
              <AppBar
                style={{
                  backgroundColor: "#03A9F4"
                }}
                title="To-Do"
                showMenuIconButton={false}
              />
            </Col>
          </Row>
          <Row className="target">
            <Col xs={4} md={4}>
              <ToDoList />
            </Col>
            <Col xs={8} md={8} />
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
