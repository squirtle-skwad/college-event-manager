import React from "react";
import { InlineDateTimePicker } from "material-ui-pickers";

const InlineDateTimePickerDemo = (props) => (
    <InlineDateTimePicker
      keyboard
      ampm={false}
      onError={console.error}
      format="YYYY/MM/DD hh:mm A"
      mask={[
        /\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, " ", /\d/, /\d/, ":", /\d/, /\d/
      ]}

      style={{
        marginTop: "0.2rem",
        marginBottom: "0.2rem",
      }}

      {...props}
    />
);

export default InlineDateTimePickerDemo;
