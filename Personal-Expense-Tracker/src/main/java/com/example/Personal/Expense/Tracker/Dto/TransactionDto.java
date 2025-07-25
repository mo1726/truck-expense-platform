    package com.example.Personal.Expense.Tracker.Dto;


    import com.example.Personal.Expense.Tracker.Entity.Category;
    import com.example.Personal.Expense.Tracker.Entity.Type;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.math.BigDecimal;
    import java.time.LocalDate;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public class TransactionDto {

        private Long id;
        private String userName;
        private BigDecimal amount;
        private Category category;
        private Type type;
        private LocalDate date;
        private String note;






    }
