package com.example.Personal.Expense.Tracker.Service.Impl;

import com.example.Personal.Expense.Tracker.Dto.TransactionDto;
import com.example.Personal.Expense.Tracker.Entity.Category;
import com.example.Personal.Expense.Tracker.Entity.Transaction;
import com.example.Personal.Expense.Tracker.Entity.Type;
import com.example.Personal.Expense.Tracker.Repository.TransactionRepository;
import com.example.Personal.Expense.Tracker.Service.TransactionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;


    @Override
    public TransactionDto createTransaction(TransactionDto transactionDto) {

        Transaction transaction = ToEntity(transactionDto);

        Transaction saveTransaction = transactionRepository.save(transaction);
        return toDto(saveTransaction);

    }

    @Override
    public TransactionDto updateTransaction(Long id ,TransactionDto transactionDto) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("transaction not found"));


        transaction.setAmount(transactionDto.getAmount());
        transaction.setUserName(transactionDto.getUserName());
        transaction.setCategory(transactionDto.getCategory());
        transaction.setType(transactionDto.getType());
        transaction.setDate(transactionDto.getDate());
        transaction.setNote(transactionDto.getNote());

        transactionRepository.save(transaction);
        return toDto(transaction);


    }

    public TransactionDto getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id).
                orElseThrow(()->new  EntityNotFoundException("transaction not found"));

        return toDto(transaction);
    }

    public List<TransactionDto> getAllTransactions(){
        return transactionRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());

    }

    public List<TransactionDto> getTransactionsByDate(LocalDate date){

        return transactionRepository.findByDate(date).stream().map(this::toDto).collect(Collectors.toList());
    }

    public  List<TransactionDto> getTransactionByCategory(Category category){
        return transactionRepository.findByCategory(category).stream().map(this::toDto).collect(Collectors.toList());
    }


    public List<TransactionDto> getTransactionsByType(Type type){
        return transactionRepository.findByType(type).stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<TransactionDto> getTransactionsByUserName(String userName){
        return transactionRepository.findByUserName(userName).stream().map(this::toDto).collect(Collectors.toList());
    }

    public void deleteTransaction(Long id){
     Transaction transaction=   transactionRepository.findById(id).orElseThrow(()->new EntityNotFoundException("transaction not found"));

     transactionRepository.delete(transaction);
    }
















    public TransactionDto toDto(Transaction transaction) {
        return   TransactionDto.builder()
                .id(transaction.getId())
                .amount(transaction.getAmount())
                .category(transaction.getCategory())
                .type(transaction.getType())
                .userName(transaction.getUserName())
                .date(transaction.getDate())
                .note(transaction.getNote())
                .build();


    }

    public Transaction ToEntity(TransactionDto transactionDto) {
        return Transaction.builder()
                .id(transactionDto.getId())
                .amount(transactionDto.getAmount())
                .category(transactionDto.getCategory())
                .type(transactionDto.getType())
                .userName(transactionDto.getUserName())
                .date(transactionDto.getDate())
                .note(transactionDto.getNote())
                .build();
    }







}
