import React, { Component } from "react";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "material-ui/AppBar";
import "./toDoList.css";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentClear from "material-ui/svg-icons/content/clear";
import IconButton from "material-ui/IconButton";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Snackbar from "material-ui/Snackbar";

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
      taskList: [],
      snackbarOpen: false
    };

    //creates a new key if it's not present in local storage
    if (!localStorage.taskList) {
      localStorage.setItem("taskList", "[]");
    }

    this.addTaskInput = this.addTaskInput.bind(this);
    this.closeNewTask = this.closeNewTask.bind(this);
    this.taskNameChange = this.taskNameChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  //displays the hidden textfield for creating a new task
  addTaskInput() {
    if (!this.state.addTaskVisible) {
      this.setState({ addTaskVisible: true });
    } else return;
  }

  //event handler for new task textfield.
  //it keeps the state 'taskName' updated
  taskNameChange(event) {
    this.setState({ taskName: event.target.value });
  }

  closeSnackbar() {
    this.setState({ snackbarOpen: false });
  }

  //hides the textfield which is used to add a new task.
  closeNewTask() {
    this.setState({
      addTaskVisible: false,
      taskName: ""
    });
  }

  //adds a task
  addTask() {
    if (this.state.taskName === "") return;

    //stores new task in localstorage
    var list = JSON.parse(localStorage.getItem("taskList"));
    this.newTask = {
      name: this.state.taskName,
      important: false,
      notification: false
    };

    list.push(this.newTask);
    localStorage.setItem("taskList", JSON.stringify(list));
    this.setState({ addTaskVisible: false, taskName: "" });
    this.props.onAddTask();
    if (list.length === 1) this.props.onTaskSelected(0);
  }

  changeSelectedTask(index) {
    this.props.onTaskSelected(index);
  }

  removeTask(index) {
    var list = JSON.parse(localStorage.getItem("taskList"));
    list.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(list));
    if (list.length >= 1) this.props.onTaskSelected(0);
    else this.props.onTaskSelected(-1);
    this.setState({ snackbarOpen: true });
    this.forceUpdate();
  }

  render() {
    const styles = {
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

    //gets saved task from local storage for rendering.
    this.savedTask = JSON.parse(localStorage.getItem("taskList"));

    const iconButtonElement = (
      <IconButton touch={true}>
        <MoreVertIcon />
      </IconButton>
    );

    function TaskItem(props) {
      return (
        <div>
          <ListItem
            primaryText={props.name}
            rightIconButton={
              <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onClick={props.onDone}>Done</MenuItem>
              </IconMenu>
            }
            onClick={props.onChangeTask}
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

        <div className="taskList">
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
          <List>
            {this.savedTask.map((task, index) => (
              <TaskItem
                key={index}
                name={task.name}
                onDone={() => this.removeTask(index)}
                onChangeTask={() => this.changeSelectedTask(index)}
              />
            ))}
          </List>
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message="Task Deleted Successfully."
          autoHideDuration={3000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default ToDoList;
