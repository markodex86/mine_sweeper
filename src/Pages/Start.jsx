import React, { useState } from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";

const Start = ({ handleSetData }) => {
  const [difficulty, setDifficulty] = useState("beginner");

  const presetData = {
    beginner: {
      width: 10,
      height: 10,
      mines: 1,
    },
    intermediate: {
      width: 16,
      height: 16,
      mines: 40,
    },
    expert: {
      width: 20,
      height: 20,
      mines: 99,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSetData(presetData[difficulty]);
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className="center">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary" }}>💣</Avatar>
          <Typography sx={{ color: "#000000" }} component="h1" variant="h5">
            MineSweeper 3.14
          </Typography>
          <Paper
            sx={{
              marginTop: "1rem",
              padding: "1rem",
              width: "100%",
            }}
            elvation={3}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "rgb(0,0,0,.6)",
                  }}
                  id="difficulty-group-label"
                >
                  Select Difficulty
                </Typography>
                <RadioGroup
                  aria-labelledby="difficulty-group-label"
                  defaultValue="beginner"
                  name="difficulty-buttons-group"
                >
                  <FormControlLabel
                    value="beginner"
                    control={<Radio />}
                    label="Beginner"
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                  <FormControlLabel
                    value="intermediate"
                    control={<Radio />}
                    label="Intermediate"
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                  <FormControlLabel
                    value="expert"
                    control={<Radio />}
                    label="Expert"
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Start Game
              </Button>
            </Box>
          </Paper>
        </Box>
      </div>
    </Container>
  );
};

export default Start;
