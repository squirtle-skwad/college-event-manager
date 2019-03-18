import React from "react";

function useInput(defvalue) {
    const [value, setValue] = React.useState(defvalue);

    const onChange = (e) => setValue(e.target.value);

    return {
        value,
        onChange,
    };
}

export { useInput };
