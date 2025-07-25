package com.example.Personal.Expense.Tracker.Controller;

import com.example.Personal.Expense.Tracker.Dto.TransactionDto;
import com.example.Personal.Expense.Tracker.Entity.Category;
import com.example.Personal.Expense.Tracker.Entity.Type;
import com.example.Personal.Expense.Tracker.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Create
    @PostMapping
    public TransactionDto createTransaction(@RequestBody TransactionDto transactionDto) {
        if (transactionDto.getUserName() == null || transactionDto.getUserName().trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }
        return transactionService.createTransaction(transactionDto);
    }

    // Get all
    @GetMapping
    public List<TransactionDto> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    // Get by ID
    @GetMapping("/{id}")
    public TransactionDto getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    // Get by user name
    @GetMapping("/by-user")
    public List<TransactionDto> getTransactionsByUserName(@RequestParam String userName) {
        return transactionService.getTransactionsByUserName(userName);
    }

    // Get by date
    @GetMapping("/by-date")
    public List<TransactionDto> getTransactionsByDate(@RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        return transactionService.getTransactionsByDate(localDate);
    }

    // Get by category
    @GetMapping("/by-category")
    public List<TransactionDto> getTransactionsByCategory(@RequestParam Category category) {
        return transactionService.getTransactionByCategory(category);
    }

    // Get by type
    @GetMapping("/by-type")
    public List<TransactionDto> getTransactionsByType(@RequestParam Type type) {
        return transactionService.getTransactionsByType(type);
    }

    // Update
    @PutMapping("/{id}")
    public TransactionDto updateTransaction(
            @PathVariable Long id,
            @RequestBody TransactionDto transactionDto
    ) {
        return transactionService.updateTransaction(id, transactionDto);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }
}
