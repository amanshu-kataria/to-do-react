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
      deadLine: null,
      important: false,
      notes: ""
    };

    this.changeNotificationSetting = this.changeNotificationSetting.bind(this);
    this.handleTaskName = this.handleTaskName.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
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
      return _deadline;
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

  setStateValues(index) {
    var list = JSON.parse(localStorage.getItem("taskList"))[index];
    this.setState({
      name: list.name,
      notification: list.notification,
      important: list.important,
      deadLine: this.getStringDate(list.deadLine),
      notes: list.notes
    });
  }

  componentWillMount() {
    this.setStateValues(this.props.index);
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
      this.setStateValues(nextProps.index);
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
      deadLine: this.state.deadLine,
      notes: this.state.notes
    };

    var list = JSON.parse(localStorage.getItem("taskList"));
    list[this.props.index] = task;
    localStorage.setItem("taskList", JSON.stringify(list));
    this.props.onSave();
  }

  formatDate(date) {
    return (
      date.getDate().toString() +
      "-" +
      (date.getMonth() + 1).toString() +
      "-" +
      date.getFullYear().toString()
    );
  }

  onDateChange(e, date) {
    this.setState({ deadLine: date });
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
            hintText="Deadline Date"
            mode="landscape"
            onChange={this.onDateChange}
            value={this.state.deadLine}
            formatDate={this.formatDate}
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
            value={this.state.notes}
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
