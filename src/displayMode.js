import React, { Component } from "react";
import { CardHeader, CardText, CardTitle } from "material-ui/Card";
import Divider from "material-ui/Divider";

class DisplayMode extends Component {
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
        <CardTitle title={this.props.taskData.name} style={styles.title} />
        <Divider style={styles.divider} />
        <CardText>
          <CardHeader
            title="Deadline Date"
            subtitle={
              this.props.taskData.deadLine ? (
                this.props.taskData.deadLine
              ) : (
                "No deadline found for this task"
              )
            }
            style={styles.title}
          />

          <CardHeader
            title="Notification"
            subtitle={
              typeof this.props.taskData.notification === "boolean" ? this.props
                .taskData.notification ? (
                "On"
              ) : (
                "Off"
              ) : (
                this.props.taskData.notification
              )
            }
            style={styles.title}
          />

          <CardHeader
            title="Notes"
            subtitle={
              this.props.taskData.notes === "" ? (
                "No notes found for this task"
              ) : (
                this.props.taskData.notes
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
