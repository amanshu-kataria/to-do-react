import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import "./detailsPanel.css";
import Card from "material-ui/Card";
import EditMode from "./editMode.js";
import DisplayMode from "./displayMode.js";

class DetailsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      notification: "",
      notes: "",
      deadLine: ""
    };
  }

  componentWillMount() {
    if (this.props.task === -1)
      this.setState({
        name: "Your task name goes here.",
        notification: "Turn On/Off notification for individual task.",
        deadLine: "Option to choose a deadline date.",
        notes: "Save important notes for individual task."
      });
    else {
      var task = JSON.parse(localStorage.getItem("taskList"))[this.props.task];
      this.setState({
        name: task.name,
        notification: task.notification,
        notes: task.notes,
        deadLine: task.deadLine
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.task === -1)
      this.setState({
        name: "Your task name goes here.",
        notification: "Turn On/Off notification for individual task.",
        deadLine: "Option to choose a deadline date.",
        notes: "Save important notes for individual task."
      });
    else {
      var task = JSON.parse(localStorage.getItem("taskList"))[nextProps.task];
      this.setState({
        name: task.name,
        notification: task.notification,
        notes: task.notes,
        deadLine: task.deadLine
      });
    }
  }

  render() {
    return (
      <div>
        <AppBar
          className="app-bar"
          title="Details"
          style={{ backgroundColor: "#007ac1" }}
          titleStyle={{ fontSize: 20 }}
          showMenuIconButton={false}
        />
        <div className="wrapper">
          <Card className={this.props.editMode ? "editMode" : "displayMode"}>
            {!this.props.editMode ? (
              <DisplayMode taskData={this.state} />
            ) : (
              <EditMode
                index={this.props.editIndex}
                onSave={this.props.onEditModeClose}
              />
            )}
          </Card>
        </div>
      </div>
    );
  }
}

export default DetailsPanel;
