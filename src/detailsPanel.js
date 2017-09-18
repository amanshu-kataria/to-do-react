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
            <CardHeader title="Task Title" style={styles.title} />
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
