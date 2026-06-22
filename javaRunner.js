// C:\My File\S1\oop\webPrep\javaRunner.js

function stripCommentsSafely(code) {
  let result = [];
  let inString = false;
  let inChar = false;
  
  for (let i = 0; i < code.length; i++) {
    let char = code[i];
    let next = code[i + 1] || '';
    
    if (inString) {
      if (char === '\\' && (next === '"' || next === '\\')) {
        result.push(char);
        result.push(next);
        i++;
      } else if (char === '"') {
        inString = false;
        result.push(char);
      } else {
        result.push(char);
      }
    } else if (inChar) {
      if (char === '\\' && (next === '\'' || next === '\\')) {
        result.push(char);
        result.push(next);
        i++;
      } else if (char === '\'') {
        inChar = false;
        result.push(char);
      } else {
        result.push(char);
      }
    } else {
      if (char === '/' && next === '/') {
        i += 2;
        while (i < code.length && code[i] !== '\n' && code[i] !== '\r') {
          i++;
        }
        if (i < code.length) {
          result.push(code[i]);
        }
      } else if (char === '/' && next === '*') {
        i += 2;
        while (i < code.length) {
          if (code[i] === '*' && code[i+1] === '/') {
            i++;
            break;
          }
          if (code[i] === '\n' || code[i] === '\r') {
            result.push(code[i]);
          }
          i++;
        }
      } else if (char === '"') {
        inString = true;
        result.push(char);
      } else if (char === '\'') {
        inChar = true;
        result.push(char);
      } else {
        result.push(char);
      }
    }
  }
  return result.join('');
}

function cleanCodeForParsing(code) {
  let result = [];
  let inString = false;
  let inChar = false;
  let inLineComment = false;
  let inBlockComment = false;
  
  for (let i = 0; i < code.length; i++) {
    let char = code[i];
    let next = code[i + 1] || '';
    
    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false;
        result.push('\n');
      } else if (char === '\r') {
        result.push('\r');
      } else {
        result.push(' ');
      }
    } else if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false;
        result.push(' ');
        result.push(' ');
        i++;
      } else if (char === '\n') {
        result.push('\n');
      } else if (char === '\r') {
        result.push('\r');
      } else {
        result.push(' ');
      }
    } else if (inString) {
      if (char === '\\' && (next === '"' || next === '\\')) {
        result.push(' ');
        result.push(' ');
        i++;
      } else if (char === '"') {
        inString = false;
        result.push('"');
      } else if (char === '\n') {
        result.push('\n');
      } else if (char === '\r') {
        result.push('\r');
      } else {
        result.push(' ');
      }
    } else if (inChar) {
      if (char === '\\' && (next === '\'' || next === '\\')) {
        result.push(' ');
        result.push(' ');
        i++;
      } else if (char === '\'') {
        inChar = false;
        result.push('\'');
      } else if (char === '\n') {
        result.push('\n');
      } else if (char === '\r') {
        result.push('\r');
      } else {
        result.push(' ');
      }
    } else {
      if (char === '/' && next === '/') {
        inLineComment = true;
        result.push(' ');
        result.push(' ');
        i++;
      } else if (char === '/' && next === '*') {
        inBlockComment = true;
        result.push(' ');
        result.push(' ');
        i++;
      } else if (char === '"') {
        inString = true;
        result.push('"');
      } else if (char === '\'') {
        inChar = true;
        result.push('\'');
      } else {
        result.push(char);
      }
    }
  }
  return result.join('');
}

function stripInterfaces(code) {
  let cleanSource = code;
  while (true) {
    let match = cleanSource.match(/\binterface\s+([A-Za-z0-9_]+)/);
    if (!match) break;
    let idx = match.index;
    let openBraceIndex = cleanSource.indexOf('{', idx);
    if (openBraceIndex === -1) break;
    
    let braceCount = 1;
    let scanIndex = openBraceIndex + 1;
    while (scanIndex < cleanSource.length && braceCount > 0) {
      if (cleanSource[scanIndex] === '{') braceCount++;
      else if (cleanSource[scanIndex] === '}') braceCount--;
      scanIndex++;
    }
    
    if (braceCount === 0) {
      cleanSource = cleanSource.substring(0, idx) + cleanSource.substring(scanIndex);
    } else {
      cleanSource = cleanSource.substring(0, idx) + "inter_face" + cleanSource.substring(idx + 9);
    }
  }
  return cleanSource;
}

function isInsideStringOrComment(text, offset) {
  let inString = false;
  let inChar = false;
  let inLineComment = false;
  let inBlockComment = false;
  
  for (let i = 0; i < offset; i++) {
    let char = text[i];
    let next = text[i + 1] || '';
    
    if (inLineComment) {
      if (char === '\n') inLineComment = false;
    } else if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false;
        i++;
      }
    } else if (inString) {
      if (char === '\\' && (next === '"' || next === '\\')) {
        i++;
      } else if (char === '"') {
        inString = false;
      }
    } else if (inChar) {
      if (char === '\\' && (next === '\'' || next === '\\')) {
        i++;
      } else if (char === '\'') {
        inChar = false;
      }
    } else {
      if (char === '/' && next === '/') {
        inLineComment = true;
        i++;
      } else if (char === '/' && next === '*') {
        inBlockComment = true;
        i++;
      } else if (char === '"') {
        inString = true;
      } else if (char === '\'') {
        inChar = true;
      }
    }
  }
  return inString || inChar || inLineComment || inBlockComment;
}



