import React, { Component } from "react";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "material-ui/AppBar";
import "./detailsPanel.css";
import { Card, CardHeader, CardText } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import DatePicker from "material-ui/DatePicker";
import Toggle from "material-ui/Toggle";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import Subheader from "material-ui/Subheader";

class DetailsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      notification: ""
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
            <IconButton
              className="editIcon"
              tooltip="Edit"
              tooltipPosition="bottom-left"
              touch={true}
            >
              <ModeEdit />
            </IconButton>
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
          </Card>
        </div>
      </div>
    );
  }
}

export default DetailsPanel;
