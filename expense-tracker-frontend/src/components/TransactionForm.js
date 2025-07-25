import React, { useState } from "react";
import { createTransaction, updateTransaction } from "../Service/transactionService";
import {
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Slide
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSnackbar } from "notistack";

// Slide transition for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TransactionForm({ username, transaction, onClose, onSave }) {
  const [form, setForm] = useState(
    transaction || {
      amount: "0",
      category: "FOOD",
      type: "EXPENSE",
      date: new Date().toISOString().split("T")[0],
      note: ""
    }
  );

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, userName: username };
    try {
      if (transaction) {
        await updateTransaction(transaction.id, data);
        enqueueSnackbar("Transaction updated successfully!", { variant: "success" });
      } else {
        await createTransaction(data);
        enqueueSnackbar("Transaction created successfully!", { variant: "success" });
      }
      onSave();
      onClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred. Please try again.", { variant: "error" });
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {transaction ? "Edit Transaction" : "Add New Transaction"}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="amount"
                type="number"
                label="Amount"
                fullWidth
                required
                value={form.amount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="category"
                label="Category"
                fullWidth
                value={form.category}
                onChange={handleChange}
              >
                {["FOOD", "TRANSPORT", "UTILITIES", "ENTERTAINMENT", "SALARY", "OTHER"].map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="type"
                label="Type"
                fullWidth
                value={form.type}
                onChange={handleChange}
              >
                <MenuItem value="EXPENSE">Expense</MenuItem>
                <MenuItem value="INCOME">Income</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="date"
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                value={form.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="note"
                label="Note"
                fullWidth
                value={form.note}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            startIcon={<CancelIcon />}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
          >
            {transaction ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TransactionForm;