function extractClasses(code) {
  let classesList = [];
  
  function process(source) {
    let cleanSource = source;
    
    while (true) {
      let match = cleanSource.match(/\bclass\s+([A-Za-z0-9_]+)/);
      if (!match) break;
      
      let classIndex = match.index;
      let className = match[1];
      
      let openBraceIndex = cleanSource.indexOf('{', classIndex);
      if (openBraceIndex === -1) {
        cleanSource = cleanSource.substring(0, classIndex) + "cl_ass" + cleanSource.substring(classIndex + 5);
        continue;
      }
      
      let headerText = cleanSource.substring(classIndex, openBraceIndex);
      let cleanHeader = headerText.replace(/<[^>]*>/g, '');
      let extendsMatch = cleanHeader.match(/\bextends\s+([A-Za-z0-9_]+)/);
      let baseClass = extendsMatch ? extendsMatch[1] : null;
      
      let braceCount = 1;
      let scanIndex = openBraceIndex + 1;
      while (scanIndex < cleanSource.length && braceCount > 0) {
        if (cleanSource[scanIndex] === '{') braceCount++;
        else if (cleanSource[scanIndex] === '}') braceCount--;
        scanIndex++;
      }
      
      if (braceCount === 0) {
        let bodyText = cleanSource.substring(openBraceIndex + 1, scanIndex - 1);
        
        let currentLength = classesList.length;
        let cleanBody = process(bodyText);
        
        classesList.splice(currentLength, 0, {
          name: className,
          baseClass: baseClass,
          body: cleanBody
        });
        
        let startOfClass = classIndex;
        let modifiers = ['public', 'private', 'protected', 'static', 'final', 'abstract'];
        while (startOfClass > 0) {
          let sub = cleanSource.substring(0, startOfClass);
          let prevWordMatch = sub.match(/([A-Za-z0-9_]+)\s*$/);
          if (prevWordMatch && modifiers.includes(prevWordMatch[1])) {
            startOfClass = prevWordMatch.index;
          } else {
            break;
          }
        }
        
        cleanSource = cleanSource.substring(0, startOfClass) + cleanSource.substring(scanIndex);
      } else {
        cleanSource = cleanSource.substring(0, classIndex) + "cl_ass" + cleanSource.substring(classIndex + 5);
      }
    }
    
    return cleanSource.replace(/cl_ass/g, 'class');
  }
  
  process(code);
  return classesList;
}

// Virtual File System Mock
const VirtualFileSystem = {
  files: {
    "sales.csv": `date,quarter,qtr,year,customerId,totalAmount,profitPercentage,profitInr,costPrice
2026-01-15,Q1,1,2026,C1001,25000.50,15.5,3875.08,21125.42
2026-02-20,Q1,1,2026,c1002,12000.00,10.0,1200.00,10800.00
2026-03-10,Q1,1,2026,C1003,45000.75,20.0,9000.15,36000.60`,
    
    "employees.csv": `id,name,department,salary,taxRate
E001,John Doe,Engineering,85000.00,20.0
E002,Jane Smith,Marketing,62000.00,15.5
E003,Bob Johnson,Sales,45000.00,12.0`,

    "products.csv": `code,name,category,costPrice,sellingPrice,quantity
P001,Wireless Mouse,Electronics,15.00,29.99,150
P002,Leather Jacket,Clothing,80.00,149.99,50
P003,Coffee Maker,Home,45.00,79.99,30`,

    "transactions.csv": `txId,date,customer,amount,paymentMethod,status
T001,2026-05-01,Alice Brown,120.50,CreditCard,COMPLETED
T002,2026-05-02,bob green,45.00,PayPal,COMPLETED
T003,2026-05-03,Charlie White,350.00,BankTransfer,PENDING`,

    "vehicles.csv": `type,name,price,param
CAR,Model S,80000,5
TRUCK,F-150,55000,3.5
MOTORCYCLE,Ninja 400,6000,0.4`,

    "orders.csv": `type,id,item,quantity,price
EXPRESS,O101,Laptop,1,1200.00
STANDARD,O102,Notebook,5,2.50
BULK,O103,Printer Paper,100,5.00`,

    "documents.csv": `type,title,author,size,format
PDF,Project Proposal,Alice,2048,PDF
WORD,Meeting Notes,Bob,1024,DOCX
HTML,Homepage Index,Charlie,512,HTML`
  },
  readFile(name) {
    if (this.files[name] !== undefined) return this.files[name];
    throw new Error("FileNotFoundException: " + name + " (No such file or directory)");
  },
  writeFile(name, content) {
    this.files[name] = content;
  }
};

