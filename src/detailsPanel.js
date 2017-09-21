import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import "./detailsPanel.css";
import { Card, CardHeader, CardText } from "material-ui/Card";
import DatePicker from "material-ui/DatePicker";
import Toggle from "material-ui/Toggle";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import Subheader from "material-ui/Subheader";
import EditMode from "./editMode.js";

class DetailsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      notification: "",
      notes: "",
      startDate: "",
      endDate: ""
    };
    this.changeNotificationSetting = this.changeNotificationSetting.bind(this);
  }

  componentWillMount() {
    if (this.props.task === -1)
      this.setState({ name: "Task Name", notification: false });
    else {
      var task = JSON.parse(localStorage.getItem("taskList"))[this.props.task];
      this.setState({ name: task.name, notification: task.notification });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.task === -1)
      this.setState({ name: "Task Name", notification: false });
    else {
      var task = JSON.parse(localStorage.getItem("taskList"))[nextProps.task];
      this.setState({ name: task.name, notification: task.notification });
    }
  }

  changeNotificationSetting(e) {
    if (this.props.task === -1) return;

    this.setState({ notification: e.target.checked });
    var task = JSON.parse(localStorage.getItem("taskList"));
    task[this.props.task].notification = e.target.checked;
    localStorage.setItem("taskList", JSON.stringify(task));
  }

  render() {
    const styles = {
      cardStyle: {
        paddingTop: "5%",
        paddingLeft: "5%"
      },
      datePicker: {
        width: 150
      },
      toggle: {
        maxWidth: "30%",
        marginTop: 15
      },
      divider: {
        marginRight: "5%"
      },
      title: {
        fontWeight: "bold"
      }
    };

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
          <Card style={styles.cardStyle}>
            {!this.props.editMode ? (
              <div>
                <CardHeader title={this.state.name} style={styles.title} />
                <Divider style={styles.divider} />
                <CardText>
                  <DatePicker
                    textFieldStyle={styles.datePicker}
                    hintText="Start Date"
                  />
                  <DatePicker
                    textFieldStyle={styles.datePicker}
                    hintText="End Date"
                  />
                  <Toggle
                    label="Notification"
                    style={styles.toggle}
                    toggled={this.state.notification}
                    onToggle={this.changeNotificationSetting}
                    labelStyle={{ fontWeight: 600 }}
                  />

                  <Subheader>Notes</Subheader>
                  <TextField
                    hintText="ADD NOTES"
                    multiLine={true}
                    rows={6}
                    rowsMax={6}
                    style={{ width: "90%" }}
                  />
                </CardText>
              </div>
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
