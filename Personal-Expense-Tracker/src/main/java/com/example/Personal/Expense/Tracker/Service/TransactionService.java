package com.example.Personal.Expense.Tracker.Service;

import com.example.Personal.Expense.Tracker.Dto.TransactionDto;
import com.example.Personal.Expense.Tracker.Entity.Category;
import com.example.Personal.Expense.Tracker.Entity.Type;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;



public interface TransactionService {

    TransactionDto createTransaction(TransactionDto transactionDto);
    TransactionDto getTransactionById(Long id);
    List<TransactionDto> getAllTransactions();
    List<TransactionDto> getTransactionsByDate(LocalDate date);
    List<TransactionDto> getTransactionByCategory(Category category);
    List<TransactionDto> getTransactionsByType(Type type);
    TransactionDto updateTransaction(Long id,TransactionDto transactionDto);
    List<TransactionDto> getTransactionsByUserName(String userName);
    void deleteTransaction(Long id);



}
