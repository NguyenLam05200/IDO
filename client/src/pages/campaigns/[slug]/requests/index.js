import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useRouter } from "next/router";

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

  return (
    <OnlyClient>
      <Typography variant="h4" className="t-title">
        Requests 📚
      </Typography>
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
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Recipient</StyledTableCell>
              <StyledTableCell align="left">Approved account</StyledTableCell>
              <StyledTableCell align="left">Approve</StyledTableCell>
              <StyledTableCell align="left">Finalize</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.id}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="left">{row.amount}</StyledTableCell>
                <StyledTableCell align="left">{row.recipient}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.approvedAccount}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    className="max-w-fit pl-[10px] pr-[10px]"
                    onClick={() => handelApprove()}
                  >
                    Approve
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    className="max-w-fit pl-[10px] pr-[10px]"
                    onClick={() => handelFinalize()}
                  >
                    Finalize
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </OnlyClient>
  );
}
