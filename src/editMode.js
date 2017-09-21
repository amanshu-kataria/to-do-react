import React, { Component } from "react";
import { CardText } from "material-ui/Card";
import DatePicker from "material-ui/DatePicker";
import Toggle from "material-ui/Toggle";
import TextField from "material-ui/TextField";
import Subheader from "material-ui/Subheader";
import IconButton from "material-ui/IconButton";
import Save from "material-ui/svg-icons/content/save";

class EditMode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      notification: false,
      startDate: null,
      endDate: null,
      important: false
    };

    this.changeNotificationSetting = this.changeNotificationSetting.bind(this);
    this.handleTaskName = this.handleTaskName.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
  }

  componentWillMount() {
    var list = JSON.parse(localStorage.getItem("taskList"));
    list = list[this.props.index];
    this.setState({
      name: list.name,
      notification: list.notification,
      important: list.important,
      startDate: list.startDate,
      endDate: list.endDate
    });
  }

  handleTaskName(e) {
    this.setState({ name: e.target.value });
  }

  handleNotes(e) {
    this.setState({ notes: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps === this.props.index) return;
    else {
      var list = JSON.parse(localStorage.getItem("taskList"));
      list = list[this.props.index];
      this.setState({
        name: list.name,
        notification: list.notification,
        important: list.important,
        startDate: list.startDate,
        endDate: list.endDate
      });
    }
  }

  changeNotificationSetting(e) {
    this.setState({ notification: e.target.checked });
  }

  saveEdits() {
    var task = {
      name: this.state.name,
      notification: this.state.notification,
      important: this.state.important,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    var list = JSON.parse(localStorage.getItem("taskList"));
    list[this.props.index] = task;
    localStorage.setItem("taskList", JSON.stringify(list));
    this.props.onSave();
  }

  render() {
    const styles = {
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
      },
      saveIcon: {
        float: "right"
      }
    };
    return (
      <div>
        <IconButton
          style={styles.saveIcon}
          tooltip="Save"
          onClick={this.saveEdits}
        >
          <Save />
        </IconButton>
        <TextField
          hintText="Task Name"
          floatingLabelText="Task Name"
          value={this.state.name}
          style={{ width: "80%" }}
          onChange={this.handleTaskName}
        />
        <CardText>
          <DatePicker
            textFieldStyle={styles.datePicker}
            hintText="Start Date"
            value={this.state.startDate}
          />
          <DatePicker
            textFieldStyle={styles.datePicker}
            hintText="End Date"
            value={this.state.endDate}
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
            rows={5}
            rowsMax={5}
            style={{ width: "90%" }}
            onChange={this.handleNotes}
          />
        </CardText>
      </div>
    );
  }
}

export default EditMode;
