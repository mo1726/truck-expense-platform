import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

function ChartsSection({ transactions }) {
  if (transactions.length === 0) {
    return (
      <Typography sx={{ mt: 2 }} color="text.secondary">
        No data to display charts.
      </Typography>
    );
  }

  const categoryData = Object.entries(
    transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {})
  ).map(([category, total]) => ({ category, total }));

  const dateData = Object.entries(
    transactions.reduce((acc, t) => {
      acc[t.date] = (acc[t.date] || 0) + parseFloat(t.amount);
      return acc;
    }, {})
  ).map(([date, total]) => ({ date, total }));

  return (
    <Box mt={4}>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Expenses by Category (Pie)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Expenses Over Time (Line)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dateData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Expenses Over Time (Bar)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dateData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default ChartsSection;