// Base JVM Mock Environment
function createJVMEnvironment(consoleLogs, classMetadata) {
  Error.prototype.printStackTrace = function() {
    consoleLogs.push(this.stack || this.message);
  };

  // Enums
  const Gender = { MALE: "MALE", FEMALE: "FEMALE" };
  const BookCategory = { FICTION: "FICTION", SCIENCE: "SCIENCE", HISTORY: "HISTORY" };
  const AvailabilityStatus = { AVAILABLE: "AVAILABLE", OUT_OF_STOCK: "OUT_OF_STOCK" };
  const CaseFormatter = { ORDINARY: "ORDINARY", UPPER_CASE: "UPPER_CASE", LOWER_CASE: "LOWER_CASE" };
  const NumberFormatter = { COMMA: "COMMA", PERCENTAGE: "PERCENTAGE" };

  // Custom Exceptions
  class Exception extends Error {
    constructor(message) {
      super(message);
      this.name = "Exception";
    }
  }
  class RuntimeException extends Exception {
    constructor(message) {
      super(message);
      this.name = "RuntimeException";
    }
  }
  class WrongFormatException extends Exception {
    constructor(message, cause) {
      super(message);
      this.name = "WrongFormatException";
      this.cause = cause || null;
    }
  }
  class ClassCastException extends Error {
    constructor(message) {
      super(message);
      this.name = "ClassCastException";
    }
  }
  class NoSuchElementException extends Error {
    constructor(message) {
      super(message);
      this.name = "NoSuchElementException";
    }
  }
  class NullPointerException extends Error {
    constructor(message) {
      super(message);
      this.name = "NullPointerException";
    }
  }
  class NumberFormatException extends RuntimeException {
    constructor(message) {
      super(message);
      this.name = "NumberFormatException";
    }
  }

  // Optional Class
  class Optional {
    constructor(value) {
      this._value = value;
    }
    static of(value) {
      if (value === null || value === undefined) throw new NullPointerException("Value cannot be null");
      return new Optional(value);
    }
    static empty() {
      return new Optional(null);
    }
    static ofNullable(value) {
      return new Optional(value);
    }
    isPresent() {
      return this._value !== null && this._value !== undefined;
    }
    isEmpty() {
      return !this.isPresent();
    }
    get() {
      if (!this.isPresent()) throw new NoSuchElementException("No value present");
      return this._value;
    }
    orElse(other) {
      return this.isPresent() ? this._value : other;
    }
    orElseGet(supplier) {
      return this.isPresent() ? this._value : supplier();
    }
    map(mapper) {
      if (!this.isPresent()) return Optional.empty();
      const res = mapper(this._value);
      return Optional.ofNullable(res);
    }
    filter(predicate) {
      if (!this.isPresent()) return this;
      return predicate(this._value) ? this : Optional.empty();
    }
  }

  // HashMap Class
  class HashMap {
    constructor() {
      this.map = new Map();
    }
    put(key, val) {
      this.map.set(key, val);
    }
    get(key) {
      return this.map.has(key) ? this.map.get(key) : null;
    }
    containsKey(key) {
      return this.map.has(key);
    }
    getOrDefault(key, defaultVal) {
      return this.map.has(key) ? this.map.get(key) : defaultVal;
    }
    clear() {
      this.map.clear();
    }
    isEmpty() {
      return this.map.size === 0;
    }
    keySet() {
      const keys = Array.from(this.map.keys());
      return {
        toArray() { return keys; },
        iterator() {
          let idx = 0;
          return {
            hasNext: () => idx < keys.length,
            next: () => keys[idx++]
          };
        },
        size: () => keys.length,
        [Symbol.iterator]() { return keys[Symbol.iterator](); }
      };
    }
    values() {
      const vals = Array.from(this.map.values());
      vals.size = () => vals.length;
      vals.iterator = () => {
        let idx = 0;
        return {
          hasNext: () => idx < vals.length,
          next: () => vals[idx++]
        };
      };
      return vals;
    }
    entrySet() {
      const entries = Array.from(this.map.entries()).map(([key, value]) => ({
        getKey() { return key; },
        getValue() { return value; }
      }));
      return {
        toArray() { return entries; },
        iterator() {
          let idx = 0;
          return {
            hasNext: () => idx < entries.length,
            next: () => entries[idx++]
          };
        },
        size: () => entries.length,
        [Symbol.iterator]() { return entries[Symbol.iterator](); }
      };
    }
    size() {
      return this.map.size;
    }
  }

  // ArrayList / List Class
  class ArrayList extends Array {
    constructor(...args) {
      super(...args);
    }
    add(item) {
      this.push(item);
      return true;
    }
    get(index) {
      return this[index];
    }
    size() {
      return this.length;
    }
    isEmpty() {
      return this.length === 0;
    }
    remove(itemOrIndex) {
      if (typeof itemOrIndex === 'number') {
        this.splice(itemOrIndex, 1);
      } else {
        const idx = this.indexOf(itemOrIndex);
        if (idx !== -1) this.splice(idx, 1);
      }
    }
    clear() {
      this.length = 0;
    }
    iterator() {
      let idx = 0;
      const self = this;
      return {
        hasNext: () => idx < self.length,
        next: () => self[idx++]
      };
    }
  }

  // Simple Date & Format Mocks
  class SimpleDateFormat {
    constructor(pattern) {
      this.pattern = pattern;
    }
    parse(dateStr) {
      if (!dateStr || dateStr.trim() === "") throw new WrongFormatException("Empty date string");
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) throw new WrongFormatException("Invalid date format: " + dateStr);
      return d;
    }
    format(dateObj) {
      if (!(dateObj instanceof Date)) dateObj = new Date(dateObj);
      if (isNaN(dateObj.getTime())) return "";
      let y = dateObj.getFullYear();
      let m = String(dateObj.getMonth() + 1).padStart(2, '0');
      let d = String(dateObj.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
  }

  class DecimalFormat {
    constructor(pattern) {
      this.pattern = pattern;
    }
    format(value) {
      if (typeof value !== 'number') value = parseFloat(value);
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    }
  }

  // Database JDBC Mocks
  const DriverManager = {
    getConnection(url, username, password) {
      return new MockConnection(url, username, password);
    }
  };

  class MockConnection {
    constructor(url, user, pass) {
      this.url = url;
      this.user = user;
      this.pass = pass;
    }
    prepareStatement(sql) {
      return new MockPreparedStatement(sql, this);
    }
    close() {}
  }

  class MockPreparedStatement {
    constructor(sql, connection) {
      this.sql = sql;
      this.connection = connection;
      this.params = {};
    }
    setString(index, value) { this.params[index] = value; }
    setInt(index, value) { this.params[index] = value; }
    setDouble(index, value) { this.params[index] = value; }
    executeQuery() {
      let host = 'oop.ibu.edu.ba';
      let port = 3306;
      let database = 'oopgroup1';
      
      const url = this.connection.url || '';
      const hostMatch = url.match(/\/([a-zA-Z0-9.-]+):(\d+)\/([a-zA-Z0-9_-]+)/);
      if (hostMatch) {
        host = hostMatch[1];
        port = parseInt(hostMatch[2]);
        database = hostMatch[3].split('?')[0];
      }
      
      const dbConfig = {
        host,
        port,
        database,
        user: this.connection.user,
        password: this.connection.pass
      };
      
      const sortedKeys = Object.keys(this.params).map(Number).sort((a,b) => a-b);
      const paramsArray = sortedKeys.map(k => this.params[k]);
      
      let data = [];
      let success = false;
      
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/jdbc", false); // Synchronous call
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.send(JSON.stringify({
          host: dbConfig.host,
          port: dbConfig.port,
          database: dbConfig.database,
          user: dbConfig.user,
          password: dbConfig.password,
          sql: this.sql,
          params: paramsArray
        }));
        
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          if (res.success) {
            data = res.data;
            success = true;
          } else {
            console.warn("Proxy query returned error: " + res.error);
          }
        }
      } catch (e) {
        console.warn("Proxy query failed to connect. Falling back to mock data.", e);
      }
      
      if (!success) {
        // Fallback to high-fidelity mock data if database server connection fails
        let mockTable = [];
        if (this.sql.includes("users")) {
          mockTable = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" },
            { id: 4, name: "David" },
            { id: 5, name: "Eva" }
          ];
        } else if (this.sql.includes("products")) {
          mockTable = [
            { product_id: 101, name: "Laptop", price: 1200.00 },
            { product_id: 102, name: "Phone", price: 800.00 },
            { product_id: 103, name: "Headphones", price: 150.00 },
            { product_id: 104, name: "Monitor", price: 300.00 },
            { product_id: 105, name: "Keyboard", price: 75.00 }
          ];
        }
        
        if (this.sql.includes("users")) {
          const nameVal = this.params[1];
          const idVal = this.params[2];
          data = mockTable.filter(u => u.name !== nameVal && u.id <= idVal);
        } else if (this.sql.includes("products")) {
          const priceVal = this.params[1];
          data = mockTable.filter(p => p.price >= priceVal);
        } else {
          data = mockTable;
        }
      }
      
      return new MockResultSet(data);
    }
    close() {}
  }

  class MockResultSet {
    constructor(rows) {
      this.rows = rows;
      this.currentIndex = -1;
    }
    next() {
      this.currentIndex++;
      return this.currentIndex < this.rows.length;
    }
    getString(col) {
      const row = this.rows[this.currentIndex];
      if (typeof col === 'number') return Object.values(row)[col - 1];
      return row[col];
    }
    getInt(col) {
      const row = this.rows[this.currentIndex];
      if (typeof col === 'number') return parseInt(Object.values(row)[col - 1]);
      return parseInt(row[col]);
    }
    getDouble(col) {
      const row = this.rows[this.currentIndex];
      if (typeof col === 'number') return parseFloat(Object.values(row)[col - 1]);
      return parseFloat(row[col]);
    }
    close() {}
  }

  // File IO Mocks
  class FileReader {
    constructor(fileName) {
      this.content = VirtualFileSystem.readFile(fileName);
    }
  }

  class BufferedReader {
    constructor(fileReader) {
      this.lines = fileReader.content.split('\n');
      this.idx = 0;
    }
    readLine() {
      if (this.idx < this.lines.length) {
        return this.lines[this.idx++];
      }
      return null;
    }
    close() {}
  }

  class FileWriter {
    constructor(fileName) {
      this.fileName = fileName;
      this.buffer = [];
    }
    write(str) { this.buffer.push(str); }
    close() { VirtualFileSystem.writeFile(this.fileName, this.buffer.join('')); }
  }

  class BufferedWriter {
    constructor(fileWriter) {
      this.fileWriter = fileWriter;
    }
    write(str) { this.fileWriter.write(str); }
    newLine() { this.fileWriter.write("\n"); }
    close() { this.fileWriter.close(); }
  }

  class PrintWriter {
    constructor(fileWriter) {
      this.fileWriter = fileWriter;
    }
    print(str) { this.fileWriter.write(str); }
    println(str) { this.fileWriter.write((str || "") + "\n"); }
    close() { this.fileWriter.close(); }
  }

  // Reflection classes
  class Field {
    constructor(name, type, annotations = {}) {
      this._name = name;
      this._type = type;
      this._annotations = annotations;
    }
    getName() { return this._name; }
    getType() { return this._type; }
    isAnnotationPresent(annClass) {
      const annName = typeof annClass === 'string' ? annClass : annClass.name || '';
      return this._annotations[annName] !== undefined;
    }
    getAnnotation(annClass) {
      const annName = typeof annClass === 'string' ? annClass : annClass.name || '';
      return this._annotations[annName] || null;
    }
    get(obj) { return obj[this._name]; }
    set(obj, val) { obj[this._name] = val; }
    setAccessible(flag) {}
  }

  function getDeclaredFields(className) {
    if (classMetadata && classMetadata[className]) {
      return classMetadata[className].fields || [];
    }
    return [];
  }

  // Inject Java object getClass method
  Object.prototype.getClass = function() {
    const name = this.constructor.name;
    return {
      getDeclaredFields() { return getDeclaredFields(name); },
      getName() { return name; },
      getSimpleName() { return name; }
    };
  };

  // Add equals operation for Java strings/objects compatibility in transpiled code
  Object.prototype.equals = function(other) {
    if (other && other._value !== undefined) return this === other._value;
    return this === other;
  };
  String.prototype.equals = function(other) {
    return this.toString() === String(other);
  };
  String.prototype.equalsIgnoreCase = function(other) {
    if (other === null || other === undefined) return false;
    return this.toLowerCase() === String(other).toLowerCase();
  };
  String.prototype.contains = function(other) {
    return this.includes(other);
  };
  String.prototype.isEmpty = function() {
    return this.length === 0;
  };

  Number.prototype.doubleValue = function() { return this.valueOf(); };
  Number.prototype.intValue = function() { return Math.trunc(this.valueOf()); };
  Number.prototype.floatValue = function() { return this.valueOf(); };
  Number.prototype.longValue = function() { return Math.trunc(this.valueOf()); };

  String.valueOf = function(val) {
    if (val === null || val === undefined) return "null";
    return String(val);
  };

  Object.defineProperty(String, Symbol.hasInstance, {
    value: function(instance) {
      return typeof instance === 'string' || (instance && typeof instance === 'object' && instance.constructor === String);
    },
    configurable: true
  });

  // Expose system console logging
  const System = {
    out: {
      println(str) { consoleLogs.push(String(str)); },
      print(str) {
        if (consoleLogs.length > 0) {
          consoleLogs[consoleLogs.length - 1] += String(str);
        } else {
          consoleLogs.push(String(str));
        }
      }
    }
  };

  const Integer = {
    [Symbol.hasInstance](instance) {
      return typeof instance === 'number' && Number.isInteger(instance);
    },
    parseInt(str) {
      if (str === null || str === undefined) throw new NumberFormatException("null");
      let trimmed = String(str).trim();
      if (trimmed === "") throw new NumberFormatException("empty string");
      if (!/^[+-]?\d+$/.test(trimmed)) {
        throw new NumberFormatException("For input string: \"" + str + "\"");
      }
      return parseInt(trimmed, 10);
    },
    valueOf(str) { return Integer.parseInt(str); }
  };
  const Double = {
    [Symbol.hasInstance](instance) {
      return typeof instance === 'number';
    },
    parseDouble(str) {
      if (str === null || str === undefined) throw new NumberFormatException("null");
      let trimmed = String(str).trim();
      if (trimmed === "") throw new NumberFormatException("empty string");
      let val = Number(trimmed);
      if (isNaN(val)) {
        throw new NumberFormatException("For input string: \"" + str + "\"");
      }
      return val;
    },
    valueOf(str) { return Double.parseDouble(str); }
  };
  const Float = {
    [Symbol.hasInstance](instance) {
      return typeof instance === 'number';
    },
    parseFloat(str) {
      if (str === null || str === undefined) throw new NumberFormatException("null");
      let trimmed = String(str).trim();
      if (trimmed === "") throw new NumberFormatException("empty string");
      let val = Number(trimmed);
      if (isNaN(val)) {
        throw new NumberFormatException("For input string: \"" + str + "\"");
      }
      return val;
    },
    valueOf(str) { return Float.parseFloat(str); }
  };
  class StringBuilder {
    constructor(initial = "") { this._value = initial; }
    append(val) { this._value += String(val); return this; }
    toString() { return this._value; }
  }

  return {
    Gender, BookCategory, AvailabilityStatus, CaseFormatter, NumberFormatter,
    Exception, RuntimeException, WrongFormatException, ClassCastException, NoSuchElementException, NullPointerException, NumberFormatException,
    Optional, HashMap, ArrayList, List: ArrayList,
    SimpleDateFormat, DecimalFormat,
    DriverManager, MockConnection, MockPreparedStatement, MockResultSet,
    FileReader, BufferedReader, FileWriter, BufferedWriter, PrintWriter,
    VirtualFileSystem, Field, getDeclaredFields, System,
    Integer, Double, Float, StringBuilder,
    console: {
      log: (str) => consoleLogs.push(String(str)),
      write: (str) => {
        if (consoleLogs.length > 0) consoleLogs[consoleLogs.length - 1] += String(str);
        else consoleLogs.push(String(str));
      }
    }
  };
}

