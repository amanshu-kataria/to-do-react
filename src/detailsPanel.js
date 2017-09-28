import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import "./detailsPanel.css";
import Card from "material-ui/Card";
import EditMode from "./editMode.js";
import DisplayMode from "./displayMode.js";

class DetailsPanel extends Component {
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
          <Card className={this.props.editMode ? "editMode" : ""}>
            {!this.props.editMode ? (
              <DisplayMode taskData={this.props.task} />
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
