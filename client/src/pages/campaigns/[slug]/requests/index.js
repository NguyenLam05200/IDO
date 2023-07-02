import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import { getProjectRequest } from "@/redux/projectSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Fake data
function createData(id, description, amount, recipient, approvedAccount) {
  return { id, description, amount, recipient, approvedAccount };
}

const rows = [
  createData(111, 159, 6.0, 24, "2/3"),
  createData(222, 237, 9.0, 37, "0/3"),
  createData(333, 262, 16.0, 24, "2/4"),
  createData(444, 305, 3.7, 67, "1/4"),
  createData(555, 356, 16.0, 49, "0/5"),
];

// Handler
function handelApprove() {
  console.log("Approve by ...");
}

function handelFinalize() {
  console.log("Finalize by owner ...");
}

export default function Requests() {
  const router = useRouter();
  const { slug } = router.query;
  const [listRequest, setListRequest] = useState([]);
  useEffect(() => {
    getProjectRequest(slug, setListRequest);
  }, []);

  console.log("____________listRequest: ", listRequest);

  return (
    <OnlyClient>
      <Button
        className="max-w-xs p-[10px] m-[20px]"
        onClick={() =>
          router.push({
            pathname: "/campaigns/[slug]/requests/new",
            query: { slug: slug },
          })
        }
      >
        Add Request ➕
      </Button>
      <TableContainer className="t-table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">Requester</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Reason</StyledTableCell>
              <StyledTableCell align="left">Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listRequest.map((row, idx) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{idx + 1}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.requester}
                </StyledTableCell>
                <StyledTableCell align="left">{row.amount} {` ETH`}</StyledTableCell>
                <StyledTableCell align="left">{row.reason}</StyledTableCell>
                <StyledTableCell align="left">
                  {format(new Date(row.time), 'dd/MM/yyyy hh:mm')}
                </StyledTableCell> 
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </OnlyClient>
  );
}