// Java Class Body Splitter Helper
function parseClassBody(classBodyText) {
  let index = 0;
  let fields = [];
  let methods = [];
  
  while (index < classBodyText.length) {
    while (index < classBodyText.length && /\s/.test(classBodyText[index])) index++;
    if (index >= classBodyText.length) break;
    
    let start = index;
    let bracesCount = 0;
    let hasBraces = false;
    
    while (index < classBodyText.length) {
      let char = classBodyText[index];
      if (char === '{') {
        bracesCount++;
        hasBraces = true;
      } else if (char === '}') {
        bracesCount--;
      }
      index++;
      
      if (hasBraces && bracesCount === 0) break;
      if (!hasBraces && char === ';') break;
    }
    
    let segment = classBodyText.substring(start, index).trim();
    if (segment.includes('abstract') && segment.includes('(')) {
      continue;
    }
    if (hasBraces) {
      methods.push(segment);
    } else {
      if (segment) fields.push(segment);
    }
  }
  return { fields, methods };
}

// Field Transpilation
function transpileField(fieldStr) {
  let clean = fieldStr.replace(/@[A-Za-z0-9_]+(?:\([^)]*\))?/g, '').trim();
  let isStatic = clean.match(/\bstatic\b/) ? 'static ' : '';
  clean = clean.replace(/\b(public|private|protected|final|static|volatile|transient)\b/g, '').trim();
  clean = clean.replace(/<[^>]*>/g, ''); // strip generic arguments
  let match = clean.match(/^([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+)(?:\s*=\s*(.*))?;?$/);
  if (match) {
    let name = match[2];
    let initializer = match[3] ? match[3].trim() : 'null';
    if (initializer.endsWith(';')) initializer = initializer.slice(0, -1);
    return `${isStatic}${name} = ${initializer};`;
  }
  return fieldStr;
}

