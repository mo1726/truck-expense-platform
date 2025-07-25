package com.example.Personal.Expense.Tracker.Repository;

import com.example.Personal.Expense.Tracker.Entity.Category;
import com.example.Personal.Expense.Tracker.Entity.Transaction;
import com.example.Personal.Expense.Tracker.Entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByDate(LocalDate date);
    List<Transaction> findByCategory(Category category);
    List<Transaction> findByType(Type type);
    List<Transaction> findByUserName(String userName);
    Optional<Transaction> findById(Long id);




}
