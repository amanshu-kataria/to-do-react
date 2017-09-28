import React, { Component } from "react";
import { CardHeader, CardText, CardTitle } from "material-ui/Card";
import Divider from "material-ui/Divider";

class DisplayMode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      notification: "",
      notes: "",
      deadLine: ""
    };
    this.getStringDate = this.getStringDate.bind(this);
    this.setStateValues = this.setStateValues.bind(this);
  }

  getStringDate(date) {
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    var _deadline = date;

    if (_deadline === null) {
      _deadline = "No deadline found for this task";
    } else {
      _deadline = new Date(date);

      _deadline =
        _deadline.getDate().toString() +
        " " +
        month[_deadline.getMonth()] +
        ", " +
        _deadline.getFullYear().toString();
    }
    return _deadline;
  }

  //sets the state values on both componentWillMount and componentWillReceiveProps
  //index : index of the task to be displayed.
  setStateValues(index) {
    if (index === -1)
      this.setState({
        name: "Your task name goes here.",
        notification: "Turn On/Off notification for individual task.",
        deadLine: "Option to choose a deadline date.",
        notes: "Save important notes for individual task."
      });
    else {
      var task = JSON.parse(localStorage.getItem("taskList"))[index];

      this.setState({
        name: task.name,
        notification: task.notification,
        notes: task.notes,
        deadLine: this.getStringDate(task.deadLine)
      });
    }
  }

  componentWillMount() {
    this.setStateValues(this.props.taskData);
  }

  componentWillReceiveProps(nextProps) {
    this.setStateValues(nextProps.taskData);
  }

  render() {
    const styles = {
      divider: {
        marginRight: "5%"
      },
      title: {
        fontWeight: "bold"
      }
    };

    return (
      <div>
        <CardTitle title={this.state.name} style={styles.title} />
        <Divider style={styles.divider} />
        <CardText>
          <CardHeader
            title="Deadline Date"
            subtitle={this.state.deadLine}
            style={styles.title}
          />

          <CardHeader
            title="Notification"
            subtitle={this.state.notification ? "On" : "Off"}
            style={styles.title}
          />

          <CardHeader
            title="Notes"
            subtitle={
              this.state.notes === "" ? (
                "No notes found for this task"
              ) : (
                this.state.notes
              )
            }
            style={styles.title}
          />
        </CardText>
      </div>
    );
  }
}

export default DisplayMode;
