// C:\My File\S1\oop\webPrep\questions.js

const LastYearVariations = {
  // Q1 (11 pts) - Activity Management with Optional
  activity: [
    {
      title: "Activity Management System with Optional Handling",
      points: 11,
      type: "activity",
      description: `**Problem Statement: Activity Management System with Optional Handling**
Design a system to model physical and financial activities.

**Interfaces:**
1. **PhysicalActivity**: Declares \`String exercise()\` returning exercise type.
2. **FinancialActivity**: Declares \`void manageExpense(String date, double amount)\` to record transactions.

**Individual Class:**
- Implements \`PhysicalActivity\` and \`FinancialActivity\`.
- Private attributes: \`name: String\`, \`expenses: HashMap<String, Double>\`
- Constructor: \`Individual(String name)\`
- Method \`exercise()\`: returns "Exercising"
- Method \`manageExpense(String date, double amount)\`: Accumulates expenses for a specific date (multiple expenses on the same date must be summed up).
- Method \`getTotalExpense(String date)\`: Returns \`Optional<Double>\` containing total spent on that day, or empty if none.
- **Challenge**: Implement \`getAverageExpense()\` returning \`double\` representing the average expense across all logged days (0.0 if empty).`,
      starterCode: `import java.util.HashMap;
import java.util.Optional;

interface PhysicalActivity {
    String exercise();
}

interface FinancialActivity {
    void manageExpense(String date, double amount);
}

class Individual implements PhysicalActivity, FinancialActivity {
    // Implement requirements here
}`,
      testRunner: `(classes, print) => {
        const { Individual, Optional } = classes;
        let score = 0;
        let logs = [];
        try {
          const ind = new Individual("Alice");
          if (ind.exercise() === "Exercising") { score += 2; logs.push("PASS: exercise() returns 'Exercising'"); }
          
          ind.manageExpense("2026-06-22", 150.0);
          ind.manageExpense("2026-06-22", 50.0);
          ind.manageExpense("2026-06-23", 100.0);
          
          const opt = ind.getTotalExpense("2026-06-22");
          if (opt && opt.isPresent() && opt.get() === 200.0) {
            score += 4;
            logs.push("PASS: manageExpense() accumulates daily expenses correctly");
          }
          
          const emptyOpt = ind.getTotalExpense("2026-06-24");
          if (emptyOpt && !emptyOpt.isPresent()) {
            score += 3;
            logs.push("PASS: getTotalExpense() returns empty Optional on empty days");
          }
          
          if (typeof ind.getAverageExpense === 'function') {
            const avg = ind.getAverageExpense();
            if (Math.abs(avg - 150.0) < 0.01) {
              score += 2;
              logs.push("PASS: getAverageExpense() correctly averages expenses");
            }
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    },
    {
      title: "Task Tracking System with Priority Handling",
      points: 11,
      type: "activity",
      description: `**Problem Statement: Task Tracking System**
Design a task tracking system.

**Interfaces:**
1. **PhysicalTask**: Declares \`String perform()\` returning task status.
2. **FinancialTask**: Declares \`void allocateBudget(String date, double amount)\`.

**TaskManager Class:**
- Implements both \`PhysicalTask\` and \`FinancialTask\`.
- Private attributes: \`projectName: String\`, \`budgets: HashMap<String, Double>\`
- Constructor: \`TaskManager(String projectName)\`
- Method \`perform()\`: returns "Task Completed"
- Method \`allocateBudget(String date, double amount)\`: Accumulates budget allocated for a specific day.
- Method \`getDailyBudget(String date)\`: Returns \`Optional<Double>\` representing budget for a day, or empty if none.
- **Challenge**: Implement \`getMaxBudgetDate()\` returning \`Optional<String>\` indicating the date with the highest budget allocation.`,
      starterCode: `import java.util.HashMap;
import java.util.Optional;

interface PhysicalTask {
    String perform();
}

interface FinancialTask {
    void allocateBudget(String date, double amount);
}

class TaskManager implements PhysicalTask, FinancialTask {
    // Implement requirements here
}`,
      testRunner: `(classes, print) => {
        const { TaskManager, Optional } = classes;
        let score = 0;
        let logs = [];
        try {
          const manager = new TaskManager("Project X");
          if (manager.perform() === "Task Completed") { score += 2; logs.push("PASS: perform() works"); }
          
          manager.allocateBudget("2026-07-01", 300.0);
          manager.allocateBudget("2026-07-01", 200.0);
          manager.allocateBudget("2026-07-02", 400.0);
          
          const opt = manager.getDailyBudget("2026-07-01");
          if (opt && opt.isPresent() && opt.get() === 500.0) {
            score += 4;
            logs.push("PASS: allocateBudget() aggregates daily budget");
          }
          
          const emptyOpt = manager.getDailyBudget("2026-07-03");
          if (emptyOpt && !emptyOpt.isPresent()) {
            score += 3;
            logs.push("PASS: getDailyBudget() handles empty days");
          }
          
          if (typeof manager.getMaxBudgetDate === 'function') {
            const maxOpt = manager.getMaxBudgetDate();
            if (maxOpt && maxOpt.isPresent() && maxOpt.get() === "2026-07-01") {
              score += 2;
              logs.push("PASS: getMaxBudgetDate() returns date with max budget");
            }
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    }
  ],

  // Q2 (3 pts) - Taxes and Classes
  tax: [
    {
      title: "Simple Item Tax Calculator",
      points: 3,
      type: "tax",
      description: `**Problem Statement: Simple Item Tax Calculator**
Develop a program to calculate tax for items.

**Item Class (Base):**
- Attributes: \`name: String\`, \`price: int\`
- Constructor: \`Item(String name, int price)\`
- Getters/setters for attributes.
- Method \`calculateTax() : double\`: Returns \`0.0\`.

**Chocolate Class (Subclass):**
- Additional Attribute: \`cocoaPercentage: double\`
- Constructor: \`Chocolate(String name, int price, double cocoaPercentage)\`
- Overrides \`calculateTax()\`: Tax is 12% (0.12) of price.

**Cigarettes Class (Subclass):**
- Additional Attribute: \`nicotinePercentage: double\`
- Constructor: \`Cigarettes(String name, int price, double nicotinePercentage)\`
- Overrides \`calculateTax()\`: Tax is 89% (0.89) of price.`,
      starterCode: `class Item {
    // Implement base class Item
}

class Chocolate extends Item {
    // Implement subclass Chocolate (12% tax)
}

class Cigarettes extends Item {
    // Implement subclass Cigarettes (89% tax)
}`,
      testRunner: `(classes, print) => {
        const { Item, Chocolate, Cigarettes } = classes;
        let score = 0;
        let logs = [];
        try {
          const item = new Item("Book", 100);
          if (item.calculateTax() === 0.0) { score += 1; logs.push("PASS: Item default tax is 0.0"); }
          
          const choco = new Chocolate("Dark Choco", 200, 75.0);
          if (Math.abs(choco.calculateTax() - 24.0) < 0.01) { score += 1; logs.push("PASS: Chocolate tax is 12% of price (24.0)"); }
          
          const cigs = new Cigarettes("Marlboro", 300, 1.2);
          if (Math.abs(cigs.calculateTax() - 267.0) < 0.01) { score += 1; logs.push("PASS: Cigarettes tax is 89% of price (267.0)"); }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    },
    {
      title: "Vehicle Tax Calculator",
      points: 3,
      type: "tax",
      description: `**Problem Statement: Vehicle Tax Calculator**
Develop a tax system for vehicles.

**Vehicle Class (Base):**
- Attributes: \`model: String\`, \`basePrice: int\`
- Constructor: \`Vehicle(String model, int basePrice)\`
- Getters/setters.
- Method \`calculateTax() : double\`: Returns \`0.0\`.

**Car Class (Subclass):**
- Additional Attribute: \`engineSize: double\`
- Constructor: \`Car(String model, int basePrice, double engineSize)\`
- Overrides \`calculateTax()\`: Tax is 15% (0.15) of basePrice.

**Motorcycle Class (Subclass):**
- Additional Attribute: \`isSport: boolean\`
- Constructor: \`Motorcycle(String model, int basePrice, boolean isSport)\`
- Overrides \`calculateTax()\`: Tax is 8% (0.08) of basePrice.`,
      starterCode: `class Vehicle {
    // Implement base class Vehicle
}

class Car extends Vehicle {
    // Implement Car
}

class Motorcycle extends Vehicle {
    // Implement Motorcycle
}`,
      testRunner: `(classes, print) => {
        const { Vehicle, Car, Motorcycle } = classes;
        let score = 0;
        let logs = [];
        try {
          const v = new Vehicle("Generic", 1000);
          if (v.calculateTax() === 0.0) score += 1;
          
          const car = new Car("Tesla", 10000, 2.0);
          if (Math.abs(car.calculateTax() - 1500.0) < 0.01) score += 1;
          
          const moto = new Motorcycle("Yamaha", 5000, true);
          if (Math.abs(moto.calculateTax() - 400.0) < 0.01) score += 1;
          
          logs.push("Checked Vehicle, Car (15% tax) and Motorcycle (8% tax)");
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    }
  ],

  // Q3 (3 pts) - Database query
  database: [
    {
      title: "Database Retrieval - Users Filter",
      points: 3,
      type: "database",
      description: `**Problem Statement: Database Retrieval - Users**
Write a Java program that connects to a MySQL database and retrieves user data.

**Requirements:**
- Implement a method \`getUsers(String name, int id)\` in class \`DatabaseManager\`.
- Query table \`users\`. Retrieve records whose \`name\` is NOT EQUAL to the parameter, and whose \`id\` is LESS than or equal to the parameter.
- Write records to the console in format: \`id + "-" + name\`.

**Connection Properties:**
- Connection String: \`jdbc:mysql://oop.ibu.edu.ba:3306/oopgroup1?allowPublicKeyRetrieval=true\`
- Username: \`oopuser\`
- Password: \`ooppassWD\``,
      starterCode: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

class DatabaseManager {
    public void getUsers(String name, int id) {
        String url = "jdbc:mysql://oop.ibu.edu.ba:3306/oopgroup1?allowPublicKeyRetrieval=true";
        String username = "oopuser";
        String password = "ooppassWD";
        // Connect, query, and print results in format: id + "-" + name
    }
}`,
      testRunner: `(classes, print, consoleLogs) => {
        const { DatabaseManager } = classes;
        let score = 0;
        let logs = [];
        try {
          const db = new DatabaseManager();
          consoleLogs.length = 0;
          db.getUsers("Bob", 3);
          
          const output = consoleLogs.map(l => l.trim());
          if (output.includes("1-Alice") && output.includes("3-Charlie") && !output.includes("2-Bob")) {
            score += 3;
            logs.push("PASS: Database query successfully matched and printed filtered database records.");
          } else {
            logs.push("FAIL: Output logs did not match expected query results. Got: " + JSON.stringify(output));
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    },
    {
      title: "Database Retrieval - Product Search",
      points: 3,
      type: "database",
      description: `**Problem Statement: Database Retrieval - Products**
Write a Java program to retrieve product data.

**Requirements:**
- Class \`InventoryDB\` with method \`getExpensiveProducts(double minPrice)\`.
- Query table \`products\`, select records where \`price\` is greater than or equal to \`minPrice\`.
- Output each record in format: \`product_id + ":" + name + "($" + price + ")"\`.

**Connection Properties:**
- Connection String: \`jdbc:mysql://oop.ibu.edu.ba:3306/oopgroup1?allowPublicKeyRetrieval=true\`
- Username: \`oopuser\`
- Password: \`ooppassWD\``,
      starterCode: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

class InventoryDB {
    public void getExpensiveProducts(double minPrice) {
        String url = "jdbc:mysql://oop.ibu.edu.ba:3306/oopgroup1?allowPublicKeyRetrieval=true";
        String username = "oopuser";
        String password = "ooppassWD";
        // Connect and print
    }
}`,
      testRunner: `(classes, print, consoleLogs) => {
        const { InventoryDB } = classes;
        let score = 0;
        let logs = [];
        try {
          const db = new InventoryDB();
          consoleLogs.length = 0;
          db.getExpensiveProducts(300.0);
          
          const output = consoleLogs.map(l => l.replace(/\\s+/g, ''));
          if (output.includes("101:Laptop($1200)") && output.includes("104:Monitor($300)") && !output.includes("103:Headphones($150)")) {
            score += 3;
            logs.push("PASS: Database query successfully retrieved products.");
          } else {
            logs.push("FAIL: Output logs did not match. Got: " + JSON.stringify(output));
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    }
  ],

  // Q4 (15 pts) - Generics / Downcasting
  large: [
    {
      title: "Employee Hierarchy and Filtering System",
      points: 15,
      type: "large",
      description: `**Problem Statement: Employee Hierarchy and Filtering System**
Design a system to manage employee hierarchy and generic filtering.

**Classes & Enums:**
1. **Gender**: Enum with values \`MALE\` and \`FEMALE\`.
2. **Person (Base Class):**
   - Attributes: \`String firstName\`, \`int age\`, \`Gender gender\`
   - Constructor: \`Person(String firstName, int age, Gender gender)\`
   - Implement getters/setters.
3. **Assistant and Professor (Derived Classes):**
   - Inherit from \`Person\`. Constructors call \`super\`.
4. **Company<T extends Person> (Generic Class):**
   - Attribute: \`employees: List<T>\`
   - Constructor to set list. Getters and setters.
   - Method \`filterByGender(Gender gender)\`: Filters employees. Returns \`Optional<List<T>>\`.
   - Method \`getByFirstName(String firstName)\`: Retrieves employee by first name. Returns \`Optional<T>\`.`,
      starterCode: `import java.util.List;
import java.util.Optional;

enum Gender {
    MALE, FEMALE
}

class Person {
    // Implement Person
}

class Assistant extends Person {
    // Implement Assistant
}

class Professor extends Person {
    // Implement Professor
}

class Company<T extends Person> {
    // Implement Company
}`,
      testRunner: `(classes, print) => {
        const { Person, Assistant, Professor, Company, Gender, Optional, ArrayList } = classes;
        let score = 0;
        let logs = [];
        try {
          const list = new ArrayList();
          const p1 = new Professor("Jane", 45, Gender.FEMALE);
          const p2 = new Assistant("Mark", 28, Gender.MALE);
          list.add(p1);
          list.add(p2);
          
          const company = new Company(list);
          
          if (p1.getFirstName() === "Jane" && p2.getAge() === 28) { score += 4; logs.push("PASS: Hierarchy setup works"); }
          
          const filterOpt = company.filterByGender(Gender.FEMALE);
          if (filterOpt && filterOpt.isPresent() && filterOpt.get().size() === 1) {
            score += 6;
            logs.push("PASS: filterByGender() works");
          }
          
          const nameOpt = company.getByFirstName("Mark");
          if (nameOpt && nameOpt.isPresent() && nameOpt.get().getFirstName() === "Mark") {
            score += 5;
            logs.push("PASS: getByFirstName() works");
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    },
    {
      title: "Inventory Management System with Downcasting",
      points: 15,
      type: "large",
      description: `**Problem Statement: Inventory Management System**
Design abstract inventory items with downcasting checks.

**Classes & Interfaces:**
1. **Product (Interface):** declares \`displayDetails() : String\`.
2. **InventoryItem (Abstract Class):**
   - Implements \`Product\`.
   - Attributes: \`productName: String\`, \`price: double\`, \`quantity: int\`.
   - Constructor: \`InventoryItem(String productName, double price, int quantity)\`.
   - Getters/setters.
3. **ElectronicsProduct (Concrete Class):**
   - Extends \`InventoryItem\`. Extra Attribute: \`brand: String\`.
   - Overrides \`displayDetails()\`: Returns "ElectronicsProduct".
4. **ClothingProduct (Concrete Class):**
   - Extends \`InventoryItem\`. Extra Attribute: \`size: String\`.
   - Overrides \`displayDetails()\`: Returns "ClothingProduct".
5. **InventoryManager Class:**
   - Method \`updateInventory(List<InventoryItem> items) : List<InventoryItem>\`:
     Apply 10% discount to \`ElectronicsProduct\`, and 20% discount to \`ClothingProduct\`. Return updated list.`,
      starterCode: `import java.util.List;

interface Product {
    String displayDetails();
}

abstract class InventoryItem implements Product {
    // Implement InventoryItem
}

class ElectronicsProduct extends InventoryItem {
    // Implement ElectronicsProduct
}

class ClothingProduct extends InventoryItem {
    // Implement ClothingProduct
}

class InventoryManager {
    // Implement updateInventory with discounts
}`,
      testRunner: `(classes, print) => {
        const { ElectronicsProduct, ClothingProduct, InventoryManager, ArrayList } = classes;
        let score = 0;
        let logs = [];
        try {
          const list = new ArrayList();
          const ep = new ElectronicsProduct("Phone", 1000.0, 5, "Samsung");
          const cp = new ClothingProduct("Jacket", 200.0, 10, "L");
          list.add(ep);
          list.add(cp);
          
          const manager = new InventoryManager();
          const updated = manager.updateInventory(list);
          
          if (ep.displayDetails() === "ElectronicsProduct" && cp.displayDetails() === "ClothingProduct") {
            score += 5;
            logs.push("PASS: displayDetails() overridden correctly");
          }
          
          if (updated && updated.size() === 2) {
            const upEp = updated.get(0);
            const upCp = updated.get(1);
            if (Math.abs(upEp.getPrice() - 900.0) < 0.01 && Math.abs(upCp.getPrice() - 160.0) < 0.01) {
              score += 10;
              logs.push("PASS: InventoryManager applied correct discounts using downcasting");
            }
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    }
  ],

  // Q5 (5 pts) - Singleton
  singleton: [
    {
      title: "Singleton Design Pattern - Configuration Manager",
      points: 5,
      type: "singleton",
      description: `**Problem Statement: Singleton Pattern (Configuration Manager)**
Create a Singleton configuration class to store system configuration properties.

**Requirements:**
- Class \`ConfigurationManager\` must use the Singleton Pattern.
- Private constructor to prevent direct instantiation.
- Public static method \`ConfigurationManager getInstance()\` returning the single instance.
- Private attribute \`configSettings: HashMap<String, String>\`.
- Methods:
  - \`void setSetting(String key, String value)\`
  - \`Optional<String> getSetting(String key)\`: Returns the config value wrapped in an \`Optional\`, or empty if missing.
  - \`void clearSettings()\``,
      starterCode: `import java.util.HashMap;
import java.util.Optional;

class ConfigurationManager {
    // Implement Singleton pattern, configSettings, setSetting, getSetting
}`,
      testRunner: `(classes, print) => {
        const { ConfigurationManager, Optional } = classes;
        let score = 0;
        let logs = [];
        try {
          const inst1 = ConfigurationManager.getInstance();
          const inst2 = ConfigurationManager.getInstance();
          
          if (inst1 === inst2) {
            score += 2;
            logs.push("PASS: getInstance() returns the same static instance");
          }
          
          inst1.setSetting("theme", "dark");
          const valOpt = inst2.getSetting("theme");
          if (valOpt && valOpt.isPresent() && valOpt.get() === "dark") {
            score += 2;
            logs.push("PASS: setSetting and getSetting work across instances (Optional)");
          }
          
          const missingOpt = inst1.getSetting("fontSize");
          if (missingOpt && !missingOpt.isPresent()) {
            score += 1;
            logs.push("PASS: getSetting returns empty Optional for non-existent keys");
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    }
  ],

  // Q6 (3 pts) - Book factory
  factoryPattern: [
    {
      title: "Book Class and Factory Method Pattern",
      points: 3,
      type: "factoryPattern",
      description: `**Problem Statement: Book Factory Method Pattern**
Implement a Book creation system using the Factory Method pattern.

**Book Class:**
- Attributes: \`isbn: String\`, \`title: String\`, \`author: String\`, \`price: double\`, \`category: BookCategory\`
- Constructor: \`Book(String isbn, String title, String author, double price, BookCategory category)\`
- Getters and setters.

**BookCategory (Enum):**
- Values: \`FICTION\`, \`SCIENCE\`, \`HISTORY\`.

**BookFactory (Interface):**
- Method \`Book createBook(String isbn, String title, String author, double price)\`.

**Concrete Factory Classes:**
- \`FictionBookFactory\`: creates Book with \`BookCategory.FICTION\`
- \`ScienceBookFactory\`: creates Book with \`BookCategory.SCIENCE\``,
      starterCode: `enum BookCategory {
    FICTION, SCIENCE, HISTORY
}

class Book {
    // Implement Book fields and constructors
}

interface BookFactory {
    Book createBook(String isbn, String title, String author, double price);
}

class FictionBookFactory implements BookFactory {
    // Implement FictionBookFactory
}

class ScienceBookFactory implements BookFactory {
    // Implement ScienceBookFactory
}`,
      testRunner: `(classes, print) => {
        const { BookCategory, Book, FictionBookFactory, ScienceBookFactory } = classes;
        let score = 0;
        let logs = [];
        try {
          const fictionFactory = new FictionBookFactory();
          const scienceFactory = new ScienceBookFactory();
          
          const book1 = fictionFactory.createBook("111", "Dune", "Frank Herbert", 19.99);
          const book2 = scienceFactory.createBook("222", "Cosmos", "Carl Sagan", 24.99);
          
          if (book1.getCategory() === BookCategory.FICTION && book1.getTitle() === "Dune") {
            score += 1.5;
            logs.push("PASS: FictionBookFactory sets category to FICTION");
          }
          if (book2.getCategory() === BookCategory.SCIENCE && book2.getAuthor() === "Carl Sagan") {
            score += 1.5;
            logs.push("PASS: ScienceBookFactory sets category to SCIENCE");
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    }
  ],

  // Q7 (5 pts) - Exception handling and custom exception
  exceptions: [
    {
      title: "Checked Exception & Custom Balance Validation",
      points: 5,
      type: "exceptions",
      description: `**Problem Statement: Insufficient Funds Exception Handling**
Develop a transaction balance checker utilizing a checked exception.

**Custom Exception:**
- Create a checked exception \`InsufficientFundsException\` that extends \`Exception\`.
- Include a constructor with a message.

**BankAccount Class:**
- Attribute: \`balance: double\`.
- Constructor: \`BankAccount(double balance)\` to initialize the balance.
- Method \`void withdraw(double amount) throws InsufficientFundsException\`:
  - If \`amount > balance\`, throw an \`InsufficientFundsException\` with the message "Insufficient balance to withdraw".
  - Otherwise, deduct \`amount\` from \`balance\`.`,
      starterCode: `class InsufficientFundsException extends Exception {
    // Implement checked exception
}

class BankAccount {
    // Implement BankAccount with checked exception throws
}`,
      testRunner: `(classes, print) => {
        const { BankAccount, InsufficientFundsException } = classes;
        let score = 0;
        let logs = [];
        try {
          const acc = new BankAccount(500.0);
          acc.withdraw(200.0);
          
          // Check withdrawal balance deduct
          // In JS, check reflection of withdraw and exception
          const codeStr = BankAccount.toString() + " " + InsufficientFundsException.toString();
          if (codeStr.includes("extends Exception")) {
            score += 1;
            logs.push("PASS: InsufficientFundsException inherits from checked Exception class");
          }
          
          try {
            acc.withdraw(400.0);
            logs.push("FAIL: Withdrawal succeeded but amount was greater than balance");
          } catch (e) {
            if (e.message.includes("Insufficient balance")) {
              score += 4;
              logs.push("PASS: withdraw() correctly throws InsufficientFundsException with appropriate message");
            }
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    }
  ],

  // Q8 (5 pts) - Builder Pattern
  builderPattern: [
    {
      title: "Builder Pattern - Computer Configuration",
      points: 5,
      type: "builder",
      description: `**Problem Statement: Builder Pattern (Computer Config)**
You are tasked with designing a fluent Builder pattern for configuring Computer systems.

**Computer Class:**
- Attributes:
  - \`cpu: String\`
  - \`ram: int\`
  - \`storage: int\`
  - \`hasGraphicsCard: boolean\`
  - \`os: String\`
- Implement a private constructor \`Computer(ComputerBuilder builder)\` to construct the object.
- Implement getter methods for all attributes.

**ComputerBuilder (Static Inner Class of Computer):**
- Attributes matching the outer class.
- Methods to set each attribute with fluent chaining (returning \`ComputerBuilder\`):
  - \`ComputerBuilder setCpu(String cpu)\`
  - \`ComputerBuilder setRam(int ram)\`
  - \`ComputerBuilder setStorage(int storage)\`
  - \`ComputerBuilder setHasGraphicsCard(boolean hasGraphicsCard)\`
  - \`ComputerBuilder setOs(String os)\`
- Method \`Computer build()\` returning a new \`Computer\` instance.`,
      starterCode: `class Computer {
    // Attributes, constructor, and getters
    
    public static class ComputerBuilder {
        // Builder attributes, set methods, and build() method
    }
}`,
      testRunner: `(classes, print) => {
        const { Computer } = classes;
        let score = 0;
        let logs = [];
        try {
          const comp = new Computer.ComputerBuilder()
            .setCpu("Intel i9")
            .setRam(32)
            .setStorage(1024)
            .setHasGraphicsCard(true)
            .setOs("Linux")
            .build();
            
          if (comp && comp.getCpu() === "Intel i9" && comp.getRam() === 32 && comp.getStorage() === 1024 && comp.getHasGraphicsCard() === true && comp.getOs() === "Linux") {
            score += 5;
            logs.push("PASS: ComputerBuilder successfully instantiates Computer with fluent chaining properties.");
          } else {
            logs.push("FAIL: Computer properties were not set correctly by builder");
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    },
    {
      title: "Builder Pattern - User Profile Creation",
      points: 5,
      type: "builder",
      description: `**Problem Statement: Builder Pattern (UserProfile)**
You are tasked with designing a fluent Builder pattern for creating User Profiles.

**UserProfile Class:**
- Attributes:
  - \`username: String\`
  - \`email: String\`
  - \`firstName: String\`
  - \`lastName: String\`
  - \`phoneNumber: String\`
- Implement a private constructor \`UserProfile(UserProfileBuilder builder)\` to construct the object.
- Implement getter methods for all attributes.

**UserProfileBuilder (Static Inner Class of UserProfile):**
- Attributes matching the outer class.
- Methods to set each attribute with fluent chaining (returning \`UserProfileBuilder\`):
  - \`UserProfileBuilder setUsername(String username)\`
  - \`UserProfileBuilder setEmail(String email)\`
  - \`UserProfileBuilder setFirstName(String firstName)\`
  - \`UserProfileBuilder setLastName(String lastName)\`
  - \`UserProfileBuilder setPhoneNumber(String phoneNumber)\`
- Method \`UserProfile build()\` returning a new \`UserProfile\` instance.`,
      starterCode: `class UserProfile {
    // Attributes, constructor, and getters
    
    public static class UserProfileBuilder {
        // Builder attributes, set methods, and build() method
    }
}`,
      testRunner: `(classes, print) => {
        const { UserProfile } = classes;
        let score = 0;
        let logs = [];
        try {
          const profile = new UserProfile.UserProfileBuilder()
            .setUsername("coding_ninja")
            .setEmail("ninja@code.com")
            .setFirstName("John")
            .setLastName("Doe")
            .setPhoneNumber("123456")
            .build();
            
          if (profile && profile.getUsername() === "coding_ninja" && profile.getEmail() === "ninja@code.com" && profile.getFirstName() === "John" && profile.getLastName() === "Doe" && profile.getPhoneNumber() === "123456") {
            score += 5;
            logs.push("PASS: UserProfileBuilder successfully instantiates UserProfile with fluent chaining.");
          } else {
            logs.push("FAIL: UserProfile properties were not set correctly by builder");
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    }
  ]
};

// Programmatic Generator for the 10 Packets (Last Year)
function generateLastYearPackets() {
  const packets = [];
  for (let i = 1; i <= 10; i++) {
    const packetQuestions = [];
    
    // Q1 (11 Points) - Activity/Task
    const q1Base = LastYearVariations.activity[(i - 1) % LastYearVariations.activity.length];
    packetQuestions.push({
      id: `ly_p${i}_q1`,
      title: `${q1Base.title} (Packet ${i})`,
      points: q1Base.points,
      type: q1Base.type,
      description: q1Base.description,
      starterCode: q1Base.starterCode,
      testRunner: q1Base.testRunner
    });

    // Q2 (3 Points) - Tax
    const q2Base = LastYearVariations.tax[(i - 1) % LastYearVariations.tax.length];
    packetQuestions.push({
      id: `ly_p${i}_q2`,
      title: `${q2Base.title} (Packet ${i})`,
      points: q2Base.points,
      type: q2Base.type,
      description: q2Base.description,
      starterCode: q2Base.starterCode,
      testRunner: q2Base.testRunner
    });

    // Q3 (3 Points) - Database
    const q3Base = LastYearVariations.database[(i - 1) % LastYearVariations.database.length];
    packetQuestions.push({
      id: `ly_p${i}_q3`,
      title: `${q3Base.title} (Packet ${i})`,
      points: q3Base.points,
      type: q3Base.type,
      description: q3Base.description,
      starterCode: q3Base.starterCode,
      testRunner: q3Base.testRunner
    });

    // Q4 (15 Points) - Large hierarchy or Inventory (Alternating)
    const q4Base = LastYearVariations.large[(i - 1) % LastYearVariations.large.length];
    packetQuestions.push({
      id: `ly_p${i}_q4`,
      title: `${q4Base.title} (Packet ${i})`,
      points: q4Base.points,
      type: q4Base.type,
      description: q4Base.description,
      starterCode: q4Base.starterCode,
      testRunner: q4Base.testRunner
    });

    // Q5 (5 Points) - Singleton Pattern
    const q5Base = LastYearVariations.singleton[0];
    let singletonTitle = q5Base.title;
    let singletonDesc = q5Base.description;
    let singletonClass = "ConfigurationManager";
    if (i % 3 === 1) {
      singletonTitle = "Singleton Design Pattern - Configuration Manager";
      singletonClass = "ConfigurationManager";
    } else if (i % 3 === 2) {
      singletonTitle = "Singleton Design Pattern - DatabaseConnection";
      singletonClass = "DatabaseConnection";
      singletonDesc = singletonDesc.replace(/ConfigurationManager/g, "DatabaseConnection").replace(/configSettings/g, "connectionParams").replace(/setSetting/g, "setParam").replace(/getSetting/g, "getParam").replace(/clearSettings/g, "disconnect");
    } else {
      singletonTitle = "Singleton Design Pattern - MemoryCache";
      singletonClass = "MemoryCache";
      singletonDesc = singletonDesc.replace(/ConfigurationManager/g, "MemoryCache").replace(/configSettings/g, "cachedItems").replace(/setSetting/g, "put").replace(/getSetting/g, "get").replace(/clearSettings/g, "evictAll");
    }
    
    packetQuestions.push({
      id: `ly_p${i}_q5`,
      title: singletonTitle + ` (Packet ${i})`,
      points: 5,
      type: "singleton",
      description: singletonDesc,
      starterCode: `import java.util.HashMap;
import java.util.Optional;

class ${singletonClass} {
    // Implement Singleton pattern methods here
}`,
      testRunner: `(classes, print) => {
        const { ${singletonClass}, Optional } = classes;
        let score = 0;
        let logs = [];
        try {
          const inst1 = ${singletonClass}.getInstance();
          const inst2 = ${singletonClass}.getInstance();
          if (inst1 === inst2) { score += 2; logs.push("PASS: Singleton getInstance() matches"); }
          
          const setter = inst1.setSetting || inst1.setParam || inst1.put;
          const getter = inst1.getSetting || inst1.getParam || inst1.get;
          
          if (setter && getter) {
            setter.call(inst1, "theme", "dark");
            const opt = getter.call(inst2, "theme");
            if (opt && opt.isPresent() && opt.get() === "dark") {
              score += 2;
              logs.push("PASS: Values fetched correctly across singleton static context");
            }
            const optEmpty = getter.call(inst1, "font");
            if (optEmpty && !optEmpty.isPresent()) {
              score += 1;
              logs.push("PASS: Missing keys return empty Optional");
            }
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`
    });

    // Q6 (3 Points) - Factory
    const q6Base = LastYearVariations.factoryPattern[0];
    packetQuestions.push({
      id: `ly_p${i}_q6`,
      title: `${q6Base.title} (Packet ${i})`,
      points: q6Base.points,
      type: q6Base.type,
      description: q6Base.description,
      starterCode: q6Base.starterCode,
      testRunner: q6Base.testRunner
    });

    // Q7 (5 Points) - Exception
    const q7Base = LastYearVariations.exceptions[0];
    
    // Add variations to Exception questions
    let exceptionTitle = q7Base.title;
    let exceptionDesc = q7Base.description;
    let exceptionClass = "InsufficientFundsException";
    let containerClass = "BankAccount";
    let starterCodeException = q7Base.starterCode;
    let testRunnerException = q7Base.testRunner;
    
    if (i % 2 === 0) {
      exceptionTitle = "Checked Exception & Custom Registration Age Validation";
      exceptionClass = "InvalidAgeException";
      containerClass = "UserRegistration";
      exceptionDesc = `**Problem Statement: User Registration Age Validation**
Develop an age registration system utilizing a checked custom exception.

**Custom Exception:**
- Create a checked exception \`InvalidAgeException\` that extends \`Exception\`.
- Include a constructor with a message.

**UserRegistration Class:**
- Attribute: \`age: int\`.
- Constructor: \`UserRegistration(int age)\` to set age.
- Method \`void register() throws InvalidAgeException\`:
  - If \`age < 18\`, throw an \`InvalidAgeException\` with the message "Underage registration blocked".`;
      starterCodeException = `class InvalidAgeException extends Exception {
    // Implement checked exception
}

class UserRegistration {
    // Implement UserRegistration with custom exception throws
}`;
      testRunnerException = `(classes, print) => {
        const { UserRegistration, InvalidAgeException } = classes;
        let score = 0;
        let logs = [];
        try {
          const reg = new UserRegistration(15);
          const codeStr = UserRegistration.toString() + " " + InvalidAgeException.toString();
          if (codeStr.includes("extends Exception")) {
            score += 1;
            logs.push("PASS: InvalidAgeException inherits from Exception");
          }
          
          try {
            reg.register();
            logs.push("FAIL: register() succeeded for underage");
          } catch (e) {
            if (e.message.includes("Underage")) {
              score += 4;
              logs.push("PASS: register() correctly throws InvalidAgeException");
            }
          }
        } catch(e) { logs.push("EXCEPTION: " + e.message); }
        return { score, logs };
      }`;
    }

    packetQuestions.push({
      id: `ly_p${i}_q7`,
      title: exceptionTitle + ` (Packet ${i})`,
      points: 5,
      type: "exceptions",
      description: exceptionDesc,
      starterCode: starterCodeException,
      testRunner: testRunnerException
    });

    // Q8 (5 Points) - Builder Pattern
    const q8Base = LastYearVariations.builderPattern[(i - 1) % LastYearVariations.builderPattern.length];
    packetQuestions.push({
      id: `ly_p${i}_q8`,
      title: `${q8Base.title} (Packet ${i})`,
      points: q8Base.points,
      type: q8Base.type,
      description: q8Base.description,
      starterCode: q8Base.starterCode,
      testRunner: q8Base.testRunner
    });

    packets.push({
      packetNum: i,
      questions: packetQuestions
    });
  }
  return packets;
}

const LAST_YEAR_PACKETS = generateLastYearPackets();

// BECIR QUESTIONS (7 Questions, featuring 4 Builder Pattern and 3 Factory Pattern)
const BECIR_QUESTIONS = [
  // Q1: Book Sales Transformation (Builder, CSV, Annotations, Exception)
  {
    id: "becir_q1",
    title: "Book Sales Transformation & Annotation Writing Concerns",
    points: 10,
    type: "builder",
    description: `**Problem Statement: Book Data Transformation and Reporting (Builder Pattern)**
You are tasked with loading book sales records from a CSV file, formatting them based on custom annotations, and writing a clean CSV report.

**Enums:**
1. \`CaseFormatter\`: \`ORDINARY\`, \`UPPER_CASE\`, \`LOWER_CASE\`
2. \`NumberFormatter\`: \`COMMA\`, \`PERCENTAGE\`

**Annotation:**
Define a custom runtime annotation \`@WriteConcerns\` to use at attribute level:
- \`CaseFormatter case_format()\` default \`CaseFormatter.ORDINARY\`
- \`NumberFormatter number_format()\` default \`NumberFormatter.COMMA\`

**Book Class:**
- Attributes:
  - \`date: Date\` (Annotated with \`@WriteConcerns\`)
  - \`quarter: String\` (Annotated with \`@WriteConcerns(case_format = CaseFormatter.ORDINARY)\`)
  - \`qtr: int\`
  - \`year: int\`
  - \`customerId: String\` (Annotated with \`@WriteConcerns(case_format = CaseFormatter.UPPER_CASE)\`)
  - \`totalAmount: double\` (Annotated with \`@WriteConcerns(number_format = NumberFormatter.COMMA)\`)
  - \`profitPercentage: double\` (Annotated with \`@WriteConcerns(number_format = NumberFormatter.PERCENTAGE)\`)
  - \`profitInr: double\`
  - \`costPrice: double\`
- Implement a static inner builder class \`BookBuilder\` with a fluent interface to construct \`Book\`.

**Custom Exception:**
- Create \`WrongFormatException\` extending \`RuntimeException\`. Support constructors for message, and message + cause.

**Data Loading Class (FinalPrep):**
- Static method \`List<Book> loadBooks(String fileName)\`:
  - Reads CSV using \`BufferedReader\`.
  - Parses fields. If \`date\`, \`customerId\`, or \`totalAmount\` is empty, throw \`WrongFormatException\` with message "Values are empty" and set cause as \`ClassCastException\`.
  - Returns a list of books.
- **Challenge**: Implement static method \`findBookByCustomerId(List<Book> books, String id)\` returning \`Optional<Book>\`.

**Reporting Class (ReportWriter):**
- Static method \`void writeReport(String outputFileName, List<Book> books)\`:
  - Creates a header line in the output file.
  - Formats fields using Reflection + \`@WriteConcerns\`:
    - \`UPPER_CASE\`: Convert to uppercase.
    - \`LOWER_CASE\`: Convert to lowercase.
    - \`PERCENTAGE\`: Format as \`value + "%"\`.
    - \`COMMA\`: Format using \`DecimalFormat df = new DecimalFormat("#,###.##"); df.format(value);\`.`,
    starterCode: `import java.util.*;
import java.io.*;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.lang.annotation.*;
import java.lang.reflect.*;

enum CaseFormatter {
    ORDINARY, UPPER_CASE, LOWER_CASE
}

enum NumberFormatter {
    COMMA, PERCENTAGE
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface WriteConcerns {
    CaseFormatter case_format() default CaseFormatter.ORDINARY;
    NumberFormatter number_format() default NumberFormatter.COMMA;
}

class WrongFormatException extends RuntimeException {
    public WrongFormatException(String msg) { super(msg); }
    public WrongFormatException(String msg, Throwable cause) { super(msg, cause); }
}

class Book {
    // Implement properties, annotations, BookBuilder, etc.
}

class FinalPrep {
    // Implement loadBooks and findBookByCustomerId (Optional)
}

class ReportWriter {
    // Implement writeReport using reflection to apply formatting
}`,
    testRunner: `(classes, print) => {
      const { Book, FinalPrep, ReportWriter, Optional, WrongFormatException, VirtualFileSystem } = classes;
      let score = 0;
      let logs = [];
      try {
        const book = new Book.BookBuilder()
          .setDate(new Date("2026-01-15"))
          .setQuarter("Q1")
          .setQtr(1)
          .setYear(2026)
          .setCustomerId("c1001")
          .setTotalAmount(25000.5)
          .setProfitPercentage(15.5)
          .setProfitInr(3875.08)
          .setCostPrice(21125.42)
          .build();
        
        if (book.getCustomerId() === "c1001" && book.getYear() === 2026) {
          score += 2;
          logs.push("PASS: BookBuilder correctly constructs Book instances");
        }
        
        const books = FinalPrep.loadBooks("sales.csv");
        if (books && books.size() === 3) {
          score += 3;
          logs.push("PASS: FinalPrep.loadBooks() correctly reads and parses CSV files");
        }
        
        const findOpt = FinalPrep.findBookByCustomerId(books, "C1003");
        if (findOpt && findOpt instanceof Optional && findOpt.isPresent() && findOpt.get().getTotalAmount() === 45000.75) {
          score += 2;
          logs.push("PASS: findBookByCustomerId() returns Optional<Book>");
        }
        
        ReportWriter.writeReport("output.csv", books);
        const report = VirtualFileSystem.readFile("output.csv");
        if (report && report.includes("C1001") && report.includes("25,000.5") && report.includes("15.5%")) {
          score += 3;
          logs.push("PASS: ReportWriter formats strings/numbers using WriteConcerns reflection");
        }
      } catch(e) { logs.push("EXCEPTION: " + e.message); }
      return { score, logs };
    }`
  },

  // Q2: Employee Payroll (Builder, CSV, Annotations, Optional)
  {
    id: "becir_q2",
    title: "Employee Payroll Processing & CSV Pipeline",
    points: 10,
    type: "builder",
    description: `**Problem Statement: Employee Payroll Data Transformation (Builder Pattern)**
Process employee payroll details from a CSV file using a fluent builder, validate data formatting with custom annotations, and generate a salary report.

**Requirements:**
- Custom Annotation: \`@WriteConcerns\` (case_format, number_format).
- \`Employee\` Class:
  - Attributes: \`id\`, \`name\` (uppercase), \`department\`, \`salary\` (comma number formatting), \`taxRate\` (percentage).
  - Static inner class \`EmployeeBuilder\`.
- \`PayrollProcessor\`:
  - \`List<Employee> loadEmployees(String csvFile)\`: Loads data from \`employees.csv\`. Throws \`WrongFormatException\` (with \`ClassCastException\` cause) if crucial columns (id, name, salary) are empty.
  - \`Optional<Employee> getEmployeeByDepartment(List<Employee> list, String department)\`: Returns the first employee in that department wrapped in an \`Optional<Employee>\` (or empty if not found).
- \`PayrollReportWriter\`:
  - Writes employee data applying annotations.`,
    starterCode: `import java.util.*;
import java.io.*;
import java.lang.annotation.*;
import java.lang.reflect.*;

enum CaseFormatter { ORDINARY, UPPER_CASE, LOWER_CASE }
enum NumberFormatter { COMMA, PERCENTAGE }

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface WriteConcerns {
    CaseFormatter case_format() default CaseFormatter.ORDINARY;
    NumberFormatter number_format() default NumberFormatter.COMMA;
}

class WrongFormatException extends RuntimeException {
    public WrongFormatException(String msg) { super(msg); }
    public WrongFormatException(String msg, Throwable cause) { super(msg, cause); }
}

class Employee {
    // Implement Employee and EmployeeBuilder
}

class PayrollProcessor {
    // Implement loadEmployees and getEmployeeByDepartment
}

class PayrollReportWriter {
    // Implement writeReport
}`,
    testRunner: `(classes, print) => {
      const { Employee, PayrollProcessor, PayrollReportWriter, Optional, VirtualFileSystem } = classes;
      let score = 0;
      let logs = [];
      try {
        const emp = new Employee.EmployeeBuilder().setId("E001").setName("John Doe").setDepartment("Engineering").setSalary(85000.0).setTaxRate(20.0).build();
        if (emp.getName() === "John Doe") {
          score += 2;
          logs.push("PASS: EmployeeBuilder compiles and functions");
        }
        
        const list = PayrollProcessor.loadEmployees("employees.csv");
        if (list && list.size() === 3) {
          score += 3;
          logs.push("PASS: loadEmployees parses CSV");
        }
        
        const opt = PayrollProcessor.getEmployeeByDepartment(list, "Sales");
        if (opt && opt.isPresent() && opt.get().getName() === "Bob Johnson") {
          score += 2;
          logs.push("PASS: getEmployeeByDepartment returns Optional");
        }
        
        PayrollReportWriter.writeReport("payroll_report.csv", list);
        const report = VirtualFileSystem.readFile("payroll_report.csv");
        if (report && report.includes("JOHN DOE") && report.includes("85,000") && report.includes("20%")) {
          score += 3;
          logs.push("PASS: PayrollReportWriter applies annotations via reflection");
        }
      } catch(e) { logs.push("EXCEPTION: " + e.message); }
      return { score, logs };
    }`
  },

  // Q3: Product Inventory (Builder, CSV, Optional)
  {
    id: "becir_q3",
    title: "Product Catalog Management & Margin Analysis",
    points: 10,
    type: "builder",
    description: `**Problem Statement: Product Catalog Transformation**
Build a fluent Product builder, parse a product database CSV file, and write a profit margin analysis.

**Requirements:**
- Custom Annotation: \`@WriteConcerns\`.
- \`Product\` Class:
  - Attributes: \`code\`, \`name\`, \`category\` (lowercase concern), \`costPrice\`, \`sellingPrice\`, \`profitMargin\` (percentage concern).
  - Inner builder class \`ProductBuilder\`.
- \`InventoryLoader\`:
  - \`loadProducts(String csvFile)\`: Loads \`products.csv\`. Throws \`WrongFormatException\` if code, name, or sellingPrice are blank.
  - \`Optional<Product> getProductByCode(List<Product> list, String code)\`: Find product by code and return it wrapped in an \`Optional<Product>\` (or empty if not found).
- \`InventoryReport\`:
  - \`writeReport(String output, List<Product> list)\` applying annotations to output format.`,
    starterCode: `import java.util.*;
import java.io.*;
import java.lang.annotation.*;
import java.lang.reflect.*;

enum CaseFormatter { ORDINARY, UPPER_CASE, LOWER_CASE }
enum NumberFormatter { COMMA, PERCENTAGE }

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface WriteConcerns {
    CaseFormatter case_format() default CaseFormatter.ORDINARY;
    NumberFormatter number_format() default NumberFormatter.COMMA;
}

class WrongFormatException extends RuntimeException {
    public WrongFormatException(String msg) { super(msg); }
    public WrongFormatException(String msg, Throwable cause) { super(msg, cause); }
}

class Product {
    // Implement Product and ProductBuilder
}

class InventoryLoader {
    // Implement loadProducts and getProductByCode
}

class InventoryReport {
    // Implement writeReport
}`,
    testRunner: `(classes, print) => {
      const { Product, InventoryLoader, InventoryReport, Optional, VirtualFileSystem } = classes;
      let score = 0;
      let logs = [];
      try {
        const list = InventoryLoader.loadProducts("products.csv");
        if (list && list.size() === 3) score += 3;
        
        const pOpt = InventoryLoader.getProductByCode(list, "P002");
        if (pOpt && pOpt.isPresent() && pOpt.get().getName() === "Leather Jacket") score += 3;
        
        InventoryReport.writeReport("inventory_out.csv", list);
        const report = VirtualFileSystem.readFile("inventory_out.csv");
        if (report && report.includes("electronics") && report.includes("wireless mouse")) {
          score += 4;
          logs.push("PASS: Complete Product Catalog parsed, filtered via Optional and formatted");
        }
      } catch(e) { logs.push("EXCEPTION: " + e.message); }
      return { score, logs };
    }`
  },

  // Q4: Transaction Logging (Builder, CSV, Optional)
  {
    id: "becir_q4",
    title: "Financial Transaction Reconciliation System",
    points: 10,
    type: "builder",
    description: `**Problem Statement: Transaction Reconciliation**
Implement a transactional log processing engine that loads CSV files, reconciles dates and amounts using annotations, and reports anomalies.

**Requirements:**
- \`Transaction\` Class with attributes: \`txId\`, \`date\` (date formatting), \`customer\` (uppercase), \`amount\` (comma decimal formatting), \`paymentMethod\`, \`status\`.
- Inner builder class \`TransactionBuilder\`.
- \`TransactionLoader.loadTransactions(String file)\`: Reads \`transactions.csv\`. Throws \`WrongFormatException\` if fields are blank.
- \`Optional<Transaction> getTransactionById(List<Transaction> list, String txId)\`: Retrieve transaction by ID and return it wrapped in an \`Optional<Transaction>\` (or empty if not found).
- \`TransactionReport.writeReport(String file, List<Transaction> list)\` applying annotations.`,
    starterCode: `import java.util.*;
import java.io.*;
import java.lang.annotation.*;
import java.lang.reflect.*;

enum CaseFormatter { ORDINARY, UPPER_CASE, LOWER_CASE }
enum NumberFormatter { COMMA, PERCENTAGE }

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface WriteConcerns {
    CaseFormatter case_format() default CaseFormatter.ORDINARY;
    NumberFormatter number_format() default NumberFormatter.COMMA;
}

class WrongFormatException extends RuntimeException {
    public WrongFormatException(String msg) { super(msg); }
    public WrongFormatException(String msg, Throwable cause) { super(msg, cause); }
}

class Transaction {
    // Implement Transaction
}

class TransactionLoader {
    // Implement loadTransactions
}

class TransactionReport {
    // Implement writeReport
}`,
    testRunner: `(classes, print) => {
      const { Transaction, TransactionLoader, TransactionReport, Optional, VirtualFileSystem } = classes;
      let score = 0;
      let logs = [];
      try {
        const list = TransactionLoader.loadTransactions("transactions.csv");
        if (list && list.size() === 3) score += 3;
        
        const opt = TransactionLoader.getTransactionById(list, "T002");
        if (opt && opt.isPresent() && opt.get().getCustomer() === "bob green") score += 3;
        
        TransactionReport.writeReport("tx_out.csv", list);
        const report = VirtualFileSystem.readFile("tx_out.csv");
        if (report && report.includes("BOB GREEN") && report.includes("120.5")) {
          score += 4;
          logs.push("PASS: Transactions loaded, accessed via Optional, and formatted in output");
        }
      } catch(e) { logs.push("EXCEPTION: " + e.message); }
      return { score, logs };
    }`
  },

  // Q5: Vehicle Ingestion (Factory, CSV, Optional)
  {
    id: "becir_q5",
    title: "Vehicle Factory Ingestion & Classification System",
    points: 10,
    type: "factory",
    description: `**Problem Statement: Vehicle Factory Ingestion**
Implement a classification engine utilizing the Factory Method design pattern to instantiate subclasses based on a CSV field.

**Hierarchy:**
- \`Vehicle\` (Abstract class)
  - Subclasses: \`Car\`, \`Truck\`, \`Motorcycle\`
- Each vehicle should have \`name\`, \`price\`, and a unique attribute:
  - Car: \`doors\` (int)
  - Truck: \`payloadCapacity\` (double)
  - Motorcycle: \`engineDisplacement\` (double)

**Factories:**
- \`VehicleFactory\` (Interface) with method \`Optional<Vehicle> createVehicle(String csvLine)\`.
- Concrete Factories: \`CarFactory\`, \`TruckFactory\`, \`MotorcycleFactory\` returning \`Optional<Vehicle>\`. If the line parsing fails or values are empty, return \`Optional.empty()\`.

**Data Loader:**
- \`List<Vehicle> loadVehicles(String file)\`: Parses \`vehicles.csv\`. Detects the type column (CAR, TRUCK, MOTORCYCLE) and delegates to the appropriate factory. If a factory returns empty Optional, skip that vehicle and log a warning.`,
    starterCode: `import java.util.*;
import java.io.*;

abstract class Vehicle {
    protected String name;
    protected double price;
    public abstract String displaySpecification();
}

class Car extends Vehicle {
    private int doors;
    public Car(String name, double price, int doors) { this.name = name; this.price = price; this.doors = doors; }
    public String displaySpecification() { return "Car: " + name + " (" + doors + " doors)"; }
}

class Truck extends Vehicle {
    private double payloadCapacity;
    public Truck(String name, double price, double cap) { this.name = name; this.price = price; this.payloadCapacity = cap; }
    public String displaySpecification() { return "Truck: " + name + " (" + payloadCapacity + " tons)"; }
}

class Motorcycle extends Vehicle {
    private double engineDisplacement;
    public Motorcycle(String name, double price, double disp) { this.name = name; this.price = price; this.engineDisplacement = disp; }
    public String displaySpecification() { return "Motorcycle: " + name + " (" + engineDisplacement + " cc)"; }
}

interface VehicleFactory {
    Optional<Vehicle> createVehicle(String csvLine);
}

class CarFactory implements VehicleFactory {
    // Implement
}

class TruckFactory implements VehicleFactory {
    // Implement
}

class MotorcycleFactory implements VehicleFactory {
    // Implement
}

class VehicleLoader {
    // Implement loadVehicles
}`,
    testRunner: `(classes, print) => {
      const { CarFactory, TruckFactory, MotorcycleFactory, Optional, Vehicle } = classes;
      let score = 0;
      let logs = [];
      try {
        const carFact = new CarFactory();
        const truckFact = new TruckFactory();
        const motoFact = new MotorcycleFactory();
        
        const carOpt = carFact.createVehicle("Tesla Model S,80000,5");
        const truckOpt = truckFact.createVehicle("Ford F-150,55000,3.5");
        
        if (carOpt && carOpt.isPresent() && carOpt.get().displaySpecification().includes("5 doors")) {
          score += 3;
          logs.push("PASS: CarFactory returns Optional containing Car instance");
        }
        
        if (truckOpt && truckOpt.isPresent() && truckOpt.get().displaySpecification().includes("3.5 tons")) {
          score += 3;
          logs.push("PASS: TruckFactory returns Optional containing Truck instance");
        }
        
        const invalidOpt = carFact.createVehicle("Invalid,Price,,");
        if (invalidOpt && !invalidOpt.isPresent()) {
          score += 4;
          logs.push("PASS: Factory gracefully handles errors returning empty Optional");
        }
      } catch(e) { logs.push("EXCEPTION: " + e.message); }
      return { score, logs };
    }`
  },

  // Q6: Order Factory (Factory, CSV, Optional)
  {
    id: "becir_q6",
    title: "Order Fulfilment Classification & Dispatch Engine",
    points: 10,
    type: "factory",
    description: `**Problem Statement: Order Factory Dispatch**
Design a shipping catalog dispatcher that instantiates order subclasses from CSV rows using concrete factories and optional routing.

**Hierarchy:**
- \`Order\` (Abstract): \`id\`, \`item\`, \`quantity\`, \`price\`. \`abstract double getShippingCost()\`
- Subclasses:
  - \`ExpressOrder\`: shipping cost is 15.0.
  - \`StandardOrder\`: shipping cost is 5.0.
  - \`BulkOrder\`: shipping cost is 0.0 (free).
- \`OrderFactory\` (Interface) with method \`Optional<Order> createOrder(String csvLine)\`.
- Concrete Factories: \`ExpressOrderFactory\`, \`StandardOrderFactory\`, \`BulkOrderFactory\`.
- Loader: \`List<Order> loadOrders(String file)\` reading \`orders.csv\` and dispatching to factories based on the first CSV column.`,
    starterCode: `import java.util.*;
import java.io.*;

abstract class Order {
    protected String id;
    protected String item;
    protected int quantity;
    protected double price;
    public abstract double getShippingCost();
}

class ExpressOrder extends Order {
    public ExpressOrder(String id, String item, int qty, double price) { this.id = id; this.item = item; this.quantity = qty; this.price = price; }
    public double getShippingCost() { return 15.0; }
}

class StandardOrder extends Order {
    public StandardOrder(String id, String item, int qty, double price) { this.id = id; this.item = item; this.quantity = qty; this.price = price; }
    public double getShippingCost() { return 5.0; }
}

class BulkOrder extends Order {
    public BulkOrder(String id, String item, int qty, double price) { this.id = id; this.item = item; this.quantity = qty; this.price = price; }
    public double getShippingCost() { return 0.0; }
}

interface OrderFactory {
    Optional<Order> createOrder(String csvLine);
}

class ExpressOrderFactory implements OrderFactory {
    // Implement
}

class StandardOrderFactory implements OrderFactory {
    // Implement
}

class BulkOrderFactory implements OrderFactory {
    // Implement
}

class OrderLoader {
    // Implement loadOrders
}`,
    testRunner: `(classes, print) => {
      const { ExpressOrderFactory, StandardOrderFactory, BulkOrderFactory, Optional } = classes;
      let score = 0;
      let logs = [];
      try {
        const expressF = new ExpressOrderFactory();
        const stdF = new StandardOrderFactory();
        const bulkF = new BulkOrderFactory();
        
        const o1 = expressF.createOrder("O101,Laptop,1,1200.00");
        const o2 = stdF.createOrder("O102,Notebook,5,2.50");
        
        if (o1 && o1.isPresent() && o1.get().getShippingCost() === 15.0) {
          score += 3;
          logs.push("PASS: ExpressOrder shipping fee correct");
        }
        
        if (o2 && o2.isPresent() && o2.get().getShippingCost() === 5.0) {
          score += 3;
          logs.push("PASS: StandardOrder shipping fee correct");
        }
        
        const invalidOpt = stdF.createOrder("InvalidCsv");
        if (invalidOpt && !invalidOpt.isPresent()) {
          score += 4;
          logs.push("PASS: OrderFactory returns empty Optional on error");
        }
      } catch(e) { logs.push("EXCEPTION: " + e.message); }
      return { score, logs };
    }`
  },

  // Q7: Document Factory (Factory, CSV, Optional)
  {
    id: "becir_q7",
    title: "Document Ingestion & Metadata Processing Engine",
    points: 10,
    type: "factory",
    description: `**Problem Statement: Document Factory Ingestion**
Implement a file metadata processing pipeline that parses document details from a CSV file, instantiates appropriate file formats using a Factory pattern, and analyzes formatting anomalies.

**Hierarchy:**
- \`Document\` (Abstract): \`title\`, \`author\`, \`size\`. \`abstract String getFormatType()\`
- Subclasses: \`PDFDocument\`, \`WordDocument\`, \`HTMLDocument\`.
- \`DocumentFactory\` (Interface): \`Optional<Document> createDocument(String csvLine)\`.
- Concrete Factories: \`PDFDocumentFactory\`, \`WordDocumentFactory\`, \`HTMLDocumentFactory\`.
- Loader method: \`List<Document> loadDocuments(String file)\` reading \`documents.csv\` and assigning them to correct format factories.`,
    starterCode: `import java.util.*;
import java.io.*;

abstract class Document {
    protected String title;
    protected String author;
    protected int size;
    public abstract String getFormatType();
}

class PDFDocument extends Document {
    public PDFDocument(String title, String author, int size) { this.title = title; this.author = author; this.size = size; }
    public String getFormatType() { return "PDF"; }
}

class WordDocument extends Document {
    public WordDocument(String title, String author, int size) { this.title = title; this.author = author; this.size = size; }
    public String getFormatType() { return "WORD"; }
}

class HTMLDocument extends Document {
    public HTMLDocument(String title, String author, int size) { this.title = title; this.author = author; this.size = size; }
    public String getFormatType() { return "HTML"; }
}

interface DocumentFactory {
    Optional<Document> createDocument(String csvLine);
}

class PDFDocumentFactory implements DocumentFactory {
    // Implement
}

class WordDocumentFactory implements DocumentFactory {
    // Implement
}

class HTMLDocumentFactory implements DocumentFactory {
    // Implement
}

class DocumentLoader {
    // Implement loadDocuments
}`,
    testRunner: `(classes, print) => {
      const { PDFDocumentFactory, WordDocumentFactory, HTMLDocumentFactory, Optional } = classes;
      let score = 0;
      let logs = [];
      try {
        const pdfF = new PDFDocumentFactory();
        const wordF = new WordDocumentFactory();
        
        const d1 = pdfF.createDocument("Project Proposal,Alice,2048");
        const d2 = wordF.createDocument("Meeting Notes,Bob,1024");
        
        if (d1 && d1.isPresent() && d1.get().getFormatType() === "PDF") {
          score += 3;
          logs.push("PASS: PDFDocumentFactory instantiates PDF documents");
        }
        
        if (d2 && d2.isPresent() && d2.get().getFormatType() === "WORD") {
          score += 3;
          logs.push("PASS: WordDocumentFactory instantiates WORD documents");
        }
        
        const invalidOpt = pdfF.createDocument("");
        if (invalidOpt && !invalidOpt.isPresent()) {
          score += 4;
          logs.push("PASS: DocumentFactory returns empty Optional on invalid row");
        }
      } catch(e) { logs.push("EXCEPTION: " + e.message); }
      return { score, logs };
    }`
  }
];

window.EXAM_DATA = {
  LAST_YEAR_PACKETS,
  BECIR_QUESTIONS
};
