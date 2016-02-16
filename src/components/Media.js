import React from "react";

import MediaSelector from "./MediaSelector";

var Media = React.createClass({

  render: function() {
    return (
      <div>
        <div className="media">
          <MediaSelector />
        </div>
      </div>
    );
  }
});
module.exports = Media;
