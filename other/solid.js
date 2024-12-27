// ===============================================
// SOLID Principles in JavaScript - Complete Guide
// ===============================================

// ===============================================
// 1. Single Responsibility Principle (SRP)
// A class should have only one reason to change
// ===============================================

// Bad Practice - Class doing too many things
class UserBad {
    constructor(name) {
        this.name = name;
    }
    
    saveToDatabase() {
        console.log(`Saving ${this.name} to database`);
    }
    
    generateReport() {
        console.log(`Generating report for ${this.name}`);
    }
    
    sendEmail() {
        console.log(`Sending email to ${this.name}`);
    }
}

// Good Practice - Separated responsibilities
class User {
    constructor(name) {
        this.name = name;
    }
    
    getName() {
        return this.name;
    }
}

class UserRepository {
    saveUser(user) {
        console.log(`Saving ${user.getName()} to database`);
    }
}

class ReportGenerator {
    generateUserReport(user) {
        console.log(`Generating report for ${user.getName()}`);
    }
}

class EmailService {
    sendEmailToUser(user) {
        console.log(`Sending email to ${user.getName()}`);
    }
}

// Example usage of good SRP
const user = new User("John Doe");
const userRepo = new UserRepository();
const reportGen = new ReportGenerator();
const emailService = new EmailService();

userRepo.saveUser(user);
reportGen.generateUserReport(user);
emailService.sendEmailToUser(user);

// ===============================================
// 2. Open-Closed Principle (OCP)
// Software entities should be open for extension but closed for modification
// ===============================================

// Bad Practice - Need to modify code for new payment types
class PaymentProcessorBad {
    processPayment(payment) {
        if (payment.type === 'creditCard') {
            console.log('Processing credit card payment');
        } else if (payment.type === 'paypal') {
            console.log('Processing PayPal payment');
        } else if (payment.type === 'bitcoin') {
            console.log('Processing Bitcoin payment');
        }
    }
}

// Good Practice - Extensible design
class Payment {
    process() {
        throw new Error('process() method must be implemented');
    }
}

class CreditCardPayment extends Payment {
    process() {
        console.log('Processing credit card payment');
    }
}

class PayPalPayment extends Payment {
    process() {
        console.log('Processing PayPal payment');
    }
}

class BitcoinPayment extends Payment {
    process() {
        console.log('Processing Bitcoin payment');
    }
}

class PaymentProcessor {
    processPayment(payment) {
        payment.process();
    }
}

// Example usage of good OCP
const processor = new PaymentProcessor();
const creditCardPayment = new CreditCardPayment();
const paypalPayment = new PayPalPayment();
const bitcoinPayment = new BitcoinPayment();

processor.processPayment(creditCardPayment);
processor.processPayment(paypalPayment);
processor.processPayment(bitcoinPayment);

// ===============================================
// 3. Liskov Substitution Principle (LSP)
// Derived classes must be substitutable for their base classes
// ===============================================

// Bad Practice - Violating LSP
class BirdBad {
    fly() {
        console.log('Flying...');
    }
}

class PenguinBad extends BirdBad {
    fly() {
        throw new Error("Penguins can't fly!"); // Violates LSP
    }
}

// Good Practice - Proper hierarchy
class Bird {
    move() {
        console.log('Moving...');
    }
}

class FlyingBird extends Bird {
    fly() {
        console.log('Flying...');
    }
}

class SwimmingBird extends Bird {
    swim() {
        console.log('Swimming...');
    }
}

class Penguin extends SwimmingBird {}
class Sparrow extends FlyingBird {}

// Example usage of good LSP
const penguin = new Penguin();
const sparrow = new Sparrow();

penguin.move();  // Works
penguin.swim();  // Works
sparrow.move();  // Works
sparrow.fly();   // Works

// ===============================================
// 4. Interface Segregation Principle (ISP)
// Clients should not be forced to depend on interfaces they do not use
// ===============================================

// Bad Practice - Fat interface
class MachineBad {
    print() { /* implementation */ }
    scan() { /* implementation */ }
    fax() { /* implementation */ }
    photocopy() { /* implementation */ }
}

// Good Practice - Segregated interfaces
class Printer {
    print() {
        console.log('Printing...');
    }
}

class Scanner {
    scan() {
        console.log('Scanning...');
    }
}

class FaxMachine {
    fax() {
        console.log('Faxing...');
    }
}

// Complex device using composition
class AllInOnePrinter {
    constructor() {
        this.printer = new Printer();
        this.scanner = new Scanner();
        this.faxMachine = new FaxMachine();
    }
    
