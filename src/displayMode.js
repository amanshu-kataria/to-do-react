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
        <CardTitle
          title={
            this.props.taskData.name === "" ? (
              "Task Name"
            ) : (
              this.props.taskData.name
            )
          }
          style={styles.title}
        />
        <Divider style={styles.divider} />
        <CardText>
          <CardHeader
            title="Start Date :"
            subtitle={
              this.props.taskData.startDate ? (
                this.props.taskData.startDate
              ) : (
                "No Date Selected"
              )
            }
            style={styles.title}
          />
          <CardHeader
            title="End Date :"
            subtitle={
              this.props.taskData.endDate ? (
                this.props.taskData.endDate
              ) : (
                "No Date Selected"
              )
            }
            style={styles.title}
          />

          <CardHeader
            title="Notification"
            subtitle={this.props.taskData.notification ? "On" : "Off"}
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
