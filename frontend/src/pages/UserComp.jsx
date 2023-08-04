import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Button from "@mui/material/Button";

const UserCard = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [getUserId, setGetUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [updatedUserId, setUpdatedUserId] = useState("");
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [updatedUserEmail, setUpdatedUserEmail] = useState("");

  const [deleteUserId, setDeletedUserId] = useState("");

  const handleAddUser = () => {
    const requestData = {
      user_name: userName,
      user_email: userEmail,
    };

    axios
      .post("http://localhost:5000/adduser", requestData)
      .then((response) => {
        console.log(response.data);
        window.alert("Added");
      })
      .catch((error) => {
        window.alert("Something wrong!");
        console.error(error);
      });
  };

  const handleGetUser = () => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/getuser?user_id=${getUserId}`)
      .then((response) => {
        console.log(response.data);
        window.alert("Success");
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        window.alert("Something wrong!");
        console.error(error);
        setLoading(false);
      });
  };

  const handleUpdateUser = () => {
    const requestData = {
      user_name: updatedUserName,
      user_email: updatedUserEmail,
    };

    axios
      .put(
        `http://localhost:5000/updateuser?user_id=${updatedUserId}`,
        requestData
      )
      .then((response) => {
        console.log(response.data);
        window.alert("Updated");
      })
      .catch((error) => {
        window.alert("Something wrong!");
        console.error(error);
      });
  };

  const handleDeleteUser = () => {
    axios
      .delete(`http://localhost:5000/deleteuser?user_id=${deleteUserId}`)
      .then((response) => {
        console.log(response.data);
        window.alert("Deleted");
      })
      .catch((error) => {
        window.alert("Something wrong!");
        console.error(error);
      });
  };

  return (
    <Grid>
      {/* -------------Add User---------------- */}
      <Grid
        style={{
          marginTop: "0em",
          margin: "8em",
        }}
      >
        <Grid>
          <Typography variant="h5" component="h2">
            ADD USER DATA
          </Typography>
          <TextField
            label="User Name"
            variant="outlined"
            required={true}
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ marginBottom: "1em" }}
          />
          <TextField
            label="User Email:"
            variant="outlined"
            fullWidth
            required={true}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            style={{ marginBottom: "1em", fontWeight: "bold" }}
          />
        </Grid>

        <Button
          variant="contained"
          onClick={handleAddUser}
          style={{
            padding: "1em 2em",
          }}
        >
          ADD USER
        </Button>
      </Grid>
      <Grid />

      {/* -------------Get User---------------- */}
      <Grid
        style={{
          margin: "8em",
        }}
      >
        <Grid>
          <Typography variant="h5" component="h2">
            GET USER DATA
          </Typography>
          <TextField
            label="User ID"
            variant="outlined"
            required={true}
            fullWidth
            value={getUserId}
            onChange={(e) => setGetUserId(e.target.value)}
            style={{ marginBottom: "1em" }}
          />
        </Grid>

        <Button
          variant="contained"
          onClick={handleGetUser}
          style={{
            padding: "1em 2em",
          }}
        >
          GET USER
        </Button>
        {loading && <Typography>Loading...</Typography>}

        {error && <Typography>Error: {error}</Typography>}

        {userData && (
          <Grid
            style={{
              marginTop: "2em",
            }}
          >
            {/* Display the user data */}
            <Typography>User Name: {userData.user_name}</Typography>
            <Typography>User Email: {userData.user_email}</Typography>
          </Grid>
        )}
      </Grid>
      <Grid />

      {/* -------------Update User------------- */}
      <Grid
        style={{
          margin: "8em",
        }}
      >
        <Grid>
          <Typography variant="h5" component="h2">
            UPDATE USER DATA
          </Typography>
          <TextField
            label="User ID"
            variant="outlined"
            required={true}
            fullWidth
            value={updatedUserId}
            onChange={(e) => setUpdatedUserId(e.target.value)}
            style={{ marginBottom: "1em" }}
          />
          <TextField
            label="User Name"
            variant="outlined"
            required={true}
            fullWidth
            value={updatedUserName}
            onChange={(e) => setUpdatedUserName(e.target.value)}
            style={{ marginBottom: "1em" }}
          />
          <TextField
            label="User Email:"
            variant="outlined"
            fullWidth
            required={true}
            value={updatedUserEmail}
            onChange={(e) => setUpdatedUserEmail(e.target.value)}
            style={{ marginBottom: "1em", fontWeight: "bold" }}
          />
        </Grid>

        <Button
          variant="contained"
          onClick={handleUpdateUser}
          style={{
            padding: "1em 2em",
          }}
        >
          UPDATE USER
        </Button>
      </Grid>
      <Grid />

      {/* -------------Delete User---------------- */}
      <Grid
        style={{
          margin: "8em",
        }}
      >
        <Grid>
          <Typography variant="h5" component="h2">
            DELETE USER DATA
          </Typography>
          <TextField
            label="User ID"
            variant="outlined"
            required={true}
            fullWidth
            value={deleteUserId}
            onChange={(e) => setDeletedUserId(e.target.value)}
            style={{ marginBottom: "1em" }}
          />
        </Grid>

        <Button
          variant="contained"
          onClick={handleDeleteUser}
          style={{
            padding: "1em 2em",
          }}
        >
          DELETE USER
        </Button>
      </Grid>
      <Grid />
    </Grid>
  );
};

export default UserCard;
