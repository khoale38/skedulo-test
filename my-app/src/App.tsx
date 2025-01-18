import React, { useCallback, useState } from "react";

import "./App.css";
import {
  Box,
  TextField,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchGithubUsers, clearUsers } from "./app/github/githubSlice";
import { AppDispatch, RootState } from "./app/store";
import { debounce } from "lodash";
function App() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.github);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  const debouncedFetch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3) {
        dispatch(fetchGithubUsers(value));
      } else {
        dispatch(clearUsers());
      }
    }, 1000),
    [dispatch]
  );

  return (
    <Box
      sx={{
        padding: "20px",
        margin: "auto",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search Github Users"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleInputChange}
        style={{ marginBottom: "20px", width: "80%" }}
      />
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {users.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.login}>
                <TableCell>
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>{user.score.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default App;