// Method Transpilation
// Helper to strip Java types from method argument lists
function cleanMethodArgs(argsStr) {
  if (!argsStr || argsStr.trim() === "") return "";
  let cleanArgs = argsStr.replace(/<[^>]*>/g, ''); // strip generics
  return cleanArgs.split(',').map(arg => {
    let parts = arg.trim().split(/\s+/);
    return parts.pop();
  }).join(', ');
}

// Method Transpilation
function transpileMethod(methodStr, className, fieldsList, allMethodNames = [], extraClassNames = [], baseClass = null) {
  let clean = methodStr.trim();
  // Strip annotations first
  clean = clean.replace(/@[A-Za-z0-9_]+(?:\([^)]*\))?/g, '').trim();
  // Strip throws clauses
  clean = clean.replace(/\bthrows\s+[A-Za-z0-9_,\s<>]+/g, '');
  // Strip visibility/synchronized/final/abstract modifiers
  while (true) {
    let replaced = clean.replace(/^(public|private|protected|synchronized|final|abstract)\s+/, '');
    if (replaced === clean) break;
    clean = replaced;
  }
  
  let constructorRegex = new RegExp('\\b' + className + '\\s*\\(([^)]*)\\)\\s*\\{');
  let matchConstructor = clean.match(constructorRegex);
  if (matchConstructor) {
    let args = cleanMethodArgs(matchConstructor[1]);
    clean = clean.replace(constructorRegex, `constructor(${args}) {`);
  } else {
    let methodRegex = /^(?:(public|private|protected|synchronized|final)\s+)?(static\s+)?([A-Za-z0-9_<>]+)\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*(\{)/;
    let match = clean.match(methodRegex);
    if (match) {
      let isStatic = match[2] || '';
      let methodName = match[4];
      let args = cleanMethodArgs(match[5]);
      let openingBrace = match[6];
      clean = clean.replace(methodRegex, `${isStatic}${methodName}(${args}) ${openingBrace}`);
    }
  }
  
  let firstBrace = clean.indexOf('{');
  let lastBrace = clean.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1) return clean;
  
  let header = clean.substring(0, firstBrace + 1);
  let body = clean.substring(firstBrace + 1, lastBrace);
  let footer = clean.substring(lastBrace);
  
  if (matchConstructor && baseClass && !/\bsuper\s*\(/.test(body)) {
    body = '\n    super();\n' + body;
  }
  
  // Replace variable types
  let types = [
    'String', 'double', 'int', 'boolean', 'float', 'char', 'long', 'short', 'byte',
    'HashMap<[^>]+>', 'HashMap', 'List<[^>]+>', 'List', 'ArrayList<[^>]+>', 'ArrayList', 'Optional<[^>]+>', 'Optional',
    'Map<[^>]+>', 'Map', 'Set<[^>]+>', 'Set', 'HashSet<[^>]+>', 'HashSet', 'Map\\.Entry<[^>]+>', 'Map\\.Entry',
    'Class<[^>]+>', 'Class', 'Constructor<[^>]+>', 'Constructor', 'Method', 'Throwable',
    'Item', 'Chocolate', 'Cigarettes', 'Person', 'Assistant', 'Professor', 'Company<[^>]+>',
    'Product', 'InventoryItem', 'ElectronicsProduct', 'ClothingProduct', 'InventoryManager',
    'Book', 'BookCategory', 'BookFactory', 'FictionBookFactory', 'ScienceBookFactory',
    'ConfigurationManager', 'DatabaseConnection', 'Logger', 'PrintSpooler', 'ThemeManager',
    'CacheManager', 'SessionManager', 'GameEngine', 'FileSystemManager', 'ClipboardManager',
    'Gender', 'CaseFormatter', 'NumberFormatter', 'WriteConcerns', 'BookBuilder', 'WrongFormatException', 'NumberFormatException',
    'FinalPrep', 'ReportWriter', 'DecimalFormat', 'Date', 'SimpleDateFormat', 'BufferedReader',
    'FileReader', 'BufferedWriter', 'FileWriter', 'PrintWriter', 'Connection', 'PreparedStatement',
    'ResultSet', 'DriverManager', 'Field', 'StringBuilder', 'Integer', 'Double', 'Float', 'Object', 'RuntimeException',
    ...extraClassNames
  ];
  
  let typePattern = '\\b(' + types.join('|') + ')(?:\\[\\])?(?=\\s+[A-Za-z0-9_]+)';
  let varDeclRegex = new RegExp(typePattern + '\\s+([A-Za-z0-9_]+)\\s*(=|;)', 'g');
  body = body.replace(varDeclRegex, 'let $2 $3');
  
  let varDeclNoAssignRegex = new RegExp(typePattern + '\\s+([A-Za-z0-9_]+)\\s*;', 'g');
  body = body.replace(varDeclNoAssignRegex, 'let $2;');
  
  // Clean new generics
  body = body.replace(/new\s+([A-Za-z0-9_]+)<[^>]*>\s*\(/g, 'new $1(');
  
  // Loop translation: "for (Type item : items)" -> "for (let item of items)"
  let loopRegex = new RegExp('for\\s*\\(\\s*(?:' + typePattern + '|[A-Za-z0-9_<>]+)\\s+([A-Za-z0-9_]+)\\s*:\\s*([^)]+)\\)', 'g');
  body = body.replace(loopRegex, 'for (let $2 of $3)');
  
  // Translate "catch (Exception e)" to "catch (e)"
  body = body.replace(/\bcatch\s*\(\s*[A-Za-z0-9_<>]+\s+([A-Za-z0-9_]+)\s*\)/g, 'catch ($1)');

  // Strip downcasting
  body = body.replace(/\(\(([A-Za-z0-9_]+)\)\s*([^)]+)\)/g, '($2)');
  body = body.replace(/\(([A-Za-z0-9_]+)\)\s*([A-Za-z0-9_]+)/g, '$2');
 
  // Reflection class conversions
  body = body.replace(/([A-Za-z0-9_]+)\.class\.getDeclaredFields\(\)/g, 'getDeclaredFields("$1")');
  body = body.replace(/([A-Za-z0-9_]+)\.class/g, '"$1"');
 
  // Print operations
  body = body.replace(/System\.out\.println/g, 'console.log');
  body = body.replace(/System\.out\.print/g, 'console.write');
  
  // Extract parameter names to avoid shadowing field prefixes
  let args = header.substring(header.indexOf('(') + 1, header.indexOf(')'));
  let cleanArgs = args.replace(/<[^>]*>/g, '');
  let params = cleanArgs.split(',').map(a => a.trim().split(/\s+/).pop()).filter(Boolean);
  
  // Add "this." prefixes to fields
  fieldsList.forEach(field => {
    if (params.includes(field)) return;
    let fieldRegex = new RegExp('\\b' + field + '\\b', 'g');
    body = body.replace(fieldRegex, (match, offset, string) => {
      if (isInsideStringOrComment(string, offset)) {
        return match;
      }
      let before = string.substring(0, offset).trim();
      if (before.endsWith('.') || before.endsWith('let') || before.endsWith('const') || before.endsWith('var') || before.endsWith('class') || before.endsWith('new')) {
        return match;
      }
      return 'this.' + match;
    });
  });

  // Add "this." prefixes to method calls
  allMethodNames.forEach(method => {
    let methodRegex = new RegExp('\\b' + method + '\\s*\\(', 'g');
    body = body.replace(methodRegex, (match, offset, string) => {
      if (isInsideStringOrComment(string, offset)) {
        return match;
      }
      let before = string.substring(0, offset).trim();
      if (before.endsWith('.') || before.endsWith('new') || before.endsWith('function') || before.endsWith('class')) {
        return match;
      }
      return 'this.' + match;
    });
  });
 
  return header + body + footer;
}
 