    print() {
        this.printer.print();
    }
    
    scan() {
        this.scanner.scan();
    }
    
    fax() {
        this.faxMachine.fax();
    }
}

// Simple device only implements what it needs
class BasicPrinter extends Printer {}

// Example usage of good ISP
const basicPrinter = new BasicPrinter();
const allInOne = new AllInOnePrinter();

basicPrinter.print();  // Works
allInOne.print();      // Works
allInOne.scan();       // Works
allInOne.fax();        // Works

// ===============================================
// 5. Dependency Inversion Principle (DIP)
// High-level modules should not depend on low-level modules. Both should depend on abstractions
// ===============================================

// Bad Practice - Direct dependency on concrete class
class MySQLDatabaseBad {
    save(data) {
        console.log('Saving to MySQL database:', data);
    }
}

class UserServiceBad {
    constructor() {
        this.database = new MySQLDatabaseBad(); // Direct dependency
    }
    
    saveUser(user) {
        this.database.save(user);
    }
}

// Good Practice - Dependency injection
class Database {
    save(data) {
        throw new Error('save() method must be implemented');
    }
}

class MySQLDatabase extends Database {
    save(data) {
        console.log('Saving to MySQL database:', data);
    }
}

class MongoDatabase extends Database {
    save(data) {
        console.log('Saving to MongoDB database:', data);
    }
}

class UserService {
    constructor(database) {
        this.database = database; // Dependency injection
    }
    
    saveUser(user) {
        this.database.save(user);
    }
}

// Example usage of good DIP
const mysqlDb = new MySQLDatabase();
const mongoDb = new MongoDatabase();

const userServiceWithMySQL = new UserService(mysqlDb);
const userServiceWithMongo = new UserService(mongoDb);

userServiceWithMySQL.saveUser({ name: "John" });
userServiceWithMongo.saveUser({ name: "Jane" });

// ===============================================
// Complete Real-World Example
// Combining all SOLID principles in a task management system
// ===============================================

// Interfaces (abstract classes in JavaScript)
class TaskRepository {
    save(task) { throw new Error('Not implemented'); }
    delete(task) { throw new Error('Not implemented'); }
    find(id) { throw new Error('Not implemented'); }
}

class NotificationService {
    notify(message, user) { throw new Error('Not implemented'); }
}

// Implementations
class MongoTaskRepository extends TaskRepository {
    save(task) {
        console.log('Saving task to MongoDB');
    }
    
    delete(task) {
        console.log('Deleting task from MongoDB');
    }
    
    find(id) {
        console.log('Finding task in MongoDB');
        return { id, title: 'Sample Task' };
    }
}

class EmailNotificationService extends NotificationService {
    notify(message, user) {
        console.log(`Sending email to ${user.email}: ${message}`);
    }
}

class SlackNotificationService extends NotificationService {
    notify(message, user) {
        console.log(`Sending Slack message to ${user.slackId}: ${message}`);
    }
}

// Task entity
class Task {
    constructor(id, title, description, assignee) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.completed = false;
    }
    
    complete() {
        this.completed = true;
    }
}

// Task service following SOLID principles
class TaskService {
    constructor(taskRepository, notificationService) {
        this.taskRepository = taskRepository;
        this.notificationService = notificationService;
    }
    
    createTask(taskData) {
        const task = new Task(
            taskData.id,
            taskData.title,
            taskData.description,
            taskData.assignee
        );
        
        this.taskRepository.save(task);
        this.notificationService.notify(
            `New task assigned: ${task.title}`,
            task.assignee
        );
        
        return task;
    }
    
    completeTask(taskId) {
        const task = this.taskRepository.find(taskId);
        task.complete();
        this.taskRepository.save(task);
        this.notificationService.notify(
            `Task completed: ${task.title}`,
            task.assignee
        );
    }
}

// Example usage of the complete system
const taskRepo = new MongoTaskRepository();
const emailNotifier = new EmailNotificationService();
const taskService = new TaskService(taskRepo, emailNotifier);

const user = { email: 'user@example.com', slackId: 'U123456' };
const taskData = {
    id: 1,
    title: 'Learn SOLID Principles',
    description: 'Study and implement SOLID principles in JavaScript',
    assignee: user
};

// Create and complete a task
const newTask = taskService.createTask(taskData);
taskService.completeTask(newTask.id);

// Run this file with Node.js to see the output of all examples
console.log('\nSOLID Principles demonstration completed!');