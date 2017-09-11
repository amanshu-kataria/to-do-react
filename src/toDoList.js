import React, { Component } from "react";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Checkbox from "material-ui/Checkbox";
import AppBar from "material-ui/AppBar";
import "./toDoList.css";
import ContentAdd from "material-ui/svg-icons/content/add";
import IconButton from "material-ui/IconButton";

class ToDoList extends Component {
  render() {
    const styles = {
      checkbox: {
        marginLeft: 15,
        marginTop: 16,
        marginBottom: 16
      },
      defaultColor: {
        backgroundColor: "#67daff"
      }
    };

    const addButton = (
      <IconButton>
        <ContentAdd />
      </IconButton>
    );

    return (
      <div className="taskList">
        <AppBar
          className="app-bar"
          style={styles.defaultColor}
          title="Task"
          iconElementRight={addButton}
          showMenuIconButton={false}
        />
        <Checkbox
          label="Label on the left"
          labelPosition="left"
          style={styles.checkbox}
        />
        <Checkbox
          label="Label on the left"
          labelPosition="left"
          style={styles.checkbox}
        />
      </div>
    );
  }
}

export default ToDoList;