// Java Extraction & Transpilation Main Pipeline
function transpileJavaToJS(javaCode) {
  // Clean comments safely
  let cleanCode = stripCommentsSafely(javaCode);
  
  // Enums (use var to avoid redeclaration syntax error inside sandbox Function)
  let enums = [];
  let enumRegex = /enum\s+([A-Za-z0-9_]+)\s*\{([^}]+)\}/g;
  let enumMatch;
  while ((enumMatch = enumRegex.exec(cleanCode)) !== null) {
    let name = enumMatch[1];
    let values = enumMatch[2].split(',').map(v => v.trim()).filter(Boolean);
    let jsEnum = `var ${name} = { ` + values.map(v => `${v}: "${v}"`).join(', ') + ` };`;
    enums.push(jsEnum);
  }
  cleanCode = cleanCode.replace(enumRegex, '');
  
  // Strip Interfaces safely
  cleanCode = stripInterfaces(cleanCode);
  
  // Extract interface and enum names for types transpilation
  let interfaceNames = [];
  let interfaceRegex = /\binterface\s+([A-Za-z0-9_]+)/g;
  let interfaceMatch;
  while ((interfaceMatch = interfaceRegex.exec(javaCode)) !== null) {
    interfaceNames.push(interfaceMatch[1]);
  }

  let enumNames = [];
  let enumNamesRegex = /\benum\s+([A-Za-z0-9_]+)/g;
  let enumNamesMatch;
  while ((enumNamesMatch = enumNamesRegex.exec(javaCode)) !== null) {
    enumNames.push(enumNamesMatch[1]);
  }

  // Extract Classes recursively (outer first, then inner)
  let extracted = extractClasses(cleanCode);
  let classNames = extracted.map(c => c.name);
  let extraClassNames = [...classNames, ...interfaceNames, ...enumNames];
  
  // Collect all method names across all classes to allow prefixing them with "this." inside class bodies
  let allMethodNames = [];
  extracted.forEach(c => {
    let { methods } = parseClassBody(c.body);
    methods.forEach(m => {
      let cleanM = m.replace(/@[A-Za-z0-9_]+(?:\([^)]*\))?/g, '').trim();
      let methodRegex = /^(?:(public|private|protected|synchronized|final)\s+)?(static\s+)?([A-Za-z0-9_<>]+)\s+([A-Za-z0-9_]+)\s*\(/;
      let match = cleanM.match(methodRegex);
      if (match) {
        let name = match[4];
        if (name && name !== c.name && name !== 'constructor') {
          allMethodNames.push(name);
        }
      }
    });
  });
  
  // Collect all locally defined fields for each class to resolve inheritance fields
  let classFields = {};
  extracted.forEach(c => {
    let { fields } = parseClassBody(c.body);
    let localFields = [];
    fields.forEach(f => {
      let cleanF = f.replace(/@[A-Za-z0-9_]+(?:\([^)]*\))?/g, '');
      cleanF = cleanF.replace(/\b(public|private|protected|final|static)\b/g, '').trim();
      cleanF = cleanF.replace(/<[^>]*>/g, '');
      let parts = cleanF.split(/\s+/);
      let namePart = parts[1];
      if (namePart) {
        let name = namePart.split('=')[0].replace(';', '').trim();
        localFields.push(name);
      }
    });
    classFields[c.name] = {
      baseClass: c.baseClass,
      fields: localFields
    };
  });

  let transpiledClasses = [];
  for (let i = 0; i < extracted.length; i++) {
    let className = extracted[i].name;
    let baseClass = extracted[i].baseClass;
    let body = extracted[i].body;
    
    // Parse nested structures
    let { fields, methods } = parseClassBody(body);
    let fieldNames = [];
    let transpiledFields = [];
    
    fields.forEach(f => {
      let cleanF = f.replace(/@[A-Za-z0-9_]+(?:\([^)]*\))?/g, ''); // strip annotations
      cleanF = cleanF.replace(/\b(public|private|protected|final|static)\b/g, '').trim();
      cleanF = cleanF.replace(/<[^>]*>/g, ''); // strip generic arguments globally (e.g. HashMap<String, Double> -> HashMap)
      let parts = cleanF.split(/\s+/);
      let namePart = parts[1];
      if (namePart) {
        let name = namePart.split('=')[0].replace(';', '').trim();
        fieldNames.push(name);
      }
      transpiledFields.push(transpileField(f));
    });
    
    let allInheritedFields = [];
    let curr = className;
    while (curr && classFields[curr]) {
      allInheritedFields = [...allInheritedFields, ...classFields[curr].fields];
      curr = classFields[curr].baseClass;
    }

    let transpiledMethods = [];
    methods.forEach(m => {
      transpiledMethods.push(transpileMethod(m, className, allInheritedFields, allMethodNames, extraClassNames, baseClass));
    });
    
    let constructors = transpiledMethods.filter(m => m.trim().startsWith('constructor('));
    if (constructors.length > 1) {
      transpiledMethods = transpiledMethods.filter(m => !m.trim().startsWith('constructor('));
      let cases = [];
      constructors.forEach(c => {
        let firstBrace = c.indexOf('{');
        let lastBrace = c.lastIndexOf('}');
        let header = c.substring(0, firstBrace);
        let body = c.substring(firstBrace + 1, lastBrace).trim();
        let argsMatch = header.match(/constructor\(([^)]*)\)/);
        let argsStr = argsMatch ? argsMatch[1] : '';
        let params = argsStr.split(',').map(p => p.trim()).filter(Boolean);
        cases.push({ params, body });
      });
      cases.sort((a, b) => a.params.length - b.params.length);
      
      let mergedBody = '';
      cases.forEach((c, idx) => {
        let condition = `args.length === ${c.params.length}`;
        if (idx === cases.length - 1 && cases.length > 1) {
          condition = `args.length >= ${c.params.length}`;
        }
        let destructuring = c.params.length > 0 ? `let [${c.params.join(', ')}] = args;\n      ` : '';
        mergedBody += `if (${condition}) {\n      ${destructuring}${c.body}\n      return;\n    } `;
      });
      let mergedConstructor = `constructor(...args) {\n    ${mergedBody}\n  }`;
      transpiledMethods.push(mergedConstructor);
    }
    
    let classHeaderStr = `class ${className} ${baseClass ? 'extends ' + baseClass : ''} {`;
    let classContent = [
      classHeaderStr,
      transpiledFields.map(f => '  ' + f).join('\n'),
      transpiledMethods.map(m => '  ' + m).join('\n\n'),
      '}'
    ].join('\n');
    
    transpiledClasses.push(classContent);
  }
  
  // Attach builder inner classes to parent classes in JavaScript
  let attachStatements = [];
  classNames.forEach(name => {
    if (name.endsWith('Builder')) {
      let parentName = name.substring(0, name.length - 7);
      if (classNames.includes(parentName)) {
        attachStatements.push(`${parentName}.${name} = ${name};`);
      }
    }
  });
  
  return [
    ...enums,
    ...transpiledClasses,
    ...attachStatements
  ].join('\n\n');
}

