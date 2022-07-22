// MUI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoardRounded";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function ButtonControls(props) {
    return (
        <Box
            display="flex"
            justifyContent="space-around"
            marginTop="20px"
            marginBottom="20px"
        >
            <Button
                sx={{ m: 2 }}
                startIcon={<AddBoxIcon />}
                variant="contained"
                color="primary"
                onClick={() => props.newGame()}
                disabled={props.disabled}
            >
                New Game
            </Button>
            <Button
                sx={{ m: 2 }}
                startIcon={<CheckBoxIcon />}
                variant="contained"
                color="success"
                onClick={() => props.verify()}
                disabled={props.disabled || props.verifyDisabled}
            >
                Verify
            </Button>
            <Button
                sx={{ m: 2 }}
                startIcon={<DeveloperBoardIcon />}
                variant="contained"
                color="secondary"
                onClick={() => props.solve()}
                disabled={props.disabled}
            >
                Solve
            </Button>
        </Box>
    );
}
