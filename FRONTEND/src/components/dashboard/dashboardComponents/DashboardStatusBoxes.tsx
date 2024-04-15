import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid/Grid";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { useEffect, useState } from "react";
import { getSeatsFetch } from "../../../redux/state/seatState";
import { getSeatsReservedFetch } from "../../../redux/state/seatReservedState";

interface dataFormat {
  seat_id: number;
  seatData: any;
  seatReservedData: any;
}
export default function DashboardStatusBoxed() {
  const shadowStyle = { boxShadow: "0px 4px 10px #25476A" };
  const iconStyle = { width: "2.5vw", height: "2.5vw", color: "#25476A" };
  const paperStyle = { width: "100%", height: "10.5vw" };
  const numberStyle = { fontSize: "2vw" };
  const textStyle = { fontSize: "0.6vw", fontWeight: "bold" };

  const dispatch = useDispatch();
  const seatData = useSelector((state: RootState) => state.seatReducer.seating);
  const seatReservedData = useSelector(
    (state: RootState) => state.seatReservedReducer.seatingReserved
  );
  const [dataState, setDataState] = useState<dataFormat | null>(null);

  useEffect(() => {
    dispatch(getSeatsFetch());
    dispatch(getSeatsReservedFetch());
  }, [dispatch]);

  // Save seatData and seatReservedData to localStorage
  useEffect(() => {
    localStorage.setItem("seatData", JSON.stringify(seatData));
    localStorage.setItem("seatReservedData", JSON.stringify(seatReservedData));
  }, [seatData, seatReservedData]);

  // Retrieve seatData and seatReservedData from localStorage on component mount
  useEffect(() => {
    const storedSeatData = localStorage.getItem("seatData");
    const storedSeatReservedData = localStorage.getItem("seatReservedData");
    if (storedSeatData && storedSeatReservedData) {
      setDataState({
        seat_id: 0, // Dummy value for seat_id, replace it with actual value if necessary
        seatData: JSON.parse(storedSeatData),
        seatReservedData: JSON.parse(storedSeatReservedData),
      });
    }
  }, []);

  {
    /* FOR CHECKING API DATA CONSOLE */
  }
  // console.log(seatData);
  // console.log(seatReservedData);

  {
    /* MOCK DATA FOR TESTING ONLY */
  }
  let totalAssoc = 100;
  // let totalSeats = 100;

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Paper
          elevation={6}
          sx={{
            m: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            ...shadowStyle,
            ...paperStyle, // Applying paperStyle
          }}
        >
          <EventSeatIcon sx={iconStyle} />
          <Typography variant="h6" gutterBottom m={1} sx={{ ...numberStyle }}>
            {seatData.length}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ ...textStyle }}>
            TOTAL SEATS
          </Typography>
        </Paper>
        <Paper
          elevation={6}
          sx={{
            m: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            ...shadowStyle,
            ...paperStyle, // Applying paperStyle
          }}
        >
          <AccountBoxIcon sx={{ ...iconStyle }} />
          <Typography variant="h6" gutterBottom m={1} sx={{ ...numberStyle }}>
            {totalAssoc} {/* MOCK DATA */}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ ...textStyle }}>
            TOTAL ASSOCIATES
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          elevation={6}
          sx={{
            m: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            ...shadowStyle,
            ...paperStyle, // Applying paperStyle
          }}
        >
          <AirlineSeatReclineNormalIcon sx={{ ...iconStyle }} />
          <Typography variant="h6" gutterBottom m={1} sx={{ ...numberStyle }}>
            {seatReservedData.length}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ ...textStyle }}>
            OCCUPIED SEATS
          </Typography>
        </Paper>
        <Paper
          elevation={6}
          sx={{
            m: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            ...shadowStyle,
            ...paperStyle, // Applying paperStyle
          }}
        >
          <InsertEmoticonIcon sx={{ ...iconStyle }} />
          <Typography variant="h6" gutterBottom m={1} sx={{ ...numberStyle }}>
            {seatReservedData.length}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ ...textStyle }}>
            WITH SEATS ASSIGNED
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          elevation={6}
          sx={{
            m: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            ...shadowStyle,
            ...paperStyle, // Applying paperStyle
          }}
        >
          <ChairAltIcon sx={{ ...iconStyle }} />
          <Typography variant="h6" gutterBottom m={1} sx={{ ...numberStyle }}>
            {seatData.length - seatReservedData.length} {/* MOCK DATA */}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ ...textStyle }}>
            AVAILABLE SEATS
          </Typography>
        </Paper>
        <Paper
          elevation={6}
          sx={{
            m: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            ...shadowStyle,
            ...paperStyle, // Applying paperStyle
          }}
        >
          <SentimentVeryDissatisfiedIcon sx={{ ...iconStyle }} />
          <Typography variant="h6" gutterBottom m={1} sx={{ ...numberStyle }}>
            {totalAssoc - seatReservedData.length} {/* MOCK DATA */}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ ...textStyle }}>
            WITHOUT ASSIGNED SEATS
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