// Annotation parser for compilation metadata (Reflection simulator)
function extractClassMetadata(javaCode) {
  const metadata = {};
  
  // Custom mock Field class
  class Field {
    constructor(name, type, annotations = {}) {
      this._name = name;
      this._type = type;
      this._annotations = annotations;
    }
    getName() { return this._name; }
    getType() { return this._type; }
    isAnnotationPresent(annClass) {
      const annName = typeof annClass === 'string' ? annClass : annClass.name || '';
      return this._annotations[annName] !== undefined;
    }
    getAnnotation(annClass) {
      const annName = typeof annClass === 'string' ? annClass : annClass.name || '';
      return this._annotations[annName] || null;
    }
    get(obj) { return obj[this._name]; }
    set(obj, val) { obj[this._name] = val; }
    setAccessible(flag) {}
  }

  let cleanCode = stripCommentsSafely(javaCode);
  let extracted = extractClasses(cleanCode);
  
  extracted.forEach(c => {
    let className = c.name;
    let bodyText = c.body;
    metadata[className] = { fields: [] };
    
    let { fields } = parseClassBody(bodyText);
    
    fields.forEach(fieldStr => {
      const annotations = {};
      
      // Match @WriteConcerns(...)
      const writeConcernsMatch = fieldStr.match(/@WriteConcerns(?:\(([^)]+)\))?/);
      if (writeConcernsMatch) {
        let params = writeConcernsMatch[1] || "";
        let caseFormat = "ORDINARY";
        let numberFormat = "COMMA";
        
        const caseMatch = params.match(/case_format\s*=\s*CaseFormatter\.([A-Z_]+)/);
        if (caseMatch) caseFormat = caseMatch[1];
        
        const numberMatch = params.match(/number_format\s*=\s*NumberFormatter\.([A-Z_]+)/);
        if (numberMatch) numberFormat = numberMatch[1];
        
        annotations["WriteConcerns"] = {
          case_format: () => caseFormat,
          number_format: () => numberFormat
        };
      }

      // Match @FieldValidation(...)
      const validationMatch = fieldStr.match(/@FieldValidation(?:\(([^)]+)\))?/);
      if (validationMatch) {
        let category = "FICTION";
        let status = "AVAILABLE";
        
        const catMatch = fieldStr.match(/category\s*=\s*BookCategory\.([A-Z_]+)/);
        if (catMatch) category = catMatch[1];
        
        const statusMatch = fieldStr.match(/availability\s*=\s*AvailabilityStatus\.([A-Z_]+)/);
        if (statusMatch) status = statusMatch[1];
        
        annotations["FieldValidation"] = {
          category: () => category,
          availability: () => status
        };
      }

      // Remove annotations and modifiers to extract variable type & name
      let cleanF = fieldStr.replace(/@[A-Za-z0-9_]+(?:\([^)]*\))?/g, '');
      cleanF = cleanF.replace(/\b(public|private|protected|final|static)\b/g, '').trim();
      cleanF = cleanF.replace(/<[^>]*>/g, ''); // strip generics
      let parts = cleanF.split(/\s+/);
      let type = parts[0];
      let namePart = parts[1];
      if (namePart) {
        let name = namePart.split('=')[0].replace(';', '').trim();
        metadata[className].fields.push(new Field(name, type, annotations));
      }
    });
  });
  
  return metadata;
}

