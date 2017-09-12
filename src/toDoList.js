import React, { Component } from "react";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Checkbox from "material-ui/Checkbox";
import AppBar from "material-ui/AppBar";
import "./toDoList.css";
import ContentAdd from "material-ui/svg-icons/content/add";
import IconButton from "material-ui/IconButton";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

//Returns add button to the task bar
function AddButton(props) {
  return (
    <IconButton onClick={props.onClick} iconStyle={{ color: props.color }}>
      <ContentAdd />
    </IconButton>
  );
}

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTaskVisible: false
    };
    this.addInput = this.addInput.bind(this);
  }

  addInput(e) {
    this.setState({ addTaskVisible: true });
  }

  render() {
    const styles = {
      checkbox: {
        paddingLeft: 16
      },
      textField: {
        paddingLeft: 16,
        marginRight: 20,
        width: "70%"
      },
      defaultColor: {
        backgroundColor: "#67daff"
      }
    };

    function Checkboxes() {
      return (
        <Checkbox
          label="Label on the left"
          labelPosition="left"
          style={styles.checkbox}
        />
      );
    }

    function NewTask() {
      return (
        <div>
          <TextField
            hintText="Task"
            style={styles.textField}
            floatingLabelText="New Task"
          />
          <FlatButton label="Add" primary={true} />
        </div>
      );
    }

    return (
      <div className="taskList">
        <AppBar
          className="app-bar"
          style={styles.defaultColor}
          title="Task"
          titleStyle={{ fontSize: 20 }}
          iconElementRight={<AddButton onClick={this.addInput} color="white" />}
          showMenuIconButton={false}
        />
        <div>
          {this.state.addTaskVisible ? <NewTask /> : null}
          <List>
            <Checkboxes />
          </List>
        </div>
      </div>
    );
  }
}

export default ToDoList;
