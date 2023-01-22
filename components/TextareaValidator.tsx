import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import Menu from "@mui/joy/Menu";

type Props = {
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  onClick: (text: string) => void;
};

const TextareaValidator = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [input, setInput] = React.useState("");

  return (
    <FormControl>
      <Textarea
        placeholder='Type something here…'
        minRows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        endDecorator={
          <Box
            sx={{
              display: "flex",
              gap: "var(--Textarea-paddingBlock)",
              pt: "var(--Textarea-paddingBlock)",
              borderTop: "1px solid",
              borderColor: "divider",
              flex: "auto",
            }}
          >
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              size='sm'
              placement='bottom-start'
            ></Menu>
            <Button
              sx={{ml: "auto"}}
              onClick={(e) => {
                setInput("");
                props.setResult("");
              }}
            >
              Clear
            </Button>
            <Button
              sx={{ml: "left"}}
              onClick={(e) => {
                props.onClick(input);
              }}
            >
              Post
            </Button>
          </Box>
        }
        sx={{
          minWidth: 500,
        }}
      />
    </FormControl>
  );
};

export default TextareaValidator;