// Compile Code Checking (Balancing brackets & basic syntax)
function compileJavaCode(javaCode) {
  const errors = [];
  const cleaned = cleanCodeForParsing(javaCode);
  
  // Bracket balancing verification
  const stack = [];
  const opening = ['{', '(', '['];
  const closing = ['}', ')', ']'];
  const matches = { '}': '{', ')': '(', ']': '[' };
  
  const lines = cleaned.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (opening.includes(char)) {
        stack.push({ char, line: l + 1, col: c + 1 });
      } else if (closing.includes(char)) {
        if (stack.length === 0) {
          errors.push(`Compilation Error: Unmatched closing brace '${char}' at line ${l + 1}, column ${c + 1}`);
        } else {
          const top = stack.pop();
          if (top.char !== matches[char]) {
            errors.push(`Compilation Error: Mismatched brace. Found '${char}' at line ${l + 1}, but expected closing for '${top.char}' from line ${top.line}`);
          }
        }
      }
    }
  }
  
  while (stack.length > 0) {
    const unclosed = stack.pop();
    errors.push(`Compilation Error: Unclosed opening brace '${unclosed.char}' at line ${unclosed.line}, column ${unclosed.col}`);
  }
  
  if (errors.length > 0) {
    return { success: false, log: errors.join('\n') };
  }
  
  return { success: true, log: "Compilation successful." };
}

// Running transpiled Javascript against the specific question's test cases
function runJavaTests(javaCode, testRunnerJS) {
  const compileResult = compileJavaCode(javaCode);
  if (!compileResult.success) {
    return {
      success: false,
      score: 0,
      consoleLogs: [compileResult.log],
      testLogs: ["Compilation failed. Score set to 0."]
    };
  }

  const consoleLogs = [];
  try {
    const classMetadata = extractClassMetadata(javaCode);
    const transpiledJS = transpileJavaToJS(javaCode);
    const mockEnv = createJVMEnvironment(consoleLogs, classMetadata);
    
    // Extract declared class names and enums
    const declaredClasses = [];
    const classMatchRegex = /class\s+([A-Za-z0-9_]+)/g;
    let match;
    while ((match = classMatchRegex.exec(transpiledJS)) !== null) {
      declaredClasses.push(match[1]);
    }
    const enumMatchRegex = /\b(var|const)\s+([A-Za-z0-9_]+)\s*=\s*\{/g;
    while ((match = enumMatchRegex.exec(transpiledJS)) !== null) {
      declaredClasses.push(match[2]);
    }
    
    // Build sandbox function
    const sandboxKeys = [];
    const sandboxValues = [];
    const rawKeys = Object.keys(mockEnv);
    const rawVals = Object.values(mockEnv);
    for (let i = 0; i < rawKeys.length; i++) {
      const key = rawKeys[i];
      const redeclaredRegex = new RegExp('\\b(class|var|const|function)\\s+' + key + '\\b');
      if (redeclaredRegex.test(transpiledJS)) {
        continue;
      }
      sandboxKeys.push(key);
      sandboxValues.push(rawVals[i]);
    }
    
    const returnStatement = `\n\nreturn { ${declaredClasses.join(', ')} };`;
    const sandboxCode = transpiledJS + returnStatement;
    
    const fn = new Function(...sandboxKeys, sandboxCode);
    const compiledClasses = fn(...sandboxValues);
    
    // Evaluate unit tests
    // Expose VirtualFileSystem mock to student classes inside sandbox
    const sandboxClasses = { ...compiledClasses, Optional: mockEnv.Optional, HashMap: mockEnv.HashMap, ArrayList: mockEnv.ArrayList, List: mockEnv.List, VirtualFileSystem };
    
    // Evaluate the test runner function
    const runnerFn = eval(testRunnerJS);
    const result = runnerFn(sandboxClasses, (msg) => consoleLogs.push(msg), consoleLogs);
    
    return {
      success: true,
      score: result.score,
      consoleLogs: consoleLogs,
      testLogs: result.logs
    };
  } catch(e) {
    consoleLogs.push("Runtime Exception: " + e.stack);
    return {
      success: false,
      score: 0,
      consoleLogs: consoleLogs,
      testLogs: ["Execution terminated due to runtime exception: " + e.message]
    };
  }
}

// Attach compiler to global window
window.JavaRunner = {
  compileJavaCode,
  transpileJavaToJS,
  runJavaTests,
  VirtualFileSystem
};
