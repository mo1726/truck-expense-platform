import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getTransactionsByUserName,
  deleteTransaction
} from "../Service/transactionService";
import TransactionForm from "./TransactionForm";
import ChartsSection from "./ChartsSection";
import {
  Box,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Toolbar,
  Tooltip,
  ButtonGroup
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import {jsPDF} from "jspdf";
import "jspdf-autotable";
import { ColorModeContext } from "../ThemeContext";

function DashboardPage() {
  const { username } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { toggleColorMode } = useContext(ColorModeContext);

  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadData = async () => {
    try {
      const response = await getTransactionsByUserName(username);
      setTransactions(response.data);
      setFiltered(response.data);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Error loading transactions.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const applyFilters = () => {
    let data = [...transactions];
    if (typeFilter) data = data.filter((t) => t.type === typeFilter);
    if (categoryFilter) data = data.filter((t) => t.category === categoryFilter);
    if (dateFilter) data = data.filter((t) => t.date === dateFilter);
    setFiltered(data);
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      enqueueSnackbar("Transaction deleted.", { variant: "success" });
      loadData();
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Error deleting transaction.", { variant: "error" });
    }
  };

  const handleExportCSV = () => {
    try {
      const csv = Papa.unparse(transactions);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "transactions.csv");
      enqueueSnackbar("CSV exported successfully.", { variant: "success" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Error exporting CSV.", { variant: "error" });
    }
  };

  const handleExportExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(transactions);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "transactions.xlsx");
      enqueueSnackbar("Excel exported successfully.", { variant: "success" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Error exporting Excel.", { variant: "error" });
    }
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text(`${username}'s Transactions`, 14, 16);
      doc.autoTable({
        startY: 20,
        head: [["Amount", "Category", "Type", "Date", "Note"]],
        body: transactions.map((t) => [
          t.amount,
          t.category,
          t.type,
          t.date,
          t.note
        ])
      });
      doc.save("transactions.pdf");
      enqueueSnackbar("PDF exported successfully.", { variant: "success" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Error exporting PDF.", { variant: "error" });
    }
  };

  return (
    <Box p={3}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {username}'s Tracker
        </Typography>

        <Paper>
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <FilterListIcon sx={{ mr: 1 }} />
            <Select
              value={typeFilter}
              displayEmpty
              onChange={(e) => setTypeFilter(e.target.value)}
              sx={{ mr: 2, minWidth: 120 }}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="EXPENSE">Expense</MenuItem>
              <MenuItem value="INCOME">Income</MenuItem>
            </Select>
            <Select
              value={categoryFilter}
              displayEmpty
              onChange={(e) => setCategoryFilter(e.target.value)}
              sx={{ mr: 2, minWidth: 140 }}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="FOOD">Food</MenuItem>
              <MenuItem value="TRANSPORT">Transport</MenuItem>
              <MenuItem value="UTILITIES">Utilities</MenuItem>
              <MenuItem value="ENTERTAINMENT">Entertainment</MenuItem>
              <MenuItem value="SALARY">Salary</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
            <TextField
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              size="small"
            />
            <Button onClick={applyFilters} sx={{ ml: 2 }}>
              Apply
            </Button>
            <ButtonGroup sx={{ ml: 2 }}>
              <Button onClick={handleExportCSV}>Export CSV</Button>
              <Button onClick={handleExportExcel}>Export Excel</Button>
              <Button onClick={handleExportPDF}>Export PDF</Button>
            </ButtonGroup>
            <Button
              sx={{ ml: 2 }}
              startIcon={<Brightness4Icon />}
              onClick={toggleColorMode}
            >
              Toggle Theme
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditTransaction(null);
                setShowForm(true);
              }}
              sx={{ marginLeft: "auto" }}
            >
              Add
            </Button>
          </Toolbar>

          {loading ? (
            <Typography sx={{ p: 2 }}>Loading...</Typography>
          ) : filtered.length === 0 ? (
            <Typography sx={{ p: 2 }} color="text.secondary">
              No transactions found. Use "Add" to create one!
            </Typography>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Amount</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Note</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((t) => (
                        <TableRow
                          key={t.id}
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.04)"
                            }
                          }}
                        >
                          <TableCell>{t.amount}</TableCell>
                          <TableCell>{t.category}</TableCell>
                          <TableCell>{t.type}</TableCell>
                          <TableCell>{t.date}</TableCell>
                          <TableCell>{t.note}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit">
                              <Button onClick={() => {
                                setEditTransaction(t);
                                setShowForm(true);
                              }}>
                                <EditIcon />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <Button color="error" onClick={() => handleDelete(t.id)}>
                                <DeleteIcon />
                              </Button>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={filtered.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </>
          )}
        </Paper>

        <ChartsSection transactions={transactions} />

        {showForm && (
          <TransactionForm
            username={username}
            transaction={editTransaction}
            onClose={() => setShowForm(false)}
            onSave={loadData}
          />
        )}
      </motion.div>
    </Box>
  );
}

export default DashboardPage;
