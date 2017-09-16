import React, { Component } from "react";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Checkbox from "material-ui/Checkbox";
import AppBar from "material-ui/AppBar";
import "./toDoList.css";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentClear from "material-ui/svg-icons/content/clear";
import IconButton from "material-ui/IconButton";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

//Returns add button to the task bar
function AddButton(props) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltip="New Task"
      iconStyle={{ color: props.color }}
    >
      <ContentAdd />
    </IconButton>
  );
}

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTaskVisible: false,
      taskName: "",
      taskList: []
    };

    this.addTaskInput = this.addTaskInput.bind(this);
    this.closeNewTask = this.closeNewTask.bind(this);
    this.taskNameChange = this.taskNameChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTaskInput() {
    if (!this.state.addTaskVisible) {
      this.setState({ addTaskVisible: true });
    } else return;
  }

  taskNameChange(event) {
    this.setState({ taskName: event.target.value });
  }

  closeNewTask() {
    this.setState({
      addTaskVisible: false,
      taskName: ""
    });
  }

  addTask() {
    if (this.state.taskName === "") return;

    var list = this.state.taskList;
    list.push(this.state.taskName);
    this.setState({ taskList: list, taskName: "", addTaskVisible: false });
    this.props.onAddTask();
  }

  render() {
    const styles = {
      checkbox: {
        paddingLeft: 16,
        paddingTop: 5,
        paddingBottom: 5
      },
      textField: {
        paddingLeft: 16,
        marginRight: 20,
        width: "64%",
        floatingLabelFocusStyle: {
          color: "#67daff"
        },
        underlineStyle: {
          borderColor: "#67daff"
        }
      },
      defaultColor: {
        backgroundColor: "#67daff"
      },
      divider: {
        marginLeft: "3%",
        marginRight: "5%"
      }
    };

    function Checkboxes(props) {
      return (
        <div>
          <Checkbox
            label={props.name}
            labelPosition="left"
            style={styles.checkbox}
          />
          <Divider style={styles.divider} />
        </div>
      );
    }

    return (
      <div>
        <AppBar
          className="app-bar"
          style={styles.defaultColor}
          title="Task"
          titleStyle={{ fontSize: 20 }}
          iconElementRight={
            <AddButton onClick={this.addTaskInput} color="white" />
          }
          showMenuIconButton={false}
        />

        <div>
          {this.state.addTaskVisible ? (
            <div>
              <TextField
                autoFocus
                hintText="Task"
                style={styles.textField}
                floatingLabelText="New Task"
                value={this.state.taskName}
                onChange={this.taskNameChange}
                floatingLabelFocusStyle={
                  styles.textField.floatingLabelFocusStyle
                }
                underlineFocusStyle={styles.textField.underlineStyle}
              />
              <FlatButton label="Add" primary={true} onClick={this.addTask} />
              <IconButton tooltip="Cancel" onClick={this.closeNewTask}>
                <ContentClear />
              </IconButton>
            </div>
          ) : null}
        </div>
        <List className="taskList">
          {this.state.taskList.map((task, index) => (
            <Checkboxes key={index} name={task} />
          ))}
        </List>
      </div>
    );
  }
}

export default ToDoList;
