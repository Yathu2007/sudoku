import React from "react";

import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
// import CloseIcon from "@mui/icons-material/Close";
// import Collapse from "@mui/material/Collapse";

export default function Status(props) {
    let severity = "";
    let msg = "";

    if (props.displayState === "solver") {
        severity = "info";
        msg = "This solver uses the backtracking algorithm.";
    } else if (props.displayState) {
        severity = "success";
        msg = "Great! You solved it correctly";
    } else {
        severity = "error";
        msg = "Oops! Incorrect solution. Keep trying";
    }

    return (
        <div className="statusLabel">
            <Box sx={{ width: "100%" }}>
                <Alert severity={severity} sx={{ mb: 2 }}>
                    {msg}
                </Alert>
            </Box>
        </div>
    );
}
